import type { Metadata } from "next";
import Link from "next/link";

const FORM_URL = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL || "#";

export const metadata: Metadata = {
  title: "高専ジョブ LP",
  description: "landing-page-v2.pen をピクセルパーフェクトで再現したLP。",
};

function SvgPlaceholder({ width, height, label }: { width: number; height: number; label: string }) {
  return (
    <div
      className="flex items-center justify-center border border-dashed border-slate-400 bg-slate-100 text-xs text-slate-500"
      style={{ width, height }}
    >
      {label}
    </div>
  );
}

function CtaButton({ x, y, width, height, fontSize, radius }: { x: number; y: number; width: number; height: number; fontSize: number; radius: number }) {
  return (
    <Link
      href={FORM_URL}
      rel="noreferrer"
      target="_blank"
      className="absolute flex items-center justify-center"
      style={{
        left: x,
        top: y,
        width,
        height,
        background: "#ffbb00",
        border: "5px solid #000000",
        borderRadius: radius,
      }}
    >
      <span style={{ fontSize, fontWeight: 700, color: "#ffffff" }}>無料で相談する</span>
    </Link>
  );
}

export default function LandingPagePixelPerfect() {
  return (
    <div className="bg-white">
      {/* Desktop */}
      <div className="relative mx-auto hidden w-[1440px] bg-white lg:block" style={{ height: 4464 }}>
        {/* background gradient */}
        <div
          className="absolute left-0"
          style={{
            top: 860,
            width: 1440,
            height: 2047,
            background:
              "linear-gradient(180deg, #1a54c0 0%, #adc1e8 0%, #e6ecf8 46%, #ffffff 100%)",
          }}
        />

        {/* Header */}
        <div className="absolute left-0 top-0 h-[149px] w-[1440px] bg-white">
          <img
            alt="高専ジョブ"
            src="/lp/brand-mark.png"
            width={368}
            height={100}
            style={{ position: "absolute", left: 83, top: 25 }}
          />
          <CtaButton x={1056} y={30} width={284} height={90} fontSize={25} radius={10} />
        </div>

        {/* Label */}
        <div
          className="absolute flex items-center justify-center"
          style={{
            left: 1372,
            top: 436,
            width: 68,
            height: 210,
            background: "#ffbb00",
            border: "5px solid #000000",
            borderRadius: "10px 0 0 10px",
          }}
        >
          <span className="text-center" style={{ fontSize: 22, fontWeight: 700, color: "#ffffff", whiteSpace: "pre-line" }}>
            {"学\n生\nの\n方\nへ"}
          </span>
        </div>

        {/* Sec1 Hero */}
        <div className="absolute" style={{ left: 106, top: 255, width: 1189, height: 600 }}>
          <img
            alt="Hero"
            src="/lp/hero.png"
            width={454}
            height={453}
            style={{ position: "absolute", left: 735, top: 0 }}
          />
          <div style={{ position: "absolute", left: 0, top: 0 }}>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 39,
                fontSize: 70,
                fontWeight: 800,
                color: "#000000",
                whiteSpace: "pre-line",
              }}
            >
              {"今まで出会えなかった\n高専生に出会うなら"}
            </div>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 288,
                width: 569,
                fontSize: 25,
                fontWeight: 700,
                color: "#000000",
              }}
            >
              高専ジョブは業界・職種を問わず、高専生と企業が採用前に出会える交流プラットフォームです。
            </div>
          </div>
          <CtaButton x={0} y={408} width={284} height={90} fontSize={25} radius={10} />
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 506,
              fontSize: 16,
              color: "#000000",
            }}
          >
            ※外部のGoogle Formsへ遷移します。
          </div>
        </div>

        {/* Sec2 */}
        <div className="absolute" style={{ left: 0, top: 866, width: 1440, height: 1000 }}>
          <div className="absolute" style={{ left: 172, top: 23, width: 1096, height: 900 }}>
            {/* Lead */}
            <div style={{ position: "absolute", left: 137, top: 0, fontSize: 50, fontWeight: 700, color: "#1a54c0" }}>
              「採用活動で高専生と出会えない...」
            </div>
            <div style={{ position: "absolute", left: 225, top: 85, fontSize: 25, color: "#000000", width: 676 }}>
              そんなお悩みをお持ちではありませんか？？
            </div>

            {/* Table */}
            <div className="absolute" style={{ left: 200, top: 161, width: 696, height: 496 }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: 696, height: 496, background: "#ffffff" }} />
              <div style={{ position: "absolute", left: 20, top: 20, fontSize: 25, fontWeight: 700 }}>
                就職活動の前提が違い、一般の採用市場に高専生は居ない
              </div>

              <div className="absolute" style={{ left: 27, top: 82, width: 642, height: 380 }}>
                {/* Left labels */}
                <div style={{ position: "absolute", left: 14, top: 103, fontSize: 20 }}>応募形態</div>
                <div style={{ position: "absolute", left: 14, top: 162, fontSize: 20, whiteSpace: "pre-line" }}>
                  {"企業との\n接点"}
                </div>
                <div style={{ position: "absolute", left: 14, top: 235, fontSize: 20, whiteSpace: "pre-line" }}>
                  {"有効求人\n倍率"}
                </div>
                <div style={{ position: "absolute", left: 14, top: 322, fontSize: 20 }}>就活行動</div>
                <div style={{ position: "absolute", left: 79, top: 274, fontSize: 15 }}>※1</div>

                {/* Left column background blocks */}
                <div className="absolute" style={{ left: 0, top: 88, width: 107, display: "flex", flexDirection: "column", gap: 15, alignItems: "center" }}>
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} style={{ width: 107, height: 58.375523997902455, background: "#9bbcf9" }} />
                  ))}
                </div>

                {/* Upper labels */}
                <div style={{ position: "absolute", left: 123, top: 14, width: 246, height: 57, background: "#e3edff" }} />
                <div style={{ position: "absolute", left: 133, top: 25, fontSize: 25, fontWeight: 700 }}>
                  一般的な大卒就活生
                </div>
                <div style={{ position: "absolute", left: 380, top: 6, width: 260, height: 77, background: "#ffbb00" }} />
                <div style={{ position: "absolute", left: 395.5, top: 24, fontSize: 25, fontWeight: 700, width: 226 }}>
                  高専生
                </div>

                {/* Middle rows left */}
                <div style={{ position: "absolute", left: 123, top: 89, width: 246, height: 57, background: "#d5dff2" }} />
                <div style={{ position: "absolute", left: 183, top: 104, fontSize: 18 }}>自由応募が中心</div>

                <div style={{ position: "absolute", left: 123, top: 162, width: 246, height: 57, background: "#d5dff2" }} />
                <div style={{ position: "absolute", left: 183.5, top: 177, fontSize: 18 }}>オープンで多数</div>

                <div style={{ position: "absolute", left: 123, top: 235, width: 246, height: 57, background: "#d5dff2" }} />
                <div style={{ position: "absolute", left: 219.5, top: 251, fontSize: 18 }}>1.66倍</div>

                <div style={{ position: "absolute", left: 123, top: 308, width: 246, height: 57, background: "#d5dff2" }} />
                <div style={{ position: "absolute", left: 132, top: 311, fontSize: 18, whiteSpace: "pre-line", width: 228 }}>
                  {"自己分析・企業研究を\n徹底的に行う"}
                </div>

                {/* Middle rows right */}
                <div style={{ position: "absolute", left: 386, top: 88, width: 246, height: 57, background: "#f8efd7" }} />
                <div style={{ position: "absolute", left: 439, top: 102, fontSize: 20 }}>推薦応募が中心</div>

                <div style={{ position: "absolute", left: 386, top: 161, width: 246, height: 57, background: "#f8efd7" }} />
                <div style={{ position: "absolute", left: 409, top: 175, fontSize: 20 }}>学内に閉ざされている</div>

                <div style={{ position: "absolute", left: 386, top: 234, width: 246, height: 57, background: "#f8efd7" }} />
                <div style={{ position: "absolute", left: 465, top: 248, fontSize: 20 }}>20倍以上</div>

                <div style={{ position: "absolute", left: 386, top: 307, width: 246, height: 57, background: "#f8efd7" }} />
                <div style={{ position: "absolute", left: 449, top: 321, fontSize: 20 }}>面接対策のみ</div>

                <div style={{ position: "absolute", left: 0, top: 380, fontSize: 12 }}>
                  ※1 2025年度の広報誌「国立高専機構 概要」より
                </div>

                {/* Border highlight */}
                <div
                  style={{
                    position: "absolute",
                    left: 375,
                    top: 0,
                    width: 269,
                    height: 380,
                    border: "10px solid #ffbb00",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>

            {/* Sash and icon */}
            <div
              className="absolute"
              style={{
                left: 0,
                top: 730,
                width: 1096,
                height: 120,
              }}
            >
              <div style={{ position: "absolute", left: -39, top: 21, fontSize: 40, fontWeight: 700, color: "#000000" }}>
                高専生と企業が自然に出会うことができる
              </div>
              <img
                alt="高専ジョブ"
                src="/lp/brand-mark.png"
                width={368}
                height={100}
                style={{ position: "absolute", left: 728, top: 0 }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 629,
                  top: -6,
                  width: 163,
                  height: 66,
                  background: "#1a54c0",
                  clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
                  transform: "rotate(-180deg)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Sec3 */}
        <div className="absolute" style={{ left: 40, top: 1867, width: 1360, height: 1000 }}>
          {/* Header */}
          <div className="absolute" style={{ left: 554, top: 0 }}>
            <div style={{ position: "absolute", left: 0, top: 0, fontSize: 25, color: "#000000" }}>
              大きな　　のポイント
            </div>
            <div style={{ position: "absolute", left: 75, top: 0, fontSize: 25, fontWeight: 700, color: "#1a54c0" }}>
              ３つ
            </div>
            <div
              style={{
                position: "absolute",
                left: 271.8807,
                top: 57.014,
                width: 26,
                height: 82,
                background: "#1a54c0",
                clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
                transform: "rotate(-210deg)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 0.5166,
                top: 44.014,
                width: 26,
                height: 82,
                background: "#1a54c0",
                clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
                transform: "rotate(-870deg)",
              }}
            />
          </div>

          {/* Cards */}
          <div className="absolute" style={{ left: 0, top: 220 }}>
            {/* Card 1 */}
            <div className="absolute" style={{ left: 0, top: 0, width: 430, height: 547 }}>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: 430,
                  height: 547,
                  background: "#ffffff",
                  borderRadius: 50,
                }}
              />
              <div style={{ position: "absolute", left: 93, top: 19 }}>
                <SvgPlaceholder width={243} height={342} label="強み1.svg" />
              </div>
              <div style={{ position: "absolute", left: 0, top: -66, fontSize: 70, fontWeight: 800, color: "#1a54c0" }}>01</div>
              <div style={{ position: "absolute", left: 39, top: 387, fontSize: 35, fontWeight: 700, color: "#000000", whiteSpace: "pre-line" }}>
                {"「選考が始まる前」の\n高専生に接点を持てる"}
              </div>
            </div>

            {/* Card 2 */}
            <div className="absolute" style={{ left: 464, top: 0, width: 430, height: 547 }}>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: 430,
                  height: 547,
                  background: "#ffffff",
                  borderRadius: 50,
                }}
              />
              <div style={{ position: "absolute", left: 37, top: 19 }}>
                <SvgPlaceholder width={357} height={268} label="強み2.svg" />
              </div>
              <div style={{ position: "absolute", left: 0, top: -66, fontSize: 70, fontWeight: 800, color: "#1a54c0" }}>02</div>
              <div style={{ position: "absolute", left: 6, top: 387, fontSize: 35, fontWeight: 700, color: "#000000", whiteSpace: "pre-line" }}>
                {"就活用に整えられていない\n「判断軸」が見える"}
              </div>
            </div>

            {/* Card 3 */}
            <div className="absolute" style={{ left: 938, top: 0, width: 430, height: 547 }}>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: 430,
                  height: 547,
                  background: "#ffffff",
                  borderRadius: 50,
                }}
              />
              <div style={{ position: "absolute", left: 33.5, top: 56 }}>
                <SvgPlaceholder width={363} height={273} label="強み3.svg" />
              </div>
              <div style={{ position: "absolute", left: 0, top: -66, fontSize: 70, fontWeight: 800, color: "#1a54c0" }}>03</div>
              <div style={{ position: "absolute", left: 22, top: 390, fontSize: 35, fontWeight: 700, color: "#000000", whiteSpace: "pre-line" }}>
                {"採用競争に巻き込まれず\n記憶に残る"}
              </div>
            </div>
          </div>

          {/* CTA */}
          <CtaButton x={538} y={867} width={284} height={90} fontSize={25} radius={10} />
        </div>

        {/* Sec4 */}
        <div className="absolute" style={{ left: 133, top: 2997, width: 1174, height: 1300 }}>
          {/* Title */}
          <div className="absolute" style={{ left: 378.5, top: 0, width: 417, height: 96 }}>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: 417,
                height: 96,
                border: "2px solid #1a54c0",
                borderRadius: 100,
              }}
            />
            <div style={{ position: "absolute", left: 49, top: 19, fontSize: 40, fontWeight: 700, color: "#1a54c0" }}>
              交流会までの流れ
            </div>
          </div>

          <div className="absolute" style={{ left: 0, top: 243, width: 1174, height: 1000 }}>
            {/* timeline dots and line */}
            <div className="absolute" style={{ left: 0.8328, top: -0.1296, width: 135, height: 800 }}>
              <div className="absolute" style={{ left: 61.9672, top: 25.5415, width: 9, height: 800, background: "#1a54c0" }} />
              <div className="absolute" style={{ left: 0, top: 0, width: 135, height: 129.9095, borderRadius: "999px", background: "#1a54c0" }} />
              <div className="absolute" style={{ left: 0, top: 254, width: 135, height: 129.9095, borderRadius: "999px", background: "#1a54c0" }} />
              <div className="absolute" style={{ left: 0, top: 508, width: 135, height: 129.9095, borderRadius: "999px", background: "#1a54c0" }} />
            </div>

            {/* Step titles */}
            <div className="absolute" style={{ left: 175, top: 32, width: 240 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 309, alignItems: "center" }}>
                <div style={{ fontSize: 40, fontWeight: 700, width: 200, textAlign: "center" }}>お申し込み</div>
                <div style={{ fontSize: 40, fontWeight: 700, width: 240, textAlign: "center" }}>お打ち合わせ</div>
                <div style={{ fontSize: 40, fontWeight: 700, width: 200, textAlign: "center" }}>交流会参加</div>
              </div>
            </div>

            {/* Step details */}
            <div style={{ position: "absolute", left: 505, top: -21, width: 689, fontSize: 35, color: "#000000", whiteSpace: "pre-line" }}>
              {"無料で相談するボタンからGoogle Formに必要情報をご連絡ください。\n2営業日以内にご連絡を差し上げます。"}
            </div>
            <div style={{ position: "absolute", left: 505, top: 370, width: 689, fontSize: 35, color: "#000000" }}>
              本サービスの趣旨や当日の運営ルールなどをご説明し、貴社の参加目的・懸念点をすり合わせます。
            </div>
            <div style={{ position: "absolute", left: 505, top: 766, width: 689, fontSize: 35, color: "#000000" }}>
              すり合わせ内容を踏まえたうえで、高専生との交流会にご参加ください。
            </div>
          </div>

          <CtaButton x={444} y={1221} width={284} height={90} fontSize={25} radius={10} />
        </div>
      </div>

      {/* Mobile */}
      <div className="relative mx-auto block w-[390px] bg-white lg:hidden" style={{ height: 3300 }}>
        {/* background gradient */}
        <div
          className="absolute left-0"
          style={{
            top: 680,
            width: 390,
            height: 1479,
            background:
              "linear-gradient(180deg, #1a54c0 0%, #adc1e8 0%, #e6ecf8 46%, #ffffff 100%)",
          }}
        />

        {/* Header */}
        <div className="absolute left-0 top-0 h-[93px] w-[390px] bg-white">
          <img
            alt="高専ジョブ"
            src="/lp/brand-mark.png"
            width={151}
            height={41}
            style={{ position: "absolute", left: 12, top: 26 }}
          />
          <CtaButton x={234} y={26} width={138} height={41} fontSize={15} radius={7} />
        </div>

        {/* Label */}
        <div
          className="absolute flex items-center justify-center"
          style={{
            left: 352,
            top: 249,
            width: 38,
            height: 141,
            background: "#ffbb00",
            border: "3px solid #000000",
            borderRadius: "10px 0 0 10px",
          }}
        >
          <span className="text-center" style={{ fontSize: 12, fontWeight: 700, color: "#ffffff", whiteSpace: "pre-line" }}>
            {"学\n生\nの\n方\nへ"}
          </span>
        </div>

        {/* Sec1 Mobile */}
        <div className="absolute" style={{ left: 32, top: 104, width: 326, height: 600 }}>
          <div style={{ position: "absolute", left: -5, top: -30, fontSize: 70, fontWeight: 800, color: "#000000", whiteSpace: "pre-line" }}>
            {"今まで出会えなかった\n高専生に出会うなら"}
          </div>
          <div style={{ position: "absolute", left: -5, top: 524, width: 320, fontSize: 25, fontWeight: 700, color: "#000000" }}>
            高専ジョブは業界・職種を問わず、高専生と企業が採用前に出会える交流プラットフォームです。
          </div>
          <img
            alt="Hero"
            src="/lp/hero.png"
            width={184}
            height={184}
            style={{ position: "absolute", left: 155, top: 298 }}
          />
          <CtaButton x={0} y={494} width={138} height={41} fontSize={15} radius={7} />
          <div style={{ position: "absolute", left: 4, top: 542, fontSize: 9, color: "#000000" }}>
            ※外部のGoogle Formsへ遷移します。
          </div>
        </div>

        {/* Sec2 Mobile */}
        <div className="absolute" style={{ left: 0, top: 680, width: 390, height: 600 }}>
          <div className="absolute" style={{ left: 14, top: 33, width: 360, height: 560 }}>
            <div style={{ position: "absolute", left: 0, top: 0, fontSize: 30, fontWeight: 700, color: "#1a54c0" }}>
              「高専生と出会えない...」
            </div>
            <div style={{ position: "absolute", left: 16, top: 48, fontSize: 16, color: "#000000", width: 330 }}>
              そんなお悩みをお持ちではありませんか？？
            </div>
            <img
              alt="table"
              src="/table.png"
              width={343}
              height={245}
              style={{ position: "absolute", left: 13, top: 116 }}
            />
            <div
              style={{
                position: "absolute",
                left: 231,
                top: 423,
                width: 100,
                height: 39,
                background: "#1a54c0",
                clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
                transform: "rotate(-180deg)",
              }}
            />
            <img
              alt="高専ジョブ"
              src="/lp/brand-mark.png"
              width={157}
              height={43}
              style={{ position: "absolute", left: 102, top: 528 }}
            />
            <div style={{ position: "absolute", left: 55, top: 443, fontSize: 25, fontWeight: 700, color: "#000000", whiteSpace: "pre-line" }}>
              {"高専生と企業が自然に\n出会うことができる"}
            </div>
          </div>
        </div>

        {/* Sec3 Mobile */}
        <div className="absolute" style={{ left: 26, top: 1344, width: 338, height: 1000 }}>
          {/* Header (same as desktop header) */}
          <div className="absolute" style={{ left: 44, top: 0 }}>
            <div style={{ position: "absolute", left: 0, top: 0, fontSize: 25, color: "#000000" }}>
              大きな　　のポイント
            </div>
            <div style={{ position: "absolute", left: 75, top: 0, fontSize: 25, fontWeight: 700, color: "#1a54c0" }}>
              ３つ
            </div>
            <div
              style={{
                position: "absolute",
                left: 271.8807,
                top: 57.014,
                width: 26,
                height: 82,
                background: "#1a54c0",
                clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
                transform: "rotate(-210deg)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 0.5166,
                top: 44.014,
                width: 26,
                height: 82,
                background: "#1a54c0",
                clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
                transform: "rotate(-870deg)",
              }}
            />
          </div>

          <div className="absolute" style={{ left: 0, top: 88 }}>
            {/* Strength 1 */}
            <div style={{ position: "absolute", left: 0, top: 0 }}>
              <div style={{ position: "absolute", left: 0, top: 0, fontSize: 70, fontWeight: 800, color: "#1a54c0" }}>01</div>
              <div style={{ position: "absolute", left: 0, top: 102, fontSize: 20, fontWeight: 700, color: "#000000", whiteSpace: "pre-line" }}>
                {"「選考が始まる前」の\n高専生に接点を持てる"}
              </div>
              <div style={{ position: "absolute", left: 227, top: 9 }}>
                <SvgPlaceholder width={110} height={155} label="強み1.svg" />
              </div>
            </div>

            {/* Strength 2 */}
            <div style={{ position: "absolute", left: 9, top: 203 }}>
              <div style={{ position: "absolute", left: 233, top: 0, fontSize: 70, fontWeight: 800, color: "#1a54c0" }}>02</div>
              <div style={{ position: "absolute", left: 147, top: 85, fontSize: 20, fontWeight: 700, color: "#000000", whiteSpace: "pre-line", textAlign: "right" }}>
                {"就活用に\n整えられていない\n「判断軸」が見える"}
              </div>
              <div style={{ position: "absolute", left: 0, top: 18 }}>
                <SvgPlaceholder width={163} height={154} label="強み2.svg" />
              </div>
            </div>

            {/* Strength 3 */}
            <div style={{ position: "absolute", left: 5, top: 424 }}>
              <div style={{ position: "absolute", left: 0, top: 0, fontSize: 70, fontWeight: 800, color: "#1a54c0" }}>03</div>
              <div style={{ position: "absolute", left: 2, top: 85, fontSize: 20, fontWeight: 700, color: "#000000", whiteSpace: "pre-line" }}>
                {"採用競争に\n巻き込まれず\n記憶に残る"}
              </div>
              <div style={{ position: "absolute", left: 232, top: 88.8375 }}>
                <SvgPlaceholder width={97} height={77} label="強み3.svg" />
              </div>
            </div>
          </div>

          <CtaButton x={100} y={737.9999999999995} width={138} height={41} fontSize={15} radius={7} />
        </div>

        {/* Sec4 Mobile */}
        <div className="absolute" style={{ left: 0, top: 0, width: 390, height: 3300 }}>
          {/* Flow header */}
          <div className="absolute" style={{ left: 54, top: 2195, width: 281, height: 65 }}>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: 281,
                height: 65,
                border: "2px solid #1a54c0",
                borderRadius: 100,
              }}
            />
            <div style={{ position: "absolute", left: 33, top: 13, fontSize: 25, fontWeight: 700, color: "#1a54c0" }}>
              交流会までの流れ
            </div>
          </div>

          {/* Timeline */}
          <div className="absolute" style={{ left: 20, top: 2329, width: 48, height: 333 }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 48, height: 48, borderRadius: "999px", background: "#1a54c0" }} />
            <div style={{ position: "absolute", left: 21, top: 37, width: 5, height: 260, background: "#1a54c0" }} />
            <div style={{ position: "absolute", left: 0, top: 143, width: 48, height: 48, borderRadius: "999px", background: "#1a54c0" }} />
            <div style={{ position: "absolute", left: 0, top: 285, width: 48, height: 48, borderRadius: "999px", background: "#1a54c0" }} />
          </div>

          {/* Step texts */}
          <div style={{ position: "absolute", left: 79, top: 2329, fontSize: 16, fontWeight: 700 }}>お打ち合わせ</div>
          <div style={{ position: "absolute", left: 79, top: 2364, width: 280, fontSize: 16, color: "#000000", whiteSpace: "pre-line" }}>
            {"無料で相談するボタンからGoogle Formに必要情報をご連絡ください。\n2営業日以内にご連絡を差し上げます。"}
          </div>
          <div style={{ position: "absolute", left: 79, top: 2471.5208, fontSize: 16, fontWeight: 700 }}>お申し込み</div>
          <div style={{ position: "absolute", left: 79, top: 2516, width: 280, fontSize: 16, color: "#000000" }}>
            本サービスの趣旨や当日の運営ルールなどをご説明し、貴社の参加目的・懸念点をすり合わせます。
          </div>
          <div style={{ position: "absolute", left: 79, top: 2614.0415, fontSize: 16, fontWeight: 700 }}>交流会参加</div>
          <div style={{ position: "absolute", left: 79, top: 2654, width: 272, fontSize: 16, color: "#000000", whiteSpace: "pre-line" }}>
            {"すり合わせ内容を踏まえたうえで、\n高専生との交流会にご参加ください。"}
          </div>

          <CtaButton x={125} y={2763} width={138} height={41} fontSize={15} radius={7} />
        </div>
      </div>
    </div>
  );
}
