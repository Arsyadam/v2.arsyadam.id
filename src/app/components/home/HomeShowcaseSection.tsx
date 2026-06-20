import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import ProjectCard from "../../showcase/components/ProjectCard";
import type { Project } from "../../showcase/lib/showcase";

export default function HomeShowcaseSection({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <section
      id="showcase"
      className="relative flex w-full items-center justify-center overflow-hidden bg-transparent px-5 py-10 md:px-10 md:py-[60px] lg:py-[80px]"
    >
      <div className="relative z-10 flex w-full max-w-[1200px] flex-col items-center gap-8 md:gap-10">
        <SectionHeader
          badge="Projects"
          title="Projects & Solutions"
          description="AI, data, and software projects from smart mobility at Transjakarta to platforms built for schools and enterprises."
        />

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <Link
          href="/showcase"
          className="inline-flex h-9 items-center gap-2 rounded-[12px] border border-neutral-200 bg-white px-4 text-[14px] font-medium text-neutral-800 shadow-button-secondary transition-colors hover:bg-neutral-50"
        >
          View full showcase
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
