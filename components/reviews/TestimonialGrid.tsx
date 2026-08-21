import React from 'react';
import { TestimonialCard, TestimonialImageCard } from './TestimonialCard';

export interface Testimonial {
    location: string;
    name: string;
    quote: string;
    /** Display label for third-party attribution, e.g. "Google" */
    source?: string | null;
    /** 1–5; stars render only when present */
    rating?: number | null;
}

export interface ImageRow {
    type: 'image';
    image: string;
    alt: string;
}

export interface TestimonialRow {
    type: 'testimonial';
    data: Testimonial;
}

export type GridItem = TestimonialRow | ImageRow;

interface TestimonialGridProps {
    subtitle?: string;
    title?: string;
    /** Review quotes — from the testimonial collection */
    reviews?: TestimonialRow[];
    /** Decorative photo tiles — placed into even rows (2, 4, …) spanning 2 columns */
    images?: ImageRow[];
}

/**
 * Lay out review quotes in rows of 3. Every EVEN row (2nd, 4th, …) swaps one
 * quote for a 2-column-spanning image tile, alternating right / left for
 * rhythm:
 *
 *   row 1:  [q] [q] [q]
 *   row 2:  [q] [ img 2-col ]
 *   row 3:  [q] [q] [q]
 *   row 4:  [ img 2-col ] [q]
 *   …
 *
 * Rows without a remaining image fall back to 3 quotes; leftover images are
 * appended after the last row.
 */
function buildGridItems(reviews: TestimonialRow[], images: ImageRow[]): GridItem[] {
    const items: GridItem[] = [];
    let r = 0; // next review index
    let i = 0; // next image index
    let row = 0;

    while (r < reviews.length || i < images.length) {
        const isEvenRow = row % 2 === 1;
        const hasReview = r < reviews.length;

        if (isEvenRow && i < images.length && hasReview) {
            const image = images[i++];
            const quote = reviews[r++];
            // Alternate image side per even row: row 2 → right, row 4 → left, …
            const imageFirst = Math.floor(row / 2) % 2 === 1;
            items.push(...(imageFirst ? [image, quote] : [quote, image]));
        } else if (isEvenRow && i < images.length) {
            // No quotes left — trailing image tile on its own (still spans 2 cols)
            items.push(images[i++]);
        } else {
            items.push(...reviews.slice(r, r + 3));
            r += 3;
        }
        row++;
    }
    return items;
}

/**
 * Testimonials grid matching the design:
 * - Desktop: 3 columns, image tiles span 2 columns on even rows
 * - Mobile: single column, all items stacked
 */
const TestimonialGrid: React.FC<TestimonialGridProps> = ({
    subtitle,
    title,
    reviews = [],
    images = [],
}) => {
    const items = buildGridItems(reviews, images);

    return (
        <section className="w-full px-[5%] md:px-[3%] pb-16 md:pb-24">
            {(subtitle || title) && (
                <div className="text-center mb-10 md:mb-14">
                    {subtitle && (
                        <p className="text-2xl md:text-3xl font-light tracking-tight text-black mb-1">
                            {subtitle}
                        </p>
                    )}
                    {title && (
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[#63B846]">
                            {title}
                        </h2>
                    )}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                {items.map((item, idx) => {
                    if (item.type === 'image') {
                        return (
                            <div key={`img-${idx}`} className="md:col-span-2 h-full">
                                <TestimonialImageCard
                                    image={item.image}
                                    imageAlt={item.alt}
                                />
                            </div>
                        );
                    }
                    return <TestimonialCard key={`${item.data.name}-${idx}`} {...item.data} />;
                })}
            </div>
        </section>
    );
};

export default TestimonialGrid;
