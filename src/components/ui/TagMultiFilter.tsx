"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type TagOption = {
  value: string;
  label: string;
};

type TagMultiFilterProps = {
  label?: string;
  options: TagOption[];
  selected: string[];
};

const normalize = (values: string[]) =>
  Array.from(new Set(values.filter(Boolean))).sort();

export default function TagMultiFilter({
  label = "タグで絞り込み",
  options,
  selected,
}: TagMultiFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedSet = new Set(selected);

  const updateSelection = (nextSelected: string[]) => {
    const normalized = normalize(nextSelected);
    const params = new URLSearchParams(searchParams.toString());

    if (normalized.length) {
      params.set("tag", normalized.join(","));
    } else {
      params.delete("tag");
    }
    params.delete("page");

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const toggleTag = (value: string) => {
    if (selectedSet.has(value)) {
      updateSelection(selected.filter((item) => item !== value));
    } else {
      updateSelection([...selected, value]);
    }
  };

  return (
    <div className="space-y-3">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
        {label}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = selectedSet.has(option.value);
          return (
            <button
              key={option.value}
              type="button"
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                isActive
                  ? "bg-brand text-white"
                  : "bg-brand-soft text-brand-strong hover:bg-brand/10"
              }`}
              onClick={() => toggleTag(option.value)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
