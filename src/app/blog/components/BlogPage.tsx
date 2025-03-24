"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface BlogPost {
  guid: string;
  title: string;
  content: string;
  creator: string;
  pubDate: string;
  slug: string;
}

// Client component for search functionality
export default function BlogPage({
  initialPosts = [],
}: {
  initialPosts: BlogPost[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);

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
      <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto pt-30 md:pt-45">
        <h2 className="text-3xl font-bold">Get Latest Updates</h2>
        <div className="text-md text-slate-700 max-w-3xl text-center">
          Get to know more about me, get tips and new perspective
        </div>

        <form className="max-w-md mx-auto mt-5" onSubmit={handleSearch}>
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-96 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-red-500 focus:border-red-500"
              placeholder="Search Blog Content"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              Search
            </button>
          </div>
        </form>

        {filteredPosts.length === 0 && searchTerm.trim() !== "" && (
          <div className="mt-8 text-gray-600">
            No posts found matching &quot;{searchTerm}&quot;. Try a different
            search term.
          </div>
        )}

        <Link
          href="https://medium.com/@arsyadam"
          className="flex font-[Fira_Code] mt-3"
        >
          Powered by{" "}
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Medium_%28website%29_logo.svg"
            alt="Medium logo"
            className="mx-3"
            width={100}
            height={20}
          />
        </Link>

        <div id="experience" className="container mx-auto max-w-6xl mt-20 px-4">
          <div className="relative pl-8 mt-6 flex">
            <ol className="relative border-r-3 border-gray-200">
              {filteredPosts.map((post) => (
                <li
                  key={post.guid}
                  className="mb-10 ml-8 pt-4 h-30 items-center flex "
                >
                  <div className="pr-3 hidden sm:block">
                    <div className="text-gray-400 text-xs w-40">
                      {new Date(post.pubDate).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                  <div className="absolute w-5 h-5 bg-white rounded-full -right-3.5 border-3 border-slate-300"></div>
                </li>
              ))}
            </ol>
            <ol className="text-left mr-3">
              {filteredPosts.map((post) => (
                <li key={post.guid} className="mb-10 ml-8 pt-4 h-30">
                  <div className="pb-3">
                    <div className="flex items-center text-gray-400 text-xs mb-1">
                      <span className="sm:hidden mr-2">
                        {new Date(post.pubDate).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <span>By {post.creator}</span>
                    </div>
                    <h3 className="font-semibold text-lg">{post.title}</h3>
                    <div
                      className="text-gray-700 text-sm mt-1 line-clamp-2 max-w-prose"
                      dangerouslySetInnerHTML={{
                        __html: post.content.substring(0, 150) + "...",
                      }}
                    />
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group mt-3 inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-red-50 text-red-600 hover:bg-red-200 hover:text-red-700 focus:ring-red-500"
                    >
                      Read more
                      <span className="sr-only">
                        , utility-first fundamentals
                      </span>
                      <svg
                        className="overflow-visible ml-3 text-red-300 group-hover:text-red-400"
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
    </>
  );
}
