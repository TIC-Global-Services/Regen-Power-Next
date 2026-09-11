import Link from 'next/link';
import Image from 'next/image';
import AppLayout from '@/layout/Applayout';
import GetSolar from '@/reuseables/getsolar';

const QUICK_LINKS = [
  { label: 'Solar', href: '/solar' },
  { label: 'Battery', href: '/battery' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function NotFound() {
  return (
    <AppLayout>
      <div className="bg-white text-black">
        <div className="relative min-h-screen overflow-hidden">
          {/* background image */}
          <Image
            src="/solar_house_render.png"
            alt=""
            fill
            className="object-cover"
            priority
          />
          {/* readability overlay */}
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-black/10 to-transparent" />

          <div className="relative min-h-screen flex flex-col items-center justify-center px-[5%] md:px-[3%] py-32 text-center text-white">
            <p className="text-sm font-medium uppercase tracking-wide text-[#A0CF44] mb-4">
              404 error
            </p>
            <h1 className="text-6xl md:text-8xl font-normal tracking-tight leading-none mb-6">
              404
            </h1>
            <h2 className="text-2xl md:text-3xl font-normal tracking-tight mb-4">
              Looks like this page lost power
            </h2>
            <p className="text-lg text-white/80 leading-relaxed max-w-xl mb-10">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have
              been moved or no longer exists.
            </p>

            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-[#A0CF44] text-black font-medium px-6 py-3 mb-10 hover:bg-[#8fbb39] transition-colors"
            >
              Back to Home
            </Link>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-white/80 px-4 py-2 rounded-full border border-white/30 hover:text-[#A0CF44] hover:border-[#A0CF44] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <GetSolar
          subtitle=""
          mainTitle="Get Your Free Solar Quote"
          description="Ready to start saving with solar? Get a free, no-obligation quote from the Regen Power team."
          buttonText="Get Your Free Quote"
          buttonHref="#quote-form"
        />
      </div>
    </AppLayout>
  );
}
