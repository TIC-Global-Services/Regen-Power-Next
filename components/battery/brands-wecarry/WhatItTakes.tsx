'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';

export interface WhatItTakesItem {
    title: string;
}

export interface WhatItTakesData {
    title: string;
    subtitle?: string;
    description?: string;
    items: WhatItTakesItem[];
    image: string | StaticImageData;
    imageAlt?: string;
}

interface WhatItTakesProps {
    data: WhatItTakesData;
}

const WhatItTakes: React.FC<WhatItTakesProps> = ({ data }) => {
    if (!data) return null;

    return (
        <section className="bg-white border-t border-gray-50 flex items-stretch w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch w-full">

                {/* Image Column */}
                <div className="relative w-full min-h-[350px] lg:h-screen overflow-hidden">
                    <Image
                        src={data.image}
                        alt={data.imageAlt || 'Why Our Installer Certifications Matter'}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                {/* Text Column */}
                <div className="w-full  flex flex-col justify-between py-20 max-w-2xl">
                    <div>
                        <h3 className="text-xl md:text-2xl font-normal text-black tracking-tight mb-2">
                            {data.subtitle}
                        </h3>

                        <h2 className="text-3xl md:text-[3.125rem] lg:text-[3.125rem] font-light text-[#63B846] leading-[1.1] tracking-tight mb-6">
                            {data.title}
                        </h2>



                        <ul className="flex flex-col gap-1 mb-8">
                            {data.items.map((item, i) => (
                                <li key={i} className="flex items-start text-sm md:text-xl text-black font-normal leading-[1.2]">
                                    <span className="mr-2 font-bold text-black">•</span>
                                    <span>{item.title}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p className="text-base md:text-xl text-[#63B846] tracking-tight font-medium leading-[1.2] mb-6">
                            {data.description}
                        </p>
                    </div>

                </div>



            </div>
        </section>
    );
};

export default WhatItTakes;
