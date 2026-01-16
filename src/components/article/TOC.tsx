"use client";

import { useState } from "react";

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3 | 4;
};

type TOCProps = {
  items: TocItem[];
};

export default function TOC({ items }: TOCProps) {
  const [open, setOpen] = useState(true);

  return (
    <section className="rounded-xl border border-border bg-white p-6">
      <button
        className="flex w-full items-center justify-between text-left"
        onClick={() => setOpen((prev) => !prev)}
        type="button"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
          Table of Contents
        </span>
        <span className="text-xs font-semibold text-muted">
          {open ? "閉じる" : "開く"}
        </span>
      </button>
      {open ? (
        <ol className="mt-4 space-y-2 text-sm text-muted">
          {items.map((item) => {
            const indent =
              item.level === 2 ? "pl-0" : item.level === 3 ? "pl-4" : "pl-7";

            return (
              <li key={item.id} className={indent}>
                <a
                  className="inline-flex items-center gap-2 transition hover:text-ink"
                  href={`#${item.id}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                  {item.text}
                </a>
              </li>
            );
          })}
        </ol>
      ) : null}
    </section>
  );
}
