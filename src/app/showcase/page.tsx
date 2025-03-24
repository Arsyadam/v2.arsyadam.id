import { getAllProjects } from "../utils/showcase";
import ProjectCard from "./components/ProjectCard";
import { Sparkles, Code, Palette } from "lucide-react";

export default async function ShowcasePage() {
  const projects = getAllProjects();

  return (
    <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto pt-15 md:pt-45 px-4 ">
      <div className="text-sm my-5 font-bold uppercase text-red-500 flex items-center gap-2">
        <Sparkles className="h-4 w-4" /> SHOWCASE
      </div>

      <h2 className="text-4xl md:text-5xl font-bold max-w-2xl">
        Turn Ideas into Impact with Arsyadam&apos;s Portfolio.
      </h2>

      <div className="text-md text-slate-700 max-w-lg text-center pt-4">
        No, it won&apos;t rewrite history — but it can redefine the future
        through groundbreaking solutions.
      </div>

      <div className="flex justify-center gap-12 mt-8 mb-12">
        <div className="flex flex-col items-center">
          <div className="bg-red-100 p-3 rounded-full mb-2">
            <Code className="h-6 w-6 text-red-600" />
          </div>
          <span className="text-sm font-medium">Clean Code</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-red-100 p-3 rounded-full mb-2">
            <Palette className="h-6 w-6 text-red-600" />
          </div>
          <span className="text-sm font-medium">Modern Design</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-red-100 p-3 rounded-full mb-2">
            <Sparkles className="h-6 w-6 text-red-600" />
          </div>
          <span className="text-sm font-medium">Innovative Solutions</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
