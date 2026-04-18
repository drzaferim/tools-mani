"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
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

const SAMPLE = `# Markdown Preview

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

Start editing to see the magic!`;

export default function MarkdownPreviewPage() {
  const [input, setInput] = useState(SAMPLE);
  const markToolUsed = useTrackToolUseOnce("markdown-preview");

  const html = useMemo(() => parseMarkdown(input), [input]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href="/" className="text-primary-600 hover:text-primary-700 text-sm">
          &larr; Back to Tools
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Markdown Preview</h1>
      <p className="text-gray-600 mb-8">
        Write Markdown on the left and see the rendered preview on the right.
      </p>

      <div className="flex gap-3 mb-4">
        <button onClick={() => setInput("")} className="btn-secondary text-sm">Clear</button>
        <button
          onClick={() => {
            navigator.clipboard.writeText(input);
            markToolUsed();
          }}
          className="btn-secondary text-sm"
        >
          Copy Markdown
        </button>
        <button
          onClick={() => {
            navigator.clipboard.writeText(html);
            markToolUsed();
          }}
          className="btn-secondary text-sm"
        >
          Copy HTML
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Markdown</label>
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (e.target.value !== SAMPLE) {
                markToolUsed();
              }
            }}
            placeholder="Write your Markdown here..."
            className="w-full h-[500px] p-4 bg-white border border-gray-200 rounded-xl font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
          <div
            className="w-full h-[500px] p-4 bg-white border border-gray-200 rounded-xl overflow-y-auto prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </div>
  );
}
