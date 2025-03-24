import React from "react";
import Link from "next/link";
import { Twitter, Linkedin, Github, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-red-700 to-red-500 text-white mt-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold tracking-tight">
                Arsyadam
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-200">
              Creating digital experiences that inspire and elevate your online
              presence.
            </p>
          </div>

          {/* Links sections */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Navigate</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-200 hover:text-white transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-gray-200 hover:text-white transition"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-200 hover:text-white transition"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-200 hover:text-white transition"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-200 hover:text-white transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-200 hover:text-white transition"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/licensing"
                  className="text-gray-200 hover:text-white transition"
                >
                  Licensing
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4 mt-4">
              <Link
                href="https://twitter.com/arsyadam"
                className="text-gray-200 hover:text-white transition"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </Link>
              <Link
                href="https://linkedin.com/in/arsyadam"
                className="text-gray-200 hover:text-white transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link
                href="https://github.com/arsyadam"
                className="text-gray-200 hover:text-white transition"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </Link>
              <Link
                href="https://instagram.com/arsyadam"
                className="text-gray-200 hover:text-white transition"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </Link>
            </div>
            <div className="mt-4">
              <Link
                href="mailto:contact@arsyadam.id"
                className="text-gray-200 hover:text-white transition flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                contact@arsyadam.id
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300/20 mt-10 pt-6">
          <p className="text-center text-sm text-gray-200">
            © {new Date().getFullYear()}{" "}
            <Link
              href="https://arsyadam.id"
              className="hover:text-white transition"
            >
              Arsyadam
            </Link>
            . All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
