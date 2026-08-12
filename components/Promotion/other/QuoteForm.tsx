'use client';

import React, { useState } from 'react';
import Fade from '@/reuseables/fade';
import CtaButton from '@/reuseables/CtaButton';
import { ArrowRight, Sparkles } from 'lucide-react';

export interface QuoteFormProps {
  title?: string;
  titleGreen?: string;
  noticeText?: string;
  buttonText?: string;
  onSubmitSuccess?: (data: any) => void;
}

const QuoteForm = ({
  title = "Get",
  titleGreen = "A Quote",
  noticeText = "Due to the current high demand for batteries, we are unable to accept bookings for Solar-Only installations at this time. Bookings will only be accepted for Solar + Battery or Battery-Only installations.",
  buttonText = "Get Free Estimate",
  onSubmitSuccess,
}: QuoteFormProps) => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setSuccess(true);
    
    if (onSubmitSuccess) {
      onSubmitSuccess(formData);
    } else {
      alert(`Thank you ${formData.firstName}! Your request for a free estimate has been received. We will contact you shortly.`);
    }

    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      message: ''
    });
  };

  return (
    <section className="bg-white py-16 md:py-24 px-4 md:px-[5%] w-full">
      <Fade>
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-black text-black tracking-tight leading-tight">
              {title} <span className="text-[#63B846]">{titleGreen}</span>
            </h2>
            
            {/* Notice block */}
            {noticeText && (
              <div className="mt-6 bg-[#EEF6EB] border border-[#63B846]/20 rounded-[20px] p-6 text-left max-w-2xl mx-auto">
                <p className="text-sm md:text-base text-gray-700 font-medium leading-relaxed">
                  <span className="font-bold text-[#63B846] inline-flex items-center gap-1.5 mr-1">
                    <Sparkles size={16} /> Important Notice:
                  </span>{' '}
                  {noticeText}
                </p>
              </div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8 bg-[#fdfdfd] border border-gray-100 rounded-[28px] p-6 md:p-10 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* First Name */}
              <div className="flex flex-col border-b border-gray-200 focus-within:border-[#63B846] pb-2 transition-colors duration-300">
                <label className="text-gray-900 text-sm font-bold mb-1">First Name*</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="e.g. John"
                  className="w-full bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none py-1 text-sm md:text-base text-black"
                />
              </div>

              {/* Last Name */}
              <div className="flex flex-col border-b border-gray-200 focus-within:border-[#63B846] pb-2 transition-colors duration-300">
                <label className="text-gray-900 text-sm font-bold mb-1">Last Name*</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Smith"
                  className="w-full bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none py-1 text-sm md:text-base text-black"
                />
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Email */}
              <div className="flex flex-col border-b border-gray-200 focus-within:border-[#63B846] pb-2 transition-colors duration-300">
                <label className="text-gray-900 text-sm font-bold mb-1">Email*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="e.g. john@example.com"
                  className="w-full bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none py-1 text-sm md:text-base text-black"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col border-b border-gray-200 focus-within:border-[#63B846] pb-2 transition-colors duration-300">
                <label className="text-gray-900 text-sm font-bold mb-1">Phone Number*</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 0412 345 678"
                  className="w-full bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none py-1 text-sm md:text-base text-black"
                />
              </div>

            </div>

            {/* Address */}
            <div className="flex flex-col border-b border-gray-200 focus-within:border-[#63B846] pb-2 transition-colors duration-300">
              <label className="text-gray-900 text-sm font-bold mb-1">Installation Address*</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="e.g. 123 Sunshine Street, Perth"
                className="w-full bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none py-1 text-sm md:text-base text-black"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col border-b border-gray-200 focus-within:border-[#63B846] pb-2 transition-colors duration-300">
              <label className="text-gray-900 text-sm font-bold mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                placeholder="Tell us about your energy needs or specific roof details..."
                className="w-full bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none py-1 text-sm md:text-base text-black resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <CtaButton
                type="submit"
                text={isSubmitting ? "Submitting..." : buttonText}
                icon={ArrowRight}
                bgClass="bg-[#63B846] border-0"
                hoverClass="hover:bg-[#52a037] hover:scale-102"
                textColor="text-white font-bold"
                iconBgClass="bg-white/20"
                iconTextColor="text-white"
                className="py-3 px-8 shadow-md"
                disabled={isSubmitting}
              />
            </div>
          </form>
        </div>
      </Fade>
    </section>
  );
};

export default QuoteForm;
