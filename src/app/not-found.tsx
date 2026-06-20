import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageShell from "./components/PageShell";
import PageSection from "./components/PageSection";

export default function NotFound() {
  return (
    <PageShell withCta={false}>
      <PageSection
        badge="404"
        title="Page Not Found"
        description="The page you're looking for doesn't exist or has been moved."
      >
        <div className="flex flex-col items-center gap-6">
          <p className="font-fraunces text-[80px] font-semibold leading-none text-red-600 md:text-[120px]">
            404
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="group inline-flex h-9 items-center justify-center gap-2 rounded-[12px] bg-gradient-to-t from-neutral-900 to-neutral-600 px-4 text-[14px] font-medium text-white shadow-button transition-[filter,background-color,box-shadow] hover:from-neutral-950 hover:to-neutral-700"
            >
              Return Home
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/showcase"
              className="inline-flex h-9 items-center justify-center rounded-[12px] border border-neutral-200 bg-white px-4 text-[14px] font-medium text-neutral-800 shadow-button-secondary transition-colors hover:bg-neutral-50"
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-9 items-center justify-center rounded-[12px] border border-neutral-200 bg-white px-4 text-[14px] font-medium text-neutral-800 shadow-button-secondary transition-colors hover:bg-neutral-50"
            >
              Contact
            </Link>
          </div>
        </div>
      </PageSection>
    </PageShell>
  );
}
