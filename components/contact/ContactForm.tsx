'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';

const contactSchema = z.object({
    fullName: z.string().min(2, 'Name must be at least 2 characters').max(80, 'Name is too long'),
    phone: z.string().min(8, 'Enter a valid contact number').max(15, 'Contact number is too long'),
    email: z.string().email('Enter a valid email address'),
    suburb: z.string().min(2, 'Enter your suburb or postcode').max(80, 'Suburb is too long'),
    address: z.string().min(5, 'Enter your full installation address').max(200, 'Address is too long'),
    message: z.string().max(500, 'Message is too long').optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export interface ContactFormProps {
    subtitle?: string;
    title?: string;
    description?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
    subtitle = 'Get In',
    title = 'Touch',
    description = 'Off-Grid Projects Are Engineering Jobs. The First Conversation Is Technical, Not Transactional — Load Profile, Site Context, Generator History, Growth Plans, Water Needs If Any. Once We Understand The Problem, We Come Back With A System.',
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            fullName: '',
            phone: '',
            email: '',
            suburb: '',
            address: '',
            message: '',
        },
    });

    const onSubmit = async (data: ContactFormData) => {
        console.log('Contact submission:', data);
        alert('Thank you! Your enquiry has been submitted. Our team will be in touch shortly.');
    };

    const inputClass =
        'w-full bg-transparent border-b border-black/30 py-2.5 text-sm text-black placeholder-black/70 focus:outline-none focus:border-[#63B846] transition-colors';
    const errorClass = 'text-red-600 text-xs mt-1';

    return (
        <section className="w-full px-[3%] py-12 md:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 max-w-7xl mx-auto items-start">
                <div>
                    <p className="text-2xl md:text-3xl font-light tracking-tight text-black mb-1">
                        {subtitle}
                    </p>
                    <h2 className="text-5xl md:text-6xl lg:text-7xl text-[#63B846] font-normal tracking-tighter leading-none mb-6">
                        {title}
                    </h2>
                    <p className="text-sm md:text-base text-black/85 leading-snug tracking-tight max-w-md">
                        {description}
                    </p>
                </div>

                <div className="bg-[#D5E5C0] rounded-2xl p-6 md:p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <h3 className="text-lg md:text-xl text-black font-normal tracking-tight mb-4">
                                Contact Information
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                                <div className="flex flex-col">
                                    <input
                                        {...register('fullName')}
                                        type="text"
                                        placeholder="Your Full Name"
                                        className={inputClass}
                                    />
                                    {errors.fullName && <span className={errorClass}>{errors.fullName.message}</span>}
                                </div>
                                <div className="flex flex-col">
                                    <input
                                        {...register('phone')}
                                        type="tel"
                                        placeholder="Your Contact Number"
                                        className={inputClass}
                                    />
                                    {errors.phone && <span className={errorClass}>{errors.phone.message}</span>}
                                </div>
                                <div className="flex flex-col">
                                    <input
                                        {...register('email')}
                                        type="email"
                                        placeholder="Your Email Address"
                                        className={inputClass}
                                    />
                                    {errors.email && <span className={errorClass}>{errors.email.message}</span>}
                                </div>
                                <div className="flex flex-col">
                                    <input
                                        {...register('suburb')}
                                        type="text"
                                        placeholder="Your Suburb Or Postcode"
                                        className={inputClass}
                                    />
                                    {errors.suburb && <span className={errorClass}>{errors.suburb.message}</span>}
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg md:text-xl text-black font-normal tracking-tight mb-3">
                                Installation Address
                            </h3>
                            <input
                                {...register('address')}
                                type="text"
                                placeholder="Type Your Address Here..."
                                className={inputClass}
                            />
                            {errors.address && <span className={errorClass}>{errors.address.message}</span>}
                        </div>

                        <div>
                            <h3 className="text-lg md:text-xl text-black font-normal tracking-tight mb-3">
                                Your Message
                            </h3>
                            <textarea
                                {...register('message')}
                                rows={2}
                                placeholder="Type Your Message Here..."
                                className={`${inputClass} resize-none`}
                            />
                            {errors.message && <span className={errorClass}>{errors.message.message}</span>}
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group inline-flex items-center gap-3 bg-white text-black border border-black/10 pl-5 pr-1.5 py-1.5 rounded-full text-sm md:text-base font-medium hover:text-white hover:bg-gray-900 transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                <span className="whitespace-nowrap">
                                    {isSubmitting ? 'Submitting...' : 'Request Your Free Quote'}
                                </span>
                                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#A0CF44] group-hover:translate-x-1 transition-transform duration-300">
                                    <ArrowRight className="w-4 h-4 text-white" strokeWidth={2.5} />
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
