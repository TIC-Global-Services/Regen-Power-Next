import React from 'react';
import ContactForm from '@/components/contact/ContactForm';

interface QuoteFormSectionProps {
  subtitle?: string;
  title?: string;
  description?: string;
}

/**
 * Site-wide quote form section.
 *
 * Owns the #quote-form anchor that every "Get a Free Quote" CTA targets
 * (the inner #quote span is a legacy alias still used by some hero CTAs).
 * Render it directly ABOVE the page's closing CTA banner — or at the end
 * of pages that have no CTA banner — so the button scrolls up to the form.
 *
 * Header props are CMS-driven on pages that wire them (e.g. the contact
 * page's `contact.quote-form` section); other pages fall back to defaults.
 */
const QuoteFormSection: React.FC<QuoteFormSectionProps> = (props) => (
  <div id="quote-form" className="scroll-mt-24">
    <span id="quote" aria-hidden="true" className="scroll-mt-24" />
    <ContactForm {...props} />
  </div>
);

export default QuoteFormSection;
