import Parser from "rss-parser";

const MEDIUM_FEED_URL = "https://medium.com/feed/@arsyadam";

const parser = new Parser({
  customFields: {
    item: ["content:encoded"],
  },
});

export async function fetchMediumFeed() {
  const res = await fetch(MEDIUM_FEED_URL, { next: { revalidate: 3600 } });

  if (!res.ok) {
    throw new Error(`Failed to fetch Medium feed: ${res.status}`);
  }

  return parser.parseString(await res.text());
}

export function slugFromTitle(title?: string | null): string {
  if (!title) return "";
  return title
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "-")
    .toLowerCase();
}
