import Link from "next/link";

const footerColumns = [
  {
    title: "Contents",
    links: [
      { href: "/industry", label: "業界研究" },
      { href: "/company", label: "企業研究" },
      { href: "/career", label: "キャリア設計" },
      { href: "/article", label: "記事一覧" },
    ],
  },
  {
    title: "About",
    links: [
      { href: "/about", label: "運営について" },
      { href: "/contact", label: "お問い合わせ" },
      { href: "/privacy", label: "プライバシー" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-16 bg-ink text-white/80">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-[1.6fr,1fr]">
          <div className="grid gap-8 sm:grid-cols-2">
            {footerColumns.map((column) => (
              <div key={column.title} className="space-y-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70">
                  {column.title}
                </p>
                <div className="flex flex-col gap-3 text-xs">
                  {column.links.map((link) => (
                    <Link
                      key={link.href}
                      className="transition hover:text-white"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">
              Re:Kosen
            </p>
            <div className="text-3xl font-semibold tracking-[0.08em] text-white">
              Re:Kosen
            </div>
            <p className="text-sm text-white/70">
              高専生の進路選択を支えるキャリアメディア。
            </p>
          </div>
        </div>
        <div className="mt-10 text-xs text-white/50">
          © 2026 Re:Kosen. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
