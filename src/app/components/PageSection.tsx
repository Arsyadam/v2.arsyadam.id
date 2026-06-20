import SectionHeader from "./home/SectionHeader";

type PageSectionProps = {
  children: React.ReactNode;
  badge?: string;
  title?: string;
  description?: string;
  badgeClassName?: string;
  className?: string;
  id?: string;
};

export default function PageSection({
  children,
  badge,
  title,
  description,
  badgeClassName,
  className = "",
  id,
}: PageSectionProps) {
  const hasHeader = badge || title;

  return (
    <section
      id={id}
      className={`relative flex w-full items-center justify-center overflow-hidden bg-white/80 px-5 py-10 backdrop-blur-sm md:px-10 md:py-[60px] lg:py-[80px] ${className}`}
    >
      <div className="relative z-10 flex w-full max-w-[1200px] flex-col items-center gap-8 md:gap-10">
        {hasHeader && (
          <SectionHeader
            badge={badge ?? ""}
            title={title ?? ""}
            description={description}
            badgeClassName={badgeClassName}
          />
        )}
        {children}
      </div>
    </section>
  );
}
