/**
 * Anonim kullanım istatistikleri — Firestore'a günlük araç sayacı yazar.
 * Hiçbir kişisel veri toplanmaz (IP, kullanıcı adı, oturum yok).
 * Her araç kullanımı sadece bir sayı olarak kaydedilir.
 */

import { useCallback, useRef } from "react";
import { db } from "./firebase";
import { doc, setDoc, increment, serverTimestamp } from "firebase/firestore";

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
export async function trackToolUse(toolId: string): Promise<void> {
  try {
    const today = getStatsDateKey();
    const docRef = doc(db, "toolStats", today);
    await setDoc(
      docRef,
      {
        [toolId]: increment(1),
        _updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch {
    // Tracking hatası kullanıcıyı etkilememeli
  }
}

export function useTrackToolUseOnce(toolId: string) {
  const trackedRef = useRef(false);

  return useCallback(() => {
    if (trackedRef.current) return;
    trackedRef.current = true;
    void trackToolUse(toolId);
  }, [toolId]);
}
