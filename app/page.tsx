"use client";

import { useEffect } from "react";
import { Component } from "@/components/ui/experience-hero";
import { Header } from "@/components/ui/header-3";
import { TextRevealByWord } from "@/components/ui/text-reveal";
import { GlowingEffectDemo } from "@/components/ui/demo";
import { ProcessSection } from "@/components/ui/process-section";
import { TestimonialsSection } from "@/components/ui/testimonials";
import { useTranslation } from "@/lib/i18n";
import Lenis from "lenis";

export default function Page() {
  const { t } = useTranslation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleMenuToggle = (e: Event) => {
      const { open } = (e as CustomEvent<{ open: boolean }>).detail;
      if (open) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };
    window.addEventListener('mobile-menu-toggle', handleMenuToggle);

    return () => {
      lenis.destroy();
      window.removeEventListener('mobile-menu-toggle', handleMenuToggle);
    };
  }, []);

  return (
    <div className="dark min-h-screen bg-[#020202] selection:bg-white selection:text-black">
      <Header />
      <main className="relative w-full overflow-x-clip">
        <Component />
        
        <section className="relative z-10 w-full flex items-center justify-center bg-transparent">
          <TextRevealByWord text={t("textReveal.text")} />
        </section>

        <section className="relative z-10 w-full min-h-screen bg-transparent px-4 py-16 sm:px-8 sm:py-24 md:px-14 lg:px-20 flex items-center">
          <GlowingEffectDemo />
        </section>

        <section className="w-full px-4 sm:px-8 md:px-14 lg:px-20">
          <ProcessSection />
        </section>

        <section className="relative z-10 w-full bg-transparent py-16 sm:py-24 flex items-center overflow-hidden">
          <TestimonialsSection />
        </section>

        <div className="fixed inset-0 pointer-events-none bento-mask opacity-10 z-[10] will-change-transform" />
      </main>
    </div>
  );
}
