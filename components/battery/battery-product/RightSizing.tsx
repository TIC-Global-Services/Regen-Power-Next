"use client";
import React, { useState } from 'react';
import {
    Zap,
    Sun,
    Car,
    Home,
    PanelTop,
    ArrowUpRight,
    type LucideIcon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CtaButton from '@/reuseables/CtaButton';

export type RightSizingIconName = 'zap' | 'sun' | 'car' | 'home' | 'paneltop';

export interface RightSizingStep {
    iconName: RightSizingIconName;
    title: string;
    placeholder?: string;
}

export interface RightSizingData {
    topSubtitle: string;
    title: string;
    description: string;
    steps: RightSizingStep[];
    ctaText?: string;
    ctaHref?: string;
}

const ICON_MAP: Record<RightSizingIconName, LucideIcon> = {
    zap: Zap,
    sun: Sun,
    car: Car,
    home: Home,
    paneltop: PanelTop,
};

const RightSizing: React.FC<{ data?: RightSizingData }> = ({ data }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);

    if (!data || !data.steps || data.steps.length === 0) return null;

    const step = data.steps[currentStep];
    const StepIcon = ICON_MAP[step.iconName] ?? Zap;
    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === data.steps.length - 1;

    const handleBack = () => {
        if (isFirstStep) return;
        setCurrentStep((prev) => prev - 1);
    };

    const handleNext = () => {
        if (!isLastStep) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const next = [...answers];
        next[currentStep] = e.target.value;
        setAnswers(next);
    };

    return (
        <section className="w-full px-[5%] py-12 md:py-20 bg-white">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
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

                {/* Progress Bar */}
                <div className="flex items-center gap-2 md:gap-3 mt-10 md:mt-14 max-w-2xl mx-auto">
                    {data.steps.map((_, idx) => {
                        const isCompleted = idx < currentStep;
                        const isActive = idx === currentStep;
                        return (
                            <div
                                key={idx}
                                className={`flex-1 h-1.5 rounded-full transition-colors duration-300 ${
                                    isActive || isCompleted ? 'bg-[#63B846]' : 'bg-[#A8D88A]'
                                }`}
                            />
                        );
                    })}
                </div>

                {/* Step Content */}
                <div className="mt-12 md:mt-16">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="flex flex-col items-center"
                        >
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#EAF2E2] flex items-center justify-center mb-6">
                                <StepIcon
                                    className="w-9 h-9 md:w-10 md:h-10 text-[#63B846]"
                                    strokeWidth={2}
                                />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-normal tracking-tight text-black text-center">
                                {step.title}
                            </h3>
                        </motion.div>
                    </AnimatePresence>

                    {/* Action Row */}
                    <div className="flex flex-wrap items-center justify-between md:justify-between gap-4 md:gap-6 mt-12 md:mt-16">
                        {/* Back Button — bottom-left on mobile, first on desktop */}
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

                        {/* Input — top on mobile, middle on desktop */}
                        <input
                            type="text"
                            value={answers[currentStep] || ''}
                            onChange={handleAnswerChange}
                            placeholder={step.placeholder || 'Your Answer'}
                            className="order-1 md:order-2 w-[85%] md:w-auto md:max-w-md md:flex-1 mx-auto md:mx-0 px-6 py-3 rounded-full border border-[#63B846] text-black placeholder:text-[#63B846]/70 text-sm md:text-base text-left md:text-center focus:outline-none focus:ring-2 focus:ring-[#63B846]/30 bg-white"
                        />

                        {/* Next / Final CTA Button — bottom-right on mobile, last on desktop */}
                        <div className="order-3">
                            {isLastStep && data.ctaHref ? (
                                <CtaButton
                                    text={data.ctaText || 'Get My Quote'}
                                    href={data.ctaHref}
                                    iconBgClass="bg-[#3a8a2a]"
                                    iconTextColor="text-white"
                                />
                            ) : (
                                <CtaButton
                                    text="Next"
                                    onClick={handleNext}
                                    disabled={isLastStep}
                                    iconBgClass="bg-[#3a8a2a]"
                                    iconTextColor="text-white"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RightSizing;
