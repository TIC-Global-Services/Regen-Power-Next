'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '@/reuseables/SectionHeader';
import type { ResolvedCommercialSystemsCommercialForm } from '@/lib/strapi/resolvers/commercial';

interface Props {
    resolved: ResolvedCommercialSystemsCommercialForm;
}

const decisionMakerOptions = ['Owner', 'GM', 'CFO', 'Facilities', 'Sustainability', 'Other'];
const industryOptions = [
    'Manufacturing',
    'Cold Storage',
    'Hospitality',
    'Healthcare',
    'Retail',
    'Education',
    'Agribusiness',
    'Other',
];
const monthlyBillOptions = ['None', 'Generator Only', 'Small Solar+Battery', 'Other'];
const roofAreaOptions = [
    'Lifestyle Home',
    'Farm Or Station',
    'Mining Or Exploration',
    'Tourism',
    'Remote Infrastructure',
    'Community',
    'International',
];

interface RadioGroupProps {
    name: string;
    options: string[];
    selected: string;
    customValue: string;
    onSelect: (value: string) => void;
    onCustomChange: (value: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
    name,
    options,
    selected,
    customValue,
    onSelect,
    onCustomChange,
}) => (
    <div className="space-y-2.5">
        {options.map((option) => {
            const isSelected = selected === option;
            return (
                <label
                    key={option}
                    className="flex items-center gap-2.5 cursor-pointer text-sm md:text-base text-black/80"
                >
                    <span
                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${isSelected
                            ? 'border-black bg-[#63B846]/10'
                            : 'border-gray-400'
                            }`}
                    >
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                    </span>
                    <input
                        type="radio"
                        name={name}
                        value={option}
                        checked={isSelected}
                        onChange={() => onSelect(option)}
                        className="sr-only"
                    />
                    {option}
                </label>
            );
        })}
        {selected === 'Other' && (
            <input
                type="text"
                placeholder="Type Your Requirement"
                value={customValue}
                onChange={(e) => onCustomChange(e.target.value)}
                className="w-full bg-transparent border-b border-gray-400 py-2 text-sm text-black placeholder-gray-500 focus:outline-none focus:border-[#63B846] transition-colors ml-6"
            />
        )}
    </div>
);

export default function CommercialFormSection({ resolved }: Props) {
    const imageSrc = resolved.image?.src || '/fallback.png';

    const [decisionMaker, setDecisionMaker] = useState('Owner');
    const [decisionMakerOther, setDecisionMakerOther] = useState('');

    const [industry, setIndustry] = useState('Manufacturing');
    const [industryOther, setIndustryOther] = useState('');

    const [monthlyBill, setMonthlyBill] = useState('None');
    const [monthlyBillOther, setMonthlyBillOther] = useState('');

    const [roofArea, setRoofArea] = useState('Lifestyle Home');

    const [waterTreatment, setWaterTreatment] = useState<'Yes' | 'No'>('Yes');

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="px-[5%] md:px-[3%] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    <div className="flex flex-col">
                        <SectionHeader
                            subtitle={resolved.subtitle}
                            title={resolved.title}
                            description={resolved.description}
                            align="left"
                            subtitleClass="text-lg md:text-2xl font-light text-black tracking-tight"
                            titleClass="text-4xl md:text-6xl lg:text-[4.5rem] text-[#63B846] font-normal tracking-tighter leading-none"
                            className="mb-8"
                        />

                        <div className="relative w-full aspect-square max-w-[420px] mt-6 rounded-[20px] overflow-hidden">
                            <img
                                src={imageSrc}
                                alt="Commercial facility"
                                className="w-full h-full object-contain p-2"
                            />
                        </div>
                    </div>

                    <div className="bg-[#E5EFD5] rounded-[24px] p-6 md:p-10 space-y-8">
                        {/* Contact Information */}
                        <div>
                            <h3 className="text-xl font-medium text-black mb-4">Contact Information</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
                                <input type="text" placeholder="Your Full Name" className="w-full bg-transparent border-b border-gray-400 py-2 text-sm placeholder-gray-500 focus:outline-none focus:border-[#63B846]" />
                                <input type="tel" placeholder="Your Contact Number" className="w-full bg-transparent border-b border-gray-400 py-2 text-sm placeholder-gray-500 focus:outline-none focus:border-[#63B846]" />
                                <input type="email" placeholder="Your Email Address" className="w-full bg-transparent border-b border-gray-400 py-2 text-sm placeholder-gray-500 focus:outline-none focus:border-[#63B846]" />
                                <input type="text" placeholder="Your Suburb Or Postcode" className="w-full bg-transparent border-b border-gray-400 py-2 text-sm placeholder-gray-500 focus:outline-none focus:border-[#63B846]" />
                            </div>
                        </div>

                        {/* Business Name */}
                        <div>
                            <h3 className="text-xl font-medium text-black mb-3">Business Name</h3>
                            <input type="text" placeholder="Your Full Name" className="w-full bg-transparent border-b border-gray-400 py-2 text-sm placeholder-gray-500 focus:outline-none focus:border-[#63B846]" />
                        </div>

                        {/* Site Address */}
                        <div>
                            <h3 className="text-xl font-medium text-black mb-3">Site Address</h3>
                            <input type="text" placeholder="Your Address" className="w-full bg-transparent border-b border-gray-400 py-2 text-sm placeholder-gray-500 focus:outline-none focus:border-[#63B846]" />
                        </div>

                        {/* Decision-Maker Role + Industry */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-xl font-medium text-black mb-3">Decision-Maker Role</h3>
                                <RadioGroup
                                    name="decisionMaker"
                                    options={decisionMakerOptions}
                                    selected={decisionMaker}
                                    customValue={decisionMakerOther}
                                    onSelect={setDecisionMaker}
                                    onCustomChange={setDecisionMakerOther}
                                />
                            </div>
                            <div>
                                <h3 className="text-xl font-medium text-black mb-3">Industry</h3>
                                <RadioGroup
                                    name="industry"
                                    options={industryOptions}
                                    selected={industry}
                                    customValue={industryOther}
                                    onSelect={setIndustry}
                                    onCustomChange={setIndustryOther}
                                />
                            </div>
                        </div>

                        {/* Monthly Bill + Roof Area */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-xl font-medium text-black mb-3">Average Monthly Bill</h3>
                                <RadioGroup
                                    name="monthlyBill"
                                    options={monthlyBillOptions}
                                    selected={monthlyBill}
                                    customValue={monthlyBillOther}
                                    onSelect={setMonthlyBill}
                                    onCustomChange={setMonthlyBillOther}
                                />
                            </div>
                            <div>
                                <h3 className="text-xl font-medium text-black mb-3">Approximate Roof Area In M²</h3>
                                <div className="space-y-2.5">
                                    {roofAreaOptions.map((option) => (
                                        <label key={option} className="flex items-center gap-2.5 cursor-pointer text-sm md:text-base text-black/80">
                                            <span className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${roofArea === option ? 'border-black bg-[#63B846]/10' : 'border-gray-400'}`}>
                                                {roofArea === option && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                                            </span>
                                            <input
                                                type="radio"
                                                name="roofArea"
                                                value={option}
                                                checked={roofArea === option}
                                                onChange={() => setRoofArea(option)}
                                                className="sr-only"
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Water Treatment */}
                        <div>
                            <h3 className="text-xl font-medium text-black mb-3">Water Treatment Also Required?</h3>
                            <div className="flex gap-6">
                                {(['Yes', 'No'] as const).map((option) => (
                                    <label key={option} className="flex items-center gap-2.5 cursor-pointer text-sm md:text-base text-black/80">
                                        <span className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${waterTreatment === option ? 'border-black bg-[#63B846]/10' : 'border-gray-400'}`}>
                                            {waterTreatment === option && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                                        </span>
                                        <input
                                            type="radio"
                                            name="waterTreatment"
                                            value={option}
                                            checked={waterTreatment === option}
                                            onChange={() => setWaterTreatment(option)}
                                            className="sr-only"
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Upload */}
                        <div>
                            <h3 className="text-xl font-medium text-black mb-3">Upload Field: Bill Upload</h3>
                            <div className="flex flex-col gap-2">
                                <button type="button" className="self-start border border-gray-400 rounded-full px-4 py-1.5 text-sm text-black/80 hover:border-[#63B846] transition-colors">
                                    + Upload
                                </button>
                                <span className="text-xs text-black/60">(PDF, Optional, Max 10MB)</span>
                            </div>
                        </div>

                        {/* Notes */}
                        <div>
                            <h3 className="text-xl font-medium text-black mb-3">Tell Us Anything About Your Site We Should Know</h3>
                            <input type="text" placeholder="Your Text" className="w-full bg-transparent border-b border-gray-400 py-2 text-sm placeholder-gray-500 focus:outline-none focus:border-[#63B846]" />
                        </div>

                        {/* Submit */}
                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                className="group inline-flex items-center gap-3 bg-white text-black border border-gray-300 pl-5 pr-1.5 py-1.5 rounded-full text-sm md:text-base font-medium hover:bg-gray-900 hover:text-white transition-all duration-300"
                            >
                                Submit
                                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#A0CF44] group-hover:translate-x-1 transition-transform duration-300">
                                    <ArrowRight className="w-4 h-4 text-white" />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
