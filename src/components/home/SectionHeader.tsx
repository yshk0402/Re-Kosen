import Link from "next/link";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
};

export default function SectionHeader({
  title,
  subtitle,
  href,
  linkLabel = "もっと見る",
}: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        {subtitle ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-brand">
            {subtitle}
          </p>
        ) : null}
        <h2 className="mt-1 text-xl font-semibold text-ink sm:text-2xl">
          {title}
        </h2>
      </div>
      {href ? (
        <Link
          className="text-xs font-semibold text-brand transition hover:text-brand-strong"
          href={href}
        >
          {linkLabel}
        </Link>
      ) : null}
    </div>
  );
}
