"use client";
import React, { useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CtaButton from '@/reuseables/CtaButton';

export interface RightSizingStepIcon {
    src: string;
    alt: string;
}

export interface RightSizingOption {
    label: string;
    value: string;
}

export interface RightSizingStep {
    icon: RightSizingStepIcon | null;
    title: string;
    placeholder?: string;
    /** When present, this step renders a dropdown of these options — no free text. */
    options?: RightSizingOption[];
}

export interface RightSizingData {
    topSubtitle: string;
    title: string;
    description: string;
    steps: RightSizingStep[];
    ctaText?: string;
    ctaHref?: string;
}

// ─── Sizing engine (ported from regen-battery-sizing-widget_3.html) ──

export const SIZE_TIERS = [
    { maxKwh: 7, range: '5–7 kWh', tier: 'small', label: 'Compact — great for smaller households and units' },
    { maxKwh: 10, range: '8–10 kWh', tier: 'medium', label: 'Standard — the sweet spot for most Perth homes' },
    { maxKwh: 13.5, range: '10–13.5 kWh', tier: 'large', label: 'Premium — ideal for larger families and home workers' },
    { maxKwh: 999, range: '15 kWh+', tier: 'xl', label: 'High capacity — EV households, large homes, future-proof' },
] as const;

export type RightSizingSizing = {
    dailyUsage: number;
    recommendedKwh: number;
    range: string;
    tier: string;
    sizeLabel: string;
    annualSavLow: number;
    annualSavHigh: number;
};

export type RightSizingInputs = {
    quarterlyBill: number;
    householdSize: string;
    hasSolar: boolean;
    hasEv: string;
    daytimeOcc: string;
    solarKw?: number | null;
};

export function calcRecommendedSize(inputs: RightSizingInputs): RightSizingSizing {
    const { quarterlyBill, householdSize, hasSolar, hasEv, daytimeOcc } = inputs;
    const dailyUsage = quarterlyBill / 92 / 0.31;
    let size = Math.min(Math.max(dailyUsage * 0.4, 5), 20);
    if (!hasSolar) size += 2;
    if (hasEv === 'yes') size += 3;
    if (hasEv === 'unsure') size += 1.5;
    if (daytimeOcc === 'empty') size -= 1;
    if (daytimeOcc === 'full') size += 1;
    if (householdSize === '5+') size += 1.5;
    if (householdSize === '1-2') size -= 0.5;
    size = Math.round(size * 2) / 2;
    size = Math.min(Math.max(size, 5), 20);
    const tier = SIZE_TIERS.find((t) => size <= t.maxKwh) ?? SIZE_TIERS[SIZE_TIERS.length - 1]!;
    const savingsRate = ({ small: 0.60, medium: 0.72, large: 0.80, xl: 0.85 } as Record<string, number>)[tier.tier] ?? 0.72;
    const annualBill = quarterlyBill * 4;
    const savLow = Math.round(annualBill * (savingsRate - 0.05) / 100) * 100;
    const savHigh = Math.round(annualBill * (savingsRate + 0.05) / 100) * 100;
    return {
        dailyUsage: Math.round(dailyUsage * 10) / 10,
        recommendedKwh: size,
        range: tier.range,
        tier: tier.tier,
        sizeLabel: tier.label,
        annualSavLow: savLow,
        annualSavHigh: savHigh,
    };
}

// ─── Component ────────────────────────────────────────────────────────

const RightSizing: React.FC<{ data?: RightSizingData }> = ({ data }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [errors, setErrors] = useState<Record<number, string>>({});
    const [result, setResult] = useState<RightSizingSizing | null>(null);

    if (!data || !data.steps || data.steps.length === 0) return null;

    const step = result ? null : data.steps[currentStep];
    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === data.steps.length - 1;
    const hasResult = result !== null;

    const handleBack = () => {
        if (hasResult) {
            // From results, go back into last step to edit
            setResult(null);
            setErrors({});
            return;
        }
        if (isFirstStep) return;
        setErrors((p) => ({ ...p, [currentStep]: '' }));
        setCurrentStep((prev) => prev - 1);
    };

    const isDropdownStep = (idx: number) => {
        const s = data.steps[idx];
        return !!(s.options && s.options.length > 0);
    };

    const validateStep = (idx: number): boolean => {
        const val = (answers[idx] ?? '').trim();
        if (!val) {
            const msg = isDropdownStep(idx) ? 'Please select an option.' : 'Please enter an answer.';
            setErrors((p) => ({ ...p, [idx]: msg }));
            return false;
        }
        if (isDropdownStep(idx)) {
            const allowed = new Set(data.steps[idx].options!.map((o) => o.value));
            if (!allowed.has(val)) {
                setErrors((p) => ({ ...p, [idx]: 'Please select a valid option.' }));
                return false;
            }
        } else if (idx === 0) {
            // Step 0 is the bill — must be a number (only when not a dropdown)
            const n = parseFloat(val);
            if (!n || n < 1) {
                setErrors((p) => ({ ...p, [idx]: 'Please enter a valid bill amount.' }));
                return false;
            }
        }
        setErrors((p) => ({ ...p, [idx]: '' }));
        return true;
    };

    const handleNext = () => {
        if (!validateStep(currentStep)) return;
        if (!isLastStep) setCurrentStep((prev) => prev + 1);
    };

    const handleCalculate = () => {
        if (!validateStep(currentStep)) return;
        const bill = parseFloat(answers[0] ?? '0') || 0;
        const householdSize = answers[1] ?? '3-4';
        const hasSolarRaw = (answers[2] ?? '').toLowerCase();
        const hasSolar = hasSolarRaw.startsWith('y') || hasSolarRaw.includes('yes');
        const hasEvRaw = (answers[3] ?? '').toLowerCase();
        const hasEv = hasEvRaw.includes('yes') ? 'yes' : hasEvRaw.includes('unsure') || hasEvRaw.includes('maybe') ? 'unsure' : hasEvRaw.includes('no') ? 'no' : 'no';
        const daytimeOccRaw = (answers[4] ?? '').toLowerCase();
        const daytimeOcc = daytimeOccRaw.includes('empty') ? 'empty' : daytimeOccRaw.includes('full') ? 'full' : 'partial';
        const sizing = calcRecommendedSize({ quarterlyBill: bill, householdSize, hasSolar, hasEv, daytimeOcc });
        setResult(sizing);
        try {
            const gtag = (typeof window !== 'undefined' ? (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag : undefined);
            if (typeof gtag === 'function') gtag('event', 'sizing_calc_complete', { battery_size_range: sizing.range, tier: sizing.tier });
        } catch { /* ignore */ }
    };

    const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const next = [...answers];
        next[currentStep] = e.target.value;
        setAnswers(next);
        if (errors[currentStep]) setErrors((p) => ({ ...p, [currentStep]: '' }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const next = [...answers];
        next[currentStep] = e.target.value;
        setAnswers(next);
        if (errors[currentStep]) setErrors((p) => ({ ...p, [currentStep]: '' }));
    };

    const hasDropdown = !!(step && step.options && step.options.length > 0);
    const stepError = errors[currentStep];

    return (
        <section className="w-full px-[5%] md:px-[3%] py-12 md:py-20 bg-white">
            <div className="max-w-4xl mx-auto">
                {/* Header — unchanged */}
                <div className="text-left md:text-center">
                    <p className="text-base md:text-3xl font-light tracking-tight text-black">
                        {data.topSubtitle}
                    </p>
                    <h2 className="text-[2.5rem] md:text-5xl lg:text-[3.5rem] font-normal tracking-tight text-[#63B846] leading-tight mt-1">
                        {data.title}
                    </h2>
                </div>
                <p className="text-base text-black text-left md:text-center max-w-3xl mx-auto mt-4 leading-[1.3] tracking-tight">
                    {data.description}
                </p>

                {/* Progress Bar — same dots style; when showing results, all dots filled */}
                <div className="flex items-center gap-2 md:gap-3 mt-10 md:mt-14 max-w-2xl mx-auto">
                    {data.steps.map((_, idx) => {
                        const isCompleted = hasResult || idx < currentStep;
                        const isActive = !hasResult && idx === currentStep;
                        return (
                            <div
                                key={idx}
                                className={`flex-1 h-1.5 rounded-full transition-colors duration-300 ${isActive || isCompleted ? 'bg-[#63B846]' : 'bg-[#A8D88A]'
                                    }`}
                            />
                        );
                    })}
                </div>

                {/* Steps content area — result replaces steps in-place, same height/position */}
                <div className="mt-12 md:mt-16">
                    <AnimatePresence mode="wait">
                        {hasResult && result ? (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                            >
                                {/* Icon circle — same style as steps */}
                                <div className="flex flex-col items-center">
                                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#EAF2E2] flex items-center justify-center mb-6 overflow-hidden">
                                        <span className="text-2xl md:text-3xl font-bold tracking-tight text-[#63B846]">{result.range.split('–')[0]?.replace(' kWh', '').trim() ?? result.recommendedKwh}</span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-normal tracking-tight text-black text-center">
                                        Your personalised recommendation
                                    </h3>
                                    <p className="text-3xl md:text-4xl font-bold tracking-tighter text-[#63B846] mt-2">{result.range}</p>
                                    <p className="text-sm md:text-base text-black/70 text-center max-w-xl mt-2">{result.sizeLabel}</p>
                                    <p className="mt-4 inline-flex rounded-full bg-[#EAF2E2] border border-[#63B846]/20 px-5 py-2 text-sm text-black">
                                        Estimated savings: <span className="font-bold ml-1">${result.annualSavLow.toLocaleString()}–${result.annualSavHigh.toLocaleString()}/yr</span>
                                    </p>
                                    <p className="text-xs text-black/40 mt-2">Based on Synergy A1 ~$0.31/kWh · {result.dailyUsage} kWh/day · {result.recommendedKwh} kWh recommended</p>
                                </div>

                                {/* Action row in result — same 3-column layout, centered CTA */}
                                <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6 mt-10 md:mt-12">
                                    <CtaButton
                                        text="Back"
                                        onClick={handleBack}
                                        bgClass="bg-[#EAEAEA] backdrop-blur-md"
                                        borderClass="border border-transparent"
                                        hoverClass="hover:bg-[#D5D5D5]"
                                        textColor="text-black"
                                        iconBgClass="bg-black"
                                        iconTextColor="text-white"
                                        icon={ArrowUpRight}
                                        className="order-2 md:order-1"
                                    />
                                    <div className="order-1 md:order-2 w-[85%] md:w-auto md:max-w-md md:flex-1 mx-auto md:mx-0" />
                                    <div className="order-3 flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => { setResult(null); }}
                                            className="text-sm text-black/60 hover:text-black underline underline-offset-4 px-2"
                                        >
                                            Adjust answers
                                        </button>
                                        {data.ctaHref && (
                                            <CtaButton
                                                text={data.ctaText || 'Get My Quote'}
                                                href={data.ctaHref}
                                                iconBgClass="bg-[#3a8a2a]"
                                                iconTextColor="text-white"
                                            />
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ) : step ? (
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                            >
                                <div className="flex flex-col items-center">
                                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#EAF2E2] flex items-center justify-center mb-6 overflow-hidden">
                                        {step.icon ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={step.icon.src}
                                                alt={step.icon.alt || step.title}
                                                className="w-9 h-9 md:w-10 md:h-10 object-contain"
                                            />
                                        ) : (
                                            <span className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#63B846]" />
                                        )}
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-normal tracking-tight text-black text-center">
                                        {step.title}
                                    </h3>
                                </div>

                                {/* Action Row — Back | Input/Dropdown | Next/CTA */}
                                <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6 mt-12 md:mt-16">
                                    <CtaButton
                                        text="Back"
                                        onClick={handleBack}
                                        bgClass="bg-[#EAEAEA] backdrop-blur-md"
                                        borderClass="border border-transparent"
                                        hoverClass={isFirstStep ? '' : 'hover:bg-[#D5D5D5]'}
                                        textColor="text-black"
                                        iconBgClass="bg-black"
                                        iconTextColor="text-white"
                                        icon={ArrowUpRight}
                                        disabled={isFirstStep}
                                        className="order-2 md:order-1"
                                    />

                                    {/* Dropdown for option steps, input only for free-text steps */}
                                    <div className="order-1 md:order-2 w-[85%] md:w-auto md:max-w-md md:flex-1 mx-auto md:mx-0 flex flex-col gap-2">
                                        {hasDropdown ? (
                                            <div className="relative">
                                                <select
                                                    value={answers[currentStep] || ''}
                                                    onChange={handleSelectChange}
                                                    className="w-full appearance-none px-6 py-3 pr-10 rounded-full border border-[#63B846] text-black text-sm md:text-base text-left md:text-center focus:outline-none focus:ring-2 focus:ring-[#63B846]/30 bg-white"
                                                >
                                                    <option value="">{step.placeholder || 'Select an option'}</option>
                                                    {step.options!.map((opt) => (
                                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#63B846]" />
                                            </div>
                                        ) : (
                                            <input
                                                type="number"
                                                inputMode="numeric"
                                                value={answers[currentStep] || ''}
                                                onChange={handleAnswerChange}
                                                placeholder={step.placeholder || 'Your Answer'}
                                                className="w-full px-6 py-3 rounded-full border border-[#63B846] text-black placeholder:text-[#63B846]/70 text-sm md:text-base text-left md:text-center focus:outline-none focus:ring-2 focus:ring-[#63B846]/30 bg-white"
                                            />
                                        )}
                                        {stepError && <p className="text-xs text-red-600 px-2" role="alert">{stepError}</p>}
                                    </div>

                                    <div className="order-3">
                                        {isLastStep ? (
                                            <CtaButton
                                                text="Show my recommendation"
                                                onClick={handleCalculate}
                                                iconBgClass="bg-[#3a8a2a]"
                                                iconTextColor="text-white"
                                            />
                                        ) : (
                                            <CtaButton
                                                text="Next"
                                                onClick={handleNext}
                                                iconBgClass="bg-[#3a8a2a]"
                                                iconTextColor="text-white"
                                            />
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default RightSizing;
