import React from 'react';
import PromotionLayout from '@/layout/promotionLayout';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <PromotionLayout>{children}</PromotionLayout>;
}
