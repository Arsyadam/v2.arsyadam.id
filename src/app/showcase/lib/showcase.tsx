// import fs from "fs";
// import path from "path";
// import matter from "gray-matter";
// import { remark } from "remark";
// import html from "remark-html";

// interface ProjectData {
//   slug: string;
//   contentHtml?: string;
//   completionDate?: string;
//   [key: string]: unknown; // For other potential metadata fields
// }

// interface ProjectSlug {
//   params: {
//     slug: string;
//   };
// }

// const projectsDirectory = path.join(process.cwd(), "data/showcase");

// export function getAllProjectSlugs(): ProjectSlug[] {
//   const fileNames = fs.readdirSync(projectsDirectory);

//   return fileNames.map((fileName: string) => {
//     return {
//       params: {
//         slug: fileName.replace(/\.md$/, ""),
//       },
//     };
//   });
// }

// export function getAllProjects(): ProjectData[] {
//   const fileNames = fs.readdirSync(projectsDirectory);

//   const allProjectsData = fileNames.map((fileName: string) => {
//     // Remove ".md" from file name to get slug
//     const slug = fileName.replace(/\.md$/, "");

//     // Read markdown file as string
//     const fullPath = path.join(projectsDirectory, fileName);
//     const fileContents = fs.readFileSync(fullPath, "utf8");

//     // Use gray-matter to parse the project metadata section
//     const matterResult = matter(fileContents);

//     // Combine the data with the slug
//     return {
//       slug,
//       ...matterResult.data,
//     } as ProjectData;
//   });

//   // Sort projects by completion date if available
//   return allProjectsData.sort((a: ProjectData, b: ProjectData) => {
//     if (a.completionDate! < b.completionDate!) {
//       return 1;
//     } else {
//       return -1;
//     }
//   });
// }

// export async function getProjectData(slug: string): Promise<ProjectData> {
//   const fullPath = path.join(projectsDirectory, `${slug}.md`);
//   const fileContents = fs.readFileSync(fullPath, "utf8");

//   // Use gray-matter to parse the project metadata section
//   const matterResult = matter(fileContents);

//   // Use remark to convert markdown into HTML string
//   const processedContent = await remark()
//     .use(html)
//     .process(matterResult.content);

//   const contentHtml = processedContent.toString();

//   // Combine the data with the slug and contentHtml
//   return {
//     slug,
//     contentHtml,
//     ...matterResult.data,
//   } as ProjectData;
// }
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Showcase } from "../../types/index";

const projectsDirectory = path.join(process.cwd(), "data/showcase");

export function getProjectSlugs() {
  return fs
    .readdirSync(projectsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getProjectBySlug(slug: string): Showcase {
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

export function getAllProjects(): Showcase[] {
  const slugs = getProjectSlugs();
  const projects = slugs
    .map((slug) => getProjectBySlug(slug))
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return projects;
}
