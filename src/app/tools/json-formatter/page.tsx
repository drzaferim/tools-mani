"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useLanguage, pick } from "@/lib/language-context";
import { getDurationBucket, getFileSizeBucket, trackToolEvent, trackToolUse, useTrackToolView } from "@/lib/track";
import { ToolContent } from "@/components/ToolContent";
import { jsonFormatterContent } from "@/content/tools/json-formatter";

type JsonView = "text" | "tree";

const labels = {
  en: {
    back: "← Back to Tools", title: "JSON Formatter", subtitle: "Format, validate, explore and minify JSON instantly — entirely in your browser.", format: "Format", minify: "Minify", validate: "Validate", clear: "Clear", spaces: (n: number) => `${n} spaces`, tab: "Tab (8)", input: "Input", output: "Output", placeholder: '{"key": "value"}', outputPlaceholder: "Formatted output will appear here...", copy: "Copy Output", copied: "Copied!", valid: "Valid JSON!", invalid: "Invalid JSON", upload: "Open JSON file", textView: "Text", treeView: "Tree", fileLoaded: (name: string) => `Loaded ${name}`, root: "root", items: (count: number) => `${count} item${count === 1 ? "" : "s"}`,
  },
  tr: {
    back: "← Araçlara Dön", title: "JSON Biçimlendirici", subtitle: "JSON'u tarayıcınızda biçimlendirin, doğrulayın, ağaçta inceleyin ve küçültün.", format: "Biçimlendir", minify: "Küçült", validate: "Doğrula", clear: "Temizle", spaces: (n: number) => `${n} boşluk`, tab: "Sekme (8)", input: "Girdi", output: "Çıktı", placeholder: '{"anahtar": "değer"}', outputPlaceholder: "Biçimlendirilmiş çıktı burada görünecek...", copy: "Çıktıyı Kopyala", copied: "Kopyalandı!", valid: "Geçerli JSON!", invalid: "Geçersiz JSON", upload: "JSON dosyası aç", textView: "Metin", treeView: "Ağaç", fileLoaded: (name: string) => `${name} yüklendi`, root: "kök", items: (count: number) => `${count} öğe`,
  },
  es: {
    back: "← Volver a las herramientas", title: "Formateador JSON", subtitle: "Formatea, valida, explora y minifica JSON en tu navegador.", format: "Formatear", minify: "Minificar", validate: "Validar", clear: "Limpiar", spaces: (n: number) => `${n} espacios`, tab: "Tabulación (8)", input: "Entrada", output: "Salida", placeholder: '{"clave": "valor"}', outputPlaceholder: "La salida aparecerá aquí...", copy: "Copiar salida", copied: "¡Copiado!", valid: "¡JSON válido!", invalid: "JSON no válido", upload: "Abrir archivo JSON", textView: "Texto", treeView: "Árbol", fileLoaded: (name: string) => `${name} cargado`, root: "raíz", items: (count: number) => `${count} elemento(s)`,
  },
  de: {
    back: "← Zurück zu den Tools", title: "JSON-Formatter", subtitle: "JSON im Browser formatieren, prüfen, durchsuchen und minimieren.", format: "Formatieren", minify: "Minifizieren", validate: "Prüfen", clear: "Leeren", spaces: (n: number) => `${n} Leerzeichen`, tab: "Tabulator (8)", input: "Eingabe", output: "Ausgabe", placeholder: '{"schlüssel": "wert"}', outputPlaceholder: "Die Ausgabe erscheint hier...", copy: "Ausgabe kopieren", copied: "Kopiert!", valid: "Gültiges JSON!", invalid: "Ungültiges JSON", upload: "JSON-Datei öffnen", textView: "Text", treeView: "Baum", fileLoaded: (name: string) => `${name} geladen`, root: "Wurzel", items: (count: number) => `${count} Einträge`,
  },
  pt: {
    back: "← Voltar às ferramentas", title: "Formatador JSON", subtitle: "Formate, valide, explore e minifique JSON no navegador.", format: "Formatar", minify: "Minificar", validate: "Validar", clear: "Limpar", spaces: (n: number) => `${n} espaços`, tab: "Tabulação (8)", input: "Entrada", output: "Saída", placeholder: '{"chave": "valor"}', outputPlaceholder: "A saída aparecerá aqui...", copy: "Copiar saída", copied: "Copiado!", valid: "JSON válido!", invalid: "JSON inválido", upload: "Abrir arquivo JSON", textView: "Texto", treeView: "Árvore", fileLoaded: (name: string) => `${name} carregado`, root: "raiz", items: (count: number) => `${count} itens`,
  },
  fr: {
    back: "← Retour aux outils", title: "Formateur JSON", subtitle: "Formatez, validez, explorez et minifiez le JSON dans le navigateur.", format: "Formater", minify: "Minifier", validate: "Valider", clear: "Effacer", spaces: (n: number) => `${n} espaces`, tab: "Tabulation (8)", input: "Entrée", output: "Sortie", placeholder: '{"clé": "valeur"}', outputPlaceholder: "La sortie apparaîtra ici...", copy: "Copier la sortie", copied: "Copié !", valid: "JSON valide !", invalid: "JSON non valide", upload: "Ouvrir un fichier JSON", textView: "Texte", treeView: "Arbre", fileLoaded: (name: string) => `${name} chargé`, root: "racine", items: (count: number) => `${count} élément(s)`,
  },
};

