"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { key: "about", href: "/about", label: "About" },
  { key: "industry", href: "/industry", label: "Industry" },
  { key: "company", href: "/company", label: "Company" },
  { key: "career", href: "/career", label: "Career" },
];

const megaMenuSections = [
  {
    title: "Contents",
    links: [
      { href: "/industry", label: "Industry" },
      { href: "/company", label: "Company" },
      { href: "/career", label: "Career" },
    ],
  },
  {
    title: "Discover",
    links: [
      { href: "/tag/kosen", label: "Tag" },
      { href: "/search?q=", label: "Search" },
    ],
  },
  {
    title: "About",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
];

const megaMenuHighlight = {
  title: "Re:Kosen",
  description: "高専生の進路選択を支えるキャリアメディア。",
  actions: [
    { href: "/contact", label: "Contact", variant: "primary" },
    { href: "/search?q=", label: "Search", variant: "outline" },
  ],
};

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 11-14 0 7 7 0 0114 0z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const isMegaOpen = menuOpen || activeMenu !== null;

  const closeMenus = () => {
    setMenuOpen(false);
    setActiveMenu(null);
  };

  return (
    <header
      className="relative border-b border-border bg-background"
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="mx-auto w-full max-w-[1100px] px-4">
        <div className="flex items-center justify-between gap-3 py-5">
          <Link
            className="font-display text-3xl font-semibold tracking-[0.08em] text-ink"
            href="/"
          >
            Re:Kosen
          </Link>
          <div className="flex items-center gap-4">
            <nav
              aria-label="メイン"
              className="hidden items-center gap-6 text-xs uppercase tracking-[0.28em] text-muted lg:flex"
            >
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href || pathname.startsWith(item.href + "/");
                const isMegaActive = activeMenu === item.key;

                return (
                  <Link
                    key={item.key}
                    aria-controls="mega-menu"
                    aria-expanded={isMegaActive}
                    aria-haspopup="true"
                    className={`transition hover:text-ink ${
                      isActive || isMegaActive ? "text-ink" : "text-muted"
                    }`}
                    href={item.href}
                    onFocus={() => {
                      setActiveMenu(item.key);
                      setSearchOpen(false);
                      setMenuOpen(false);
                    }}
                    onMouseEnter={() => {
                      setActiveMenu(item.key);
                      setSearchOpen(false);
                      setMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <button
              aria-controls="mega-menu"
              aria-expanded={menuOpen}
              className="rounded-full border border-border bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-muted lg:hidden"
              onClick={() => {
                setMenuOpen((prev) => !prev);
                setActiveMenu(null);
                setSearchOpen(false);
              }}
              type="button"
            >
              Menu
            </button>
            <Link
              className="hidden rounded-full bg-ink px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-white lg:inline-flex"
              href="/contact"
            >
              Contact
            </Link>
            <button
              aria-expanded={searchOpen}
              aria-label="検索を開く"
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-white text-ink"
              onClick={() => {
                setSearchOpen((prev) => !prev);
                closeMenus();
              }}
              type="button"
            >
              <SearchIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
        {searchOpen ? (
          <form action="/search" className="pb-4" method="get">
            <label className="sr-only" htmlFor="site-search">
              記事を検索
            </label>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm text-muted">
              <SearchIcon className="h-4 w-4 text-muted" />
              <input
                className="w-full bg-transparent text-ink placeholder:text-muted/70 focus:outline-none"
                id="site-search"
                name="q"
                placeholder="キーワードで検索"
                type="search"
              />
              <button className="text-xs font-semibold text-brand" type="submit">
                検索
              </button>
            </div>
          </form>
        ) : null}
      </div>
      {isMegaOpen ? (
        <div
          className="absolute left-0 right-0 top-full z-20 border-t border-border bg-white shadow-[0_18px_40px_rgba(24,24,24,0.12)]"
          id="mega-menu"
        >
          <div className="mx-auto w-full max-w-[1100px] px-4 py-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-[1.1fr,1.1fr,1fr,1.3fr]">
              {megaMenuSections.map((section) => (
                <div key={section.title} className="space-y-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted">
                    {section.title}
                  </p>
                  <div className="flex flex-col gap-3 text-sm text-ink">
                    {section.links.map((link) => (
                      <Link
                        key={link.href}
                        className="transition hover:text-brand"
                        href={link.href}
                        onClick={closeMenus}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <div className="rounded-xl border border-border bg-[#f4f0ea] p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted">
                  {megaMenuHighlight.title}
                </p>
                <p className="mt-3 text-sm text-ink">
                  {megaMenuHighlight.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {megaMenuHighlight.actions.map((action) => (
                    <Link
                      key={action.href}
                      className={`inline-flex rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] ${
                        action.variant === "primary"
                          ? "bg-ink text-white"
                          : "border border-border bg-white text-muted hover:text-ink"
                      }`}
                      href={action.href}
                      onClick={closeMenus}
                    >
                      {action.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
