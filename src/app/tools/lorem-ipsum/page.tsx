"use client";

import { useState } from "react";
import Link from "next/link";
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
        <Link href="/" className="text-primary-600 hover:text-primary-700 text-sm">
          &larr; Back to Tools
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Lorem Ipsum Generator</h1>
      <p className="text-gray-600 mb-8">
        Generate placeholder text for your designs and mockups.
      </p>

      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as typeof mode)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
        >
          <option value="paragraphs">Paragraphs</option>
          <option value="sentences">Sentences</option>
          <option value="words">Words</option>
        </select>
        <input
          type="number"
          min={1}
          max={100}
          value={count}
          onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value))))}
          className="w-20 border border-gray-200 rounded-lg px-3 py-2 text-sm"
        />
        <button onClick={generate} className="btn-primary text-sm">Generate</button>
        {output && (
          <button
            onClick={() => navigator.clipboard.writeText(output)}
            className="btn-secondary text-sm"
          >
            Copy
          </button>
        )}
      </div>

      <textarea
        value={output}
        readOnly
        placeholder="Click Generate to create placeholder text..."
        className="w-full h-80 p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm resize-y focus:outline-none"
      />
    </div>
  );
}
