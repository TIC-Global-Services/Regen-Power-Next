"use client";

import { useEffect, useRef, useState } from "react";
import { LoadingScreen } from "./LoadingScreen";
import HorizontalCards, { type HorizontalCardItem } from "./AboutHorizontalScroll";
import { getLenis } from "@/utils/lenisBridge";

// Video timeline (seconds):
//   0 .. INTRO_END   — idle loop, plays on mount, holds until the user scrolls
//   INTRO_END .. SCRUB_END — scrub range, driven 1:1 by scroll position
//   LOOP_START .. LOOP_END — locked loop, plays freely once the scrub ends,
//     while the horizontal card track (composited on top of the video in the
//     same pinned viewport) is driven 1:1 by the remaining scroll distance
const INTRO_END = 5;
const SCRUB_END = 7;
const LOOP_START = 8;
const LOOP_END = 20;

// Extra scrollable distance (vh), split between the scrub segment and the
// horizontal-card segment that follows it. Once the user starts interacting
// the container commits to this full height permanently (never shrinks back)
// so the page doesn't jump when the phase changes.
// Note: horizontal length is dynamic from card count (passed via items).
const SCRUB_LENGTH_VH = 120;
const VH_PER_CARD = 70;

type Phase = "intro" | "scrub" | "loop";

export interface AboutBackgroundProps {
  onLoopStart?: () => void;
  heroEyebrow?: string;
  heroTitle?: string;
  heroVideoSrc?: string | null;
  items?: HorizontalCardItem[];
  fallbackItems?: HorizontalCardItem[];
}

