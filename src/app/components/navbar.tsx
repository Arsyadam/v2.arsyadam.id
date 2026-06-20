"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#experience", label: "Experience" },
  { href: "/#showcase", label: "Projects" },
  { href: "/#education", label: "Education" },
  { href: "/#achievement", label: "Achievement" },
  { href: "/#perspectives", label: "Perspectives" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string | null, href: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return pathname === "/";
  return pathname === href || (pathname?.startsWith(`${href}/`) ?? false);
}

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 flex w-full flex-col items-center justify-center bg-white/90 backdrop-blur-[20px]">
      <nav
        aria-label="Primary"
        className="flex h-16 w-full max-w-[1200px] items-center justify-between px-5 lg:px-10 xl:px-0 font-geist"
      >
        <div className="flex items-center gap-8">
          <div className="hidden items-center gap-5 lg:flex">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-[14px] capitalize leading-none tracking-[-0.005em] transition-colors duration-200 ${
                  isActive(pathname, href)
                    ? "text-neutral-900"
                    : "text-[#737373] hover:text-neutral-900"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/#showcase"
            className="inline-flex h-8 items-center justify-center gap-1.5 rounded-button-md bg-gradient-to-t from-neutral-900 to-neutral-600 px-2.5 py-2 text-[13px] font-medium leading-[18px] tracking-[-0.065px] text-white shadow-button transition-[filter,background-color,box-shadow] hover:from-neutral-950 hover:to-neutral-700 hover:shadow-button-hover active:brightness-95"
          >
            View Projects
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-8 items-center justify-center gap-1.5 rounded-button-md border border-neutral-200 bg-white px-2.5 py-2 text-[13px] font-medium leading-[18px] tracking-[-0.065px] text-neutral-800 shadow-button-secondary transition-colors hover:bg-neutral-100"
          >
            Contact
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/contact"
            className="hidden h-8 items-center justify-center rounded-button-md border border-neutral-200 bg-white px-2.5 text-[13px] font-medium text-neutral-800 shadow-button-secondary sm:inline-flex"
          >
            Contact
          </Link>
          <button
            type="button"
            className="inline-flex size-8 items-center justify-center rounded-button-md text-neutral-800 hover:bg-neutral-100"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="w-full border-t border-neutral-100 bg-white/95 px-5 py-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`block rounded-lg px-3 py-2.5 text-[14px] font-medium ${
                    isActive(pathname, href)
                      ? "bg-neutral-100 text-neutral-900"
                      : "text-neutral-600 hover:bg-neutral-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
