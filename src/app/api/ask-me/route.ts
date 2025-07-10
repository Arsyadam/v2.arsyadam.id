import { type NextRequest, NextResponse } from "next/server"

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "https://ollama.arsyadam.id"
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "tinyllama:latest"
const OLLAMA_TIMEOUT_MS = 9000

// Context about Arsyadam for the AI to reference
const CONTEXT = `
You are an AI assistant representing Arsyadam, an award-winning AI & IoT developer from Malang, Indonesia. 

Key information about Arsyadam:
- Student at SMK Telkom Malang studying Software Engineering (2023-Present)
- Completed Data Science training at Algoritma Data Science School (2022-2023)
- General Manager of Metic Merch (2024-Present)

Major Achievements:
- 1st Place Gold Medal - FIKSI National Digital Technology Competition (Puspresnas)
- 1st Place - IoT Competition (Mage ITS)
- 1st Runner Up - National Standardization Competition (BSN)
- 3rd Place - Visual Data Competition (Ministry of Finance)
- 3rd Place - STEAM Competition (Sampoerna Academy)
- Top 10 Finalist - FedEx International Trade Challenge
- Semifinalist - Samsung Solve for Tomorrow
- 2nd Place - LKS Artificial Intelligence

Technical Skills:
- AI & Machine Learning (TensorFlow, Computer Vision)
- IoT Development (Arduino, Raspberry Pi)
- Data Analytics and Visualization
- Web Development (React, Next.js)
- Python Programming
- React Native Mobile Development

Notable Projects:
- Revive: AI & IoT-Based Textile Waste Management System (FIKSI winner)
- Moklet.org: News Portal for SMK Telkom Malang organizations

Answer questions about Arsyadam's experience, skills, projects, and background in a helpful and informative way. Keep responses concise but comprehensive. your pov as asistant is Arsyad Ali Mahardika when answer, use i am, me to point to arsyad ali mahardika
`

// Define types for better type safety
interface OllamaResponse {
  response: string
  model: string
  created_at: string
  done: boolean
}

interface OllamaResult {
  success: boolean
  data?: OllamaResponse
  error?: string
}

interface ApiResponse {
  answer: string
  timestamp: string
  mode: "ollama" | "fallback"
  model?: string
  note?: string
  error?: string
}

// Fallback responses when Ollama is not available
const FALLBACK_RESPONSES: Record<string, string> = {
  achievements:
    "Arsyadam has won multiple prestigious awards including 1st Place Gold Medal at FIKSI National Digital Technology Competition, 1st Place at IoT Competition (Mage ITS), and several other national competitions in AI, IoT, and data visualization.",
  projects:
    "Arsyadam's notable projects include 'Revive' - an AI & IoT-Based Textile Waste Management System that won the FIKSI competition, and 'Moklet.org' - a news portal for SMK Telkom Malang organizations.",
  skills:
    "Arsyadam specializes in AI & Machine Learning (TensorFlow, Computer Vision), IoT Development (Arduino, Raspberry Pi), Data Analytics, Web Development (React, Next.js), Python Programming, and React Native Mobile Development.",
  education:
    "Arsyadam is currently a student at SMK Telkom Malang studying Software Engineering (2023-Present) and completed Data Science training at Algoritma Data Science School (2022-2023).",
  fiksi:
    "FIKSI (Festival Inovasi dan Kewirausahaan Siswa Indonesia) is a national competition where Arsyadam won 1st Place Gold Medal for the 'Revive' project - an AI & IoT-Based Textile Waste Management System.",
  default:
    "I'm Arsyadam's AI assistant. While my full AI server is currently offline, I can tell you that Arsyadam is an award-winning AI & IoT developer from Malang, Indonesia, with multiple national competition wins including FIKSI Gold Medal. Feel free to ask about achievements, projects, skills, or education!",
}

function getFallbackResponse(question: string): string {
  const q = question.toLowerCase()

  if (q.includes("achievement") || q.includes("award") || q.includes("competition") || q.includes("win")) {
    return FALLBACK_RESPONSES.achievements
  }
  if (q.includes("project") || q.includes("revive") || q.includes("moklet")) {
    return FALLBACK_RESPONSES.projects
  }
  if (
    q.includes("skill") ||
    q.includes("technology") ||
    q.includes("programming") ||
    q.includes("ai") ||
    q.includes("iot")
  ) {
    return FALLBACK_RESPONSES.skills
  }
  if (q.includes("education") || q.includes("school") || q.includes("study")) {
    return FALLBACK_RESPONSES.education
  }
  if (q.includes("fiksi")) {
    return FALLBACK_RESPONSES.fiksi
  }

  return FALLBACK_RESPONSES.default
}

async function queryOllama(question: string): Promise<OllamaResult> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), OLLAMA_TIMEOUT_MS)

    const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
         prompt: `${CONTEXT}\n\nQuestion: ${question}\n\nProvide a direct, concise answer (maximum 200 tokens). Format the answer using Markdown with headings, bold, italic, and emojis where appropriate. End with a complete thought:`,
        stream: false,
        options: {
          temperature: 0.6,
          top_p: 0.8,
          num_predict: 200,
          stop_sequences: [".", "!", "?"],
          stop_on_eos: true
        },
      }),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`Ollama server returned ${response.status}`)
    }

    const data = await response.json() as OllamaResponse
    return { success: true, data }
  } catch (error) {
    console.error("Error connecting to Ollama:", error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error connecting to Ollama" 
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    let body: { question?: string }
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 })
    }

    const { question } = body
    if (!question || typeof question !== "string") {
      return NextResponse.json({ error: "Question is required and must be a string" }, { status: 400 })
    }

    // Always try to connect to Ollama server first
    console.log(`Attempting to connect to Ollama at: ${OLLAMA_BASE_URL}`)
    const ollamaResult = await queryOllama(question)

    if (ollamaResult.success && ollamaResult.data) {
      const response: ApiResponse = {
        answer: ollamaResult.data.response || "I couldn't generate a proper response.",
        timestamp: new Date().toISOString(),
        mode: "ollama",
        model: OLLAMA_MODEL,
      }
      return NextResponse.json(response)
    } else {
      // If Ollama fails, use fallback
      console.log("Ollama connection failed, using fallback response")
      const fallbackAnswer = getFallbackResponse(question)

      const response: ApiResponse = {
        answer: fallbackAnswer,
        timestamp: new Date().toISOString(),
        mode: "fallback",
        note: "Ollama server is currently unavailable. Using fallback response.",
        error: ollamaResult.error
      }
      return NextResponse.json(response)
    }
  } catch (error) {
    console.error("Unexpected error in ask-me API:", error)

    // Even in case of unexpected errors, provide a fallback
    const response: ApiResponse = {
      answer: FALLBACK_RESPONSES.default,
      timestamp: new Date().toISOString(),
      mode: "fallback",
      error: "Unexpected error occurred",
    }
    return NextResponse.json(response)
  }
}