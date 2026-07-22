"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { trackToolUse } from "@/lib/track";

const labels = {
  en: {
    back: "← Back to Tools",
    title: "Favicon Generator",
    subtitle:
      "Turn any square-ish image into a complete favicon set: favicon.ico, PNGs in all standard sizes, and the HTML tags to paste. Generated entirely in your browser.",
    drop: "Drop an image here or click to select",
    formats: "PNG, JPG or WebP — ideally 512×512 or larger",
    generate: "Generate Favicons",
    processing: "Generating...",
    downloadZip: "Download ZIP",
    preview: "Preview",
    htmlTitle: "HTML tags (paste into <head>)",
    copy: "Copy",
    copied: "Copied!",
    clear: "Clear",
    invalid: "Only image files are supported.",
  },
  tr: {
    back: "← Araçlara Dön",
    title: "Favicon Üretici",
    subtitle:
      "Herhangi bir kare görseli eksiksiz bir favicon setine dönüştürün: favicon.ico, tüm standart boyutlarda PNG'ler ve yapıştırılacak HTML etiketleri. Tamamen tarayıcınızda üretilir.",
    drop: "Görseli buraya bırakın veya tıklayıp seçin",
    formats: "PNG, JPG veya WebP — ideali 512×512 ya da daha büyük",
    generate: "Favicon Üret",
    processing: "Üretiliyor...",
    downloadZip: "ZIP İndir",
    preview: "Önizleme",
    htmlTitle: "HTML etiketleri (<head> içine yapıştırın)",
    copy: "Kopyala",
    copied: "Kopyalandı!",
    clear: "Temizle",
    invalid: "Yalnızca resim dosyaları desteklenir.",
  },
};

const PNG_SIZES = [16, 32, 48, 180, 192, 512];
const ICO_SIZES = [16, 32, 48];

const HTML_SNIPPET = `<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png">`;

async function renderPng(bitmap: ImageBitmap, size: number): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.imageSmoothingQuality = "high";
  // Kare olmayan görseli ortalayarak kırp
  const side = Math.min(bitmap.width, bitmap.height);
  const sx = (bitmap.width - side) / 2;
  const sy = (bitmap.height - side) / 2;
  ctx.drawImage(bitmap, sx, sy, side, side, 0, 0, size, size);
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob"))), "image/png")
  );
}

// PNG girdili ICO kabı (modern tarayıcıların tamamı destekler)
function buildIco(entries: { size: number; data: ArrayBuffer }[]): Blob {
  const headerSize = 6 + entries.length * 16;
  const total = headerSize + entries.reduce((s, e) => s + e.data.byteLength, 0);
  const buf = new ArrayBuffer(total);
  const view = new DataView(buf);
  const bytes = new Uint8Array(buf);

  view.setUint16(0, 0, true); // rezerve
  view.setUint16(2, 1, true); // tip: ICO
  view.setUint16(4, entries.length, true);

  let offset = headerSize;
  entries.forEach((e, i) => {
    const base = 6 + i * 16;
    view.setUint8(base, e.size === 256 ? 0 : e.size);
    view.setUint8(base + 1, e.size === 256 ? 0 : e.size);
    view.setUint8(base + 2, 0); // palet yok
    view.setUint8(base + 3, 0);
    view.setUint16(base + 4, 1, true); // düzlem
    view.setUint16(base + 6, 32, true); // bpp
    view.setUint32(base + 8, e.data.byteLength, true);
    view.setUint32(base + 12, offset, true);
    bytes.set(new Uint8Array(e.data), offset);
    offset += e.data.byteLength;
  });

  return new Blob([buf], { type: "image/x-icon" });
}

