import React from 'react';
import Fade from '@/reuseables/fade';
import { Star } from 'lucide-react';

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
  return (
    <section className="bg-white py-16 md:py-24 px-[5%]">
      <Fade>
        <div className="">
          {/* Header & Rating Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            <div className="lg:col-span-7">
              <span className="text-lg md:text-[2.125rem] font-bold text-black tracking-tight leading-none block">
                {data.title}
              </span>
              <h2 className="text-4xl md:text-[4.375rem] font-extrabold text-[#63B846] tracking-tighter leading-none">
                {data.subtitle}
              </h2>
            </div>
            
            <div className="lg:col-span-5 lg:pt-8">
              <p className="text-gray-600 text-sm md:text-[1.375rem] leading-tight font-medium max-w-xl">
                {data.description}
              </p>
            </div>
          </div>

          {/* Awards Section */}
          <div className="flex flex-col items-center justify-center gap-12 mb-20">
            {data.awards.map((award, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="relative mb-3">
                  <img
                    src={award.image}
                    alt={award.description}
                    className="max-h-[140px] md:max-h-[180px] object-contain w-auto"
                  />
                </div>
                {award.description.toLowerCase().includes("stars") ? (
                  <div className="flex items-center justify-center gap-1.5 text-base md:text-[1.5rem] font-bold text-black">
                    <Star className="fill-[#FAB005] text-[#FAB005] w-5 h-5 md:w-6 md:h-6" />
                    <span>{award.description}</span>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#939393] font-bold">
                      Top Rated Solar Panel Installers
                    </p>
                    <p className="text-sm md:text-[1.5rem] font-bold text-black">
                      {award.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {data.reviews.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#F3F7F2] rounded-[12px] p-6 md:p-8 flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-bold text-black text-lg md:text-[1.625rem] leading-none mb-3">
                    {item.author}
                  </h4>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => {
                      const isFilled = i < item.rating;
                      return (
                        <Star
                          key={i}
                          size={20}
                          className={isFilled ? "fill-[#FAB005] text-[#FAB005]" : "text-gray-300"}
                        />
                      );
                    })}
                  </div>
                  <p className="text-black text-sm md:text-[1.25rem] leading-snug font-medium">
                    {item.review}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Fade>
    </section>
  );
};

export default FindOutWhy;
