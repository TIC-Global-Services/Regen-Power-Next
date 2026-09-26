import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { findRedirect } from "@/lib/redirects";

export async function proxy(request: NextRequest) {
  const rule = await findRedirect(request.nextUrl.pathname);
  if (!rule) return NextResponse.next();

  const target = new URL(rule.destination, request.url);
  if (!rule.destination.includes("?")) target.search = request.nextUrl.search;

  return NextResponse.redirect(target, rule.permanent ? 301 : 302);
}

export const config = {
  matcher: [
    "/((?!api|_next|.*\\.(?:png|jpe?g|gif|svg|webp|avif|ico|css|js|map|txt|xml|json|woff2?|ttf|mp4|webm|pdf)$).*)",
  ],
};
