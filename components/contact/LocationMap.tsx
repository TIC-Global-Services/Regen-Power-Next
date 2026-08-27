'use client';

import React from 'react';
import WorldMap, { MapMarker } from '@/reuseables/WorldMap';

export interface LocationMapProps {
    subtitle?: string;
    title?: string;
    markers?: MapMarker[];
}

// Office details sourced from https://regenpower.com/contact/
const mapsQuery = (address: string) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

const defaultMarkers: MapMarker[] = [
    {
        name: 'Dubai (HQ)',
        lat: 25.1972,
        lng: 55.3211,
        address: 'Meydan Grandstand, 6th Floor, Meydan Road, Nad Al Sheba, Dubai, U.A.E',
        phone: '+971 50 661 7630',
        email: 'support@regenpowersolutions.ae',
        mapsUrl: mapsQuery('Meydan Grandstand, Nad Al Sheba, Dubai, U.A.E'),
    },
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

const LocationMap: React.FC<LocationMapProps> = ({
    subtitle = 'Our',
    title = 'Locations',
    markers = defaultMarkers,
}) => {
    return (
        <WorldMap
            subtitle={subtitle}
            title={title}
            markers={markers}
            // Small screens: zoom into the Dubai → Australia office band.
            // Window verified to contain all six offices with label room.
            focusMarkers={{ x: 56, y: 34, w: 44, h: 44 }}
        />
    );
};

export default LocationMap;
