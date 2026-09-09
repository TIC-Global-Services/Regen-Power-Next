"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Props {
  lead?: string;
  trail?: string;
  className?: string;
}

export default function CaseStudyHighlight({
  lead = "",
  trail,
  className = "",
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      const leadWords = gsap.utils.toArray<HTMLElement>(
        sectionEl.querySelectorAll(".word-lead")
      );
      const trailWords = gsap.utils.toArray<HTMLElement>(
        sectionEl.querySelectorAll(".word-trail")
      );
      const allWords = [...leadWords, ...trailWords];

      if (allWords.length === 0) return;

      const prefersReducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.set(leadWords, { color: "#171717" });
        gsap.set(trailWords, { color: "#71717A" });
        return;
      }

      const createPinnedAnimation = (
        pinMultiplier: number,
        stagger: number
      ) => {
        const getEnd = () =>
          `+=${Math.round(window.innerHeight * pinMultiplier)}`;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionEl,
            start: "top top",
            end: getEnd,
            scrub: 0.7,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
          },
        });

        if (leadWords.length > 0) {
          tl.to(leadWords, {
            color: "#171717",
            stagger,
            ease: "none",
          });
        }

        if (trailWords.length > 0) {
          tl.to(trailWords, {
            color: "#71717A",
            stagger,
            ease: "none",
          });
        }

        const pinTrigger = ScrollTrigger.create({
          trigger: sectionEl,
          start: "top top",
          end: getEnd,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        });

        return () => {
          tl.kill();
          pinTrigger.kill();
        };
      };

      // Responsive pinning durations & stagger speeds
      mm.add("(min-width: 1280px)", () => createPinnedAnimation(1.25, 0.08));
      mm.add("(min-width: 768px) and (max-width: 1279px)", () =>
        createPinnedAnimation(1.0, 0.06)
      );
      mm.add("(max-width: 767px)", () => createPinnedAnimation(0.85, 0.04));
    }, sectionEl);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, [lead, trail]);

  if (!lead && !trail) return null;

  const renderWords = (text: string, type: "lead" | "trail") => {
    if (!text) return null;
    const words = text.trim().split(/\s+/);
    return words.map((word, idx) => (
      <span
        key={`${type}-${idx}`}
        className={`inline-block mr-[0.25em] text-[#D4D4D8] word-${type}`}
      >
        {word}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      className={`w-full bg-white relative overflow-hidden min-h-screen flex flex-col justify-center py-16 md:py-24 ${className}`}
    >
      <div className="max-w-6xl mx-auto px-[5%] md:px-[3%] w-full">
        <blockquote className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-normal tracking-tight leading-[1.25]">
          {lead && renderWords(lead, "lead")}
          {trail && renderWords(trail, "lead")}
        </blockquote>
      </div>
    </section>
  );
}


