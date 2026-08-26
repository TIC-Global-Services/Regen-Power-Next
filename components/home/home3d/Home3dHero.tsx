"use client";

import { useEffect, useRef, useState } from "react";
import { LoadingScreen } from "./LoadingScreen";
import { createSequenceRenderer, type SequenceRenderer } from "./canvas2dRenderer";
import {
  FRAME_COUNT,
  FRAME_SRC,
  FRAME_NATIVE_WIDTH,
  FRAME_NATIVE_HEIGHT,
  INTRO_RANGE,
  INTRO_FPS,
  LOOP_RANGE,
  LOOP_FPS,
  SCROLL_START,
  SCROLL_LENGTH_VH,
  OUTRO_RANGE,
  OUTRO_LENGTH_VH,
} from "./sequence";
import CtaButton from "@/reuseables/CtaButton";
import { CtaIcon } from "@/components/icons/CtaIcons";
import { getLenis } from "@/utils/lenisBridge";

// ─────────────────────────────────────────────────────────────────────────────
// Emergency kill-switch for the image sequence. The sequence is currently
// ENABLED (false) and running on the ported Canvas2D renderer + pooled,
// device-aware preload (see canvas2dRenderer.ts and the preload effect).
// Flip to `true` to temporarily fall back to a static first-frame hero —
// StaticSequenceFallback below is only used while true and can be deleted if
// the kill-switch is removed entirely.
// ─────────────────────────────────────────────────────────────────────────────
const IMGSEQ_DISABLED = false;

type Phase = "intro" | "loop" | "scroll";

const TOTAL_SCROLL_VH = SCROLL_LENGTH_VH + OUTRO_LENGTH_VH;
const MAIN_SCROLL_FRAC = SCROLL_LENGTH_VH / TOTAL_SCROLL_VH;
const OUTRO_FRAME_COUNT = Math.max(0, OUTRO_RANGE.end - OUTRO_RANGE.start + 1);

const SCROLL_FRAME_COUNT = Math.max(0, FRAME_COUNT - SCROLL_START);

// Cursor parallax tuning: max shift as a fraction of viewport size, lerp ease.
// Scale must cover 2x the max shift (both directions) or corners will clip.
const PARALLAX_MAX_SHIFT = 0.008;
const PARALLAX_SCALE = 1 + PARALLAX_MAX_SHIFT * 2.5;
const PARALLAX_EASE = 0.035;

// How quickly the displayed frame chases the raw scroll position — lower is
// smoother/laggier, higher tracks the scrollbar more tightly.
const SCROLL_EASE = 0.14;

// Subtle scroll-speed "dolly" zoom: a faint push-in while scrolling fast,
// settling back to rest — kept tiny and slow so it reads as depth, not motion.
const ZOOM_VELOCITY_EASE = 0.15;
const ZOOM_SETTLE_EASE = 0.06;
const ZOOM_MAX = 0.018;

// Preload tuning (ported from regen-home-3d v5). Frames are decoded at
// 1920x1080 native, which is ~7.9MB of raw pixel data per bitmap uncompressed
// — holding all 674 at native resolution is ~5GB and reliably crashes mobile
// browsers on memory pressure partway through loading. Decoding at just the
// resolution the device can actually display (with modest headroom for
// resize/rotation) cuts that proportionally to device size with no visible
// quality loss. Firing all 674 fetch+decode operations at once also spikes
// transient memory/CPU, so loads are pooled instead.
const CONCURRENT_LOADS = 6;
const RESIZE_HEADROOM = 1.25;

const GRAIN_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>";
const GRAIN_URL = `url("data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}")`;

// Maps a 0..1 scroll progress (within the two-segment main+outro range,
// excluding the trailing end-loop hold) to a continuous (fractional) frame
// index so playback can crossfade between neighboring frames instead of
// snapping — this is what makes scrubbing feel smooth at any scroll speed.
function frameFloatForProgress(clamped: number): number {
  if (clamped <= MAIN_SCROLL_FRAC) {
    const subProgress = MAIN_SCROLL_FRAC > 0 ? clamped / MAIN_SCROLL_FRAC : 0;
    return (
      SCROLL_START +
      Math.min(SCROLL_FRAME_COUNT - 1, subProgress * (SCROLL_FRAME_COUNT - 1))
    );
  }
  const subProgress =
    MAIN_SCROLL_FRAC < 1 ? (clamped - MAIN_SCROLL_FRAC) / (1 - MAIN_SCROLL_FRAC) : 1;
  return (
    OUTRO_RANGE.start +
    Math.min(OUTRO_FRAME_COUNT - 1, subProgress * (OUTRO_FRAME_COUNT - 1))
  );
}

