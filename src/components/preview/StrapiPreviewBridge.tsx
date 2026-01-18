"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type StrapiPreviewBridgeProps = {
  enabled?: boolean;
};

const PREVIEW_READY_EVENT = "previewReady";
const STRAPI_UPDATE_EVENT = "strapiUpdate";
const STRAPI_SCRIPT_EVENT = "strapiScript";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

const runStrapiScript = (script: string) => {
  const node = document.createElement("script");
  node.textContent = script;
  document.body.appendChild(node);
  node.remove();
};

export default function StrapiPreviewBridge({
  enabled = false,
}: StrapiPreviewBridgeProps) {
  const router = useRouter();

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const handleMessage = (event: MessageEvent) => {
      if (!isRecord(event.data)) {
        return;
      }
      const eventType = event.data.type;
      if (eventType === STRAPI_UPDATE_EVENT) {
        router.refresh();
        return;
      }
      if (eventType === STRAPI_SCRIPT_EVENT && isRecord(event.data.payload)) {
        const script = event.data.payload.script;
        if (typeof script === "string" && script.length > 0) {
          runStrapiScript(script);
        }
      }
    };

    window.addEventListener("message", handleMessage);
    window.parent?.postMessage({ type: PREVIEW_READY_EVENT }, "*");

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [enabled, router]);

  return null;
}
