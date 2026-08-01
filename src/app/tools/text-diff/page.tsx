"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useLanguage, pick } from "@/lib/language-context";
import { diffLines, diffWords, type DiffPart } from "@/lib/text-diff";
import { trackToolEvent, trackToolUse, useTrackToolView } from "@/lib/track";
import { ToolContent } from "@/components/ToolContent";
import { textDiffContent } from "@/content/tools/text-diff";

type DiffMode = "line" | "word";

const labels = {
  en: {
    back: "← Back to Tools", title: "Text Compare (Diff Checker)", subtitle: "Compare two versions by line or word. Everything stays in your browser.", original: "Original text", changed: "Changed text", phA: "Paste the first version here...", phB: "Paste the second version here...", line: "Line diff", word: "Word diff", ignoreCase: "Ignore case", ignoreWhitespace: "Ignore whitespace", swap: "Swap", clear: "Clear", identical: "The two texts are identical with these settings.", added: "added", removed: "removed", lineNumbers: "Old / new line", largeNotice: "Large comparisons use a memory-safe matching strategy.",
  },
  tr: {
    back: "← Araçlara Dön", title: "Metin Karşılaştırma (Fark Bulucu)", subtitle: "İki sürümü satır veya kelime bazında karşılaştırın. Veriler tarayıcınızdan çıkmaz.", original: "Orijinal metin", changed: "Değişmiş metin", phA: "İlk sürümü buraya yapıştırın...", phB: "İkinci sürümü buraya yapıştırın...", line: "Satır farkı", word: "Kelime farkı", ignoreCase: "Büyük/küçük harfi yok say", ignoreWhitespace: "Boşlukları yok say", swap: "Yer değiştir", clear: "Temizle", identical: "Bu ayarlarla iki metin aynı.", added: "eklendi", removed: "silindi", lineNumbers: "Eski / yeni satır", largeNotice: "Büyük karşılaştırmalarda bellek dostu eşleştirme kullanılır.",
  },
  es: {
    back: "← Volver a las herramientas", title: "Comparar textos (diff)", subtitle: "Compara dos versiones por línea o palabra, siempre en tu navegador.", original: "Texto original", changed: "Texto modificado", phA: "Pega la primera versión...", phB: "Pega la segunda versión...", line: "Por líneas", word: "Por palabras", ignoreCase: "Ignorar mayúsculas", ignoreWhitespace: "Ignorar espacios", swap: "Intercambiar", clear: "Limpiar", identical: "Los textos son idénticos con estos ajustes.", added: "añadido", removed: "eliminado", lineNumbers: "Línea anterior / nueva", largeNotice: "Las comparaciones grandes usan un método eficiente en memoria.",
  },
  de: {
    back: "← Zurück zu den Tools", title: "Textvergleich (Diff)", subtitle: "Zwei Versionen zeilen- oder wortweise im Browser vergleichen.", original: "Originaltext", changed: "Geänderter Text", phA: "Erste Version einfügen...", phB: "Zweite Version einfügen...", line: "Zeilenvergleich", word: "Wortvergleich", ignoreCase: "Großschreibung ignorieren", ignoreWhitespace: "Leerzeichen ignorieren", swap: "Tauschen", clear: "Leeren", identical: "Die Texte sind mit diesen Einstellungen identisch.", added: "hinzugefügt", removed: "entfernt", lineNumbers: "Alte / neue Zeile", largeNotice: "Große Vergleiche verwenden eine speichersichere Strategie.",
  },
  pt: {
    back: "← Voltar às ferramentas", title: "Comparar textos (diff)", subtitle: "Compare duas versões por linha ou palavra, tudo no navegador.", original: "Texto original", changed: "Texto alterado", phA: "Cole a primeira versão...", phB: "Cole a segunda versão...", line: "Por linha", word: "Por palavra", ignoreCase: "Ignorar maiúsculas", ignoreWhitespace: "Ignorar espaços", swap: "Trocar", clear: "Limpar", identical: "Os textos são idênticos com estas opções.", added: "adicionado", removed: "removido", lineNumbers: "Linha antiga / nova", largeNotice: "Comparações grandes usam uma estratégia econômica em memória.",
  },
  fr: {
    back: "← Retour aux outils", title: "Comparer des textes (diff)", subtitle: "Comparez deux versions par ligne ou par mot, dans le navigateur.", original: "Texte original", changed: "Texte modifié", phA: "Collez la première version...", phB: "Collez la seconde version...", line: "Par ligne", word: "Par mot", ignoreCase: "Ignorer la casse", ignoreWhitespace: "Ignorer les espaces", swap: "Permuter", clear: "Effacer", identical: "Les textes sont identiques avec ces réglages.", added: "ajouté", removed: "supprimé", lineNumbers: "Ancienne / nouvelle ligne", largeNotice: "Les grandes comparaisons utilisent une méthode économe en mémoire.",
  },
};

