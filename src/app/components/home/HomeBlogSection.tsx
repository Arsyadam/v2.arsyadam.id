import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import SectionHeader from "./SectionHeader";

export type BlogPostPreview = {
  title: string;
  link: string;
  content: string;
  pubDate: string;
  creator: string;
  slug: string;
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

export default function HomeBlogSection({ posts }: { posts: BlogPostPreview[] }) {
  if (posts.length === 0) return null;

  return (
    <section
      id="blog"
      className="relative flex w-full items-center justify-center overflow-hidden bg-white/80 px-5 py-10 backdrop-blur-sm md:px-10 md:py-[60px] lg:py-[80px]"
    >
      <div className="relative z-10 flex w-full max-w-[1200px] flex-col items-center gap-8 md:gap-10">
        <SectionHeader
          badge="Blog"
          title="Writing & Perspectives"
          description="Thoughts on AI, public transport technology, and lessons from building real-world systems."
        />

        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          {posts.map((post) => {
            const excerpt = stripHtml(post.content).slice(0, 140);
            return (
              <a
                key={post.slug || post.link}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-3 rounded-xl border border-black/5 bg-white p-5 transition-shadow hover:shadow-md"
                style={{
                  boxShadow:
                    "0px 4px 6px -2px rgba(0,0,0,0.04), 0px 8px 12px -4px rgba(0,0,0,0.06)",
                }}
              >
                <div className="flex items-center gap-2 text-[12px] text-neutral-400">
                  <Calendar className="size-3.5" aria-hidden="true" />
                  {formatDate(post.pubDate)}
                  <span>·</span>
                  <span>{post.creator}</span>
                </div>
                <h3 className="text-[18px] font-medium leading-snug text-neutral-800 transition-colors group-hover:text-red-700 md:text-[20px]">
                  {post.title}
                </h3>
                <p className="flex-1 text-[13px] leading-relaxed text-neutral-500">
                  {excerpt}
                  {excerpt.length >= 140 ? "…" : ""}
                </p>
                <span className="inline-flex items-center gap-1 text-[13px] font-medium text-red-600">
                  Read on Medium
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
            );
          })}
        </div>

        <Link
          href="/blog"
          className="inline-flex h-9 items-center gap-2 rounded-[12px] border border-neutral-200 bg-white px-4 text-[14px] font-medium text-neutral-800 shadow-button-secondary transition-colors hover:bg-neutral-50"
        >
          View all articles
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
