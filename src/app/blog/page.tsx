import { getBlogPosts } from "./utils"; // Create this utility function
import BlogPage from "./components/BlogPage"; // Import the client component

// Revalidate every 3600 seconds (1 hour)
export const revalidate = 3600;

export default async function BlogPageWrapper() {
  const posts = await getBlogPosts();
  return <BlogPage initialPosts={posts} />;
}
