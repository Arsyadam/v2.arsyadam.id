"use client"

import { useState, useEffect } from "react"
import { RefreshCw, AlertCircle, CheckCircle, Clock, Server } from "lucide-react"

interface DiagnosticResult {
  test: string
  status: "success" | "failed" | "warning"
  message: string
  details?: Record<string, unknown>
  timestamp: string
}

interface DiagnosticResponse {
  summary: {
    server: string
    totalTests: number
    successful: number
    failed: number
    overallStatus: string
    timestamp: string
  }
  diagnostics: DiagnosticResult[]
  recommendations: string[]
}

export default function DebugOllamaPage() {
  const [diagnostics, setDiagnostics] = useState<DiagnosticResponse | null>(null)
  const [loading, setLoading] = useState(false)

  const runDiagnostics = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/debug-ollama")
      const data = await response.json()
      setDiagnostics(data)
    } catch (error) {
      console.error("Failed to run diagnostics:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    runDiagnostics()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "failed":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "warning":
        return <Clock className="h-5 w-5 text-yellow-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-green-600 bg-green-50 border-green-200"
      case "partial":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "unhealthy":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Server className="h-8 w-8 text-red-600" />
            <h1 className="text-3xl font-bold text-gray-900">Ollama Server Diagnostics</h1>
          </div>
          <p className="text-lg text-gray-600">
            Comprehensive testing of your Ollama server connectivity and functionality
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Diagnostic Tests</h2>
            <button
              onClick={runDiagnostics}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Running..." : "Run Tests"}
            </button>
          </div>

          {diagnostics && (
            <>
              {/* Summary */}
              <div className={`p-4 rounded-lg border mb-6 ${getStatusColor(diagnostics.summary.overallStatus)}`}>
                <div className="flex items-center gap-2 mb-2">
                  {getStatusIcon(diagnostics.summary.overallStatus)}
                  <h3 className="font-semibold">Overall Status: {diagnostics.summary.overallStatus.toUpperCase()}</h3>
                </div>
                <p className="text-sm">
                  Server: {diagnostics.summary.server} | Tests: {diagnostics.summary.successful}/
                  {diagnostics.summary.totalTests} passed
                </p>
                <p className="text-xs mt-1">Last tested: {new Date(diagnostics.summary.timestamp).toLocaleString()}</p>
              </div>

              {/* Individual Tests */}
              <div className="space-y-4 mb-6">
                {diagnostics.diagnostics.map((test, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(test.status)}
                      <h4 className="font-medium">{test.test}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{test.message}</p>
                    {test.details && (
                      <details className="text-xs">
                        <summary className="cursor-pointer text-gray-500 hover:text-gray-700">View Details</summary>
                        <pre className="mt-2 p-2 bg-gray-100 rounded overflow-x-auto">
                          {JSON.stringify(test.details, null, 2)}
                        </pre>
                      </details>
                    )}
                  </div>
                ))}
              </div>

              {/* Recommendations */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-3">Recommendations</h3>
                <ul className="space-y-2">
                  {diagnostics.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm text-blue-800">
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {loading && (
            <div className="text-center py-8">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto text-red-600 mb-2" />
              <p className="text-gray-600">Running comprehensive diagnostics...</p>
            </div>
          )}
        </div>

        {/* Common Issues Guide */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-4">Common Issues & Solutions</h3>
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-medium text-red-600">❌ DNS Resolution Failed</h4>
              <p className="text-gray-600">
                Your domain `ollama.arsyadam.id` is not resolving. Check your DNS settings and ensure the A record
                points to your server&apos;s IP address.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-red-600">❌ HTTP Connectivity Failed</h4>
              <p className="text-gray-600">
                Your server is not reachable. Ensure Ollama is running, your firewall allows connections, and your
                server is accessible from the internet.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-yellow-600">⚠️ CORS Issues</h4>
              <p className="text-gray-600">
                Add CORS headers to your Ollama server or reverse proxy. You need to allow requests from v0.dev and
                other domains.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-yellow-600">⚠️ SSL Certificate Issues</h4>
              <p className="text-gray-600">
                Ensure your SSL certificate is valid and properly configured for `ollama.arsyadam.id`.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
