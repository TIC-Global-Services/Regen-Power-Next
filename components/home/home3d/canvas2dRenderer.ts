// Canvas2D frame renderer for the image sequence: hard-cuts to a cover-fit
// crop of one frame per draw call. No manual GPU texture cache — the
// browser's own image cache backs decoded ImageBitmap/HTMLImageElement
// sources, avoiding the unbounded VRAM growth a hand-rolled WebGL texture
// cache carries at full-res frames. (Ported from regen-home-3d, replaces
// webglRenderer.ts.)

function getDims(source: TexImageSource): { w: number; h: number } {
  if (source instanceof HTMLImageElement) {
    return { w: source.naturalWidth, h: source.naturalHeight };
  }
  const s = source as { width: number; height: number };
  return { w: s.width, h: s.height };
}

// Computes the source-rect crop that makes `drawImage` behave like CSS
// `background-size: cover` — fill the destination, cropping overflow instead
// of letterboxing.
function coverRect(srcW: number, srcH: number, dstW: number, dstH: number) {
  const srcAspect = srcW / srcH;
  const dstAspect = dstW / dstH;
  if (srcAspect > dstAspect) {
    const sw = srcH * dstAspect;
    return { sx: (srcW - sw) / 2, sy: 0, sw, sh: srcH };
  }
  const sh = srcW / dstAspect;
  return { sx: 0, sy: (srcH - sh) / 2, sw: srcW, sh };
}

export interface SequenceRenderer {
  setSize(width: number, height: number): void;
  draw(source: TexImageSource | undefined): void;
  dispose(): void;
}

export function createSequenceRenderer(
  canvas: HTMLCanvasElement,
): SequenceRenderer | null {
  // desynchronized rendering has known WebKit stability issues on iOS Safari
  // (implicated in tab crashes), so it's left off despite the latency win it
  // gives on browsers where it's solid.
  const ctx = canvas.getContext("2d", {
    alpha: false,
  }) as CanvasRenderingContext2D | null;
  if (!ctx) return null;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "medium";

  let cw = canvas.width || 1;
  let ch = canvas.height || 1;

  return {
    setSize(width: number, height: number) {
      cw = Math.max(1, width);
      ch = Math.max(1, height);
      canvas.width = cw;
      canvas.height = ch;
      // canvas resize resets 2d state — reapply
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "medium";
    },

    draw(source) {
      if (!source) return;
      const { w, h } = getDims(source);
      if (!w || !h) return;
      const { sx, sy, sw, sh } = coverRect(w, h, cw, ch);
      ctx.drawImage(source as CanvasImageSource, sx, sy, sw, sh, 0, 0, cw, ch);
    },

    dispose() {
      // no GPU resources to release explicitly for 2d contexts
    },
  };
}