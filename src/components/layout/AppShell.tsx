"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingLineLabel from "@/components/layout/FloatingLineLabel";

const HIDE_HEADER_PATHS = new Set(["/1"]);
const HIDE_FOOTER_PATHS = new Set(["/1"]);
const HIDE_FLOATING_LABEL_PATHS = new Set(["/1"]);

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideHeader = HIDE_HEADER_PATHS.has(pathname);
  const hideFooter = HIDE_FOOTER_PATHS.has(pathname);
  const hideFloatingLabel = HIDE_FLOATING_LABEL_PATHS.has(pathname);

  return (
    <div className="flex min-h-dvh flex-col">
      {!hideHeader && <Header />}
      <main className="flex-1">{children}</main>
      {!hideFooter && <Footer />}
      {!hideFloatingLabel && <FloatingLineLabel />}
    </div>
  );
}
