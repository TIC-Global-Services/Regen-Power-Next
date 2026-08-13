'use client';

import React, { useState } from 'react';
import Fade from '@/reuseables/fade';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { da } from 'zod/locales';

export interface AboutRegenProps {
  title: string;
  subtitle: string;
  paragraphs: string;
  image: string;
  videoUrl?: string;
}

const AboutRegen = ({ data }: { data: AboutRegenProps }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="bg-white py-16 md:py-20 px-[5%]">
      <Fade duration={5}>
        <div className="">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center justify-center">
            {/* Left Column: Image or Video */}
            <div className="lg:col-span-6  border-r border-[#939393] pr-4">
              <div
                className="relative rounded-[10px] overflow-hidden aspect-[4/3] bg-gray-100 group cursor-pointer shadow-md"
                onClick={() => setIsPlaying(true)}
              >
                {!isPlaying ? (
                  <>
                    <Image
                      src={data.image || "/solar_house_render.png"}
                      alt="About Regen Power"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white text-[#63B846] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Play size={28} className="fill-current ml-1" />
                      </div>
                    </div>
                  </>
                ) : (
                  <iframe
                    className="w-full h-full"
                    src={data.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"}
                    title="About Regen Power"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            </div>

            {/* Right Column: Copy text */}
            <div className="lg:col-span-6">
               <h2 className="text-3xl md:text-[2.125rem] font-bold  tracking-tight leading-none">
                {data.subtitle}
              </h2>
              <h2 className="text-3xl md:text-[5rem] font-bold text-[#63B846] tracking-tight leading-none">
                {data.title}
              </h2>
             
              
              {/* <div className="h-1.5 w-20 bg-[#63B846] rounded-full" /> */}
              <div className="space-y-4 text-black gr text-sm md:text-[1.625rem] leading-[1.2] mt-5 font-medium">
                {/* {data.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))} */}
                {data.paragraphs}
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </section>
  );
};

export default AboutRegen;
