"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Play, X } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { perspectiveVideos } from "../../data/featured-media";
import type { BlogPostPreview } from "./HomeBlogSection";

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function HomePerspectivesSection({
  posts,
}: {
  posts: BlogPostPreview[];
}) {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const activeVideo = perspectiveVideos.find((v) => v.id === activeVideoId);

  return (
    <section
      id="perspectives"
      className="relative flex w-full items-center justify-center overflow-hidden bg-transparent px-5 py-10 md:px-10 md:py-[60px] lg:py-[80px]"
    >
      <div className="relative z-10 flex w-full max-w-[1200px] flex-col items-center gap-10 md:gap-12">
        <SectionHeader
          badge="Perspectives"
          title="Writing & Video"
          transitCrossing
          description="Podcasts, project stories on YouTube, and long-form articles on Medium."
        />

        <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-wide text-red-600">
              Video & Podcast
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {perspectiveVideos.map((video) => (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => setActiveVideoId(video.id)}
                  className="group overflow-hidden rounded-xl border border-black/5 bg-white text-left shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      unoptimized
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="flex size-10 items-center justify-center rounded-full bg-white/90">
                        <Play className="ml-0.5 size-4 text-red-600" fill="currentColor" />
                      </span>
                    </div>
                    {video.duration && (
                      <span className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-0.5 text-[11px] text-white">
                        {video.duration}
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="line-clamp-2 text-[14px] font-medium text-neutral-800 group-hover:text-red-700">
                      {video.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-wide text-red-600">
              Medium
            </h3>
            <div className="flex flex-col gap-3">
              {posts.length === 0 ? (
                <p className="text-sm text-neutral-500">No articles yet.</p>
              ) : (
                posts.map((post) => {
                  const excerpt = stripHtml(post.content).slice(0, 120);
                  return (
                    <a
                      key={post.slug || post.link}
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group rounded-xl border border-black/5 bg-white p-4 transition-shadow hover:shadow-md"
                    >
                      <div className="mb-2 flex items-center gap-2 text-[12px] text-neutral-400">
                        <Calendar className="size-3.5" />
                        {formatDate(post.pubDate)}
                      </div>
                      <h4 className="mb-1 text-[15px] font-medium text-neutral-800 group-hover:text-red-700">
                        {post.title}
                      </h4>
                      <p className="line-clamp-2 text-[13px] text-neutral-500">
                        {excerpt}
                        {excerpt.length >= 120 ? "..." : ""}
                      </p>
                      <span className="mt-2 inline-flex items-center gap-1 text-[12px] font-medium text-red-600">
                        medium.com
                        <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </a>
                  );
                })
              )}
            </div>
            <Link
              href="/blog"
              className="mt-4 inline-flex items-center gap-2 text-[13px] font-medium text-neutral-600 hover:text-neutral-900"
            >
              All articles on Medium
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-xl bg-white">
            <button
              type="button"
              onClick={() => setActiveVideoId(null)}
              className="absolute right-4 top-4 z-10 flex size-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
              aria-label="Close video"
            >
              <X className="size-4" />
            </button>
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`}
                title={activeVideo.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-neutral-900">{activeVideo.title}</h3>
              <p className="mt-1 text-sm text-neutral-500">{activeVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
