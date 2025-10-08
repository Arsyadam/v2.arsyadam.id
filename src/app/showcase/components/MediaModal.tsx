"use client";

import { useState } from "react";
import { Play, Youtube, ExternalLink, Clock, Instagram, X } from "lucide-react";

interface MediaContent {
  id: string;
  type: "youtube" | "instagram";
  title: string;
  description: string;
  thumbnail: string;
  duration?: string;
  url?: string; // For Instagram posts
}

interface MediaModalProps {
  featuredMedia: MediaContent[];
}

export default function MediaModal({ featuredMedia }: MediaModalProps) {
  const [selectedMedia, setSelectedMedia] = useState<MediaContent | null>(null);

  return (
    <>
      {/* Media Content Section */}
      <div className="w-full">
        <div className="text-sm font-bold uppercase text-red-500 flex items-center justify-center gap-2 mb-4">
          <Youtube className="h-4 w-4" /> MEDIA CONTENT
        </div>

        <h3 className="text-3xl md:text-4xl font-bold mb-4">
          Watch My Journey & Behind the Scenes
        </h3>

        <p className="text-slate-700 max-w-2xl mx-auto mb-8">
          YouTube videos, Instagram posts, and behind-the-scenes content
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredMedia.map((media) => (
            <div
              key={media.id}
              onClick={() => setSelectedMedia(media)}
              className="group relative block cursor-pointer"
            >
              {/* Liquid Glass Card */}
              <div className="relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:bg-white/20">
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-blue-500/10 animate-pulse"></div>
                </div>

                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden rounded-t-xl">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${media.thumbnail})` }}
                  />

                  {/* Liquid overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                      {media.type === "youtube" ? (
                        <Play
                          className="h-5 w-5 text-white ml-0.5"
                          fill="currentColor"
                        />
                      ) : (
                        <Instagram className="h-5 w-5 text-white" />
                      )}
                    </div>
                  </div>

                  {/* Duration/Type indicator */}
                  <div className="absolute bottom-2 left-2 pointer-events-none">
                    {media.type === "youtube" && media.duration && (
                      <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {media.duration}
                      </span>
                    )}
                    {media.type === "instagram" && (
                      <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Instagram className="h-3 w-3" />
                        Post
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h4 className="font-semibold text-sm text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 mb-2">
                    {media.title}
                  </h4>

                  <p className="text-gray-600 text-xs line-clamp-2 mb-3">
                    {media.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-end">
                    <span className="inline-flex items-center gap-1 text-red-600 group-hover:text-red-700 text-xs font-medium transition-colors">
                      {media.type === "youtube" ? "Watch" : "View"}
                      <ExternalLink className="h-3 w-3" />
                    </span>
                  </div>
                </div>

                {/* Liquid border effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10 blur-sm"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="mt-8 text-center flex justify-center gap-4">
          <a
            href="https://youtube.com/@arsyadam"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-gray-900 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
          >
            <Youtube className="h-4 w-4 text-red-600" />
            YouTube
          </a>
          <a
            href="https://instagram.com/arsyadam"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-gray-900 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
          >
            <Instagram className="h-4 w-4 text-pink-600" />
            Instagram
          </a>
        </div>
      </div>

      {/* Modal for Media Player */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-white rounded-xl overflow-hidden">
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="aspect-video">
              {selectedMedia.type === "youtube" ? (
                <iframe
                  src={`https://www.youtube.com/embed/${selectedMedia.id}?autoplay=1`}
                  title={selectedMedia.title}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              ) : (
                <iframe
                  src={`https://www.instagram.com/p/${selectedMedia.id}/embed`}
                  title={selectedMedia.title}
                  className="w-full h-full"
                  allowFullScreen
                  scrolling="no"
                />
              )}
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">
                {selectedMedia.title}
              </h3>
              <p className="text-gray-600">{selectedMedia.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
