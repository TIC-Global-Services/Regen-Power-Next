import Navbar from "@/reuseables/Navbar";
import Footer from "@/reuseables/Footer";
import { getFooter, getNavbar } from "@/lib/strapi/fetchers";
import { resolveFooter, fallbackFooter } from "@/lib/strapi/resolvers/footer";
import { resolveNavbar, fallbackNavbar } from "@/lib/strapi/resolvers/navbar";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  let footerData = fallbackFooter();
  let navbarData = fallbackNavbar();

  const [footerRes, navbarRes] = await Promise.allSettled([getFooter(), getNavbar()]);

  if (footerRes.status === "fulfilled") {
    const resolved = resolveFooter(footerRes.value?.data as never);
    if (resolved) footerData = resolved;
  }
  if (navbarRes.status === "fulfilled") {
    const resolved = resolveNavbar(navbarRes.value?.data);
    if (resolved) navbarData = resolved;
  }

  return (
    <>
      <Navbar data={navbarData} />
      <main className="flex-1">{children}</main>
      <Footer data={footerData} />
    </>
  );
}
