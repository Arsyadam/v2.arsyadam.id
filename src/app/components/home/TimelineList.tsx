"use client";

import Image from "next/image";
import ButtonLink from "../ButtonLink";
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
    <ButtonLink href={href} external className="shrink-0">
      {children}
    </ButtonLink>
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
