import type { Metadata } from "next";
import Script from "next/script";
import { Caveat, Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const bodyFont = Noto_Sans_JP({
  variable: "--font-sans",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const displayFont = Noto_Serif_JP({
  variable: "--font-display",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

const scriptFont = Caveat({
  variable: "--font-script",
  weight: ["400", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Re:Kosen",
    template: "%s | Re:Kosen",
  },
  description: "高専生向けキャリアメディア。業界研究、企業研究、キャリア設計の情報を発信。",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://re-kosen.vercel.app"),
  openGraph: {
    title: "Re:Kosen",
    description: "高専生向けキャリアメディア",
    type: "website",
    locale: "ja_JP",
    siteName: "Re:Kosen",
  },
  twitter: {
    card: "summary_large_image",
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
      <body
        className={`${bodyFont.variable} ${displayFont.variable} ${scriptFont.variable} antialiased`}
      >
        <div className="flex min-h-dvh flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
