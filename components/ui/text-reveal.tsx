"use client";

import { FC, ReactNode, useRef, useEffect, useCallback } from "react";
import { motion, useTransform, MotionValue, useMotionValue } from "framer-motion";

import { cn } from "@/lib/utils";

interface TextRevealByWordProps {
  text: string;
  className?: string;
}

const TextRevealByWord: FC<TextRevealByWordProps> = ({
  text,
  className,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const scrollYProgress = useMotionValue(0);

  const update = useCallback(() => {
    const el = targetRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const scrollableDistance = rect.height - vh;
    if (scrollableDistance <= 0) {
      scrollYProgress.set(0);
      return;
    }
    const raw = -rect.top / scrollableDistance;
    scrollYProgress.set(Math.max(0, Math.min(1, raw)));
  }, [scrollYProgress]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", onScroll, { passive: true });
    update(); // Initial calculation
    
    return () => window.removeEventListener("scroll", onScroll);
  }, [update]);

  const words = text.split(" ");

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[150vh] md:h-[200vh]", className)}>
      <div className="sticky top-0 mx-auto flex h-screen max-w-4xl items-center bg-transparent px-4 md:px-[1rem]">
        <p className="flex flex-wrap font-medium tracking-tight text-black/20 dark:text-white/20 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          {words.map((word, i) => {
            const start = 0.30 + (i / words.length) * 0.45;
            const end = start + (1 / words.length) * 0.45;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-2.5">
      <span className={"absolute opacity-30"}>{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className={"text-black dark:text-white"}
      >
        {children}
      </motion.span>
    </span>
  );
};

export { TextRevealByWord };
