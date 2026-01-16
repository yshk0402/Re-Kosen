export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-[900px] space-y-6 px-4 py-10">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
          Privacy
        </p>
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          プライバシーポリシー
        </h1>
      </header>
      <div className="rounded-xl border border-border bg-white p-6 text-sm text-muted">
        <p>本ページはMVP段階のダミーです。</p>
        <p className="mt-3">
          具体的な収集情報・利用目的・第三者提供については
          {"{{TODO: 未確定}}"}。
        </p>
      </div>
    </div>
  );
}
