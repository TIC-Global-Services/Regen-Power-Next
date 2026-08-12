import React from 'react';
import AppLayout from '@/layout/Applayout';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <AppLayout>{children}</AppLayout>;
}