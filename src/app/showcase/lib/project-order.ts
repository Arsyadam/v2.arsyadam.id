import type { Project } from "./showcase";

export const FEATURED_PROJECT_SLUGS = [
  "tara-ai-transjakarta",
  "yumindo-ai",
  "moklet-org",
  "sure-finance",
  "yumindo-erp",
  "notulenize",
] as const;

export function pickFeaturedProjects(projects: Project[]): Project[] {
  const bySlug = new Map(projects.map((p) => [p.slug, p]));
  return FEATURED_PROJECT_SLUGS.map((slug) => bySlug.get(slug)).filter(
    Boolean
  ) as Project[];
}

export function sortProjectsByFeaturedOrder(projects: Project[]): Project[] {
  const bySlug = new Map(projects.map((p) => [p.slug, p]));
  const featured = FEATURED_PROJECT_SLUGS.map((slug) => bySlug.get(slug)).filter(
    Boolean
  ) as Project[];
  const rest = projects
    .filter(
      (p) =>
        !FEATURED_PROJECT_SLUGS.includes(
          p.slug as (typeof FEATURED_PROJECT_SLUGS)[number]
        )
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return [...featured, ...rest];
}
