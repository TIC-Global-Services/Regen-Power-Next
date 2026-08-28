"use client";

import { useEffect, useRef, useState } from "react";
import { LoadingScreen } from "./LoadingScreen";
import { createSequenceRenderer, type SequenceRenderer } from "./canvas2dRenderer";
import {
  FRAME_COUNT,
  FRAME_SRC,
  FRAME_NATIVE_WIDTH,
  FRAME_NATIVE_HEIGHT,
  MOBILE_FRAME_COUNT,
  MOBILE_FRAME_SRC,
  MOBILE_FRAME_NATIVE_WIDTH,
  MOBILE_FRAME_NATIVE_HEIGHT,
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
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis } from "@/utils/lenisBridge";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export interface Home3dHeroProps {
  topSubtitle?: React.ReactNode;
  mainTitle?: React.ReactNode;
  description?: React.ReactNode;
  ctaText?: string;
  ctaLink?: string;
  ctaTextColor?: string;
}

type Phase = "intro" | "loop" | "scroll";

const TOTAL_SCROLL_VH = SCROLL_LENGTH_VH + OUTRO_LENGTH_VH;
const MAIN_SCROLL_FRAC = SCROLL_LENGTH_VH / TOTAL_SCROLL_VH;
const OUTRO_FRAME_COUNT = Math.max(0, OUTRO_RANGE.end - OUTRO_RANGE.start + 1);

// Preload concurrency. Frames load as plain <img> elements — no
// fetch()+blob()+createImageBitmap() resize step. That combo is a known-flaky
// path on WebKit/iOS at this frame count (it's what was still crashing iOS
// Safari after capping per-frame resolution); plain Image() decode is the
// battle-tested path browsers optimize for. There's no client-side resize
// anymore, so decode cost is whatever the source file is — the mobile
// sequence is currently served at native 1080x1920 (see MOBILE_SEQUENCE),
// which is a real resident-memory risk at this frame count; if iOS crashes
// resurface, that's the first thing to revisit. Firing every load at once
// still spikes transient memory/CPU, so loads are pooled instead.
const CONCURRENT_LOADS = 10;

// Frames 0..LOOP_RANGE.end are needed continuously (intro plays once, then
// loops indefinitely until the user scrolls), so they're preloaded eagerly
// and kept resident for the component's whole lifetime. The much larger
// scroll-driven range beyond it is only ever needed a couple of frames at a
// time, so those are decoded on demand as scroll position reaches them and
// evicted once far enough behind/ahead — holding all of them resident
// alongside the core range was still enough to get iOS Safari killed even
// after capping per-frame size, since total resident memory scales with
// frame *count* regardless of per-frame resolution.
const CORE_FRAME_END = LOOP_RANGE.end;
const SCROLL_WINDOW_RADIUS = 90;
const SCROLL_EVICT_RADIUS = 140;

const GRAIN_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>";
const GRAIN_URL = `url("data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}")`;

interface SequenceConfig {
  frameCount: number;
  frameSrc: (index: number) => string;
  nativeWidth: number;
  nativeHeight: number;
  isMobile: boolean;
}

const DESKTOP_SEQUENCE: SequenceConfig = {
  frameCount: FRAME_COUNT,
  frameSrc: FRAME_SRC,
  nativeWidth: FRAME_NATIVE_WIDTH,
  nativeHeight: FRAME_NATIVE_HEIGHT,
  isMobile: false,
};

const MOBILE_SEQUENCE: SequenceConfig = {
  frameCount: MOBILE_FRAME_COUNT,
  frameSrc: MOBILE_FRAME_SRC,
  nativeWidth: MOBILE_FRAME_NATIVE_WIDTH,
  nativeHeight: MOBILE_FRAME_NATIVE_HEIGHT,
  isMobile: true,
};

const isMobileClass = () =>
  typeof window !== "undefined" &&
  (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768);

