import { notFound } from "next/navigation";
import { getProjectBySlug, getProjectSlugs } from "../lib/showcase";
import ProjectDetail from "../components/ProjectDetail";
import Link from "next/link";

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
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

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  // Ensure project has all required properties for Showcase type
  const showcaseProject = {
    ...project,
    gif: project.gif || "", // Provide a default empty string if gif is undefined
  };

  return (
    <div className="min-h-screen bg-white pt-34">
      <ProjectDetail project={showcaseProject} />
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
