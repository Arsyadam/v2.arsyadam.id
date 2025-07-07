import { readdir, readFile } from 'fs/promises'
import { join } from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

export interface Project {
  slug: string
  title: string
  description: string
  image: string
  gif?: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  content: string
  category: string
  date: string
}


// Configure marked for better HTML output
marked.setOptions({
  breaks: true,
  gfm: true,
})

// Read markdown files from the data/showcase directory
async function readProjectFiles(): Promise<Project[]> {
  const projects: Project[] = []
  
  try {
    // Use process.cwd() to get the project root directory
    const showcaseDir = join(process.cwd(), 'data', 'showcase')
    
    // Try to read directory contents
    let filenames: string[] = []
    try {
      filenames = await readdir(showcaseDir)
      // Filter for markdown files
      filenames = filenames.filter(name => name.endsWith('.md'))
    } catch (dirError) {
      console.warn('Could not read directory, falling back to known files:', dirError)
      // Fallback to known files if directory reading fails
      filenames = ['moklet-org.md', 'revive.md']
    }
    
    for (const filename of filenames) {
      try {
        const filePath = join(showcaseDir, filename)
        
        // Read file content
        let fileContent: string
        try {
          fileContent = await readFile(filePath, 'utf8')
        } catch (readError) {
          console.warn(`Could not read file ${filePath}:`, readError)
          continue
        }
        
        // Parse frontmatter and content using gray-matter
        const { data: frontmatter, content: markdownContent } = matter(fileContent)

        // Validate required fields exist
        const requiredFields = ['title', 'description', 'image', 'technologies', 'date']
        for (const field of requiredFields) {
          if (!frontmatter[field]) {
            throw new Error(`Missing required frontmatter field: ${field}`)
          }
        }

        // Ensure technologies is always an array
        let technologies: string[] = []
        
        if (Array.isArray(frontmatter.technologies)) {
          technologies = frontmatter.technologies.map(String)
        } else if (typeof frontmatter.technologies === "string") {
          // Try to parse as JSON array first
          try {
            const parsed = JSON.parse(frontmatter.technologies)
            technologies = Array.isArray(parsed) ? parsed.map(String) : [frontmatter.technologies]
          } catch {
            // Fallback: treat as comma-separated string
            const techString = String(frontmatter.technologies)
            technologies = techString
              .replace(/[[\]]/g, "")
              .split(",")
              .map((t: string) => t.trim().replace(/^"|"$/g, ""))
              .filter(Boolean)
          }
        }

        const slug = filename.replace(".md", "")

        // Determine category based on technologies
        let category = "Web Development"
        const techLower = technologies.map(t => t.toLowerCase())
        
        if (techLower.some(tech => 
          tech.includes("ai") || 
          tech.includes("tensorflow") || 
          tech.includes("iot") ||
          tech.includes("machine learning") ||
          tech.includes("computer vision")
        )) {
          category = "AI/IoT"
        } else if (techLower.some(tech => 
          tech.includes("react") || 
          tech.includes("next") ||
          tech.includes("vue") ||
          tech.includes("angular") ||
          tech.includes("web")
        )) {
          category = "Web Development"
        } else if (techLower.some(tech => 
          tech.includes("mobile") ||
          tech.includes("react native") ||
          tech.includes("flutter") ||
          tech.includes("ios") ||
          tech.includes("android")
        )) {
          category = "Mobile Development"
        }

        // Convert markdown to HTML using marked
        const htmlContent = await marked.parse(markdownContent)

        projects.push({
          slug,
          title: frontmatter.title,
          description: frontmatter.description,
          image: frontmatter.image,
          gif: frontmatter.gif,
          technologies,
          githubUrl: frontmatter.github,
          liveUrl: frontmatter.url,
          content: htmlContent,
          category,
          date: frontmatter.date,
        })
      } catch (error) {
        console.error(`Error parsing ${filename}:`, error)
        // Continue with other files if one fails
      }
    }
  } catch (error) {
    console.error('Error reading project files:', error)
  }

  return projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getAllProjects(): Promise<Project[]> {
  return await readProjectFiles()
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await readProjectFiles()
  return projects.find((project) => project.slug === slug) || null
}

export async function getProjectSlugs(): Promise<string[]> {
  const projects = await readProjectFiles()
  return projects.map((project) => project.slug)
}

export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  const projects = await getAllProjects()
  return projects.slice(0, limit)
}

export async function getProjectsByCategory(category: string): Promise<Project[]> {
  const projects = await getAllProjects()
  return projects.filter((project) => project.category === category)
}