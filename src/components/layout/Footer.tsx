import Image from "next/image";
import Link from "next/link";

const footerColumns = [
  {
    title: "Contents",
    links: [
      { href: "/", label: "TOP" },
      { href: "/industry", label: "業界研究" },
      { href: "/company", label: "企業研究" },
      { href: "/job", label: "職種研究" },
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
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                  {column.title}
                </p>
                <div className="flex flex-col gap-3 text-sm">
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
            <p className="text-sm uppercase tracking-[0.3em] text-white/70">
              <Image
                alt=""
                aria-hidden="true"
                className="block h-4 w-auto"
                height={16}
                src="/icon.png"
                width={47}
              />
            </p>
            <div className="text-3xl font-semibold tracking-[0.08em] text-white">
              <Image
                alt="高専ジョブ"
                className="block h-10 w-auto"
                height={40}
                src="/icon.png"
                width={116}
              />
            </div>
            <p className="text-base text-white/70">
              高専生の進路選択を支えるキャリアメディア。
            </p>
          </div>
        </div>
        <div className="mt-10 text-sm text-white/50">
          © 2026 高専ジョブ. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
