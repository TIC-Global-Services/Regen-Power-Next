'use client';

import Script from 'next/script';

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

export interface HubspotFormProps {
  formId: string;
  portalId?: string;
  region?: string;
  targetId: string;
  className?: string;
}

export default function HubspotForm({
  formId,
  portalId = DEFAULT_PORTAL_ID,
  region = DEFAULT_REGION,
  targetId,
  className,
}: HubspotFormProps) {
  const createForm = () => {
    if (window.hbspt) {
      window.hbspt.forms.create({ portalId, formId, region, target: `#${targetId}` });
    }
  };

  return (
    <div className={className}>
      <div id={targetId} />
      <Script
        src="https://js.hsforms.net/forms/embed/v2.js"
        strategy="afterInteractive"
        onLoad={createForm}
        onReady={createForm}
      />
    </div>
  );
}
