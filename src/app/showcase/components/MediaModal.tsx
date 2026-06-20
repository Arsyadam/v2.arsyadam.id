"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Youtube, ExternalLink, Clock, Instagram, X } from "lucide-react";

interface MediaContent {
  id: string;
  type: "youtube" | "instagram";
  title: string;
  description: string;
  thumbnail: string;
  duration?: string;
  url?: string;
}

interface MediaModalProps {
  featuredMedia: MediaContent[];
}

export default function MediaModal({ featuredMedia }: MediaModalProps) {
  const [selectedMedia, setSelectedMedia] = useState<MediaContent | null>(null);

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featuredMedia.map((media) => (
          <button
            key={media.id}
            type="button"
            onClick={() => setSelectedMedia(media)}
            className="group overflow-hidden rounded-xl border border-black/5 bg-white text-left shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={media.thumbnail}
                alt={media.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="flex size-10 items-center justify-center rounded-full bg-white/90">
                  {media.type === "youtube" ? (
                    <Play className="ml-0.5 size-4 text-red-600" fill="currentColor" />
                  ) : (
                    <Instagram className="size-4 text-pink-600" />
                  )}
                </span>
              </div>
              <div className="absolute bottom-2 left-2">
                {media.type === "youtube" && media.duration && (
                  <span className="flex items-center gap-1 rounded bg-black/70 px-2 py-0.5 text-[11px] text-white">
                    <Clock className="size-3" />
                    {media.duration}
                  </span>
                )}
                {media.type === "instagram" && (
                  <span className="flex items-center gap-1 rounded bg-black/70 px-2 py-0.5 text-[11px] text-white">
                    <Instagram className="size-3" />
                    Post
                  </span>
                )}
              </div>
            </div>
            <div className="p-3">
              <p className="line-clamp-2 text-[14px] font-medium text-neutral-800 group-hover:text-red-700">
                {media.title}
              </p>
              <p className="mt-1 line-clamp-2 text-[12px] text-neutral-500">
                {media.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      <div className="flex w-full flex-wrap justify-center gap-3">
        <a
          href="https://youtube.com/@arsyadam"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 items-center gap-2 rounded-[12px] border border-neutral-200 bg-white px-4 text-[14px] font-medium text-neutral-800 shadow-button-secondary transition-colors hover:bg-neutral-50"
        >
          <Youtube className="size-4 text-red-600" />
          YouTube
        </a>
        <a
          href="https://instagram.com/arsyadam"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 items-center gap-2 rounded-[12px] border border-neutral-200 bg-white px-4 text-[14px] font-medium text-neutral-800 shadow-button-secondary transition-colors hover:bg-neutral-50"
        >
          <Instagram className="size-4 text-pink-600" />
          Instagram
        </a>
      </div>

      {selectedMedia && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-neutral-900/50 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl">
            <button
              type="button"
              onClick={() => setSelectedMedia(null)}
              className="absolute right-4 top-4 z-10 flex size-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>

            <div className="aspect-video">
              {selectedMedia.type === "youtube" ? (
                <iframe
                  src={`https://www.youtube.com/embed/${selectedMedia.id}?autoplay=1`}
                  title={selectedMedia.title}
                  className="h-full w-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              ) : (
                <iframe
                  src={`https://www.instagram.com/p/${selectedMedia.id}/embed`}
                  title={selectedMedia.title}
                  className="h-full w-full"
                  allowFullScreen
                  scrolling="no"
                />
              )}
            </div>

            <div className="p-6">
              <h3 className="mb-2 text-xl font-semibold text-neutral-800">
                {selectedMedia.title}
              </h3>
              <p className="text-[15px] text-neutral-500">{selectedMedia.description}</p>
              {selectedMedia.url && (
                <a
                  href={selectedMedia.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-[14px] font-medium text-red-600 hover:text-red-700"
                >
                  Open on {selectedMedia.type === "youtube" ? "YouTube" : "Instagram"}
                  <ExternalLink className="size-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
