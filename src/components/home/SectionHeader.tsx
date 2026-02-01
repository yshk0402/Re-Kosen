import Link from "next/link";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
  titleTone?: "brand" | "ink";
};

export default function SectionHeader({
  title,
  subtitle,
  href,
  linkLabel = "もっと見る",
  titleTone = "ink",
}: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        {subtitle ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-brand">
            {subtitle}
          </p>
        ) : null}
        <h2
          className={`mt-1 text-2xl font-semibold sm:text-3xl ${
            titleTone === "brand" ? "text-brand" : "text-ink"
          }`}
        >
          {title}
        </h2>
      </div>
      {href ? (
        <Link
          className="text-sm font-semibold text-brand transition hover:text-brand-strong"
          href={href}
        >
          {linkLabel}
        </Link>
      ) : null}
    </div>
  );
}
