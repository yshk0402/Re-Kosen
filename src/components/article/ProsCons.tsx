type ProsConsProps = {
  pros: string[];
  cons: string[];
};

export default function ProsCons({ pros, cons }: ProsConsProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
          Pros
        </p>
        <ul className="mt-3 space-y-2 text-sm text-emerald-900">
          {pros.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-700">
          Cons
        </p>
        <ul className="mt-3 space-y-2 text-sm text-rose-900">
          {cons.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
