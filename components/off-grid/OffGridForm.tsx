'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '@/reuseables/SectionHeader';

const propertyNameOptions = ['Optional', 'For Stations', 'Resorts', 'Campus'];
const siteLocationOptions = ['Suburb', 'Nearest Town + Region', 'GPS'];
const energyOptions = ['<10 KWh/Day', '10–30 / 30–60', '60–150 / 150+'];
const powerSourceOptions = ['None', 'Generator Only', 'Small Solar+Battery', 'Other'];
const siteTypeOptions = [
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
    customValue?: string;
    onSelect: (value: string) => void;
    onCustomChange?: (value: string) => void;
    showCustomInput?: boolean;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
    name,
    options,
    selected,
    customValue,
    onSelect,
    onCustomChange,
    showCustomInput,
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
                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                            isSelected
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
        {showCustomInput && selected === 'Other' && (
            <input
                type="text"
                placeholder="Type Your Requirement"
                value={customValue || ''}
                onChange={(e) => onCustomChange?.(e.target.value)}
                className="w-full bg-transparent border-b border-gray-400 py-2 text-sm text-black placeholder-gray-500 focus:outline-none focus:border-[#63B846] transition-colors ml-6"
            />
        )}
    </div>
);

interface OffGridFormProps {
    subtitle: string;
    title: string;
    description: string;
    image: string;
    imageAlt?: string;
}

const OffGridForm: React.FC<OffGridFormProps> = ({
    subtitle,
    title,
    description,
    image,
    imageAlt = 'Off-grid facility illustration',
}) => {
    const [propertyName, setPropertyName] = useState('Optional');
    const [siteLocation, setSiteLocation] = useState('Suburb');
    const [siteLocationOther, setSiteLocationOther] = useState('');
    const [energy, setEnergy] = useState('<10 KWh/Day');
    const [powerSource, setPowerSource] = useState('None');
    const [powerSourceOther, setPowerSourceOther] = useState('');
    const [siteType, setSiteType] = useState('Lifestyle Home');
    const [waterTreatment, setWaterTreatment] = useState<'Yes' | 'No'>('Yes');

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="px-[5%] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    <div className="flex flex-col">
                        <SectionHeader
                            subtitle={subtitle}
                            title={title}
                            description={description}
                            align="left"
                            subtitleClass="text-lg md:text-2xl font-light text-black tracking-tight"
                            titleClass="text-4xl md:text-6xl lg:text-[4.5rem] text-[#63B846] font-normal tracking-tighter leading-none"
                            className="mb-8"
                        />

                        <div className="relative w-full aspect-square max-w-[420px] mt-6 rounded-[20px] overflow-hidden">
                            <img
                                src={image}
                                alt={imageAlt}
                                className="absolute inset-0 w-full h-full object-cover p-2"
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

                        {/* Property Name */}
                        <div>
                            <h3 className="text-xl font-medium text-black mb-3">Property Name</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                                <RadioGroup
                                    name="propertyName"
                                    options={propertyNameOptions}
                                    selected={propertyName}
                                    onSelect={setPropertyName}
                                />
                            </div>
                        </div>

                        {/* Site Location + Approximate Daily Energy Need */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-xl font-medium text-black mb-3">Site Location</h3>
                                <RadioGroup
                                    name="siteLocation"
                                    options={siteLocationOptions}
                                    selected={siteLocation}
                                    onSelect={setSiteLocation}
                                />
                                {siteLocation === 'GPS' && (
                                    <input
                                        type="text"
                                        placeholder="Type Your Requirement"
                                        value={siteLocationOther}
                                        onChange={(e) => setSiteLocationOther(e.target.value)}
                                        className="w-full bg-transparent border-b border-gray-400 py-2 text-sm text-black placeholder-gray-500 focus:outline-none focus:border-[#63B846] transition-colors mt-3"
                                    />
                                )}
                            </div>
                            <div>
                                <h3 className="text-xl font-medium text-black mb-3">Approximate Daily Energy Need</h3>
                                <RadioGroup
                                    name="energy"
                                    options={energyOptions}
                                    selected={energy}
                                    onSelect={setEnergy}
                                />
                            </div>
                        </div>

                        {/* Current Power Source + Site Type */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-xl font-medium text-black mb-3">Current Power Source</h3>
                                <RadioGroup
                                    name="powerSource"
                                    options={powerSourceOptions}
                                    selected={powerSource}
                                    customValue={powerSourceOther}
                                    onSelect={setPowerSource}
                                    onCustomChange={setPowerSourceOther}
                                    showCustomInput
                                />
                            </div>
                            <div>
                                <h3 className="text-xl font-medium text-black mb-3">Site Type</h3>
                                <RadioGroup
                                    name="siteType"
                                    options={siteTypeOptions}
                                    selected={siteType}
                                    onSelect={setSiteType}
                                />
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

                        {/* Anything We Should Know */}
                        <div>
                            <h3 className="text-xl font-medium text-black mb-3">Anything We Should Know</h3>
                            <input type="text" placeholder="Your Text" className="w-full bg-transparent border-b border-gray-400 py-2 text-sm placeholder-gray-500 focus:outline-none focus:border-[#63B846]" />
                        </div>

                        {/* Submit */}
                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                className="group inline-flex items-center gap-3 bg-white text-black border border-gray-300 pl-5 pr-1.5 py-1.5 rounded-full text-sm md:text-base font-medium hover:bg-gray-900 hover:text-white transition-all duration-300"
                            >
                                Request My Free Quote
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
};

export default OffGridForm;
