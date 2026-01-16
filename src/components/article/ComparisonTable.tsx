type ComparisonTableProps = {
  caption?: string;
  columns: string[];
  rows: string[][];
};

export default function ComparisonTable({
  caption,
  columns,
  rows,
}: ComparisonTableProps) {
  return (
    <section className="rounded-xl border border-border bg-white p-6">
      {caption ? (
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
          {caption}
        </p>
      ) : null}
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-[600px] w-full border-separate border-spacing-0 text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-[0.2em] text-muted">
              {columns.map((column) => (
                <th
                  key={column}
                  className="border-b border-border px-3 py-2 font-semibold"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={row.join("-")}
                className={index % 2 === 0 ? "bg-white" : "bg-[#f7f5f1]"}
              >
                {row.map((cell) => (
                  <td
                    key={cell}
                    className="border-b border-border px-3 py-3 text-ink"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted">横スクロールで比較できます。</p>
    </section>
  );
}
