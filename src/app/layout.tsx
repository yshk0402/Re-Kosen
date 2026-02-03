import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";
import { getDefaultOgImageUrl, getOrganizationJsonLd } from "@/lib/seo";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const defaultOgImage = getDefaultOgImageUrl();
const organizationJsonLd = getOrganizationJsonLd();

export const metadata: Metadata = {
  title: {
    default: "高専ジョブ",
    template: "%s | 高専ジョブ",
  },
  description: "高専生向けキャリアメディア。業界研究、企業研究、キャリア設計の情報を発信。",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://re-kosen.vercel.app"),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
    ],
  },
  openGraph: {
    title: "高専ジョブ",
    description: "高専生向けキャリアメディア",
    type: "website",
    locale: "ja_JP",
    siteName: "高専ジョブ",
    images: [{ url: defaultOgImage }],
  },
  twitter: {
    card: "summary_large_image",
    images: [defaultOgImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {GA_MEASUREMENT_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        ) : null}
      </head>
      <body className="antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
