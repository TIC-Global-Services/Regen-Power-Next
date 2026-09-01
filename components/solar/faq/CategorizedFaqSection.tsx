"use client";

import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { ChevronRight, Plus, X } from "lucide-react";
import FadeSwap from "@/reuseables/FadeSwap";
import type { ResolvedFaqCategorizedFaq } from "@/lib/strapi/resolvers/faq";

interface Props {
  resolved: ResolvedFaqCategorizedFaq;
}

function categoryKey(
  cat: ResolvedFaqCategorizedFaq["categories"][number],
): string {
  return cat.categoryId;
}

export default function CategorizedFaqSection({ resolved }: Props) {
  const [activeKey, setActiveKey] = useState(
    resolved.categories.length > 0 ? categoryKey(resolved.categories[0]) : "",
  );
  const [openIndex, setOpenIndex] = useState(0);
  const accordionId = useId();
  const pillsRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Smoothly slide the pill row so the active category is centered in view.
  useEffect(() => {
    pillRefs.current[activeKey]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeKey]);

  /** True while there is still hidden pill content beyond the right edge. */
  const updateCanScrollRight = useCallback(() => {
    const el = pillsRef.current;
    if (!el) return;
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    updateCanScrollRight();
    window.addEventListener("resize", updateCanScrollRight);
    return () => window.removeEventListener("resize", updateCanScrollRight);
  }, [updateCanScrollRight, resolved.categories]);

  /** Slide the pill row left by ~70% of its visible width. */
  const handleHintClick = () => {
    const el = pillsRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * 0.7, behavior: "smooth" });
  };

  const activeCategory =
    resolved.categories.find((c) => categoryKey(c) === activeKey) ??
    resolved.categories[0];

  if (!activeCategory) return null;

  return (
    <section className="bg-white px-[5%] md:px-[3%] py-16 md:py-24">
      <div className="relative w-full">
        <div
          ref={pillsRef}
          onScroll={updateCanScrollRight}
          className="flex flex-nowrap lg:flex-wrap overflow-x-auto lg:overflow-visible lg:justify-center gap-2 md:gap-4 whitespace-nowrap -mx-[5%] px-[5%] md:-mx-[3%] md:px-[3%] lg:mx-0 lg:px-0 snap-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {resolved.categories.map((category) => {
            const key = categoryKey(category);
            const active = key === activeKey;

            return (
              <button
                key={key}
                ref={(el) => {
                  pillRefs.current[key] = el;
                }}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={`${accordionId}-${key}`}
                onClick={() => {
                  setActiveKey(key);
                  setOpenIndex(0);
                }}
                className={`whitespace-nowrap shrink-0 snap-start rounded-full border text-sm md:text-xl px-4 py-2.5 md:px-7 md:py-4 tracking-tight transition-colors ${
                  active
                    ? "border-[#CBEFB8] bg-[#CBEFB8] text-black"
                    : "border-transparent bg-transparent text-black/90 hover:bg-[#EEF6EB]"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {/* ›› scroll hint — mobile only, clickable, hides once you reach the end */}
        {canScrollRight && (
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={handleHintClick}
            aria-label="Scroll to see more categories"
            className="lg:hidden absolute inset-y-0 -right-[5%] flex items-center justify-end w-16 pr-1 bg-gradient-to-l from-white via-white/80 to-transparent cursor-pointer"
          >
            <span className="flex items-center text-black/60">
              <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
              <ChevronRight className="w-4 h-4 -ml-2.5" strokeWidth={2.5} />
            </span>
          </button>
        )}
      </div>

      <div
        id={`${accordionId}-${categoryKey(activeCategory)}`}
        role="tabpanel"
        className="mx-auto mt-12 max-w-5xl"
      >
        <FadeSwap swapKey={activeKey}>
          <div className="space-y-2">
          {(activeCategory.items ?? []).map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className="border-b-2 border-[#EEF6EB]">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-start justify-between gap-6 py-5 text-left cursor-pointer"
                >
                  <span className="text-2xl tracking-tight text-black md:text-[2rem]">
                    {item.question}
                  </span>
                  <span className="mt-1 flex-shrink-0 text-[#63B846]">
                    {isOpen ? (
                      <X size={24} strokeWidth={2} />
                    ) : (
                      <Plus size={24} strokeWidth={2} />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <p className="max-w-4xl pb-6 pr-12 text-base leading-tight text-black/75 md:text-xl">
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
          </div>
        </FadeSwap>
      </div>
    </section>
  );
}
