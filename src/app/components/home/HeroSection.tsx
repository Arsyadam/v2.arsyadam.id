import Link from "next/link";
import { ArrowRight, BrainCircuit, Building2, Route } from "lucide-react";
import AskMeComponent from "../AskMeComponent";
import ButtonLink from "../ButtonLink";
import HeroDownloadCvButton from "../HeroDownloadCvButton";
import Reveal from "../Reveal";

const specialties = [
  {
    icon: BrainCircuit,
    label: "Machine Learning",
    shortLabel: "ML",
    color: "text-purple-600 bg-purple-500/10",
  },
  {
    icon: Building2,
    label: "Smart Cities",
    shortLabel: "Smart Cities",
    color: "text-blue-600 bg-blue-500/10",
  },
  {
    icon: Route,
    label: "Intelligent Transport System",
    shortLabel: "ITS",
    color: "text-red-600 bg-red-500/10",
  },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="flex w-full items-center justify-center pt-[60px] min-[768px]:pt-[75px] lg:pl-10"
    >
      <div className="grid w-full max-w-[1200px] grid-cols-1 overflow-hidden lg:min-h-[560px] lg:grid-cols-2 xl:min-h-[640px]">
        <div className="relative isolate flex flex-col items-center justify-center px-6 py-10 min-[768px]:py-14 lg:items-start lg:px-0 lg:py-16 lg:pr-10">
          <div
            className="pointer-events-none absolute -inset-x-8 -top-6 bottom-0 z-0 lg:-inset-x-12 lg:-right-4"
            aria-hidden="true"
          >
            <div className="hero-text-blur-ambient hero-text-blur-mask absolute inset-0" />
            <div className="hero-text-blur-focus hero-text-blur-mask absolute inset-0 lg:origin-left lg:scale-[0.92]" />
          </div>

          <div className="relative z-10 flex w-full max-w-[580px] flex-col items-center gap-8 lg:items-start xl:gap-10">
            {/* Role badge */}
            <Reveal>
              <span className="inline-flex items-center rounded-full border border-red-200/80 bg-red-50/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-red-600 md:text-[12px]">
                AI Engineer
              </span>
            </Reveal>

            {/* Name + focus area */}
            <Reveal
              delay={90}
              className="flex w-full flex-col items-center gap-3 lg:items-start"
            >
              <h1 className="font-fraunces text-center text-[34px] font-semibold leading-[110%] tracking-[-0.02em] text-neutral-900 md:text-[42px] lg:text-left lg:text-[46px] xl:text-[54px]">
                Arsyad Ali Mahardika
              </h1>
              <p className="max-w-[480px] text-center text-[15px] font-medium leading-[150%] tracking-[-0.01em] text-neutral-500 md:text-[16px] lg:text-left">
                Machine Learning &amp; Intelligent Transport Systems
              </p>
            </Reveal>

            {/* Specialty pills */}
            <Reveal delay={140} className="w-full">
              <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                {specialties.map(({ icon: Icon, label, shortLabel, color }) => (
                  <div
                    key={label}
                    title={label}
                    className="flex items-center gap-2 rounded-lg border border-neutral-200/90 bg-white/95 px-3 py-2 text-[13px] font-medium text-neutral-800 shadow-button-secondary backdrop-blur-sm"
                  >
                    <span
                      className={`flex size-6 shrink-0 items-center justify-center rounded-md ${color}`}
                    >
                      <Icon className="size-3.5" aria-hidden="true" />
                    </span>
                    <span className="hidden sm:inline">{label}</span>
                    <span className="sm:hidden">{shortLabel}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Description */}
            <Reveal
              as="p"
              delay={200}
              className="max-w-[520px] text-center text-[15px] leading-[175%] tracking-[-0.005em] text-neutral-600 md:text-[16px] lg:text-left"
            >
              I build ML systems that make cities smarter — from predictive models
              at{" "}
              <ButtonLink href="/showcase/tara-ai-transjakarta" className="mx-0.5 align-middle">
                Transjakarta
              </ButtonLink>{" "}
              to ITS prototypes that connect data, mobility, and urban
              infrastructure.
            </Reveal>

            {/* CTAs */}
            <Reveal
              delay={280}
              className="flex w-full flex-col items-center gap-3 sm:flex-row sm:flex-wrap lg:items-start lg:justify-start"
            >
              <Link
                href="/#showcase"
                className="group inline-flex h-9 items-center justify-center gap-[6px] rounded-[12px] bg-gradient-to-t from-neutral-900 to-neutral-600 px-4 py-2 text-[14px] font-medium leading-[135%] tracking-[-0.005em] text-white shadow-button transition-[filter,background-color,box-shadow] hover:from-neutral-950 hover:to-neutral-700 hover:shadow-button-hover active:brightness-95 md:text-[16px]"
              >
                View Projects
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-9 items-center justify-center gap-[6px] rounded-[12px] border border-neutral-200 bg-white px-4 py-2 text-[14px] font-medium leading-[135%] tracking-[-0.005em] text-neutral-800 shadow-button-secondary transition-colors hover:bg-neutral-100 md:text-[16px]"
              >
                Contact Me
              </Link>
              <HeroDownloadCvButton />
            </Reveal>
          </div>
        </div>

        <div className="relative flex items-center justify-center border-neutral-100 px-5 py-5 md:p-10 lg:border-l">
          <div className="relative z-10 w-full max-w-[500px]">
            <AskMeComponent variant="hero" />
          </div>
        </div>
      </div>
    </section>
  );
}
