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
        <section className="py-16 lg:py-24 bg-white">
            <div className="px-[5%] lg:px-[3%] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ">
                    <div className="relative w-full aspect-square md:aspect-[16/9] rounded-[24px] overflow-hidden lg:hidden">
                        <img
                            src={image || '/fallback.png'}
                            alt={imageAlt ?? ''}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 lg:top-6 lg:left-6 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
                            <p className="text-xs lg:text-sm text-white font-medium tracking-tight">
                                {patentText}
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="relative w-[200px] h-[60px] lg:w-[240px] lg:h-[72px] mb-6">
                            <img
                                src={logo || '/regen_logo_nav.png'}
                                alt="HybridGEN"
                                className="absolute inset-0 w-full h-full object-contain object-left"
                            />
                        </div>
                        {subtitle && (
                            <p className="text-2xl lg:text-[2.125rem] text-black font-light tracking-tight mb-1">
                                {subtitle}
                            </p>
                        )}
                        {title && (
                            <h2 className="text-4xl lg:text-6xl lg:text-[5rem] text-[#63B846] font-normal tracking-tighter leading-none mb-6">
                                {title}
                            </h2>
                        )}
                        {paragraphs.map((text, i) => (
                            <p key={i} className={`text-sm lg:text-xl text-black leading-[1.2] lg:max-w-xl tracking-tight${i > 0 ? ' ' : ''}`}>
                                {text}
                            </p>
                        ))}
                    </div>

                    <div className="relative w-full aspect-square rounded-[24px] overflow-hidden hidden lg:block">
                        <img
                            src={image || '/fallback.png'}
                            alt={imageAlt ?? ''}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 lg:top-6 lg:left-6 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
                            <p className="text-xs lg:text-sm text-white font-medium tracking-tight">
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
