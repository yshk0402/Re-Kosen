import Link from "next/link";

const GOOGLE_FORM_URL = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL || "#";

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-[900px] space-y-8 px-4 py-10">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
          Contact
        </p>
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          お問い合わせ
        </h1>
        <p className="text-sm text-muted sm:text-base">
          Re:Kosenへのお問い合わせは、以下のフォームよりお願いいたします。
        </p>
      </header>

      <div className="space-y-6">
        <section className="rounded-xl border border-border bg-white p-6">
          <h2 className="font-display text-lg font-semibold text-ink">
            高専生の方へ
          </h2>
          <p className="mt-2 text-sm text-muted">
            進路相談、記事へのご意見・ご要望、取材のご依頼など、お気軽にお問い合わせください。
          </p>
          <Link
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-ink/90"
          >
            お問い合わせフォーム
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </Link>
        </section>

        <section className="rounded-xl border border-border bg-white p-6">
          <h2 className="font-display text-lg font-semibold text-ink">
            企業・団体の方へ
          </h2>
          <p className="mt-2 text-sm text-muted">
            高専生向けの採用広報、記事掲載のご相談など、お気軽にお問い合わせください。
          </p>
          <Link
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-background"
          >
            お問い合わせフォーム
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </Link>
        </section>

        <p className="text-center text-xs text-muted">
          ※ 通常3営業日以内にご返信いたします。
        </p>
      </div>
    </div>
  );
}
