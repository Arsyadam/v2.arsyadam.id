"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface BlogPost {
  guid: string;
  title: string;
  content: string;
  creator: string;
  pubDate: string;
  slug: string;
  link: string;
}

export default function BlogPage({
  initialPosts = [],
}: {
  initialPosts: BlogPost[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);
  const inputRef = useRef<HTMLInputElement>(null);

  // Live search with debounce for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!searchTerm.trim()) {
        setFilteredPosts(initialPosts);
        return;
      }

      const searchResults = initialPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (post.content &&
            post.content.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (post.creator &&
            post.creator.toLowerCase().includes(searchTerm.toLowerCase()))
      );

      setFilteredPosts(searchResults);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchTerm, initialPosts]);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      setFilteredPosts(initialPosts);
      return;
    }

    const searchResults = initialPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.content &&
          post.content.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (post.creator &&
          post.creator.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    setFilteredPosts(searchResults);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto pt-20 md:pt-32 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Get Latest Updates
          </h2>
          <div className="text-sm sm:text-base md:text-lg text-slate-700 max-w-3xl mx-auto px-4">
            Get to know more about me, get tips and new perspective
          </div>
        </div>

        <form className="w-full max-w-md mx-auto mb-6" onSubmit={handleSearch}>
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <input
              ref={inputRef}
              type="search"
              id="default-search"
              className="block w-full p-3 sm:p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-red-500 focus:border-red-500"
              placeholder="Search Blog Content"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="text-white absolute end-2 sm:end-2.5 bottom-2 sm:bottom-2.5 bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 sm:px-4 py-2"
            >
              Search
            </button>
          </div>
        </form>

        {filteredPosts.length === 0 && searchTerm.trim() !== "" && (
          <div className="mt-6 mb-8 text-gray-600 px-4 text-center">
            No posts found matching &quot;{searchTerm}&quot;. Try a different
            search term.
          </div>
        )}

        <Link
          href="https://medium.com/@arsyadam"
          className="flex items-center font-[Fira_Code] text-sm sm:text-base mb-8 px-4"
        >
          Powered by{" "}
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Medium_%28website%29_logo.svg"
            alt="Medium logo"
            className="mx-2 sm:mx-3"
            width={80}
            height={16}
          />
        </Link>

        <div
          id="experience"
          className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
        >
          {/* Mobile Layout */}
          <div className="block md:hidden">
            {filteredPosts.map((post) => (
              <div
                key={post.guid}
                className="mb-8 p-4 sm:p-6 border border-gray-200 rounded-lg bg-white shadow-sm"
              >
                <div className="mb-3">
                  <div className="flex items-center text-gray-400 text-xs mb-2">
                    <span className="mr-2">
                      {new Date(post.pubDate).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span>By {post.creator}</span>
                  </div>
                  <h3 className="font-semibold text-lg sm:text-xl mb-2 text-left">
                    {post.title}
                  </h3>
                  <div
                    className="text-gray-700 text-sm sm:text-base mb-4 line-clamp-3 text-left"
                    dangerouslySetInnerHTML={{
                      __html: post.content.substring(0, 150) + "...",
                    }}
                  />
                  <Link
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-4 focus:outline-none focus:ring-2 bg-red-50 text-red-600 hover:bg-red-200 hover:text-red-700 focus:ring-red-500"
                  >
                    Read more
                    <svg
                      className="overflow-visible ml-2 text-red-300 group-hover:text-red-400"
                      width="3"
                      height="6"
                      viewBox="0 0 3 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M0 0L3 3L0 6"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Timeline Layout */}
          <div className="hidden md:block relative pl-4 lg:pl-8 mt-6">
            <div className="flex">
              <ol className="relative border-r-2 lg:border-r-3 border-gray-200">
                {filteredPosts.map((post) => (
                  <li
                    key={post.guid}
                    className="mb-8 lg:mb-37 ml-6 lg:ml-8 pt-4 min-h-[80px] lg:min-h-[100px] items-center flex"
                  >
                    <div className="pr-4 lg:pr-6 hidden lg:block">
                      <div className="text-gray-400 text-xs w-32 lg:w-40">
                        {new Date(post.pubDate).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                    <div className="absolute w-4 h-4 lg:w-5 lg:h-5 bg-white rounded-full -right-2 lg:-right-2.5 border-2 lg:border-3 border-slate-300"></div>
                  </li>
                ))}
              </ol>
              <ol className="text-left ml-4 lg:ml-6 flex-1">
                {filteredPosts.map((post) => (
                  <li
                    key={post.guid}
                    className="mb-8 lg:mb-10 pt-4 pr-4 lg:pr-8"
                  >
                    <div className="pb-3">
                      <div className="flex items-center text-gray-400 text-xs mb-2">
                        <span className="lg:hidden mr-2">
                          {new Date(post.pubDate).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        <span>By {post.creator}</span>
                      </div>
                      <h3 className="font-semibold text-lg lg:text-xl mb-2">
                        {post.title}
                      </h3>
                      <div
                        className="text-gray-700 text-sm lg:text-base mb-4 line-clamp-2 lg:line-clamp-3 max-w-prose"
                        dangerouslySetInnerHTML={{
                          __html: post.content.substring(0, 150) + "...",
                        }}
                      />
                      <Link
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center h-9 lg:h-10 rounded-full text-sm font-semibold whitespace-nowrap px-3 lg:px-4 focus:outline-none focus:ring-2 bg-red-50 text-red-600 hover:bg-red-200 hover:text-red-700 focus:ring-red-500"
                      >
                        Read more
                        <span className="sr-only">, {post.title}</span>
                        <svg
                          className="overflow-visible ml-2 lg:ml-3 text-red-300 group-hover:text-red-400"
                          width="3"
                          height="6"
                          viewBox="0 0 3 6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M0 0L3 3L0 6"></path>
                        </svg>
                      </Link>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
