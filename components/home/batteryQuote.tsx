"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SectionHeader from "@/reuseables/SectionHeader";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";

export interface BatteryQuoteData {
    subtitle: string;
    title: string;
    description: string;
    image: StaticImageData | string;
}

interface BatteryQuoteProps {
    data: BatteryQuoteData;
}

/* ── Zod Schema ── */
const quoteSchema = z.object({
    fullName: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(80, "Name is too long"),
    contactNumber: z
        .string()
        .min(8, "Enter a valid contact number")
        .max(15, "Contact number is too long"),
    email: z.string().email("Enter a valid email address"),
    address: z
        .string()
        .min(5, "Enter your full address")
        .max(200, "Address is too long"),
    electricityBill: z.enum(["<200", "200-400", "400-600", "600+"], {
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

/* ── Radio Option Helper ── */
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

const BatteryQuote = ({ data }: BatteryQuoteProps) => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<QuoteFormData>({
        resolver: zodResolver(quoteSchema),
        defaultValues: {
            electricityBill: "<200",
            enquiryType: "solar-battery",
            contactTime: "morning",
            message: "",
        },
    });

    const electricityBill = watch("electricityBill");
    const enquiryType = watch("enquiryType");
    const contactTime = watch("contactTime");

    const onSubmit = async (formData: QuoteFormData) => {
        // In production, this would send to an API endpoint
        console.log("Quote request submitted:", formData);
        alert("Thank you! Your quote request has been submitted. We'll be in touch within 24 hours.");
    };

    return (
        <section className="py-16 md:py-24 bg-white overflow-hidden">
            <div className="px-[5%] md:px-[3%]">
                <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
                    <div className="w-full lg:w-[45%] flex flex-col">
                        <SectionHeader
                            subtitle={data.subtitle}
                            title={data.title}
                            description={data.description}
                            align="left"
                            subtitleClass="text-xl md:text-[1.6rem] font-normal tracking-tight text-gray-900"
                            titleClass="text-[3.125rem] lg:text-[4.5rem] font-normal text-[#63B846] tracking-tight leading-tight"
                            className="mb-8 lg:-space-y-4"
                            descClass="text-gray-500 mb-8 leading-[1.2]"
                        />

                        <div className="relative w-full max-w-lg">
                            <Image
                                src={data.image}
                                alt="Solar powered city illustration"
                                className="w-full h-auto object-contain"
                                priority
                                width={600}
                                height={400}
                            />
                        </div>
                    </div>

                    {/* ── Right Column: Form ── */}
                    <div className="w-full lg:w-[55%]">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="bg-[#63B8461A] rounded-2xl p-6 md:p-10"
                        >
                            {/* Contact Information */}
                            <h3 className="text-xl md:text-2xl font-normal text-black mb-6">
                                Contact Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-8">
                                {/* Full Name */}
                                <div className="flex flex-col">
                                    <input
                                        {...register("fullName")}
                                        type="text"
                                        placeholder="Your Full Name"
                                        className="bg-transparent border-b border-gray-300 focus:border-[#63B846] outline-none py-2.5 text-sm md:text-base text-gray-900 placeholder:text-gray-400 transition-colors duration-200"
                                    />
                                    {errors.fullName && (
                                        <span className="text-red-500 text-xs mt-1">
                                            {errors.fullName.message}
                                        </span>
                                    )}
                                </div>

                                {/* Contact Number */}
                                <div className="flex flex-col">
                                    <input
                                        {...register("contactNumber")}
                                        type="tel"
                                        placeholder="Your Contact Number"
                                        className="bg-transparent border-b border-gray-300 focus:border-[#63B846] outline-none py-2.5 text-sm md:text-base text-gray-900 placeholder:text-gray-400 transition-colors duration-200"
                                    />
                                    {errors.contactNumber && (
                                        <span className="text-red-500 text-xs mt-1">
                                            {errors.contactNumber.message}
                                        </span>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="flex flex-col">
                                    <input
                                        {...register("email")}
                                        type="email"
                                        placeholder="Your Email Address"
                                        className="bg-transparent border-b border-gray-300 focus:border-[#63B846] outline-none py-2.5 text-sm md:text-base text-gray-900 placeholder:text-gray-400 transition-colors duration-200"
                                    />
                                    {errors.email && (
                                        <span className="text-red-500 text-xs mt-1">
                                            {errors.email.message}
                                        </span>
                                    )}
                                </div>

                                {/* Address */}
                                <div className="flex flex-col">
                                    <input
                                        {...register("address")}
                                        type="text"
                                        placeholder="Enter Your Full Address"
                                        className="bg-transparent border-b border-gray-300 focus:border-[#63B846] outline-none py-2.5 text-sm md:text-base text-gray-900 placeholder:text-gray-400 transition-colors duration-200"
                                    />
                                    {errors.address && (
                                        <span className="text-red-500 text-xs mt-1">
                                            {errors.address.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Current Electricity Bill */}
                            <h3 className="text-xl md:text-2xl font-normal text-gray-900 mb-4">
                                Current Electricity Bill
                            </h3>
                            <div className="grid grid-cols-2 gap-3 mb-8">
                                {(
                                    [
                                        { value: "<200", label: "< $200" },
                                        { value: "400-600", label: "$400 – $600" },
                                        { value: "200-400", label: "$200 – $400" },
                                        { value: "600+", label: "$600+" },
                                    ] as const
                                ).map((opt) => (
                                    <RadioOption
                                        key={opt.value}
                                        id={`bill-${opt.value}`}
                                        name="electricityBill"
                                        value={opt.value}
                                        label={opt.label}
                                        checked={electricityBill === opt.value}
                                        onChange={() => setValue("electricityBill", opt.value)}
                                    />
                                ))}
                            </div>
                            {errors.electricityBill && (
                                <span className="text-red-500 text-xs -mt-6 block mb-6">
                                    {errors.electricityBill.message}
                                </span>
                            )}

                            {/* Type Of Enquiry + Preferred Contact Time */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div>
                                    <h3 className="text-xl md:text-2xl font-normal text-gray-900 mb-4">
                                        Type Of Enquiry
                                    </h3>
                                    <div className="flex flex-col gap-3">
                                        {(
                                            [
                                                { value: "solar-battery", label: "Solar + Battery" },
                                                { value: "battery-only", label: "Battery Only" },
                                                {
                                                    value: "commercial-solar",
                                                    label: "Commercial Solar",
                                                },
                                                {
                                                    value: "ev-charger",
                                                    label: "EV Charger Installation",
                                                },
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
                                        <span className="text-red-500 text-xs mt-1">
                                            {errors.enquiryType.message}
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <h3 className="text-xl md:text-2xl font-normal text-gray-900 mb-4">
                                        Preferred Contact Time
                                    </h3>
                                    <div className="flex flex-col gap-3">
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
                                        <span className="text-red-500 text-xs mt-1">
                                            {errors.contactTime.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Message (Optional) */}
                            <h3 className="text-xl md:text-2xl font-normal text-gray-900 mb-4">
                                Message (Optional)
                            </h3>
                            <div className="mb-8">
                                <textarea
                                    {...register("message")}
                                    rows={3}
                                    placeholder="Tell Us About Your Property, Energy Goals, Or Any Specific Requirements."
                                    className="w-full bg-transparent border-b border-gray-300 focus:border-[#63B846] outline-none py-2.5 text-sm md:text-base text-gray-900 placeholder:text-gray-400 transition-colors duration-200 resize-none"
                                />
                                {errors.message && (
                                    <span className="text-red-500 text-xs mt-1">
                                        {errors.message.message}
                                    </span>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group inline-flex items-center gap-3 bg-white text-black px-6 py-2.5 rounded-full text-sm md:text-base font-medium hover:bg-gray-900 transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Submitting..." : "Request My Free Quote"}
                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#A0CF44] group-hover:translate-x-1 transition-transform duration-300">
                                    <ArrowRight className="w-5 h-5 text-white" />
                                </span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BatteryQuote;