"use client";

import React, { useState, useCallback, useRef, useEffect, useLayoutEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Testimonial = {
  quoteKey: "testimonials.quote1" | "testimonials.quote2" | "testimonials.quote3" | "testimonials.quote4" | "testimonials.quote5";
  nameKey: "testimonials.name1" | "testimonials.name2" | "testimonials.name3" | "testimonials.name4" | "testimonials.name5";
  roleKey: "testimonials.role1" | "testimonials.role2" | "testimonials.role3" | "testimonials.role4" | "testimonials.role5";
  company: string;
  image: string;
  url: string;
  logoInitial: string;
  logoColor: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quoteKey: "testimonials.quote1",
    nameKey: "testimonials.name1",
    roleKey: "testimonials.role1",
    company: "AquaTeh",
    image: "/testimonials/aquateh.png",
    url: "https://plumber-phi.vercel.app",
    logoInitial: "AT",
    logoColor: "#4a90d9",
  },
  {
    quoteKey: "testimonials.quote2",
    nameKey: "testimonials.name2",
    roleKey: "testimonials.role2",
    company: "Studio Bella",
    image: "/testimonials/studio-bella.png",
    url: "https://hairdresser-gamma-ruddy.vercel.app",
    logoInitial: "SB",
    logoColor: "#b08b8b",
  },
  {
    quoteKey: "testimonials.quote3",
    nameKey: "testimonials.name3",
    roleKey: "testimonials.role3",
    company: "Ognjišče",
    image: "/testimonials/ognjisce.png",
    url: "https://restaurant-iota-jet.vercel.app",
    logoInitial: "O",
    logoColor: "#d4a853",
  },
  {
    quoteKey: "testimonials.quote4",
    nameKey: "testimonials.name4",
    roleKey: "testimonials.role4",
    company: "Garaža Pro",
    image: "/testimonials/garaza-pro.png",
    url: "https://mechanic-henna.vercel.app",
    logoInitial: "GP",
    logoColor: "#e85d26",
  },
  {
    quoteKey: "testimonials.quote5",
    nameKey: "testimonials.name5",
    roleKey: "testimonials.role5",
    company: "Verity",
    image: "/testimonials/verity.png",
    url: "https://lawyer-omega-six.vercel.app",
    logoInitial: "V",
    logoColor: "#1e2a3a",
  },
];

export function TestimonialsSection() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [metrics, setMetrics] = useState({ cardWidth: 0, viewportWidth: 0, gap: 32 });
  
  const cardRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let animationFrameId: number;

    const measure = () => {
      if (cardRef.current && viewportRef.current && trackRef.current) {
        const cWidth = cardRef.current.offsetWidth;
        const vWidth = viewportRef.current.offsetWidth;
        
        let g = 32;
        const computedGap = getComputedStyle(trackRef.current).gap;
        if (computedGap && computedGap !== "normal") {
          g = parseFloat(computedGap) || 32;
        } else if (window.innerWidth <= 768) {
          g = 16;
        }

        setMetrics(prev => {
          if (prev.cardWidth === cWidth && prev.viewportWidth === vWidth && prev.gap === g) return prev;
          return { cardWidth: cWidth, viewportWidth: vWidth, gap: g };
        });
      }
    };

    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(measure);
    });

    if (viewportRef.current) observer.observe(viewportRef.current);
    if (cardRef.current) observer.observe(cardRef.current);
    if (trackRef.current) observer.observe(trackRef.current);

    measure(); // initial measurement

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  }, []);

  const headingParts = t("testimonials.heading").split("\n");
  
  // Center the active card dynamically
  const centerOffset = (metrics.viewportWidth - metrics.cardWidth) / 2;
  const offset = centerOffset - activeIndex * (metrics.cardWidth + metrics.gap);

  return (
    <div 
      className="ts-section"
      style={{ "--vw": `${metrics.viewportWidth || 1000}px` } as React.CSSProperties}
    >
      {/* Section heading */}
      <div className="ts-heading-wrap">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] text-white leading-[1.1]">
          {headingParts[0]}<br />{headingParts[1]}
        </h2>
      </div>

      {/* Carousel viewport */}
      <div className="ts-carousel-viewport" ref={viewportRef}>
        <div
          ref={trackRef}
          className="ts-carousel-track"
          style={{ transform: `translateX(${offset}px)` }}
        >
          {TESTIMONIALS.map((item, i) => (
            <div
              key={item.company}
              ref={i === 0 ? cardRef : undefined}
              className={cn("ts-card", i === activeIndex && "ts-card-active")}
              onClick={() => i !== activeIndex && goTo(i)}
            >
              <div className="ts-card-inner">
                {/* Left: Quote */}
                <div className="ts-quote-side">
                  {/* Company logo */}
                  <div
                    className="ts-logo"
                    style={{ background: `${item.logoColor}20`, borderColor: `${item.logoColor}40` }}
                  >
                    <span style={{ color: item.logoColor }} className="text-sm font-bold tracking-tight">
                      {item.logoInitial}
                    </span>
                  </div>

                  {/* Quote text */}
                  <blockquote className="ts-quote">
                    {t(item.quoteKey)}
                  </blockquote>

                  {/* Author */}
                  <div className="ts-author">
                    <div className="ts-author-info">
                      <div
                        className="ts-avatar"
                        style={{ background: `linear-gradient(135deg, ${item.logoColor}40, ${item.logoColor}15)`, borderColor: `${item.logoColor}30` }}
                      >
                        <span style={{ color: item.logoColor }} className="text-xs font-semibold">
                          {t(item.nameKey).charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{t(item.nameKey)}</div>
                        <div className="text-xs text-neutral-500">{t(item.roleKey)}</div>
                      </div>
                    </div>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="ts-readmore group" onClick={(e) => e.stopPropagation()}>
                      {t("testimonials.readMore")}
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>

                {/* Right: Website preview */}
                <div className="ts-preview-side">
                  <div className="ts-browser-frame">
                    {/* Browser chrome */}
                    <div className="ts-browser-chrome">
                      <div className="ts-browser-dots">
                        <div className="ts-bdot ts-bdot-r" />
                        <div className="ts-bdot ts-bdot-y" />
                        <div className="ts-bdot ts-bdot-g" />
                      </div>
                      <div className="ts-browser-url">{new URL(item.url).hostname}</div>
                    </div>
                    {/* Website screenshot */}
                    <div className="ts-screenshot-wrap">
                      <Image
                        src={item.image}
                        alt={`${item.company} website`}
                        fill
                        className="object-cover object-top"
                        sizes="50vw"
                        priority={i === 0}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: company tabs + navigation */}
      <div className="ts-bottom">
        <div className="ts-tabs">
          {TESTIMONIALS.map((item, i) => (
            <button
              key={item.company}
              onClick={() => goTo(i)}
              className={cn("ts-tab", i === activeIndex && "ts-tab-active")}
            >
              {item.company}
            </button>
          ))}
        </div>
        <div className="ts-nav">
          <button onClick={goPrev} className="ts-nav-btn" aria-label="Previous testimonial">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={goNext} className="ts-nav-btn" aria-label="Next testimonial">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
