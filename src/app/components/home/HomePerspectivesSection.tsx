"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Play, X } from "lucide-react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import SectionHeader from "./SectionHeader";
import ButtonLink from "../ButtonLink";
import { perspectiveVideos } from "../../data/featured-media";
import { dispatchPerspectivesFocus } from "../../lib/transit-events";
import type { BlogPostPreview } from "./HomeBlogSection";

type SpotlightMetrics = {
  scale: number;
  opacity: number;
  flex: number;
  zIndex: number;
  pointedOut: boolean;
};

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

function getSpotlightMetrics(
  index: number,
  focus: number,
  totalItems: number
): SpotlightMetrics {
  const dist = Math.abs(focus - index);
  const w = Math.max(0, 1 - dist);
  const ease = w * w * (3 - 2 * w);
  const pointedOut = dist < 0.42;

  if (focus >= totalItems - 0.25) {
    return { scale: 1, opacity: 1, flex: 1, zIndex: 5, pointedOut: false };
  }

  return {
    scale: 0.88 + ease * 0.18,
    opacity: 0.42 + ease * 0.58,
    flex: 0.9 + ease * 3.8,
    zIndex: 1 + Math.round(ease * 22),
    pointedOut,
  };
}

function VideoCard({
  video,
  metrics,
  cardIndex,
  onPlay,
}: {
  video: (typeof perspectiveVideos)[number];
  metrics: SpotlightMetrics;
  cardIndex: number;
  onPlay: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onPlay}
      data-transit-perspectives-card
      data-card-index={cardIndex}
      style={{
        flex: metrics.flex,
        zIndex: metrics.zIndex,
        scale: metrics.scale,
        opacity: metrics.opacity,
      }}
      transition={{ type: "spring", stiffness: 420, damping: 38 }}
      className={`group relative z-10 min-w-0 origin-center overflow-hidden rounded-xl bg-white text-left shadow-sm will-change-transform ${
        metrics.pointedOut
          ? "border-2 border-red-600 ring-2 ring-red-600/20"
          : "border border-black/5"
      }`}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
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
    </motion.button>
  );
}

function ArticleCard({
  post,
  metrics,
  cardIndex,
}: {
  post: BlogPostPreview;
  metrics: SpotlightMetrics;
  cardIndex: number;
}) {
  const excerpt = stripHtml(post.content).slice(0, 120);

  return (
    <motion.div
      role="link"
      tabIndex={0}
      onClick={() => window.open(post.link, "_blank", "noopener,noreferrer")}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          window.open(post.link, "_blank", "noopener,noreferrer");
        }
      }}
      data-transit-perspectives-card
      data-card-index={cardIndex}
      style={{
        flex: metrics.flex,
        zIndex: metrics.zIndex,
        scale: metrics.scale,
        opacity: metrics.opacity,
      }}
      transition={{ type: "spring", stiffness: 420, damping: 38 }}
      className={`group relative z-10 flex min-w-0 origin-center cursor-pointer flex-col overflow-hidden rounded-xl bg-white p-4 text-left shadow-sm will-change-transform hover:shadow-md ${
        metrics.pointedOut
          ? "border-2 border-red-600 ring-2 ring-red-600/20"
          : "border border-black/5"
      }`}
    >
      <div className="mb-2 flex items-center gap-2 text-[12px] text-neutral-400">
        <Calendar className="size-3.5 shrink-0" />
        {formatDate(post.pubDate)}
      </div>
      <h4 className="mb-1 line-clamp-2 text-[15px] font-medium text-neutral-800 group-hover:text-red-700">
        {post.title}
      </h4>
      <p className="line-clamp-3 flex-1 text-[13px] text-neutral-500">
        {excerpt}
        {excerpt.length >= 120 ? "..." : ""}
      </p>
      <div className="mt-3" onClick={(e) => e.stopPropagation()}>
        <ButtonLink href={post.link} external className="h-7 text-[11px] md:text-[12px]">
          medium.com
        </ButtonLink>
      </div>
    </motion.div>
  );
}