function WordDiff({ parts }: { parts: DiffPart[] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 font-mono text-sm leading-7 whitespace-pre-wrap break-words" style={{ contentVisibility: "auto" }}>
      {parts.map((part, index) => (
        <span
          key={`${part.type}-${index}`}
          className={part.type === "add" ? "bg-green-100 text-green-900" : part.type === "del" ? "bg-red-100 text-red-900 line-through decoration-red-500" : "text-gray-700"}
        >
          {part.value}
        </span>
      ))}
    </div>
  );
}

function LineDiff({ parts, lineNumberLabel }: { parts: DiffPart[]; lineNumberLabel: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-auto max-h-[36rem]">
      <div className="sr-only">{lineNumberLabel}</div>
      <div className="min-w-[42rem] font-mono text-sm leading-6">
        {parts.map((part, index) => (
          <div
            key={`${part.type}-${part.leftNumber ?? "x"}-${part.rightNumber ?? "x"}-${index}`}
            className={`grid grid-cols-[3.25rem_3.25rem_1.5rem_1fr] px-2 ${part.type === "add" ? "bg-green-50 text-green-900" : part.type === "del" ? "bg-red-50 text-red-900" : "text-gray-600"}`}
            style={{ contentVisibility: "auto", containIntrinsicSize: "24px" }}
          >
            <span className="text-right pr-2 text-gray-400 select-none border-r border-gray-100">{part.leftNumber ?? ""}</span>
            <span className="text-right pr-2 text-gray-400 select-none border-r border-gray-100">{part.rightNumber ?? ""}</span>
            <span className="text-center select-none text-gray-400">{part.type === "add" ? "+" : part.type === "del" ? "−" : ""}</span>
            <span className="whitespace-pre px-1">{part.value || " "}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TextDiffPage() {
  const { locale, localePath } = useLanguage();
  const l = pick(labels, locale);
  useTrackToolView("text-diff", locale);
  const inputTrackedRef = useRef(false);
  const completionKeyRef = useRef("");

  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const [mode, setMode] = useState<DiffMode>("line");
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const deferredA = useDeferredValue(textA);
  const deferredB = useDeferredValue(textB);

  const parts = useMemo(() => {
    if (!deferredA && !deferredB) return null;
    const options = { ignoreCase, ignoreWhitespace };
    return mode === "line" ? diffLines(deferredA, deferredB, options) : diffWords(deferredA, deferredB, options);
  }, [deferredA, deferredB, ignoreCase, ignoreWhitespace, mode]);

  const stats = useMemo(() => {
    if (!parts) return { added: 0, removed: 0 };
    let added = 0;
    let removed = 0;
    for (const part of parts) {
      if (part.type === "add") added += 1;
      else if (part.type === "del") removed += 1;
    }
    return { added, removed };
  }, [parts]);

  useEffect(() => {
    if (!deferredA || !deferredB || !parts) return;
    const completionKey = `${mode}:${ignoreCase}:${ignoreWhitespace}:${deferredA.length}:${deferredB.length}`;
    if (completionKeyRef.current === completionKey) return;
    completionKeyRef.current = completionKey;
    trackToolEvent("processing_started", "text-diff", { locale, mode: `${mode}_diff` });
    void trackToolUse("text-diff", { locale, mode: `${mode}_diff` });
  }, [deferredA, deferredB, ignoreCase, ignoreWhitespace, locale, mode, parts]);

  const handleInput = () => {
    if (inputTrackedRef.current) return;
    inputTrackedRef.current = true;
    trackToolEvent("input_selected", "text-diff", { locale, mode: "text" });
  };

  const swap = () => {
    setTextA(textB);
    setTextB(textA);
  };

  const clear = () => {
    setTextA("");
    setTextB("");
    completionKeyRef.current = "";
    inputTrackedRef.current = false;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6"><Link href={localePath("/")} className="text-primary-600 hover:text-primary-700 text-sm">{l.back}</Link></div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{l.title}</h1>
      <p className="text-gray-600 mb-7">{l.subtitle}</p>

      <div className="flex flex-wrap items-center gap-2 mb-5">
        <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1" role="group" aria-label="Diff mode">
          {(["line", "word"] as DiffMode[]).map((option) => (
            <button key={option} type="button" onClick={() => setMode(option)} aria-pressed={mode === option} className={`rounded-md px-3 py-1.5 text-sm font-medium ${mode === option ? "bg-primary-600 text-white" : "text-gray-600 hover:bg-gray-50"}`}>{l[option]}</button>
          ))}
        </div>
        <label className="inline-flex items-center gap-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg px-3 py-2"><input type="checkbox" checked={ignoreCase} onChange={(event) => setIgnoreCase(event.target.checked)} />{l.ignoreCase}</label>
        <label className="inline-flex items-center gap-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg px-3 py-2"><input type="checkbox" checked={ignoreWhitespace} onChange={(event) => setIgnoreWhitespace(event.target.checked)} />{l.ignoreWhitespace}</label>
        <button type="button" onClick={swap} className="btn-secondary text-sm" disabled={!textA && !textB}>{l.swap}</button>
        <button type="button" onClick={clear} className="btn-secondary text-sm" disabled={!textA && !textB}>{l.clear}</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="diff-original" className="block text-sm font-medium text-gray-700 mb-2">{l.original}</label>
          <textarea id="diff-original" value={textA} onChange={(event) => { setTextA(event.target.value); handleInput(); }} placeholder={l.phA} spellCheck={false} className="w-full h-56 p-4 bg-white border border-gray-200 rounded-xl font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary-500" />
        </div>
        <div>
          <label htmlFor="diff-changed" className="block text-sm font-medium text-gray-700 mb-2">{l.changed}</label>
          <textarea id="diff-changed" value={textB} onChange={(event) => { setTextB(event.target.value); handleInput(); }} placeholder={l.phB} spellCheck={false} className="w-full h-56 p-4 bg-white border border-gray-200 rounded-xl font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary-500" />
        </div>
      </div>

      {parts ? (
        <section aria-live="polite">
          {stats.added === 0 && stats.removed === 0 ? (
            <div className="bg-accent-50 border border-accent-200 text-accent-800 rounded-xl px-4 py-3 text-sm font-medium">{l.identical}</div>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <p className="text-sm text-gray-500"><span className="text-green-700 font-medium">+{stats.added} {l.added}</span>{" · "}<span className="text-red-700 font-medium">−{stats.removed} {l.removed}</span></p>
                {(deferredA.length + deferredB.length) > 100_000 ? <p className="text-xs text-gray-400">{l.largeNotice}</p> : null}
              </div>
              {mode === "line" ? <LineDiff parts={parts} lineNumberLabel={l.lineNumbers} /> : <WordDiff parts={parts} />}
            </>
          )}
        </section>
      ) : null}

      <ToolContent content={textDiffContent} />
    </div>
  );
}