export default function AboutBackground({
  onLoopStart,
  heroEyebrow = "Regen Power",
  heroTitle = "At A Glance",
  heroVideoSrc,
  items,
  fallbackItems,
}: AboutBackgroundProps) {
  const fallbackVideo = "/about/10002.mp4";
  const videoSrc = heroVideoSrc || fallbackVideo;
  // Use Strapi items when provided, else local fallbacks from AboutHorizontalScroll
  const displayItems = items && items.length > 0 ? items : fallbackItems;
  const effectiveCount = displayItems?.length ?? 0;
  const horizontalLengthVh = Math.max(0, (effectiveCount - 1) * VH_PER_CARD);
  const totalExtraVh = SCRUB_LENGTH_VH + horizontalLengthVh;
  const scrubFrac = totalExtraVh > 0 ? SCRUB_LENGTH_VH / totalExtraVh : 0;
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const phaseRef = useRef<Phase>("intro");
  const onLoopStartRef = useRef(onLoopStart);
  onLoopStartRef.current = onLoopStart;

  const [phase, setPhase] = useState<Phase>("intro");
  const [ready, setReady] = useState(false);

  const setPhaseBoth = (p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  };

  // Notify Lenis when the scrollable height changes (intro 100vh -> scrub/loop 500vh)
  // so virtual scroll bounds re-measure.
  useEffect(() => {
    const lenis = getLenis();
    const id = requestAnimationFrame(() => lenis?.resize());
    return () => cancelAnimationFrame(id);
  }, [phase]);

  // wait for enough data to scrub/play without stalling
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onReady = () => setReady(true);
    if (video.readyState >= 3) {
      onReady();
    } else {
      video.addEventListener("canplay", onReady, { once: true });
      return () => video.removeEventListener("canplay", onReady);
    }
  }, []);

  // idle loop: 0 -> INTRO_END, plays until the user scrolls
  useEffect(() => {
    if (!ready || phase !== "intro") return;
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.play().catch(() => {});

    let raf = 0;
    const tick = () => {
      if (video.currentTime >= INTRO_END) video.currentTime = 0;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ready, phase]);

  // locked loop: LOOP_START -> LOOP_END, plays freely once scrub is done —
  // independent of further scroll, while the horizontal track (driven below)
  // scrubs on top of it
  useEffect(() => {
    if (phase !== "loop") return;
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = LOOP_START;
    video.play().catch(() => {});
    if (titleRef.current) titleRef.current.style.opacity = "0";
    onLoopStartRef.current?.();

    let raf = 0;
    const tick = () => {
      if (video.currentTime >= LOOP_END) video.currentTime = LOOP_START;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  // once locked into the loop, drive the horizontal card track 1:1 with the
  // remaining scroll distance, and hand back to scrub if the user scrolls up
  // past the scrub boundary so reverse scrolling isn't a dead end
  useEffect(() => {
    if (phase !== "loop") return;

    let scheduledRaf: number | null = null;

    const applyProgress = () => {
      scheduledRaf = null;
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress = scrollable > 0 ? -rect.top / scrollable : 0;
      const clamped = Math.min(1, Math.max(0, progress));

      if (clamped < scrubFrac) {
        setPhaseBoth("scrub");
        return;
      }

      if (!track) return;
      const subProgress = scrubFrac < 1 ? (clamped - scrubFrac) / (1 - scrubFrac) : 1;
      const maxX = Math.max(0, track.scrollWidth - window.innerWidth);
      // Starts a full viewport off-screen right (not already in view) so the
      // first card slides in the same way every card after it does, instead
      // of appearing in place and only the rest sliding.
      const startX = window.innerWidth;
      const x = startX - subProgress * (startX + maxX);
      track.style.transform = `translateX(${x}px)`;
    };

    const onScroll = () => {
      if (scheduledRaf !== null) return;
      scheduledRaf = requestAnimationFrame(applyProgress);
    };

    // Lenis emits virtual scroll but still updates window scroll — listening to
    // both native scroll and Lenis ensures the track updates without jank.
    const lenis = getLenis();
    lenis?.on("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      lenis?.off("scroll", onScroll);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (scheduledRaf !== null) cancelAnimationFrame(scheduledRaf);
    };
  }, [phase, scrubFrac]);

  // intercept scroll intent during the idle loop and hand over to scrub
  useEffect(() => {
    if (!ready) return;

    const takeOver = () => {
      if (phaseRef.current !== "intro") return;
      setPhaseBoth("scrub");
    };

    const onWheel = (e: WheelEvent) => {
      if (phaseRef.current !== "intro") return;
      e.preventDefault();
      takeOver();
    };
    const onTouchMove = (e: TouchEvent) => {
      if (phaseRef.current !== "intro") return;
      e.preventDefault();
      takeOver();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (phaseRef.current !== "intro") return;
      if (
        ["ArrowDown", "ArrowUp", "PageDown", "PageUp", " ", "Home", "End"].includes(
          e.key,
        )
      ) {
        e.preventDefault();
        takeOver();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [ready]);

  // scrub: map scroll progress across the scrub segment directly onto currentTime
  useEffect(() => {
    if (phase !== "scrub") return;
    const video = videoRef.current;
    if (!video) return;

    video.pause();

    // The browser's seek pipeline is async — firing a new currentTime every
    // rAF while a previous seek is still resolving queues them up and the
    // playhead visibly lags/stutters mid-scrub. Only one seek is ever in
    // flight; a target that arrives while busy replaces the pending one
    // instead of queueing, so the video always catches up to the latest
    // scroll position rather than working through stale ones.
    let seeking = false;
    let pendingTime: number | null = null;

    const seekTo = (t: number) => {
      if (seeking) {
        pendingTime = t;
        return;
      }
      seeking = true;
      video.currentTime = t;
    };

    const onSeeked = () => {
      seeking = false;
      if (pendingTime !== null) {
        const t = pendingTime;
        pendingTime = null;
        seekTo(t);
      }
    };
    video.addEventListener("seeked", onSeeked);

    let scheduledRaf: number | null = null;

    const applyProgress = () => {
      scheduledRaf = null;
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress = scrollable > 0 ? -rect.top / scrollable : 0;
      const clamped = Math.min(1, Math.max(0, progress));

      if (clamped >= scrubFrac) {
        setPhaseBoth("loop");
        return;
      }

      const subProgress = scrubFrac > 0 ? clamped / scrubFrac : 0;
      if (titleRef.current) titleRef.current.style.opacity = String(1 - subProgress);
      seekTo(INTRO_END + subProgress * (SCRUB_END - INTRO_END));
    };

    const onScroll = () => {
      if (scheduledRaf !== null) return;
      scheduledRaf = requestAnimationFrame(applyProgress);
    };

    const lenis = getLenis();
    lenis?.on("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      lenis?.off("scroll", onScroll);
      window.removeEventListener("scroll", onScroll);
      video.removeEventListener("seeked", onSeeked);
      if (scheduledRaf !== null) cancelAnimationFrame(scheduledRaf);
    };
  }, [phase, scrubFrac]);

  const scrollHeight =
    phase === "intro" ? "100vh" : `calc(100vh + ${totalExtraVh}vh)`;

  return (
    <div ref={containerRef} style={{ height: scrollHeight }} className="relative">
      <div className="sticky top-0 h-screen w-screen overflow-hidden bg-black">
        <video
          ref={videoRef}
          src={videoSrc}
          className="h-full w-full object-cover"
          muted
          playsInline
          preload="auto"
        />

        <div
          className={`absolute inset-0 z-10 overflow-hidden ${
            phase === "loop" ? "" : "pointer-events-none"
          }`}
        >
          <HorizontalCards ref={trackRef} style={{ transform: "translateX(100vw)" }} items={displayItems} />
        </div>

        {/* Section header — matches project SectionHeader: green title, black desc */}
        <div
          ref={titleRef}
          className="pointer-events-none absolute inset-x-0 z-20 flex flex-col items-center px-4 text-center"
          style={{ top: "22%", transform: "translateY(-50%)" }}
        >
          <p className="text-[1.75rem] font-normal tracking-tight text-black" style={{ textShadow: "0 1px 10px rgba(255,255,255,0.9)" }}>
            {heroEyebrow}
          </p>
          <h1 className="text-[2.5rem] font-normal tracking-tight text-[#63B846] md:text-6xl" style={{ textShadow: "0 1px 16px rgba(255,255,255,0.9)" }}>
            {heroTitle}
          </h1>
        </div>

        {!ready && <LoadingScreen progress={0} fadeOut={false} />}
      </div>
    </div>
  );
}

