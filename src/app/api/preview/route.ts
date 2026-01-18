import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const isValidSlug = (slug: string) => slug.length > 0 && !slug.includes("/");

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");
  const previewSecret = process.env.PREVIEW_SECRET;

  if (!previewSecret) {
    return NextResponse.json(
      { message: "Preview secret is not configured" },
      { status: 500 },
    );
  }

  if (!secret || secret !== previewSecret) {
    return NextResponse.json({ message: "Invalid preview token" }, { status: 401 });
  }

  if (!slug || !isValidSlug(slug)) {
    return NextResponse.json({ message: "Invalid slug" }, { status: 400 });
  }

  const draft = await draftMode();
  draft.enable();

  const redirectUrl = new URL(`/articles/${encodeURIComponent(slug)}`, request.url);
  return NextResponse.redirect(redirectUrl);
}
