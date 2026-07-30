"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage, pick } from "@/lib/language-context";
import { trackToolUse } from "@/lib/track";
import { ToolContent } from "@/components/ToolContent";
import { jsonFormatterContent } from "@/content/tools/json-formatter";

const labels = {
  en: {
    back: "← Back to Tools",
    title: "JSON Formatter",
    subtitle: "Format, validate and minify JSON instantly — entirely in your browser.",
    format: "Format",
    minify: "Minify",
    validate: "Validate",
    clear: "Clear",
    spaces: (n: number) => `${n} spaces`,
    tab: "Tab (8)",
    input: "Input",
    output: "Output",
    placeholder: '{"key": "value"}',
    outputPlaceholder: "Formatted output will appear here...",
    copy: "Copy Output",
    copied: "Copied!",
    valid: "Valid JSON!",
    invalid: "Invalid JSON",
  },
  tr: {
    back: "← Araçlara Dön",
    title: "JSON Biçimlendirici",
    subtitle: "JSON'u anında biçimlendirin, doğrulayın ve küçültün — tamamen tarayıcınızda.",
    format: "Biçimlendir",
    minify: "Küçült",
    validate: "Doğrula",
    clear: "Temizle",
    spaces: (n: number) => `${n} boşluk`,
    tab: "Sekme (8)",
    input: "Girdi",
    output: "Çıktı",
    placeholder: '{"anahtar": "değer"}',
    outputPlaceholder: "Biçimlendirilmiş çıktı burada görünecek...",
    copy: "Çıktıyı Kopyala",
    copied: "Kopyalandı!",
    valid: "Geçerli JSON!",
    invalid: "Geçersiz JSON",
  },
  es: {
    back: "← Volver a las herramientas",
    title: "Formateador JSON",
    subtitle: "Formatea, valida y minifica JSON al instante, todo en tu navegador.",
    format: "Formatear",
    minify: "Minificar",
    validate: "Validar",
    clear: "Limpiar",
    spaces: (n: number) => `${n} espacios`,
    tab: "Tabulación (8)",
    input: "Entrada",
    output: "Salida",
    placeholder: '{"clave": "valor"}',
    outputPlaceholder: "La salida formateada aparecerá aquí...",
    copy: "Copiar salida",
    copied: "¡Copiado!",
    valid: "¡JSON válido!",
    invalid: "JSON no válido",
  },
  de: {
    back: "← Zurück zu den Tools",
    title: "JSON-Formatter",
    subtitle: "JSON sofort formatieren, validieren und minifizieren – vollständig im Browser.",
    format: "Formatieren",
    minify: "Minifizieren",
    validate: "Validieren",
    clear: "Leeren",
    spaces: (n: number) => `${n} Leerzeichen`,
    tab: "Tabulator (8)",
    input: "Eingabe",
    output: "Ausgabe",
    placeholder: '{"schlüssel": "wert"}',
    outputPlaceholder: "Formatierte Ausgabe erscheint hier ...",
    copy: "Ausgabe kopieren",
    copied: "Kopiert!",
    valid: "Gültiges JSON!",
    invalid: "Ungültiges JSON",
  },
  pt: {
    back: "← Voltar às ferramentas",
    title: "Formatador JSON",
    subtitle: "Formate, valide e minifique JSON na hora — inteiramente no seu navegador.",
    format: "Formatar",
    minify: "Minificar",
    validate: "Validar",
    clear: "Limpar",
    spaces: (n: number) => `${n} espaços`,
    tab: "Tabulação (8)",
    input: "Entrada",
    output: "Saída",
    placeholder: '{"chave": "valor"}',
    outputPlaceholder: "A saída formatada aparecerá aqui...",
    copy: "Copiar saída",
    copied: "Copiado!",
    valid: "JSON válido!",
    invalid: "JSON inválido",
  },
  fr: {
    back: "← Retour aux outils",
    title: "Formateur JSON",
    subtitle: "Formatez, validez et minifiez du JSON instantanément — entièrement dans votre navigateur.",
    format: "Formater",
    minify: "Minifier",
    validate: "Valider",
    clear: "Effacer",
    spaces: (n: number) => `${n} espaces`,
    tab: "Tabulation (8)",
    input: "Entrée",
    output: "Sortie",
    placeholder: '{"clé": "valeur"}',
    outputPlaceholder: "La sortie formatée apparaîtra ici...",
    copy: "Copier la sortie",
    copied: "Copié !",
    valid: "JSON valide !",
    invalid: "JSON non valide",
  },
};

export default function JsonFormatterPage() {
  const { locale, localePath } = useLanguage();
  const l = pick(labels, locale);

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indentSize, setIndentSize] = useState(2);
  const [copied, setCopied] = useState(false);

  const run = (mode: "format" | "minify" | "validate") => {
    try {
      const parsed = JSON.parse(input);
      if (mode === "format") setOutput(JSON.stringify(parsed, null, indentSize));
      else if (mode === "minify") setOutput(JSON.stringify(parsed));
      else setOutput(l.valid);
      setError("");
      void trackToolUse("json-formatter");
    } catch (e) {
      setError(e instanceof Error ? e.message : l.invalid);
      setOutput("");
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href={localePath("/")} className="text-primary-600 hover:text-primary-700 text-sm">
          {l.back}
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">{l.title}</h1>
      <p className="text-gray-600 mb-8">{l.subtitle}</p>

      <div className="flex flex-wrap gap-3 mb-6">
        <button onClick={() => run("format")} className="btn-primary text-sm">
          {l.format}
        </button>
        <button onClick={() => run("minify")} className="btn-secondary text-sm">
          {l.minify}
        </button>
        <button onClick={() => run("validate")} className="btn-secondary text-sm">
          {l.validate}
        </button>
        <select
          value={indentSize}
          onChange={(e) => setIndentSize(Number(e.target.value))}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
        >
          <option value={2}>{l.spaces(2)}</option>
          <option value={4}>{l.spaces(4)}</option>
          <option value={8}>{l.tab}</option>
        </select>
        <button
          onClick={() => {
            setInput("");
            setOutput("");
            setError("");
          }}
          className="btn-secondary text-sm"
        >
          {l.clear}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 font-mono text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{l.input}</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={l.placeholder}
            spellCheck={false}
            className="w-full h-96 p-4 bg-white border border-gray-200 rounded-xl font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{l.output}</label>
          <textarea
            value={output}
            readOnly
            placeholder={l.outputPlaceholder}
            spellCheck={false}
            className="w-full h-96 p-4 bg-gray-50 border border-gray-200 rounded-xl font-mono text-sm resize-y focus:outline-none"
          />
        </div>
      </div>

      {output && (
        <div className="mt-4">
          <button onClick={copy} className="btn-primary text-sm">
            {copied ? l.copied : l.copy}
          </button>
        </div>
      )}

      <ToolContent content={jsonFormatterContent} />
    </div>
  );
}
