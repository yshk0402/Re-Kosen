type SummaryCardProps = {
  title?: string;
  description?: string | null;
  bullets?: string[];
};

export default function SummaryCard({
  title = "結論",
  description,
  bullets = [],
}: SummaryCardProps) {
  const normalizedBullets = bullets
    .map((bullet) => bullet.trim())
    .filter((bullet) => bullet.length > 0);

  return (
    <section className="rounded-xl border border-border bg-[#f4f0ea] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
        Summary
      </p>
      <h2 className="mt-2 font-display text-xl font-semibold text-ink">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-sm leading-relaxed text-ink">{description}</p>
      ) : null}
      {normalizedBullets.length ? (
        <ul className="mt-4 space-y-2 text-sm text-ink">
          {normalizedBullets.map((bullet) => (
            <li key={bullet} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
