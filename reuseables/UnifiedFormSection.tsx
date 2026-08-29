"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/reuseables/SectionHeader";
import type { ResolvedSharedFormSection } from "@/lib/strapi/resolvers/shared";

type Props = {
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  image?: string | StaticImageData | null;
  video?: string | null;
  hubspotSrc?: string | null;
  resolved?: ResolvedSharedFormSection | null;
  id?: string;
  className?: string;
};

const placeholderSchema = z.object({
  fullName: z.string().min(2).max(80),
  phone: z.string().min(8).max(20),
  email: z.string().email(),
  message: z.string().max(500).optional(),
});
type PlaceholderData = z.infer<typeof placeholderSchema>;

export default function UnifiedFormSection({
  title, subtitle, description, image, video, hubspotSrc, resolved, id = "quote-form", className = "",
}: Props) {
  const t = resolved?.title ?? title ?? "";
  const sub = resolved?.subtitle ?? subtitle ?? "";
  const desc = resolved?.description ?? description ?? "";
  const resolvedImage = resolved?.imageSrc ?? (typeof image === "string" ? image : null);
  const staticImage = typeof image === "object" ? image : null;
  const resolvedVideo = resolved?.videoSrc ?? video ?? null;
  // HubSpot priority: hubspotSrc prop → NEXT_PUBLIC_HUBSPOT_IFRAME_SRC env → placeholder form.
  const envHubspot = process.env.NEXT_PUBLIC_HUBSPOT_IFRAME_SRC?.trim() || null;
  const activeHubspot = (hubspotSrc?.trim() || null) ?? envHubspot;

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<PlaceholderData>({
    resolver: zodResolver(placeholderSchema),
    defaultValues: { fullName: "", phone: "", email: "", message: "" },
  });
  const onSubmit = async (data: PlaceholderData) => {
    console.log("UnifiedFormSection submission:", data);
    alert("Thank you! Your enquiry has been submitted.");
  };

  const inputClass =
    "w-full bg-transparent border-b border-gray-300 py-2.5 text-sm text-black placeholder-gray-500 focus:outline-none focus:border-[#63B846] transition-colors";

  return (
    <section id={id} className={`py-16 md:py-24 bg-white border-t border-gray-50 scroll-mt-24 ${className}`}>
      <span id="quote" aria-hidden="true" className="scroll-mt-24" />
      <div className="px-[5%] md:px-[3%]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: header + media */}
          <div className="lg:col-span-5 flex flex-col">
            <SectionHeader subtitle={sub} title={t} description={desc} align="left" subtitleClass="text-[2.125rem] leading-tight tracking-tight" />
            {(resolvedVideo || resolvedImage || staticImage) && (
              <div className="relative w-full aspect-square max-w-[420px] mt-8 rounded-2xl overflow-hidden bg-gray-50">
                {resolvedVideo ? (
                  <video src={resolvedVideo} className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline />
                ) : staticImage ? (
                  <Image src={staticImage} alt={t || "Form illustration"} fill className="object-contain p-2" />
                ) : resolvedImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={resolvedImage} alt={t || "Form illustration"} className="w-full h-full object-contain p-2" />
                ) : null}
              </div>
            )}
          </div>

          {/* Right: FORM card */}
          <div className="lg:col-span-7">
            <div className="bg-[#EEF6EB] rounded-[32px] p-6 md:p-10 shadow-sm border border-[#63B846]/10">
              {activeHubspot ? (
                <iframe
                  title="Contact form"
                  src={activeHubspot}
                  loading="lazy"
                  className="w-full min-h-[520px] rounded-2xl border-0 bg-white"
                />
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <h3 className="text-gray-800 font-semibold text-lg mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <input {...register("fullName")} placeholder="Your Full Name" className={inputClass} />
                      {errors.fullName && <span className="text-red-500 text-xs mt-1">{errors.fullName.message}</span>}
                    </div>
                    <div className="flex flex-col">
                      <input {...register("phone")} type="tel" placeholder="Your Contact Number" className={inputClass} />
                      {errors.phone && <span className="text-red-500 text-xs mt-1">{errors.phone.message}</span>}
                    </div>
                    <div className="flex flex-col">
                      <input {...register("email")} type="email" placeholder="Your Email Address" className={inputClass} />
                      {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
                    </div>
                    <div className="flex flex-col">
                      <textarea {...register("message")} rows={2} placeholder="Your Message" className={`${inputClass} resize-none`} />
                      {errors.message && <span className="text-red-500 text-xs mt-1">{errors.message.message}</span>}
                    </div>
                  </div>
                  <button type="submit" disabled={isSubmitting} className="group inline-flex items-center gap-3 bg-white text-black px-6 py-2.5 rounded-full text-sm md:text-base font-medium hover:text-white hover:bg-gray-900 transition-all">
                    {isSubmitting ? "Submitting..." : "Request Your Free Quote"}
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#A0CF44] group-hover:translate-x-1 transition-transform"><ArrowRight className="w-5 h-5 text-white" /></span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}