/**
 * Gizlilik odaklı ürün analitiği.
 *
 * Dosya adı, dosya içeriği, serbest metin, tam dosya boyutu veya kullanıcı
 * kimliği bu modüle verilmez. GA4 olayları yalnızca aşağıdaki sınırlı alanları
 * taşır; Firestore ise başarılı işlemler için sabit şemalı günlük sayaç tutar.
 */

import { useCallback, useEffect, useRef } from "react";
import { db } from "./firebase";
import { doc, setDoc, increment, serverTimestamp } from "firebase/firestore";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * GA4'e özel etkinlik gönderir. GA yüklü değilse sessizce atlanır.
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", eventName, params ?? {});
    }
  } catch {
    // Tracking hatası kullanıcıyı etkilememeli
  }
}

export type ToolFunnelEvent =
  | "tool_view"
  | "input_selected"
  | "processing_started"
  | "processing_success"
  | "processing_error"
  | "output_action";

export type ToolEventParams = {
  locale?: string;
  mode?: string;
  action?: "download" | "copy";
  file_size_bucket?: string;
  output_size_bucket?: string;
  batch_size_bucket?: string;
  duration_bucket?: string;
  reduction_bucket?: string;
  error_code?: string;
};

function safeDimension(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9_-]/g, "_").slice(0, 40);
}

function sanitizeToolParams(params: ToolEventParams): Record<string, string> {
  return Object.fromEntries(
    Object.entries(params)
      .filter((entry): entry is [string, string] => typeof entry[1] === "string")
      .map(([key, value]) => [key, safeDimension(value)])
  );
}

export function getFileSizeBucket(bytes: number): string {
  if (bytes < 100 * 1024) return "under_100kb";
  if (bytes < 1024 * 1024) return "100kb_1mb";
  if (bytes < 5 * 1024 * 1024) return "1mb_5mb";
  if (bytes < 20 * 1024 * 1024) return "5mb_20mb";
  if (bytes < 100 * 1024 * 1024) return "20mb_100mb";
  return "over_100mb";
}

export function getBatchSizeBucket(count: number): string {
  if (count <= 1) return "1";
  if (count <= 5) return "2_5";
  if (count <= 20) return "6_20";
  return "over_20";
}

export function getDurationBucket(durationMs: number): string {
  if (durationMs < 250) return "under_250ms";
  if (durationMs < 1000) return "250ms_1s";
  if (durationMs < 3000) return "1s_3s";
  if (durationMs < 10000) return "3s_10s";
  if (durationMs < 30000) return "10s_30s";
  return "over_30s";
}

export function getReductionBucket(originalBytes: number, outputBytes: number): string {
  if (originalBytes <= 0 || outputBytes >= originalBytes) return "none";
  const reduction = 1 - outputBytes / originalBytes;
  if (reduction < 0.1) return "under_10pct";
  if (reduction < 0.3) return "10_29pct";
  if (reduction < 0.5) return "30_49pct";
  return "50pct_or_more";
}

export function trackToolEvent(
  eventName: ToolFunnelEvent,
  toolId: string,
  params: ToolEventParams = {}
): void {
  trackEvent(eventName, {
    tool_id: safeDimension(toolId),
    ...sanitizeToolParams(params),
  });
}

export const STATS_TIME_ZONE = "Europe/Istanbul";

function getDatePartsInStatsTimeZone(date: Date) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: STATS_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const parts = formatter.formatToParts(date);
  const year = parts.find((part) => part.type === "year")?.value ?? "1970";
  const month = parts.find((part) => part.type === "month")?.value ?? "01";
  const day = parts.find((part) => part.type === "day")?.value ?? "01";

  return { year, month, day };
}

function formatDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function getStatsDateKey(date = new Date()): string {
  const { year, month, day } = getDatePartsInStatsTimeZone(date);
  return `${year}-${month}-${day}`;
}

export function getRecentStatsDateKeys(dayCount: number, endDate = new Date()): string[] {
  const { year, month, day } = getDatePartsInStatsTimeZone(endDate);
  const anchor = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  const keys: string[] = [];

  for (let offset = dayCount - 1; offset >= 0; offset--) {
    const current = new Date(anchor);
    current.setUTCDate(anchor.getUTCDate() - offset);
    keys.push(
      formatDateKey(
        current.getUTCFullYear(),
        current.getUTCMonth() + 1,
        current.getUTCDate()
      )
    );
  }

  return keys;
}

/**
 * Bir araç kullanıldığında çağrılır.
 * @param toolId — tools.ts'deki id (örn. "pdf-merge")
 */
export async function trackToolUse(
  toolId: string,
  params: ToolEventParams = {}
): Promise<void> {
  trackToolEvent("processing_success", toolId, params);
  try {
    const today = getStatsDateKey();
    const docRef = doc(db, "toolStats", `${today}__${safeDimension(toolId)}`);
    await setDoc(
      docRef,
      {
        date: today,
        toolId: safeDimension(toolId),
        count: increment(1),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch {
    // Tracking hatası kullanıcıyı etkilememeli
  }
}

export function useTrackToolView(toolId: string, locale: string): void {
  const trackedRef = useRef(false);

  useEffect(() => {
    if (trackedRef.current) return;
    trackedRef.current = true;
    trackToolEvent("tool_view", toolId, { locale });
  }, [locale, toolId]);
}

export function useTrackToolUseOnce(toolId: string) {
  const trackedRef = useRef(false);

  return useCallback(() => {
    if (trackedRef.current) return;
    trackedRef.current = true;
    void trackToolUse(toolId);
  }, [toolId]);
}
