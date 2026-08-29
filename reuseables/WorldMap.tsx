'use client';

import React, { useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { MapPin } from 'lucide-react';
import worldMap from '@/assets/contact/map.png';

/** Geographic lat/lng bounds of the map image's edges, used to project markers. */
export interface MapBounds {
    north: number;
    south: number;
    west: number;
    east: number;
}

/**
 * Calibrated against `assets/contact/map.png` (1024x678) by least-squares
 * fitting identifiable landmarks (Australia, Madagascar, Iceland, New Zealand,
 * Fiji, New Caledonia). Residuals are < 4px at full image resolution.
 *
 * NOTE: this map is NOT plain equirectangular — it has a ~1.24x vertical
 * stretch, which these bounds absorb. If you swap the map image, re-calibrate.
 */
const DEFAULT_BOUNDS: MapBounds = {
    north: 102.58,
    south: -86.44,
    west: -165.84,
    east: 189.23,
};

export interface MapMarker {
    name: string;
    /**
     * Real-world coordinates, projected onto the map via `mapBounds` — the
     * preferred way to position a marker.
     */
    lat?: number;
    lng?: number;
    /**
     * Legacy manual positioning as percentage strings (e.g. '63%', '78%'),
     * used by the Strapi-driven world map. Ignored when lat/lng are provided.
     */
    top?: string;
    left?: string;
    address?: string;
    phone?: string;
    email?: string;
    /** Link (e.g. Google Maps) shown in the hover card. */
    mapsUrl?: string;
    /** Where the name label sits relative to the pin. Default 'right'. */
    labelPosition?: 'top' | 'right' | 'bottom' | 'left';
    pinColor?: string;
}

export interface WorldMapProps {
    title?: string;
    subtitle?: string;
    markers: MapMarker[];
    mapImage?: StaticImageData | string;
    /**
     * Only used when `mapImage` is a URL string. When a StaticImageData is used
     * (the default) the ratio is derived from the image itself, so marker
     * percentages always line up with the picture.
     */
    aspectRatio?: string;
    /** Override only if you supply a different map image. */
    mapBounds?: MapBounds;
    titleColor?: 'green' | 'black';
    showHeader?: boolean;
    className?: string;
    /**
     * Below `lg`, zoom the map into a region instead of showing the whole
     * world (which makes small screens' pins overlap).
     * - `true` → default window framed around the India-ocean → Australia band.
     * - `{ x, y, w, h }` → explicit window in image percentages (w === h keeps
     *   the map's aspect ratio, so the zoom never distorts).
     * Opt-in per usage — pages whose pins span the whole world can omit it.
     */
    focusMarkers?: boolean | { x: number; y: number; w: number; h: number };
}

/** Keyless Google Maps embed — `output=embed` requires no API key. */
const mapEmbedSrc = (marker: MapMarker) =>
    `https://www.google.com/maps?q=${
        marker.lat !== undefined && marker.lng !== undefined
            ? `${marker.lat},${marker.lng}`
            : encodeURIComponent(marker.address ?? marker.name)
    }&z=14&output=embed`;

const WorldMap: React.FC<WorldMapProps> = ({
    title,
    subtitle,
    markers,
    mapImage = worldMap,
    aspectRatio,
    mapBounds = DEFAULT_BOUNDS,
    titleColor = 'green',
    showHeader = true,
    className = '',
    focusMarkers = false,
}) => {
    const [activeMarker, setActiveMarker] = useState<string | null>(null);
    // Markers whose map iframe has been shown — kept mounted so re-hovering
    // is instant instead of reloading the embed every time.
    const [loadedMaps, setLoadedMaps] = useState<string[]>([]);

    // Crop window (percentages of the map image) used below `lg` when
    // `focusMarkers` is set. w === h keeps the image's aspect ratio, so the
    // zoomed view never distorts. Window chosen to frame the India-ocean →
    // Australia marker band with breathing room on every side.
    const [compact, setCompact] = useState(false);

    const [canHover, setCanHover] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
        const update = () => setCanHover(mq.matches);
        update();
        mq.addEventListener('change', update);
        return () => mq.removeEventListener('change', update);
    }, []);

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 1023px)');
        const apply = () => setCompact(mq.matches);
        apply();
        mq.addEventListener('change', apply);
        return () => mq.removeEventListener('change', apply);
    }, []);

    const crop =
        focusMarkers && compact
            ? typeof focusMarkers === 'object'
                ? focusMarkers
                : { x: 60, y: 38, w: 32, h: 32 }
            : null;

    useEffect(() => {
        if (activeMarker && !loadedMaps.includes(activeMarker)) {
            setLoadedMaps((prev) => [...prev, activeMarker]);
        }
    }, [activeMarker, loadedMaps]);

    const handleMarkerClick = (markerName: string) => {
        setActiveMarker((prev) => (prev === markerName ? null : markerName));
    };

    // Keep the container's aspect ratio equal to the image's so the image is
    // never letterboxed by object-contain — otherwise marker % positions drift.
    const ratio =
        typeof mapImage === 'string'
            ? (aspectRatio ?? '16 / 9')
            : `${mapImage.width} / ${mapImage.height}`;

    return (
        <section className={`w-full px-[5%] md:px-[3%] py-12 md:py-20 ${className}`}>
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

                <div
                    className="relative w-full"
                    style={{ aspectRatio: ratio }}
                    onClick={() => setActiveMarker(null)}
                >
                    {/* Image layer clipped when cropped — cards sit outside this so they never get cut off */}
                    <div className={`absolute inset-0 ${crop ? 'overflow-hidden' : ''}`}>
                        <Image
                            src={mapImage}
                            alt="World map"
                            fill
                            className="object-contain"
                            sizes="100vw"
                            style={
                                crop
                                    ? {
                                          // Zoom so the crop window fills the wrapper:
                                          // translate the window's top-left corner to the
                                          // origin, then scale about it. The pin remap
                                          // below uses the identical formula, so pins stay
                                          // glued to their geography.
                                          transform: `scale(${100 / crop.w}) translate(-${crop.x}%, -${crop.y}%)`,
                                          transformOrigin: '0 0',
                                      }
                                    : undefined
                            }
                        />
                    </div>

                    {markers.map((marker) => {
                        // Equirectangular projection onto the image's bounds,
                        // with a fallback to legacy manual percentages.
                        const projected =
                            marker.lat !== undefined && marker.lng !== undefined
                                ? {
                                    left: ((marker.lng - mapBounds.west) / (mapBounds.east - mapBounds.west)) * 100,
                                    top: ((mapBounds.north - marker.lat) / (mapBounds.north - mapBounds.south)) * 100,
                                }
                                : {
                                    left: parseFloat(marker.left ?? '50%') || 0,
                                    top: parseFloat(marker.top ?? '50%') || 0,
                                };
                        const { left: rawLeft, top: rawTop } = projected;
                        // Re-express raw image-% positions in the cropped
                        // window's coordinate space (no-op when not cropped).
                        const left = crop ? ((rawLeft - crop.x) / crop.w) * 100 : rawLeft;
                        const top = crop ? ((rawTop - crop.y) / crop.h) * 100 : rawTop;
                        const isActive = activeMarker === marker.name;
                        // On a cropped (zoomed) view, a pin near the top edge has no
                        // room above it for the info card — open it below instead.
                        const cardBelow = crop !== null && top < 30;

                        // Flip the card near the container edges so it never overflows.
                        const cardPosition =
                            left > 75
                                ? 'right-1/2' // open leftwards
                                : left < 25
                                    ? 'left-1/2' // open rightwards
                                    : 'left-1/2 -translate-x-1/2'; // centered

                        // Label placement — use 'top' when a right-extending label
                        // would collide with a neighbouring marker.
                        const labelClasses = {
                            right: 'left-6 top-1/2 -translate-y-1/2',
                            left: 'right-6 top-1/2 -translate-y-1/2',
                            top: 'bottom-full left-1/2 -translate-x-1/2 mb-0.5',
                            bottom: 'top-full left-1/2 -translate-x-1/2 mt-0.5',
                        }[marker.labelPosition ?? 'right'];

                        return (
                            <div
                                key={marker.name}
                                className={`absolute z-10 ${isActive ? 'z-30' : ''}`}
                                style={{ top: `${top}%`, left: `${left}%` }}
                                onMouseEnter={canHover ? () => setActiveMarker(marker.name) : undefined}
                                onMouseLeave={canHover ? () => setActiveMarker((prev) => (prev === marker.name ? null : prev)) : undefined}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleMarkerClick(marker.name);
                                }}
                            >
                                {/* Anchor the pin's TIP on the geographic point — centering the
                                    whole pin+label group on the point pushed each pin half a
                                    label-width into the ocean. The label extends right instead. */}
                                <div className="relative -translate-x-1/2 -translate-y-full cursor-pointer md:cursor-default">
                                {/* Info card — hover on desktop, tap on mobile */}
                                {(marker.address || marker.phone || marker.email || marker.mapsUrl) && (
                                    <div
                                        className={`absolute ${cardBelow ? 'top-full pt-2 md:pt-3' : 'bottom-full mb-2 md:mb-3'} z-10 w-48 max-w-[62vw] md:w-72 md:max-w-[75vw] rounded-lg md:rounded-xl bg-white p-2 md:p-3 text-left shadow-[0_8px_30px_rgba(0,0,0,0.12)] ring-1 ring-black/5 transition-all duration-200 ${cardPosition} ${isActive
                                            ? 'pointer-events-auto opacity-100 translate-y-0'
                                            : 'pointer-events-none opacity-0 translate-y-1'
                                            }`}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {/* Mini map — mounts on first hover, stays mounted after */}
                                        <div className="overflow-hidden rounded-lg ring-1 ring-black/5">
                                            {loadedMaps.includes(marker.name) ? (
                                                <iframe
                                                    title={`Map of ${marker.name}`}
                                                    src={mapEmbedSrc(marker)}
                                                    loading="lazy"
                                                    referrerPolicy="no-referrer-when-downgrade"
                                                    allowFullScreen
                                                    className="h-20 md:h-36 w-full border-0"
                                                />
                                            ) : (
                                                <div className="h-20 md:h-36 w-full animate-pulse bg-gray-100" />
                                            )}
                                        </div>
                                        {marker.address && (
                                            <p className="mt-1.5 md:mt-2.5 text-[11px] md:text-xs leading-snug md:leading-relaxed text-gray-800">{marker.address}</p>
                                        )}
                                        {marker.phone && (
                                            <a
                                                href={`tel:${marker.phone.replace(/[^+\d]/g, '')}`}
                                                className="mt-1.5 md:mt-2 block text-[11px] md:text-xs text-gray-800 hover:text-[#63B846]"
                                            >
                                                Tel: {marker.phone}
                                            </a>
                                        )}
                                        {marker.email && (
                                            <a
                                                href={`mailto:${marker.email}`}
                                                className="mt-0.5 block break-all text-[11px] md:text-xs text-gray-800 hover:text-[#63B846]"
                                            >
                                                {marker.email}
                                            </a>
                                        )}
                                        {marker.mapsUrl && (
                                            <a
                                                href={marker.mapsUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-1.5 md:mt-2 inline-block text-[11px] md:text-xs font-medium text-[#63B846] hover:underline"
                                            >
                                                Get Directions →
                                            </a>
                                        )}
                                    </div>
                                )}

                                <MapPin
                                    size={18}
                                    strokeWidth={2.5}
                                    className={`transition-transform duration-200 ${isActive ? 'scale-125' : ''} fill-[#A0CF44] text-[#A0CF44]`}
                                />
                                {/* Desktop: always visible | Mobile: only when tapped */}
                                <span
                                    className={`absolute ${labelClasses} text-xs md:text-sm font-medium text-black whitespace-nowrap transition-opacity duration-200
                                        ${isActive ? 'opacity-100' : 'opacity-0 md:opacity-100'}
                                        ${isActive ? 'pointer-events-auto' : 'pointer-events-none md:pointer-events-auto'}`}
                                >
                                    {marker.name}
                                </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WorldMap;
