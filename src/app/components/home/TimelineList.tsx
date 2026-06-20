"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "../Reveal";

export type TimelineItem = {
  title: string;
  subtitle: string;
  href: string;
  label: string;
  period?: string;
  logo?: string;
  logoAlt?: string;
};

function LearnMoreLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex h-9 items-center rounded-full bg-red-50 px-3 text-sm font-semibold whitespace-nowrap text-red-600 transition-colors hover:bg-red-100 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
    >
      {children}
      <svg
        className="ml-3 overflow-visible text-red-300 transition-colors group-hover:text-red-400"
        width="3"
        height="6"
        viewBox="0 0 3 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M0 0L3 3L0 6" />
      </svg>
    </Link>
  );
}

type TimelineListProps = {
  items: TimelineItem[];
  showPeriod?: boolean;
  spineId?: "experience" | "education";
};

export default function TimelineList({
  items,
  showPeriod = false,
  spineId,
}: TimelineListProps) {
  return (
    <ol
      data-timeline-spine={spineId}
      className="relative ml-8 border-l-[5px] border-transparent"
    >
      {items.map((item, index) => (
        <li
          key={item.title}
          className={`relative mb-10 ml-8 last:mb-0 ${index === 0 ? "pt-15" : "pt-3"}`}
        >
          <div
            data-transit-halte={spineId ? `${spineId}-${index}` : undefined}
            className={`absolute z-10 mt-1.5 -left-[44.5px] rounded-full bg-white ${
              index === 0
                ? "size-5 border-[3px] border-neutral-800"
                : "size-5 border-[3px] border-slate-300"
            }`}
          />
          <Reveal delay={index * 70} className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="pb-3">
                {showPeriod && item.period && (
                  <span className="text-gray-400">{item.period}</span>
                )}
                <h3 className="text-2xl font-medium text-neutral-800">
                  {item.title}
                </h3>
                <p className="text-gray-400">{item.subtitle}</p>
              </div>
              <LearnMoreLink href={item.href}>{item.label}</LearnMoreLink>
            </div>
            {item.logo && item.logoAlt && (
              <Image
                src={item.logo}
                alt={item.logoAlt}
                width={70}
                height={70}
                className="shrink-0 rounded-lg object-contain"
              />
            )}
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
