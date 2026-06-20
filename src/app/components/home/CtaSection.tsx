import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CtaSection() {
  return (
    <section id="contact" className="flex w-full items-center justify-center p-5">
      <div className="relative w-full max-w-[1200px] overflow-hidden rounded-2xl border border-neutral-200 bg-gradient-to-br from-neutral-50 via-white to-red-50/40">
        <div className="pointer-events-none absolute inset-0 hero-dot-grid opacity-40" />
        <div className="relative z-10 flex flex-col items-center gap-6 px-6 py-10 text-center md:py-16">
          <div className="flex max-w-[478px] flex-col items-center gap-4">
            <span className="text-[12px] font-medium leading-[135%] tracking-[-0.005em] text-red-600 md:text-[14px]">
              Let&apos;s Connect
            </span>
            <h2 className="text-[26px] font-semibold leading-[110%] tracking-[-0.005em] text-neutral-800 md:text-[32px] lg:text-[36px]">
              Let&apos;s Build Something Together
            </h2>
            <p className="text-[15px] leading-[135%] tracking-[-0.005em] text-neutral-500 md:text-[16px]">
              Interested in collaborating on AI projects, competitions, or
              innovative tech solutions? I&apos;d love to hear from you.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <Link
              href="/contact"
              className="group inline-flex h-9 items-center justify-center gap-[6px] rounded-[12px] bg-gradient-to-t from-neutral-900 to-neutral-600 px-4 py-2 text-[14px] font-medium leading-[135%] tracking-[-0.005em] text-white shadow-button transition-[filter,background-color,box-shadow] hover:from-neutral-950 hover:to-neutral-700 hover:shadow-button-hover active:brightness-95 md:text-[16px]"
            >
              Get in Touch
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/showcase"
              className="inline-flex h-9 items-center justify-center gap-[6px] rounded-[12px] border border-neutral-200 bg-white px-4 py-2 text-[14px] font-medium leading-[135%] tracking-[-0.005em] text-neutral-800 shadow-button-secondary transition-colors hover:bg-neutral-100 md:text-[16px]"
            >
              View Projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
