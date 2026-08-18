import React from 'react';
import Fade from '@/reuseables/fade';
import { Star } from 'lucide-react';
import Reveal from '@/reuseables/Reveal';

export interface Award {
  image: string;
  description: string;
}

export interface Review {
  author: string;
  review: string;
  rating: number;
}

export interface FindOutWhyProps {
  title: string;
  subtitle: string;
  description: string;
  awards: Award[];
  reviews: Review[];
}

const FindOutWhy = ({ data }: { data: FindOutWhyProps }) => {
  if (!data) return null;

  return (
    <section className="bg-white py-16 md:py-20 px-[3%]">
      <Fade duration={5}>
        <div className="">
          {/* Header & Rating Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            <div className="lg:col-span-7">
              <span className="text-lg md:text-[2.125rem] font-bold text-black tracking-tight leading-none block">
                {data.title}
              </span>
              <h2 className="text-4xl md:text-[4.375rem] font-bold text-[#63B846] tracking-tighter leading-none">
                {data.subtitle}
              </h2>
            </div>

            <div className="lg:col-span-5 lg:pt-8">
              <p className="text-[#4D4D4D] text-sm md:text-[1.375rem] leading-tight font-medium max-w-xl">
                {data.description}
              </p>
            </div>
          </div>

          {/* Awards Section */}
          <div className="flex flex-col items-center justify-center gap-12 mb-10">
            {data.awards?.map((award, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="relative mb-3">
                  <img
                    src={award?.image}
                    alt={award?.description || ''}
                    className="max-h-[140px] md:max-h-[40dvh] object-contain w-auto"
                  />
                </div>
                {award?.description?.toLowerCase().includes("stars") ? (
                  <div className="flex items-center justify-center gap-1.5 text-base md:text-[1.5rem] font-bold text-[#4D4D4D]">
                    <span className="whitespace-pre-line tracking-tight">{award.description}</span>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {/* <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#939393] font-bold">
                      Top Rated Solar Panel Installers
                    </p> */}
                    <p className="text-sm md:text-[1.5rem] font-bold text-black whitespace-pre-line">
                      {award?.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
            {data.reviews?.map((item, idx) => (
              <Reveal key={idx}>
                <div
                  className="bg-[#EEF6EB] rounded-[10px] p-6 md:p-8 h-full flex flex-col justify-between"
                >
                  <div>
                    <h4 className="font-bold text-black text-lg md:text-[1.625rem] leading-none mb-3">
                      {item?.author}
                    </h4>
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => {
                        const isFilled = i < (item?.rating || 0);
                        return (
                          <Star
                            key={i}
                            size={20}
                            className={isFilled ? "fill-[#FAB005] text-[#FAB005]" : "text-gray-300"}
                          />
                        );
                      })}
                    </div>
                    <p className="text-black text-sm md:text-[1.25rem] leading-[1.2] font-medium mt-2">
                      {item?.review}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Fade>
    </section>
  );
};

export default FindOutWhy;
