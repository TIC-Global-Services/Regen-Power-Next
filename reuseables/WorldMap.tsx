import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { MapPin } from 'lucide-react';
import worldMap from '@/assets/contact/map.png';

export interface MapMarker {
    name: string;
    top: string;
    left: string;
    pinColor?: string;
}

export interface WorldMapProps {
    title?: string;
    subtitle?: string;
    markers: MapMarker[];
    mapImage?: StaticImageData | string;
    aspectRatio?: string;
    titleColor?: 'green' | 'black';
    showHeader?: boolean;
    className?: string;
}

const WorldMap: React.FC<WorldMapProps> = ({
    title,
    subtitle,
    markers,
    mapImage = worldMap,
    aspectRatio = '16/9',
    titleColor = 'green',
    showHeader = true,
    className = '',
}) => {
    return (
        <section className={`w-full px-[3%] py-12 md:py-20 ${className}`}>
            <div className="max-w-7xl mx-auto">
                {showHeader && (title || subtitle) && (
                    <div className="text-center mb-10 md:mb-14">
                        {subtitle && (
                            <p className="text-2xl md:text-3xl font-light tracking-tight text-black mb-1">
                                {subtitle}
                            </p>
                        )}
                        {title && (
                            <h2 className={`text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight ${titleColor === 'green' ? 'text-[#63B846]' : 'text-black'
                                }`}>
                                {title}
                            </h2>
                        )}
                    </div>
                )}

                <div className="relative w-full" style={{ aspectRatio }}>
                    <Image
                        src={mapImage}
                        alt="World map"
                        fill
                        className="object-contain"
                        sizes="100vw"
                    />

                    {markers.map((marker) => (
                        <div
                            key={marker.name}
                            className="absolute flex items-center gap-1.5"
                            style={{ top: marker.top, left: marker.left, transform: 'translate(-50%, -50%)' }}
                        >
                            <MapPin
                                size={18}
                                strokeWidth={2.5}
                                className={`fill-[#A0CF44] text-[#A0CF44]`}
                            />
                            <span className="text-xs md:text-sm font-medium text-black whitespace-nowrap">
                                {marker.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WorldMap;
