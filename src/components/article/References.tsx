type ReferenceItem = {
  title: string;
  url: string;
  note?: string | null;
};

type ReferencesProps = {
  title?: string | null;
  items?: ReferenceItem[];
};

const isExternalUrl = (url: string) => /^https?:\/\//i.test(url);

export default function References({ title, items }: ReferencesProps) {
  const normalizedItems =
    items
      ?.map((item) => ({
        title: item.title?.trim() ?? "",
        url: item.url?.trim() ?? "",
        note: item.note?.trim() ?? "",
      }))
      .filter((item) => item.title && item.url) ?? [];

  if (!normalizedItems.length) {
    return null;
  }

  return (
    <section className="rounded-xl border border-border bg-white p-5">
      <h3 className="font-display text-lg font-semibold text-ink">
        {title?.trim() || "参考資料"}
      </h3>
      <ul className="mt-4 space-y-3 text-sm text-ink">
        {normalizedItems.map((item) => {
          const external = isExternalUrl(item.url);
          return (
            <li key={`${item.title}-${item.url}`} className="space-y-1">
              <a
                className="font-semibold text-brand underline-offset-4 hover:underline"
                href={item.url}
                {...(external
                  ? { rel: "noopener noreferrer", target: "_blank" }
                  : {})}
              >
                {item.title}
              </a>
              {item.note ? (
                <p className="text-xs text-muted">{item.note}</p>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
