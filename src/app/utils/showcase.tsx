import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// Type definitions
interface ProjectSlug {
    params: {
        slug: string;
    };
}

interface ProjectData {
    slug: string;
    title?: string;
    completionDate?: string;
    [key: string]: unknown; // For other frontmatter fields
}

interface ProjectContent extends ProjectData {
    contentHtml: string;
}

const projectsDirectory = path.join(process.cwd(), "data/showcase");

export function getAllProjectSlugs(): ProjectSlug[] {
    const fileNames = fs.readdirSync(projectsDirectory);

    return fileNames.map((fileName) => {
        return {
            params: {
                slug: fileName.replace(/\.md$/, ""),
            },
        };
    });
}

export function getAllProjects(): ProjectData[] {
    const fileNames = fs.readdirSync(projectsDirectory);

    const allProjectsData: ProjectData[] = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(projectsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const matterResult = matter(fileContents);

        return {
            slug,
            ...matterResult.data,
        };
    });

    return allProjectsData.sort((a, b) => {
        if (a.completionDate && b.completionDate && a.completionDate < b.completionDate) {
            return 1;
        } else {
            return -1;
        }
    });
}

export async function getProjectData(slug: string): Promise<ProjectContent> {
    const fullPath = path.join(projectsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);

    const contentHtml = processedContent.toString();

    return {
        slug,
        contentHtml,
        ...matterResult.data,
    };
}
