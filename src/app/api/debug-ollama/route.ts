import { NextResponse } from "next/server"

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "https://ollama.arsyadam.id"
interface DiagnosticResult {
  test: string
  status: "success" | "failed" | "warning"
  message: string
  details?: unknown
  timestamp: string
}

async function testWithTimeout(
  testName: string,
  testFn: () => Promise<unknown>,
  timeout = 10000,
): Promise<DiagnosticResult> {
  const startTime = Date.now()

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    const result = await Promise.race([
      testFn(),
      new Promise((_, reject) => setTimeout(() => reject(new Error(`Timeout after ${timeout}ms`)), timeout)),
    ])

    clearTimeout(timeoutId)
    const duration = Date.now() - startTime

    return {
      test: testName,
      status: "success",
      message: `✅ Success (${duration}ms)`,
      details: result,
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    const duration = Date.now() - startTime
    return {
      test: testName,
      status: "failed",
      message: `❌ Failed (${duration}ms): ${error instanceof Error ? error.message : "Unknown error"}`,
      details: error,
      timestamp: new Date().toISOString(),
    }
  }
}

export async function GET() {
  const diagnostics: DiagnosticResult[] = []

  console.log(`🔍 Starting Ollama diagnostics for: ${OLLAMA_BASE_URL}`)

  // Test 1: Basic DNS/Domain Resolution
  diagnostics.push(
    await testWithTimeout(
      "DNS Resolution",
      async () => {
        const url = new URL(OLLAMA_BASE_URL)
        const response = await fetch(`https://dns.google/resolve?name=${url.hostname}&type=A`)
        const data = await response.json() as { Answer?: Array<{ name: string; type: number; TTL: number; data: string }> }
        return {
          hostname: url.hostname,
          resolved: !!data.Answer && data.Answer.length > 0,
          answers: data.Answer,
        }
      },
      5000,
    ),
  )

  // Test 2: Basic HTTP Connectivity
  diagnostics.push(
    await testWithTimeout(
      "HTTP Connectivity",
      async () => {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 8000)

        const response = await fetch(OLLAMA_BASE_URL, {
          method: "GET",
          signal: controller.signal,
          headers: {
            "User-Agent": "Ollama-Diagnostic/1.0",
          },
        })

        clearTimeout(timeoutId)

        return {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          url: response.url,
        }
      },
      10000,
    ),
  )

  // Test 3: Ollama API Tags Endpoint
  diagnostics.push(
    await testWithTimeout(
      "Ollama API - Tags",
      async () => {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000)

        const response = await fetch(`${OLLAMA_BASE_URL}/api/tags`, {
          method: "GET",
          signal: controller.signal,
          headers: {
            Accept: "application/json",
            "User-Agent": "Ollama-Diagnostic/1.0",
          },
        })

        clearTimeout(timeoutId)

        const contentType = response.headers.get("content-type") || ""
        let responseData: unknown

        if (contentType.includes("application/json")) {
          responseData = await response.json()
        } else {
          responseData = await response.text()
        }

        return {
          status: response.status,
          statusText: response.statusText,
          contentType,
          data: responseData,
        }
      },
      12000,
    ),
  )

  // Test 4: Ollama API Version
  diagnostics.push(
    await testWithTimeout(
      "Ollama API - Version",
      async () => {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 8000)

        const response = await fetch(`${OLLAMA_BASE_URL}/api/version`, {
          method: "GET",
          signal: controller.signal,
          headers: {
            Accept: "application/json",
            "User-Agent": "Ollama-Diagnostic/1.0",
          },
        })

        clearTimeout(timeoutId)

        const data = await response.json() as { version?: string }
        return {
          status: response.status,
          version: data,
        }
      },
      8000,
    ),
  )

  // Test 5: CORS Headers Check
  diagnostics.push(
    await testWithTimeout(
      "CORS Headers",
      async () => {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 8000)

        const response = await fetch(`${OLLAMA_BASE_URL}/api/tags`, {
          method: "OPTIONS",
          signal: controller.signal,
          headers: {
            Origin: "https://v0.dev",
            "Access-Control-Request-Method": "POST",
            "Access-Control-Request-Headers": "Content-Type",
          },
        })

        clearTimeout(timeoutId)

        return {
          status: response.status,
          corsHeaders: {
            "access-control-allow-origin": response.headers.get("access-control-allow-origin"),
            "access-control-allow-methods": response.headers.get("access-control-allow-methods"),
            "access-control-allow-headers": response.headers.get("access-control-allow-headers"),
            "access-control-max-age": response.headers.get("access-control-max-age"),
          },
        }
      },
      8000,
    ),
  )

  // Test 6: SSL Certificate Check
  diagnostics.push(
    await testWithTimeout(
      "SSL Certificate",
      async () => {
        if (!OLLAMA_BASE_URL.startsWith("https://")) {
          return { message: "Not using HTTPS", secure: false }
        }

        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)

        const response = await fetch(OLLAMA_BASE_URL, {
          method: "HEAD",
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        return {
          secure: true,
          status: response.status,
          protocol: "HTTPS",
        }
      },
      6000,
    ),
  )

  // Test 7: Simple Generation Test
  diagnostics.push(
    await testWithTimeout(
      "Generation Test",
      async () => {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 30000)

        const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
          method: "POST",
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "User-Agent": "Ollama-Diagnostic/1.0",
          },
          body: JSON.stringify({
            model: "tinyllama:latest",
            prompt: "Hello, respond with just 'Hi'",
            stream: false,
            options: {
              num_predict: 10,
            },
          }),
        })

        clearTimeout(timeoutId)

        const data = await response.json() as { response?: string; error?: string }
        return {
          status: response.status,
          response: data,
        }
      },
      35000,
    ),
  )

  // Summary
  const successCount = diagnostics.filter((d) => d.status === "success").length
  const failedCount = diagnostics.filter((d) => d.status === "failed").length

  const summary = {
    totalTests: diagnostics.length,
    successful: successCount,
    failed: failedCount,
    overallStatus: failedCount === 0 ? "healthy" : failedCount < diagnostics.length ? "partial" : "unhealthy",
    timestamp: new Date().toISOString(),
  }

  console.log(`🏁 Diagnostics complete: ${successCount}/${diagnostics.length} tests passed`)

  return NextResponse.json({
    summary,
    diagnostics,
    recommendations: generateRecommendations(diagnostics),
  })
}

