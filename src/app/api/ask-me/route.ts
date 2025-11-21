import { type NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";

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
`;

// Define types for better type safety
interface ApiResponse {
  answer: string;
  timestamp: string;
  model: string;
}

// Validate environment variables
function validateEnv(): { apiKey: string; model: string } {
  const apiKey = process.env.AI_GATEWAY_API_KEY;
  const model = process.env.AI_MODEL;

  if (!apiKey) {
    throw new Error("AI_GATEWAY_API_KEY environment variable is not set");
  }
  if (!model) {
    throw new Error("AI_MODEL environment variable is not set");
  }

  return { apiKey, model };
}

async function queryAI(question: string): Promise<string> {
  const { model } = validateEnv();

  const { text } = await generateText({
    model: model,
    system: CONTEXT,
    prompt: `Question: ${question}\n\nProvide a clear, direct answer based on the context above. Keep it brief but complete. Use Markdown formatting with bold for emphasis.`,
    maxTokens: 200,
    temperature: 0.3,
    topP: 0.9,
  });

  return text;
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    let body: { question?: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const { question } = body;
    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { error: "Question is required and must be a string" },
        { status: 400 }
      );
    }

    // Query AI via Vercel Gateway
    console.log(`Querying AI with question: ${question}`);
    const answer = await queryAI(question);

    const { model } = validateEnv();
    const response: ApiResponse = {
      answer: answer || "I couldn't generate a proper response.",
      timestamp: new Date().toISOString(),
      model: model,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in ask-me API:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate response",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
