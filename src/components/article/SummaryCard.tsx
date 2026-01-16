type SummaryCardProps = {
  title?: string;
  bullets: string[];
};

export default function SummaryCard({
  title = "結論",
  bullets,
}: SummaryCardProps) {
  return (
    <section className="rounded-xl border border-border bg-[#f4f0ea] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
        Summary
      </p>
      <h2 className="mt-2 font-display text-xl font-semibold text-ink">
        {title}
      </h2>
      <ul className="mt-4 space-y-2 text-sm text-ink">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
