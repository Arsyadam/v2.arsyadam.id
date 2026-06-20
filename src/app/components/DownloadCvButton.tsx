"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import CvDownloadDialog from "./CvDownloadDialog";

export default function DownloadCvButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed right-4 top-[4.25rem] z-40 inline-flex h-9 items-center gap-2 rounded-full border border-red-200 bg-white/95 px-4 text-[13px] font-semibold text-red-700 shadow-button-secondary backdrop-blur-sm transition-colors hover:bg-red-50 md:right-6"
      >
        <Download className="size-4" aria-hidden="true" />
        Download CV
      </button>
      <CvDownloadDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
