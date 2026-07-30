"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLanguage, pick } from "@/lib/language-context";
import { useTrackToolUseOnce } from "@/lib/track";
import { ToolContent } from "@/components/ToolContent";
import { textDiffContent } from "@/content/tools/text-diff";

const labels = {
  en: {
    back: "← Back to Tools",
    title: "Text Compare (Diff Checker)",
    subtitle:
      "Paste two texts and see the differences line by line. Comparison happens in your browser — nothing is uploaded.",
    original: "Original text",
    changed: "Changed text",
    phA: "Paste the first version here...",
    phB: "Paste the second version here...",
    identical: "The two texts are identical.",
    added: "added",
    removed: "removed",
    stats: (a: number, r: number) => `${a} line(s) added, ${r} line(s) removed`,
  },
  tr: {
    back: "← Araçlara Dön",
    title: "Metin Karşılaştırma (Fark Bulucu)",
    subtitle:
      "İki metni yapıştırın, farkları satır satır görün. Karşılaştırma tarayıcınızda yapılır — hiçbir şey yüklenmez.",
    original: "Orijinal metin",
    changed: "Değişmiş metin",
    phA: "İlk sürümü buraya yapıştırın...",
    phB: "İkinci sürümü buraya yapıştırın...",
    identical: "İki metin birebir aynı.",
    added: "eklendi",
    removed: "silindi",
    stats: (a: number, r: number) => `${a} satır eklendi, ${r} satır silindi`,
  },
  es: {
    back: "← Volver a las herramientas",
    title: "Comparar textos (diff)",
    subtitle:
      "Pega dos textos y ve las diferencias línea por línea. La comparación ocurre en tu navegador: nada se sube.",
    original: "Texto original",
    changed: "Texto modificado",
    phA: "Pega aquí la primera versión...",
    phB: "Pega aquí la segunda versión...",
    identical: "Los dos textos son idénticos.",
    added: "añadidas",
    removed: "eliminadas",
    stats: (a: number, r: number) => `${a} línea(s) añadida(s), ${r} línea(s) eliminada(s)`,
  },
  de: {
    back: "← Zurück zu den Tools",
    title: "Textvergleich (Diff)",
    subtitle:
      "Zwei Texte einfügen und Unterschiede zeilenweise sehen. Der Vergleich läuft im Browser – nichts wird hochgeladen.",
    original: "Originaltext",
    changed: "Geänderter Text",
    phA: "Erste Version hier einfügen ...",
    phB: "Zweite Version hier einfügen ...",
    identical: "Die beiden Texte sind identisch.",
    added: "hinzugefügt",
    removed: "entfernt",
    stats: (a: number, r: number) => `${a} Zeile(n) hinzugefügt, ${r} Zeile(n) entfernt`,
  },
  pt: {
    back: "← Voltar às ferramentas",
    title: "Comparar textos (diff)",
    subtitle:
      "Cole dois textos e veja as diferenças linha por linha. A comparação acontece no seu navegador — nada é enviado.",
    original: "Texto original",
    changed: "Texto alterado",
    phA: "Cole aqui a primeira versão...",
    phB: "Cole aqui a segunda versão...",
    identical: "Os dois textos são idênticos.",
    added: "adicionadas",
    removed: "removidas",
    stats: (a: number, r: number) => `${a} linha(s) adicionada(s), ${r} linha(s) removida(s)`,
  },
  fr: {
    back: "← Retour aux outils",
    title: "Comparer des textes (diff)",
    subtitle:
      "Collez deux textes et voyez les différences ligne par ligne. La comparaison se fait dans votre navigateur — rien n'est envoyé.",
    original: "Texte original",
    changed: "Texte modifié",
    phA: "Collez ici la première version...",
    phB: "Collez ici la seconde version...",
    identical: "Les deux textes sont identiques.",
    added: "ajoutées",
    removed: "supprimées",
    stats: (a: number, r: number) => `${a} ligne(s) ajoutée(s), ${r} ligne(s) supprimée(s)`,
  },
};

type DiffLine = { type: "same" | "add" | "del"; text: string };

// Satır bazlı LCS diff
function diffLines(a: string[], b: string[]): DiffLine[] {
  const n = a.length, m = b.length;
  // LCS tablosu
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const out: DiffLine[] = [];
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      out.push({ type: "same", text: a[i] });
      i++; j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      out.push({ type: "del", text: a[i] });
      i++;
    } else {
      out.push({ type: "add", text: b[j] });
      j++;
    }
  }
  while (i < n) out.push({ type: "del", text: a[i++] });
  while (j < m) out.push({ type: "add", text: b[j++] });
  return out;
}

const MAX_LINES = 5000;

export default function TextDiffPage() {
  const { locale, localePath } = useLanguage();
  const l = pick(labels, locale);
  const markToolUsed = useTrackToolUseOnce("text-diff");

  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");

  const diff = useMemo(() => {
    if (!textA && !textB) return null;
    const a = textA.split("\n").slice(0, MAX_LINES);
    const b = textB.split("\n").slice(0, MAX_LINES);
    return diffLines(a, b);
  }, [textA, textB]);

  const added = diff?.filter((d) => d.type === "add").length ?? 0;
  const removed = diff?.filter((d) => d.type === "del").length ?? 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href={localePath("/")} className="text-primary-600 hover:text-primary-700 text-sm">
          {l.back}
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">{l.title}</h1>
      <p className="text-gray-600 mb-8">{l.subtitle}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{l.original}</label>
          <textarea
            value={textA}
            onChange={(e) => { setTextA(e.target.value); markToolUsed(); }}
            placeholder={l.phA}
            spellCheck={false}
            className="w-full h-56 p-4 bg-white border border-gray-200 rounded-xl font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{l.changed}</label>
          <textarea
            value={textB}
            onChange={(e) => { setTextB(e.target.value); markToolUsed(); }}
            placeholder={l.phB}
            spellCheck={false}
            className="w-full h-56 p-4 bg-white border border-gray-200 rounded-xl font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {diff && (
        <div>
          {added === 0 && removed === 0 ? (
            <div className="bg-accent-50 border border-accent-200 text-accent-800 rounded-xl px-4 py-3 text-sm font-medium">
              {l.identical}
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-3">
                <span className="text-green-600 font-medium">+{added} {l.added}</span>
                {" · "}
                <span className="text-red-600 font-medium">−{removed} {l.removed}</span>
              </p>
              <div className="bg-white border border-gray-200 rounded-xl overflow-x-auto">
                <pre className="text-sm font-mono leading-6 p-0 m-0">
                  {diff.map((line, i) => (
                    <div
                      key={i}
                      className={
                        line.type === "add"
                          ? "bg-green-50 text-green-800 px-4"
                          : line.type === "del"
                          ? "bg-red-50 text-red-800 px-4"
                          : "text-gray-600 px-4"
                      }
                    >
                      <span className="select-none inline-block w-5 text-gray-400">
                        {line.type === "add" ? "+" : line.type === "del" ? "−" : " "}
                      </span>
                      {line.text || " "}
                    </div>
                  ))}
                </pre>
              </div>
            </>
          )}
        </div>
      )}

      <ToolContent content={textDiffContent} />
    </div>
  );
}
