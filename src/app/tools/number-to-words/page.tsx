"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { useTrackToolUseOnce } from "@/lib/track";

const labels = {
  en: {
    back: "← Back to Tools",
    title: "Number to Words",
    subtitle:
      "Spell out any number in Turkish and English — handy for invoices, cheques, contracts and official forms.",
    input: "Number",
    placeholder: "1250,75",
    turkish: "Turkish",
    english: "English",
    copy: "Copy",
    copied: "Copied!",
    invalid: "Enter a valid number (up to 15 digits).",
    hint: "Decimals are supported with comma or dot (e.g. 1250,75).",
  },
  tr: {
    back: "← Araçlara Dön",
    title: "Sayıyı Yazıya Çevirme",
    subtitle:
      "Herhangi bir sayının Türkçe ve İngilizce okunuşunu yazıya dökün — fatura, çek, sözleşme ve resmi formlar için birebir.",
    input: "Sayı",
    placeholder: "1250,75",
    turkish: "Türkçe",
    english: "İngilizce",
    copy: "Kopyala",
    copied: "Kopyalandı!",
    invalid: "Geçerli bir sayı girin (en fazla 15 basamak).",
    hint: "Ondalık için virgül veya nokta kullanabilirsiniz (örn. 1250,75).",
  },
};

const TR_ONES = ["", "bir", "iki", "üç", "dört", "beş", "altı", "yedi", "sekiz", "dokuz"];
const TR_TENS = ["", "on", "yirmi", "otuz", "kırk", "elli", "altmış", "yetmiş", "seksen", "doksan"];
const TR_SCALE = ["", "bin", "milyon", "milyar", "trilyon"];

function trThreeDigits(n: number): string {
  const parts: string[] = [];
  const h = Math.floor(n / 100);
  const t = Math.floor((n % 100) / 10);
  const o = n % 10;
  if (h > 0) parts.push(h === 1 ? "yüz" : TR_ONES[h] + " yüz");
  if (t > 0) parts.push(TR_TENS[t]);
  if (o > 0) parts.push(TR_ONES[o]);
  return parts.join(" ");
}

function trIntToWords(n: number): string {
  if (n === 0) return "sıfır";
  const groups: number[] = [];
  while (n > 0) {
    groups.push(n % 1000);
    n = Math.floor(n / 1000);
  }
  const parts: string[] = [];
  for (let i = groups.length - 1; i >= 0; i--) {
    const g = groups[i];
    if (g === 0) continue;
    // "bir bin" değil "bin"
    const words = i === 1 && g === 1 ? "" : trThreeDigits(g);
    parts.push((words + " " + TR_SCALE[i]).trim());
  }
  return parts.join(" ").trim();
}

const EN_ONES = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
  "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const EN_TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
const EN_SCALE = ["", "thousand", "million", "billion", "trillion"];

function enThreeDigits(n: number): string {
  const parts: string[] = [];
  const h = Math.floor(n / 100);
  const rest = n % 100;
  if (h > 0) parts.push(EN_ONES[h] + " hundred");
  if (rest >= 20) {
    const t = Math.floor(rest / 10);
    const o = rest % 10;
    parts.push(EN_TENS[t] + (o > 0 ? "-" + EN_ONES[o] : ""));
  } else if (rest > 0) {
    parts.push(EN_ONES[rest]);
  }
  return parts.join(" ");
}

function enIntToWords(n: number): string {
  if (n === 0) return "zero";
  const groups: number[] = [];
  while (n > 0) {
    groups.push(n % 1000);
    n = Math.floor(n / 1000);
  }
  const parts: string[] = [];
  for (let i = groups.length - 1; i >= 0; i--) {
    const g = groups[i];
    if (g === 0) continue;
    parts.push((enThreeDigits(g) + " " + EN_SCALE[i]).trim());
  }
  return parts.join(" ").trim();
}

export default function NumberToWordsPage() {
  const { locale, localePath } = useLanguage();
  const l = labels[locale];
  const markToolUsed = useTrackToolUseOnce("number-to-words");

  const [input, setInput] = useState("");
  const [copied, setCopied] = useState("");

  const result = useMemo(() => {
    const raw = input.trim().replace(/\s/g, "");
    if (!raw) return null;
    // Türkçe biçim: 1.250,75 — noktaları binlik ayırıcı say, virgülü ondalık yap
    const normalized = raw.includes(",")
      ? raw.replace(/\./g, "").replace(",", ".")
      : raw;
    if (!/^-?\d+(\.\d+)?$/.test(normalized)) return { invalid: true } as const;
    const neg = normalized.startsWith("-");
    const [intPart, decPart] = normalized.replace("-", "").split(".");
    if (intPart.length > 15 || (decPart && decPart.length > 6)) return { invalid: true } as const;
    const intNum = Number(intPart);
    const decNum = decPart ? Number(decPart) : null;

    let tr = trIntToWords(intNum);
    let en = enIntToWords(intNum);
    if (decNum !== null && decPart) {
      tr += " virgül " + (decNum === 0 ? "sıfır" : trIntToWords(decNum));
      en += " point " + (decNum === 0 ? "zero" : enIntToWords(decNum));
    }
    if (neg) {
      tr = "eksi " + tr;
      en = "minus " + en;
    }
    return { invalid: false as const, tr, en };
  }, [input]);

  const copy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 1500);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href={localePath("/")} className="text-primary-600 hover:text-primary-700 text-sm">
          {l.back}
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">{l.title}</h1>
      <p className="text-gray-600 mb-2">{l.subtitle}</p>
      <p className="text-xs text-gray-400 mb-8">{l.hint}</p>

      <label className="block text-sm font-medium text-gray-700 mb-2">{l.input}</label>
      <input
        type="text"
        inputMode="decimal"
        value={input}
        onChange={(e) => { setInput(e.target.value); if (e.target.value.trim()) markToolUsed(); }}
        placeholder={l.placeholder}
        className="w-full max-w-xs p-3 bg-white border border-gray-200 rounded-xl text-lg font-mono focus:outline-none focus:ring-2 focus:ring-primary-500 mb-8"
      />

      {result && result.invalid && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">{l.invalid}</div>
      )}

      {result && !result.invalid && (
        <div className="space-y-4">
          {[
            [l.turkish, result.tr, "tr"],
            [l.english, result.en, "en"],
          ].map(([lang, text, key]) => (
            <div key={key} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-gray-400 uppercase">{lang}</p>
                <button
                  onClick={() => copy(String(text), String(key))}
                  className="text-primary-600 hover:text-primary-700 text-xs font-medium"
                >
                  {copied === key ? l.copied : l.copy}
                </button>
              </div>
              <p className="text-lg text-gray-900 capitalize">{text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
