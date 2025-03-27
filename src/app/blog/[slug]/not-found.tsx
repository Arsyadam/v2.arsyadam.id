import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h2 className="text-3xl font-bold mb-4">Blog Post Not Found</h2>
      <p className="mb-8">
        The blog post you&apos;re looking for doesn&apos;t exist or may have
        been removed.
      </p>
      <Link
        href="/blog"
        className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Back to Blog
      </Link>
    </div>
  );
}
