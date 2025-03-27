"use client"
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { extractImageFromContent, getRecommendations, getAllPosts, getPostBySlug } from "@/app/blog/components/PostData";


type Post = {
  guid: string;
  categories?: string[];
  pubDate: string;
  title: string;
  link: string;
  content: string;
  creator: string;
  slug: string;
};


export default function Page() {
  const params = useParams();
  const { slug } = params;
  const [postData, setPostData] = useState<Post | null>(null);
  const [allPostsData, setAllPosts] = useState<Post[]>([]);
  useEffect(() => {
    if (slug) {
      async function Fetching() {
      const post = await getPostBySlug(slug);
        const allPosts = await getAllPosts();
        setPostData(post)
        setAllPosts(allPosts);
      }
      Fetching();
    }
  }, [slug])

  if (!postData) {
    notFound();
  }
  const recommendedPosts = getRecommendations(postData, allPostsData, 3);

  return (
    <div className="container mx-auto px-4 py-8 mt-25 md:mt-15">
      <main className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-block mb-6 text-red-600 hover:underline"
        >
          ← Back to all posts
        </Link>
        <article>
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {postData?.title}
            </h1>
            <div className="flex flex-col sm:flex-row sm:justify-between text-gray-600">
              <div>By {postData?.creator}</div>
              <div>
                {new Date(postData?.pubDate).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>
            {postData?.categories?.length ? (
              <div className="flex flex-wrap gap-2 mt-4">
                {postData?.categories.map((category, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {category}
                  </span>
                ))}
              </div>
            ) : null}
            {(() => {
              const imgSrc = extractImageFromContent(postData?.content);
              return imgSrc ? (
                <div className="mt-4">
                  <Image
                    className="w-full h-96 object-cover rounded-xl"
                    alt={postData?.title}
                    src={imgSrc}
                    width={1000}
                    height={500}
                    unoptimized
                  />
                </div>
              ) : null;
            })()}
          </header>

          <div
            className="prose prose-slate max-w-none mt-6 text-gray-500"
            dangerouslySetInnerHTML={{ __html: postData?.content }}
          />

          {/* Recommended Reading */}
          {recommendedPosts.length > 0 && (
            <div className="mt-16 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold mb-6">Recommended Reading</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {recommendedPosts.map((recommendedPost) => {
                  const imgSrc = extractImageFromContent(
                    recommendedPost.content
                  );
                  return (
                    <div key={recommendedPost.guid} className="flex flex-col">
                      <Link href={`/blog/${recommendedPost.slug}`}>
                        <div className="group">
                          <div className="overflow-hidden rounded-lg mb-3 aspect-video">
                            {imgSrc ? (
                              <Image
                                src={imgSrc}
                                alt={recommendedPost.title}
                                width={400}
                                height={225}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                unoptimized
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-400">No image</span>
                              </div>
                            )}
                          </div>
                          <h3 className="font-semibold text-lg group-hover:text-red-600 transition-colors">
                            {recommendedPost.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {new Date(
                              recommendedPost.pubDate
                            ).toLocaleDateString("en-US", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </article>
      </main>
    </div>
  );
}
