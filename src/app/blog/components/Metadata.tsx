// import { getPostBySlug } from "../services/blog";

// export async function generateMetadata({ params }: {params: Promise<{slug: string}>}) {
//   const post = await getPostBySlug(params?.slug);
//   if (!post) {
//     return { title: "Post Not Found" };
//   }
//   return {
//     title: post.title,
//     description: `Article by ${post.creator}`,
//   };
// }