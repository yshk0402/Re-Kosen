import RichText from "@/components/article/RichText";

type CalloutVariant = "info" | "warn" | "tip";

type CalloutProps = {
  title?: string | null;
  body: string;
  variant: CalloutVariant;
};

const variantStyles: Record<CalloutVariant, string> = {
  info: "border-brand/30 bg-brand-soft/60 text-ink",
  warn: "border-amber-300 bg-amber-50 text-amber-900",
  tip: "border-emerald-300 bg-emerald-50 text-emerald-900",
};

const variantLabels: Record<CalloutVariant, string> = {
  info: "Info",
  warn: "Warning",
  tip: "Tip",
};

export default function Callout({ title, body, variant }: CalloutProps) {
  return (
    <section className={`rounded-xl border p-5 ${variantStyles[variant]}`}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.3em]">
        {variantLabels[variant]}
      </p>
      {title ? (
        <h3 className="mt-2 font-display text-lg font-semibold">{title}</h3>
      ) : null}
      <div className="mt-3">
        <RichText
          content={body}
          className="text-sm leading-relaxed text-inherit [&_a]:text-inherit"
        />
      </div>
    </section>
  );
}
