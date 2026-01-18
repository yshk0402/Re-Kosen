export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-6 px-4 py-10">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
          About
        </p>
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          Re:Kosenについて
        </h1>
      </header>
      <div className="rounded-xl border border-border bg-white p-6 text-sm text-muted">
        高専生が進路選択に必要な情報を、スマホで読みやすい構成で届けるキャリアメディアです。
        業界・企業・キャリアの順で理解が深まるように設計しています。
      </div>
    </div>
  );
}
