import React from 'react';
import { getContactPage } from '@/lib/strapi';
import { findSection } from '@/lib/strapi/section-utils';
import { resolveContactHero, resolveContactFormSection } from '@/lib/strapi/resolvers';
import type { ContactFormSectionData, ContactHeroData } from '@/lib/strapi/schemas';

import ContactHero from '@/components/contact/ContactHero';
import ContactForm from '@/components/contact/ContactForm';
import LocationMap from '@/components/contact/LocationMap';

export const revalidate = 60;

const ContactPage = async () => {
  const { data } = await getContactPage();
  const sections = data.sections ?? [];

  const hero = findSection<ContactHeroData>(sections, 'contact.hero');
  const heroProps = resolveContactHero(hero);
  const formSection = findSection<ContactFormSectionData>(sections, 'contact.contact-form-section');
  const formSectionProps = resolveContactFormSection(formSection);

  return (
    <div className="bg-white min-h-screen text-black">
      {heroProps && (
        <ContactHero
          subtitle={heroProps.subtitle}
          mainTitle={heroProps.mainTitle}
          description={heroProps.description}
          ctaText={heroProps.ctaText}
          ctaLink={heroProps.ctaLink}
          backgroundImage={heroProps.backgroundImage}
        />
      )}

      <ContactForm
        title={formSectionProps?.title}
        description={formSectionProps?.description}
      />

      <LocationMap />
    </div>
  );
};

export default ContactPage;
