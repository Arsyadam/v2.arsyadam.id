import { fetchMediumFeed, slugFromTitle } from "../medium-rss";

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
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// @ts-expect-error: Prevent usage of `any` type
export async function getPostBySlug(slug: uknown): Promise<Post | null> {
  try {
    const feed = await fetchMediumFeed();

    const feedItem = feed.items.find((item) => slugFromTitle(item.title) === slug);

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
export async function getAllPosts(): Promise<Post[]> {
  try {
    const feed = await fetchMediumFeed();

    return feed.items.map((item) => ({
      title: item.title || "Untitled",
      link: item.link || "",
      content: item.content || item["content:encoded"] || "",
      pubDate: item.pubDate || new Date().toISOString(),
      creator: item.creator || "Unknown Author",
      categories: item.categories || [],
      guid: item.guid || item.link || "",
      slug: slugFromTitle(item.title),
    }));
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    return [];
  }
}

// Helper: get recommended posts
export function getRecommendations(
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
export function extractImageFromContent(content: string) {
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