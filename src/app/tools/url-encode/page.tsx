"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage, pick } from "@/lib/language-context";
import { trackToolUse } from "@/lib/track";

const labels = {
  en: {
    back: "← Back to Tools",
    title: "URL Encoder / Decoder",
    subtitle:
      "Percent-encode text for safe use in URLs, or decode an encoded URL back to readable text.",
    encodeComp: "Encode (component)",
    encodeUri: "Encode (full URL)",
    decode: "Decode",
    compHint: "Component: encodes everything including / ? & — use for query parameter values. Full URL: keeps URL structure characters intact.",
    input: "Input",
    output: "Output",
    placeholder: "https://example.com/search?q=merhaba dünya",
    copy: "Copy",
    copied: "Copied!",
    clear: "Clear",
    invalid: "This string cannot be decoded — it contains an invalid % sequence.",
  },
  tr: {
    back: "← Araçlara Dön",
    title: "URL Kodlayıcı / Çözücü",
    subtitle:
      "Metni URL'lerde güvenle kullanılacak biçimde yüzde-kodlayın veya kodlanmış bir URL'yi okunur hâline çözün.",
    encodeComp: "Kodla (bileşen)",
    encodeUri: "Kodla (tam URL)",
    decode: "Çöz",
    compHint: "Bileşen: / ? & dahil her şeyi kodlar — sorgu parametresi değerleri için kullanın. Tam URL: URL yapı karakterlerini olduğu gibi bırakır.",
    input: "Girdi",
    output: "Çıktı",
    placeholder: "https://ornek.com/ara?q=merhaba dünya",
    copy: "Kopyala",
    copied: "Kopyalandı!",
    clear: "Temizle",
    invalid: "Bu metin çözülemiyor — geçersiz bir % dizisi içeriyor.",
  },
  es: {
    back: "← Volver a las herramientas",
    title: "Codificador / Decodificador de URL",
    subtitle:
      "Codifica texto en formato porcentaje para usarlo con seguridad en URL, o decodifica una URL codificada a texto legible.",
    encodeComp: "Codificar (componente)",
    encodeUri: "Codificar (URL completa)",
    decode: "Decodificar",
    compHint: "Componente: codifica todo, incluidos / ? & — úsalo para valores de parámetros. URL completa: mantiene intactos los caracteres de estructura de la URL.",
    input: "Entrada",
    output: "Salida",
    placeholder: "https://ejemplo.com/buscar?q=hola mundo",
    copy: "Copiar",
    copied: "¡Copiado!",
    clear: "Limpiar",
    invalid: "Esta cadena no se puede decodificar: contiene una secuencia % no válida.",
  },
  de: {
    back: "← Zurück zu den Tools",
    title: "URL-Encoder / -Decoder",
    subtitle:
      "Kodieren Sie Text prozentweise für die sichere Verwendung in URLs oder dekodieren Sie eine kodierte URL in lesbaren Text.",
    encodeComp: "Kodieren (Komponente)",
    encodeUri: "Kodieren (vollständige URL)",
    decode: "Dekodieren",
    compHint: "Komponente: kodiert alles einschließlich / ? & — für Werte von Query-Parametern. Vollständige URL: lässt die Strukturzeichen der URL unverändert.",
    input: "Eingabe",
    output: "Ausgabe",
    placeholder: "https://beispiel.de/suche?q=hallo welt",
    copy: "Kopieren",
    copied: "Kopiert!",
    clear: "Leeren",
    invalid: "Diese Zeichenfolge kann nicht dekodiert werden – sie enthält eine ungültige %-Sequenz.",
  },
  pt: {
    back: "← Voltar às ferramentas",
    title: "Codificador / Decodificador de URL",
    subtitle:
      "Codifique texto em formato porcentagem para uso seguro em URLs, ou decodifique uma URL codificada para texto legível.",
    encodeComp: "Codificar (componente)",
    encodeUri: "Codificar (URL completa)",
    decode: "Decodificar",
    compHint: "Componente: codifica tudo, inclusive / ? & — use para valores de parâmetros. URL completa: mantém intactos os caracteres de estrutura da URL.",
    input: "Entrada",
    output: "Saída",
    placeholder: "https://exemplo.com/buscar?q=olá mundo",
    copy: "Copiar",
    copied: "Copiado!",
    clear: "Limpar",
    invalid: "Esta cadeia não pode ser decodificada — contém uma sequência % inválida.",
  },
  fr: {
    back: "← Retour aux outils",
    title: "Encodeur / Décodeur d'URL",
    subtitle:
      "Encodez du texte en pourcentage pour l'utiliser en toute sécurité dans une URL, ou décodez une URL encodée en texte lisible.",
    encodeComp: "Encoder (composant)",
    encodeUri: "Encoder (URL complète)",
    decode: "Décoder",
    compHint: "Composant : encode tout, y compris / ? & — à utiliser pour les valeurs de paramètres. URL complète : conserve intacts les caractères de structure de l'URL.",
    input: "Entrée",
    output: "Sortie",
    placeholder: "https://exemple.com/recherche?q=bonjour le monde",
    copy: "Copier",
    copied: "Copié !",
    clear: "Effacer",
    invalid: "Cette chaîne ne peut pas être décodée — elle contient une séquence % non valide.",
  },
};

export default function UrlEncodePage() {
  const { locale, localePath } = useLanguage();
  const l = pick(labels, locale);

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const run = (mode: "comp" | "uri" | "decode") => {
    setError("");
    try {
      const result =
        mode === "comp"
          ? encodeURIComponent(input)
          : mode === "uri"
          ? encodeURI(input)
          : decodeURIComponent(input.replace(/\+/g, " "));
      setOutput(result);
      void trackToolUse("url-encode");
    } catch {
      setError(l.invalid);
      setOutput("");
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href={localePath("/")} className="text-primary-600 hover:text-primary-700 text-sm">
          {l.back}
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">{l.title}</h1>
      <p className="text-gray-600 mb-2">{l.subtitle}</p>
      <p className="text-xs text-gray-400 mb-8">{l.compHint}</p>

      <label className="block text-sm font-medium text-gray-700 mb-2">{l.input}</label>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={l.placeholder}
        spellCheck={false}
        className="w-full h-36 p-4 bg-white border border-gray-200 rounded-xl font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4"
      />

      <div className="flex flex-wrap gap-3 mb-6">
        <button onClick={() => run("comp")} className="btn-primary text-sm">{l.encodeComp}</button>
        <button onClick={() => run("uri")} className="btn-secondary text-sm">{l.encodeUri}</button>
        <button onClick={() => run("decode")} className="btn-secondary text-sm">{l.decode}</button>
        <button onClick={() => { setInput(""); setOutput(""); setError(""); }} className="btn-secondary text-sm">
          {l.clear}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">{error}</div>
      )}

      <label className="block text-sm font-medium text-gray-700 mb-2">{l.output}</label>
      <textarea
        value={output}
        readOnly
        spellCheck={false}
        className="w-full h-36 p-4 bg-gray-50 border border-gray-200 rounded-xl font-mono text-sm resize-y focus:outline-none"
      />
      {output && (
        <div className="mt-4">
          <button onClick={copy} className="btn-primary text-sm">{copied ? l.copied : l.copy}</button>
        </div>
      )}
    </div>
  );
}
