"use client";
import { trackToolUse } from "@/lib/track";

import { useState, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

interface PageInfo { index: number; rotation: number; }

export default function PdfRotatePage() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PageInfo[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { t, locale } = useLanguage();

  const loadFile = async (f: File) => {
    if (f.type !== "application/pdf") { setError(t("error.selectPdf")); return; }
    setFile(f); setError("");
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = await f.arrayBuffer();
      const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
      setPages(Array.from({ length: pdf.getPageCount() }, (_, i) => ({ index: i, rotation: 0 })));
    } catch { setError(t("error.cantRead")); setFile(null); }
  };

  const rotatePage = (index: number, deg: number) => setPages(prev => prev.map(p => p.index === index ? { ...p, rotation: (p.rotation + deg) % 360 } : p));
  const rotateAll = (deg: number) => setPages(prev => prev.map(p => ({ ...p, rotation: (p.rotation + deg) % 360 })));

  const savePdf = async () => {
    if (!file) return;
    setProcessing(true); setError(""); setProgress(20);
    try {
      const { PDFDocument, degrees } = await import("pdf-lib");
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true }); setProgress(50);
      for (const pi of pages) { if (pi.rotation !== 0) { const page = pdf.getPage(pi.index); page.setRotation(degrees(page.getRotation().angle + pi.rotation)); } }
      setProgress(80);
      const pdfBytes = await pdf.save();
      const blob = new Blob([pdfBytes as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = `rotated_${file.name}`; a.click();
      URL.revokeObjectURL(url); setProgress(100);
      void trackToolUse("pdf-rotate");
    } catch { setError(t("error.failedRotate")); } finally { setProcessing(false); }
  };

  const reset = () => { setFile(null); setPages([]); setProgress(0); setError(""); };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6"><Link href="/tools/pdf" className="text-primary-600 hover:text-primary-700 text-sm">&larr; {t("pdf.backToPdf")}</Link></div>
      <div className="flex items-start justify-between mb-2">
        <h1 className="text-3xl font-bold text-gray-900">{t("pdfRotate.title")}</h1>
        <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full border border-green-200">{t("pdf.noFileLimit")}</span>
      </div>
      <p className="text-gray-600 mb-8">{t("pdfRotate.subtitle")} {t("pdf.allBrowser")}</p>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">{error}</div>}
      {!file ? (
        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-primary-400 transition-colors cursor-pointer"
          onClick={() => inputRef.current?.click()} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) loadFile(f); }}>
          <div className="text-5xl mb-4">&#128260;</div>
          <p className="text-gray-700 font-semibold text-lg">{t("pdf.clickOrDrag")}</p>
          <p className="text-gray-400 text-sm mt-2">{t("pdf.noLimitWorks")}</p>
          <input ref={inputRef} type="file" accept=".pdf" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) loadFile(f); }} />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4 mb-6">
            <div><p className="font-medium text-gray-900">{file.name}</p><p className="text-sm text-gray-500">{pages.length} {t("pdf.pages")}</p></div>
            <button onClick={reset} className="text-red-400 hover:text-red-600 text-sm">{t("pdf.remove")}</button>
          </div>
          <div className="flex flex-wrap gap-3 mb-6">
            <button onClick={() => rotateAll(90)} className="btn-secondary text-sm">{t("pdfRotate.rotateAll")} &#8594;90°</button>
            <button onClick={() => rotateAll(180)} className="btn-secondary text-sm">{t("pdfRotate.rotateAll")} 180°</button>
            <button onClick={() => rotateAll(270)} className="btn-secondary text-sm">{t("pdfRotate.rotateAll")} &#8592;90°</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-6">
            {pages.map((page) => (
              <div key={page.index} className="bg-white border border-gray-200 rounded-xl p-3 text-center">
                <div className="w-full aspect-[3/4] bg-gray-100 rounded-lg mb-2 flex items-center justify-center transition-transform" style={{ transform: `rotate(${page.rotation}deg)` }}>
                  <span className="text-gray-400 text-xs">Page {page.index + 1}</span>
                </div>
                <div className="flex justify-center gap-1">
                  <button onClick={() => rotatePage(page.index, 270)} className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">&#8592;</button>
                  <span className="text-xs text-gray-500 px-1 py-1">{page.rotation}°</span>
                  <button onClick={() => rotatePage(page.index, 90)} className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">&#8594;</button>
                </div>
              </div>
            ))}
          </div>
          {processing && (
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2"><span>{t("pdfRotate.rotating")}</span><span>{progress}%</span></div>
              <div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-primary-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} /></div>
            </div>
          )}
          <button onClick={savePdf} disabled={processing} className="btn-primary text-sm disabled:opacity-50">
            {processing ? t("pdf.processing") : t("pdfRotate.download")}
          </button>
        </>
      )}


      {/* FAQ */}
      <div className="mt-16 border-t border-gray-100 pt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {locale === "tr" ? "Sık Sorulan Sorular" : "Frequently Asked Questions"}
        </h2>
        <div className="space-y-5">
          {[
            { q: locale === "tr" ? "Yalnızca belirli sayfaları döndürebilir miyim?" : "Can I rotate only specific pages?", a: locale === "tr" ? "Evet. Sayfaları bağımsız olarak döndürmek için sayfa önizlemelerindeki döndürme oklarına tıklayabilir ya da tüm sayfaları aynı anda döndürmek için toplu döndürme düğmelerini kullanabilirsiniz." : "Yes. Click the rotation arrows on individual page thumbnails to rotate them independently, or use the bulk rotation buttons to rotate all pages at once." },
            { q: locale === "tr" ? "Sayfaları döndürmek PDF kalitesini etkiler mi?" : "Will rotating pages affect the PDF quality?", a: locale === "tr" ? "Hayır. Döndürme, PDF meta verilerine yapısal bir değişikliktir — herhangi bir içeriği yeniden kodlamaz veya sıkıştırmaz, bu nedenle kalite mükemmel şekilde korunur." : "No. Rotation is a structural change to the PDF metadata — it does not re-encode or re-compress any content, so quality is preserved perfectly." },
            { q: locale === "tr" ? "Dosyalarım bir sunucuya yükleniyor mu?" : "Are my files uploaded to a server?", a: locale === "tr" ? "Hayır. Tüm döndürme işlemi pdf-lib kullanılarak tarayıcınızda yerel olarak gerçekleşir. Dosyalarınız cihazınızdan ayrılmaz." : "No. All rotation happens locally in your browser using pdf-lib. Your files never leave your device." },
            { q: locale === "tr" ? "Taranmış bir PDF'yi döndürebilir miyim?" : "Can I rotate a scanned PDF?", a: locale === "tr" ? "Evet. Taranmış PDF'ler görsel içerir ve döndürme işlemi normal PDF'lerle tamamen aynı şekilde çalışır." : "Yes. Scanned PDFs contain images, and rotation works on them exactly the same way as regular PDFs." },
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