function PrimitiveValue({ value }: { value: unknown }) {
  if (value === null) return <span className="text-purple-600">null</span>;
  if (typeof value === "string") return <span className="text-green-700 break-all">&quot;{value}&quot;</span>;
  if (typeof value === "number") return <span className="text-blue-700">{String(value)}</span>;
  if (typeof value === "boolean") return <span className="text-amber-700">{String(value)}</span>;
  return <span className="text-gray-500">{String(value)}</span>;
}

function JsonTreeNode({ name, value, depth, itemLabel }: { name: string; value: unknown; depth: number; itemLabel: (count: number) => string }) {
  const expandable = typeof value === "object" && value !== null;
  const entries = expandable ? Object.entries(value as Record<string, unknown>) : [];
  const [open, setOpen] = useState(depth < 2);

  if (!expandable) {
    return (
      <div className="flex gap-2 py-0.5 min-w-0" style={{ paddingLeft: `${depth * 18}px` }}>
        <span className="text-gray-700 font-medium shrink-0">{name}:</span>
        <PrimitiveValue value={value} />
      </div>
    );
  }

  const opening = Array.isArray(value) ? "[" : "{";
  const closing = Array.isArray(value) ? "]" : "}";
  return (
    <div style={{ contentVisibility: "auto" }}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex items-center gap-1.5 py-0.5 text-left hover:bg-gray-50 rounded w-full"
        style={{ paddingLeft: `${depth * 18}px` }}
      >
        <span className="text-gray-400 w-4 select-none">{open ? "▾" : "▸"}</span>
        <span className="text-gray-800 font-medium">{name}</span>
        <span className="text-gray-500">{opening}</span>
        {!open ? <span className="text-xs text-gray-400">{itemLabel(entries.length)} {closing}</span> : null}
      </button>
      {open ? (
        <div>
          {entries.map(([key, child]) => <JsonTreeNode key={key} name={key} value={child} depth={depth + 1} itemLabel={itemLabel} />)}
          <div className="text-gray-500" style={{ paddingLeft: `${depth * 18 + 20}px` }}>{closing}</div>
        </div>
      ) : null}
    </div>
  );
}

