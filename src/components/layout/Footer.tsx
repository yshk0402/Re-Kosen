import Link from "next/link";

const footerColumns = [
  {
    title: "Contents",
    links: [
      { href: "/industry", label: "Industry" },
      { href: "/company", label: "Company" },
      { href: "/career", label: "Career" },
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

export default function Footer() {
  return (
    <footer className="bg-[#7c8087] text-white/80">
      <div className="mx-auto w-full max-w-[1100px] px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-[2fr,1fr]">
          <div className="grid gap-8 sm:grid-cols-2">
            {footerColumns.map((column) => (
              <div key={column.title} className="space-y-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white">
                  {column.title}
                </p>
                <div className="flex flex-col gap-3 text-xs uppercase tracking-[0.2em]">
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
          <div className="flex flex-col items-start gap-4 lg:items-end">
            <p className="text-xs uppercase tracking-[0.3em]">Re:Kosen</p>
            <div className="font-display text-5xl font-semibold tracking-[0.08em] text-white">
              Re:Kosen
            </div>
            <p className="text-xs text-white/70">
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
