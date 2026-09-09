"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface Props {
  images: string[];
  title: string;
}

export default function CaseStudyGallery({ images, title }: Props) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  if (!images || images.length <= 1) return null;

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx + 1) % images.length);
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx - 1 + images.length) % images.length);
  };

  return (
    <section className="px-[5%] md:px-[3%] mx-auto max-w-7xl pb-20 md:pb-28 bg-white">
      <div className="mb-8">
        <span className="text-xs uppercase tracking-widest text-[#4d7a17] font-semibold">
          Installation Gallery
        </span>
        <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-neutral-900 mt-2">
          Site Documentation & Rooftop Details
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
        {images.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setSelectedIdx(idx)}
            className="group relative h-40 sm:h-52 md:h-60 rounded-[18px] sm:rounded-[24px] overflow-hidden bg-neutral-100 border border-[#DCE8D8] text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#63B846]"
          >
            <Image
              src={img}
              alt={`${title} - Photo ${idx + 1}`}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedIdx(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedIdx(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close image preview"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={prevImg}
            className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            className="relative w-full max-w-5xl h-[60vh] sm:h-[75vh] rounded-[24px] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedIdx]}
              alt={`${title} - Photo ${selectedIdx + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <button
            type="button"
            onClick={nextImg}
            className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-xs sm:text-sm font-medium tracking-wide">
            {selectedIdx + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  );
}