function ScrollSpotlightSection({ posts }: { posts: BlogPostPreview[] }) {
  const containerRef = useRef<HTMLElement>(null);
  const [focus, setFocus] = useState(0);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const activeVideo = perspectiveVideos.find((v) => v.id === activeVideoId);

  const videoCount = perspectiveVideos.length;
  const postCount = posts.length;
  const totalItems = videoCount + postCount;
  // Shorter scroll span — items highlight continuously as you scroll, no long pauses.
  const scrollSpan = Math.max(totalItems * 0.55, 2.5);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const nextFocus = p * Math.max(totalItems - 1, 1);
    const activeIndex = Math.min(
      Math.max(Math.round(nextFocus), 0),
      Math.max(totalItems - 1, 0)
    );
    setFocus(nextFocus);
    dispatchPerspectivesFocus({
      inSection: p > 0.002 && p < 0.998,
      activeIndex,
      focus: nextFocus,
      scrollProgress: p,
    });
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          dispatchPerspectivesFocus({
            inSection: false,
            activeIndex: 0,
            focus: 0,
            scrollProgress: 0,
          });
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const finale = focus >= totalItems - 0.35;

  return (
    <>
      <section
        id="perspectives"
        ref={containerRef}
        style={{ height: `${scrollSpan * 100}vh` }}
        className="relative w-full"
      >
        <div className="sticky top-0 flex min-h-screen w-full items-center justify-center overflow-hidden px-5 py-12 md:px-10 md:py-14">
          <div className="relative z-10 flex w-full max-w-[1200px] flex-col items-center gap-6 md:gap-8">
            <SectionHeader
              badge="Perspectives"
              title="Writing & Video"
              description="Podcasts, project stories on YouTube, and long-form articles on Medium."
            />

            <div className="flex w-full flex-col gap-10">
              <div className="w-full">
                <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-wide text-red-600">
                  Video & Podcast
                </h3>
                <div className="flex min-h-[200px] items-stretch gap-3 md:min-h-[220px] md:gap-4">
                  {perspectiveVideos.map((video, index) => (
                    <VideoCard
                      key={video.id}
                      video={video}
                      cardIndex={index}
                      metrics={getSpotlightMetrics(index, focus, totalItems)}
                      onPlay={() => setActiveVideoId(video.id)}
                    />
                  ))}
                </div>
              </div>

              <div className="w-full">
                <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-wide text-red-600">
                  Medium
                </h3>
                {posts.length === 0 ? (
                  <p className="text-sm text-neutral-500">No articles yet.</p>
                ) : (
                  <div className="flex min-h-[160px] items-stretch gap-3 md:min-h-[180px] md:gap-4">
                    {posts.map((post, index) => (
                      <ArticleCard
                        key={post.slug || post.link}
                        post={post}
                        cardIndex={videoCount + index}
                        metrics={getSpotlightMetrics(
                          videoCount + index,
                          focus,
                          totalItems
                        )}
                      />
                    ))}
                  </div>
                )}
                <div className="mt-4">
                  <ButtonLink href="/blog">All articles on Medium</ButtonLink>
                </div>
              </div>
            </div>

            {!finale && (
              <p className="text-center text-[12px] text-neutral-400">
                Keep scrolling — each item highlights in turn
              </p>
            )}
          </div>
        </div>
      </section>

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
              <h3 className="text-lg font-semibold text-neutral-900">
                {activeVideo.title}
              </h3>
              <p className="mt-1 text-sm text-neutral-500">
                {activeVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function StaticSection({ posts }: { posts: BlogPostPreview[] }) {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const activeVideo = perspectiveVideos.find((v) => v.id === activeVideoId);

  return (
    <>
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

          <div className="flex w-full flex-col gap-10">
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
                          <Play
                            className="ml-0.5 size-4 text-red-600"
                            fill="currentColor"
                          />
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
      </section>

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
              <h3 className="text-lg font-semibold text-neutral-900">
                {activeVideo.title}
              </h3>
              <p className="mt-1 text-sm text-neutral-500">
                {activeVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function HomePerspectivesSection({
  posts,
}: {
  posts: BlogPostPreview[];
}) {
  const prefersReducedMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (prefersReducedMotion || !isDesktop) {
    return <StaticSection posts={posts} />;
  }

  return <ScrollSpotlightSection posts={posts} />;
}