// Maps a 0..1 scroll progress (within the two-segment main+outro range,
// excluding the trailing end-loop hold) to a frame index.
function frameForProgress(clamped: number, scrollFrameCount: number): number {
  if (clamped <= MAIN_SCROLL_FRAC) {
    const subProgress = MAIN_SCROLL_FRAC > 0 ? clamped / MAIN_SCROLL_FRAC : 0;
    return (
      SCROLL_START +
      Math.round(
        Math.min(scrollFrameCount - 1, subProgress * (scrollFrameCount - 1)),
      )
    );
  }
  const subProgress =
    MAIN_SCROLL_FRAC < 1 ? (clamped - MAIN_SCROLL_FRAC) / (1 - MAIN_SCROLL_FRAC) : 1;
  return (
    OUTRO_RANGE.start +
    Math.round(Math.min(OUTRO_FRAME_COUNT - 1, subProgress * (OUTRO_FRAME_COUNT - 1)))
  );
}

export default function Home3dHero({
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
  const framesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef(0);
  const phaseRef = useRef<Phase>("intro");
  // Set by the preload effect once resize/decode options are known; lets the
  // scroll effect decode on-demand frames the same way the eager core loader does.
  const decodeFrameRef = useRef<((index: number) => Promise<void>) | null>(null);
  const scrollLoadedRef = useRef<Set<number>>(new Set());
  const scrollInFlightRef = useRef<Set<number>>(new Set());

  const [seq] = useState<SequenceConfig>(() =>
    isMobileClass() ? MOBILE_SEQUENCE : DESKTOP_SEQUENCE,
  );

  const hasHeroContent = !!(topSubtitle || mainTitle || description || ctaText);

  const [loadedCount, setLoadedCount] = useState(0);
  const [ready, setReady] = useState(false);
  const [hideLoader, setHideLoader] = useState(false);
  const [phase, setPhase] = useState<Phase>("intro");
  // Hero chrome (overlay + navbar): visible during intro/loop, hidden during scrub,
  // visible again at the very end of the 500vh sequence.
  const [heroChromeVisible, setHeroChromeVisibleState] = useState(true);
  const heroChromeVisibleRef = useRef(true);

  const setChromeVisible = (v: boolean) => {
    if (heroChromeVisibleRef.current === v) return;
    heroChromeVisibleRef.current = v;
    setHeroChromeVisibleState(v);
    if (typeof document !== "undefined") {
      document.documentElement.dataset.heroChrome = v ? "visible" : "hidden";
    }
  };

  // Keep document dataset in sync on mount (navbar MutationObserver reads it)
  // and ensure visible before scroll starts.
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const setPhaseBoth = (p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  };

  const draw = (index: number) => {
    rendererRef.current?.draw(framesRef.current[index]);
  };

  // preload the core (intro+loop) range eagerly, and set up an on-demand
  // decoder the scroll effect uses to fetch further frames as needed
  useEffect(() => {
    let cancelled = false;
    let count = 0;
    const coreEnd = Math.min(CORE_FRAME_END, seq.frameCount - 1);
    const coreCount = coreEnd + 1;

    const onCoreReady = () => {
      if (cancelled) return;
      count += 1;
      setLoadedCount(count);
      if (count >= coreCount) setReady(true);
    };

    // shared by the eager core loader below and the scroll effect's on-demand loader
    const decodeOne = (i: number): Promise<void> =>
      new Promise((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          if (cancelled) return resolve();
          framesRef.current[i] = img;
          resolve();
        };
        img.onerror = () => resolve();
        img.src = seq.frameSrc(i);
      });
    decodeFrameRef.current = decodeOne;

    let nextIndex = 0;
    const startNext = () => {
      if (cancelled) return;
      const i = nextIndex++;
      if (i > coreEnd) return;
      decodeOne(i).then(() => {
        onCoreReady();
        startNext();
      });
    };

    for (let k = 0; k < CONCURRENT_LOADS; k++) startNext();

    return () => {
      cancelled = true;
      decodeFrameRef.current = null;
    };
  }, [seq]);

  useEffect(() => {
    if (!ready) return;
    const t = window.setTimeout(() => setHideLoader(true), 700);
    return () => window.clearTimeout(t);
  }, [ready]);

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
          draw(frameRef.current);
        } else {
          frameRef.current = LOOP_RANGE.start;
          draw(frameRef.current);
          setPhaseBoth("loop");
          return;
        }
      }

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
        draw(frameRef.current);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  // detect scroll intent during intro/loop
  // Regen blocks native scroll with preventDefault during intro/loop.
  // With Lenis active (SmoothScroller), preventDefault fights the virtual
  // scroller and breaks ScrollTrigger pin below (FeatureExplorer). So when
  // Lenis is present we take over passively instead.
  useEffect(() => {
    if (!ready) return;

    const takeOver = () => {
      if (phaseRef.current === "scroll") return;
      setPhaseBoth("scroll");
      setChromeVisible(false);
    };

    const hasLenis = () => !!getLenis();

    const onWheel = (e: WheelEvent) => {
      if (phaseRef.current === "scroll") return;
      if (hasLenis()) {
        takeOver();
        return;
      }
      e.preventDefault();
      takeOver();
    };
    const onTouchMove = (e: TouchEvent) => {
      if (phaseRef.current === "scroll") return;
      if (hasLenis()) {
        takeOver();
        return;
      }
      e.preventDefault();
      takeOver();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (phaseRef.current === "scroll") return;
      if (
        ["ArrowDown", "ArrowUp", "PageDown", "PageUp", " ", "Home", "End"].includes(
          e.key,
        )
      ) {
        if (!hasLenis()) e.preventDefault();
        takeOver();
      }
    };

    // passive:false only when we actually call preventDefault (no Lenis)
    // otherwise passive:true so Lenis gets the wheel
    const wheelOpt: AddEventListenerOptions = hasLenis()
      ? { passive: true }
      : { passive: false };
    const touchOpt: AddEventListenerOptions = hasLenis()
      ? { passive: true }
      : { passive: false };

    window.addEventListener("wheel", onWheel, wheelOpt);
    window.addEventListener("touchmove", onTouchMove, touchOpt);
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
    const scrollFrameCount = Math.max(0, seq.frameCount - SCROLL_START);
    if (scrollFrameCount <= 0) return;

    // No easing here on purpose: the displayed frame is a pure function of
    // the real scroll position, read fresh every time. Smoothing this toward
    // a target (as an earlier version did) makes playback keep drifting for
    // a beat after the user stops scrolling, which reads as the animation
    // "moving on its own" instead of a direct scrub.
    let scheduledRaf: number | null = null;

    // Decode frames within SCROLL_WINDOW_RADIUS of the given index (skipping
    // ones already loaded or in flight), and free ones now further than
    // SCROLL_EVICT_RADIUS away — clearing an <img>'s src drops the browser's
    // decoded surface for it instead of waiting on GC, which matters on iOS
    // where memory pressure is what's been crashing the tab. The gap between
    // the two radii is hysteresis so frames near the edge of the window
    // aren't repeatedly decoded/evicted as the position wobbles by a frame.
    const loaded = scrollLoadedRef.current;
    const inFlight = scrollInFlightRef.current;
    const ensureScrollWindow = (center: number) => {
      const decodeFrame = decodeFrameRef.current;
      if (!decodeFrame) return;

      const lo = Math.max(CORE_FRAME_END + 1, center - SCROLL_WINDOW_RADIUS);
      const hi = Math.min(seq.frameCount - 1, center + SCROLL_WINDOW_RADIUS);
      for (let i = lo; i <= hi; i++) {
        if (loaded.has(i) || inFlight.has(i)) continue;
        inFlight.add(i);
        decodeFrame(i).then(() => {
          inFlight.delete(i);
          loaded.add(i);
          if (frameRef.current === i) draw(i);
        });
      }

      for (const i of loaded) {
        if (Math.abs(i - center) > SCROLL_EVICT_RADIUS) {
          const frame = framesRef.current[i];
          if (frame) frame.removeAttribute("src");
          delete framesRef.current[i];
          loaded.delete(i);
        }
      }
    };

    // once scrolled all the way to the end, free-run the same loop range the
    // mid-sequence loop uses instead of freezing — runs independently of
    // scroll events so it keeps animating while the user holds position, and
    // never blocks scroll (still "scroll" phase throughout, so native scroll
    // can carry on into whatever section follows).
    let endLoopRaf: number | null = null;
    let endLoopLast = 0;
    let endLoopAcc = 0;
    const endLoopFrameDuration = 1000 / LOOP_FPS;

    const stopEndLoop = () => {
      if (endLoopRaf !== null) {
        cancelAnimationFrame(endLoopRaf);
        endLoopRaf = null;
      }
    };

    const endLoopTick = (now: number) => {
      endLoopAcc += now - endLoopLast;
      endLoopLast = now;
      while (endLoopAcc >= endLoopFrameDuration) {
        endLoopAcc -= endLoopFrameDuration;
        frameRef.current =
          frameRef.current >= LOOP_RANGE.end ? LOOP_RANGE.start : frameRef.current + 1;
        draw(frameRef.current);
      }
      endLoopRaf = requestAnimationFrame(endLoopTick);
    };

    const startEndLoop = () => {
      if (endLoopRaf !== null) return;
      frameRef.current = LOOP_RANGE.start;
      draw(frameRef.current);
      endLoopLast = performance.now();
      endLoopAcc = 0;
      endLoopRaf = requestAnimationFrame(endLoopTick);
    };

    const applyProgress = () => {
      scheduledRaf = null;
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress = scrollable > 0 ? -rect.top / scrollable : 0;
      const clamped = Math.min(1, Math.max(0, progress));

      // Chrome: visible at both ends of the runway, hidden during scrub.
      // Hysteresis (dead-zone 0.015–0.03 / 0.97–0.985) avoids flicker when Lenis
      // jitters clamped at the boundaries.
      const shouldShow = clamped <= 0.015 || clamped >= 0.985;
      const shouldHide = clamped > 0.03 && clamped < 0.97;
      if (shouldShow && !heroChromeVisibleRef.current) setChromeVisible(true);
      else if (shouldHide && heroChromeVisibleRef.current) setChromeVisible(false);

      if (clamped >= 1) {
        startEndLoop();
        return;
      }
      stopEndLoop();

      const f = frameForProgress(clamped, scrollFrameCount);
      frameRef.current = f;
      if (f > CORE_FRAME_END) ensureScrollWindow(f);
      draw(f);
    };

    // coalesce bursts of scroll events into at most one draw per animation
    // frame, without waiting for or smoothing toward anything
    const onScroll = () => {
      if (scheduledRaf !== null) return;
      scheduledRaf = requestAnimationFrame(applyProgress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scheduledRaf !== null) cancelAnimationFrame(scheduledRaf);
      stopEndLoop();
    };
  }, [phase, seq]);

  // Sync initial chrome state to the document so Navbar picks it up even before first scroll
  useEffect(() => {
    document.documentElement.dataset.heroChrome = heroChromeVisibleRef.current ? "visible" : "hidden";
    return () => {
      document.documentElement.dataset.heroChrome = "visible";
    };
  }, []);

  // Always full runway from mount — conditional `100vh → 500vh` on takeover
  // (regen-3d's standalone page) janks ScrollTrigger below: FeatureExplorer's
  // `pin:true` measures its `top top` trigger at 100vh, then the track jumps
  // +400vh on first wheel and the pin fires mid-viewport / overlaps the sticky.
  // Keeping the track stable + refreshing ScrollTrigger on takeover eliminates
  // the clash while keeping the regen engine 1:1 otherwise.
  const scrollHeight = `calc(100vh + ${TOTAL_SCROLL_VH}vh)`;

  // After the sticky track expands (phase intro→scroll), tell ScrollTrigger below
  // to re-measure — otherwise FeatureExplorer's pin start is stale.
  useEffect(() => {
    if (phase !== "scroll") return;
    const raf = requestAnimationFrame(() => {
      getLenis()?.resize();
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  return (
    <div ref={containerRef} style={{ height: scrollHeight }} className="relative bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
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

        {/* Overlay content — Strapi-driven, visible before scroll and after sequence */}
        {hasHeroContent && (
          <div
            className={`absolute inset-x-0 bottom-16 z-20 flex flex-col gap-8 px-[5%] transition-all duration-500 md:bottom-24 md:flex-row md:items-end md:justify-between md:px-[3%] ${heroChromeVisible ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-4"}`}
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

        {!hideLoader && (
          <LoadingScreen
            progress={loadedCount / (Math.min(CORE_FRAME_END, seq.frameCount - 1) + 1)}
            fadeOut={ready}
          />
        )}
      </div>
    </div>
  );
}
