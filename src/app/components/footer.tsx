import Link from "next/link";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";

const navColumns = [
  {
    title: "Pages",
    links: [
      { href: "/", label: "Home" },
      { href: "/blog", label: "Blog" },
      { href: "/showcase", label: "Showcase" },
    ],
  },
  {
    title: "Connect",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "mailto:arsyadam@proton.me", label: "Email" },
      { href: "https://linkedin.com/in/arsyadam", label: "LinkedIn" },
    ],
  },
];

const socialLinks = [
  { href: "https://github.com/arsyadam", label: "GitHub", icon: Github },
  { href: "https://linkedin.com/in/arsyadam", label: "LinkedIn", icon: Linkedin },
  { href: "https://twitter.com/arsyadam", label: "Twitter", icon: Twitter },
  { href: "https://instagram.com/arsyadam", label: "Instagram", icon: Instagram },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex w-full flex-col items-center bg-white">
      <div className="flex w-full max-w-[1200px] flex-col gap-8 px-5 pb-8 pt-12 md:px-10 md:pb-10 md:pt-16 lg:gap-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-t from-neutral-900 to-neutral-600 text-base font-semibold text-white">
                A
              </span>
              <span className="text-[16px] font-semibold tracking-[-0.01em] text-neutral-800">
                Arsyad Ali Mahardika
              </span>
            </Link>
            <p className="max-w-xs text-[14px] leading-[150%] tracking-[-0.005em] text-neutral-500">
              AI Engineer building meaningful technology.
            </p>
          </div>

          <div className="grid w-full grid-cols-2 gap-x-6 gap-y-8 md:flex md:justify-end md:gap-12 lg:w-auto">
            {navColumns.map((column) => (
              <nav
                key={column.title}
                aria-labelledby={`footer-${column.title.toLowerCase()}`}
                className="flex min-w-[140px] flex-col gap-4"
              >
                <h3
                  id={`footer-${column.title.toLowerCase()}`}
                  className="text-[12px] font-normal leading-[160%] tracking-[-0.005em] text-gray-600"
                >
                  {column.title}
                </h3>
                <ul className="flex flex-col gap-2">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[13px] font-normal leading-[160%] tracking-[-0.005em] text-gray-900 transition-colors hover:text-neutral-600 md:text-[14px]"
                        {...(link.href.startsWith("http") || link.href.startsWith("mailto")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-neutral-200 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-[14px] font-normal leading-[135%] tracking-[-0.005em] text-gray-500">
            © {currentYear} Arsyad Ali Mahardika. All rights reserved.
          </p>
          <div className="flex flex-row items-center gap-4">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 transition-colors hover:text-neutral-900"
                aria-label={label}
              >
                <Icon className="size-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
