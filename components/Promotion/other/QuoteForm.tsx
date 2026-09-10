'use client';

import React from 'react';
import Fade from '@/reuseables/fade';
import HubspotForm from '@/reuseables/HubspotForm';

export interface QuoteFormProps {
  title?: string;
  noticeText?: string;
  buttonText?: string;
  noticehighlight?: string;
  formId?: string;
}

// Default form (used when no formId override is passed).
const DEFAULT_HUBSPOT_FORM_ID = '5ca75069-69da-4015-b63c-2fff558ff814';

const QuoteForm = ({
  title = "Get A Quote",
  noticeText = "Due to the current high demand for batteries, we are unable to accept bookings for Solar-Only installations at this time.",
  noticehighlight = "Bookings will only be accepted for Solar + Battery or Battery-Only installations.",
  formId,
}: QuoteFormProps) => {

  return (
    <section className="bg-white py-10 md:py-24 px-4 md:px-[5%] md:px-[3%] w-full">
      <Fade duration={5}>
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-black text-[#63B846] tracking-tight leading-tight">
              {title}
            </h2>

            {/* Notice block */}
            {noticeText && (
              <div className="md:mt-6 mt-4  text-left max-w-2xl mx-auto ">
                <p className="text-xl md:text-2xl text-center font-medium leading-[1.2]">
                  {noticeText}
                </p>
                <p className="text-xl md:text-2xl text-center font-bold leading-[1.2]">
                  {noticehighlight}
                </p>
              </div>
            )}
          </div>

          {/* HubSpot Form */}
          <div className="p-6 md:p-10">
            <HubspotForm
              formId={formId || DEFAULT_HUBSPOT_FORM_ID}
              targetId="hubspot-quote-form-mobile"
            />
          </div>
        </div>
      </Fade>
    </section>
  );
};

export default QuoteForm;
