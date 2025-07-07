"use client"

import { useState, useEffect } from "react"
import { Wifi, WifiOff, Server } from "lucide-react"

interface ServerStatusData {
  online: boolean
  uptime: number
  timestamp: string
  error?: string
}

export default function ServerStatus() {
  const [status, setStatus] = useState<ServerStatusData | null>(null)
  const [loading, setLoading] = useState(true)

  const checkStatus = async () => {
    try {
      const response = await fetch("/api/ollama-status")
      const data = await response.json()
      setStatus(data)
    } catch (error) {
      console.error("Failed to check server status:", error)
      setStatus({
        online: false,
        uptime: 0,
        timestamp: new Date().toISOString(),
        error: "Failed to connect",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkStatus()
    const interval = setInterval(checkStatus, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-gray-500">
        <Server className="h-4 w-4 animate-pulse" />
        <span className="text-sm">Checking...</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      {status?.online ? (
        <>
          <Wifi className="h-4 w-4 text-green-500" />
          <div className="text-sm">
            <span className="text-green-600 font-medium">Online</span>
            <span className="text-gray-500 ml-1">({status.uptime.toFixed(1)}% uptime)</span>
          </div>
        </>
      ) : (
        <>
          <WifiOff className="h-4 w-4 text-red-500" />
          <div className="text-sm">
            <span className="text-red-600 font-medium">Offline</span>
            <span className="text-gray-500 ml-1">({status?.uptime.toFixed(1) || 0}% uptime)</span>
          </div>
        </>
      )}
    </div>
  )
}
