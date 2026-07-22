"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { useTrackToolUseOnce } from "@/lib/track";

const labels = {
  en: {
    back: "← Back to Tools",
    title: "Unix Timestamp Converter",
    subtitle:
      "Convert Unix timestamps (seconds or milliseconds) to human-readable dates and back — in your local timezone and UTC.",
    now: "Current Unix time",
    copy: "Copy",
    copied: "Copied!",
    tsToDate: "Timestamp → Date",
    dateToTs: "Date → Timestamp",
    tsInput: "Unix timestamp (s or ms)",
    dateInput: "Date & time",
    local: "Local time",
    utc: "UTC",
    relative: "Relative",
    seconds: "Unix seconds",
    millis: "Unix milliseconds",
    iso: "ISO 8601",
    invalid: "Invalid timestamp.",
    agoS: (v: string) => `${v} ago`,
    inS: (v: string) => `in ${v}`,
  },
  tr: {
    back: "← Araçlara Dön",
    title: "Unix Timestamp Çevirici",
    subtitle:
      "Unix zaman damgalarını (saniye veya milisaniye) okunabilir tarihe, tarihi zaman damgasına çevirin — yerel saat ve UTC olarak.",
    now: "Şu anki Unix zamanı",
    copy: "Kopyala",
    copied: "Kopyalandı!",
    tsToDate: "Timestamp → Tarih",
    dateToTs: "Tarih → Timestamp",
    tsInput: "Unix timestamp (sn veya ms)",
    dateInput: "Tarih ve saat",
    local: "Yerel saat",
    utc: "UTC",
    relative: "Göreli",
    seconds: "Unix saniye",
    millis: "Unix milisaniye",
    iso: "ISO 8601",
    invalid: "Geçersiz zaman damgası.",
    agoS: (v: string) => `${v} önce`,
    inS: (v: string) => `${v} sonra`,
  },
};

function relative(ms: number, locale: "en" | "tr", l: (typeof labels)["en"]): string {
  const diff = Date.now() - ms;
  const abs = Math.abs(diff);
  const units: [number, string, string][] = [
    [31536000000, "year", "yıl"],
    [2592000000, "month", "ay"],
    [86400000, "day", "gün"],
    [3600000, "hour", "saat"],
    [60000, "minute", "dakika"],
    [1000, "second", "saniye"],
  ];
  for (const [unitMs, en, tr] of units) {
    if (abs >= unitMs) {
      const v = Math.floor(abs / unitMs);
      const name = locale === "tr" ? tr : v === 1 ? en : en + "s";
      const s = `${v} ${name}`;
      return diff >= 0 ? l.agoS(s) : l.inS(s);
    }
  }
  return locale === "tr" ? "şimdi" : "just now";
}

export default function TimestampConverterPage() {
  const { locale, localePath } = useLanguage();
  const l = labels[locale];
  const markToolUsed = useTrackToolUseOnce("timestamp-converter");

  const [nowSec, setNowSec] = useState(() => Math.floor(Date.now() / 1000));
  const [tsInput, setTsInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [copied, setCopied] = useState("");

  useEffect(() => {
    const id = setInterval(() => setNowSec(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(id);
  }, []);

  const parsed = useMemo(() => {
    const t = tsInput.trim();
    if (!t) return null;
    if (!/^-?\d+$/.test(t)) return { invalid: true } as const;
    const n = Number(t);
    // 13+ hane milisaniyedir
    const ms = t.replace("-", "").length >= 13 ? n : n * 1000;
    const d = new Date(ms);
    if (isNaN(d.getTime())) return { invalid: true } as const;
    return { invalid: false as const, d, ms };
  }, [tsInput]);

  const dateParsed = useMemo(() => {
    if (!dateInput) return null;
    const d = new Date(dateInput);
    return isNaN(d.getTime()) ? null : d;
  }, [dateInput]);

  const copy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 1500);
  };

  const fmt = (d: Date, utc: boolean) =>
    d.toLocaleString(locale === "tr" ? "tr-TR" : "en-US", {
      dateStyle: "full",
      timeStyle: "medium",
      timeZone: utc ? "UTC" : undefined,
    });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href={localePath("/")} className="text-primary-600 hover:text-primary-700 text-sm">
          {l.back}
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">{l.title}</h1>
      <p className="text-gray-600 mb-8">{l.subtitle}</p>

      <div className="bg-primary-50 rounded-2xl p-6 text-center mb-10">
        <p className="text-sm font-medium text-gray-500 mb-1">{l.now}</p>
        <button
          onClick={() => copy(String(nowSec), "now")}
          className="text-4xl font-mono font-bold text-primary-600 hover:text-primary-700"
          title={l.copy}
        >
          {nowSec}
        </button>
        <p className="text-xs text-gray-400 mt-1">{copied === "now" ? l.copied : l.copy + " ↑"}</p>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="font-semibold text-gray-900 mb-3">{l.tsToDate}</h2>
          <input
            type="text"
            inputMode="numeric"
            value={tsInput}
            onChange={(e) => { setTsInput(e.target.value); if (e.target.value.trim()) markToolUsed(); }}
            placeholder="1721600000"
            className="w-full max-w-sm p-3 bg-white border border-gray-200 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          {parsed && parsed.invalid && (
            <p className="text-red-600 text-sm mt-2">{l.invalid}</p>
          )}
          {parsed && !parsed.invalid && (
            <div className="mt-4 space-y-2">
              {[
                [l.local, fmt(parsed.d, false)],
                [l.utc, fmt(parsed.d, true)],
                [l.iso, parsed.d.toISOString()],
                [l.relative, relative(parsed.ms, locale, l)],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-wrap justify-between gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2.5 shadow-sm text-sm">
                  <span className="text-gray-500">{k}</span>
                  <span className="font-medium text-gray-900">{v}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="font-semibold text-gray-900 mb-3">{l.dateToTs}</h2>
          <input
            type="datetime-local"
            value={dateInput}
            onChange={(e) => { setDateInput(e.target.value); if (e.target.value) markToolUsed(); }}
            className="p-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          {dateParsed && (
            <div className="mt-4 space-y-2">
              {[
                [l.seconds, String(Math.floor(dateParsed.getTime() / 1000)), "sec"],
                [l.millis, String(dateParsed.getTime()), "ms"],
                [l.iso, dateParsed.toISOString(), "iso"],
              ].map(([k, v, key]) => (
                <div key={key} className="flex flex-wrap items-center justify-between gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2.5 shadow-sm text-sm">
                  <span className="text-gray-500">{k}</span>
                  <span className="flex items-center gap-3">
                    <span className="font-mono font-medium text-gray-900">{v}</span>
                    <button onClick={() => copy(v, key)} className="text-primary-600 hover:text-primary-700 text-xs font-medium">
                      {copied === key ? l.copied : l.copy}
                    </button>
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
