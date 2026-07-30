"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useLanguage, pick } from "@/lib/language-context";
import { trackToolUse } from "@/lib/track";
import { ToolContent } from "@/components/ToolContent";
import { imageResizeContent } from "@/content/tools/images";

const labels = {
  en: {
    back: "← Back to Tools",
    title: "Image Resizer",
    subtitle:
      "Resize JPG, PNG and WebP images by width or percentage. Aspect ratio is preserved and images never leave your browser.",
    drop: "Drop images here or click to select",
    formats: "JPG, PNG, WebP — multiple files supported",
    modeWidth: "Target width (px)",
    modePercent: "Scale (%)",
    quality: "Quality",
    resize: "Resize",
    processing: "Processing...",
    original: "Original",
    resized: "Resized",
    download: "Download",
    downloadAll: "Download All",
    clear: "Clear",
    invalid: "Only image files are supported.",
  },
  tr: {
    back: "← Araçlara Dön",
    title: "Resim Boyutlandırma",
    subtitle:
      "JPG, PNG ve WebP resimleri genişliğe veya yüzdeye göre boyutlandırın. En-boy oranı korunur, resimleriniz tarayıcıdan çıkmaz.",
    drop: "Resimleri buraya bırakın veya tıklayıp seçin",
    formats: "JPG, PNG, WebP — çoklu dosya desteklenir",
    modeWidth: "Hedef genişlik (px)",
    modePercent: "Ölçek (%)",
    quality: "Kalite",
    resize: "Boyutlandır",
    processing: "İşleniyor...",
    original: "Orijinal",
    resized: "Yeni",
    download: "İndir",
    downloadAll: "Tümünü İndir",
    clear: "Temizle",
    invalid: "Yalnızca resim dosyaları desteklenir.",
  },
};

interface ResizeResult {
  name: string;
  url: string;
  originalSize: number;
  newSize: number;
  originalDims: string;
  newDims: string;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export default function ImageResizePage() {
  const { locale, localePath } = useLanguage();
  const l = pick(labels, locale);
  const inputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [mode, setMode] = useState<"width" | "percent">("width");
  const [width, setWidth] = useState(1280);
  const [percent, setPercent] = useState(50);
  const [quality, setQuality] = useState(85);
  const [results, setResults] = useState<ResizeResult[]>([]);
  const [processing, setProcessing] = useState(false);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const images = Array.from(list).filter((f) => f.type.startsWith("image/"));
    if (images.length === 0) {
      alert(l.invalid);
      return;
    }
    setFiles((prev) => [...prev, ...images]);
    setResults([]);
  };

  const resizeAll = async () => {
    setProcessing(true);
    const out: ResizeResult[] = [];
    try {
      for (const file of files) {
        const bitmap = await createImageBitmap(file);
        const scale =
          mode === "width"
            ? Math.min(width / bitmap.width, 1)
            : Math.min(Math.max(percent, 1), 100) / 100;
        const w = Math.max(1, Math.round(bitmap.width * scale));
        const h = Math.max(1, Math.round(bitmap.height * scale));

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) continue;
        ctx.drawImage(bitmap, 0, 0, w, h);

        const type = file.type === "image/png" ? "image/png" : file.type === "image/webp" ? "image/webp" : "image/jpeg";
        const blob: Blob | null = await new Promise((resolve) =>
          canvas.toBlob(resolve, type, quality / 100)
        );
        if (!blob) continue;

        out.push({
          name: file.name.replace(/(\.[^.]+)$/, `-${w}x${h}$1`),
          url: URL.createObjectURL(blob),
          originalSize: file.size,
          newSize: blob.size,
          originalDims: `${bitmap.width}×${bitmap.height}`,
          newDims: `${w}×${h}`,
        });
        bitmap.close();
      }
      setResults(out);
      if (out.length > 0) void trackToolUse("image-resize");
    } finally {
      setProcessing(false);
    }
  };

  const downloadAll = () => {
    for (const r of results) {
      const a = document.createElement("a");
      a.href = r.url;
      a.download = r.name;
      a.click();
    }
  };

  const clearAll = () => {
    results.forEach((r) => URL.revokeObjectURL(r.url));
    setFiles([]);
    setResults([]);
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

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          addFiles(e.dataTransfer.files);
        }}
        className="border-2 border-dashed border-gray-300 hover:border-primary-400 rounded-2xl p-10 text-center cursor-pointer transition-colors mb-6 bg-white"
      >
        <p className="text-gray-700 font-medium mb-1">{l.drop}</p>
        <p className="text-gray-400 text-sm">{l.formats}</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <>
          <ul className="text-sm text-gray-600 mb-6 space-y-1">
            {files.map((f, i) => (
              <li key={i} className="truncate">
                📄 {f.name} <span className="text-gray-400">({formatBytes(f.size)})</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-end gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value as "width" | "percent")}
                  className="p-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="width">{l.modeWidth}</option>
                  <option value="percent">{l.modePercent}</option>
                </select>
              </label>
              {mode === "width" ? (
                <input
                  type="number"
                  min={1}
                  max={10000}
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="w-32 p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              ) : (
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={percent}
                  onChange={(e) => setPercent(Number(e.target.value))}
                  className="w-32 p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {l.quality}: {quality}
              </label>
              <input
                type="range"
                min={40}
                max={100}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-40"
              />
            </div>
            <button onClick={resizeAll} disabled={processing} className="btn-primary text-sm mb-1 disabled:opacity-60">
              {processing ? l.processing : l.resize}
            </button>
            <button onClick={clearAll} className="btn-secondary text-sm mb-1">
              {l.clear}
            </button>
          </div>
        </>
      )}

      {results.length > 0 && (
        <div className="space-y-3">
          {results.map((r, i) => (
            <div
              key={i}
              className="flex flex-wrap items-center justify-between gap-3 bg-white border border-gray-100 rounded-xl p-4 shadow-sm"
            >
              <div className="min-w-0">
                <p className="font-medium text-gray-900 text-sm truncate">{r.name}</p>
                <p className="text-xs text-gray-500">
                  {l.original}: {r.originalDims} · {formatBytes(r.originalSize)} → {l.resized}: {r.newDims} ·{" "}
                  <span className="text-green-600 font-medium">{formatBytes(r.newSize)}</span>
                </p>
              </div>
              <a href={r.url} download={r.name} className="btn-primary text-sm !py-2">
                {l.download}
              </a>
            </div>
          ))}
          {results.length > 1 && (
            <button onClick={downloadAll} className="btn-primary text-sm">
              {l.downloadAll}
            </button>
          )}
        </div>
      )}

      <ToolContent content={imageResizeContent} />
    </div>
  );
}
