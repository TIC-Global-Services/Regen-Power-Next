import React from "react";
import ReusableFAQ from "@/reuseables/faq";
import type { ResolvedSharedFaq } from "@/lib/strapi/resolvers/shared";

interface Props {
  resolved: ResolvedSharedFaq;
}

export default function FaqSection({ resolved }: Props) {
  return (
    <ReusableFAQ
      topTitle={resolved.title}
      title={resolved.sectionTitle}
      listTitle={resolved.listTitle}
      image={resolved.image?.src || undefined}
      items={resolved.items}
    />
  );
}
