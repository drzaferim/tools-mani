"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage, pick, localeTag } from "@/lib/language-context";
import type { Locale } from "@/lib/translations";
import { useTrackToolUseOnce } from "@/lib/track";

/**
 * m1Swap: soru dizilişi dile göre değişir. İngilizcede "yüzde kaç" önce gelir
 * ("What is 25% of 200"), Türkçede taban sayı önce gelir ("200 sayısının %25'i").
 * pct: yüzde işaretinin yeri de dile bağlı — TR "%25", EN "25%", DE/FR/ES "25 %".
 */
const labels = {
  en: {
    back: "← Back to Tools",
    title: "Percentage Calculator",
    subtitle: "Three most common percentage questions, answered instantly.",
    m1a: "What is",
    m1b: "% of",
    m1c: "",
    m1Swap: false,
    m2b: "is what percent of",
    m3a: "Change from",
    m3b: "to",
    increase: "increase",
    decrease: "decrease",
    pct: (v: string) => `${v}%`,
  },
  tr: {
    back: "← Araçlara Dön",
    title: "Yüzde Hesaplama",
    subtitle: "En sık sorulan üç yüzde sorusu, anında cevaplı.",
    m1a: "",
    m1b: "sayısının %",
    m1c: "'i",
    m1Swap: true,
    m2b: "sayısı şunun yüzde kaçı:",
    m3a: "Değişim:",
    m3b: "→",
    increase: "artış",
    decrease: "azalış",
    pct: (v: string) => `%${v}`,
  },
  es: {
    back: "← Volver a las herramientas",
    title: "Calculadora de porcentajes",
    subtitle: "Las tres preguntas de porcentaje más habituales, resueltas al instante.",
    m1a: "¿Cuánto es el",
    m1b: "% de",
    m1c: "?",
    m1Swap: false,
    m2b: "¿qué porcentaje es de",
    m3a: "Variación de",
    m3b: "a",
    increase: "aumento",
    decrease: "disminución",
    pct: (v: string) => `${v} %`,
  },
  de: {
    back: "← Zurück zu den Tools",
    title: "Prozentrechner",
    subtitle: "Die drei häufigsten Prozentfragen – sofort beantwortet.",
    m1a: "Wie viel sind",
    m1b: "% von",
    m1c: "?",
    m1Swap: false,
    m2b: "sind wie viel Prozent von",
    m3a: "Änderung von",
    m3b: "auf",
    increase: "Zunahme",
    decrease: "Abnahme",
    pct: (v: string) => `${v} %`,
  },
  pt: {
    back: "← Voltar às ferramentas",
    title: "Calculadora de porcentagem",
    subtitle: "As três perguntas de porcentagem mais comuns, respondidas na hora.",
    m1a: "Quanto é",
    m1b: "% de",
    m1c: "?",
    m1Swap: false,
    m2b: "é quantos por cento de",
    m3a: "Variação de",
    m3b: "para",
    increase: "aumento",
    decrease: "redução",
    pct: (v: string) => `${v}%`,
  },
  fr: {
    back: "← Retour aux outils",
    title: "Calculateur de pourcentage",
    subtitle: "Les trois questions de pourcentage les plus courantes, résolues instantanément.",
    m1a: "Combien font",
    m1b: "% de",
    m1c: " ?",
    m1Swap: false,
    m2b: "représente quel pourcentage de",
    m3a: "Variation de",
    m3b: "à",
    increase: "hausse",
    decrease: "baisse",
    pct: (v: string) => `${v} %`,
  },
};

function parseNum(s: string): number | null {
  if (!s.trim()) return null;
  const n = Number(s.replace(",", "."));
  return isNaN(n) ? null : n;
}

function fmt(n: number, locale: Locale): string {
  return n.toLocaleString(localeTag(locale), { maximumFractionDigits: 4 });
}

const inputCls =
  "w-28 p-2.5 bg-white border border-gray-200 rounded-xl text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary-500";

