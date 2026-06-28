"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import CvDownloadDialog from "./CvDownloadDialog";

type DownloadCvButtonProps = {
  className?: string;
};

const defaultClassName =
  "inline-flex h-8 items-center justify-center gap-1.5 rounded-button-md border border-red-200 bg-red-50 px-2.5 py-2 text-[13px] font-medium leading-[18px] tracking-[-0.065px] text-red-700 shadow-button-secondary transition-colors hover:bg-red-100";

export default function DownloadCvButton({ className }: DownloadCvButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className ?? defaultClassName}
      >
        <Download className="size-3.5" aria-hidden="true" />
        Download CV
      </button>
      <CvDownloadDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
