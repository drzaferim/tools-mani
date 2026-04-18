"use client";
import { trackToolUse } from "@/lib/track";

import { useState, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

type PageSize = "A4" | "Letter" | "fit";
type Orientation = "portrait" | "landscape";

interface ImageFile {
  file: File;
  preview: string;
  width: number;
  height: number;
}

const PAGE_SIZES = {
  A4: { width: 595.28, height: 841.89 },
  Letter: { width: 612, height: 792 },
};

const translations = {
  title: { en: "Image to PDF", tr: "Görsel → PDF" },
  subtitle: {
    en: "Convert JPG, PNG, WebP, or BMP images to a PDF document. Combine multiple images into one PDF. All in your browser.",
    tr: "JPG, PNG, WebP veya BMP görsellerinizi PDF belgesine dönüştürün. Birden fazla görseli tek PDF'e birleştirin. Tarayıcınızda çalışır.",
  },
  clickOrDrag: { en: "Click or drag images here", tr: "Görselleri buraya tıklayın veya sürükleyin" },
  supportedFormats: { en: "JPG, PNG, WebP, BMP supported", tr: "JPG, PNG, WebP, BMP desteklenir" },
  noLimit: { en: "No file size limit", tr: "Dosya boyutu sınırı yok" },
  addMore: { en: "Add more images", tr: "Daha fazla görsel ekle" },
  pageSize: { en: "Page Size", tr: "Sayfa Boyutu" },
  fitToImage: { en: "Fit to image", tr: "Görsele uydur" },
  orientation: { en: "Orientation", tr: "Yönlendirme" },
  portrait: { en: "Portrait", tr: "Dikey" },
  landscape: { en: "Landscape", tr: "Yatay" },
  margin: { en: "Margin", tr: "Kenar Boşluğu" },
  marginNone: { en: "None", tr: "Yok" },
  marginSmall: { en: "Small (10mm)", tr: "Küçük (10mm)" },
  marginMedium: { en: "Medium (20mm)", tr: "Orta (20mm)" },
  convert: { en: "Convert to PDF", tr: "PDF'e Dönüştür" },
  converting: { en: "Converting...", tr: "Dönüştürülüyor..." },
  images: { en: "images", tr: "görsel" },
  remove: { en: "Remove", tr: "Kaldır" },
  errorImageOnly: { en: "Only image files are supported (JPG, PNG, WebP, BMP).", tr: "Yalnızca görsel dosyaları desteklenir (JPG, PNG, WebP, BMP)." },
  errorConvert: { en: "Conversion failed. Please try again.", tr: "Dönüştürme başarısız. Lütfen tekrar deneyin." },
  backToPdf: { en: "← PDF Tools", tr: "← PDF Araçları" },
  eachPageOneImage: { en: "Each image becomes one PDF page", tr: "Her görsel bir PDF sayfası olur" },
};

function t(key: keyof typeof translations, locale: "en" | "tr"): string {
  return translations[key][locale];
}

export default function ImageToPdfPage() {
  const { locale } = useLanguage();
  const l = locale as "en" | "tr";

  const [images, setImages] = useState<ImageFile[]>([]);
  const [pageSize, setPageSize] = useState<PageSize>("A4");
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [margin, setMargin] = useState<number>(20);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/bmp"];

  const loadImage = (file: File): Promise<ImageFile> =>
    new Promise((resolve, reject) => {
      if (!ACCEPTED.includes(file.type)) { reject(new Error("not image")); return; }
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          resolve({ file, preview: e.target!.result as string, width: img.width, height: img.height });
        };
        img.onerror = reject;
        img.src = e.target!.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const addImages = async (files: FileList | null) => {
    if (!files) return;
    setError("");
    const arr = Array.from(files);
    const validArr = arr.filter(f => ACCEPTED.includes(f.type));
    if (validArr.length === 0) { setError(t("errorImageOnly", l)); return; }
    if (validArr.length < arr.length) setError(t("errorImageOnly", l));

    const loaded = await Promise.all(validArr.map(f => loadImage(f).catch(() => null)));
    const valid = loaded.filter(Boolean) as ImageFile[];
    setImages(prev => [...prev, ...valid]);
  };

  const removeImage = (index: number) => setImages(prev => prev.filter((_, i) => i !== index));

  const moveImage = (from: number, to: number) => {
    if (to < 0 || to >= images.length) return;
    const updated = [...images];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setImages(updated);
  };

  const convertToPdf = async () => {
    if (images.length === 0) return;
    setConverting(true);
    setError("");
    setProgress(10);

    try {
      const { PDFDocument, rgb } = await import("pdf-lib");
      const pdfDoc = await PDFDocument.create();

      for (let i = 0; i < images.length; i++) {
        const imgFile = images[i];
        setProgress(10 + Math.round((i / images.length) * 80));

        const arrayBuffer = await imgFile.file.arrayBuffer();
        let pdfImage;

        const mimeType = imgFile.file.type;
        if (mimeType === "image/png") {
          pdfImage = await pdfDoc.embedPng(arrayBuffer);
        } else {
          // For JPEG, WebP, BMP — convert to JPEG via canvas
          const canvas = document.createElement("canvas");
          canvas.width = imgFile.width;
          canvas.height = imgFile.height;
          const ctx = canvas.getContext("2d")!;
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          const img = new Image();
          await new Promise<void>((res) => {
            img.onload = () => { ctx.drawImage(img, 0, 0); res(); };
            img.src = imgFile.preview;
          });
          const jpegDataUrl = canvas.toDataURL("image/jpeg", 0.92);
          const jpegBytes = Uint8Array.from(atob(jpegDataUrl.split(",")[1]), c => c.charCodeAt(0));
          pdfImage = await pdfDoc.embedJpg(jpegBytes);
        }

        const imgDims = pdfImage.size();

        let pageW: number, pageH: number;
        if (pageSize === "fit") {
          pageW = imgDims.width;
          pageH = imgDims.height;
        } else {
          const dims = PAGE_SIZES[pageSize];
          pageW = orientation === "portrait" ? dims.width : dims.height;
          pageH = orientation === "portrait" ? dims.height : dims.width;
        }

        const page = pdfDoc.addPage([pageW, pageH]);

        // Margin in pt (1mm ~ 2.835pt)
        const marginPt = margin * 2.835;
        const availW = pageW - marginPt * 2;
        const availH = pageH - marginPt * 2;

        if (pageSize === "fit") {
          page.drawImage(pdfImage, { x: 0, y: 0, width: pageW, height: pageH });
        } else {
          // Scale to fit with aspect ratio preserved
          const scale = Math.min(availW / imgDims.width, availH / imgDims.height);
          const drawW = imgDims.width * scale;
          const drawH = imgDims.height * scale;
          const x = marginPt + (availW - drawW) / 2;
          const y = marginPt + (availH - drawH) / 2;

          // White background
          page.drawRectangle({ x: 0, y: 0, width: pageW, height: pageH, color: rgb(1, 1, 1) });
          page.drawImage(pdfImage, { x, y, width: drawW, height: drawH });
        }
      }

      setProgress(95);
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = images.length === 1
        ? images[0].file.name.replace(/\.[^.]+$/, "") + ".pdf"
        : "images.pdf";
      a.click();
      URL.revokeObjectURL(url);
      setProgress(100);
      void trackToolUse("image-to-pdf");
    } catch (err) {
      console.error(err);
      setError(t("errorConvert", l));
    } finally {
      setConverting(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href="/tools/pdf" className="text-primary-600 hover:text-primary-700 text-sm">
          {t("backToPdf", l)}
        </Link>
      </div>

      <div className="flex items-start justify-between mb-2">
        <h1 className="text-3xl font-bold text-gray-900">{t("title", l)}</h1>
        <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full border border-green-200">
          {t("noLimit", l)}
        </span>
      </div>
      <p className="text-gray-600 mb-8">{t("subtitle", l)}</p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">{error}</div>
      )}

      {/* Upload */}
      <div
        className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center hover:border-primary-400 transition-colors cursor-pointer mb-6"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); addImages(e.dataTransfer.files); }}
      >
        <div className="text-5xl mb-4">🖼️</div>
        <p className="text-gray-700 font-semibold text-lg">
          {images.length > 0 ? t("addMore", l) : t("clickOrDrag", l)}
        </p>
        <p className="text-gray-400 text-sm mt-2">{t("supportedFormats", l)}</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/bmp"
          multiple
          className="hidden"
          onChange={(e) => addImages(e.target.files)}
        />
      </div>

      {/* Image list */}
      {images.length > 0 && (
        <>
          <div className="mb-1 text-sm text-gray-500">
            {images.length} {t("images", l)} — {t("eachPageOneImage", l)}
          </div>
          <div className="space-y-2 mb-6">
            {images.map((img, i) => (
              <div key={i} className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-3">
                <span className="text-gray-400 text-sm w-6 text-center">{i + 1}</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.preview} alt={img.file.name} className="w-12 h-12 object-cover rounded-lg border border-gray-100" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{img.file.name}</p>
                  <p className="text-xs text-gray-400">{img.width}×{img.height}px · {formatSize(img.file.size)}</p>
                </div>
                <button onClick={() => moveImage(i, i - 1)} disabled={i === 0} className="text-gray-400 hover:text-gray-600 disabled:opacity-30 text-sm">▲</button>
                <button onClick={() => moveImage(i, i + 1)} disabled={i === images.length - 1} className="text-gray-400 hover:text-gray-600 disabled:opacity-30 text-sm">▼</button>
                <button onClick={() => removeImage(i)} className="text-red-400 hover:text-red-600 text-sm ml-1">✕</button>
              </div>
            ))}
          </div>

          {/* Options */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 space-y-5">
            {/* Page Size */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t("pageSize", l)}</label>
              <div className="flex gap-3">
                {(["A4", "Letter", "fit"] as PageSize[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setPageSize(s)}
                    className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                      pageSize === s
                        ? "bg-primary-600 text-white border-primary-600"
                        : "bg-white text-gray-600 border-gray-200 hover:border-primary-300"
                    }`}
                  >
                    {s === "fit" ? t("fitToImage", l) : s}
                  </button>
                ))}
              </div>
            </div>

            {/* Orientation (only for A4/Letter) */}
            {pageSize !== "fit" && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t("orientation", l)}</label>
                <div className="flex gap-3">
                  {(["portrait", "landscape"] as Orientation[]).map((o) => (
                    <button
                      key={o}
                      onClick={() => setOrientation(o)}
                      className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                        orientation === o
                          ? "bg-primary-600 text-white border-primary-600"
                          : "bg-white text-gray-600 border-gray-200 hover:border-primary-300"
                      }`}
                    >
                      {o === "portrait" ? t("portrait", l) : t("landscape", l)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Margin */}
            {pageSize !== "fit" && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t("margin", l)}</label>
                <div className="flex gap-3">
                  {([
                    { val: 0, label: t("marginNone", l) },
                    { val: 10, label: t("marginSmall", l) },
                    { val: 20, label: t("marginMedium", l) },
                  ]).map(({ val, label }) => (
                    <button
                      key={val}
                      onClick={() => setMargin(val)}
                      className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                        margin === val
                          ? "bg-primary-600 text-white border-primary-600"
                          : "bg-white text-gray-600 border-gray-200 hover:border-primary-300"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Progress */}
          {converting && (
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>{l === "tr" ? "Dönüştürülüyor..." : "Converting..."}</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <button
            onClick={convertToPdf}
            disabled={converting || images.length === 0}
            className="w-full btn-primary py-3 text-base disabled:opacity-60"
          >
            {converting ? t("converting", l) : `${t("convert", l)} (${images.length} ${t("images", l)})`}
          </button>
        </>
      )}

      {/* FAQ */}
      <div className="mt-16 border-t border-gray-100 pt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {l === "tr" ? "Sık Sorulan Sorular" : "Frequently Asked Questions"}
        </h2>
        <div className="space-y-6">
          {[
            {
              q: l === "tr" ? "Hangi görsel formatları destekleniyor?" : "Which image formats are supported?",
              a: l === "tr" ? "JPG, PNG, WebP ve BMP formatları desteklenir. Tüm modern tarayıcılarda çalışır." : "JPG, PNG, WebP, and BMP formats are supported. Works in all modern browsers.",
            },
            {
              q: l === "tr" ? "Görsellerim sunucuya yükleniyor mu?" : "Are my images uploaded to a server?",
              a: l === "tr" ? "Hayır. Tüm dönüştürme işlemi tarayıcınızda gerçekleşir. Dosyalarınız hiçbir sunucuya gönderilmez." : "No. Everything happens locally in your browser. Your images never leave your device.",
            },
            {
              q: l === "tr" ? "Birden fazla görseli tek PDF'e birleştirebilir miyim?" : "Can I combine multiple images into one PDF?",
              a: l === "tr" ? "Evet. Birden fazla görsel yükleyin, sıralayın ve dönüştürün. Her görsel ayrı bir sayfa olur." : "Yes. Upload multiple images, reorder them with the arrows, and convert. Each image becomes a separate page.",
            },
            {
              q: l === "tr" ? "Sayfa boyutu seçenekleri nelerdir?" : "What page size options are available?",
              a: l === "tr" ? "A4 (210×297mm), Letter (216×279mm) veya 'Görsele uydur' seçenekleri mevcuttur. A4 ve Letter için dikey/yatay yönlendirme seçebilirsiniz." : "A4 (210×297mm), Letter (216×279mm), or Fit to image. For A4 and Letter you can choose portrait or landscape orientation.",
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
