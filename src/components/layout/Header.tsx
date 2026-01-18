"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/industry", label: "業界研究" },
  { href: "/company", label: "企業研究" },
  { href: "/career", label: "キャリア設計" },
  { href: "/article", label: "記事一覧" },
  { href: "/about", label: "運営について" },
];

const LINE_FALLBACK_URL = "https://example.com";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-4 py-4">
        <Link
          className="text-lg font-semibold tracking-[0.08em] text-ink"
          href="/"
        >
          Re:Kosen
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted lg:flex">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                className={`transition hover:text-ink ${
                  isActive ? "text-ink" : "text-muted"
                }`}
                href={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            className="hidden rounded-full bg-brand px-4 py-2 text-xs font-semibold text-white transition hover:bg-brand-strong lg:inline-flex"
            href={LINE_FALLBACK_URL}
            rel="noreferrer"
            target="_blank"
          >
            無料で相談する
          </Link>
          <button
            aria-controls="mobile-nav"
            aria-expanded={menuOpen}
            className="inline-flex items-center rounded-full border border-border bg-white px-3 py-2 text-xs font-semibold text-muted transition hover:text-ink lg:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            type="button"
          >
            Menu
          </button>
        </div>
      </div>
      {menuOpen ? (
        <div className="border-t border-border bg-white lg:hidden">
          <nav
            className="mx-auto flex w-full max-w-[1200px] flex-col gap-2 px-4 py-4 text-sm text-ink"
            id="mobile-nav"
          >
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  className={`rounded-lg px-2 py-1.5 transition hover:bg-brand-soft ${
                    isActive ? "text-brand" : "text-ink"
                  }`}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              className="mt-2 inline-flex w-fit rounded-full bg-brand px-4 py-2 text-xs font-semibold text-white"
              href={LINE_FALLBACK_URL}
              rel="noreferrer"
              target="_blank"
              onClick={() => setMenuOpen(false)}
            >
              無料で相談する
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
