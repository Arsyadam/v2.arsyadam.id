import { getBlogPosts } from "./utils"; // Create this utility function
import BlogPage from "./components/BlogPage"; // Import the client component

export default async function BlogPageWrapper() {
  const posts = await getBlogPosts();
  return <BlogPage initialPosts={posts} />;
}
