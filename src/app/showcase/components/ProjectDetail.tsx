"use client";

import Image from "next/image";
import Link from "next/link";
import { Showcase } from "../../types/index";
import { Github, ExternalLink, ArrowLeft, Calendar } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import GistEmbed from "../../components/GistEmbed";

function CustomMarkdownRenderer({ content }: { content: string }) {
  const renderContent = () => {
    const gistRegex = /<GistEmbed gistUrl="([^"]*)" \/>/g;
    const parts = content.split(gistRegex);

    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <GistEmbed key={index} gistUrl={part} />;
      }

      return (
        <MDEditor.Markdown
          key={index}
          source={part}
          style={{
            backgroundColor: "transparent",
            color: "inherit",
          }}
        />
      );
    });
  };

  return <div>{renderContent()}</div>;
}

interface ProjectDetailProps {
  project: Showcase;
}

function formatProjectDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const imageSrc = project.gif || project.image;

  return (
    <article className="w-full">
      <section className="relative flex w-full items-center justify-center px-5 py-10 md:px-10 md:py-[60px] lg:py-[80px]">
        <div className="flex w-full max-w-[1200px] flex-col gap-8 md:gap-10">
          <Link
            href="/showcase"
            className="inline-flex w-fit items-center gap-2 text-[14px] font-medium text-red-600 transition-colors hover:text-red-700"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to Projects
          </Link>

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-gradient-to-br from-neutral-50 via-white to-red-50/40">
              <div className="pointer-events-none absolute inset-0 hero-dot-grid opacity-40" />
              <div className="relative flex aspect-[4/3] items-center justify-center p-8 md:p-10">
                <Image
                  src={imageSrc}
                  alt={project.title}
                  width={480}
                  height={360}
                  className="max-h-full w-auto object-contain"
                  priority
                />
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <span className="text-[12px] font-medium leading-[135%] tracking-[-0.005em] text-red-600 md:text-[14px]">
                  Showcase
                </span>
                <h1 className="font-fraunces text-[32px] font-semibold leading-[105%] tracking-[-0.01em] text-neutral-800 md:text-[40px] lg:text-[44px]">
                  {project.title}
                </h1>
                <p className="text-[15px] leading-[160%] tracking-[-0.005em] text-neutral-600 md:text-[16px]">
                  {project.description}
                </p>
              </div>

              <div className="flex items-center gap-2 text-[14px] text-neutral-500">
                <Calendar className="size-4" aria-hidden="true" />
                <span>{formatProjectDate(project.date)}</span>
              </div>

              {project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-[13px] font-medium text-neutral-800 shadow-button-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {(project.github || project.url) && (
                <div className="flex flex-wrap gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 items-center justify-center gap-2 rounded-[12px] border border-neutral-200 bg-white px-4 py-2 text-[14px] font-medium text-neutral-800 shadow-button-secondary transition-colors hover:bg-neutral-100"
                    >
                      <Github className="size-4" aria-hidden="true" />
                      View Code
                    </a>
                  )}

                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex h-9 items-center justify-center gap-2 rounded-[12px] bg-gradient-to-t from-neutral-900 to-neutral-600 px-4 py-2 text-[14px] font-medium text-white shadow-button transition-[filter,background-color,box-shadow] hover:from-neutral-950 hover:to-neutral-700 hover:shadow-button-hover active:brightness-95"
                    >
                      <ExternalLink className="size-4" aria-hidden="true" />
                      Live Demo
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {project.content.trim() && (
        <section className="relative flex w-full items-center justify-center bg-white/80 px-5 py-10 backdrop-blur-sm md:px-10 md:py-[60px]">
          <div
            className="prose prose-neutral max-w-[720px] prose-headings:font-fraunces prose-headings:text-neutral-800 prose-a:text-red-600 prose-strong:text-neutral-800"
            data-color-mode="light"
          >
            <CustomMarkdownRenderer content={project.content} />
          </div>
        </section>
      )}
    </article>
  );
}
