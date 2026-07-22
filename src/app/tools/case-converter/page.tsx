"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { useTrackToolUseOnce } from "@/lib/track";

const labels = {
  en: {
    back: "← Back to Tools",
    title: "Case Converter",
    subtitle:
      "Convert text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case and kebab-case.",
    placeholder: "Type or paste your text here...",
    copy: "Copy Result",
    copied: "Copied!",
    clear: "Clear",
    trNote: "Turkish characters (İ/ı) are handled correctly.",
  },
  tr: {
    back: "← Araçlara Dön",
    title: "Büyük/Küçük Harf Dönüştürücü",
    subtitle:
      "Metni BÜYÜK HARF, küçük harf, Kelime Başı Büyük, Cümle düzeni, camelCase, snake_case ve kebab-case biçimlerine dönüştürün.",
    placeholder: "Metni buraya yazın veya yapıştırın...",
    copy: "Sonucu Kopyala",
    copied: "Kopyalandı!",
    clear: "Temizle",
    trNote: "Türkçe karakterler (İ/ı) doğru işlenir.",
  },
};

type Mode = "upper" | "lower" | "title" | "sentence" | "camel" | "snake" | "kebab";

const modeNames: Record<Mode, { en: string; tr: string }> = {
  upper: { en: "UPPERCASE", tr: "BÜYÜK HARF" },
  lower: { en: "lowercase", tr: "küçük harf" },
  title: { en: "Title Case", tr: "Kelime Başı Büyük" },
  sentence: { en: "Sentence case", tr: "Cümle düzeni" },
  camel: { en: "camelCase", tr: "camelCase" },
  snake: { en: "snake_case", tr: "snake_case" },
  kebab: { en: "kebab-case", tr: "kebab-case" },
};

// Latin + Latin Extended (Türkçe İ/ı/ğ/ş dahil) kelime karakterleri — es5 hedefi u-bayrağını desteklemediği için aralıkla yazıldı
const WORD_RE = /[A-Za-z0-9À-ɏ]+/g;
const NON_WORD_RE = /[^A-Za-z0-9À-ɏ]+/g;

function convert(text: string, mode: Mode, locale: string): string {
  const lc = (s: string) => s.toLocaleLowerCase(locale);
  const uc = (s: string) => s.toLocaleUpperCase(locale);
  const words = () =>
    text
      .replace(NON_WORD_RE, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => lc(w));

  switch (mode) {
    case "upper":
      return uc(text);
    case "lower":
      return lc(text);
    case "title":
      return text.replace(WORD_RE, (w) => uc(w.charAt(0)) + lc(w.slice(1)));
    case "sentence":
      return lc(text).replace(/(^\s*\S|[.!?]\s+\S)/g, (m) => uc(m));
    case "camel":
      return words()
        .map((w, i) => (i === 0 ? w : uc(w.charAt(0)) + w.slice(1)))
        .join("");
    case "snake":
      return words().join("_");
    case "kebab":
      return words().join("-");
  }
}

export default function CaseConverterPage() {
  const { locale, localePath } = useLanguage();
  const l = labels[locale];
  const markToolUsed = useTrackToolUseOnce("case-converter");

  const [text, setText] = useState("");
  const [mode, setMode] = useState<Mode>("upper");
  const [copied, setCopied] = useState(false);

  const output = text ? convert(text, mode, locale) : "";

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href={localePath("/")} className="text-primary-600 hover:text-primary-700 text-sm">
          {l.back}
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">{l.title}</h1>
      <p className="text-gray-600 mb-2">{l.subtitle}</p>
      <p className="text-xs text-gray-400 mb-8">{l.trNote}</p>

      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          if (e.target.value.trim()) markToolUsed();
        }}
        placeholder={l.placeholder}
        className="w-full h-40 p-4 bg-white border border-gray-200 rounded-xl text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4"
      />

      <div className="flex flex-wrap gap-2 mb-6">
        {(Object.keys(modeNames) as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              mode === m
                ? "bg-primary-600 text-white shadow-md shadow-primary-200/50"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {modeNames[m][locale]}
          </button>
        ))}
      </div>

      <textarea
        value={output}
        readOnly
        className="w-full h-40 p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm resize-y focus:outline-none mb-4"
      />

      <div className="flex gap-3">
        <button onClick={copy} disabled={!output} className="btn-primary text-sm disabled:opacity-50">
          {copied ? l.copied : l.copy}
        </button>
        <button onClick={() => setText("")} className="btn-secondary text-sm">
          {l.clear}
        </button>
      </div>
    </div>
  );
}
