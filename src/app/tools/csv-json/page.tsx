"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { trackToolUse } from "@/lib/track";

const labels = {
  en: {
    back: "← Back to Tools",
    title: "CSV ↔ JSON Converter",
    subtitle:
      "Convert CSV data to JSON and back. Handles quoted fields, custom delimiters and nested-free flat JSON arrays.",
    csvToJson: "CSV → JSON",
    jsonToCsv: "JSON → CSV",
    delimiter: "Delimiter",
    comma: "Comma (,)",
    semicolon: "Semicolon (;)",
    tab: "Tab",
    input: "Input",
    output: "Output",
    phCsv: "name,age\nAlice,30\nBob,25",
    phJson: '[{"name":"Alice","age":30},{"name":"Bob","age":25}]',
    convert: "Convert",
    copy: "Copy",
    copied: "Copied!",
    clear: "Clear",
    errCsv: "Could not parse CSV. Check the delimiter and quoting.",
    errJson: "Invalid JSON. Expected an array of flat objects.",
  },
  tr: {
    back: "← Araçlara Dön",
    title: "CSV ↔ JSON Dönüştürücü",
    subtitle:
      "CSV veriyi JSON'a, JSON'u CSV'ye çevirin. Tırnaklı alanları ve farklı ayırıcıları destekler.",
    csvToJson: "CSV → JSON",
    jsonToCsv: "JSON → CSV",
    delimiter: "Ayırıcı",
    comma: "Virgül (,)",
    semicolon: "Noktalı virgül (;)",
    tab: "Sekme (Tab)",
    input: "Girdi",
    output: "Çıktı",
    phCsv: "ad,yas\nAyşe,30\nMehmet,25",
    phJson: '[{"ad":"Ayşe","yas":30},{"ad":"Mehmet","yas":25}]',
    convert: "Dönüştür",
    copy: "Kopyala",
    copied: "Kopyalandı!",
    clear: "Temizle",
    errCsv: "CSV çözümlenemedi. Ayırıcıyı ve tırnakları kontrol edin.",
    errJson: "Geçersiz JSON. Düz nesnelerden oluşan bir dizi bekleniyor.",
  },
};

// RFC 4180 uyumlu basit CSV çözümleyici
function parseCsv(text: string, delim: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === delim) {
      row.push(field); field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); field = "";
      rows.push(row); row = [];
    } else field += c;
  }
  if (field !== "" || row.length > 0) { row.push(field); rows.push(row); }
  return rows.filter((r) => !(r.length === 1 && r[0] === ""));
}

function toCsvField(v: unknown, delim: string): string {
  const s = v === null || v === undefined ? "" : String(v);
  return s.includes('"') || s.includes(delim) || s.includes("\n")
    ? '"' + s.replaceAll('"', '""') + '"'
    : s;
}

export default function CsvJsonPage() {
  const { locale, localePath } = useLanguage();
  const l = labels[locale];

  const [direction, setDirection] = useState<"c2j" | "j2c">("c2j");
  const [delim, setDelim] = useState(",");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const convert = () => {
    setError("");
    setOutput("");
    if (!input.trim()) return;
    try {
      if (direction === "c2j") {
        const rows = parseCsv(input, delim === "\\t" ? "\t" : delim);
        if (rows.length < 1) throw new Error("empty");
        const [header, ...data] = rows;
        const objs = data.map((r) =>
          Object.fromEntries(
            header.map((h, i) => {
              const raw = r[i] ?? "";
              const num = Number(raw);
              const val = raw !== "" && !isNaN(num) && raw.trim() !== "" ? num : raw;
              return [h, val];
            })
          )
        );
        setOutput(JSON.stringify(objs, null, 2));
      } else {
        const arr = JSON.parse(input);
        if (!Array.isArray(arr) || arr.some((o) => typeof o !== "object" || o === null || Array.isArray(o)))
          throw new Error("shape");
        const d = delim === "\\t" ? "\t" : delim;
        const headers = Array.from(new Set(arr.flatMap((o: object) => Object.keys(o))));
        const lines = [
          headers.map((h) => toCsvField(h, d)).join(d),
          ...arr.map((o: Record<string, unknown>) =>
            headers.map((h) => toCsvField(o[h], d)).join(d)
          ),
        ];
        setOutput(lines.join("\n"));
      }
      void trackToolUse("csv-json");
    } catch {
      setError(direction === "c2j" ? l.errCsv : l.errJson);
    }
  };

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
      <p className="text-gray-600 mb-8">{l.subtitle}</p>

      <div className="flex flex-wrap items-end gap-4 mb-6">
        <div className="flex gap-2">
          {(["c2j", "j2c"] as const).map((d) => (
            <button
              key={d}
              onClick={() => { setDirection(d); setOutput(""); setError(""); }}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                direction === d
                  ? "bg-primary-600 text-white shadow-md shadow-primary-200/50"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {d === "c2j" ? l.csvToJson : l.jsonToCsv}
            </button>
          ))}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{l.delimiter}</label>
          <select
            value={delim}
            onChange={(e) => setDelim(e.target.value)}
            className="p-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value=",">{l.comma}</option>
            <option value=";">{l.semicolon}</option>
            <option value="\t">{l.tab}</option>
          </select>
        </div>
        <button onClick={convert} className="btn-primary text-sm">{l.convert}</button>
        <button onClick={() => { setInput(""); setOutput(""); setError(""); }} className="btn-secondary text-sm">
          {l.clear}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{l.input}</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={direction === "c2j" ? l.phCsv : l.phJson}
            spellCheck={false}
            className="w-full h-72 p-4 bg-white border border-gray-200 rounded-xl font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{l.output}</label>
          <textarea
            value={output}
            readOnly
            spellCheck={false}
            className="w-full h-72 p-4 bg-gray-50 border border-gray-200 rounded-xl font-mono text-sm resize-y focus:outline-none"
          />
        </div>
      </div>

      {output && (
        <div className="mt-4">
          <button onClick={copy} className="btn-primary text-sm">{copied ? l.copied : l.copy}</button>
        </div>
      )}
    </div>
  );
}
