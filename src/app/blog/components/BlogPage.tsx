"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Search } from "lucide-react";

interface BlogPost {
  guid: string;
  title: string;
  content: string;
  creator: string;
  pubDate: string;
  slug: string;
  link: string;
}

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

export default function BlogPage({
  initialPosts = [],
}: {
  initialPosts: BlogPost[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!searchTerm.trim()) {
        setFilteredPosts(initialPosts);
        return;
      }

      const term = searchTerm.toLowerCase();
      setFilteredPosts(
        initialPosts.filter(
          (post) =>
            post.title.toLowerCase().includes(term) ||
            stripHtml(post.content).toLowerCase().includes(term) ||
            post.creator.toLowerCase().includes(term)
        )
      );
    }, 200);

    return () => clearTimeout(timer);
  }, [searchTerm, initialPosts]);

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search articles…"
          className="h-10 w-full rounded-xl border border-neutral-200 bg-white pl-10 pr-4 text-[14px] text-neutral-800 outline-none transition-colors focus:border-red-400 focus:ring-2 focus:ring-red-100"
        />
      </div>

      <Link
        href="https://medium.com/@arsyadam"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-[13px] text-neutral-500 transition-colors hover:text-neutral-700"
      >
        Powered by
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Medium_%28website%29_logo.svg"
          alt="Medium"
          width={72}
          height={14}
        />
      </Link>

      {filteredPosts.length === 0 && (
        <p className="text-center text-[14px] text-neutral-500">
          {searchTerm.trim()
            ? `No posts found matching "${searchTerm}".`
            : "No articles available right now."}
        </p>
      )}

      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        {filteredPosts.map((post) => {
          const excerpt = stripHtml(post.content).slice(0, 140);
          return (
            <Link
              key={post.guid}
              href={`/blog/${post.slug}`}
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
                Read article
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
