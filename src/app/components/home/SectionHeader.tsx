import Reveal from "../Reveal";

interface SectionHeaderProps {
  badge: string;
  title: string;
  description?: string;
  badgeClassName?: string;
  /** Blurs transit lines only behind the title glyphs, not full width */
  transitCrossing?: boolean;
}

export default function SectionHeader({
  badge,
  title,
  description,
  badgeClassName = "text-red-600",
  transitCrossing = false,
}: SectionHeaderProps) {
  return (
    <div className="relative flex w-full max-w-[944px] flex-col items-center gap-3 text-center">
      <Reveal className="relative z-10 flex flex-row items-center gap-1.5">
        <span
          className={`text-[12px] font-medium leading-[135%] tracking-[-0.005em] md:text-[14px] ${badgeClassName}`}
        >
          {badge}
        </span>
      </Reveal>

      <Reveal delay={80} className="relative z-10 flex justify-center">
        <h2
          data-section-title-row={transitCrossing ? true : undefined}
          className={`text-[26px] leading-[110%] tracking-[-0.005em] text-gray-900 md:text-[32px] lg:text-[36px] min-[1440px]:text-[44px] ${
            transitCrossing
              ? "inline-block rounded-sm px-2 py-0.5 backdrop-blur-[6px] md:px-3"
              : ""
          }`}
        >
          {title}
        </h2>
      </Reveal>

      {description && (
        <Reveal
          as="p"
          delay={160}
          className="relative z-10 max-w-[640px] text-[15px] leading-[135%] tracking-[-0.005em] text-neutral-500 md:text-[16px]"
        >
          {description}
        </Reveal>
      )}
    </div>
  );
}
