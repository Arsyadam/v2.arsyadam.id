import { notFound } from "next/navigation";
import { getProjectBySlug, getProjectSlugs } from "../lib/showcase";
import ProjectDetail from "../components/ProjectDetail";
import Link from "next/link";
// Generate static paths for all projects
export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each project page
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  return {
    title: `${project.title} | Arsyadam's Portfolio`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Arsyadam's Portfolio`,
      description: project.description,
      images: [{ url: project.image }],
    },
  };
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white pt-34">
      <ProjectDetail project={project} />

      <div className="max-w-4xl mx-auto px-4 py-10 border-t border-slate-200 mt-16">
        <h2 className="text-2xl font-bold mb-4">More Projects</h2>
        <p className="text-slate-600">
          Want to see more of my work?{" "}
          <Link
            href="/showcase"
            className="text-red-600 hover:text-red-800 font-medium"
          >
            View all projects
          </Link>{" "}
          or
          <Link
            href="/contact"
            className="text-red-600 hover:text-red-800 font-medium ml-1"
          >
            contact me
          </Link>{" "}
          to discuss how we can work together.
        </p>
      </div>
    </div>
  );
}
