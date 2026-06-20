"use client";

import { useEffect, useState } from "react";
import { useReducedMotion, useScroll } from "framer-motion";
import type { SectionId } from "./transit-routes";
import { SECTION_IDS } from "./transit-routes";

export function useTransitScroll() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const mqMobile = window.matchMedia("(max-width: 639px)");
    const mqTablet = window.matchMedia("(max-width: 1023px)");

    const updateBreakpoints = () => {
      setIsMobile(mqMobile.matches);
      setIsTablet(mqTablet.matches);
    };

    updateBreakpoints();
    mqMobile.addEventListener("change", updateBreakpoints);
    mqTablet.addEventListener("change", updateBreakpoints);

    return () => {
      mqMobile.removeEventListener("change", updateBreakpoints);
      mqTablet.removeEventListener("change", updateBreakpoints);
    };
  }, []);

  useEffect(() => {
    const sectionElements = SECTION_IDS.map((id) =>
      document.getElementById(id)
    ).filter(Boolean) as HTMLElement[];

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id as SectionId);
        }
      },
      { threshold: [0.2, 0.35, 0.5, 0.65] }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return {
    scrollYProgress,
    activeSection,
    prefersReducedMotion,
    isMobile,
    isTablet,
  };
}
