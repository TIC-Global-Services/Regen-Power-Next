"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";

interface Props {
  title?: string;
  image?: string;
  imageAlt?: string;
  images?: string[];
}

export default function CaseStudyShowcase({
  title = "Project Showcase",
  image,
  imageAlt = "Project showcase installation photo",
  images = [],
}: Props) {
  // Combine single image and images array gracefully
  const galleryImages: string[] = React.useMemo(() => {
    const list: string[] = [];
    if (images && images.length > 0) {
      images.forEach((img) => {
        if (img && !list.includes(img)) list.push(img);
      });
    }
    if (image && !list.includes(image)) {
      list.unshift(image);
    }
    return list;
  }, [image, images]);

  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

  const heroImage = image || galleryImages[0] || "/portfolio_hero.png";

  const closeModal = useCallback(() => {
    setActiveModalIndex(null);
  }, []);

  const nextModalImage = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (activeModalIndex === null || galleryImages.length === 0) return;
      setActiveModalIndex((activeModalIndex + 1) % galleryImages.length);
    },
    [activeModalIndex, galleryImages.length]
  );

  const prevModalImage = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (activeModalIndex === null || galleryImages.length === 0) return;
      setActiveModalIndex(
        (activeModalIndex - 1 + galleryImages.length) % galleryImages.length
      );
    },
    [activeModalIndex, galleryImages.length]
  );

  // Keyboard navigation for full screen modal
  useEffect(() => {
    if (activeModalIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "ArrowRight") {
        nextModalImage();
      } else if (e.key === "ArrowLeft") {
        prevModalImage();
      }
    };

    // Lock body scroll when modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [activeModalIndex, closeModal, nextModalImage, prevModalImage]);

  return (
    <section className="px-[5%] md:px-[3%]  pb-20 md:pb-28 lg:pb-32 bg-white">
      {/* 1. Primary Showcase Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-4 items-stretch">
        {/* Left Card: Pale Tinted Container with "Project Showcase" */}
        <div className="lg:col-span-4 bg-[#EEF5EA] border border-[#DCE8D8] rounded-[24px] sm:rounded-[32px] p-8 md:p-12 flex flex-col justify-end min-h-[280px] sm:min-h-[380px] md:min-h-[513px]">
          {/* <span className="text-xs uppercase tracking-widest text-[#4d7a17] font-semibold mb-2">
            Gallery & Site Documentation
          </span> */}
          <h3 className="text-3xl sm:text-3xl lg:text-[2.125rem] font-normal tracking-tight text-neutral-900 leading-tight">
            {title}
          </h3>
          {/* {galleryImages.length > 0 && (
            <p className="text-xs text-neutral-500 mt-2 font-medium">
              {galleryImages.length} High-Resolution Photograph
              {galleryImages.length > 1 ? "s" : ""}
            </p>
          )} */}
        </div>

        {/* Right Card: High-Res Project Photo (Clickable to full screen) */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => {
            const foundIdx = galleryImages.indexOf(heroImage);
            setActiveModalIndex(foundIdx >= 0 ? foundIdx : 0);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              const foundIdx = galleryImages.indexOf(heroImage);
              setActiveModalIndex(foundIdx >= 0 ? foundIdx : 0);
            }
          }}
          className="lg:col-span-8 relative min-h-[340px] sm:min-h-[420px] md:min-h-[480px] rounded-[20px] sm:rounded-[24px] overflow-hidden bg-neutral-100 border border-neutral-200 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#63B846]"
          aria-label="View hero image full screen"
        >
          <Image
            src={heroImage}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-md text-white text-xs font-medium px-4 py-2 rounded-full inline-flex items-center gap-2">
              <Maximize2 className="w-3.5 h-3.5" />
              View Full Screen
            </span>
          </div>
        </div>
      </div>

      {/* 2. Responsive Image Grid below Showcase */}
      {galleryImages.length > 1 && (
        <div className="mt-12 md:mt-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#63B846]" />
              <h4 className="text-xl sm:text-2xl font-normal tracking-tight text-neutral-900">
                Installation & Site Documentation
              </h4>
            </div>
            <span className="text-xs uppercase tracking-wider text-neutral-500 font-medium">
              Click to enlarge
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {galleryImages.map((imgUrl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveModalIndex(idx)}
                className="group relative aspect-[4/3] rounded-[18px] sm:rounded-[20px] overflow-hidden bg-neutral-100 border border-[#DCE8D8] text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#63B846]"
                aria-label={`View photo ${idx + 1} full screen`}
              >
                <Image
                  src={imgUrl}
                  alt={`${title} photo ${idx + 1}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-black/60 backdrop-blur-sm text-white">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. High-Resolution Fullscreen Modal */}
      {activeModalIndex !== null && galleryImages[activeModalIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 md:p-8"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery preview modal"
        >
          {/* Top Bar */}
          <div
            className="flex items-center justify-between w-full z-10 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm font-medium tracking-wide text-white/80 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                {activeModalIndex + 1} / {galleryImages.length}
              </span>
              <span className="text-xs sm:text-sm text-white/60 hidden sm:inline-block truncate max-w-md">
                {title}
              </span>
            </div>

            <button
              type="button"
              onClick={closeModal}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#63B846]"
              aria-label="Close modal (Esc)"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Main Photo Viewing Area */}
          <div
            className="relative w-full flex-1 flex items-center justify-center my-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Button */}
            {galleryImages.length > 1 && (
              <button
                type="button"
                onClick={prevModalImage}
                className="absolute left-2 sm:left-6 z-20 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/10 transition-all cursor-pointer hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#63B846]"
                aria-label="Previous photo (Arrow Left)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Centered Image */}
            <div className="relative w-full max-w-5xl h-[60vh] sm:h-[72vh]">
              <Image
                src={galleryImages[activeModalIndex]}
                alt={`${title} photo ${activeModalIndex + 1}`}
                fill
                priority
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {/* Next Button */}
            {galleryImages.length > 1 && (
              <button
                type="button"
                onClick={nextModalImage}
                className="absolute right-2 sm:right-6 z-20 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/10 transition-all cursor-pointer hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#63B846]"
                aria-label="Next photo (Arrow Right)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Thumbnail Strip */}
          {galleryImages.length > 1 && (
            <div
              className="w-full flex items-center justify-center overflow-x-auto py-2 px-4 gap-2 z-10 scrollbar-none"
              onClick={(e) => e.stopPropagation()}
            >
              {galleryImages.map((thumbUrl, tIdx) => (
                <button
                  key={tIdx}
                  type="button"
                  onClick={() => setActiveModalIndex(tIdx)}
                  className={`relative w-14 h-11 sm:w-18 sm:h-13 shrink-0 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                    activeModalIndex === tIdx
                      ? "border-[#63B846] ring-2 ring-[#63B846]/60 scale-105"
                      : "border-white/20 opacity-50 hover:opacity-100"
                  }`}
                  aria-label={`Jump to photo ${tIdx + 1}`}
                >
                  <Image
                    src={thumbUrl}
                    alt={`Thumbnail ${tIdx + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
