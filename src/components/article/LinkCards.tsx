import Link from "next/link";

type LinkCardItem = {
  title: string;
  description?: string | null;
  href: string;
  isExternal?: boolean;
};

type LinkCardsProps = {
  items: LinkCardItem[];
};

export default function LinkCards({ items }: LinkCardsProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      {items.map((item, index) => {
        const content = (
          <div className="flex h-full flex-col justify-between gap-3 rounded-xl border border-border bg-white p-5 transition hover:border-brand/40">
            <div>
              <p className="text-sm font-semibold text-ink">{item.title}</p>
              {item.description ? (
                <p className="mt-2 text-sm text-muted">{item.description}</p>
              ) : null}
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              {item.isExternal ? "External" : "Read"}
            </span>
          </div>
        );

        if (item.isExternal) {
          return (
            <a
              key={`${item.href}-${index}`}
              href={item.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              {content}
            </a>
          );
        }

        return (
          <Link key={`${item.href}-${index}`} href={item.href}>
            {content}
          </Link>
        );
      })}
    </section>
  );
}
