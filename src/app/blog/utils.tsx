// utils.js or utils.tsx
import Parser from "rss-parser";

export async function getBlogPosts() {
  const parser = new Parser();

  try {
    // Replace this with the Medium RSS feed URL of your choice
    const feed = await parser.parseURL("https://medium.com/feed/@arsyadam");

    const posts = feed.items.map((item) => {
      // Create a slug from the title
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

    return posts;
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    return [];
  }
}
