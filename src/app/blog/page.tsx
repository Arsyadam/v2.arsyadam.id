import { getBlogPosts } from "./utils"; // Create this utility function
import BlogPage from "./components/BlogPage"; // Import the client component
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Arsyad Ali Mahardika",
  description:
    "Blog dan artikel tentang AI, Machine Learning, Deep Learning, Computer Vision, IoT, dan teknologi terkini oleh Arsyad Ali Mahardika.",
  openGraph: {
    title: "Blog - Arsyad Ali Mahardika",
    description: "Artikel tentang AI, Machine Learning, dan teknologi terkini.",
    type: "website",
  },
};

// Revalidate every 3600 seconds (1 hour)
export const revalidate = 3600;

export default async function BlogPageWrapper() {
  const posts = await getBlogPosts();
  return <BlogPage initialPosts={posts} />;
}
