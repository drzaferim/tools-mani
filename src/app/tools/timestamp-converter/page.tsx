"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useLanguage, pick, localeTag } from "@/lib/language-context";
import type { Locale } from "@/lib/translations";
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
    justNow: "just now",
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
    justNow: "az önce",
  },
  es: {
    back: "← Volver a las herramientas",
    title: "Conversor de marcas de tiempo Unix",
    subtitle:
      "Convierte marcas de tiempo Unix (segundos o milisegundos) a fechas legibles y viceversa, en tu zona horaria local y en UTC.",
    now: "Hora Unix actual",
    copy: "Copiar",
    copied: "¡Copiado!",
    tsToDate: "Marca de tiempo → Fecha",
    dateToTs: "Fecha → Marca de tiempo",
    tsInput: "Marca de tiempo Unix (s o ms)",
    dateInput: "Fecha y hora",
    local: "Hora local",
    utc: "UTC",
    relative: "Relativo",
    seconds: "Segundos Unix",
    millis: "Milisegundos Unix",
    iso: "ISO 8601",
    invalid: "Marca de tiempo no válida.",
    justNow: "ahora mismo",
  },
  de: {
    back: "← Zurück zu den Tools",
    title: "Unix-Zeitstempel-Konverter",
    subtitle:
      "Wandeln Sie Unix-Zeitstempel (Sekunden oder Millisekunden) in lesbare Datumsangaben um und zurück – in Ihrer lokalen Zeitzone und in UTC.",
    now: "Aktuelle Unix-Zeit",
    copy: "Kopieren",
    copied: "Kopiert!",
    tsToDate: "Zeitstempel → Datum",
    dateToTs: "Datum → Zeitstempel",
    tsInput: "Unix-Zeitstempel (s oder ms)",
    dateInput: "Datum und Uhrzeit",
    local: "Ortszeit",
    utc: "UTC",
    relative: "Relativ",
    seconds: "Unix-Sekunden",
    millis: "Unix-Millisekunden",
    iso: "ISO 8601",
    invalid: "Ungültiger Zeitstempel.",
    justNow: "gerade eben",
  },
  pt: {
    back: "← Voltar às ferramentas",
    title: "Conversor de timestamp Unix",
    subtitle:
      "Converta timestamps Unix (segundos ou milissegundos) em datas legíveis e vice-versa — no seu fuso horário local e em UTC.",
    now: "Hora Unix atual",
    copy: "Copiar",
    copied: "Copiado!",
    tsToDate: "Timestamp → Data",
    dateToTs: "Data → Timestamp",
    tsInput: "Timestamp Unix (s ou ms)",
    dateInput: "Data e hora",
    local: "Hora local",
    utc: "UTC",
    relative: "Relativo",
    seconds: "Segundos Unix",
    millis: "Milissegundos Unix",
    iso: "ISO 8601",
    invalid: "Timestamp inválido.",
    justNow: "agora mesmo",
  },
  fr: {
    back: "← Retour aux outils",
    title: "Convertisseur de timestamp Unix",
    subtitle:
      "Convertissez des timestamps Unix (secondes ou millisecondes) en dates lisibles et inversement — dans votre fuseau horaire local et en UTC.",
    now: "Heure Unix actuelle",
    copy: "Copier",
    copied: "Copié !",
    tsToDate: "Timestamp → Date",
    dateToTs: "Date → Timestamp",
    tsInput: "Timestamp Unix (s ou ms)",
    dateInput: "Date et heure",
    local: "Heure locale",
    utc: "UTC",
    relative: "Relatif",
    seconds: "Secondes Unix",
    millis: "Millisecondes Unix",
    iso: "ISO 8601",
    invalid: "Timestamp non valide.",
    justNow: "à l'instant",
  },
};

const RELATIVE_UNITS: [number, Intl.RelativeTimeFormatUnit][] = [
  [31536000000, "year"],
  [2592000000, "month"],
  [86400000, "day"],
  [3600000, "hour"],
  [60000, "minute"],
  [1000, "second"],
];

/**
 * Göreli süreyi Intl.RelativeTimeFormat ile üretir — çoğul kuralları ve
 * "önce/sonra" yönü her dil için tarayıcıdan gelir, elle çevrilmez.
 */
function relative(ms: number, locale: Locale, l: (typeof labels)["en"]): string {
  const diff = Date.now() - ms;
  const abs = Math.abs(diff);
  for (const [unitMs, unit] of RELATIVE_UNITS) {
    if (abs >= unitMs) {
      const v = Math.floor(abs / unitMs);
      return new Intl.RelativeTimeFormat(localeTag(locale), { numeric: "always" }).format(
        diff >= 0 ? -v : v,
        unit
      );
    }
  }
  return l.justNow;
}

export default function TimestampConverterPage() {
  const { locale, localePath } = useLanguage();
  const l = pick(labels, locale);
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
    d.toLocaleString(localeTag(locale), {
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
