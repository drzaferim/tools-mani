"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useLanguage, pick } from "@/lib/language-context";
import { useTrackToolUseOnce } from "@/lib/track";

function parseMarkdown(md: string): string {
  let html = md
    // Code blocks (``` ... ```)
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto my-3"><code>$2</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded text-sm">$1</code>')
    // Headings
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-5 mb-2">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-6 mb-3">$1</h1>')
    // Bold and italic
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Strikethrough
    .replace(/~~(.+?)~~/g, '<del>$1</del>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary-600 underline" target="_blank" rel="noopener noreferrer">$1</a>')
    // Images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full rounded-lg my-2" />')
    // Horizontal rule
    .replace(/^---$/gm, '<hr class="my-4 border-gray-300" />')
    // Blockquote
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-gray-300 pl-4 text-gray-600 my-2">$1</blockquote>')
    // Unordered lists
    .replace(/^[*-] (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
    // Ordered lists
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal">$1</li>')
    // Line breaks and paragraphs
    .replace(/\n\n/g, '</p><p class="my-2">')
    .replace(/\n/g, '<br />');

  return '<p class="my-2">' + html + '</p>';
}

const labels = {
  en: {
    back: "← Back to Tools",
    title: "Markdown Preview",
    subtitle: "Write Markdown on the left and see the rendered preview on the right.",
    clear: "Clear",
    copyMarkdown: "Copy Markdown",
    copyHtml: "Copy HTML",
    markdown: "Markdown",
    preview: "Preview",
    placeholder: "Write your Markdown here...",
    sample: `# Markdown Preview

Write your **Markdown** here and see the *live preview* on the right.

## Features

- **Bold** and *italic* text
- [Links](https://toolsmani.com)
- Code blocks and \`inline code\`
- Lists, headings, blockquotes

> This is a blockquote

### Code Example

\`\`\`js
function hello() {
  console.log("Hello, World!");
}
\`\`\`

---

Start editing to see the magic!`,
  },
  tr: {
    back: "← Araçlara Dön",
    title: "Markdown Önizleme",
    subtitle: "Solda Markdown yazın, sağda işlenmiş önizlemeyi görün.",
    clear: "Temizle",
    copyMarkdown: "Markdown'ı Kopyala",
    copyHtml: "HTML'i Kopyala",
    markdown: "Markdown",
    preview: "Önizleme",
    placeholder: "Markdown'ınızı buraya yazın...",
    sample: `# Markdown Önizleme

**Markdown**'ınızı buraya yazın ve sağda *canlı önizlemeyi* görün.

## Özellikler

- **Kalın** ve *italik* metin
- [Bağlantılar](https://toolsmani.com)
- Kod blokları ve \`satır içi kod\`
- Listeler, başlıklar, alıntılar

> Bu bir alıntı bloğudur

### Kod Örneği

\`\`\`js
function merhaba() {
  console.log("Merhaba, Dünya!");
}
\`\`\`

---

Düzenlemeye başlayın ve sonucu görün!`,
  },
  es: {
    back: "← Volver a las herramientas",
    title: "Vista previa de Markdown",
    subtitle: "Escribe Markdown a la izquierda y ve la vista previa a la derecha.",
    clear: "Limpiar",
    copyMarkdown: "Copiar Markdown",
    copyHtml: "Copiar HTML",
    markdown: "Markdown",
    preview: "Vista previa",
    placeholder: "Escribe tu Markdown aquí...",
    sample: `# Vista previa de Markdown

Escribe tu **Markdown** aquí y ve la *vista previa en vivo* a la derecha.

## Características

- Texto en **negrita** y *cursiva*
- [Enlaces](https://toolsmani.com)
- Bloques de código y \`código en línea\`
- Listas, encabezados, citas

> Esto es una cita

### Ejemplo de código

\`\`\`js
function hola() {
  console.log("¡Hola, mundo!");
}
\`\`\`

---

¡Empieza a editar para ver la magia!`,
  },
  de: {
    back: "← Zurück zu den Tools",
    title: "Markdown-Vorschau",
    subtitle: "Links Markdown schreiben, rechts die gerenderte Vorschau sehen.",
    clear: "Leeren",
    copyMarkdown: "Markdown kopieren",
    copyHtml: "HTML kopieren",
    markdown: "Markdown",
    preview: "Vorschau",
    placeholder: "Schreiben Sie hier Ihr Markdown...",
    sample: `# Markdown-Vorschau

Schreiben Sie hier Ihr **Markdown** und sehen Sie rechts die *Live-Vorschau*.

## Funktionen

- **Fetter** und *kursiver* Text
- [Links](https://toolsmani.com)
- Codeblöcke und \`Inline-Code\`
- Listen, Überschriften, Zitate

> Dies ist ein Zitat

### Codebeispiel

\`\`\`js
function hallo() {
  console.log("Hallo, Welt!");
}
\`\`\`

---

Beginnen Sie zu tippen und sehen Sie das Ergebnis!`,
  },
  pt: {
    back: "← Voltar às ferramentas",
    title: "Visualização de Markdown",
    subtitle: "Escreva Markdown à esquerda e veja a pré-visualização à direita.",
    clear: "Limpar",
    copyMarkdown: "Copiar Markdown",
    copyHtml: "Copiar HTML",
    markdown: "Markdown",
    preview: "Pré-visualização",
    placeholder: "Escreva seu Markdown aqui...",
    sample: `# Visualização de Markdown

Escreva seu **Markdown** aqui e veja a *pré-visualização ao vivo* à direita.

## Recursos

- Texto em **negrito** e *itálico*
- [Links](https://toolsmani.com)
- Blocos de código e \`código em linha\`
- Listas, títulos, citações

> Isto é uma citação

### Exemplo de código

\`\`\`js
function ola() {
  console.log("Olá, mundo!");
}
\`\`\`

---

Comece a editar para ver a mágica!`,
  },
  fr: {
    back: "← Retour aux outils",
    title: "Aperçu Markdown",
    subtitle: "Écrivez du Markdown à gauche et voyez l'aperçu rendu à droite.",
    clear: "Effacer",
    copyMarkdown: "Copier le Markdown",
    copyHtml: "Copier le HTML",
    markdown: "Markdown",
    preview: "Aperçu",
    placeholder: "Écrivez votre Markdown ici...",
    sample: `# Aperçu Markdown

Écrivez votre **Markdown** ici et voyez l'*aperçu en direct* à droite.

## Fonctionnalités

- Texte en **gras** et en *italique*
- [Liens](https://toolsmani.com)
- Blocs de code et \`code en ligne\`
- Listes, titres, citations

> Ceci est une citation

### Exemple de code

\`\`\`js
function bonjour() {
  console.log("Bonjour, le monde !");
}
\`\`\`

---

Commencez à éditer pour voir la magie !`,
  },
};

export default function MarkdownPreviewPage() {
  const { locale, localePath } = useLanguage();
  const l = pick(labels, locale);
  const [input, setInput] = useState(l.sample);
  const markToolUsed = useTrackToolUseOnce("markdown-preview");

  const html = useMemo(() => parseMarkdown(input), [input]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href={localePath("/")} className="text-primary-600 hover:text-primary-700 text-sm">
          {l.back}
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">{l.title}</h1>
      <p className="text-gray-600 mb-8">{l.subtitle}</p>

      <div className="flex gap-3 mb-4">
        <button onClick={() => setInput("")} className="btn-secondary text-sm">{l.clear}</button>
        <button
          onClick={() => {
            navigator.clipboard.writeText(input);
            markToolUsed();
          }}
          className="btn-secondary text-sm"
        >
          {l.copyMarkdown}
        </button>
        <button
          onClick={() => {
            navigator.clipboard.writeText(html);
            markToolUsed();
          }}
          className="btn-secondary text-sm"
        >
          {l.copyHtml}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{l.markdown}</label>
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (e.target.value !== l.sample) {
                markToolUsed();
              }
            }}
            placeholder={l.placeholder}
            className="w-full h-[500px] p-4 bg-white border border-gray-200 rounded-xl font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{l.preview}</label>
          <div
            className="w-full h-[500px] p-4 bg-white border border-gray-200 rounded-xl overflow-y-auto prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </div>
  );
}
