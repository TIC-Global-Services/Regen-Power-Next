import React from "react";
import GetSolar from "@/reuseables/getsolar";
import type { ResolvedSharedCtaBanner } from "@/lib/strapi/resolvers/shared";

interface Props {
  resolved: ResolvedSharedCtaBanner;
}

export default function CtaBannerSection({ resolved }: Props) {
  return (
    <GetSolar
      subtitle={resolved.subtitle}
      mainTitle={resolved.mainTitle}
      description={resolved.description}
      buttonText={resolved.buttonText}
      buttonHref={resolved.buttonHref}
      bgImage={resolved.bgImage || undefined}
    />
  );
}
