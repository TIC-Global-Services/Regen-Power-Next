import { getPromotionPage } from '@/lib/strapi/fetchers';
import { resolvePromotionPage } from '@/lib/strapi/resolvers/promotion-page';
import CombinedPromoPage from '@/components/Promotion/CombinedPromoPage';

export const revalidate = 60;

export default async function Page() {
  const res = await getPromotionPage();
  const sections = (res.data as unknown as { sections?: unknown })?.sections as never;
  const promotion = resolvePromotionPage(sections as never);
  return <CombinedPromoPage promotion={promotion} />;
}
