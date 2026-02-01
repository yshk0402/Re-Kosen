import type { Metadata } from "next";
import Link from "next/link";

const FORM_URL = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL || "#";

export const metadata: Metadata = {
  title: "高専ジョブ LP",
  description: "landing-page-v2.pen を画像ベースで完全一致表示。",
};

const desktopImage = {
  width: 1222,
  height: 4096,
  penWidth: 1440,
};

const mobileImage = {
  width: 390,
  height: 3300,
  penWidth: 390,
};

const desktopScale = desktopImage.width / desktopImage.penWidth;
const mobileScale = mobileImage.width / mobileImage.penWidth;

const desktopCtas = [
  { x: 1056, y: 30, w: 284, h: 90 },
  { x: 106, y: 255 + 408, w: 284, h: 90 },
  { x: 40 + 538, y: 1867 + 867, w: 284, h: 90 },
  { x: 133 + 444, y: 2997 + 1221, w: 284, h: 90 },
];

const mobileCtas = [
  { x: 234, y: 26, w: 138, h: 41 },
  { x: 32 + 0, y: 104 + 494, w: 138, h: 41 },
  { x: 26 + 100, y: 1344 + 738, w: 138, h: 41 },
  { x: 125, y: 2763, w: 138, h: 41 },
];

function toPercent(value: number, base: number) {
  return `${(value / base) * 100}%`;
}

function CtaOverlay({
  x,
  y,
  w,
  h,
  scale,
  baseWidth,
  baseHeight,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  scale: number;
  baseWidth: number;
  baseHeight: number;
}) {
  const pxX = x * scale;
  const pxY = y * scale;
  const pxW = w * scale;
  const pxH = h * scale;

  return (
    <Link
      href={FORM_URL}
      rel="noreferrer"
      target="_blank"
      aria-label="無料で相談する"
      className="absolute"
      style={{
        left: toPercent(pxX, baseWidth),
        top: toPercent(pxY, baseHeight),
        width: toPercent(pxW, baseWidth),
        height: toPercent(pxH, baseHeight),
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
      <div className="relative mx-auto hidden w-full lg:block" style={{ aspectRatio: `${desktopImage.width} / ${desktopImage.height}` }}>
        <img
          alt="LP Desktop"
          src="/lp/LP_Desktop.png"
          width={desktopImage.width}
          height={desktopImage.height}
          className="absolute left-0 top-0 h-full w-full"
        />
        {desktopCtas.map((cta, index) => (
          <CtaOverlay
            key={`d-${index}`}
            {...cta}
            scale={desktopScale}
            baseWidth={desktopImage.width}
            baseHeight={desktopImage.height}
          />
        ))}
      </div>

      {/* Mobile */}
      <div className="relative mx-auto block w-full lg:hidden" style={{ aspectRatio: `${mobileImage.width} / ${mobileImage.height}` }}>
        <img
          alt="LP Mobile"
          src="/lp/LP_Mobile.png"
          width={mobileImage.width}
          height={mobileImage.height}
          className="absolute left-0 top-0 h-full w-full"
        />
        {mobileCtas.map((cta, index) => (
          <CtaOverlay
            key={`m-${index}`}
            {...cta}
            scale={mobileScale}
            baseWidth={mobileImage.width}
            baseHeight={mobileImage.height}
          />
        ))}
      </div>
    </div>
  );
}