export default function JsonFormatterPage() {
  const { locale, localePath } = useLanguage();
  const l = pick(labels, locale);
  useTrackToolView("json-formatter", locale);
  const inputTrackedRef = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [parsed, setParsed] = useState<unknown>(null);
  const [hasParsed, setHasParsed] = useState(false);
  const [error, setError] = useState("");
  const [indentSize, setIndentSize] = useState(2);
  const [copied, setCopied] = useState(false);
  const [view, setView] = useState<JsonView>("text");
  const [loadedFile, setLoadedFile] = useState("");

  const run = (mode: "format" | "minify" | "validate") => {
    const startedAt = performance.now();
    trackToolEvent("processing_started", "json-formatter", { locale, mode });
    try {
      const nextParsed: unknown = JSON.parse(input);
      setParsed(nextParsed);
      setHasParsed(true);
      if (mode === "format") setOutput(JSON.stringify(nextParsed, null, indentSize));
      else if (mode === "minify") setOutput(JSON.stringify(nextParsed));
      else setOutput(l.valid);
      setError("");
      void trackToolUse("json-formatter", { locale, mode, duration_bucket: getDurationBucket(performance.now() - startedAt) });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : l.invalid);
      setOutput("");
      setHasParsed(false);
      trackToolEvent("processing_error", "json-formatter", { locale, mode, duration_bucket: getDurationBucket(performance.now() - startedAt), error_code: "invalid_json" });
    }
  };

  const loadJsonFile = async (file: File) => {
    const content = await file.text();
    setInput(content);
    setLoadedFile(file.name);
    setOutput("");
    setError("");
    setHasParsed(false);
    inputTrackedRef.current = true;
    trackToolEvent("input_selected", "json-formatter", { locale, mode: "file", file_size_bucket: getFileSizeBucket(file.size) });
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    trackToolEvent("output_action", "json-formatter", { locale, action: "copy" });
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clear = () => {
    setInput("");
    setOutput("");
    setError("");
    setParsed(null);
    setHasParsed(false);
    setLoadedFile("");
    inputTrackedRef.current = false;
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6"><Link href={localePath("/")} className="text-primary-600 hover:text-primary-700 text-sm">{l.back}</Link></div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{l.title}</h1>
      <p className="text-gray-600 mb-7">{l.subtitle}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={() => run("format")} className="btn-primary text-sm">{l.format}</button>
        <button onClick={() => run("minify")} className="btn-secondary text-sm">{l.minify}</button>
        <button onClick={() => run("validate")} className="btn-secondary text-sm">{l.validate}</button>
        <button onClick={() => fileInputRef.current?.click()} className="btn-secondary text-sm">{l.upload}</button>
        <input ref={fileInputRef} type="file" accept="application/json,.json" className="hidden" onChange={(event) => { const file = event.target.files?.[0]; if (file) void loadJsonFile(file); }} />
        <select value={indentSize} onChange={(event) => setIndentSize(Number(event.target.value))} aria-label="Indentation" className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white">
          <option value={2}>{l.spaces(2)}</option><option value={4}>{l.spaces(4)}</option><option value={8}>{l.tab}</option>
        </select>
        <button onClick={clear} className="btn-secondary text-sm">{l.clear}</button>
      </div>

      {loadedFile ? <p className="text-xs text-green-700 mb-3">✓ {l.fileLoaded(loadedFile)}</p> : null}
      {error ? <div role="alert" className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 font-mono text-sm">{error}</div> : null}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="json-input" className="block text-sm font-medium text-gray-700 mb-2">{l.input}</label>
          <textarea id="json-input" value={input} onChange={(event) => { setInput(event.target.value); setLoadedFile(""); if (!inputTrackedRef.current && event.target.value.length > 0) { inputTrackedRef.current = true; trackToolEvent("input_selected", "json-formatter", { locale, mode: "text" }); } }} placeholder={l.placeholder} spellCheck={false} className="w-full h-96 p-4 bg-white border border-gray-200 rounded-xl font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary-500" />
        </div>
        <div>
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="text-sm font-medium text-gray-700">{l.output}</span>
            <div className="inline-flex rounded-lg border border-gray-200 bg-white p-0.5" role="group" aria-label="Output view">
              {(["text", "tree"] as JsonView[]).map((option) => <button key={option} type="button" onClick={() => setView(option)} aria-pressed={view === option} className={`rounded-md px-2.5 py-1 text-xs font-medium ${view === option ? "bg-primary-600 text-white" : "text-gray-600"}`}>{option === "text" ? l.textView : l.treeView}</button>)}
            </div>
          </div>
          {view === "text" ? (
            <textarea value={output} readOnly aria-label={l.output} placeholder={l.outputPlaceholder} spellCheck={false} className="w-full h-96 p-4 bg-gray-50 border border-gray-200 rounded-xl font-mono text-sm resize-y focus:outline-none" />
          ) : (
            <div className="h-96 overflow-auto p-4 bg-gray-50 border border-gray-200 rounded-xl font-mono text-sm">
              {hasParsed ? <JsonTreeNode name={l.root} value={parsed} depth={0} itemLabel={l.items} /> : <p className="text-gray-400">{l.outputPlaceholder}</p>}
            </div>
          )}
        </div>
      </div>

      {output && view === "text" ? <div className="mt-4"><button onClick={copy} className="btn-primary text-sm">{copied ? l.copied : l.copy}</button></div> : null}
      <ToolContent content={jsonFormatterContent} />
    </div>
  );
}
