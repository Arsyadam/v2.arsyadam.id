import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, ArrowRight } from "lucide-react";
import PageShell from "../../components/PageShell";
import PageSection from "../../components/PageSection";
import {
  extractImageFromContent,
  getRecommendations,
  getAllPosts,
  getPostBySlug,
} from "../components/PostData";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return { title: "Post Not Found" };
  }
  return {
    title: post.title,
    description: post.content.replace(/<[^>]+>/g, "").slice(0, 160),
    openGraph: {
      title: post.title,
      type: "article",
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getAllPosts();
  const recommendedPosts = getRecommendations(post, allPosts, 3);
  const imgSrc = extractImageFromContent(post.content);

  return (
    <PageShell>
      <PageSection>
        <article className="w-full max-w-[720px]">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-[14px] font-medium text-red-600 transition-colors hover:text-red-700"
          >
            <ArrowLeft className="size-4" />
            Back to all articles
          </Link>

          <header className="mb-8 flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2 text-[13px] text-neutral-500">
              <Calendar className="size-3.5" />
              <span>{formatDate(post.pubDate)}</span>
              <span>·</span>
              <span>By {post.creator}</span>
            </div>

            <h1 className="font-fraunces text-[32px] font-semibold leading-[110%] tracking-[-0.01em] text-neutral-800 md:text-[40px]">
              {post.title}
            </h1>

            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <span
                    key={category}
                    className="rounded-lg border border-neutral-200 bg-white px-2.5 py-1 text-[12px] font-medium text-neutral-700 shadow-button-secondary"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}

            {imgSrc && (
              <div className="relative mt-2 aspect-video overflow-hidden rounded-2xl border border-neutral-200">
                <Image
                  src={imgSrc}
                  alt={post.title}
                  fill
                  className="object-cover"
                  unoptimized
                  priority
                />
              </div>
            )}
          </header>

          <div
            className="prose prose-neutral max-w-none prose-headings:font-fraunces prose-headings:text-neutral-800 prose-a:text-red-600"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-10 border-t border-neutral-200 pt-8">
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-9 items-center gap-2 rounded-[12px] bg-gradient-to-t from-neutral-900 to-neutral-600 px-4 text-[14px] font-medium text-white shadow-button transition-[filter,background-color,box-shadow] hover:from-neutral-950 hover:to-neutral-700"
            >
              Read on Medium
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </article>
      </PageSection>

      {recommendedPosts.length > 0 && (
        <PageSection
          badge="More"
          title="Recommended Reading"
          className="bg-white/75"
        >
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recommendedPosts.map((recommendedPost) => {
              const recImg = extractImageFromContent(recommendedPost.content);
              return (
                <Link
                  key={recommendedPost.guid}
                  href={`/blog/${recommendedPost.slug}`}
                  className="group overflow-hidden rounded-xl border border-black/5 bg-white transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-video overflow-hidden bg-neutral-100">
                    {recImg ? (
                      <Image
                        src={recImg}
                        alt={recommendedPost.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[13px] text-neutral-400">
                        No preview
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="mb-1 text-[12px] text-neutral-400">
                      {formatDate(recommendedPost.pubDate)}
                    </p>
                    <h3 className="line-clamp-2 text-[15px] font-medium text-neutral-800 group-hover:text-red-700">
                      {recommendedPost.title}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </PageSection>
      )}
    </PageShell>
  );
}
