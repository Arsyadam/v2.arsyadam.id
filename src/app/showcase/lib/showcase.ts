
"use server"
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Showcase } from "../../types/index";

const projectsDirectory = path.join(process.cwd(), "data/showcase");

export async function getProjectSlugs() {
  return fs
    .readdirSync(projectsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}
// @ts-expect-error: Prevent usage of `any` type
export async function getProjectBySlug(slug: uknown): Showcase {
  const fullPath = path.join(projectsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title,
    description: data.description,
    image: data.image,
    gif: data.gif,
    content,
    technologies: data.technologies || [],
    date: data.date,
    url: data.url || null,
    github: data.github || null,
  };
}

export async function getAllProjects() {
  const slugs = await getProjectSlugs();
  const projects = slugs
    .map((slug) => getProjectBySlug(slug))
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return projects;
}
