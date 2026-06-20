"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Download, Loader2, Mail, X } from "lucide-react";

type CvDownloadDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function CvDownloadDialog({ open, onClose }: CvDownloadDialogProps) {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setEmail("");
      setStatus("idle");
      setMessage("");
    }
  }, [open]);

  if (!open || !mounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/cv-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Failed to send CV. Please try again.");
        return;
      }

      setStatus("success");
      setMessage("CV sent! Check your inbox (and spam folder).");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-dialog-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm"
        aria-label="Close dialog"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
          aria-label="Close"
        >
          <X className="size-5" />
        </button>

        <div className="mb-5 flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <Download className="size-5" />
          </span>
          <div>
            <h2 id="cv-dialog-title" className="text-lg font-semibold text-neutral-900">
              Download My CV
            </h2>
            <p className="text-sm text-neutral-500">
              Enter your email and I&apos;ll send my CV to you.
            </p>
          </div>
        </div>

        {status === "success" ? (
          <div className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800">
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="cv-email" className="mb-1.5 block text-sm font-medium text-neutral-700">
                Email address
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
                <input
                  id="cv-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-neutral-200 py-2.5 pl-10 pr-4 text-sm text-neutral-900 outline-none transition-colors focus:border-red-400 focus:ring-2 focus:ring-red-100"
                />
              </div>
            </div>

            {status === "error" && (
              <p className="text-sm text-red-600">{message}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-t from-neutral-900 to-neutral-600 px-4 text-sm font-medium text-white shadow-button transition-[filter,opacity] hover:from-neutral-950 hover:to-neutral-700 disabled:opacity-60"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Download className="size-4" />
                  Send CV to my email
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
}
