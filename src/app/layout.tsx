import type { Metadata } from "next";
import { Caveat, Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
  title: "Re:Kosen",
  description: "高専生向けキャリアメディア",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
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
