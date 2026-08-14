"use client";

import { useRef, useState, useEffect } from "react";
import { Hotspot } from "./Hotspot";
import { GuideTour, TOUR } from "./GuideTour";
import { LoadingScreen } from "./LoadingScreen";
import { ChargingIcon, SolarIcon, StoreIcon, BackIcon } from "./icons";
import {
  PointNum,
  Step,
  HOME_SRC,
  POINT_SRC,
  POINT_LOOP_SRC,
  POINT_REV_SRC,
  HOME_HOTSPOTS,
  BACK_HOTSPOT,
  SCENE_FADE_MS,
  LOOP_FADE_MS,
  ALL_VIDEO_SRCS,
} from "./scenes";

const POINT_ICON = {
  charging: <ChargingIcon />,
  solar: <SolarIcon />,
  store: <StoreIcon />,
};

export default function VideoHotspotExperience() {
  const videoRefs = [
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
  ];
  const activeIdxRef = useRef(0);
  const stepRef = useRef<Step>({ kind: "home" });
  const [activeIdx, setActiveIdx] = useState(0);
  const [fadeMs, setFadeMs] = useState(SCENE_FADE_MS);
  const [uiMode, setUiMode] = useState<"home" | "back" | "none">("home");
  const [uiPoint, setUiPoint] = useState<PointNum | null>(null);
  const [tourStep, setTourStep] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [ready, setReady] = useState(false);
  const [hideLoader, setHideLoader] = useState(false);

  const switchLayer = (
    src: string,
    loop: boolean,
    startTime: number,
    fade: number,
    after?: () => void,
  ) => {
    const fromIdx = activeIdxRef.current;
    const toIdx = fromIdx === 0 ? 1 : 0;
    const fromEl = videoRefs[fromIdx].current;
    const toEl = videoRefs[toIdx].current;
    if (!toEl) return;

    const reveal = () => {
      toEl.removeEventListener("loadeddata", reveal);
      activeIdxRef.current = toIdx;
      setFadeMs(fade);
      setActiveIdx(toIdx);
      window.setTimeout(() => {
        if (fromEl && fromEl !== toEl) fromEl.pause();
      }, fade + 50);
      after?.();
    };

    toEl.addEventListener("loadeddata", reveal);
    toEl.loop = loop;
    toEl.src = src;
    toEl.currentTime = startTime;
    toEl.load();
    toEl.play().catch(() => {});
  };

  useEffect(() => {
    let cancelled = false;
    let count = 0;
    const elements = ALL_VIDEO_SRCS.map((src) => {
      const v = document.createElement("video");
      v.preload = "auto";
      v.muted = true;
      v.src = src;
      const onReady = () => {
        if (cancelled) return;
        count += 1;
        setLoadedCount(count);
        if (count >= ALL_VIDEO_SRCS.length) setReady(true);
      };
      v.addEventListener("canplaythrough", onReady, { once: true });
      v.addEventListener("error", onReady, { once: true });
      v.load();
      return v;
    });
    return () => {
      cancelled = true;
      elements.forEach((v) => {
        v.src = "";
      });
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const el = videoRefs[0].current;
    if (!el) return;
    el.loop = true;
    el.src = HOME_SRC;
    el.currentTime = 0;
    el.play().catch(() => {});
    const t = window.setTimeout(() => setHideLoader(true), 300);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  const goToPoint = (point: PointNum) => {
    setTourStep(TOUR.length);
    stepRef.current = { kind: "forward", point };
    setUiMode("back");
    setUiPoint(point);
    switchLayer(POINT_SRC[point], false, 0, SCENE_FADE_MS);
  };

  const handleEnded = (idx: number) => {
    if (idx !== activeIdxRef.current) return;
    const step = stepRef.current;

    if (step.kind === "forward") {
      // full play-through finished: settle into the seamless tail loop
      stepRef.current = { kind: "loop", point: step.point };
      switchLayer(POINT_LOOP_SRC[step.point], true, 0, LOOP_FADE_MS);
    } else if (step.kind === "reverse") {
      // fully reversed back to frame 0: go home
      stepRef.current = { kind: "home" };
      setUiMode("home");
      setUiPoint(null);
      switchLayer(HOME_SRC, true, 0, SCENE_FADE_MS);
    }
  };

  const handleBack = (point: PointNum) => {
    stepRef.current = { kind: "reverse", point };
    switchLayer(POINT_REV_SRC[point], false, 0, SCENE_FADE_MS);
    setUiMode("none");
    setUiPoint(null);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {videoRefs.map((ref, i) => (
        <video
          key={i}
          ref={ref}
          className="absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out"
          style={{
            transitionDuration: `${fadeMs}ms`,
            opacity: activeIdx === i ? 1 : 0,
          }}
          playsInline
          muted
          autoPlay={i === 0}
          onEnded={() => handleEnded(i)}
        />
      ))}

      {ready &&
        uiMode === "home" &&
        HOME_HOTSPOTS.map((h, i) => (
          <Hotspot
            key={h.point}
            x={h.x}
            y={h.y}
            label={h.label}
            icon={POINT_ICON[h.icon]}
            floatDelay={i * 0.35}
            onClick={() => goToPoint(h.point)}
          />
        ))}

      {uiMode === "back" && uiPoint !== null && (
        <Hotspot
          x={BACK_HOTSPOT.x}
          y={BACK_HOTSPOT.y}
          label={BACK_HOTSPOT.label}
          icon={<BackIcon />}
          onClick={() => handleBack(uiPoint)}
        />
      )}

      {ready && tourStep < TOUR.length && (
        <GuideTour
          stop={TOUR[tourStep]}
          index={tourStep}
          total={TOUR.length}
          onNext={() => setTourStep((s) => s + 1)}
          onSkip={() => setTourStep(TOUR.length)}
        />
      )}

      {!hideLoader && (
        <LoadingScreen progress={loadedCount / ALL_VIDEO_SRCS.length} fadeOut={ready} />
      )}
    </div>
  );
}

