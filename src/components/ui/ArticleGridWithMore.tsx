"use client";

import { useState, type ReactNode } from "react";

const MOBILE_VISIBLE_COUNT = 5;
const DESKTOP_VISIBLE_COUNT = 15;
const COLLAPSED_CLASSES =
  "[&>*:nth-child(n+6)]:hidden lg:[&>*:nth-child(n+16)]:hidden";

type ArticleGridWithMoreProps = {
  itemCount: number;
  children: ReactNode;
  label?: string;
  collapseLabel?: string;
};

export default function ArticleGridWithMore({
  itemCount,
  children,
  label = "もっと見る",
  collapseLabel = "閉じる",
}: ArticleGridWithMoreProps) {
  const [expanded, setExpanded] = useState(false);
  const hasHiddenMobile = itemCount > MOBILE_VISIBLE_COUNT;
  const hasHiddenDesktop = itemCount > DESKTOP_VISIBLE_COUNT;
  const shouldRenderButton = hasHiddenMobile || hasHiddenDesktop;

  return (
    <div className="space-y-6">
      <div
        className={`grid gap-5 lg:grid-cols-3 ${
          expanded ? "" : COLLAPSED_CLASSES
        }`}
      >
        {children}
      </div>
      {shouldRenderButton ? (
        <div className="flex justify-center">
          <button
            aria-expanded={expanded}
            className={`inline-flex items-center justify-center rounded-full border border-brand px-6 py-2.5 text-sm font-semibold text-brand transition hover:bg-brand-soft ${
              hasHiddenMobile ? "" : "hidden"
            } ${hasHiddenDesktop ? "lg:inline-flex" : "lg:hidden"}`}
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? collapseLabel : label}
          </button>
        </div>
      ) : null}
    </div>
  );
}
