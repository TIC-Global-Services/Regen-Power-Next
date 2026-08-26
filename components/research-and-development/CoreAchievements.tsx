'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import type { ResolvedCoreAchievementsSection } from '@/lib/strapi/resolvers/research';

gsap.registerPlugin(Draggable, InertiaPlugin);

interface Props {
  resolved: ResolvedCoreAchievementsSection;
}

const AUTOPLAY_DELAY = 4500;
const AUTOPLAY_DURATION = 0.9;
const COPIES = 3; // 3 copies of the items so the autoplay window is "infinite"
const MID_COPY = 1; // the visible/accessible copy the carousel cycles within

const CoreAchievements = ({ resolved }: Props) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const proxyRef = useRef<HTMLDivElement | null>(null);
  const items = resolved.items ?? [];

  useEffect(() => {
    const track = trackRef.current;
    const proxy = proxyRef.current;
    if (!track || !proxy || items.length === 0) return;

    const slides = Array.from(track.children) as HTMLElement[];
    const N = items.length;
    let currentIndex = N;
    let lastActiveIndex = -1;

    // Cache slide sub-elements once to avoid expensive DOM queries during scroll/drag
    const slideItems = slides.map((s) => ({
      el: s,
      gradient: s.querySelector('.slide-gradient') as HTMLElement | null,
      content: s.querySelector('.slide-content') as HTMLElement | null,
    }));

    // Cache each slide's horizontal center (layout-based, unaffected by the
    // coverflow transforms) and re-measure only when the container resizes.
    let centers: number[] = [];
    const measure = () => {
      centers = slides.map((s) => s.offsetLeft + s.offsetWidth / 2);
    };
    const scrollXFor = (i: number) => centers[i] - track.clientWidth / 2;

    // Coverflow: map each slide's distance from the track center to a 3D pose.
    const applyCoverflow = () => {
      const half = track.clientWidth / 2;
      const scroll = track.scrollLeft;
      const trackWidth = track.clientWidth;
      let closestIndex = N;
      let minDistance = Infinity;

      for (let i = 0; i < slides.length; i++) {
        const dist = centers[i] - (scroll + half);
        const absDist = Math.abs(dist);
        if (absDist < minDistance) {
          minDistance = absDist;
          closestIndex = i;
        }

        const progress = gsap.utils.clamp(-1, 1, dist / trackWidth);
        const abs = Math.abs(progress);

        gsap.set(slides[i], {
          rotationY: progress * 30,
          scale: 1 - abs * 0.15,
          translateZ: abs * -40,
          zIndex: Math.round(100 - abs * 50),
          force3D: true,
        });
      }

      // Only animate overlay changes when the active slide actually changes
      if (closestIndex !== lastActiveIndex) {
        if (lastActiveIndex >= 0 && slideItems[lastActiveIndex]) {
          const prev = slideItems[lastActiveIndex];
          if (prev.gradient) gsap.to(prev.gradient, { opacity: 0, duration: 0.3, overwrite: 'auto' });
          if (prev.content) gsap.to(prev.content, { opacity: 0, y: 15, duration: 0.3, pointerEvents: 'none', overwrite: 'auto' });
        }
        if (slideItems[closestIndex]) {
          const curr = slideItems[closestIndex];
          if (curr.gradient) gsap.to(curr.gradient, { opacity: 1, duration: 0.3, overwrite: 'auto' });
          if (curr.content) gsap.to(curr.content, { opacity: 1, y: 0, duration: 0.3, pointerEvents: 'auto', overwrite: 'auto' });
        }
        lastActiveIndex = closestIndex;
        currentIndex = closestIndex;
      }
    };

    const onScroll = () => applyCoverflow();
    track.addEventListener('scroll', onScroll, { passive: true });

    // Center the first slide of the middle copy on load, and keep it centered +
    // re-measured when the container resizes.
    const ro = new ResizeObserver(() => {
      measure();
      track.scrollLeft = scrollXFor(Math.min(currentIndex, slides.length - 1));
      applyCoverflow();
    });
    ro.observe(track);

    // Final re-measure after full page load (late font/image layout can shift offsets).
    const onLoad = () => {
      measure();
      track.scrollLeft = scrollXFor(currentIndex);
      applyCoverflow();
    };
    if (document.readyState === 'complete') {
      onLoad();
    } else {
      window.addEventListener('load', onLoad);
    }

    // Autoplay: advance one slide every 4.5s; wrap seamlessly at the window edge.
    let timer: ReturnType<typeof setInterval> | undefined;
    const startAutoplay = () => {
      stopAutoplay();
      timer = setInterval(() => {
        currentIndex += 1;
        if (currentIndex > 2 * N - 1) {
          currentIndex = N;
          track.style.scrollSnapType = 'none'; // seamless wrap without snap interference
          track.scrollLeft = scrollXFor(currentIndex); // instant, visually identical
          applyCoverflow();
          track.style.scrollSnapType = '';
          return;
        }
        // Native snap-mandatory can fight/jitter a script-driven scroll, so disable
        // it for the duration of the autoplay tween and restore it when it finishes.
        track.style.scrollSnapType = 'none';
        gsap.to(track, {
          scrollLeft: scrollXFor(currentIndex),
          duration: AUTOPLAY_DURATION,
          ease: 'power2.inOut',
          onComplete: () => {
            track.style.scrollSnapType = '';
          },
        });
      }, AUTOPLAY_DELAY);
    };
    const stopAutoplay = () => {
      if (timer) clearInterval(timer);
      timer = undefined;
    };

    measure();
    currentIndex = N;
    track.scrollLeft = scrollXFor(currentIndex);
    applyCoverflow();
    startAutoplay();

    // Pause autoplay while the user interacts, resume after
    const pause = () => {
      stopAutoplay();
      gsap.killTweensOf(track);
      gsap.killTweensOf(proxy);
    };
    const resume = () => startAutoplay();
    track.addEventListener('pointerdown', pause);
    window.addEventListener('pointerup', resume);
    track.addEventListener('wheel', pause, { passive: true });
    window.addEventListener('wheel', resume, { passive: true });

    // Desktop mouse grab-drag (parity with Swiper's grabCursor).
    let draggable: Draggable | undefined;
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      draggable = Draggable.create(proxy, {
        type: 'x',
        trigger: track,
        cursor: 'grab',
        activeCursor: 'grabbing',
        allowNativeTouchScroll: true,
        dragClickables: true,
        inertia: true,
        onPress() {
          gsap.killTweensOf(proxy);
          gsap.killTweensOf(track);
          // Sync proxy position to current scroll position so dragging doesn't jump
          gsap.set(proxy, { x: -track.scrollLeft });
          this.update();
          track.style.scrollSnapType = 'none';
        },
        onDrag: function (this: any) {
          track.scrollLeft = -this.x;
        },
        onThrowUpdate: function (this: any) {
          track.scrollLeft = -this.x;
        },
        onThrowComplete() {
          track.style.scrollSnapType = '';
        },
        snap: ({
          x: (value: number) => {
            let best = centers[0] ?? 0;
            let bestDist = Infinity;
            for (const c of centers) {
              const t = -(c - track.clientWidth / 2);
              const d = Math.abs(t - value);
              if (d < bestDist) {
                bestDist = d;
                best = t;
              }
            }
            return best;
          },
          duration: 0.5,
          ease: 'power3.out',
        }) as any,
      })[0];
    }

    return () => {
      track.removeEventListener('scroll', onScroll);
      track.removeEventListener('pointerdown', pause);
      window.removeEventListener('pointerup', resume);
      track.removeEventListener('wheel', pause);
      window.removeEventListener('wheel', resume);
      window.removeEventListener('load', onLoad);
      ro.disconnect();
      stopAutoplay();
      if (draggable) draggable.kill();
      gsap.killTweensOf(track);
      gsap.killTweensOf(proxy);
    };
  }, [items.length]);

  if (items.length === 0) return null;

  return (
    <section className="w-full py-10 md:py-20 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-[3%]">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-2xl md:text-3xl font-light tracking-tight text-black leading-none">
            {resolved.subtitle}
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[#63B846]">
            {resolved.title}
          </h2>
        </div>
      </div>

      <div className="relative">
        {/* Invisible proxy for Draggable so the track itself is never transformed */}
        <div ref={proxyRef} className="absolute top-0 left-0 w-0 h-0 pointer-events-none" aria-hidden="true" />

        {/* Scroll track: native scroll handles touch/trackpad/wheel + snap-centering;
            GSAP supplies the coverflow pose, autoplay and (desktop) grab-drag. */}
        <div
          ref={trackRef}
          className="relative flex overflow-x-auto  [perspective:1200px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing select-none"
        >
          {Array.from({ length: COPIES }).map((_, copyIdx) => (
            <React.Fragment key={copyIdx}>
              {items.map((item, i) => {
                const isDuplicate = copyIdx !== MID_COPY;
                return (
                  <div
                    key={`${copyIdx}-${i}`}
                    aria-hidden={isDuplicate}
                    className="snap-center shrink-0 w-[70%] md:w-[70%] h-[50dvh] md:h-[50dvh] mx-1 md:-mx-3 lg:-mx-12 select-none"
                  >
                    <div
                      // href={item.href}
                      tabIndex={isDuplicate ? -1 : undefined}
                      draggable={false}
                      className="group relative block w-full h-full rounded-2xl overflow-hidden select-none"
                    >
                      <img
                        src={item.image?.src || '/fallback.png'}
                        alt={item.image?.alt ?? item.title}
                        draggable={false}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none select-none"
                      />
                      <div className="slide-gradient absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent opacity-0 pointer-events-none" />
                      <div className="slide-content absolute bottom-0 left-0 right-0 p-5 md:p-10 text-white flex flex-col md:flex-row md:items-end md:justify-between gap-4 opacity-0 pointer-events-none">
                        <div className="max-w-xl text-left">
                          <h3 className="text-xl md:text-3xl lg:text-4xl font-medium tracking-tight leading-tight mb-2 md:mb-3">
                            {item.title}
                          </h3>
                          <p className="text-sm md:text-base lg:text-lg leading-snug tracking-tight text-white/85">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreAchievements;
