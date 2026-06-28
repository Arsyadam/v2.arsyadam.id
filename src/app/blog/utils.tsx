import { fetchMediumFeed, slugFromTitle } from "./medium-rss";

export async function getBlogPosts() {
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
