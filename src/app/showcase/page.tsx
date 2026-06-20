import { getAllProjects } from "./lib/showcase";
import { sortProjectsByFeaturedOrder } from "./lib/project-order";
import ProjectCard from "./components/ProjectCard";
import MediaModal from "./components/MediaModal";
import { Metadata } from "next";
import { featuredMedia } from "../data/featured-media";
import PageShell from "../components/PageShell";
import PageSection from "../components/PageSection";

export const metadata: Metadata = {
  title: "Showcase - Project Portfolio AI & IoT",
  description:
    "Portfolio proyek AI, Machine Learning, IoT, dan Web Development oleh Arsyad Ali Mahardika. Termasuk Revive (Juara FIKSI Puspresnas), Moklet.org, dan proyek AI lainnya.",
  openGraph: {
    title: "Showcase - Project Portfolio Arsyad Ali Mahardika",
    description:
      "Portfolio proyek AI, Machine Learning, IoT, dan Web Development. Termasuk proyek pemenang FIKSI Puspresnas.",
    type: "website",
  },
};

export default async function ShowcasePage() {
  const projects = await getAllProjects();
  const validProjects = sortProjectsByFeaturedOrder(
    Array.isArray(projects) ? projects : []
  );

  return (
    <PageShell>
      <PageSection
        badge="Projects"
        title="Projects & Solutions"
        description="AI, data, and software projects from smart mobility at Transjakarta to platforms built for schools and enterprises."
      >
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {validProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </PageSection>

      <PageSection
        badge="Media"
        title="Watch My Journey"
        description="YouTube videos, podcasts, and behind-the-scenes content from competitions and projects."
        className="bg-white/75"
      >
        <MediaModal featuredMedia={featuredMedia} />
      </PageSection>
    </PageShell>
  );
}
