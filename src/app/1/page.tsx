import type { Metadata } from "next";
import Link from "next/link";

const FORM_URL = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL || "#";

export const metadata: Metadata = {
  title: "高専ジョブ LP",
  description: "landing-page-v2.pen を画像ベースで完全一致表示。",
};

const desktop = {
  width: 1403,
  height: 14095,
  penWidth: 1440,
};

const mobile = {
  width: 500,
  height: 14786,
  penWidth: 390,
};

const desktopScale = desktop.width / desktop.penWidth;
const mobileScale = mobile.width / mobile.penWidth;

const desktopCtas = [
  { x: 1056, y: 30, w: 284, h: 90 }, // header
  { x: 106, y: 255 + 408, w: 284, h: 90 }, // hero
  { x: 40 + 538, y: 1867 + 867, w: 284, h: 90 }, // sec3
  { x: 133 + 444, y: 2997 + 1221, w: 284, h: 90 }, // sec4
];

const mobileCtas = [
  { x: 234, y: 26, w: 138, h: 41 }, // header
  { x: 32 + 0, y: 104 + 494, w: 138, h: 41 }, // hero
  { x: 26 + 100, y: 1344 + 738, w: 138, h: 41 }, // sec3
  { x: 125, y: 2763, w: 138, h: 41 }, // sec4
];

function CtaOverlay({ x, y, w, h, scale }: { x: number; y: number; w: number; h: number; scale: number }) {
  return (
    <Link
      href={FORM_URL}
      rel="noreferrer"
      target="_blank"
      aria-label="無料で相談する"
      className="absolute"
      style={{
        left: x * scale,
        top: y * scale,
        width: w * scale,
        height: h * scale,
      }}
    >
      <span className="sr-only">無料で相談する</span>
    </Link>
  );
}

export default function LandingPageImageBase() {
  return (
    <div className="bg-white">
      {/* Desktop */}
      <div className="relative mx-auto hidden lg:block" style={{ width: desktop.width, height: desktop.height }}>
        <img
          alt="LP Desktop"
          src="/lp/desktop.png"
          width={desktop.width}
          height={desktop.height}
          className="block"
        />
        {desktopCtas.map((cta, index) => (
          <CtaOverlay key={`d-${index}`} {...cta} scale={desktopScale} />
        ))}
      </div>

      {/* Mobile */}
      <div className="relative mx-auto block lg:hidden" style={{ width: mobile.width, height: mobile.height }}>
        <img
          alt="LP Mobile"
          src="/lp/mobile.png"
          width={mobile.width}
          height={mobile.height}
          className="block"
        />
        {mobileCtas.map((cta, index) => (
          <CtaOverlay key={`m-${index}`} {...cta} scale={mobileScale} />
        ))}
      </div>
    </div>
  );
}
