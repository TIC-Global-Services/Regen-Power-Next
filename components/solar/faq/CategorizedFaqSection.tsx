"use client";

import React, { useId, useState } from "react";
import { Plus, X } from "lucide-react";
import type { ResolvedFaqCategorizedFaq } from "@/lib/strapi/resolvers/faq";

interface Props {
  resolved: ResolvedFaqCategorizedFaq;
}

function categoryKey(cat: ResolvedFaqCategorizedFaq["categories"][number]): string {
  return cat.categoryId;
}

export default function CategorizedFaqSection({ resolved }: Props) {
  const [activeKey, setActiveKey] = useState(
    resolved.categories.length > 0 ? categoryKey(resolved.categories[0]) : ""
  );
  const [openIndex, setOpenIndex] = useState(0);
  const accordionId = useId();

  const activeCategory =
    resolved.categories.find((c) => categoryKey(c) === activeKey) ?? resolved.categories[0];

  if (!activeCategory) return null;

  return (
    <section className="bg-white px-[5%] py-16 md:py-24">
      <div className="">
        <div className="overflow-x-auto pb-3">
          <div className="flex gap-2 md:gap-4">
            {resolved.categories.map((category) => {
              const key = categoryKey(category);
              const active = key === activeKey;

              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls={`${accordionId}-${key}`}
                  onClick={() => {
                    setActiveKey(key);
                    setOpenIndex(0);
                  }}
                  className={`whitespace-nowrap shrink-0 rounded-full text-sm md:text-xl px-4 py-2.5 md:px-7 md:py-4 tracking-tight transition-colors ${
                    active
                      ? "bg-[#CBEFB8] text-black"
                      : "bg-transparent text-black/90 hover:bg-[#EEF6EB]"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          id={`${accordionId}-${categoryKey(activeCategory)}`}
          role="tabpanel"
          className="mx-auto mt-12 max-w-5xl"
        >
          <div className="space-y-2">
            {(activeCategory.items ?? []).map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={index} className="border-b-2 border-[#EEF6EB]">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="flex w-full items-start justify-between gap-6 py-5 text-left"
                  >
                    <span className="text-2xl tracking-tight text-black md:text-[2rem]">
                      {item.question}
                    </span>
                    <span className="mt-1 flex-shrink-0 text-[#63B846]">
                      {isOpen ? <X size={24} strokeWidth={2} /> : <Plus size={24} strokeWidth={2} />}
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
        </div>
      </div>
    </section>
  );
}
