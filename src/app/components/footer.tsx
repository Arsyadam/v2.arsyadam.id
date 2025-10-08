import React from "react";
import Link from "next/link";
import {
  Twitter,
  Linkedin,
  Github,
  Instagram,
  Mail,
  Code,
  Heart,
  ExternalLink,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const stats = [
    { label: "Projects Completed", value: "25+" },
    { label: "Competitions Won", value: "8" },
    { label: "Years of Experience", value: "3+" },
    { label: "Technologies Mastered", value: "15+" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-red-900 to-black text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent"></div>
        <svg
          className="absolute bottom-0 left-0 w-full h-32"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C150,80 350,40 600,60 C850,80 1050,100 1200,80 L1200,120 Z"
            fill="rgba(255,38,62,0.1)"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10"
            >
              <div className="text-2xl md:text-3xl font-bold text-red-400 mb-1">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-gray-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* About Me Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                <Code className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Arsyadam</h3>
                <p className="text-red-400 text-sm">AI & IoT Developer</p>
              </div>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Passionate about creating innovative solutions with AI and IoT.
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              {[
                {
                  icon: Twitter,
                  href: "https://twitter.com/arsyadam",
                  label: "Twitter",
                },
                {
                  icon: Linkedin,
                  href: "https://linkedin.com/in/arsyadam",
                  label: "LinkedIn",
                },
                {
                  icon: Github,
                  href: "https://github.com/arsyadam",
                  label: "GitHub",
                },
                {
                  icon: Instagram,
                  href: "https://instagram.com/arsyadam",
                  label: "Instagram",
                },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 hover:bg-red-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 text-gray-300 group-hover:text-white" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Quick Navigation
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-red-400">
                  Explore
                </h4>
                <ul className="space-y-3">
                  {[
                    { href: "/", label: "Home" },
                    { href: "/showcase", label: "Projects" },
                    { href: "/blog", label: "Blog" },
                    { href: "/contact", label: "Contact" },
                  ].map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-white transition flex items-center gap-2 group"
                      >
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4 text-red-400">
                  Legal
                </h4>
                <ul className="space-y-3">
                  {[
                    { href: "/privacy", label: "Privacy" },
                    { href: "/terms", label: "Terms" },
                    { href: "/licensing", label: "License" },
                  ].map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-white transition flex items-center gap-2 group"
                      >
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Let&apos;s Connect
            </h3>

            <div className="bg-white/5 rounded-xl p-6 border border-white/10 backdrop-blur-sm mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="h-5 w-5 text-red-400" />
                <h4 className="font-semibold">Get in Touch</h4>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Have a project in mind? Let&aposs discuss how we can work
                together to bring your ideas to life.
              </p>
              <Link
                href="mailto:contact@arsyadam.id"
                className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition font-medium"
              >
                <Mail className="h-4 w-4" />
                contact@arsyadam.id
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-300">Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span className="text-gray-300">using Next.js & TypeScript</span>
            </div>

            <div className="text-center">
              <p className="text-gray-300 text-sm">
                © {currentYear}{" "}
                <Link
                  href="https://arsyadam.id"
                  className="text-red-400 hover:text-red-300 transition font-medium"
                >
                  Arsyadam
                </Link>
                . All Rights Reserved.
              </p>
            </div>

            <div className="text-sm text-gray-400">
              <span>v2.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
