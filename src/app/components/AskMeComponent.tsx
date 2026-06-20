"use client";

import type React from "react";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Loader2, Info } from "lucide-react";
import MastraLogo from "./MastraLogo";

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

interface AskMeComponentProps {
  variant?: "default" | "hero";
}

const SUGGESTIONS = [
  "What are your main achievements?",
  "Tell me about the FIKSI competition",
  "What technologies do you specialize in?",
  "What projects have you worked on?",
];

const WELCOME_MESSAGE =
  "Hi! I'm Arsyadam's AI assistant. Ask me about my experience, projects, achievements, or skills.";

const BOOT_THINKING_MS = 1400;

function formatMessage(content: string) {
  return content
    .replace(/\n/g, "<br/>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, "<code>$1</code>")
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-red-500 underline">$1</a>'
    );
}

function AssistantAvatar() {
  return (
    <Image
      src="/favicon.ico"
      alt="Arsyadam"
      width={28}
      height={28}
      className="size-7 shrink-0 rounded-full border border-neutral-200 object-cover"
    />
  );
}

function ThinkingBubble({ variant }: { variant: "hero" | "default" }) {
  if (variant === "hero") {
    return (
      <div className="flex max-w-[85%] items-end gap-2">
        <AssistantAvatar />
        <div className="rounded-tl-[20px] rounded-tr-[20px] rounded-br-[20px] rounded-bl-[8px] border border-neutral-200 bg-neutral-50 px-4 py-3">
          <div className="flex items-center gap-2">
            <Loader2 className="size-4 animate-spin text-neutral-500" />
            <span className="text-[14px] text-neutral-600">Thinking...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="rounded-lg border bg-white p-3 text-gray-800">
        <div className="flex items-center gap-2">
          <Loader2 className="size-4 animate-spin" />
          <span className="text-sm">Thinking...</span>
        </div>
      </div>
    </div>
  );
}

function PoweredByMastra({ compact }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-1">
      <span className={compact ? "text-[12px] text-neutral-500" : "text-sm text-gray-500"}>
        Powered by
      </span>
      <Link
        href="https://mastra.ai"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Mastra AI"
        className="inline-flex items-center text-neutral-800 transition-opacity hover:opacity-80"
      >
        <MastraLogo className={compact ? "h-[13px] w-[5.25rem] md:h-[13px] md:w-[5.25rem]" : "h-[15px] w-[6rem] md:h-[15px] md:w-[6rem]"} />
      </Link>
    </div>
  );
}