export default function FaviconGeneratorPage() {
  const { locale, localePath } = useLanguage();
  const l = labels[locale];
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [previews, setPreviews] = useState<{ size: number; url: string }[]>([]);
  const [zipUrl, setZipUrl] = useState("");
  const [processing, setProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const pick = (f: File | undefined | null) => {
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      alert(l.invalid);
      return;
    }
    setFile(f);
    setPreviews([]);
    setZipUrl("");
  };

  const generate = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const bitmap = await createImageBitmap(file);
      const pngs = new Map<number, Blob>();
      for (const size of PNG_SIZES) {
        pngs.set(size, await renderPng(bitmap, size));
      }
      bitmap.close();

      const icoEntries = await Promise.all(
        ICO_SIZES.map(async (size) => ({ size, data: await pngs.get(size)!.arrayBuffer() }))
      );
      const ico = buildIco(icoEntries);

      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();
      zip.file("favicon.ico", ico);
      zip.file("favicon-16x16.png", pngs.get(16)!);
      zip.file("favicon-32x32.png", pngs.get(32)!);
      zip.file("favicon-48x48.png", pngs.get(48)!);
      zip.file("apple-touch-icon.png", pngs.get(180)!);
      zip.file("icon-192.png", pngs.get(192)!);
      zip.file("icon-512.png", pngs.get(512)!);
      zip.file("snippet.html", HTML_SNIPPET);
      const zipBlob = await zip.generateAsync({ type: "blob" });

      setPreviews(
        [16, 32, 48, 180].map((size) => ({ size, url: URL.createObjectURL(pngs.get(size)!) }))
      );
      setZipUrl(URL.createObjectURL(zipBlob));
      void trackToolUse("favicon-generator");
    } finally {
      setProcessing(false);
    }
  };

  const clearAll = () => {
    previews.forEach((p) => URL.revokeObjectURL(p.url));
    if (zipUrl) URL.revokeObjectURL(zipUrl);
    setFile(null);
    setPreviews([]);
    setZipUrl("");
  };

  const copySnippet = async () => {
    await navigator.clipboard.writeText(HTML_SNIPPET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href={localePath("/")} className="text-primary-600 hover:text-primary-700 text-sm">
          {l.back}
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">{l.title}</h1>
      <p className="text-gray-600 mb-8">{l.subtitle}</p>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          pick(e.dataTransfer.files?.[0]);
        }}
        className="border-2 border-dashed border-gray-300 hover:border-primary-400 rounded-2xl p-10 text-center cursor-pointer transition-colors mb-6 bg-white"
      >
        <p className="text-gray-700 font-medium mb-1">{file ? `🖼 ${file.name}` : l.drop}</p>
        <p className="text-gray-400 text-sm">{l.formats}</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => pick(e.target.files?.[0])}
        />
      </div>

      {file && (
        <div className="flex gap-3 mb-8">
          <button onClick={generate} disabled={processing} className="btn-primary text-sm disabled:opacity-60">
            {processing ? l.processing : l.generate}
          </button>
          <button onClick={clearAll} className="btn-secondary text-sm">{l.clear}</button>
        </div>
      )}

      {previews.length > 0 && (
        <div className="space-y-8">
          <div>
            <h2 className="font-semibold text-gray-900 mb-3">{l.preview}</h2>
            <div className="flex items-end gap-6 flex-wrap bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              {previews.map((p) => (
                <div key={p.size} className="text-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.url} alt={`${p.size}px favicon`} width={Math.min(p.size, 64)} height={Math.min(p.size, 64)} className="mx-auto border border-gray-100 rounded" />
                  <p className="text-xs text-gray-400 mt-1.5">{p.size}px</p>
                </div>
              ))}
            </div>
          </div>

          {zipUrl && (
            <a href={zipUrl} download="favicons.zip" className="btn-primary text-sm inline-block">
              {l.downloadZip}
            </a>
          )}

          <div>
            <h2 className="font-semibold text-gray-900 mb-3">{l.htmlTitle}</h2>
            <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 text-xs overflow-x-auto">{HTML_SNIPPET}</pre>
            <button onClick={copySnippet} className="btn-secondary text-sm mt-3">
              {copied ? l.copied : l.copy}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
