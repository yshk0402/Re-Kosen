import Image from "next/image";

type ArticleImageProps = {
  src?: string;
  alt: string;
  caption?: string | null;
  width?: number | null;
  height?: number | null;
};

export default function ArticleImage({
  src,
  alt,
  caption,
  width,
  height,
}: ArticleImageProps) {
  if (!src) {
    return null;
  }

  const hasDimensions = Boolean(width && height);

  return (
    <figure className="space-y-3">
      <div className="overflow-hidden rounded-xl border border-border bg-white">
        {hasDimensions ? (
          <Image
            alt={alt}
            className="h-auto w-full"
            height={height ?? 0}
            sizes="(max-width: 1200px) 100vw, 1200px"
            src={src}
            width={width ?? 0}
          />
        ) : (
          <div className="relative aspect-[16/9]">
            <Image
              alt={alt}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              src={src}
              className="object-cover"
            />
          </div>
        )}
      </div>
      {caption ? (
        <figcaption className="text-xs text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
