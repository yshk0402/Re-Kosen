import Link from "next/link";

const LINE_URL = "https://lin.ee/FpUh8Cfy";

export default function FloatingLineLabel() {
  return (
    <Link
      className="fixed right-0 top-1/2 z-50 -translate-y-1/2 rounded-l-2xl bg-brand px-3 py-4 text-xs font-semibold text-white shadow-lg transition hover:bg-brand-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-sm [writing-mode:vertical-rl] [text-orientation:mixed]"
      href={LINE_URL}
      rel="noreferrer"
      target="_blank"
    >
      無料で相談する
    </Link>
  );
}
