import React from "react";
import Link from "next/link";
import { Twitter, Linkedin, Github, Instagram, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left: Brand & Copyright */}
          <div className="text-center md:text-left">
            <p className="text-gray-600 text-sm flex items-center gap-1.5 justify-center md:justify-start">
              Made with{" "}
              <Heart className="w-3.5 h-3.5 text-red-500 fill-current" /> by{" "}
              <span className="font-semibold text-gray-900">
                Arsyad Ali Mahardika
              </span>
            </p>
            <p className="text-gray-400 text-xs mt-1">
              © {currentYear} All rights reserved.
            </p>
          </div>

          {/* Right: Social Links */}
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/arsyadam"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link
              href="https://linkedin.com/in/arsyadam"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link
              href="https://twitter.com/arsyadam"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </Link>
            <Link
              href="https://instagram.com/arsyadam"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
