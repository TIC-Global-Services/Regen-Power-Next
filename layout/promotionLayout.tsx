import PromotionNav from "@/reuseables/PromotionNav";
import Footer from "@/reuseables/Footer";
import { getFooter } from "@/lib/strapi/fetchers";
import { resolveFooter, fallbackFooter } from "@/lib/strapi/resolvers/footer";

export default async function PromotionLayout({ children }: { children: React.ReactNode }) {
  let footerData = fallbackFooter();
  try {
    const res = await getFooter();
    const resolved = resolveFooter(res?.data as never);
    if (resolved) footerData = resolved;
  } catch {
    // keep fallback
  }

  return (
    <>
      <PromotionNav />
      <main className="flex-1">{children}</main>
      <Footer data={footerData} />
    </>
  );
}
