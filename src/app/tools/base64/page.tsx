"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage, pick } from "@/lib/language-context";
import { trackToolUse } from "@/lib/track";

const labels = {
  en: {
    back: "← Back to Tools",
    title: "Base64 Encoder/Decoder",
    subtitle: "Encode text to Base64 or decode Base64 back to plain text. Supports UTF-8.",
    encode: "Encode",
    decode: "Decode",
    clear: "Clear",
    input: "Input",
    output: "Output",
    placeholder: "Enter text to encode or Base64 to decode...",
    outputPlaceholder: "Result will appear here...",
    copy: "Copy Output",
    errorEncode: "Failed to encode text.",
    errorDecode: "Invalid Base64 string.",
  },
  tr: {
    back: "← Araçlara Dön",
    title: "Base64 Kodlayıcı/Çözücü",
    subtitle: "Metni Base64'e kodlayın veya Base64'ü düz metne çözün. UTF-8 desteklenir.",
    encode: "Kodla",
    decode: "Çöz",
    clear: "Temizle",
    input: "Girdi",
    output: "Çıktı",
    placeholder: "Kodlanacak metni veya çözülecek Base64'ü girin...",
    outputPlaceholder: "Sonuç burada görünecek...",
    copy: "Çıktıyı Kopyala",
    errorEncode: "Metin kodlanamadı.",
    errorDecode: "Geçersiz Base64 dizesi.",
  },
  es: {
    back: "← Volver a las herramientas",
    title: "Codificador/Decodificador Base64",
    subtitle: "Codifica texto a Base64 o decodifica Base64 a texto plano. Compatible con UTF-8.",
    encode: "Codificar",
    decode: "Decodificar",
    clear: "Limpiar",
    input: "Entrada",
    output: "Salida",
    placeholder: "Introduce el texto a codificar o el Base64 a decodificar...",
    outputPlaceholder: "El resultado aparecerá aquí...",
    copy: "Copiar salida",
    errorEncode: "No se pudo codificar el texto.",
    errorDecode: "Cadena Base64 no válida.",
  },
  de: {
    back: "← Zurück zu den Tools",
    title: "Base64-Encoder/Decoder",
    subtitle: "Text in Base64 kodieren oder Base64 in Klartext dekodieren. UTF-8 wird unterstützt.",
    encode: "Kodieren",
    decode: "Dekodieren",
    clear: "Leeren",
    input: "Eingabe",
    output: "Ausgabe",
    placeholder: "Text zum Kodieren oder Base64 zum Dekodieren eingeben...",
    outputPlaceholder: "Das Ergebnis erscheint hier...",
    copy: "Ausgabe kopieren",
    errorEncode: "Text konnte nicht kodiert werden.",
    errorDecode: "Ungültige Base64-Zeichenfolge.",
  },
  pt: {
    back: "← Voltar às ferramentas",
    title: "Codificador/Decodificador Base64",
    subtitle: "Codifique texto para Base64 ou decodifique Base64 para texto simples. Compatível com UTF-8.",
    encode: "Codificar",
    decode: "Decodificar",
    clear: "Limpar",
    input: "Entrada",
    output: "Saída",
    placeholder: "Digite o texto a codificar ou o Base64 a decodificar...",
    outputPlaceholder: "O resultado aparecerá aqui...",
    copy: "Copiar saída",
    errorEncode: "Falha ao codificar o texto.",
    errorDecode: "Cadeia Base64 inválida.",
  },
  fr: {
    back: "← Retour aux outils",
    title: "Encodeur/Décodeur Base64",
    subtitle: "Encodez du texte en Base64 ou décodez du Base64 en texte brut. UTF-8 pris en charge.",
    encode: "Encoder",
    decode: "Décoder",
    clear: "Effacer",
    input: "Entrée",
    output: "Sortie",
    placeholder: "Saisissez le texte à encoder ou le Base64 à décoder...",
    outputPlaceholder: "Le résultat apparaîtra ici...",
    copy: "Copier la sortie",
    errorEncode: "Échec de l'encodage du texte.",
    errorDecode: "Chaîne Base64 non valide.",
  },
};

export default function Base64Page() {
  const { locale, localePath } = useLanguage();
  const l = pick(labels, locale);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const encode = () => {
    try {
      const encoded = btoa(
        new TextEncoder()
          .encode(input)
          .reduce((acc, byte) => acc + String.fromCharCode(byte), "")
      );
      setOutput(encoded);
      setError("");
      void trackToolUse("base64");
    } catch {
      setError(l.errorEncode);
      setOutput("");
    }
  };

  const decode = () => {
    try {
      const bytes = Uint8Array.from(atob(input), (c) => c.charCodeAt(0));
      const decoded = new TextDecoder().decode(bytes);
      setOutput(decoded);
      setError("");
      void trackToolUse("base64");
    } catch {
      setError(l.errorDecode);
      setOutput("");
    }
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

      <div className="flex flex-wrap gap-3 mb-6">
        <button onClick={encode} className="btn-primary text-sm">{l.encode}</button>
        <button onClick={decode} className="btn-secondary text-sm">{l.decode}</button>
        <button
          onClick={() => { setInput(""); setOutput(""); setError(""); }}
          className="btn-secondary text-sm"
        >
          {l.clear}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">
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
            className="w-full h-64 p-4 bg-white border border-gray-200 rounded-xl font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{l.output}</label>
          <textarea
            value={output}
            readOnly
            placeholder={l.outputPlaceholder}
            className="w-full h-64 p-4 bg-gray-50 border border-gray-200 rounded-xl font-mono text-sm resize-y focus:outline-none"
          />
        </div>
      </div>

      {output && (
        <div className="mt-4">
          <button
            onClick={() => navigator.clipboard.writeText(output)}
            className="btn-primary text-sm"
          >
            {l.copy}
          </button>
        </div>
      )}
    </div>
  );
}
