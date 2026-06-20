"use client";

import { useEffect, useState } from "react";
import { SECTION_IDS, type SectionId } from "./transit-routes";

export const MAP_WIDTH = 1920;

export type SectionBand = {
  top: number;
  height: number;
  bottom: number;
};

export type LandingLayout = {
  pageHeight: number;
  experienceTimelineX: number;
  educationTimelineX: number;
  sections: Partial<Record<SectionId, SectionBand>>;
  /** Measured Y (page coords) of h2 title rows for spine alignment */
  sectionTitleY?: Partial<Record<"achievement" | "perspectives", number>>;
};

function spineXInViewBox(spine: HTMLElement, root: HTMLElement) {
  const spineRect = spine.getBoundingClientRect();
  const rootRect = root.getBoundingClientRect();
  const borderWidth = 5;
  const spineScreenX = spineRect.left + borderWidth / 2;
  return (
    ((spineScreenX - rootRect.left) / Math.max(rootRect.width, 1)) * MAP_WIDTH
  );
}

function titleRowY(
  root: HTMLElement,
  rootTop: number,
  sectionId: "achievement" | "perspectives"
): number | undefined {
  const el = root.querySelector<HTMLElement>(
    `#${sectionId} [data-section-title-row]`
  );
  if (!el) return undefined;
  const r = el.getBoundingClientRect();
  return r.top + window.scrollY - rootTop + r.height / 2;
}

function measureLayout(root: HTMLElement): LandingLayout | null {
  const pageHeight = root.offsetHeight;
  if (pageHeight <= 0) return null;

  const rootTop = root.getBoundingClientRect().top + window.scrollY;
  const sections: Partial<Record<SectionId, SectionBand>> = {};

  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    const top = rect.top + window.scrollY - rootTop;
    sections[id] = {
      top,
      height: rect.height,
      bottom: top + rect.height,
    };
  }

  const expSpine = root.querySelector<HTMLElement>(
    '[data-timeline-spine="experience"]'
  );
  const eduSpine = root.querySelector<HTMLElement>(
    '[data-timeline-spine="education"]'
  );

  if (!expSpine || !eduSpine) return null;

  return {
    pageHeight,
    experienceTimelineX: spineXInViewBox(expSpine, root),
    educationTimelineX: spineXInViewBox(eduSpine, root),
    sections,
    sectionTitleY: {
      achievement: titleRowY(root, rootTop, "achievement"),
      perspectives: titleRowY(root, rootTop, "perspectives"),
    },
  };
}

export function useLandingTransitLayout(rootId: string) {
  const [layout, setLayout] = useState<LandingLayout | null>(null);

  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;

    const update = () => {
      const next = measureLayout(root);
      if (next) setLayout(next);
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(root);

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) ro.observe(el);
    }

    window.addEventListener("resize", update);
    window.addEventListener("load", update);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
      window.removeEventListener("load", update);
    };
  }, [rootId]);

  return layout;
}
