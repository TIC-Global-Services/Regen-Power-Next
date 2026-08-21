import Image, { StaticImageData } from 'next/image';
import React from 'react'

export interface areyoueligibleItem {
    title: string;
}

export interface areyoueligibleData {
    title: string;
    subtitle?: string;
    bottomSubtitle?: string;
    description?: string;
    items: areyoueligibleItem[];
    additionalListTitle?: string;
    additionalItems?: areyoueligibleItem[];
    image: string | StaticImageData;
    imageAlt?: string;
}

interface areyoueligibleProps {
    data: areyoueligibleData;
}

const Areyoueligible = ({ data }: areyoueligibleProps) => {
    if (!data) return null;
    return (
        <section className="bg-white border-t border-gray-50 py-12 md:py-16 flex items-stretch w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch w-full px-[5%] md:px-[3%] lg:px-0">

                {/* Image Column — same full-height rhythm as QuickWay
                    (h-auto + min-h-screen so the image stretches with a taller text column) */}
                <div className="relative h-[450px] lg:h-auto lg:min-h-screen overflow-hidden rounded-[20px] lg:rounded-none">
                    <Image
                        src={data.image}
                        alt={data.imageAlt || data.title}
                        fill
                        className="object-cover"
                        preload
                        sizes="(min-width: 1024px) 50vw, calc(100vw - 10%)"
                    />
                </div>
                {/* Text Column — same gutters as FullscreenSplitSection */}
                <div className="w-full flex flex-col justify-center pt-4 lg:py-24 lg:pl-12 lg:pr-20">
                    <div className="capitalize">
                        <h3 className="text-xl md:text-2xl font-normal text-black tracking-tight mb-1">
                            {data.subtitle}
                        </h3>

                        <h2 className="text-3xl md:text-[3.125rem] lg:text-[3.125rem] font-light text-[#63B846] leading-[1.1] tracking-tight mb-6">
                            {data.title}
                        </h2>
                        <p className='text-sm tracking-tight leading-[1.2] mb-4  md:text-lg lg:text-xl'>{data.bottomSubtitle}</p>


                        <ol className="flex flex-col gap-1 mb-4">
                            {data.items.map((item, i) => (
                                <li key={i} className="flex items-start text-sm md:text-base text-black font-normal tracking-tight leading-[1.2]">
                                    <span className="mr-2 text-black">{i + 1}.</span>
                                    <span>{item.title}</span>
                                </li>
                            ))}
                        </ol>

                        {data.additionalListTitle && (
                            <p className="text-sm md:text-xl font-medium tracking-tight leading-[1.2] mt-6 mb-2">
                                {data.additionalListTitle}
                            </p>
                        )}

                        {data.additionalItems && data.additionalItems.length > 0 && (
                            <ol className="flex flex-col gap-1 mb-8">
                                {data.additionalItems.map((item, i) => (
                                    <li key={i} className="flex items-start text-sm md:text-base text-black font-normal tracking-tight leading-[1.2]">
                                        <span className="mr-2 text-black">{i + 1}.</span>
                                        <span>{item.title}</span>
                                    </li>
                                ))}
                            </ol>
                        )}
                    </div>

                    <div>
                        <p className="text-base md:text-xl text-[#63B846] tracking-tight font-medium leading-[1.2] mb-6">
                            {data.description}
                        </p>
                    </div>

                </div>



            </div>
        </section>
    )
}

export default Areyoueligible