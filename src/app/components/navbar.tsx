"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add scroll effect to navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed top-8 left-0 right-0 z-50 flex md:justify-center justify-left px-4">
      <nav
        className={`backdrop-blur-md border-1 border-white bg-white/80 rounded-xl md:rounded-full shadow-sm  transition-all duration-300 ${
          scrolled ? "py-4 px-5" : "py-5 px-6"
        }  max-w-lg`}
      >
        <div className="flex items-center justify-between">
          {/* Navigation in center - hidden on mobile */}
          <div className="hidden md:block flex-grow text-center">
            <ul className="inline-flex space-x-6 lg:space-x-8">
              <li>
                <Link
                  href="/"
                  className={` py-2 px-3 rounded-full ${
                    scrolled ? "text-sm" : "text-lg"
                  } font-medium transition-colors ${
                    pathname === "/"
                      ? "text-red-500"
                      : "text-gray-700 hover:text-red-500"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className={`py-2 px-3 rounded-full ${
                    scrolled ? "text-sm" : "text-lg"
                  } font-medium transition-colors ${
                    pathname === "/blog" ||
                    (pathname && pathname.startsWith("/blog/"))
                      ? "text-red-500"
                      : "text-gray-700 hover:text-red-500"
                  }`}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/showcase"
                  className={`py-2 px-3 rounded-full ${
                    scrolled ? "text-sm" : "text-lg"
                  } font-medium transition-colors ${
                    pathname === "/showcase"
                      ? "text-red-500"
                      : "text-gray-700 hover:text-red-500"
                  }`}
                >
                  Showcase
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`py-2 px-3 rounded-full ${
                    scrolled ? "text-sm" : "text-lg"
                  } font-medium transition-colors ${
                    pathname === "/contact"
                      ? "text-red-500"
                      : "text-gray-700 hover:text-red-500"
                  }`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="p-2 rounded-2xl text-gray-500 hover:bg-gray-100 focus:outline-none"
              aria-controls="navbar-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMenuOpen
                      ? "M1 1L16 13M1 13L16 1"
                      : "M1 1h15M1 7h15M1 13h15"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-2 border-t border-gray-100 pt-3">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className={`block py-2 px-3 rounded-lg text-sm font-medium ${
                    pathname === "/"
                      ? "text-white bg-red-500"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className={`block py-2 px-3 rounded-lg text-sm font-medium ${
                    pathname === "/blog" ||
                    (pathname && pathname.startsWith("/blog/"))
                      ? "text-white bg-red-500"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/showcase"
                  className={`block py-2 px-3 rounded-lg text-sm font-medium ${
                    pathname === "/showcase"
                      ? "text-white bg-red-500"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Showcase
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`block py-2 px-3 rounded-lg text-sm font-medium ${
                    pathname === "/contact"
                      ? "text-white bg-red-500"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
}
