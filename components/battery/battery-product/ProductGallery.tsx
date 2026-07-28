"use client";
import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';

export interface ProductGalleryData {
  images: (StaticImageData | string)[];
}

const ProductGallery = ({ data }: { data: ProductGalleryData }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="bg-white py-16 md:py-24 px-[5%]">
      <div className="max-w-7xl mx-auto">
        {/* Main Image */}
        <div className="relative w-full h-[400px] md:h-[600px] rounded-[24px] overflow-hidden bg-gray-100 mb-4">
          <Image
            src={data.images[activeIdx]}
            alt="Product image"
            fill
            className="object-cover"
          />
        </div>

        {/* Thumbnails */}
        <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2">
          {data.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`relative shrink-0 w-[100px] h-[80px] md:w-[140px] md:h-[100px] rounded-[12px] overflow-hidden border-2 transition-all cursor-pointer ${
                idx === activeIdx ? 'border-[#63B846]' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGallery;
