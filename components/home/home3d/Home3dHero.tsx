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

const SCROLL_FRAME_COUNT = Math.max(0, FRAME_COUNT - SCROLL_START);

// Preload tuning. Frames are decoded at 1920x1080 native, which is ~7.9MB of
// raw pixel data per bitmap uncompressed — holding all 674 at native
// resolution is ~5GB and reliably crashes mobile browsers on memory pressure
// partway through loading. Decoding at just the resolution the device can
// actually display (with modest headroom for resize/rotation) cuts that
// proportionally to device size with no visible quality loss. Firing all 674
// fetch+decode operations at once also spikes transient memory/CPU, so loads
// are pooled instead.
const CONCURRENT_LOADS = 6;
const RESIZE_HEADROOM = 1.25;

const GRAIN_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>";
const GRAIN_URL = `url("data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}")`;

// Maps a 0..1 scroll progress (within the two-segment main+outro range,
// excluding the trailing end-loop hold) to a frame index.
function frameForProgress(clamped: number): number {
  if (clamped <= MAIN_SCROLL_FRAC) {
    const subProgress = MAIN_SCROLL_FRAC > 0 ? clamped / MAIN_SCROLL_FRAC : 0;
    return (
      SCROLL_START +
      Math.round(
        Math.min(SCROLL_FRAME_COUNT - 1, subProgress * (SCROLL_FRAME_COUNT - 1)),
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
  const framesRef = useRef<(ImageBitmap | HTMLImageElement)[]>([]);
  const frameRef = useRef(0);
  const phaseRef = useRef<Phase>("intro");

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
    if (SCROLL_FRAME_COUNT <= 0) return;

    // No easing here on purpose: the displayed frame is a pure function of
    // the real scroll position, read fresh every time. Smoothing this toward
    // a target (as an earlier version did) makes playback keep drifting for
    // a beat after the user stops scrolling, which reads as the animation
    // "moving on its own" instead of a direct scrub.
    let scheduledRaf: number | null = null;

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

      const f = frameForProgress(clamped);
      frameRef.current = f;
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
  }, [phase]);

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
          <LoadingScreen progress={loadedCount / FRAME_COUNT} fadeOut={ready} />
        )}
      </div>
    </div>
  );
}
