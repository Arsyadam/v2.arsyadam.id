"use client";
import { useEffect } from "react";

interface GistEmbedProps {
  gistUrl: string;
}

export default function GistEmbed({ gistUrl }: GistEmbedProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = gistUrl;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up script when component unmounts
      const scripts = document.querySelectorAll(`script[src="${gistUrl}"]`);
      scripts.forEach((script) => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, [gistUrl]);

  return (
    <div className="gist-container">
      <div className="loading-text text-center text-gray-500 py-8">
        Loading GitHub Gist...
      </div>
    </div>
  );
}
