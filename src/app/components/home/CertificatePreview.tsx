"use client";

import Image from "next/image";
import { useState } from "react";

type CertificatePreviewProps = {
  src: string;
  alt: string;
};

function Placeholder() {
  return (
    <div className="mb-3 flex aspect-[4/3] w-full items-center justify-center rounded-lg border border-dashed border-neutral-200 bg-transparent">
      <span className="px-4 text-center text-[12px] font-medium text-neutral-400">
        Certificate preview
      </span>
    </div>
  );
}

export default function CertificatePreview({ src, alt }: CertificatePreviewProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <Placeholder />;
  }

  return (
    <div className="relative mb-3 aspect-[4/3] w-full overflow-hidden rounded-lg border border-black/5 bg-neutral-100">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        unoptimized
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
