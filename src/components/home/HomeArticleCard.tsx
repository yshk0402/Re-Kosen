import Image from "next/image";
import Link from "next/link";

type HomeArticleCardProps = {
  href: string;
  title: string;
  image?: string;
  variant?: "medium" | "small";
  className?: string;
};

export default function HomeArticleCard({
  href,
  title,
  image,
  variant = "medium",
  className = "",
}: HomeArticleCardProps) {
  const isSmall = variant === "small";
  const titleSize = isSmall ? "text-sm" : "text-base sm:text-lg";
  const radius = isSmall ? "rounded-lg" : "rounded-xl";
  const sizes = isSmall
    ? "(max-width: 1024px) 70vw, 18vw"
    : "(max-width: 1024px) 100vw, 32vw";

  return (
    <Link
      className={`group flex h-full flex-col gap-3 transition hover:-translate-y-0.5 ${className}`}
      href={href}
    >
      <div
        className={`relative aspect-[16/9] overflow-hidden ${radius} bg-brand-soft`}
      >
        {image ? (
          <Image
            alt={title}
            fill
            sizes={sizes}
            src={image}
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-soft via-white to-brand/10" />
        )}
      </div>
      <h3
        className={`line-clamp-2 font-semibold text-ink transition group-hover:text-brand-strong ${titleSize}`}
      >
        {title}
      </h3>
    </Link>
  );
}
