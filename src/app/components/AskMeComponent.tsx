"use client";

import type React from "react";

import { useState } from "react";
import { Send, Loader2, Info } from "lucide-react";

interface ChatMessage {
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  mode?: string;
  note?: string;
}

interface RateLimitInfo {
  remaining: number;
  limit: number;
  resetTime: string;
}

export default function AskMeComponent() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setServerOnline] = useState(true);
  const [rateLimit, setRateLimit] = useState<RateLimitInfo | null>(null);
  const [modelName, setModelName] = useState<string>("AI");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = {
      type: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/ask-me", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage.content }),
      });

      // Define response type
      interface ParsedResponse {
        message?: string;
        answer?: string;
        mode?: string;
        note?: string;
        error?: string;
        model?: string;
      }

      // Safe response parser
      async function safeParse(res: Response): Promise<ParsedResponse> {
        const ct = res.headers.get("content-type") || "";
        if (ct.includes("application/json")) {
          try {
            return await res.json();
          } catch {
            // Incorrect header — treat as text
          }
        }
        const txt = await res.text();
        return { message: txt.slice(0, 400) };
      }

      const data = await safeParse(response);

      // Update rate limit info from headers
      const remaining = response.headers.get("X-RateLimit-Remaining");
      const limit = response.headers.get("X-RateLimit-Limit");
      const resetTime = response.headers.get("X-RateLimit-Reset");

      if (remaining && limit && resetTime) {
        setRateLimit({
          remaining: parseInt(remaining),
          limit: parseInt(limit),
          resetTime: resetTime,
        });
      }

      if (!response.ok) {
        if (response.status === 503) setServerOnline(false);
        throw new Error(
          data?.message || data?.error || `Request failed ${response.status}`
        );
      }

      const assistantMessage: ChatMessage = {
        type: "assistant",
        content: data.answer || "No answer provided",
        timestamp: new Date(),
        mode: data.mode,
        note: data.note,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setServerOnline(true);

      // Extract and set model name from response
      if (data.model) {
        setModelName(data.model);
      }
    } catch (error) {
      console.error("Error asking question:", error);
      const errorMessage: ChatMessage = {
        type: "assistant",
        content:
          error instanceof Error
            ? error.message
            : "Something went wrong – please try again later.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Chat Messages */}
      {messages.length > 0 && (
        <div className="max-h-96 overflow-y-auto space-y-3 p-4 bg-gray-50 rounded-lg">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === "user"
                    ? "bg-red-600 text-end text-white"
                    : "bg-white text-start text-gray-800 border"
                }`}
              >
                <div
                  className="text-sm"
                  dangerouslySetInnerHTML={{
                    __html: message.content
                      .replace(/\n/g, "<br/>")
                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                      .replace(/\*(.*?)\*/g, "<em>$1</em>")
                      .replace(/`(.*?)`/g, "<code>$1</code>")
                      .replace(
                        /\[([^\]]+)\]\(([^)]+)\)/g,
                        '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-red-500 underline">$1</a>'
                      ),
                  }}
                />
                {message.note && (
                  <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                    <Info className="h-3 w-3" />
                    <span>{message.note}</span>
                  </div>
                )}
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 border p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me about my experience, projects, or skills..."
          disabled={loading}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </button>
      </form>

      {/* Suggestions */}
      {messages.length === 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            "What are your main achievements?",
            "Tell me about the FIKSI competition",
            "What technologies do you specialize in?",
            "What projects have you worked on?",
          ].map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setInput(suggestion)}
              className="text-left p-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded border border-gray-200 hover:border-red-200 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Info Banner */}
      <div className="flex items-center justify-between mt-1 p-2 rounded-lg text-base">
        <div className="flex items-center gap-2">
          <span className="text-gray-500 text-sm">Powered by</span>
          <span className="font-[Fira_Code] text-sm font-medium bg-red-500/10 text-red-600 px-2 py-0.5 rounded">
            {modelName}
          </span>
        </div>
        {rateLimit && (
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Info className="w-3 h-3" />
            <span>
              {rateLimit.remaining}/{rateLimit.limit} questions left
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
