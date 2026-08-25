// Minimal WebGL frame renderer for the image sequence: draws a fullscreen
// cover-fit quad and can crossfade between two frame textures (uMix), which
// is what gives scroll-scrubbing its smooth, sub-frame feel. Textures are
// cached per frame index (LRU-ish eviction) so re-visiting a frame during
// scroll doesn't re-upload pixel data to the GPU every time.

const VERTEX_SRC = `
attribute vec2 aPosition;
varying vec2 vUv;
void main() {
  // flip v here (not via UNPACK_FLIP_Y_WEBGL) — that flag behaves
  // inconsistently between ImageBitmap and HTMLImageElement sources and can
  // double-flip, so orientation is handled purely in UV math instead.
  vUv = vec2(aPosition.x, -aPosition.y) * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAGMENT_SRC = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uTexA;
uniform sampler2D uTexB;
uniform float uMix;
uniform vec4 uUV; // scale.x, scale.y, offset.x, offset.y
void main() {
  vec2 uv = vUv * uUV.xy + uUV.zw;
  vec4 a = texture2D(uTexA, uv);
  vec4 b = texture2D(uTexB, uv);
  gl_FragColor = mix(a, b, uMix);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("failed to create shader");
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`shader compile failed: ${log}`);
  }
  return shader;
}

function getDims(source: TexImageSource): { w: number; h: number } {
  if (source instanceof HTMLImageElement) {
    return { w: source.naturalWidth, h: source.naturalHeight };
  }
  // ImageBitmap / VideoFrame / canvas — all expose width/height
  const s = source as { width: number; height: number };
  return { w: s.width, h: s.height };
}

const MAX_CACHED_TEXTURES = 48;

export interface SequenceRenderer {
  setSize(width: number, height: number): void;
  draw(
    indexA: number,
    sourceA: TexImageSource | undefined,
    indexB: number,
    sourceB: TexImageSource | undefined,
    mix: number,
  ): void;
  dispose(): void;
}

export function createSequenceRenderer(
  canvas: HTMLCanvasElement,
): SequenceRenderer | null {
  const gl = (canvas.getContext("webgl", {
    antialias: false,
    depth: false,
    stencil: false,
    alpha: false,
    powerPreference: "high-performance",
  }) ?? canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
  if (!gl) return null;

  const program = gl.createProgram();
  if (!program) return null;
  const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SRC);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC);
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(`program link failed: ${gl.getProgramInfoLog(program)}`);
  }
  gl.useProgram(program);

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW,
  );
  const aPosition = gl.getAttribLocation(program, "aPosition");
  gl.enableVertexAttribArray(aPosition);
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

  const uTexA = gl.getUniformLocation(program, "uTexA");
  const uTexB = gl.getUniformLocation(program, "uTexB");
  const uMix = gl.getUniformLocation(program, "uMix");
  const uUV = gl.getUniformLocation(program, "uUV");
  gl.uniform1i(uTexA, 0);
  gl.uniform1i(uTexB, 1);

  const textureCache = new Map<number, WebGLTexture>();
  let cw = canvas.width || 1;
  let ch = canvas.height || 1;
  let imgAspect = cw / ch;

  const evictIfNeeded = () => {
    while (textureCache.size > MAX_CACHED_TEXTURES) {
      const oldestKey = textureCache.keys().next().value;
      if (oldestKey === undefined) break;
      const tex = textureCache.get(oldestKey);
      if (tex) gl.deleteTexture(tex);
      textureCache.delete(oldestKey);
    }
  };

  const getTexture = (index: number, source: TexImageSource): WebGLTexture => {
    const cached = textureCache.get(index);
    if (cached) return cached;

    const tex = gl.createTexture();
    if (!tex) throw new Error("failed to create texture");
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);

    textureCache.set(index, tex);
    evictIfNeeded();

    const { w, h } = getDims(source);
    if (w && h) imgAspect = w / h;

    return tex;
  };

  const setUV = () => {
    const canvasAspect = cw / ch;
    let scaleX = 1;
    let scaleY = 1;
    if (canvasAspect > imgAspect) {
      scaleY = imgAspect / canvasAspect;
    } else {
      scaleX = canvasAspect / imgAspect;
    }
    gl.uniform4f(uUV, scaleX, scaleY, (1 - scaleX) / 2, (1 - scaleY) / 2);
  };

  return {
    setSize(width: number, height: number) {
      cw = Math.max(1, width);
      ch = Math.max(1, height);
      canvas.width = cw;
      canvas.height = ch;
      gl.viewport(0, 0, cw, ch);
    },

    draw(indexA, sourceA, indexB, sourceB, mix) {
      if (!sourceA) return;

      const texA = getTexture(indexA, sourceA);
      const hasB = sourceB && mix > 0 && indexB !== indexA;
      const texB = hasB ? getTexture(indexB, sourceB) : texA;

      setUV();

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texA);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, texB);
      gl.uniform1f(uMix, hasB ? mix : 0);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },

    dispose() {
      for (const tex of textureCache.values()) gl.deleteTexture(tex);
      textureCache.clear();
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    },
  };
}
