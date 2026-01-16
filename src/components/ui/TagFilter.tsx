"use client";

import { useRouter } from "next/navigation";

type TagOption = {
  value: string;
  label: string;
};

type TagFilterProps = {
  label?: string;
  options: TagOption[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  basePath?: string;
};

export default function TagFilter({
  label = "タグで絞り込み",
  options,
  defaultValue,
  onChange,
  basePath,
}: TagFilterProps) {
  const router = useRouter();

  const handleChange = (value: string) => {
    onChange?.(value);

    if (basePath) {
      const nextPath = value === "all" ? basePath : `${basePath}/${value}`;
      router.push(nextPath);
    }
  };

  return (
    <label className="flex w-full flex-col gap-2 text-sm text-muted">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
        {label}
      </span>
      <select
        className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ring"
        defaultValue={defaultValue ?? options[0]?.value}
        onChange={(event) => handleChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
