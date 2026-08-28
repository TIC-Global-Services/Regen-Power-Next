import { getAboutPage } from "@/lib/strapi";
import { findSection } from "@/lib/strapi/section-utils";
import { resolveAboutHero, resolveAboutAwards } from "@/lib/strapi/resolvers";
import type { AboutHeroData, AboutAwardsData } from "@/lib/strapi/schemas";
import AboutBackground from "@/components/about/AboutBackground";
import { FALLBACK_ITEMS } from "@/components/about/AboutHorizontalScroll";
import type { HorizontalCardItem } from "@/components/about/AboutHorizontalScroll";

export const revalidate = 60;

export async function generateMetadata() {
  const { data } = await getAboutPage().catch(() => ({ data: { sections: [] } as never }));
  const sections = (data as { sections?: unknown[] })?.sections ?? [];
  const hero = findSection<AboutHeroData>(sections as never[], "about.hero");
  const resolved = resolveAboutHero(hero);
  return {
    title: resolved?.title ? `${resolved.title} | Regen Power` : "About Us | Regen Power",
    description: "Regen Power at a glance — our story and what drives us.",
  };
}

export default async function AboutPage() {
  const { data } = await getAboutPage().catch(() => ({ data: { sections: [] } as never }));
  const sections = ((data as { sections?: unknown[] })?.sections ?? []) as never[];

  const hero = findSection<AboutHeroData>(sections, "about.hero");
  const awards = findSection<AboutAwardsData>(sections, "about.awards");

  const heroProps = resolveAboutHero(hero);
  const awardsProps = resolveAboutAwards(awards);

  const heroEyebrow = heroProps?.eyebrow || "Regen Power";
  const heroTitle = heroProps?.title || "At A Glance";
  const heroVideoSrc = heroProps?.videoSrc || null;

  const cmsItems: HorizontalCardItem[] | undefined = awardsProps?.cards?.length
    ? awardsProps.cards.map((c, i) => ({
        id: c.id || String(i + 1).padStart(2, "0"),
        title: c.title || FALLBACK_ITEMS[i % FALLBACK_ITEMS.length]?.title || "",
        description: c.description || FALLBACK_ITEMS[i % FALLBACK_ITEMS.length]?.description || "",
        ...(c.badgeSrc ? { badgeSrc: c.badgeSrc } : {}),
        ...(c.badgeSizeClass ? { badgeSizeClass: c.badgeSizeClass } : {}),
      }))
    : undefined;

  // Fallbacks used when CMS has no cards or fetch fails
  const fallbackItems = FALLBACK_ITEMS;

  return (
    <div>
      <AboutBackground
        heroEyebrow={heroEyebrow}
        heroTitle={heroTitle}
        heroVideoSrc={heroVideoSrc}
        items={cmsItems}
        fallbackItems={fallbackItems}
      />
    </div>
  );
}
