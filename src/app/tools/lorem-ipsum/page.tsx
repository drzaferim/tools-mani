"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage, pick } from "@/lib/language-context";
import { trackToolUse } from "@/lib/track";

const LOREM_SENTENCES = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  "Nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
  "Eu fugiat nulla pariatur.",
  "Excepteur sint occaecat cupidatat non proident.",
  "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Curabitur pretium tincidunt lacus nunc pellentesque.",
  "Nullam dictum felis eu pede mollis pretium integer tincidunt.",
  "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere.",
  "Cubilia curae morbi lacinia molestie dui praesent blandit dolor.",
  "Sed non quam in tincidunt malesuada ex et erat.",
  "Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque.",
  "Fermentum dui faucibus in ornare quam viverra orci sagittis eu.",
  "Volutpat consequat mauris nunc congue nisi vitae suscipit tellus.",
  "Aenean euismod elementum nisi quis eleifend quam adipiscing vitae.",
  "Proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo.",
  "Viverra adipiscing at in tellus integer feugiat scelerisque varius.",
  "Morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
];

const labels = {
  en: {
    back: "← Back to Tools",
    title: "Lorem Ipsum Generator",
    subtitle: "Generate placeholder text for your designs and mockups.",
    paragraphs: "Paragraphs",
    sentences: "Sentences",
    words: "Words",
    generate: "Generate",
    copy: "Copy",
    placeholder: "Click Generate to create placeholder text...",
  },
  tr: {
    back: "← Araçlara Dön",
    title: "Lorem Ipsum Üretici",
    subtitle: "Tasarımlarınız ve maketleriniz için yer tutucu metin üretin.",
    paragraphs: "Paragraf",
    sentences: "Cümle",
    words: "Kelime",
    generate: "Üret",
    copy: "Kopyala",
    placeholder: "Yer tutucu metin oluşturmak için Üret'e tıklayın...",
  },
  es: {
    back: "← Volver a las herramientas",
    title: "Generador de Lorem Ipsum",
    subtitle: "Genera texto de relleno para tus diseños y maquetas.",
    paragraphs: "Párrafos",
    sentences: "Frases",
    words: "Palabras",
    generate: "Generar",
    copy: "Copiar",
    placeholder: "Haz clic en Generar para crear texto de relleno...",
  },
  de: {
    back: "← Zurück zu den Tools",
    title: "Lorem-Ipsum-Generator",
    subtitle: "Blindtext für Ihre Designs und Mockups erzeugen.",
    paragraphs: "Absätze",
    sentences: "Sätze",
    words: "Wörter",
    generate: "Erzeugen",
    copy: "Kopieren",
    placeholder: "Auf Erzeugen klicken, um Blindtext zu erstellen...",
  },
  pt: {
    back: "← Voltar às ferramentas",
    title: "Gerador de Lorem Ipsum",
    subtitle: "Gere texto de preenchimento para seus designs e protótipos.",
    paragraphs: "Parágrafos",
    sentences: "Frases",
    words: "Palavras",
    generate: "Gerar",
    copy: "Copiar",
    placeholder: "Clique em Gerar para criar texto de preenchimento...",
  },
  fr: {
    back: "← Retour aux outils",
    title: "Générateur de Lorem Ipsum",
    subtitle: "Générez du faux texte pour vos maquettes et designs.",
    paragraphs: "Paragraphes",
    sentences: "Phrases",
    words: "Mots",
    generate: "Générer",
    copy: "Copier",
    placeholder: "Cliquez sur Générer pour créer du faux texte...",
  },
};

function generateParagraphs(count: number): string {
  const paragraphs: string[] = [];
  for (let i = 0; i < count; i++) {
    const sentenceCount = 4 + Math.floor(Math.random() * 4);
    const sentences: string[] = [];
    for (let j = 0; j < sentenceCount; j++) {
      sentences.push(LOREM_SENTENCES[(i * sentenceCount + j) % LOREM_SENTENCES.length]);
    }
    paragraphs.push(sentences.join(" "));
  }
  return paragraphs.join("\n\n");
}

function generateSentences(count: number): string {
  return Array.from({ length: count }, (_, i) => LOREM_SENTENCES[i % LOREM_SENTENCES.length]).join(" ");
}

function generateWords(count: number): string {
  const allWords = LOREM_SENTENCES.join(" ").split(" ");
  return Array.from({ length: count }, (_, i) => allWords[i % allWords.length]).join(" ");
}

export default function LoremIpsumPage() {
  const { locale, localePath } = useLanguage();
  const l = pick(labels, locale);
  const [mode, setMode] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState("");

  const generate = () => {
    switch (mode) {
      case "paragraphs": setOutput(generateParagraphs(count)); break;
      case "sentences": setOutput(generateSentences(count)); break;
      case "words": setOutput(generateWords(count)); break;
    }
    void trackToolUse("lorem-ipsum");
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

      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as typeof mode)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
        >
          <option value="paragraphs">{l.paragraphs}</option>
          <option value="sentences">{l.sentences}</option>
          <option value="words">{l.words}</option>
        </select>
        <input
          type="number"
          min={1}
          max={100}
          value={count}
          onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value))))}
          className="w-20 border border-gray-200 rounded-lg px-3 py-2 text-sm"
        />
        <button onClick={generate} className="btn-primary text-sm">{l.generate}</button>
        {output && (
          <button
            onClick={() => navigator.clipboard.writeText(output)}
            className="btn-secondary text-sm"
          >
            {l.copy}
          </button>
        )}
      </div>

      <textarea
        value={output}
        readOnly
        placeholder={l.placeholder}
        className="w-full h-80 p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm resize-y focus:outline-none"
      />
    </div>
  );
}
