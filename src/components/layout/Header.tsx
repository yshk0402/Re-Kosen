"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "TOP" },
  { href: "/industry", label: "業界研究" },
  { href: "/company", label: "企業研究" },
  { href: "/job", label: "職種研究" },
  { href: "/career", label: "キャリア設計" },
  { href: "/article", label: "記事一覧" },
  { href: "/about", label: "運営について" },
];

const LINE_URL = "https://lin.ee/FpUh8Cfy";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const menuLabel = menuOpen ? "メニューを閉じる" : "メニューを開く";

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/70 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 py-5">
          <Link className="flex items-center" href="/">
            <Image
              alt="高専ジョブ"
              className="h-7 w-auto lg:h-8"
              height={28}
              priority
              src="/icon.png"
              width={82}
            />
          </Link>
          <nav className="hidden items-center gap-6 text-base font-semibold text-muted lg:flex">
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
              className="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-semibold transition hover:bg-brand-strong lg:inline-flex"
              href={LINE_URL}
              rel="noreferrer"
              style={{ color: "#fff" }}
              target="_blank"
            >
              無料で相談する
            </Link>
            <button
              aria-controls="mobile-nav"
              aria-expanded={menuOpen}
              aria-label={menuLabel}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full text-lg font-semibold text-white transition hover:bg-brand-strong lg:hidden ${
                menuOpen ? "bg-brand-strong" : "bg-brand"
              }`}
              onClick={() => setMenuOpen((prev) => !prev)}
              type="button"
            >
              <span aria-hidden="true">{menuOpen ? "✕" : "≡"}</span>
            </button>
          </div>
        </div>
      </header>

      <div
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-50 bg-brand-soft transition-opacity duration-200 lg:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className={`mx-auto flex h-full w-full max-w-[1440px] flex-col px-4 py-6 transition-transform duration-200 ${
            menuOpen ? "translate-y-0" : "translate-y-2"
          }`}
        >
          <div className="flex items-center justify-between">
            <Link
              className="flex items-center"
              href="/"
              onClick={() => setMenuOpen(false)}
            >
              <Image
                alt="高専ジョブ"
                className="h-7 w-auto lg:h-8"
                height={28}
                priority
                src="/icon.png"
                width={82}
              />
            </Link>
            <button
              aria-label="メニューを閉じる"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-lg font-semibold text-muted transition hover:text-ink"
              onClick={() => setMenuOpen(false)}
              type="button"
            >
              <span aria-hidden="true">✕</span>
            </button>
          </div>

          <nav
            className="mt-10 flex flex-1 flex-col gap-4 text-lg font-semibold text-ink"
            id="mobile-nav"
          >
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  className={`rounded-2xl px-4 py-3 transition hover:bg-brand-soft ${
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
              className="mt-4 inline-flex w-fit rounded-full bg-brand px-6 py-3 text-sm font-semibold"
              href={LINE_URL}
              rel="noreferrer"
              style={{ color: "#fff" }}
              target="_blank"
              onClick={() => setMenuOpen(false)}
            >
              無料で相談する
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
