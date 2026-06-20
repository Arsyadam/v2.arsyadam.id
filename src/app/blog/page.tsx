import { getBlogPosts } from "./utils";
import BlogPage from "./components/BlogPage";
import { Metadata } from "next";
import PageShell from "../components/PageShell";
import PageSection from "../components/PageSection";

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

export const revalidate = 3600;

export default async function BlogPageWrapper() {
  const posts = await getBlogPosts();

  return (
    <PageShell>
      <PageSection
        badge="Perspectives"
        title="Writing & Perspectives"
        description="Thoughts on AI, public transport technology, and lessons from building real-world systems."
      >
        <BlogPage initialPosts={posts} />
      </PageSection>
    </PageShell>
  );
}
