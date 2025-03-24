"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Showcase } from "../../types";
import { ExternalLink, Eye } from "lucide-react";

interface ProjectCardProps {
  project: Showcase;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="rounded-2xl bg-slate-50 p-5 mb-3 mx-3 transform transition-all duration-300 hover:-translate-y-2"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Link href={`/showcase/${project.slug}`}>
        <div className="overflow-hidden rounded-xl">
          <div className="relative h-48 w-full">
            {isHovering ? (
              <Image
                className="h-48 w-full object-cover rounded-xl"
                width={1000}
                height={1000}
                alt={project.title}
                src={project.gif}
                priority
              />
            ) : (
              <Image
                className="h-48 w-full object-cover rounded-xl"
                width={1000}
                height={1000}
                alt={project.title}
                src={project.image}
                priority
              />
            )}

            {isHovering && (
              <div className="absolute inset-0 flex items-center justify-center transition-all duration-300">
                <div className="bg-white/30 rounded-full p-3">
                  <Eye className="h-6 w-6 text-red-500" />
                </div>
              </div>
            )}
          </div>
          <div className="text-start pt-5">
            <h2 className="font-medium text-lg">{project.title}</h2>
            <h3 className="text-slate-600 text-sm">{project.description}</h3>
            <div className="flex items-center text-red-500 text-xs font-medium mt-2">
              <span>View details</span>
              <ExternalLink className="h-3 w-3 ml-1" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
