"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLanguage, pick } from "@/lib/language-context";
import { useTrackToolUseOnce } from "@/lib/track";

const labels = {
  en: {
    back: "← Back to Tools",
    title: "Regex Tester",
    subtitle:
      "Write a regular expression, test it against your text, and inspect matches and capture groups — live, in your browser.",
    pattern: "Pattern",
    flags: "Flags",
    testText: "Test text",
    phPattern: "([a-z]+)@([a-z]+)\\.com",
    phText: "Contact us: info@example.com or sales@example.com",
    matches: (n: number) => `${n} match${n === 1 ? "" : "es"}`,
    noMatch: "No matches.",
    match: "Match",
    groups: "Groups",
    at: "at index",
    invalid: "Invalid regular expression:",
  },
  tr: {
    back: "← Araçlara Dön",
    title: "Regex Test Aracı",
    subtitle:
      "Düzenli ifade yazın, metniniz üzerinde canlı test edin; eşleşmeleri ve yakalama gruplarını inceleyin — tamamen tarayıcınızda.",
    pattern: "Desen (pattern)",
    flags: "Bayraklar",
    testText: "Test metni",
    phPattern: "([a-z]+)@([a-z]+)\\.com",
    phText: "Bize ulaşın: info@ornek.com veya satis@ornek.com",
    matches: (n: number) => `${n} eşleşme`,
    noMatch: "Eşleşme yok.",
    match: "Eşleşme",
    groups: "Gruplar",
    at: "konum",
    invalid: "Geçersiz düzenli ifade:",
  },
  es: {
    back: "← Volver a las herramientas",
    title: "Probador de expresiones regulares",
    subtitle:
      "Escribe una expresión regular, pruébala con tu texto e inspecciona las coincidencias y los grupos de captura, en vivo y en tu navegador.",
    pattern: "Patrón",
    flags: "Banderas",
    testText: "Texto de prueba",
    phPattern: "([a-z]+)@([a-z]+)\\.com",
    phText: "Contáctanos: info@ejemplo.com o ventas@ejemplo.com",
    matches: (n: number) => `${n} coincidencia${n === 1 ? "" : "s"}`,
    noMatch: "Sin coincidencias.",
    match: "Coincidencia",
    groups: "Grupos",
    at: "en el índice",
    invalid: "Expresión regular no válida:",
  },
  de: {
    back: "← Zurück zu den Tools",
    title: "Regex-Tester",
    subtitle:
      "Schreiben Sie einen regulären Ausdruck, testen Sie ihn an Ihrem Text und untersuchen Sie Treffer und Erfassungsgruppen – live in Ihrem Browser.",
    pattern: "Muster",
    flags: "Flags",
    testText: "Testtext",
    phPattern: "([a-z]+)@([a-z]+)\\.com",
    phText: "Kontakt: info@beispiel.de oder vertrieb@beispiel.de",
    matches: (n: number) => `${n} Treffer`,
    noMatch: "Keine Treffer.",
    match: "Treffer",
    groups: "Gruppen",
    at: "an Position",
    invalid: "Ungültiger regulärer Ausdruck:",
  },
  pt: {
    back: "← Voltar às ferramentas",
    title: "Testador de expressões regulares",
    subtitle:
      "Escreva uma expressão regular, teste-a no seu texto e inspecione as correspondências e os grupos de captura — ao vivo, no seu navegador.",
    pattern: "Padrão",
    flags: "Flags",
    testText: "Texto de teste",
    phPattern: "([a-z]+)@([a-z]+)\\.com",
    phText: "Fale conosco: info@exemplo.com ou vendas@exemplo.com",
    matches: (n: number) => `${n} correspondência${n === 1 ? "" : "s"}`,
    noMatch: "Nenhuma correspondência.",
    match: "Correspondência",
    groups: "Grupos",
    at: "no índice",
    invalid: "Expressão regular inválida:",
  },
  fr: {
    back: "← Retour aux outils",
    title: "Testeur d'expressions régulières",
    subtitle:
      "Écrivez une expression régulière, testez-la sur votre texte et inspectez les correspondances et les groupes de capture — en direct, dans votre navigateur.",
    pattern: "Motif",
    flags: "Drapeaux",
    testText: "Texte de test",
    phPattern: "([a-z]+)@([a-z]+)\\.com",
    phText: "Contactez-nous : info@exemple.com ou ventes@exemple.com",
    matches: (n: number) => `${n} correspondance${n === 1 ? "" : "s"}`,
    noMatch: "Aucune correspondance.",
    match: "Correspondance",
    groups: "Groupes",
    at: "à l'index",
    invalid: "Expression régulière non valide :",
  },
};

const FLAG_DEFS = ["g", "i", "m", "s", "u"] as const;
const MAX_MATCHES = 500;

interface MatchInfo {
  text: string;
  index: number;
  groups: string[];
}

