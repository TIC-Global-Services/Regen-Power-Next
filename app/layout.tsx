import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroller from "@/utils/SmoothScroller";

const aeonik = localFont({
  src: [
  
    {
      path: '../utils/fonts/fonnts.com-Aeonik-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../utils/fonts/fonnts.com-Aeonik-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-aeonik',
});

export const metadata: Metadata = {
  title: "Regen power",
  description: "Regen power let power your life",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${aeonik.variable} ${aeonik.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <SmoothScroller>
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}
