"use client";

import { useState, useMemo } from "react";
import { useLanguage } from "@/lib/language-context";
import Link from "next/link";
import { useTrackToolUseOnce } from "@/lib/track";

export default function TextCounterPage() {
  const { locale } = useLanguage();
  const [text, setText] = useState("");
  const markToolUsed = useTrackToolUseOnce("text-counter");

  const stats = useMemo(() => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    const sentences =
      text.trim() === "" ? 0 : text.split(/[.!?]+/).filter((s) => s.trim()).length;
    const paragraphs =
      text.trim() === "" ? 0 : text.split(/\n\n+/).filter((p) => p.trim()).length;
    const readingTime = Math.ceil(words / 200);
    const speakingTime = Math.ceil(words / 130);

    return {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTime,
      speakingTime,
    };
  }, [text]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link
          href="/"
          className="text-primary-600 hover:text-primary-700 text-sm"
        >
          &larr; Back to Tools
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Text Counter</h1>
      <p className="text-gray-600 mb-8">
        Count words, characters, sentences, and more. Perfect for essays,
        articles, and social media posts.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Words", value: stats.words },
          { label: "Characters", value: stats.characters },
          { label: "No Spaces", value: stats.charactersNoSpaces },
          { label: "Sentences", value: stats.sentences },
          { label: "Paragraphs", value: stats.paragraphs },
          { label: "Reading Time", value: `${stats.readingTime} min` },
          { label: "Speaking Time", value: `${stats.speakingTime} min` },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-4 border border-gray-100 text-center"
          >
            <div className="text-2xl font-bold text-primary-600">
              {stat.value}
            </div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          if (e.target.value.trim()) {
            markToolUsed();
          }
        }}
        placeholder="Start typing or paste your text here..."
        className="w-full h-64 p-4 bg-white border border-gray-200 rounded-xl resize-y focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      />

      <div className="mt-4 flex gap-3">
        <button
          onClick={() => setText("")}
          className="btn-secondary text-sm"
        >
          Clear
        </button>
        <button
          onClick={() => {
            navigator.clipboard.writeText(text);
            if (text.trim()) {
              markToolUsed();
            }
          }}
          className="btn-secondary text-sm"
        >
          Copy Text
        </button>
        <button
          onClick={() => {
            setText(text.toUpperCase());
            if (text.trim()) {
              markToolUsed();
            }
          }}
          className="btn-secondary text-sm"
        >
          UPPERCASE
        </button>
        <button
          onClick={() => {
            setText(text.toLowerCase());
            if (text.trim()) {
              markToolUsed();
            }
          }}
          className="btn-secondary text-sm"
        >
          lowercase
        </button>
      </div>

      {/* FAQ */}
      <div className="mt-16 border-t border-gray-100 pt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {locale === "tr" ? "Sık Sorulan Sorular" : "Frequently Asked Questions"}
        </h2>
        <div className="space-y-5">
          {[
            { q: locale === "tr" ? "Kelime sayacı gerçek zamanlı çalışıyor mu?" : "Does the word counter work in real time?", a: locale === "tr" ? "Evet. Kelime, karakter, cümle ve paragraf sayıları siz yazarken anında güncellenir." : "Yes. Word, character, sentence, and paragraph counts update instantly as you type." },
            { q: locale === "tr" ? "Karakter veya kelime sınırı var mı?" : "Is there a character or word limit?", a: locale === "tr" ? "Hayır. İstediğiniz kadar metin yapıştırabilir veya yazabilirsiniz — sınır yoktur." : "No. You can paste or type as much text as you like — there is no limit." },
            { q: locale === "tr" ? "Boşluklu mu yoksa boşluksuz mu karakter sayar?" : "Does it count characters with or without spaces?", a: locale === "tr" ? "Her ikisi de. Araç, boşluklu ve boşluksuz karakter sayısını ayrı ayrı gösterir." : "Both. The tool shows character count with spaces and without spaces separately." },
            { q: locale === "tr" ? "Metnim kaydediliyor veya bir yere gönderiliyor mu?" : "Is my text saved or sent anywhere?", a: locale === "tr" ? "Hayır. Her şey tarayıcınızda çalışır. Metniniz cihazınızdan ayrılmaz." : "No. Everything runs in your browser. Your text never leaves your device." },
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
