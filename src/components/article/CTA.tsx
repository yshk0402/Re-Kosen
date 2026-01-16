import Link from "next/link";

type CTAVariant = "primary" | "outline";

type CTAProps = {
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  variant?: CTAVariant;
};

export default function CTA({
  title,
  description,
  buttonText,
  buttonUrl,
  variant = "primary",
}: CTAProps) {
  const isPrimary = variant === "primary";

  return (
    <section
      className={`rounded-xl border border-border p-6 ${
        isPrimary ? "bg-brand text-white" : "bg-white text-ink"
      }`}
    >
      <h3 className="font-display text-xl font-semibold">{title}</h3>
      <p
        className={`mt-2 text-sm leading-relaxed ${
          isPrimary ? "text-white/80" : "text-muted"
        }`}
      >
        {description}
      </p>
      <Link
        className={`mt-4 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition ${
          isPrimary
            ? "bg-white text-brand hover:bg-brand-soft"
            : "border border-brand text-brand hover:bg-brand-soft"
        }`}
        href={buttonUrl}
      >
        {buttonText}
      </Link>
    </section>
  );
}
