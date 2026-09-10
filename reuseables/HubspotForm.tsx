'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { CheckCircle2 } from 'lucide-react';

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (options: {
          portalId: string;
          formId: string;
          region: string;
          target: string;
        }) => void;
      };
    };
  }
}

const DEFAULT_PORTAL_ID = '22716041';
const DEFAULT_REGION = 'na1';

// How long the "thank you" state stays up before the form resets and shows again.
const RESET_DELAY_MS = 5000;

export interface HubspotFormProps {
  formId: string;
  portalId?: string;
  region?: string;
  targetId: string;
  className?: string;
  /** Reserves vertical space so the card doesn't collapse when HubSpot swaps the form for its "thank you" message. */
  minHeight?: number | string;
}

export default function HubspotForm({
  formId,
  portalId = DEFAULT_PORTAL_ID,
  region = DEFAULT_REGION,
  targetId,
  className,
  minHeight = 420,
}: HubspotFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const createForm = () => {
    if (window.hbspt) {
      const target = document.getElementById(targetId);
      if (target) target.innerHTML = '';
      window.hbspt.forms.create({ portalId, formId, region, target: `#${targetId}` });
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const data = event.data;
      if (
        data?.type === 'hsFormCallback' &&
        data?.eventName === 'onFormSubmitted' &&
        data?.id === formId
      ) {
        setSubmitted(true);
        resetTimer.current = setTimeout(() => {
          setSubmitted(false);
          createForm();
        }, RESET_DELAY_MS);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formId, targetId]);

  const style = { minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight };

  return (
    <div className={className}>
      <div className="relative">
        <div id={targetId} style={style} className={submitted ? 'invisible' : undefined} />
        {submitted && (
          <div
            style={style}
            className="absolute inset-0 flex flex-col items-center justify-center text-center gap-3 px-6"
          >
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#63B846]/10">
              <CheckCircle2 size={36} className="text-[#63B846]" />
            </span>
            <p className="text-lg md:text-xl font-bold text-black">Thank you!</p>
            <p className="text-sm md:text-base text-gray-600">
              Your enquiry has been received. Our team will be in touch shortly.
            </p>
          </div>
        )}
      </div>
      <Script
        src="https://js.hsforms.net/forms/embed/v2.js"
        strategy="afterInteractive"
        onLoad={createForm}
        onReady={createForm}
      />
    </div>
  );
}
