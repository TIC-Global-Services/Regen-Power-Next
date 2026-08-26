"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/reuseables/SectionHeader";

import defaultQuoteImg from "@/assets/solar/batteryquote.png";

/* ────────────────────────────────────────────────────────────────────────
 * QuoteSection — the one reusable "Get your free quote" section.
 *
 * Merges the former duplicates:
 *   • components/home/batteryQuote.tsx            → variant="classic"
 *   • components/solar/solarSystem/LeadCaptureForm.tsx → variant="solar"
 *
 * Variant presets reproduce each original design pixel-for-pixel; the
 * media/tone knobs allow mixing (e.g. classic look with a video).
 * ──────────────────────────────────────────────────────────────────────── */

export type QuoteFormData = {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    billTier: "<200" | "200-400" | "400-600" | "600+";
    enquiryType: "solar-battery" | "battery-only" | "commercial-solar" | "ev-charger";
    contactTime: "morning" | "afternoon" | "evening";
    message?: string;
};

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

const BILL_TIER_OPTIONS = [
    { value: "<200", label: "< $200" },
    { value: "200-400", label: "$200 – $400" },
    { value: "400-600", label: "$400 – $600" },
    { value: "600+", label: "$600+" },
] as const;

const ENQUIRY_OPTIONS = [
    { value: "solar-battery", label: "Solar + Battery" },
    { value: "battery-only", label: "Battery Only" },
    { value: "commercial-solar", label: "Commercial Solar" },
    { value: "ev-charger", label: "EV Charger Installation" },
] as const;

const CONTACT_TIME_OPTIONS = [
    { value: "morning", label: "Morning" },
    { value: "afternoon", label: "Afternoon" },
    { value: "evening", label: "Evening" },
] as const;

export interface QuoteSectionProps {
    /* Content */
    subtitle?: string;
    title?: string;
    description?: string;

    /* Media */
    image?: string | StaticImageData | null;
    /** Looping video — replaces the image when provided. */
    video?: string;
    imageAlt?: string;
    /** Square framed tile ("solar" look) or free-aspect image ("classic" look).
     *  Defaults follow `variant`. */
    mediaLayout?: "tile" | "natural";
    /** Center the media horizontally below lg. Default true. */
    centerMedia?: boolean;

    /* Look */
    /** Preset bundle reproducing one of the original designs. Default "solar". */
    variant?: "solar" | "classic";
    /** Form card skin. Defaults follow `variant`. */
    tone?: "mint" | "lime";

    /* Behavior */
    /** Defaults to console.log + thank-you alert (previous placeholder behavior). */
    onSubmit?: (data: QuoteFormData) => void | Promise<void>;
    /** Rendered on the <section> (e.g. "quote-form" anchor target). */
    id?: string;
    className?: string;
}

/* ── Radio Option ── */
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

/* ── Input field ── */
interface FieldProps {
    name: "fullName" | "phone" | "email" | "address";
    placeholder: string;
    type?: string;
    register: ReturnType<typeof useForm<QuoteFormData>>["register"];
    error?: string;
    inputClass: string;
}

