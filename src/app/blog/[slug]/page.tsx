import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Parser from "rss-parser";
import Image from "next/image";

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

interface ScoredPost extends Post {
  score: number;
}

type Props = {
  params: {
    slug: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return { title: "Post Not Found" };
  }
  return {
    title: post.title,
    description: `Article by ${post.creator}`,
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Helper: get a single post by slug
async function getPostBySlug(slug: string): Promise<Post | null> {
  const parser = new Parser();

  try {
    const feed = await parser.parseURL("https://medium.com/feed/@arsyadam");

    const feedItem = feed.items.find((item) => {
      const itemSlug = item.title
        ? item.title
            .replace(/[^\w\s]/gi, "")
            .replace(/\s+/g, "-")
            .toLowerCase()
        : "";

      return itemSlug === slug;
    });

    if (!feedItem) {
      return null;
    }

    return {
      title: feedItem.title || "Untitled",
      link: feedItem.link || "",
      content: feedItem.content || feedItem["content:encoded"] || "",
      pubDate: feedItem.pubDate || new Date().toISOString(),
      creator: feedItem.creator || "Unknown Author",
      categories: feedItem.categories || [],
      guid: feedItem.guid || feedItem.link || "",
      slug,
    };
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    return null;
  }
}

// Helper: get all posts
async function getAllPosts(): Promise<Post[]> {
  const parser = new Parser();

  try {
    const feed = await parser.parseURL("https://medium.com/feed/@arsyadam");

    return feed.items.map((item) => {
      const slug = item.title
        ? item.title
            .replace(/[^\w\s]/gi, "")
            .replace(/\s+/g, "-")
            .toLowerCase()
        : "";

      return {
        title: item.title || "Untitled",
        link: item.link || "",
        content: item.content || item["content:encoded"] || "",
        pubDate: item.pubDate || new Date().toISOString(),
        creator: item.creator || "Unknown Author",
        categories: item.categories || [],
        guid: item.guid || item.link || "",
        slug,
      };
    });
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    return [];
  }
}

// Helper: get recommended posts
function getRecommendations(
  currentPost: Post,
  allPosts: Post[],
  max = 3
): Post[] {
  // Filter out the current post
  const otherPosts = allPosts.filter((post) => post.guid !== currentPost.guid);

  if (otherPosts.length === 0) return [];

  // If there are categories, prioritize posts with matching categories
  if (currentPost.categories && currentPost.categories.length > 0) {
    // Score posts by number of matching categories
    const scoredPosts: ScoredPost[] = otherPosts.map((post) => {
      let score = 0;

      // Check for category matches
      if (
        post.categories &&
        post.categories.length > 0 &&
        currentPost.categories
      ) {
        currentPost.categories.forEach((category) => {
          if (post.categories?.includes(category)) {
            score += 1;
          }
        });
      }

      return { ...post, score };
    });

    // Sort by score (higher first) and then by date (newer first)
    scoredPosts.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
    });

    return scoredPosts.slice(0, max);
  }

  // If no categories or no matches, return the most recent posts
  const sortedByDate = [...otherPosts].sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );

  return sortedByDate.slice(0, max);
}

// Helper: extract image from content
function extractImageFromContent(content: string) {
  const imgMatch = content.match(/<img[^>]+src="([^"]+)"/);
  if (!imgMatch || !imgMatch[1]) return null;

  const imgSrc = imgMatch[1];

  // Check if imgSrc is a valid, non-empty URL
  const isValidUrl =
    imgSrc &&
    typeof imgSrc === "string" &&
    imgSrc.trim() !== "" &&
    (imgSrc.startsWith("https://") || imgSrc.startsWith("http://"));

  return isValidUrl ? imgSrc : null;
}

export default async function Page({ params, searchParams }: Props) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getAllPosts();
  const recommendedPosts = getRecommendations(post, allPosts, 3);

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
              {post.title}
            </h1>
            <div className="flex flex-col sm:flex-row sm:justify-between text-gray-600">
              <div>By {post.creator}</div>
              <div>
                {new Date(post.pubDate).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>
            {post.categories?.length ? (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.categories.map((category, i) => (
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
              const imgSrc = extractImageFromContent(post.content);
              return imgSrc ? (
                <div className="mt-4">
                  <Image
                    className="w-full h-96 object-cover rounded-xl"
                    alt={post.title}
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
            dangerouslySetInnerHTML={{ __html: post.content }}
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
