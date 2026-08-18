import React from 'react';

interface HybridGenDetailSectionProps {
    logo: string;
    image: string;
    imageAlt?: string;
    subtitle?: string;
    title?: string;
    description?: string;
    patentText?: string;
}

const HybridGenDetailSection: React.FC<HybridGenDetailSectionProps> = ({
    logo,
    image,
    imageAlt,
    subtitle,
    title,
    description,
    patentText,
}) => {
    const paragraphs = description ? description.split('\n').filter(Boolean) : [];

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="px-[5%] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center ">
                    <div className="relative w-full aspect-square rounded-[24px] overflow-hidden md:hidden">
                        <img
                            src={image || '/fallback.png'}
                            alt={imageAlt ?? ''}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
                            <p className="text-xs md:text-sm text-white font-medium tracking-tight">
                                {patentText}
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="relative w-[200px] h-[60px] md:w-[240px] md:h-[72px] mb-6">
                            <img
                                src={logo || '/regen_logo_nav.png'}
                                alt="HybridGEN"
                                className="absolute inset-0 w-full h-full object-contain object-left"
                            />
                        </div>
                        {subtitle && (
                             <p className="text-2xl md:text-[2.125rem] text-black font-light tracking-tight mb-1">
                                 {subtitle}
                             </p>
                        )}
                        {title && (
                            <h2 className="text-4xl md:text-6xl lg:text-[5rem] text-[#63B846] font-normal tracking-tighter leading-none mb-6">
                                {title}
                            </h2>
                        )}
                        {paragraphs.map((text, i) => (
                            <p key={i} className={`text-sm md:text-xl text-black leading-[1.2] max-w-xl tracking-tight${i > 0 ? ' ' : ''}`}>
                                {text}
                            </p>
                        ))}
                    </div>

                    <div className="relative w-full aspect-square rounded-[24px] overflow-hidden hidden md:block">
                        <img
                            src={image || '/fallback.png'}
                            alt={imageAlt ?? ''}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
                            <p className="text-xs md:text-sm text-white font-medium tracking-tight">
                                {patentText}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HybridGenDetailSection;