export default function AskMeComponent({
  variant = "default",
}: AskMeComponentProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isBootThinking, setIsBootThinking] = useState(true);
  const [, setServerOnline] = useState(true);
  const [rateLimit, setRateLimit] = useState<RateLimitInfo | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isHero = variant === "hero";
  const hasUserMessages = messages.some((m) => m.type === "user");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([
        {
          type: "assistant",
          content: WELCOME_MESSAGE,
          timestamp: new Date(),
        },
      ]);
      setIsBootThinking(false);
    }, BOOT_THINKING_MS);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading, isBootThinking]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading || isBootThinking) return;

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

      interface ParsedResponse {
        message?: string;
        answer?: string;
        mode?: string;
        note?: string;
        error?: string;
        model?: string;
      }

      async function safeParse(res: Response): Promise<ParsedResponse> {
        const ct = res.headers.get("content-type") || "";
        if (ct.includes("application/json")) {
          try {
            return await res.json();
          } catch {
            // fall through
          }
        }
        const txt = await res.text();
        return { message: txt.slice(0, 400) };
      }

      const data = await safeParse(response);

      const remaining = response.headers.get("X-RateLimit-Remaining");
      const limit = response.headers.get("X-RateLimit-Limit");
      const resetTime = response.headers.get("X-RateLimit-Reset");

      if (remaining && limit && resetTime) {
        setRateLimit({
          remaining: parseInt(remaining),
          limit: parseInt(limit),
          resetTime,
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

  const renderBubble = (message: ChatMessage, index: number) => {
    const isUser = message.type === "user";

    if (isHero) {
      return (
        <div
          key={`${message.type}-${index}-${message.timestamp.getTime()}`}
          className={
            isUser
              ? "ml-auto flex max-w-[85%] flex-col items-end"
              : "flex max-w-[85%] items-end gap-2"
          }
        >
          {!isUser && <AssistantAvatar />}
          <div
            className={
              isUser
                ? "rounded-tl-[20px] rounded-tr-[20px] rounded-br-[8px] rounded-bl-[20px] border border-neutral-200 bg-neutral-50 px-4 py-3"
                : "rounded-tl-[20px] rounded-tr-[20px] rounded-br-[20px] rounded-bl-[8px] border border-neutral-200 bg-neutral-50 px-4 py-3"
            }
          >
            <div
              className="text-[14px] font-normal leading-5 text-neutral-800"
              dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
            />
            {message.note && (
              <div className="mt-2 flex items-center gap-1 text-xs text-neutral-500">
                <Info className="size-3" />
                <span>{message.note}</span>
              </div>
            )}
          </div>
          {isUser && (
            <span className="mt-1 text-[13px] font-medium leading-5 text-neutral-800">
              You
            </span>
          )}
        </div>
      );
    }

    return (
      <div
        key={`${message.type}-${index}-${message.timestamp.getTime()}`}
        className={`flex ${isUser ? "justify-end" : "justify-start"}`}
      >
        <div
          className={`max-w-[80%] p-3 rounded-lg ${
            isUser
              ? "bg-red-600 text-end text-white"
              : "bg-white text-start text-gray-800 border"
          }`}
        >
          <div
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
          />
          {message.note && (
            <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
              <Info className="size-3" />
              <span>{message.note}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (isHero) {
    return (
      <div
        className="flex h-[560px] w-full flex-col gap-2 rounded-[20px] border border-neutral-200 p-2"
        style={{
          background: "#FFFFFFCC",
          boxShadow:
            "0px 10px 10px -5px #0000000A, 0px 20px 25px -5px #00000014",
          backdropFilter: "blur(4px)",
        }}
      >
        <div className="flex min-h-0 flex-1 flex-col">
          <div
            ref={scrollRef}
            className="scrollbar-pill flex flex-1 flex-col gap-3 overflow-y-auto px-3 py-3"
          >
            {isBootThinking && <ThinkingBubble variant="hero" />}
            {messages.map(renderBubble)}
            {loading && <ThinkingBubble variant="hero" />}
          </div>

          {!hasUserMessages && !isBootThinking && (
            <div className="flex flex-wrap gap-2 px-3 pb-2">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setInput(suggestion)}
                  className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-[12px] font-medium text-neutral-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex items-center gap-2 px-3 pb-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Chat with me..."
              disabled={loading || isBootThinking}
              className="h-[42px] flex-1 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 text-[14px] leading-5 text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300 disabled:cursor-not-allowed disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={loading || isBootThinking || !input.trim()}
              aria-label="Send message"
              className="flex size-[42px] shrink-0 items-center justify-center rounded-full border border-neutral-800 text-white disabled:opacity-40"
              style={{
                background: "linear-gradient(0deg, #000000 0%, #4B5563 100%)",
              }}
            >
              {loading ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <ArrowUp className="size-5" aria-hidden="true" />
              )}
            </button>
          </form>
        </div>

        <div className="flex items-center justify-between px-3 pb-1">
          <PoweredByMastra compact />
          {rateLimit && (
            <div className="flex items-center gap-1 text-[11px] text-neutral-500">
              <Info className="size-3" />
              <span>
                {rateLimit.remaining}/{rateLimit.limit} left
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div
        ref={scrollRef}
        className="max-h-96 space-y-3 overflow-y-auto rounded-lg bg-gray-50 p-4"
      >
        {isBootThinking && <ThinkingBubble variant="default" />}
        {messages.map(renderBubble)}
        {loading && <ThinkingBubble variant="default" />}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me about my experience, projects, or skills..."
          disabled={loading || isBootThinking}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500 disabled:cursor-not-allowed disabled:bg-gray-100"
        />
        <button
          type="submit"
          disabled={loading || isBootThinking || !input.trim()}
          className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <ArrowUp className="size-4" />
          )}
        </button>
      </form>

      {!hasUserMessages && !isBootThinking && (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => setInput(suggestion)}
              className="rounded border border-gray-200 p-2 text-left text-sm text-gray-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between rounded-lg p-2">
        <PoweredByMastra />
        {rateLimit && (
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Info className="size-3" />
            <span>
              {rateLimit.remaining}/{rateLimit.limit} questions left
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
