"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { trackToolUse } from "@/lib/track";

type OutputFormat = "image/jpeg" | "image/png" | "image/webp";

interface ConvertedFile {
  name: string;
  url: string;
  size: number;
  originalSize: number;
  status: "done" | "error";
  error?: string;
}

const FORMAT_EXT: Record<OutputFormat, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export default function HeicConvertPage() {
  const { locale } = useLanguage();
  const [files, setFiles] = useState<File[]>([]);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("image/jpeg");
  const [quality, setQuality] = useState(0.92);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<ConvertedFile[]>([]);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const tr = (en: string, tr: string) => locale === "tr" ? tr : en;

  const addFiles = (fl: FileList | null) => {
    if (!fl) return;
    const heics = Array.from(fl).filter(f =>
      f.type === "image/heic" || f.type === "image/heif" ||
      f.name.toLowerCase().endsWith(".heic") || f.name.toLowerCase().endsWith(".heif")
    );
    if (heics.length === 0) {
      setError(tr("Please select HEIC or HEIF files.", "Lütfen HEIC veya HEIF dosyaları seçin."));
      return;
    }
    setFiles(prev => [...prev, ...heics]);
    setError("");
    setResults([]);
  };

  const formatSize = (b: number) => {
    if (b < 1024) return b + " B";
    if (b < 1048576) return (b / 1024).toFixed(1) + " KB";
    return (b / 1048576).toFixed(1) + " MB";
  };

  const convertHeicWithLibheif = async (file: File): Promise<Blob> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const libheif = ((await import("libheif-js/wasm-bundle")) as any).default;
    const arrayBuffer = await file.arrayBuffer();
    const decoder = new libheif.HeifDecoder();
    const data = decoder.decode(new Uint8Array(arrayBuffer));
    if (!data || data.length === 0) throw new Error("No image data");

    const image = data[0];
    const width = image.get_width();
    const height = image.get_height();

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d")!;
    const imageData = ctx.createImageData(width, height);

    await new Promise<void>((resolve, reject) => {
      image.display(imageData, (displayData: ImageData | null) => {
        if (!displayData) { reject(new Error("Display failed")); return; }
        ctx.putImageData(displayData, 0, 0);
        resolve();
      });
    });

    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => blob ? resolve(blob) : reject(new Error("Canvas to blob failed")),
        outputFormat,
        outputFormat === "image/png" ? undefined : quality
      );
    });
  };

  const convertAll = async () => {
    if (files.length === 0) return;
    setConverting(true);
    setProgress(0);
    setResults([]);
    setError("");

    const converted: ConvertedFile[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setProgress(Math.round((i / files.length) * 90));
      try {
        const blob = await convertHeicWithLibheif(file);
        const url = URL.createObjectURL(blob);
        const baseName = file.name.replace(/\.(heic|heif)$/i, "");
        converted.push({
          name: `${baseName}.${FORMAT_EXT[outputFormat]}`,
          url,
          size: blob.size,
          originalSize: file.size,
          status: "done",
        });
      } catch (err) {
        converted.push({
          name: file.name,
          url: "",
          size: 0,
          originalSize: file.size,
          status: "error",
          error: tr("Conversion failed", "Dönüştürme başarısız") + (err instanceof Error ? `: ${err.message}` : ""),
        });
      }
    }

    setResults(converted);
    setProgress(100);
    setConverting(false);
    if (converted.some((result) => result.status === "done")) {
      void trackToolUse("heic-convert");
    }
  };

  const downloadAll = async () => {
    const done = results.filter(r => r.status === "done");
    if (done.length === 1) {
      const a = document.createElement("a");
      a.href = done[0].url;
      a.download = done[0].name;
      a.click();
      return;
    }
    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();
    for (const r of done) {
      const res = await fetch(r.url);
      const blob = await res.blob();
      zip.file(r.name, blob);
    }
    const zipBlob = await zip.generateAsync({ type: "blob" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(zipBlob);
    a.download = "converted-images.zip";
    a.click();
  };

  const reset = () => {
    results.forEach(r => { if (r.url) URL.revokeObjectURL(r.url); });
    setFiles([]);
    setResults([]);
    setProgress(0);
    setError("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href="/#tools" className="text-primary-600 hover:text-primary-700 text-sm">
          &larr; {tr("All Tools", "Tüm Araçlar")}
        </Link>
      </div>

      <div className="flex items-start justify-between mb-2">
        <h1 className="text-3xl font-bold text-gray-900">
          {tr("HEIC to JPG / PNG Converter", "HEIC'den JPG / PNG Dönüştürücü")}
        </h1>
        <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full border border-green-200">
          {tr("No file size limit", "Boyut sınırı yok")}
        </span>
      </div>
      <p className="text-gray-600 mb-8">
        {tr(
          "Convert iPhone HEIC/HEIF photos to JPG, PNG or WebP. Batch convert multiple files. Processed entirely in your browser — no uploads.",
          "iPhone HEIC/HEIF fotoğraflarını JPG, PNG veya WebP'ye dönüştürün. Toplu dönüştürme desteklenir. Tüm işlem tarayıcınızda — yükleme yok."
        )}
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">{error}</div>
      )}

      {results.length === 0 && (
        <>
          {/* Drop Zone */}
          <div
            className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-primary-400 transition-colors cursor-pointer mb-6"
            onClick={() => inputRef.current?.click()}
            onDragOver={e => e.preventDefault()}
            onDrop={e => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
          >
            <div className="text-5xl mb-4">📱</div>
            <p className="text-gray-700 font-semibold text-lg">
              {tr("Click or drag HEIC/HEIF files here", "HEIC/HEIF dosyalarını buraya tıklayın veya sürükleyin")}
            </p>
            <p className="text-gray-400 text-sm mt-2">
              {tr("iPhone photos (.heic, .heif) — any size", "iPhone fotoğrafları (.heic, .heif) — herhangi bir boyut")}
            </p>
            <input
              ref={inputRef}
              type="file"
              accept=".heic,.heif,image/heic,image/heif"
              multiple
              className="hidden"
              onChange={e => addFiles(e.target.files)}
            />
          </div>

          {files.length > 0 && (
            <>
              {/* File list */}
              <div className="space-y-2 mb-6">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-3">
                    <span className="text-2xl">🖼️</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{f.name}</p>
                      <p className="text-xs text-gray-400">{formatSize(f.size)}</p>
                    </div>
                    <button onClick={() => setFiles(prev => prev.filter((_, j) => j !== i))}
                      className="text-gray-300 hover:text-red-500 text-lg">✕</button>
                  </div>
                ))}
              </div>

              {/* Options */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {tr("Output Format", "Çıkış Formatı")}
                  </label>
                  <div className="flex gap-3">
                    {(["image/jpeg", "image/png", "image/webp"] as OutputFormat[]).map(fmt => (
                      <button
                        key={fmt}
                        onClick={() => setOutputFormat(fmt)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
                          outputFormat === fmt
                            ? "border-primary-500 bg-primary-50 text-primary-700"
                            : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        {FORMAT_EXT[fmt].toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {outputFormat !== "image/png" && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {tr("Quality", "Kalite")}: {Math.round(quality * 100)}%
                    </label>
                    <input
                      type="range" min="0.5" max="1" step="0.01"
                      value={quality}
                      onChange={e => setQuality(parseFloat(e.target.value))}
                      className="w-full accent-primary-600"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>{tr("Smaller file", "Küçük dosya")}</span>
                      <span>{tr("Best quality", "En iyi kalite")}</span>
                    </div>
                  </div>
                )}
              </div>

              {converting && (
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>{tr("Converting...", "Dönüştürülüyor...")}</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-primary-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}

              <button onClick={convertAll} disabled={converting} className="btn-primary text-sm disabled:opacity-50">
                {converting
                  ? tr("Converting...", "Dönüştürülüyor...")
                  : tr(`Convert ${files.length} file${files.length > 1 ? "s" : ""}`, `${files.length} dosyayı dönüştür`)}
              </button>
            </>
          )}
        </>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {tr("Converted Files", "Dönüştürülen Dosyalar")} ({results.filter(r => r.status === "done").length}/{results.length})
            </h2>
            <div className="flex gap-3">
              {results.filter(r => r.status === "done").length > 1 && (
                <button onClick={downloadAll} className="btn-primary text-sm">
                  {tr("Download All as ZIP", "Tümünü ZIP İndir")}
                </button>
              )}
              <button onClick={reset} className="btn-secondary text-sm">
                {tr("Convert More", "Daha Fazla Dönüştür")}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {results.map((r, i) => (
              <div key={i} className={`flex items-center gap-3 rounded-xl p-4 border ${
                r.status === "done" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
              }`}>
                <span className="text-2xl">{r.status === "done" ? "✅" : "❌"}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{r.name}</p>
                  {r.status === "done" ? (
                    <p className="text-xs text-gray-500">
                      {formatSize(r.originalSize)} → {formatSize(r.size)}
                      {" "}({Math.round((1 - r.size / r.originalSize) * 100)}% {tr("smaller", "küçük")})
                    </p>
                  ) : (
                    <p className="text-xs text-red-500">{r.error}</p>
                  )}
                </div>
                {r.status === "done" && (
                  <a href={r.url} download={r.name} className="btn-primary text-xs !py-1.5 !px-3">
                    {tr("Download", "İndir")}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQ */}
      <div className="mt-16 border-t border-gray-100 pt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {locale === "tr" ? "Sık Sorulan Sorular" : "Frequently Asked Questions"}
        </h2>
        <div className="space-y-5">
          {[
            {
              q: tr("What is a HEIC file?", "HEIC dosyası nedir?"),
              a: tr(
                "HEIC is the default photo format on iPhones (iOS 11+). It offers great compression but is not widely supported on Windows or web platforms.",
                "HEIC, iPhone'larda (iOS 11+) varsayılan fotoğraf formatıdır. Mükemmel sıkıştırma sunar ancak Windows ve web platformlarında yaygın olarak desteklenmez."
              ),
            },
            {
              q: tr("Are my photos uploaded to a server?", "Fotoğraflarım sunucuya yükleniyor mu?"),
              a: tr(
                "Never. All conversion happens locally in your browser. Your photos never leave your device.",
                "Kesinlikle hayır. Tüm dönüştürme tarayıcınızda yerel olarak gerçekleşir. Fotoğraflarınız cihazınızdan ayrılmaz."
              ),
            },
            {
              q: tr("Which format should I choose?", "Hangi formatı seçmeliyim?"),
              a: tr(
                "JPG is best for photos and sharing. PNG is lossless and ideal for screenshots. WebP offers the best compression for the web.",
                "JPG fotoğraflar ve paylaşım için en iyisidir. PNG kayıpsız olup ekran görüntüleri için idealdir. WebP web için en iyi sıkıştırmayı sunar."
              ),
            },
            {
              q: tr("Can I convert multiple files at once?", "Birden fazla dosyayı aynı anda dönüştürebilir miyim?"),
              a: tr(
                "Yes. Select multiple HEIC files and convert them all at once. Download individually or as a ZIP archive.",
                "Evet. Birden fazla HEIC dosyası seçip hepsini aynı anda dönüştürebilirsiniz. Tek tek veya ZIP olarak indirebilirsiniz."
              ),
            },
          ].map(({ q, a }, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">{q}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