export default function RegexTesterPage() {
  const { locale, localePath } = useLanguage();
  const l = pick(labels, locale);
  const markToolUsed = useTrackToolUseOnce("regex-tester");

  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState<Set<string>>(new Set(["g"]));
  const [text, setText] = useState("");

  const toggleFlag = (f: string) => {
    const next = new Set(flags);
    if (next.has(f)) next.delete(f);
    else next.add(f);
    setFlags(next);
  };

  const result = useMemo<{ error: string } | { matches: MatchInfo[] } | null>(() => {
    if (!pattern || !text) return null;
    let re: RegExp;
    try {
      re = new RegExp(pattern, Array.from(flags).join(""));
    } catch (e) {
      return { error: String(e instanceof Error ? e.message : e) };
    }
    const matches: MatchInfo[] = [];
    if (re.global) {
      let m: RegExpExecArray | null;
      let guard = 0;
      while ((m = re.exec(text)) !== null && matches.length < MAX_MATCHES) {
        matches.push({ text: m[0], index: m.index, groups: m.slice(1).map((g) => g ?? "") });
        if (m[0] === "") re.lastIndex++; // boş eşleşmede sonsuz döngüyü kır
        if (++guard > 100000) break;
      }
    } else {
      const m = re.exec(text);
      if (m) matches.push({ text: m[0], index: m.index, groups: m.slice(1).map((g) => g ?? "") });
    }
    return { matches };
  }, [pattern, flags, text]);

  // Eşleşmeleri vurgulu göster
  const highlighted = useMemo(() => {
    if (!result || "error" in result || !result.matches || result.matches.length === 0) return null;
    const parts: { s: string; hit: boolean }[] = [];
    let pos = 0;
    for (const m of result.matches) {
      if (m.index > pos) parts.push({ s: text.slice(pos, m.index), hit: false });
      parts.push({ s: m.text, hit: true });
      pos = m.index + m.text.length;
    }
    if (pos < text.length) parts.push({ s: text.slice(pos), hit: false });
    return parts;
  }, [result, text]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href={localePath("/")} className="text-primary-600 hover:text-primary-700 text-sm">
          {l.back}
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">{l.title}</h1>
      <p className="text-gray-600 mb-8">{l.subtitle}</p>

      <div className="flex flex-wrap items-end gap-4 mb-4">
        <div className="flex-1 min-w-64">
          <label className="block text-sm font-medium text-gray-700 mb-2">{l.pattern}</label>
          <div className="flex items-center gap-1 font-mono text-sm">
            <span className="text-gray-400">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => { setPattern(e.target.value); if (e.target.value) markToolUsed(); }}
              placeholder={l.phPattern}
              spellCheck={false}
              className="flex-1 p-3 bg-white border border-gray-200 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <span className="text-gray-400">/{Array.from(flags).join("")}</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{l.flags}</label>
          <div className="flex gap-1.5">
            {FLAG_DEFS.map((f) => (
              <button
                key={f}
                onClick={() => toggleFlag(f)}
                className={`w-9 h-9 rounded-lg font-mono text-sm font-medium transition-all ${
                  flags.has(f)
                    ? "bg-primary-600 text-white shadow-md shadow-primary-200/50"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <label className="block text-sm font-medium text-gray-700 mb-2">{l.testText}</label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={l.phText}
        spellCheck={false}
        className="w-full h-40 p-4 bg-white border border-gray-200 rounded-xl font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary-500 mb-6"
      />

      {result && "error" in result && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl font-mono text-sm">
          {l.invalid} {result.error}
        </div>
      )}

      {result && "matches" in result && (
        <div className="space-y-6">
          <p className="text-sm font-medium text-gray-700">
            {result.matches.length > 0 ? (
              <span className="text-green-600">{l.matches(result.matches.length)}</span>
            ) : (
              <span className="text-gray-400">{l.noMatch}</span>
            )}
          </p>

          {highlighted && (
            <pre className="bg-white border border-gray-200 rounded-xl p-4 text-sm font-mono whitespace-pre-wrap break-words">
              {highlighted.map((p, i) =>
                p.hit ? (
                  <mark key={i} className="bg-yellow-200 rounded px-0.5">{p.s}</mark>
                ) : (
                  <span key={i}>{p.s}</span>
                )
              )}
            </pre>
          )}

          {result.matches.length > 0 && (
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {result.matches.map((m, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-xl px-4 py-2.5 shadow-sm text-sm">
                  <span className="text-gray-400 mr-2">#{i + 1}</span>
                  <code className="bg-yellow-50 px-1.5 py-0.5 rounded">{m.text}</code>
                  <span className="text-gray-400 text-xs ml-2">{l.at} {m.index}</span>
                  {m.groups.length > 0 && (
                    <span className="text-xs text-gray-500 ml-3">
                      {l.groups}: {m.groups.map((g, gi) => (
                        <code key={gi} className="bg-gray-100 px-1 py-0.5 rounded ml-1">${gi + 1}={g}</code>
                      ))}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