export default function PercentageCalculatorPage() {
  const { locale, localePath } = useLanguage();
  const l = pick(labels, locale);
  const markToolUsed = useTrackToolUseOnce("percentage-calculator");

  const [a1, setA1] = useState(""); const [b1, setB1] = useState("");
  const [a2, setA2] = useState(""); const [b2, setB2] = useState("");
  const [a3, setA3] = useState(""); const [b3, setB3] = useState("");

  const wrap = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    if (e.target.value) markToolUsed();
  };

  const p1 = parseNum(a1) !== null && parseNum(b1) !== null ? (parseNum(b1)! * parseNum(a1)!) / 100 : null;
  const p2 =
    parseNum(a2) !== null && parseNum(b2) !== null && parseNum(b2) !== 0
      ? (parseNum(a2)! / parseNum(b2)!) * 100
      : null;
  const v3a = parseNum(a3); const v3b = parseNum(b3);
  const p3 = v3a !== null && v3b !== null && v3a !== 0 ? ((v3b - v3a) / Math.abs(v3a)) * 100 : null;

  const card = "bg-white border border-gray-100 rounded-2xl p-6 shadow-sm";
  const resultCls = "text-2xl font-bold text-primary-600";

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href={localePath("/")} className="text-primary-600 hover:text-primary-700 text-sm">
          {l.back}
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">{l.title}</h1>
      <p className="text-gray-600 mb-10">{l.subtitle}</p>

      <div className="space-y-6">
        <div className={card}>
          <div className="flex flex-wrap items-center gap-3 text-gray-700">
            {l.m1a && <span>{l.m1a}</span>}
            {l.m1Swap ? (
              <>
                <input type="text" inputMode="decimal" value={b1} onChange={wrap(setB1)} placeholder="200" className={inputCls} />
                <span>{l.m1b}</span>
                <input type="text" inputMode="decimal" value={a1} onChange={wrap(setA1)} placeholder="25" className={inputCls} />
              </>
            ) : (
              <>
                <input type="text" inputMode="decimal" value={a1} onChange={wrap(setA1)} placeholder="25" className={inputCls} />
                <span>{l.m1b}</span>
                <input type="text" inputMode="decimal" value={b1} onChange={wrap(setB1)} placeholder="200" className={inputCls} />
              </>
            )}
            {l.m1c && <span>{l.m1c}</span>}
            <span className="text-gray-400">=</span>
            {p1 !== null && <span className={resultCls}>{fmt(p1, locale)}</span>}
          </div>
        </div>

        <div className={card}>
          <div className="flex flex-wrap items-center gap-3 text-gray-700">
            <input type="text" inputMode="decimal" value={a2} onChange={wrap(setA2)} placeholder="50" className={inputCls} />
            <span>{l.m2b}</span>
            <input type="text" inputMode="decimal" value={b2} onChange={wrap(setB2)} placeholder="200" className={inputCls} />
            <span className="text-gray-400">=</span>
            {p2 !== null && <span className={resultCls}>{l.pct(fmt(p2, locale))}</span>}
          </div>
        </div>

        <div className={card}>
          <div className="flex flex-wrap items-center gap-3 text-gray-700">
            <span>{l.m3a}</span>
            <input type="text" inputMode="decimal" value={a3} onChange={wrap(setA3)} placeholder="80" className={inputCls} />
            <span>{l.m3b}</span>
            <input type="text" inputMode="decimal" value={b3} onChange={wrap(setB3)} placeholder="100" className={inputCls} />
            <span className="text-gray-400">=</span>
            {p3 !== null && (
              <span className={p3 >= 0 ? "text-2xl font-bold text-green-600" : "text-2xl font-bold text-red-600"}>
                {l.pct(fmt(Math.abs(p3), locale))}{" "}
                <span className="text-base font-medium">({p3 >= 0 ? l.increase : l.decrease})</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
