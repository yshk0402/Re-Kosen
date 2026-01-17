import Image from "next/image";
import Link from "next/link";

export type ArticleCardVariant = "default" | "compact";

type ArticleCardProps = {
  href: string;
  title: string;
  excerpt: string;
  tags: string[];
  date: string;
  coverImage?: string;
  category?: string;
  variant?: ArticleCardVariant;
};

export default function ArticleCard({
  href,
  title,
  excerpt,
  tags,
  date,
  coverImage,
  category,
  variant = "default",
}: ArticleCardProps) {
  const isCompact = variant === "compact";
  const displayTags = tags.slice(0, 3);
  const extraTagCount = Math.max(tags.length - displayTags.length, 0);

  return (
    <Link
      className={`group grid gap-4 rounded-xl border border-border bg-white transition hover:border-brand/40 ${
        isCompact ? "p-4" : "p-5"
      }`}
      href={href}
    >
      <div
        className="relative aspect-[16/9] overflow-hidden rounded-lg border border-border bg-[#f5f1eb]"
      >
        {coverImage ? (
          <Image
            alt={title}
            fill
            priority={false}
            sizes={isCompact ? "(max-width: 768px) 100vw, 33vw" : "100vw"}
            src={coverImage}
            className="object-cover transition duration-300 group-hover:scale-[1.01]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand/15 via-white to-brand-soft/60" />
        )}
      </div>
      <div className="space-y-2">
        {category ? (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            {category}
          </p>
        ) : null}
        <h3
          className={`font-semibold text-ink ${
            isCompact ? "text-base" : "text-lg"
          } line-clamp-2`}
        >
          {title}
        </h3>
        <p className="text-sm text-muted line-clamp-2">{excerpt}</p>
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
          {displayTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-white px-2 py-1"
            >
              {tag}
            </span>
          ))}
          {extraTagCount ? (
            <span className="text-xs text-muted/70">+{extraTagCount}</span>
          ) : null}
          <span className="ml-auto text-xs text-muted/70">更新日 {date}</span>
        </div>
      </div>
    </Link>
  );
}
