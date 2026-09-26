"use client";
import { ReactNode, useRef, useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { setLenis } from "./lenisBridge";

interface LenisProviderProps {
  children: ReactNode;
}

const SmoothScroller = ({ children }: LenisProviderProps) => {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (lenisRef.current) {
      const hash = window.location.hash?.slice(1);
      const target = hash ? document.getElementById(hash) : null;

      // Lenis owns the scroll position — reset it to the top on every
      // route change so pages (e.g. a blog article) don't open mid-scroll,
      // unless the URL carries a hash, in which case Lenis has to be the
      // one to scroll to it (native scrollIntoView gets fought by Lenis's
      // own raf loop and never sticks).
      if (target) {
        lenisRef.current.scrollTo(target, { immediate: true });
      } else {
        lenisRef.current.scrollTo(0, { immediate: true });
        window.scrollTo(0, 0);
      }
      setTimeout(() => {
        lenisRef.current?.resize();
        ScrollTrigger.refresh();
      }, 100);
    }
  }, [pathname]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash?.slice(1);
      if (!hash || !lenisRef.current) return;
      const target = document.getElementById(hash);
      if (target) lenisRef.current.scrollTo(target);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // `hashchange` never fires when the URL already carries the clicked hash, so a
  // second click on the same "#quote-form" link did nothing. Handle same-page
  // hash links on click instead (capture phase, before Next's Link navigates).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor || (anchor.target && anchor.target !== "_self")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;
      if (url.hash.length < 2) return;

      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target || !lenisRef.current) return;

      e.preventDefault();
      lenisRef.current.scrollTo(target);
      if (url.hash !== window.location.hash) {
        history.pushState(null, "", url.pathname + url.search + url.hash);
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    /* ---------------------------------------------------
       1. Allow browser native scroll restoration
    --------------------------------------------------- */
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "auto"; // <-- important
    }

    /* ---------------------------------------------------
       2. Initialize Lenis AFTER the browser restores scroll
    --------------------------------------------------- */
    requestAnimationFrame(() => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        wheelMultiplier: 1,
        syncTouch: false,
        autoRaf: false, // <-- changed (important!)
      });

      lenisRef.current = lenis;
      setLenis(lenis);

      lenis.on("scroll", () => ScrollTrigger.update());

      /* ---------------------------------------------------
         3. Proper GSAP scrollerProxy that doesn't override
            browser's scroll on page load
      --------------------------------------------------- */
      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
          if (value !== undefined) {
            // allow browser's native scroll restore FIRST
            lenis.scrollTo(value, { immediate: true });
          }
          return window.scrollY;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
      });

      /* ---------------------------------------------------
         4. Manual RAF so Lenis doesn't fight scroll restore
      --------------------------------------------------- */
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      ScrollTrigger.addEventListener("refresh", () => lenis.resize());
      ScrollTrigger.refresh();
    });

    return () => {
      setLenis(null);
      lenisRef.current?.destroy();
      ScrollTrigger.killAll();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroller;