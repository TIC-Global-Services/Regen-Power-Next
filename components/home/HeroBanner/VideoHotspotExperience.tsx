"use client";

import { useRef, useState, useEffect } from "react";
import { Hotspot } from "./Hotspot";
import { GuideTour, TOUR } from "./GuideTour";
import { LoadingScreen } from "./LoadingScreen";
import { CtaIcon } from "@/components/icons/CtaIcons";
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
import CtaButton from "@/reuseables/CtaButton";

interface VideoHotspotExperienceProps {
  topSubtitle: React.ReactNode;
  mainTitle: React.ReactNode;
  description: React.ReactNode;
  ctaText: string;
  ctaLink: string;
  ctaTextColor?: string;
}

const POINT_ICON = {
  charging: <ChargingIcon />,
  solar: <SolarIcon />,
  store: <StoreIcon />,
};

export default function VideoHotspotExperience({
  topSubtitle,
  mainTitle,
  description,
  ctaText,
  ctaLink,
  ctaTextColor = "text-white",
}: VideoHotspotExperienceProps) {
  {
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
    const [showText, setShowText] = useState(true);


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
      toEl.play().catch(() => { });
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
      el.play().catch(() => { });
      const t = window.setTimeout(() => setHideLoader(true), 300);
      return () => window.clearTimeout(t);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ready]);

    const goToPoint = (point: PointNum) => {
      setTourStep(TOUR.length);
      stepRef.current = { kind: "forward", point };
      setUiMode("back");
      setUiPoint(point);
      setShowText(false);
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
        setShowText(true);
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

        {/* Hero Text Content Overlay */}
        {ready && (
          <div
            className={`absolute bottom-16 md:bottom-24 left-0 w-full z-10 px-[5%] flex flex-col md:flex-row md:items-end justify-between gap-8 pointer-events-none transition-all duration-700 ease-in-out ${showText
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
              }`}
          >
            <div className="max-w-3xl">
              <p className="text-2xl md:text-3xl font-light tracking-tighter drop-shadow-md text-white/90">
                {topSubtitle}
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-[3.750rem] font-medium mb-2 leading-none tracking-tight drop-shadow-md text-[#63B846]">
                {mainTitle}
              </h1>
              <div className="text-base md:text-xl leading-[1.2] max-w-xl font-light tracking-tight drop-shadow-sm text-white/80 whitespace-pre-line">
                {description}
              </div>
            </div>

            {/* CTA Button — uniform green hover + arrow animation */}
            <div className="flex-shrink-0 pb-2 pointer-events-auto">
              <CtaButton
                href={ctaLink}
                text={ctaText}
                textColor={ctaTextColor}
                icon={CtaIcon}
                iconTextColor="text-white"
              />
            </div>
          </div>
        )}


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
  }}
  
