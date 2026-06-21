import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const baseClass =
  "group inline-flex h-7 items-center justify-center gap-1 rounded-[10px] bg-gradient-to-t from-neutral-900 to-neutral-600 px-2.5 text-[12px] font-medium leading-none tracking-[-0.005em] text-white shadow-button transition-[filter,background-color,box-shadow] hover:from-neutral-950 hover:to-neutral-700 hover:shadow-button-hover active:brightness-95 md:h-8 md:gap-1.5 md:px-3 md:text-[13px]";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
  showArrow?: boolean;
};

export default function ButtonLink({
  href,
  children,
  external,
  className = "",
  showArrow = true,
}: ButtonLinkProps) {
  const cls = `${baseClass} ${className}`.trim();

  const content = (
    <>
      {children}
      {showArrow && (
        <ArrowRight
          className="size-3 shrink-0 transition-transform group-hover:translate-x-0.5 md:size-3.5"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (external || href.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}
