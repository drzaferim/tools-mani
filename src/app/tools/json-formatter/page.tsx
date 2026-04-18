"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import Link from "next/link";
import { trackToolUse } from "@/lib/track";

export default function JsonFormatterPage() {
  const { locale } = useLanguage();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indentSize, setIndentSize] = useState(2);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indentSize));
      setError("");
      void trackToolUse("json-formatter");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
      void trackToolUse("json-formatter");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  };

  const validateJson = () => {
    try {
      JSON.parse(input);
      setError("");
      setOutput("Valid JSON!");
      void trackToolUse("json-formatter");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link
          href="/"
          className="text-primary-600 hover:text-primary-700 text-sm"
        >
          &larr; Back to Tools
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">JSON Formatter</h1>
      <p className="text-gray-600 mb-8">
        Format, validate, and beautify your JSON data instantly.
      </p>

      <div className="flex flex-wrap gap-3 mb-6">
        <button onClick={formatJson} className="btn-primary text-sm">
          Format
        </button>
        <button onClick={minifyJson} className="btn-secondary text-sm">
          Minify
        </button>
        <button onClick={validateJson} className="btn-secondary text-sm">
          Validate
        </button>
        <select
          value={indentSize}
          onChange={(e) => setIndentSize(Number(e.target.value))}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
        >
          <option value={2}>2 spaces</option>
          <option value={4}>4 spaces</option>
          <option value={8}>Tab (8)</option>
        </select>
        <button
          onClick={() => {
            setInput("");
            setOutput("");
            setError("");
          }}
          className="btn-secondary text-sm"
        >
          Clear
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Input
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"key": "value"}'
            className="w-full h-96 p-4 bg-white border border-gray-200 rounded-xl font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Output
          </label>
          <textarea
            value={output}
            readOnly
            placeholder="Formatted output will appear here..."
            className="w-full h-96 p-4 bg-gray-50 border border-gray-200 rounded-xl font-mono text-sm resize-y focus:outline-none"
          />
        </div>
      </div>

      {output && (
        <div className="mt-4">
          <button
            onClick={() => navigator.clipboard.writeText(output)}
            className="btn-primary text-sm"
          >
            Copy Output
          </button>
        </div>
      )}

      {/* FAQ */}
      <div className="mt-16 border-t border-gray-100 pt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {locale === "tr" ? "Sık Sorulan Sorular" : "Frequently Asked Questions"}
        </h2>
        <div className="space-y-5">
          {[
            { q: locale === "tr" ? "JSON Biçimlendirici ne yapar?" : "What does the JSON Formatter do?", a: locale === "tr" ? "Ham veya sıkıştırılmış JSON'u insan tarafından okunabilir girintili bir biçime dönüştürür ve JSON'un geçerli olup olmadığını doğrular." : "It formats (pretty-prints) raw or minified JSON into a human-readable indented format, and validates whether the JSON is valid." },
            { q: locale === "tr" ? "JSON'u küçültebilir mi?" : "Can it minify JSON too?", a: locale === "tr" ? "Evet. JSON'unuzu tek satıra sıkıştırmak için Küçült seçeneğini kullanın; API'lerde yük boyutunu azaltmak için idealdir." : "Yes. Use the Minify option to compress your JSON into a single line, ideal for reducing payload size in APIs." },
            { q: locale === "tr" ? "JSON girişi için boyut sınırı var mı?" : "Is there a size limit for JSON input?", a: locale === "tr" ? "Hayır. İstediğiniz boyuttaki JSON'u yapıştırabilirsiniz. İşlem tamamen tarayıcınızda gerçekleşir." : "No. You can paste JSON of any size. Processing happens entirely in your browser." },
            { q: locale === "tr" ? "JSON verilerim sunucuya gönderiliyor mu?" : "Is my JSON data sent to a server?", a: locale === "tr" ? "Hayır. Tüm biçimlendirme ve doğrulama tarayıcınızda yerel olarak gerçekleşir. Verileriniz cihazınızdan ayrılmaz." : "No. All formatting and validation happens locally in your browser. Your data never leaves your device." },
          ].map(({ q, a }, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">{q}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
