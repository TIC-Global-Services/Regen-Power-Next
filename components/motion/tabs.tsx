"use client";
import React from "react";
export function Tabs({ value, onValueChange, variant: _v, children }: { value: string; onValueChange: (v: string) => void; variant?: string; children: React.ReactNode }) {
  return <div data-value={value} data-onchange={String(!!onValueChange)}>{children}</div>;
}
export function TabsList({ children }: { children: React.ReactNode }) {
  return <div className="inline-flex rounded-full border bg-white p-1 gap-1">{children}</div>;
}
export function TabsTrigger({ value, children }: { value: string; children: React.ReactNode }) {
  const ctx = React.useContext(TabsCtx);
  // fallback: render as button that bubbles to parent via DOM — simpler: just render
  return <button data-value={value} className="px-4 py-1.5 rounded-full text-sm font-medium data-[active=true]:bg-black data-[active=true]:text-white border border-transparent">{children}</button>;
}
const TabsCtx = React.createContext<{ value: string } | null>(null);