export interface Home3dHeroProps {
  topSubtitle?: React.ReactNode;
  mainTitle?: React.ReactNode;
  description?: React.ReactNode;
  ctaText?: string;
  ctaLink?: string;
  ctaTextColor?: string;
}

// TEMPORARY: frozen first-frame hero used while IMGSEQ_DISABLED is true.
// Delete this whole component once the flag is flipped back / removed.
function StaticSequenceFallback({
  topSubtitle,
  mainTitle,
  description,
  ctaText,
  ctaLink,
  ctaTextColor = "text-white",
}: Home3dHeroProps) {
  const hasHeroContent = !!(topSubtitle || mainTitle || description || ctaText);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* eslint-disable-next-line @next/next/no-img-element -- temporary static fallback */}
      <img
        src={FRAME_SRC(0)}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Vignette — matches the sequence hero's overlay so the frame reads the same */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {hasHeroContent && (
        <div className="absolute inset-x-0 bottom-16 z-20 flex flex-col gap-8 px-[5%] md:bottom-24 md:flex-row md:items-end md:justify-between md:px-[3%]">
          <div className="max-w-3xl">
            {topSubtitle ? (
              <p className="text-2xl font-light tracking-tighter drop-shadow-md text-white/90 md:text-3xl">
                {topSubtitle}
              </p>
            ) : null}
            {mainTitle ? (
              <h1 className="mb-2 text-5xl font-medium leading-none tracking-tight drop-shadow-md text-[#63B846] md:text-7xl lg:text-[3.75rem]">
                {mainTitle}
              </h1>
            ) : null}
            {description ? (
              <div className="max-w-xl whitespace-pre-line text-base font-light leading-[1.2] tracking-tight drop-shadow-sm text-white/80 md:text-xl">
                {description}
              </div>
            ) : null}
          </div>

          {ctaText && ctaLink ? (
            <div className="flex-shrink-0 pb-2">
              <CtaButton
                href={ctaLink}
                text={ctaText}
                textColor={ctaTextColor}
                icon={CtaIcon}
                iconTextColor="text-white"
              />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default function Home3dHero(props: Home3dHeroProps) {
  // TEMP: image sequence disabled — render the static fallback instead.
  if (IMGSEQ_DISABLED) {
    return <StaticSequenceFallback {...props} />;
  }
  return <Home3dSequenceHero {...props} />;
}

// Full image-sequence experience — only mounted while IMGSEQ_DISABLED is false.
function Home3dSequenceHero({
  topSubtitle,
  mainTitle,
  description,
  ctaText,
  ctaLink,
  ctaTextColor = "text-white",
}: Home3dHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<SequenceRenderer | null>(null);
  const framesRef = useRef<(ImageBitmap | HTMLImageElement)[]>([]);
  const frameRef = useRef(0);
  const phaseRef = useRef<Phase>("intro");
  const parallaxTargetRef = useRef({ x: 0, y: 0 });
  const parallaxCurrentRef = useRef({ x: 0, y: 0 });
  const scrollVelocityRef = useRef(0);
  const zoomCurrentRef = useRef(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [ready, setReady] = useState(false);
  const [hideLoader, setHideLoader] = useState(false);
  const [phase, setPhase] = useState<Phase>("intro");
  const [muted, setMuted] = useState(false);
  const [showHeroText, setShowHeroText] = useState(false);
  // Visible at start (over hero image) and again only at the very end of the
  // 1520vh pin — hidden during the scrub so the image breathes edge-to-edge.
  // Drives both the in-hero copy/CTA and the global fixed nav (via data attribute).
  const [heroChromeVisible, setHeroChromeVisibleState] = useState(true);
  const heroChromeVisibleRef = useRef(true);

  const hasHeroContent = !!(topSubtitle || mainTitle || description || ctaText);

  const setChromeVisible = (v: boolean) => {
    if (heroChromeVisibleRef.current === v) return;
    heroChromeVisibleRef.current = v;
    setHeroChromeVisibleState(v);
    if (typeof document !== "undefined") {
      document.documentElement.dataset.heroChrome = v ? "visible" : "hidden";
    }
  };

  const setPhaseBoth = (p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  };

  // hard-cut draw (integer frame, no blend) — used by intro/loop autoplay
  const draw = (index: number) => {
    rendererRef.current?.draw(index, framesRef.current[index], index, undefined, 0);
  };

  // crossfades between the two frames straddling a fractional index — used
  // by scroll scrubbing for sub-frame smoothness
  const drawBlend = (indexA: number, indexB: number, mix: number) => {
    rendererRef.current?.draw(
      indexA,
      framesRef.current[indexA],
      indexB,
      framesRef.current[indexB],
      mix,
    );
  };

  // preload + decode ahead of time so scrubbing never stalls on a first-draw decode
  useEffect(() => {
    let cancelled = false;
    let count = 0;

    const onReady = () => {
      if (cancelled) return;
      count += 1;
      setLoadedCount(count);
      if (count >= FRAME_COUNT) setReady(true);
    };

    const supportsBitmap = typeof createImageBitmap === "function";

    // Decode at just the resolution this device can show (plus headroom),
    // capped to never upscale beyond native. On a tall portrait phone this
    // "cover" scale is actually >=1 — the 16:9 source is shorter than the
    // device's full-height crop needs, so no downscale would apply at all,
    // which is exactly the case that was crashing. Mobile-class devices get
    // an additional hard cap on top, trading a bit of extra softness for
    // staying far under the memory ceiling that a full 674-frame native-res
    // resident set blows through (~5GB uncompressed at 1920x1080).
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const coverScale = Math.max(
      (window.innerWidth * dpr) / FRAME_NATIVE_WIDTH,
      (window.innerHeight * dpr) / FRAME_NATIVE_HEIGHT,
    );
    const isMobileClass =
      window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
    const MOBILE_MAX_LONG_EDGE = 960;
    const capScale = isMobileClass ? MOBILE_MAX_LONG_EDGE / FRAME_NATIVE_WIDTH : 1;
    const scale = Math.min(1, coverScale * RESIZE_HEADROOM, capScale);
    const resizeOptions: ImageBitmapOptions | undefined =
      scale < 1
        ? {
            resizeWidth: Math.max(1, Math.round(FRAME_NATIVE_WIDTH * scale)),
            resizeHeight: Math.max(1, Math.round(FRAME_NATIVE_HEIGHT * scale)),
            resizeQuality: "high",
          }
        : undefined;

    let nextIndex = 0;
    const startNext = () => {
      if (cancelled) return;
      const i = nextIndex++;
      if (i >= FRAME_COUNT) return;

      const advance = () => {
        onReady();
        startNext();
      };

      if (supportsBitmap) {
        fetch(FRAME_SRC(i))
          .then((res) => res.blob())
          .then((blob) => createImageBitmap(blob, resizeOptions))
          .then((bitmap) => {
            if (cancelled) return;
            framesRef.current[i] = bitmap;
            advance();
          })
          .catch(advance);
      } else {
        const img = new Image();
        img.onload = () => {
          framesRef.current[i] = img;
          advance();
        };
        img.onerror = advance;
        img.src = FRAME_SRC(i);
      }
    };

    for (let k = 0; k < CONCURRENT_LOADS; k++) startNext();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const t = window.setTimeout(() => {
      setHideLoader(true);
      // reveal hero text shortly after loader fades
      window.setTimeout(() => setShowHeroText(true), 400);
    }, 700);
    return () => window.clearTimeout(t);
  }, [ready]);

  // background music: autoplays once ready; if the browser blocks unmuted
  // autoplay, retry on the first user gesture (always allowed by then)
  useEffect(() => {
    if (!ready) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.7;

    const tryPlay = () => audio.play().catch(() => {});
    tryPlay();

    const onGesture = () => {
      tryPlay();
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("keydown", onGesture);
      window.removeEventListener("wheel", onGesture);
    };
    window.addEventListener("pointerdown", onGesture);
    window.addEventListener("keydown", onGesture);
    window.addEventListener("wheel", onGesture);
    return () => {
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("keydown", onGesture);
      window.removeEventListener("wheel", onGesture);
    };
  }, [ready]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);

  // canvas sizing + WebGL renderer setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = createSequenceRenderer(canvas);
    rendererRef.current = renderer;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer?.setSize(
        Math.round(window.innerWidth * dpr),
        Math.round(window.innerHeight * dpr),
      );
      draw(frameRef.current);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      renderer?.dispose();
      rendererRef.current = null;
    };
  }, []);

  // cursor parallax: track normalized pointer position, settle back to center on leave
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      parallaxTargetRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };
    const onMouseLeave = () => {
      parallaxTargetRef.current = { x: 0, y: 0 };
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  // cursor parallax: smoothly lerp toward the target offset and apply as a CSS transform
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let raf = 0;
    const tick = () => {
      const target = parallaxTargetRef.current;
      const current = parallaxCurrentRef.current;
      current.x += (target.x - current.x) * PARALLAX_EASE;
      current.y += (target.y - current.y) * PARALLAX_EASE;

      const zoomTarget = scrollVelocityRef.current * ZOOM_MAX;
      zoomCurrentRef.current += (zoomTarget - zoomCurrentRef.current) * ZOOM_SETTLE_EASE;

      const tx = current.x * PARALLAX_MAX_SHIFT * window.innerWidth;
      const ty = current.y * PARALLAX_MAX_SHIFT * window.innerHeight;
      const scale = PARALLAX_SCALE + zoomCurrentRef.current;
      canvas.style.transform = `scale(${scale}) translate(${tx}px, ${ty}px)`;

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // intro autoplay: plays once on load, then hands off to the loop autoplay
  useEffect(() => {
    if (!ready) return;
    if (phase !== "intro") return;

    frameRef.current = INTRO_RANGE.start;
    draw(frameRef.current);

    let raf = 0;
    let last = performance.now();
    let acc = 0;
    const frameDuration = 1000 / INTRO_FPS;

    const tick = (now: number) => {
      acc += now - last;
      last = now;

      while (acc >= frameDuration) {
        acc -= frameDuration;

        if (frameRef.current < INTRO_RANGE.end) {
          frameRef.current += 1;
        } else {
          frameRef.current = LOOP_RANGE.start;
          draw(frameRef.current);
          setPhaseBoth("loop");
          return;
        }
      }

      // crossfade toward the next frame within the current tick's window
      // instead of hard-cutting at the frame boundary — keeps the step
      // between individual frames from ever being visible.
      const next = Math.min(frameRef.current + 1, INTRO_RANGE.end);
      drawBlend(frameRef.current, next, acc / frameDuration);

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ready, phase]);

  // loop autoplay: plays once handed over from the intro, until the user scrolls further
  useEffect(() => {
    if (phase !== "loop") return;

    let raf = 0;
    let last = performance.now();
    let acc = 0;
    const frameDuration = 1000 / LOOP_FPS;

    const tick = (now: number) => {
      acc += now - last;
      last = now;

      while (acc >= frameDuration) {
        acc -= frameDuration;
        frameRef.current =
          frameRef.current >= LOOP_RANGE.end ? LOOP_RANGE.start : frameRef.current + 1;
      }

      const next =
        frameRef.current >= LOOP_RANGE.end ? LOOP_RANGE.start : frameRef.current + 1;
      drawBlend(frameRef.current, next, acc / frameDuration);

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  // Detect the first scroll interaction and flip into scroll-driven scrubbing.
  // With Lenis present the actual scroll offset is virtualised, so listeners
  // must not preventDefault() — that would just fight the smooth scroller.
  useEffect(() => {
    if (!ready) return;
    // Ensure chrome is visible while we are still in intro/loop.
    setChromeVisible(true);

    const takeOver = () => {
      if (phaseRef.current === "scroll") return;
      setPhaseBoth("scroll");
      setChromeVisible(false);
    };

    const onWheel = () => {
      takeOver();
    };
    const onTouchMove = () => {
      takeOver();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (phaseRef.current === "scroll") return;
      if (
        ["ArrowDown", "ArrowUp", "PageDown", "PageUp", " ", "Home", "End"].includes(
          e.key,
        )
      ) {
        takeOver();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [ready]);


  // scroll-driven playback once handed over
  useEffect(() => {
    if (phase !== "scroll") return;
    if (SCROLL_FRAME_COUNT <= 0) return;

    // raw scroll position, updated on every scroll event
    const targetProgressRef = { current: 0 };
    // eased position the renderer actually draws — chases targetProgressRef
    // every animation frame so playback stays smooth even between scroll
    // events (momentum, trackpad jitter, etc.)
    const smoothProgressRef = { current: 0 };

    const readProgress = () => {
      const container = containerRef.current;
      if (!container) return 0;
      const rect = container.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress = scrollable > 0 ? -rect.top / scrollable : 0;
      return Math.min(1, Math.max(0, progress));
    };

    const syncFromLenisOrWindow = () => {
      const lenis = getLenis();
      if (lenis) {
        // Lenis exposes scroll as a virtual value — use it together with the
        // container height. window.scrollY is the lerped visual position lagging behind.
        const y = lenis.scroll;
        const h = containerRef.current ? containerRef.current.offsetHeight : window.innerHeight;
        const scrollable = Math.max(1, h - window.innerHeight);
        targetProgressRef.current = Math.min(1, Math.max(0, y / scrollable));
        const lenisAny = lenis as unknown as { velocity?: number };
        const v = lenisAny.velocity ?? 0;
        scrollVelocityRef.current +=
          (Math.min(1, Math.abs(v) / 120) - scrollVelocityRef.current) * ZOOM_VELOCITY_EASE;
      } else {
        targetProgressRef.current = readProgress();
      }
    };
    const onScroll = syncFromLenisOrWindow;
    syncFromLenisOrWindow();
    smoothProgressRef.current = targetProgressRef.current;

    // once scrolled all the way to the end, loop the same range the
    // mid-sequence loop uses instead of freezing — still "scroll" phase
    // throughout, so native scroll can carry on into whatever section
    // follows the hero.
    let loopAcc = 0;
    let inEndLoop = false;
    const loopFrameDuration = 1000 / LOOP_FPS;

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = now - last;
      last = now;

      const diff = targetProgressRef.current - smoothProgressRef.current;
      const settled = Math.abs(diff) < 0.0004;
      smoothProgressRef.current = settled
        ? targetProgressRef.current
        : smoothProgressRef.current + diff * SCROLL_EASE;
      const sp = smoothProgressRef.current;

      if (!getLenis()) {
        const rawSpeed = Math.min(1, Math.abs(diff) * 20);
        scrollVelocityRef.current +=
          (rawSpeed - scrollVelocityRef.current) * ZOOM_VELOCITY_EASE;
      }

      // Chrome visibility: hide during the scrub, reveal again only at the
      // very end (and at the very start so intro/loop still read as a hero).
      // Hysteresis avoids flicker at the boundaries: hide quickly, reveal late.
      const shouldShowChrome = sp <= 0.015 || sp >= 0.985;
      const shouldHideChrome = sp > 0.05 && sp < 0.94;
      if (shouldHideChrome && heroChromeVisibleRef.current) setChromeVisible(false);
      else if (shouldShowChrome && !heroChromeVisibleRef.current) setChromeVisible(true);

      if (targetProgressRef.current >= 1 && sp > 0.995) {
        if (!inEndLoop) {
          inEndLoop = true;
          loopAcc = 0;
          frameRef.current = LOOP_RANGE.start;
          draw(frameRef.current);
        }
        loopAcc += dt;
        while (loopAcc >= loopFrameDuration) {
          loopAcc -= loopFrameDuration;
          frameRef.current =
            frameRef.current >= LOOP_RANGE.end ? LOOP_RANGE.start : frameRef.current + 1;
        }
        const next =
          frameRef.current >= LOOP_RANGE.end ? LOOP_RANGE.start : frameRef.current + 1;
        drawBlend(frameRef.current, next, loopAcc / loopFrameDuration);
      } else {
        inEndLoop = false;
        const f = frameFloatForProgress(sp);
        if (settled) {
          // scroll has come to rest — snap to a single hard frame instead of
          // holding a cross-fade, or the stopped frame looks like a double
          // exposure of its two neighbors.
          const a = Math.round(f);
          frameRef.current = a;
          draw(a);
        } else {
          const a = Math.floor(f);
          const b = Math.min(a + 1, FRAME_COUNT - 1);
          const mix = f - a;
          frameRef.current = a;
          drawBlend(a, b, mix);
        }
      }

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    const lenis = getLenis();
    const offScroll = lenis
      ? (lenis as unknown as { on: (e: string, cb: () => void) => void; off: (e: string, cb: () => void) => void }).on.bind(lenis)
      : null;
    const offOff = lenis
      ? (lenis as unknown as { off: (e: string, cb: () => void) => void }).off.bind(lenis)
      : null;
    if (offScroll) offScroll("scroll", syncFromLenisOrWindow);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (offOff) offOff("scroll", syncFromLenisOrWindow);
      cancelAnimationFrame(raf);
    };
  }, [phase]);

  // Keep the scroll track at full height from mount so ScrollTrigger pinning
  // below (FeatureExplorer etc.) measures correctly and Lenis doesn't see a
  // 1520vh jump on first takeover. Intro/loop are held in place by the takeover
  // listeners — the pin itself must already exist.
  const scrollHeight = `calc(100vh + ${TOTAL_SCROLL_VH}vh)`;

  return (
    <div ref={containerRef} style={{ height: scrollHeight }} className="relative">
      <div className="sticky top-0 h-screen w-screen overflow-hidden bg-black">
        <canvas ref={canvasRef} className="h-full w-full will-change-transform" />

        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-[0.05] mix-blend-overlay"
          style={{ backgroundImage: GRAIN_URL, backgroundSize: "180px 180px" }}
        />

        <audio ref={audioRef} src="/wind_copyright_free.mp3" loop muted={muted} />

        {/* Hero text overlay — Strapi-driven, fades in after loader; hidden during scrub */}
        {hasHeroContent && (
          <div
            className={`absolute inset-x-0 bottom-16 z-20 flex flex-col gap-8 px-[5%] transition-all duration-500 md:bottom-24 md:flex-row md:items-end md:justify-between md:px-[3%] ${
              !heroChromeVisible
                ? "pointer-events-none opacity-0 translate-y-4"
                : showHeroText
                  ? "opacity-100 translate-y-0"
                  : "pointer-events-none opacity-0 translate-y-6"
            }`}
          >
            <div className="max-w-3xl">
              {topSubtitle ? (
                <p className="text-2xl font-light tracking-tighter drop-shadow-md text-white/90 md:text-3xl">
                  {topSubtitle}
                </p>
              ) : null}
              {mainTitle ? (
                <h1 className="mb-2 text-5xl font-medium leading-none tracking-tight drop-shadow-md text-[#63B846] md:text-7xl lg:text-[3.75rem]">
                  {mainTitle}
                </h1>
              ) : null}
              {description ? (
                <div className="max-w-xl whitespace-pre-line text-base font-light leading-[1.2] tracking-tight drop-shadow-sm text-white/80 md:text-xl">
                  {description}
                </div>
              ) : null}
            </div>

            {ctaText && ctaLink ? (
              <div className="flex-shrink-0 pb-2">
                <CtaButton
                  href={ctaLink}
                  text={ctaText}
                  textColor={ctaTextColor}
                  icon={CtaIcon}
                  iconTextColor="text-white"
                />
              </div>
            ) : null}
          </div>
        )}

        {/* Scroll hint — only during loop phase to nudge the user */}
        {ready && phase === "loop" && (
          <div className="pointer-events-none absolute bottom-8 left-1/2 z-20 -translate-x-1/2 animate-pulse text-center">
            <p className="text-[11px] tracking-[0.3em] text-white/50 uppercase">Scroll to explore</p>
          </div>
        )}

        {ready && (
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Unmute background sound" : "Mute background sound"}
            className="absolute right-5 bottom-5 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/70 backdrop-blur transition-colors hover:text-white"
          >
            {muted ? (
              <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path d="M3 9v6h4l5 5V4L7 9H3z" />
                <line x1="16" y1="9" x2="21" y2="14" />
                <line x1="21" y1="9" x2="16" y2="14" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path d="M3 9v6h4l5 5V4L7 9H3z" />
                <path d="M16 8.5a5 5 0 0 1 0 7" />
                <path d="M18.5 6a8.5 8.5 0 0 1 0 12" />
              </svg>
            )}
          </button>
        )}

        {!hideLoader && (
          <LoadingScreen progress={loadedCount / FRAME_COUNT} fadeOut={ready} />
        )}
      </div>
    </div>
  );
}
