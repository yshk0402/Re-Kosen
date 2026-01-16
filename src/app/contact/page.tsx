export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-[900px] space-y-6 px-4 py-10">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
          Contact
        </p>
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          お問い合わせ
        </h1>
      </header>
      <div className="rounded-xl border border-border bg-white p-6 text-sm text-muted">
        お問い合わせ方法は{"{{TODO: 未確定}}"}です。
        <br />
        実装方針が決まり次第、フォームまたはメール導線を設置します。
      </div>
    </div>
  );
}
