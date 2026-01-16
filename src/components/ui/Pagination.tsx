import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath: string;
};

function buildHref(basePath: string, page: number) {
  if (page <= 1) {
    return basePath;
  }
  const separator = basePath.includes("?") ? "&" : "?";
  return `${basePath}${separator}page=${page}`;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav aria-label="ページネーション" className="flex justify-center">
      <div className="inline-flex items-center gap-1 rounded-lg border border-border bg-white px-2 py-1 text-sm text-muted">
        <Link
          aria-disabled={currentPage <= 1}
          className={`rounded-md px-2.5 py-1.5 text-xs font-semibold transition ${
            currentPage <= 1
              ? "pointer-events-none text-muted/50"
              : "text-ink hover:text-brand"
          }`}
          href={buildHref(basePath, Math.max(currentPage - 1, 1))}
        >
          前へ
        </Link>
        {pages.map((page) => (
          <Link
            key={page}
            aria-current={page === currentPage ? "page" : undefined}
            className={`grid h-8 w-8 place-items-center rounded-md text-xs font-semibold transition ${
              page === currentPage
                ? "bg-brand text-white"
                : "text-ink hover:bg-brand-soft/70"
            }`}
            href={buildHref(basePath, page)}
          >
            {page}
          </Link>
        ))}
        <Link
          aria-disabled={currentPage >= totalPages}
          className={`rounded-md px-2.5 py-1.5 text-xs font-semibold transition ${
            currentPage >= totalPages
              ? "pointer-events-none text-muted/50"
              : "text-ink hover:text-brand"
          }`}
          href={buildHref(basePath, Math.min(currentPage + 1, totalPages))}
        >
          次へ
        </Link>
      </div>
    </nav>
  );
}
