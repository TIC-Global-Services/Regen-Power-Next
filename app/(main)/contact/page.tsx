import React from 'react';
import { getContactPage } from '@/lib/strapi';
import { findSection } from '@/lib/strapi/section-utils';
import { resolveContactHero, resolveSharedFormSection } from '@/lib/strapi/resolvers';
import type { ContactHeroData, SharedFormSectionData } from '@/lib/strapi/schemas';

import ContactHero from '@/components/contact/ContactHero';
import UnifiedFormSection from '@/reuseables/UnifiedFormSection';
import LocationMap from '@/components/contact/LocationMap';

export const revalidate = 60;

const ContactPage = async () => {
  const { data } = await getContactPage();
  const sections = data.sections ?? [];

  const hero = findSection<ContactHeroData>(sections, 'contact.hero');
  const heroProps = resolveContactHero(hero);
  const formSection = findSection<SharedFormSectionData>(sections, 'shared.form-section');
  const formProps = resolveSharedFormSection(formSection);

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

      <UnifiedFormSection
        resolved={formProps}
        title={formProps?.title || "Contact Us"}
        description={formProps?.description || "Have a question, need a quote, or want to discuss your project? Fill in the form and our team will get back to you shortly."}
        video={formProps?.videoSrc}
        image={formProps?.imageSrc}
      />

      <LocationMap />
    </div>
  );
};

export default ContactPage;
