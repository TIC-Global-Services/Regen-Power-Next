import React from "react";
import PackagesGrid from "@/reuseables/PackagesGrid";
import type { ResolvedSolarPackages } from "@/lib/strapi/resolvers/solar";

interface SolarPackagesProps {
  resolved: ResolvedSolarPackages;
}

const SolarPackages: React.FC<SolarPackagesProps> = ({ resolved }) => {
  const packages = resolved.packages.map((p) => ({
    title: p.title,
    desc: p.description,
    bgClass: p.bgClass,
    items: p.items,
  }));

  return (
    <PackagesGrid
      subtitle={resolved.subtitle}
      title={resolved.title}
      description={resolved.description}
      packages={packages}
    />
  );
};

export default SolarPackages;
