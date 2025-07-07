import { NextResponse } from "next/server";

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "http://ollama.arsyadam.id";

const uptimeData = {
  startTime: Date.now(),
  totalChecks: 0,
  successfulChecks: 0,
};

export async function GET() {
  console.log(`Checking Ollama status at: ${OLLAMA_BASE_URL}`);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(`${OLLAMA_BASE_URL}/api/tags`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const isOnline = response.ok;
    uptimeData.totalChecks++;
    if (isOnline) uptimeData.successfulChecks++;

    const uptimePercentage = (uptimeData.successfulChecks / uptimeData.totalChecks) * 100;

    return NextResponse.json({
      online: isOnline,
      uptime: Math.round(uptimePercentage * 100) / 100,
      timestamp: new Date().toISOString(),
      server: OLLAMA_BASE_URL,
      checks: {
        total: uptimeData.totalChecks,
        successful: uptimeData.successfulChecks,
      },
    });
  } catch (error) {
    console.error("Ollama status check failed:", error);
    uptimeData.totalChecks++;

    const uptimePercentage = (uptimeData.successfulChecks / uptimeData.totalChecks) * 100;

    return NextResponse.json({
      online: false,
      uptime: Math.round(uptimePercentage * 100) / 100,
      timestamp: new Date().toISOString(),
      server: OLLAMA_BASE_URL,
      error: error instanceof Error ? error.message : "Connection failed",
      checks: {
        total: uptimeData.totalChecks,
        successful: uptimeData.successfulChecks,
      },
    });
  }
}
