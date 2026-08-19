'use client';

import React from 'react';
import Fade from '@/reuseables/fade';
import { MinusCircle } from 'lucide-react';

// ─── Interfaces ───────────────────────────────────────────────

export interface PromotionItem {
  label: string;
  value?: string | number;
  emphasis?: 'normal' | 'bold' | 'muted';
}

export interface PromotionSection {
  type: 'price' | 'list' | 'info' | 'highlight' | 'text';
  title?: string;
  items?: PromotionItem[];
  value?: string | number;
}

export interface PromotionCard {
  title: string;
  subtitle?: string;
  sections: PromotionSection[];
}

export interface PromotionGridProps {
  title?: string;
  description?: string;
  backgroundImage?: string;
  centerImage?: string;
  items?: PromotionCard[];
}

// ─── Helpers ──────────────────────────────────────────────────

/** Bolds any $-prefixed values (e.g. "$10K") within a string */
const renderTextWithBoldValues = (text: string) => {
  const regex = /(\$[\d,]+[kK]?)/g;
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <strong key={i} className="font-bold">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
};

// ─── Section Renderers ────────────────────────────────────────

const renderSection = (section: PromotionSection, sectionIdx: number) => {
  switch (section.type) {
    // ── Large price display ──
    case 'price':
      return (
        <div key={sectionIdx} className="text-center py-2">
          <span className="text-[3.75rem] font-bold text-black leading-none tracking-tight">
            {section.value}
          </span>
        </div>
      );

    // ── Rebate / deduction list ──
    case 'list':
      return (
        <div key={sectionIdx} className="py-1">
          {section.items?.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center gap-2 text-[1.375rem] font-normal text-black"
            >
              <MinusCircle size={20} className="text-red-500 shrink-0" />
              <span>
                {item.label} {item.value != null ? `$${item.value}` : ''}
              </span>
            </div>
          ))}
        </div>
      );

    // ── Informational text block ──
    case 'info':
      return (
        <div key={sectionIdx} className="text-center py-5">
          <p className="text-xl font-normal leading-[1.2] whitespace-pre-line">
            {section.value}
          </p>
        </div>
      );

    // ── Highlighted final pricing ──
    case 'highlight':
      return (
        <div key={sectionIdx} className="pt-5 border-t border-gray-200 text-center">
          {section.title && (
            <span className="text-xl font-semibold text-black leading-none block mb-1">
              {section.title}
            </span>
          )}
          <span className="text-[3.75rem] font-black text-[#63B846] leading-none block">
            {section.value}
          </span>
        </div>
      );

    // ── Simple text / footnote ──
    case 'text':
      return (
        <div key={sectionIdx} className="text-center pt-3 pb-2">
          {section.value && (
            <p className="text-lg font-normal  leading-none">
              {section.value}
            </p>
          )}
          {section.items?.map((item, idx) => (
            <p
              key={idx}
              className={`text-lg tracking-tight leading-normal font-bold`}
            >
              {item.label}
            </p>
          ))}
        </div>
      );

    default:
      return null;
  }
};

// ─── Component ────────────────────────────────────────────────

const BatteryPricing = ({
  backgroundImage = '/fallback.png',
  centerImage = '/sig_energy.png',
  items = [
    {
      title: '8.3kWh Battery',
      sections: [
        { type: 'price', value: '$14404' },
        {
          type: 'list',
          items: [
            { label: 'State Rebate', value: 1209 },
            { label: 'Federal Rebate', value: 2205 },
          ],
        },
        {
          type: 'info',
          value:
            'Up to $10K loan\n0% interest for 10 years\navailable under rebate scheme',
        },
        { type: 'highlight', title: 'Final Pricing', value: '$10990' },
        {
          type: 'text',
          value: 'Fully Installed',
          items: [
            {
              label: 'Price is after the battery rebate',
              emphasis: 'bold',
            },
          ],
        },
      ],
    },
    {
      title: '16.6kWh Battery',
      sections: [
        { type: 'price', value: '$18245' },
        {
          type: 'list',
          items: [
            { label: 'State Rebate', value: 1300 },
            { label: 'Federal Rebate', value: 3955 },
          ],
        },
        {
          type: 'info',
          value:
            'Up to $10K loan\n0% interest for 10 years\navailable under rebate scheme',
        },
        { type: 'highlight', title: 'Final Pricing', value: '$12990' },
        {
          type: 'text',
          value: 'Fully Installed',
          items: [
            {
              label: 'Price is after the battery rebate',
              emphasis: 'bold',
            },
          ],
        },
      ],
    },
  ],
}: PromotionGridProps) => {
  return (
    <section
      className="relative w-full py-16 md:py-24 px-[5%] md:px-[3%] md:px-[5%] md:px-[3%] overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
      }}
    >
      <Fade duration={5}>
        <div className="z-10 relative">
          {/* 3-column grid: Card | Image | Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-0 items-center">
            {/* Left Card */}
            {items[0] && (
              <div className="w-full bg-white/90 backdrop-blur-sm rounded-[12px] p-6 md:p-6 flex flex-col shadow-xl transition-all duration-300">
                {/* Card Title */}
                <h3 className="text-[2.5rem]  font-black text-black text-center pb-4 border-b tracking-tight">
                  {items[0].title}
                </h3>

                {/* Sections */}
                {items[0].sections.map((section, idx) =>
                  renderSection(section, idx)
                )}
              </div>
            )}

            {/* Center Column – Battery Image */}
            {centerImage && (
              <div className="w-full flex flex-col items-center justify-center my-4 md:my-0 group md:order-none">
                <div className="relative h-[250px] sm:h-[300px] lg:h-[400px] w-full flex items-center justify-center">
                  <img
                    src={centerImage}
                    alt="Battery System"
                    className="max-h-full max-w-full object-contain drop-shadow-[0_15px_30px_rgba(255,255,255,0.15)] group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/fallback.png';
                    }}
                  />
                </div>
              </div>
            )}

            {/* Right Card */}
            {items[1] && (
              <div className="w-full bg-white/90 backdrop-blur-sm rounded-[12px] p-4 md:p-6 flex flex-col shadow-xl transition-all duration-300">
                {/* Card Title */}
                <h3 className="text-[2.5rem] font-black text-black text-center pb-4 border-b tracking-tight">
                  {items[1].title}
                </h3>

                {/* Sections */}
                {items[1].sections.map((section, idx) =>
                  renderSection(section, idx)
                )}
              </div>
            )}
          </div>
        </div>
      </Fade>
    </section>
  );
};

export default BatteryPricing;
