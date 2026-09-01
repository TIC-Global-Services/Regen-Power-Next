import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import type { ResolvedFooter } from "@/lib/strapi/resolvers/footer";
import { fallbackFooter } from "@/lib/strapi/resolvers/footer";

type FooterProps = {
  data?: ResolvedFooter | null;
};

function parseCopyright(text: string) {
  // Keep the green highlight inside the copyright like before
  // e.g. "Copyright © 2026 Regen Power Pty Ltd..." -> prefix + <span>Regen Power</span> + suffix
  const needle = "Regen Power";
  const i = text.indexOf(needle);
  if (i === -1) return { before: text, highlight: null as string | null, after: "" };
  return {
    before: text.slice(0, i),
    highlight: needle,
    after: text.slice(i + needle.length),
  };
}

export default function Footer({ data }: FooterProps) {
  const f: ResolvedFooter = data ?? fallbackFooter();
  const bgStyle = f.backgroundSrc
    ? { backgroundImage: `url('${f.backgroundSrc}')` }
    : { backgroundImage: "url('/footer_bg.svg')" };
  const copyright = parseCopyright(f.copyrightText);
  const headOffice = f.headOffice;

  return (
    <footer
      className="relative w-full bg-[#0a0a0a] text-white pt-16 pb-8 px-4 md:px-8 lg:px-[5%] md:px-[3%] bg-cover bg-center"
      style={bgStyle}
    >
      <div>
        {/* Logo */}
        <div className="flex justify-center mb-16">
          <Image
            src={f.logoSrc}
            alt={f.logoAlt}
            width={300}
            height={100}
            className="h-auto w-[250px] object-contain"
          />
        </div>

        {/* Help banner */}
        <div className="flex justify-center mb-12">
          <a
            href={`tel:${f.helpPhoneHref.replace(/\s/g, "")}`}
            className="inline-flex items-center justify-center gap-2 max-w-full text-sm md:text-lg text-gray-200 border border-[#8dc63f]/40 rounded-full px-4 py-2.5 md:px-6 hover:bg-white/5 transition-colors"
          >
            <Phone size={18} className="shrink-0 text-[#8dc63f]" />
            <span className="text-center">
              {f.helpText}{" "}
              <span className="text-[#8dc63f] font-medium whitespace-nowrap">{f.helpPhoneLabel}</span>
            </span>
          </a>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-center md:text-left">
          {/* Quick Links */}
          <div>
            <h3 className="text-[#8dc63f] text-xl mb-6 font-medium">{f.quickLinksTitle}</h3>
            <ul className="space-y-2 text-sm text-gray-300 flex flex-col items-center md:items-start">
              {f.quickLinks.map((link) => (
                <li key={`${link.label}-${link.href}`}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Head Office */}
          <div>
            <h3 className="text-[#8dc63f] text-xl mb-6 font-medium">{f.headOfficeTitle}</h3>
            {headOffice ? (
              <div className="space-y-2 text-sm text-gray-300 flex flex-col items-center md:items-start">
                <p>{headOffice.address}</p>
                {headOffice.phone ? (
                  <p>
                    Phone:{" "}
                    <a href={`tel:${headOffice.phone.replace(/\s/g, "")}`} className="hover:text-white transition-colors">
                      {headOffice.phone}
                    </a>
                  </p>
                ) : null}
                {headOffice.directLine ? (
                  <p>
                    Direct Line:{" "}
                    <a href={`tel:${headOffice.directLine.replace(/\s/g, "")}`} className="hover:text-white transition-colors">
                      {headOffice.directLine}
                    </a>
                  </p>
                ) : null}
                {headOffice.email ? (
                  <p>
                    Email:{" "}
                    <a href={`mailto:${headOffice.email}`} className="hover:text-white transition-colors">
                      {headOffice.email}
                    </a>
                  </p>
                ) : null}
                {headOffice.hours ? <p>Hours: {headOffice.hours}</p> : null}
              </div>
            ) : null}
          </div>

          {/* State Offices */}
          <div>
            <h3 className="text-[#8dc63f] text-xl mb-6 font-medium">{f.stateOfficesTitle}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 text-sm text-gray-300 text-center sm:text-left">
              {f.stateOffices.map((office) => (
                <div key={office.state} className="flex flex-col items-center sm:items-start">
                  <p className="mb-1 text-gray-100">{office.state}</p>
                  <p>{office.address}</p>
                  {office.phone ? (
                    <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="hover:text-white transition-colors">
                      {office.phone}
                    </a>
                  ) : null}
                  {office.email ? (
                    <a href={`mailto:${office.email}`} className="hover:text-white transition-colors break-all">
                      {office.email}
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-8 text-xs text-gray-400 gap-6">
          <p className="text-center md:text-left">
            {copyright.highlight ? (
              <>
                {copyright.before}
                <span className="text-[#8dc63f]">{copyright.highlight}</span>
                {copyright.after}
              </>
            ) : (
              f.copyrightText
            )}
          </p>

          <div className="flex gap-4 justify-center md:justify-start">
            {f.socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                title={social.label}
                className="border border-gray-600 rounded p-1.5 hover:bg-gray-800 transition-all"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {social.iconSrc ? (
                  <img src={social.iconSrc} alt={social.label} width={16} height={16} />
                ) : (
                  <span className="text-[11px] leading-none">{social.label.slice(0, 2)}</span>
                )}
              </a>
            ))}
            {headOffice?.email ? (
              <a
                href={`mailto:${headOffice.email}`}
                aria-label="Email"
                title="Email"
                className="border border-gray-600 rounded p-1.5 hover:bg-gray-800 hover:text-white transition-all"
              >
                <Mail size={16} strokeWidth={1.5} />
              </a>
            ) : null}
          </div>

          <p className="text-center md:text-right">
            {f.creditLabel} <span className="text-[#8dc63f]">{f.creditName}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
