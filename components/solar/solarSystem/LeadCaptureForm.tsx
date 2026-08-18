"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import SectionHeader from '@/reuseables/SectionHeader';

import defaultQuoteImg from '@/assets/solar/batteryquote.png';

interface LeadCaptureFormProps {
    subtitle?: string;
    title?: string;
    description?: string;
    image?: string | StaticImageData;
}

const quoteSchema = z.object({
    fullName: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(80, "Name is too long"),
    phone: z
        .string()
        .min(8, "Enter a valid contact number")
        .max(15, "Contact number is too long"),
    email: z.string().email("Enter a valid email address"),
    address: z
        .string()
        .min(5, "Enter your full address")
        .max(200, "Address is too long"),
    billTier: z.enum(["<200", "200-400", "400-600", "600+"], {
        message: "Select your electricity bill range",
    }),
    enquiryType: z.enum(
        ["solar-battery", "battery-only", "commercial-solar", "ev-charger"],
        { message: "Select an enquiry type" }
    ),
    contactTime: z.enum(["morning", "afternoon", "evening"], {
        message: "Select a preferred contact time",
    }),
    message: z.string().max(500, "Message is too long").optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

interface RadioOptionProps {
    id: string;
    label: string;
    value: string;
    name: string;
    checked: boolean;
    onChange: () => void;
}

const RadioOption: React.FC<RadioOptionProps> = ({
    id,
    label,
    value,
    name,
    checked,
    onChange,
}) => (
    <label
        htmlFor={id}
        className="flex items-center gap-2 cursor-pointer group text-sm md:text-base text-gray-700"
    >
        <span
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${checked
                ? "border-black border-[0.5px] bg-[#63B8461A]"
                : "border-gray-300 group-hover:border-gray-400"
                }`}
        >
            {checked && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
        </span>
        <input
            type="radio"
            id={id}
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
            className="sr-only"
        />
        {label}
    </label>
);

const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
    subtitle = "Get Your Free Solar &",
    title = "Battery Quote",
    description = "Our Technical Sales Team Will Design A System Tailored To Your Home, Usage, And Budget. Most Quotes Delivered Within 24 Hours.",
    image = defaultQuoteImg,
}) => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<QuoteFormData>({
        resolver: zodResolver(quoteSchema),
        defaultValues: {
            billTier: "<200",
            enquiryType: "solar-battery",
            contactTime: "morning",
            message: "",
        },
    });

    const billTier = watch("billTier");
    const enquiryType = watch("enquiryType");
    const contactTime = watch("contactTime");

    const onSubmit = async (data: QuoteFormData) => {
        console.log("Quote request submitted:", data);
        alert("Thank you! Your quote request has been submitted. We'll be in touch within 24 hours.");
    };

    return (
        <section id="quote-form" className="py-16 md:py-24 bg-white border-t border-gray-50">
            <div className="px-[3%] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Left Column: Heading and 3D Graphic */}
                    <div className="lg:col-span-5 flex flex-col justify-center h-full">
                        <SectionHeader
                            subtitle={subtitle}
                            title={title}
                            description={description}
                            align="left"

                            descClass="mb-8"
                        />

                        <div className="relative w-full aspect-square max-w-[360px] mx-auto lg:mx-0 rounded-2xl overflow-hidden flex items-center justify-center">
                            <Image
                                src={image}
                                alt="Intake Graphic"
                                fill
                                className="object-contain p-2"
                                placeholder={typeof image === 'object' ? 'blur' : undefined}
                            />
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="lg:col-span-7">
                        <div className="bg-[#EEF6EB] rounded-[32px] p-6 md:p-10 shadow-sm border border-[#63B846]/10">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                                {/* Contact Information */}
                                <div>
                                    <h3 className="text-gray-800 font-semibold text-lg mb-4 font-[var(--font-aeonik)]">Contact Information</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex flex-col">
                                            <input
                                                {...register("fullName")}
                                                type="text"
                                                placeholder="Your Full Name"
                                                className="w-full bg-transparent border-b border-gray-300 py-2.5 text-sm text-black placeholder-gray-500 focus:outline-none focus:border-[#63B846] transition-colors"
                                            />
                                            {errors.fullName && (
                                                <span className="text-red-500 text-xs mt-1">{errors.fullName.message}</span>
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <input
                                                {...register("phone")}
                                                type="tel"
                                                placeholder="Your Contact Number"
                                                className="w-full bg-transparent border-b border-gray-300 py-2.5 text-sm text-black placeholder-gray-500 focus:outline-none focus:border-[#63B846] transition-colors"
                                            />
                                            {errors.phone && (
                                                <span className="text-red-500 text-xs mt-1">{errors.phone.message}</span>
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <input
                                                {...register("email")}
                                                type="email"
                                                placeholder="Your Email Address"
                                                className="w-full bg-transparent border-b border-gray-300 py-2.5 text-sm text-black placeholder-gray-500 focus:outline-none focus:border-[#63B846] transition-colors"
                                            />
                                            {errors.email && (
                                                <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <input
                                                {...register("address")}
                                                type="text"
                                                placeholder="Enter Your Full Address"
                                                className="w-full bg-transparent border-b border-gray-300 py-2.5 text-sm text-black placeholder-gray-500 focus:outline-none focus:border-[#63B846] transition-colors"
                                            />
                                            {errors.address && (
                                                <span className="text-red-500 text-xs mt-1">{errors.address.message}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Current Electricity Bill Tier */}
                                <div>
                                    <h3 className="text-gray-800 font-semibold text-sm uppercase tracking-wider mb-3 font-[var(--font-aeonik)]">Current Electricity Bill</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {(
                                            [
                                                { value: "<200", label: "< $200" },
                                                { value: "200-400", label: "$200 – $400" },
                                                { value: "400-600", label: "$400 – $600" },
                                                { value: "600+", label: "$600+" },
                                            ] as const
                                        ).map((opt) => (
                                            <RadioOption
                                                key={opt.value}
                                                id={`bill-${opt.value}`}
                                                name="billTier"
                                                value={opt.value}
                                                label={opt.label}
                                                checked={billTier === opt.value}
                                                onChange={() => setValue("billTier", opt.value)}
                                            />
                                        ))}
                                    </div>
                                    {errors.billTier && (
                                        <span className="text-red-500 text-xs mt-1">{errors.billTier.message}</span>
                                    )}
                                </div>

                                {/* Type of Enquiry */}
                                <div>
                                    <h3 className="text-gray-800 font-semibold text-sm uppercase tracking-wider mb-3 font-[var(--font-aeonik)]">Type Of Enquiry</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {(
                                            [
                                                { value: "solar-battery", label: "Solar + Battery" },
                                                { value: "battery-only", label: "Battery Only" },
                                                { value: "commercial-solar", label: "Commercial Solar" },
                                                { value: "ev-charger", label: "EV Charger Installation" },
                                            ] as const
                                        ).map((opt) => (
                                            <RadioOption
                                                key={opt.value}
                                                id={`enquiry-${opt.value}`}
                                                name="enquiryType"
                                                value={opt.value}
                                                label={opt.label}
                                                checked={enquiryType === opt.value}
                                                onChange={() => setValue("enquiryType", opt.value)}
                                            />
                                        ))}
                                    </div>
                                    {errors.enquiryType && (
                                        <span className="text-red-500 text-xs mt-1">{errors.enquiryType.message}</span>
                                    )}
                                </div>

                                {/* Preferred Contact Time */}
                                <div>
                                    <h3 className="text-gray-800 font-semibold text-sm uppercase tracking-wider mb-3 font-[var(--font-aeonik)]">Preferred Contact Time</h3>
                                    <div className="flex flex-wrap gap-4">
                                        {(
                                            [
                                                { value: "morning", label: "Morning" },
                                                { value: "afternoon", label: "Afternoon" },
                                                { value: "evening", label: "Evening" },
                                            ] as const
                                        ).map((opt) => (
                                            <RadioOption
                                                key={opt.value}
                                                id={`time-${opt.value}`}
                                                name="contactTime"
                                                value={opt.value}
                                                label={opt.label}
                                                checked={contactTime === opt.value}
                                                onChange={() => setValue("contactTime", opt.value)}
                                            />
                                        ))}
                                    </div>
                                    {errors.contactTime && (
                                        <span className="text-red-500 text-xs mt-1">{errors.contactTime.message}</span>
                                    )}
                                </div>

                                {/* Message (Optional) */}
                                <div>
                                    <h3 className="text-gray-800 font-semibold text-sm uppercase tracking-wider mb-3 font-[var(--font-aeonik)]">Message (Optional)</h3>
                                    <textarea
                                        {...register("message")}
                                        rows={3}
                                        placeholder="Tell Us About Your Property, Energy Goals, Or Any Specific Requirements."
                                        className="w-full bg-transparent border-b border-gray-300 py-2.5 text-sm text-black placeholder-gray-500 focus:outline-none focus:border-[#63B846] transition-colors resize-none"
                                    />
                                    {errors.message && (
                                        <span className="text-red-500 text-xs mt-1">{errors.message.message}</span>
                                    )}
                                </div>

                                {/* Submit */}
                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="group inline-flex items-center gap-3 bg-white text-black px-6 py-2.5 rounded-full text-sm md:text-base font-medium hover:text-white hover:bg-gray-900 transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? "Submitting..." : "Request My Free Quote"}
                                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#A0CF44] group-hover:translate-x-1 transition-transform duration-300">
                                            <ArrowRight className="w-5 h-5 text-white" />
                                        </span>
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default LeadCaptureForm;
