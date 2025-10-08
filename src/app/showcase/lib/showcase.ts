import { readdir, readFile } from 'fs/promises'
import { join } from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

interface NotebookCell {
  cell_type: string
  source: string | string[]
  metadata?: Record<string, unknown>
  outputs?: Array<{
    output_type: string
    text?: string | string[]
    data?: Record<string, unknown>
  }>
}

interface NotebookFile {
  cells: NotebookCell[]
  metadata?: Record<string, unknown>
  nbformat?: number
  nbformat_minor?: number
}

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
  type: 'markdown' | 'notebook'
  notebookData?: NotebookFile
}

// Configure marked for better HTML output
marked.setOptions({
  breaks: true,
  gfm: true,
})

// Helper function to extract text from notebook cell source
function extractCellSource(source: string | string[]): string {
  if (Array.isArray(source)) {
    return source.join('')
  }
  return source
}

// Parse notebook file and extract project metadata
async function parseNotebookFile(notebookContent: string, filename: string): Promise<Project | null> {
  try {
    const notebook: NotebookFile = JSON.parse(notebookContent)
    
    // Look for metadata in the first markdown cell
    let projectMeta: Record<string, unknown> = {}
    let metadataFound = false
    
    // Check the first cell for frontmatter
    if (notebook.cells.length > 0) {
      const firstCell = notebook.cells[0]
      if (firstCell.cell_type === 'markdown') {
        const cellSource = extractCellSource(firstCell.source)
        
        if (cellSource.includes('---') || cellSource.includes('title:')) {
          try {
            // Try to parse as YAML frontmatter using gray-matter
            const { data } = matter(cellSource)
            projectMeta = { ...data }
            metadataFound = true
          } catch {
            // Fallback: parse as simple key: value pairs
            const lines = cellSource.split('\n')
            for (const line of lines) {
              if (line.includes(':') && !line.startsWith('---')) {
                const [key, ...valueParts] = line.split(':')
                if (key && valueParts.length > 0) {
                  let value = valueParts.join(':').trim()
                  // Remove quotes if present
                  value = value.replace(/^["']|["']$/g, '')
                  // Parse arrays
                  if (value.startsWith('[') && value.endsWith(']')) {
                    try {
                      value = JSON.parse(value)
                    } catch {
                      // Keep as string if JSON parse fails
                    }
                  }
                  if (key.trim() && value) {
                    projectMeta[key.trim().toLowerCase()] = value
                  }
                }
              }
            }
            metadataFound = true
          }
        }
      }
    }
    
    if (!metadataFound) {
      console.warn(`No metadata found in notebook ${filename}`)
      return null
    }
    
    // Validate required fields
    const title = projectMeta.title as string
    const description = projectMeta.description as string
    const image = projectMeta.image as string
    const technologies = projectMeta.technologies as string | string[]
    const date = projectMeta.date as string
    
    if (!title || !description || !image || !technologies || !date) {
      console.warn(`Missing required metadata in notebook ${filename}`)
      return null
    }
    
    // Process technologies
    let techArray: string[] = []
    if (Array.isArray(technologies)) {
      techArray = technologies.map(String)
    } else if (typeof technologies === 'string') {
      techArray = technologies.split(',').map(t => t.trim()).filter(Boolean)
    }
    
    const slug = filename.replace(/\.(md|ipynb)$/, '')
    
    // Determine category based on technologies
    let category = 'Data Science'
    const techLower = techArray.map(t => t.toLowerCase())
    
    if (techLower.some(tech => 
      tech.includes('ai') || 
      tech.includes('tensorflow') || 
      tech.includes('pytorch') ||
      tech.includes('machine learning') ||
      tech.includes('deep learning') ||
      tech.includes('computer vision') ||
      tech.includes('nlp')
    )) {
      category = 'AI/ML'
    } else if (techLower.some(tech => 
      tech.includes('data') ||
      tech.includes('pandas') ||
      tech.includes('numpy') ||
      tech.includes('jupyter') ||
      tech.includes('analysis')
    )) {
      category = 'Data Science'
    } else if (techLower.some(tech => 
      tech.includes('react') || 
      tech.includes('next') ||
      tech.includes('vue') ||
      tech.includes('angular') ||
      tech.includes('web')
    )) {
      category = 'Web Development'
    }
    
    // Create simple content preview from notebook
    const contentCells: string[] = []
    notebook.cells.forEach((cell, index) => {
      if (index === 0 && metadataFound) return // Skip metadata cell
      
      const cellSource = extractCellSource(cell.source)
      if (cell.cell_type === 'markdown') {
        contentCells.push(cellSource)
      } else if (cell.cell_type === 'code') {
        contentCells.push(`\`\`\`python\n${cellSource}\n\`\`\``)
      }
    })
    
    const markdownContent = contentCells.join('\n\n')
    const htmlContent = await marked.parse(markdownContent)
    
    return {
      slug,
      title,
      description,
      image,
      gif: projectMeta.gif as string,
      technologies: techArray,
      githubUrl: projectMeta.github as string,
      liveUrl: projectMeta.url as string,
      content: htmlContent,
      category,
      date,
      type: 'notebook',
      notebookData: notebook
    }
  } catch (error) {
    console.error(`Error parsing notebook ${filename}:`, error)
    return null
  }
}

// Read project files from the data/showcase directory
async function readProjectFiles(): Promise<Project[]> {
  const projects: Project[] = []
  
  try {
    const showcaseDir = join(process.cwd(), 'data', 'showcase')
    
    let filenames: string[] = []
    try {
      filenames = await readdir(showcaseDir)
      filenames = filenames.filter(name => name.endsWith('.md') || name.endsWith('.ipynb'))
    } catch (dirError) {
      console.warn('Could not read directory, falling back to known files:', dirError)
      filenames = ['moklet-org.md', 'revive.md']
    }
    
    for (const filename of filenames) {
      try {
        const filePath = join(showcaseDir, filename)
        
        let fileContent: string
        try {
          fileContent = await readFile(filePath, 'utf8')
        } catch (readError) {
          console.warn(`Could not read file ${filePath}:`, readError)
          continue
        }
        
        if (filename.endsWith('.ipynb')) {
          // Process Jupyter notebook
          const project = await parseNotebookFile(fileContent, filename)
          if (project) {
            projects.push(project)
          }
        } else {
          // Process markdown file
          const { data: frontmatter, content: markdownContent } = matter(fileContent)

          // Validate required fields
          const requiredFields = ['title', 'description', 'image', 'technologies', 'date']
          for (const field of requiredFields) {
            if (!frontmatter[field]) {
              throw new Error(`Missing required frontmatter field: ${field}`)
            }
          }

          // Process technologies
          let technologies: string[] = []
          if (Array.isArray(frontmatter.technologies)) {
            technologies = frontmatter.technologies.map(String)
          } else if (typeof frontmatter.technologies === "string") {
            try {
              const parsed = JSON.parse(frontmatter.technologies)
              technologies = Array.isArray(parsed) ? parsed.map(String) : [frontmatter.technologies]
            } catch {
              const techString = String(frontmatter.technologies)
              technologies = techString
                .replace(/[[\]]/g, "")
                .split(",")
                .map((t: string) => t.trim().replace(/^"|"$/g, ""))
                .filter(Boolean)
            }
          }

          const slug = filename.replace(".md", "")

          // Determine category
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
            type: 'markdown'
          })
        }
      } catch (error) {
        console.error(`Error parsing ${filename}:`, error)
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