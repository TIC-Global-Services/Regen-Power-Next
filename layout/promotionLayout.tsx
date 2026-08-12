import React from 'react';
import PromotionNav from '@/reuseables/PromotionNav';
import Footer from '@/reuseables/Footer';

interface PromotionLayoutProps {
  children: React.ReactNode;
}

export default function PromotionLayout({ children }: PromotionLayoutProps) {
  return (
    <>
      <PromotionNav />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
