"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import CvDownloadDialog from "./CvDownloadDialog";

export default function HeroDownloadCvButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-9 items-center justify-center gap-[6px] rounded-[12px] border border-red-200 bg-red-50 px-4 py-2 text-[14px] font-medium leading-[135%] tracking-[-0.005em] text-red-700 shadow-button-secondary transition-colors hover:bg-red-100 md:text-[16px]"
      >
        <Download className="size-4" aria-hidden="true" />
        Download CV
      </button>
      <CvDownloadDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
