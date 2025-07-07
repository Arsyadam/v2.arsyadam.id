"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import { Showcase } from "../../types/index";
interface ProjectData {
    slug: string;
    title?: string;
    description?: string;
    completionDate?: string;
    [key: string]: unknown; // For other frontmatter fields
}

const ProjectCard = ({ project }: { project: ProjectData }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Link href={`/showcase/${project.slug}`}>
      <div
        className="rounded-2xl bg-slate-50 p-5 mb-3 mx-3 transition-all duration-300 hover:shadow-lg hover:scale-105"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="relative overflow-hidden rounded-xl">
          <Image
            className="h-48 w-80 object-cover rounded-xl transition-opacity duration-300"
            width={1000}
            height={1000}
            alt={project.title as string}
            src={isHovering ? project.gif as string : project.image as string}
            style={{
              opacity: isHovering ? 1 : 1,
            }}
          />
        </div>
        <div className="text-start pt-5">
          <h2 className="font-medium text-lg">{project.title}</h2>
          <h3 className="text-slate-600 text-sm">{project.description}</h3>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