const TextField: React.FC<FieldProps> = ({
    name,
    placeholder,
    type = "text",
    register,
    error,
    inputClass,
}) => (
    <div className="flex flex-col">
        <input
            {...register(name)}
            type={type}
            placeholder={placeholder}
            className={inputClass}
        />
        {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
);

const QuoteSection: React.FC<QuoteSectionProps> = ({
    subtitle = "Get Your Free Solar &",
    title = "Battery Quote",
    description = "Our Technical Sales Team Will Design A System Tailored To Your Home, Usage, And Budget. Most Quotes Delivered Within 24 Hours.",
    image = defaultQuoteImg,
    video,
    imageAlt = "Intake Graphic",
    mediaLayout,
    centerMedia = true,
    variant = "solar",
    tone,
    onSubmit,
    id,
    className = "",
}) => {
    const isSolar = variant === "solar";
    const layout = mediaLayout ?? (isSolar ? "tile" : "natural");
    const panelTone = tone ?? (isSolar ? "mint" : "lime");
    const img = image ?? defaultQuoteImg;
    const mediaCenter = centerMedia ? "mx-auto" : "";

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

    const handleSubmitQuote =
        onSubmit ??
        (async (data: QuoteFormData) => {
            // Placeholder until wired to a real endpoint.
            console.log("Quote request submitted:", data);
            alert("Thank you! Your quote request has been submitted. We'll be in touch within 24 hours.");
        });

    /* ── Style bundles (variant-dependent) ── */

    const sectionShell = isSolar
        ? "py-16 md:py-24 bg-white border-t border-gray-50"
        : "py-16 md:py-24 bg-white overflow-hidden";

    const leftColClass = isSolar
        ? "lg:col-span-5 flex flex-col justify-center h-full"
        : "w-full lg:w-[45%] flex flex-col";

    const rightColClass = isSolar ? "lg:col-span-7" : "w-full lg:w-[55%]";

    const headerProps = isSolar
        ? {
              align: "left" as const,
              descClass: "mb-8",
          }
        : {
              align: "left" as const,
              subtitleClass:
                  "text-xl md:text-[1.6rem] font-normal tracking-tight text-gray-900",
              titleClass:
                  "text-[3.125rem] lg:text-[4.5rem] font-normal text-[#63B846] tracking-tight leading-tight",
              className: "mb-8 lg:-space-y-4",
              descClass: "text-gray-500 mb-8 leading-[1.2]",
          };

    const inputClass = isSolar
        ? "w-full bg-transparent border-b border-gray-300 py-2.5 text-sm text-black placeholder-gray-500 focus:outline-none focus:border-[#63B846] transition-colors"
        : "bg-transparent border-b border-gray-300 focus:border-[#63B846] outline-none py-2.5 text-sm md:text-base text-gray-900 placeholder:text-gray-400 transition-colors duration-200";

    const contactInfoHeading = isSolar
        ? "text-gray-800 font-semibold text-lg mb-4 font-[var(--font-aeonik)]"
        : "text-xl md:text-2xl font-normal text-black mb-6";

    const groupHeading = isSolar
        ? "text-gray-800 font-semibold text-sm uppercase tracking-wider mb-3 font-[var(--font-aeonik)]"
        : "text-xl md:text-2xl font-normal text-gray-900 mb-4";

    const contactGrid = isSolar
        ? "grid grid-cols-1 sm:grid-cols-2 gap-4"
        : "grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-8";

    const groupSpacing = isSolar ? "" : "mb-8";
    const formInner = isSolar ? "space-y-6" : "";

    const panelClass =
        panelTone === "mint"
            ? "bg-[#EEF6EB] rounded-[32px] p-6 md:p-10 shadow-sm border border-[#63B846]/10"
            : "bg-[#63B8461A] rounded-2xl p-6 md:p-10";

    const enquiryTimeRadios = isSolar ? "grid grid-cols-2 gap-3" : "flex flex-col gap-3";

    return (
        <section id={id} className={`${sectionShell} ${className}`}>
            <div className="px-[5%] md:px-[3%]">
                <div
                    className={
                        isSolar
                            ? "grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
                            : "flex flex-col lg:flex-row items-start gap-10 lg:gap-16"
                    }
                >
                    {/* Left column: header + media */}
                    <div className={leftColClass}>
                        <SectionHeader
                            subtitle={subtitle}
                            title={title}
                            description={description}
                            {...headerProps}
                        />

                        {layout === "tile" ? (
                            <div
                                className={`relative w-full aspect-square max-w-[360px] ${mediaCenter} rounded-2xl overflow-hidden flex items-center justify-center`}
                            >
                                {video ? (
                                    <video
                                        src={video}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                    />
                                ) : (
                                    <Image
                                        src={img}
                                        alt={imageAlt}
                                        fill
                                        className="object-contain p-2"
                                        placeholder={
                                            typeof img === "object" ? "blur" : undefined
                                        }
                                    />
                                )}
                            </div>
                        ) : (
                            <div className={`relative w-full max-w-lg ${mediaCenter}`}>
                                {video ? (
                                    <div className="relative w-full aspect-[3/2] overflow-hidden rounded-2xl">
                                        <video
                                            src={video}
                                            className="absolute inset-0 w-full h-full object-cover"
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                        />
                                    </div>
                                ) : (
                                    <Image
                                        src={img}
                                        alt={imageAlt}
                                        className="w-full h-auto object-contain"
                                        width={600}
                                        height={400}
                                        preload
                                    />
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right column: form */}
                    <div className={rightColClass}>
                        {isSolar ? (
                            <div className={panelClass}>
                                <form
                                    onSubmit={handleSubmit(handleSubmitQuote)}
                                    className={formInner}
                                >
                                    <FormFields
                                        {...{
                                            register,
                                            errors,
                                            isSubmitting,
                                            watch,
                                            setValue,
                                            inputClass,
                                            contactInfoHeading,
                                            groupHeading,
                                            contactGrid,
                                            groupSpacing,
                                            enquiryTimeRadios,
                                            billTier,
                                            enquiryType,
                                            contactTime,
                                            stacked: isSolar,
                                        }}
                                    />
                                </form>
                            </div>
                        ) : (
                            <form
                                onSubmit={handleSubmit(handleSubmitQuote)}
                                className={`${panelClass} ${formInner}`}
                            >
                                <FormFields
                                    {...{
                                        register,
                                        errors,
                                        isSubmitting,
                                        watch,
                                        setValue,
                                        inputClass,
                                        contactInfoHeading,
                                        groupHeading,
                                        contactGrid,
                                        groupSpacing,
                                        enquiryTimeRadios,
                                        billTier,
                                        enquiryType,
                                        contactTime,
                                        stacked: isSolar,
                                    }}
                                />
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

/* ── Shared form body (identical fields for both variants) ── */

interface FormFieldsProps {
    register: ReturnType<typeof useForm<QuoteFormData>>["register"];
    errors: ReturnType<typeof useForm<QuoteFormData>>["formState"]["errors"];
    isSubmitting: boolean;
    watch: ReturnType<typeof useForm<QuoteFormData>>["watch"];
    setValue: ReturnType<typeof useForm<QuoteFormData>>["setValue"];
    inputClass: string;
    contactInfoHeading: string;
    groupHeading: string;
    contactGrid: string;
    groupSpacing: string;
    enquiryTimeRadios: string;
    billTier: string;
    enquiryType: string;
    contactTime: string;
    /** solar: enquiry + contact time are separate stacked groups */
    stacked: boolean;
}

const FormFields: React.FC<FormFieldsProps> = ({
    register,
    errors,
    isSubmitting,
    setValue,
    inputClass,
    contactInfoHeading,
    groupHeading,
    contactGrid,
    groupSpacing,
    enquiryTimeRadios,
    billTier,
    enquiryType,
    contactTime,
    stacked,
}) => {
    const enquiryGroup = (
        <div>
            <h3 className={groupHeading}>Type Of Enquiry</h3>
            <div className={enquiryTimeRadios}>
                {ENQUIRY_OPTIONS.map((opt) => (
                    <RadioOption
                        key={opt.value}
                        id={`enquiry-${opt.value}`}
                        name="enquiryType"
                        value={opt.value}
                        label={opt.label}
                        checked={enquiryType === opt.value}
                        onChange={() =>
                            setValue(
                                "enquiryType",
                                opt.value as QuoteFormData["enquiryType"]
                            )
                        }
                    />
                ))}
            </div>
            {errors.enquiryType && (
                <span className="text-red-500 text-xs mt-1">
                    {errors.enquiryType.message}
                </span>
            )}
        </div>
    );

    const timeGroup = (
        <div>
            <h3 className={groupHeading}>Preferred Contact Time</h3>
            <div className={enquiryTimeRadios}>
                {CONTACT_TIME_OPTIONS.map((opt) => (
                    <RadioOption
                        key={opt.value}
                        id={`time-${opt.value}`}
                        name="contactTime"
                        value={opt.value}
                        label={opt.label}
                        checked={contactTime === opt.value}
                        onChange={() =>
                            setValue(
                                "contactTime",
                                opt.value as QuoteFormData["contactTime"]
                            )
                        }
                    />
                ))}
            </div>
            {errors.contactTime && (
                <span className="text-red-500 text-xs mt-1">
                    {errors.contactTime.message}
                </span>
            )}
        </div>
    );

    return (
        <>
            {/* Contact Information */}
            <div className={groupSpacing}>
                <h3 className={contactInfoHeading}>Contact Information</h3>
                <div className={contactGrid}>
                    <TextField
                        name="fullName"
                        placeholder="Your Full Name"
                        register={register}
                        error={errors.fullName?.message}
                        inputClass={inputClass}
                    />
                    <TextField
                        name="phone"
                        type="tel"
                        placeholder="Your Contact Number"
                        register={register}
                        error={errors.phone?.message}
                        inputClass={inputClass}
                    />
                    <TextField
                        name="email"
                        type="email"
                        placeholder="Your Email Address"
                        register={register}
                        error={errors.email?.message}
                        inputClass={inputClass}
                    />
                    <TextField
                        name="address"
                        placeholder="Enter Your Full Address"
                        register={register}
                        error={errors.address?.message}
                        inputClass={inputClass}
                    />
                </div>
            </div>

            {/* Current Electricity Bill */}
            <div className={groupSpacing}>
                <h3 className={groupHeading}>Current Electricity Bill</h3>
                <div className={stacked ? "grid grid-cols-2 gap-3" : "grid grid-cols-2 gap-3 mb-8"}>
                    {BILL_TIER_OPTIONS.map((opt) => (
                        <RadioOption
                            key={opt.value}
                            id={`bill-${opt.value}`}
                            name="billTier"
                            value={opt.value}
                            label={opt.label}
                            checked={billTier === opt.value}
                            onChange={() =>
                                setValue("billTier", opt.value as QuoteFormData["billTier"])
                            }
                        />
                    ))}
                </div>
                {errors.billTier && (
                    <span
                        className={
                            stacked
                                ? "text-red-500 text-xs mt-1"
                                : "text-red-500 text-xs -mt-6 block mb-6"
                        }
                    >
                        {errors.billTier.message}
                    </span>
                )}
            </div>

            {/* Type Of Enquiry + Preferred Contact Time */}
            {stacked ? (
                <>
                    {enquiryGroup}
                    {timeGroup}
                </>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {enquiryGroup}
                    {timeGroup}
                </div>
            )}

            {/* Message (Optional) */}
            <div className={groupSpacing}>
                <h3 className={groupHeading}>Message (Optional)</h3>
                <textarea
                    {...register("message")}
                    rows={3}
                    placeholder="Tell Us About Your Property, Energy Goals, Or Any Specific Requirements."
                    className={`${inputClass} w-full resize-none`}
                />
                {errors.message && (
                    <span className="text-red-500 text-xs mt-1">
                        {errors.message.message}
                    </span>
                )}
            </div>

            {/* Submit */}
            <div className={stacked ? "pt-2" : ""}>
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
        </>
    );
};

export default QuoteSection;
