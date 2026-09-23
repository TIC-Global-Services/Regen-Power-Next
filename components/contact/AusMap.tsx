'use client';

import React from 'react';
import { MapPin } from 'lucide-react';
import WorldMap, { MapMarker, MapBounds } from '@/reuseables/WorldMap';
import Reveal from '@/reuseables/Reveal';
import CtaButton from '@/reuseables/CtaButton';

export interface AusMapProps {
    subtitle?: string;
    title?: string;
    markers?: MapMarker[];
}

// Office details sourced from https://regenpower.com/contact/
const mapsQuery = (address: string) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

const defaultMarkers: MapMarker[] = [
    {
        name: 'Perth',
        lat: -32.08, // Catalano Circuit, Canning Vale
        lng: 115.9,
        address: '4/90 Catalano Circuit, Canning Vale WA 6155',
        phone: '08 9456 3491',
        email: 'sales@regenpower.com',
        mapsUrl: mapsQuery('4/90 Catalano Circuit, Canning Vale WA 6155'),
    },
    {
        name: 'Brisbane',
        lat: -27.489, // Burke Street, Woolloongabba
        lng: 153.0225,
        address: '15 Burke Street, Woolloongabba QLD 4102',
        phone: '07 3036 7421',
        email: 'sales.qld@regenpower.com',
        mapsUrl: mapsQuery('15 Burke Street, Woolloongabba QLD 4102'),
    },
    {
        name: 'Melbourne',
        lat: -37.8197, // Collins Square, Docklands
        lng: 144.9486,
        address: 'Level 23, Collins Square Tower Five, 727 Collins Street, Melbourne VIC 3008',
        phone: '03 8676 8807',
        email: 'sales.vic@regenpower.com',
        mapsUrl: mapsQuery('727 Collins Street, Melbourne VIC 3008'),
    },
    {
        name: 'Sydney',
        lat: -33.8651, // 123 Pitt Street, CBD
        lng: 151.2093,
        address: 'Level 17, 123 Pitt Street, Sydney NSW 2000',
        phone: '02 8077 4232',
        email: 'sales.nsw@regenpower.com',
        mapsUrl: mapsQuery('123 Pitt Street, Sydney NSW 2000'),
    },
    {
        name: 'Adelaide',
        lat: -34.9266, // Hindmarsh Square
        lng: 138.6005,
        labelPosition: 'top', // a right-extending label collides with Sydney/Melbourne
        address: 'Level 2, 70 Hindmarsh Square, Adelaide SA 5000',
        phone: '08 8311 1403',
        email: 'sales.sa@regenpower.com',
        mapsUrl: mapsQuery('70 Hindmarsh Square, Adelaide SA 5000'),
    },
];

/**
 * Calibrated against `public/aus-map.png` (2655x2238, dot silhouette spans
 * px 184-2470 horizontally / 56-2104 vertically) by projecting the mainland's
 * known geographic extremes (Steep Point, Cape Byron, Cape York, Tasmania's
 * South East Cape) through their measured pixel bounding box. If you swap
 * the map image, re-calibrate.
 */
const AUS_MAP_BOUNDS: MapBounds = {
    north: -9.78,
    south: -45.8,
    west: 109.89,
    east: 156.91,
};

/** Chunk locations into a staggered pyramid: rows of 3, then 2, repeating — row of 2 centers itself between the row above purely through flex centering. */
function staggeredRows<T>(items: T[]): T[][] {
    const pattern = [3, 2];
    const rows: T[][] = [];
    let i = 0;
    let p = 0;
    while (i < items.length) {
        const size = pattern[p % pattern.length];
        rows.push(items.slice(i, i + size));
        i += size;
        p += 1;
    }
    return rows;
}

const AusMap: React.FC<AusMapProps> = ({
    subtitle = 'Our',
    title = 'Locations',
    markers = defaultMarkers,
}) => {
    const rows = staggeredRows(markers);

    return (
        <div>
            <WorldMap
                subtitle={subtitle}
                title={title}
                markers={markers}
                mapImage="/aus-map.png"
                mapBounds={AUS_MAP_BOUNDS}
                mapMaxWidth="max-w-2xl"
                autoCycle
            />

            {/* Explicit location list — same offices as the map pins, spelled out
                for readers who'd rather scan text than hover/tap markers. Laid out
                as a staggered pyramid: 3 cards, then 2 centered beneath them. */}
            {markers.length > 0 && (
                <div className="px-[5%] md:px-[3%] pb-16 md:pb-24 -mt-8 md:-mt-12">
                    <div className="max-w-5xl mx-auto flex flex-col items-center gap-5 md:gap-6">
                        {rows.map((row, rowIdx) => (
                            <div
                                key={rowIdx}
                                className="w-full flex flex-wrap justify-center gap-5 md:gap-6"
                            >
                                {row.map((marker, colIdx) => {
                                    const idx = rowIdx * 3 + colIdx; // stagger delay stays stable across rows
                                    return (
                                        <Reveal
                                            key={marker.name}
                                            delay={idx * 0.08}
                                            className="group w-full sm:w-[45%] lg:w-[30%] rounded-3xl border border-black/10 bg-[#F7FAF2] p-6 md:p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#A0CF44] hover:shadow-xl hover:shadow-[#A0CF44]/15"
                                        >
                                            <div className="flex items-center gap-2.5 mb-3">
                                                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#63B846]/15 text-[#4d7a17] shrink-0 transition-all duration-300 group-hover:bg-[#63B846] group-hover:text-white group-hover:scale-110">
                                                    <MapPin size={18} strokeWidth={2.25} />
                                                </span>
                                                <h3 className="text-2xl md:text-[1.75rem] font-medium tracking-tight text-black leading-none">
                                                    {marker.name}
                                                </h3>
                                            </div>

                                            {marker.address && (
                                                <p className="text-sm text-black/75 leading-snug tracking-tight mb-3 min-h-[2.5em]">
                                                    {marker.address}
                                                </p>
                                            )}

                                            <div className="flex flex-col gap-1 text-sm mb-5">
                                                {marker.phone && (
                                                    <a
                                                        href={`tel:${marker.phone.replace(/[^+\d]/g, '')}`}
                                                        className="text-black/70 hover:text-black transition-colors"
                                                    >
                                                        Tel: {marker.phone}
                                                    </a>
                                                )}
                                                {marker.email && (
                                                    <a
                                                        href={`mailto:${marker.email}`}
                                                        className="text-black/70 hover:text-black transition-colors"
                                                    >
                                                        {marker.email}
                                                    </a>
                                                )}
                                            </div>

                                            {marker.mapsUrl && (
                                                <CtaButton
                                                    href={marker.mapsUrl}
                                                    text="Get Directions"
                                                    textColor="text-black"
                                                    className="capitalize w-full justify-center"
                                                    target="_blank"
                                                />
                                            )}
                                        </Reveal>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AusMap;