function generateRecommendations(diagnostics: DiagnosticResult[]): string[] {
  const recommendations: string[] = []

  const dnsTest = diagnostics.find((d) => d.test === "DNS Resolution")
  const httpTest = diagnostics.find((d) => d.test === "HTTP Connectivity")
  const tagsTest = diagnostics.find((d) => d.test === "Ollama API - Tags")
  const corsTest = diagnostics.find((d) => d.test === "CORS Headers")
  const sslTest = diagnostics.find((d) => d.test === "SSL Certificate")
  const genTest = diagnostics.find((d) => d.test === "Generation Test")

  if (dnsTest?.status === "failed") {
    recommendations.push("❌ DNS Resolution failed - Check if your domain is properly configured")
  }

  if (httpTest?.status === "failed") {
    recommendations.push("❌ HTTP connection failed - Your server might be offline or not accessible from the internet")
  }

  if (tagsTest?.status === "failed") {
    recommendations.push("❌ Ollama API not responding - Check if Ollama is running and accessible on the correct port")
  }

  if (corsTest?.status === "failed" || !corsTest?.details || 
      typeof corsTest.details === 'object' && corsTest.details !== null && 
      !('corsHeaders' in corsTest.details && 
        corsTest.details.corsHeaders && 
        typeof corsTest.details.corsHeaders === 'object' && 
        'access-control-allow-origin' in corsTest.details.corsHeaders)) {
    recommendations.push("⚠️ CORS not configured - Add CORS headers to allow requests from v0.dev and other domains")
  }

  if (sslTest?.status === "failed") {
    recommendations.push("⚠️ SSL issues detected - Check your HTTPS certificate configuration")
  }

  if (genTest?.status === "failed") {
    recommendations.push("❌ Generation test failed - Check if your model is loaded and Ollama is functioning properly")
  }

  if (recommendations.length === 0) {
    recommendations.push("✅ All tests passed! Your Ollama server appears to be working correctly.")
  }

  return recommendations
}