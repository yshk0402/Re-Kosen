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
  const layout = isSmall
    ? "items-start gap-5 py-2"
    : "flex-col gap-3 py-2";
  const titleSize = isSmall ? "text-sm sm:text-base" : "text-base sm:text-lg";
  const radius = isSmall ? "rounded-lg" : "rounded-xl";
  const imageSize = isSmall
    ? "aspect-[16/9] w-36 shrink-0 sm:w-44"
    : "aspect-[16/9]";
  const sizes = isSmall
    ? "(max-width: 640px) 144px, 176px"
    : "(max-width: 1024px) 100vw, 32vw";

  return (
    <Link
      className={`group flex ${layout} transition ${className}`}
      href={href}
    >
      <div
        className={`relative overflow-hidden ${radius} bg-brand-soft ${imageSize}`}
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
