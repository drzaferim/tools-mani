"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage, pick } from "@/lib/language-context";
import { trackToolUse } from "@/lib/track";

const labels = {
  en: {
    back: "← Back to Tools",
    title: "UUID Generator & Text Hash",
    subtitle:
      "Generate random UUID v4 identifiers or compute cryptographic hashes of any text. Everything runs in your browser.",
    tabUuid: "UUID v4",
    tabHash: "Text Hash",
    count: "How many?",
    uppercase: "Uppercase",
    noHyphens: "Without hyphens",
    generate: "Generate",
    copyAll: "Copy All",
    copied: "Copied!",
    hashInput: "Text to hash",
    hashPlaceholder: "Type or paste any text...",
    algorithm: "Algorithm",
    compute: "Compute Hash",
    result: "Result",
    copy: "Copy",
  },
  tr: {
    back: "← Araçlara Dön",
    title: "UUID Üretici & Metin Hash",
    subtitle:
      "Rastgele UUID v4 kimlikleri üretin veya herhangi bir metnin kriptografik hash'ini hesaplayın. Her şey tarayıcınızda çalışır.",
    tabUuid: "UUID v4",
    tabHash: "Metin Hash",
    count: "Kaç adet?",
    uppercase: "Büyük harf",
    noHyphens: "Tiresiz",
    generate: "Üret",
    copyAll: "Tümünü Kopyala",
    copied: "Kopyalandı!",
    hashInput: "Hash'lenecek metin",
    hashPlaceholder: "Metni yazın veya yapıştırın...",
    algorithm: "Algoritma",
    compute: "Hash Hesapla",
    result: "Sonuç",
    copy: "Kopyala",
  },
};

const ALGORITHMS = ["SHA-256", "SHA-512", "SHA-1"] as const;

export default function UuidGeneratorPage() {
  const { locale, localePath } = useLanguage();
  const l = pick(labels, locale);

  const [tab, setTab] = useState<"uuid" | "hash">("uuid");
  const [count, setCount] = useState(5);
  const [uppercase, setUppercase] = useState(false);
  const [noHyphens, setNoHyphens] = useState(false);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copiedAll, setCopiedAll] = useState(false);

  const [hashText, setHashText] = useState("");
  const [algorithm, setAlgorithm] = useState<(typeof ALGORITHMS)[number]>("SHA-256");
  const [hashResult, setHashResult] = useState("");

  const generateUuids = () => {
    const n = Math.min(Math.max(count, 1), 1000);
    const list = Array.from({ length: n }, () => {
      let id = crypto.randomUUID();
      if (noHyphens) id = id.replaceAll("-", "");
      if (uppercase) id = id.toUpperCase();
      return id;
    });
    setUuids(list);
    setCopiedAll(false);
    void trackToolUse("uuid-generator");
  };

  const computeHash = async () => {
    if (!hashText) return;
    const data = new TextEncoder().encode(hashText);
    const digest = await crypto.subtle.digest(algorithm, data);
    const hex = Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    setHashResult(hex);
    void trackToolUse("uuid-generator");
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(uuids.join("\n"));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href={localePath("/")} className="text-primary-600 hover:text-primary-700 text-sm">
          {l.back}
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">{l.title}</h1>
      <p className="text-gray-600 mb-8">{l.subtitle}</p>

      <div className="flex gap-2 mb-8">
        {(["uuid", "hash"] as const).map((tabId) => (
          <button
            key={tabId}
            onClick={() => setTab(tabId)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              tab === tabId
                ? "bg-primary-600 text-white shadow-md shadow-primary-200/50"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tabId === "uuid" ? l.tabUuid : l.tabHash}
          </button>
        ))}
      </div>

      {tab === "uuid" ? (
        <div>
          <div className="flex flex-wrap items-end gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{l.count}</label>
              <input
                type="number"
                min={1}
                max={1000}
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-28 p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-700 pb-3">
              <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} className="rounded" />
              {l.uppercase}
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700 pb-3">
              <input type="checkbox" checked={noHyphens} onChange={(e) => setNoHyphens(e.target.checked)} className="rounded" />
              {l.noHyphens}
            </label>
            <button onClick={generateUuids} className="btn-primary text-sm mb-1.5">
              {l.generate}
            </button>
          </div>

          {uuids.length > 0 && (
            <>
              <textarea
                value={uuids.join("\n")}
                readOnly
                className="w-full h-64 p-4 bg-gray-50 border border-gray-200 rounded-xl font-mono text-sm resize-y focus:outline-none"
              />
              <div className="mt-4">
                <button onClick={copyAll} className="btn-primary text-sm">
                  {copiedAll ? l.copied : l.copyAll}
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{l.hashInput}</label>
          <textarea
            value={hashText}
            onChange={(e) => setHashText(e.target.value)}
            placeholder={l.hashPlaceholder}
            className="w-full h-40 p-4 bg-white border border-gray-200 rounded-xl font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4"
          />
          <div className="flex flex-wrap items-end gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{l.algorithm}</label>
              <select
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value as (typeof ALGORITHMS)[number])}
                className="p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {ALGORITHMS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
            <button onClick={computeHash} disabled={!hashText} className="btn-primary text-sm mb-1.5 disabled:opacity-50">
              {l.compute}
            </button>
          </div>

          {hashResult && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{l.result}</label>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl font-mono text-sm break-all">
                {hashResult}
              </div>
              <div className="mt-4">
                <button
                  onClick={() => navigator.clipboard.writeText(hashResult)}
                  className="btn-primary text-sm"
                >
                  {l.copy}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
