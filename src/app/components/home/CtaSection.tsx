"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  CONTACT_REVEAL_PROGRESS,
  onTransitBusProgress,
} from "../../lib/transit-events";

export default function CtaSection() {
  const prefersReducedMotion = useReducedMotion();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setRevealed(true);
      return;
    }

    return onTransitBusProgress(({ progress, nearContact }) => {
      if (nearContact || progress >= CONTACT_REVEAL_PROGRESS) {
        setRevealed(true);
      }
    });
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const el = document.getElementById("contact");
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.55) {
          setRevealed(true);
        }
      },
      { threshold: [0.55, 0.75] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <section id="contact" className="flex w-full items-center justify-center p-5">
      <div className="relative w-full max-w-[1200px] overflow-hidden rounded-2xl border border-neutral-200 bg-gradient-to-br from-neutral-50 via-white to-red-50/40">
        {/* Transit curtain — hides CTA until the main bus reaches the bottom */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center bg-neutral-50/95 backdrop-blur-md"
          initial={false}
          animate={{ opacity: revealed ? 0 : 1, y: revealed ? "-8%" : "0%" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden={revealed}
        >
          <div className="hero-dot-grid absolute inset-0 opacity-50" />
          <div className="relative flex flex-col items-center gap-3 px-6 text-center">
            <span className="inline-flex size-10 items-center justify-center rounded-full bg-red-600 text-[15px] font-semibold text-white shadow-md">
              1
            </span>
            <p className="max-w-xs text-[14px] font-medium text-neutral-600">
              The route continues… wait for the bus to arrive.
            </p>
          </div>
        </motion.div>

        <div className="pointer-events-none absolute inset-0 hero-dot-grid opacity-40" />

        <motion.div
          className="relative z-10 flex flex-col items-center gap-6 px-6 py-10 text-center md:py-16"
          initial={false}
          animate={{
            opacity: revealed ? 1 : 0,
            y: revealed ? 0 : 28,
            scale: revealed ? 1 : 0.94,
          }}
          transition={{
            duration: 0.85,
            delay: revealed ? 0.12 : 0,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="flex max-w-[478px] flex-col items-center gap-4">
            <motion.span
              className="text-[12px] font-medium leading-[135%] tracking-[-0.005em] text-red-600 md:text-[14px]"
              initial={false}
              animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 12 }}
              transition={{ duration: 0.6, delay: revealed ? 0.25 : 0 }}
            >
              Let&apos;s Connect
            </motion.span>
            <motion.h2
              className="text-[26px] font-semibold leading-[110%] tracking-[-0.005em] text-neutral-800 md:text-[32px] lg:text-[36px]"
              initial={false}
              animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 16 }}
              transition={{ duration: 0.65, delay: revealed ? 0.32 : 0 }}
            >
              Let&apos;s Build Something Together
            </motion.h2>
            <motion.p
              className="text-[15px] leading-[135%] tracking-[-0.005em] text-neutral-500 md:text-[16px]"
              initial={false}
              animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 12 }}
              transition={{ duration: 0.6, delay: revealed ? 0.4 : 0 }}
            >
              Interested in collaborating on AI projects, competitions, or
              innovative tech solutions? I&apos;d love to hear from you.
            </motion.p>
          </div>
          <motion.div
            className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center"
            initial={false}
            animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 14 }}
            transition={{ duration: 0.6, delay: revealed ? 0.48 : 0 }}
          >
            <Link
              href="/contact"
              className="group inline-flex h-9 items-center justify-center gap-[6px] rounded-[12px] bg-gradient-to-t from-neutral-900 to-neutral-600 px-4 py-2 text-[14px] font-medium leading-[135%] tracking-[-0.005em] text-white shadow-button transition-[filter,background-color,box-shadow] hover:from-neutral-950 hover:to-neutral-700 hover:shadow-button-hover active:brightness-95 md:text-[16px]"
            >
              Get in Touch
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/showcase"
              className="inline-flex h-9 items-center justify-center gap-[6px] rounded-[12px] border border-neutral-200 bg-white px-4 py-2 text-[14px] font-medium leading-[135%] tracking-[-0.005em] text-neutral-800 shadow-button-secondary transition-colors hover:bg-neutral-100 md:text-[16px]"
            >
              View Projects
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
