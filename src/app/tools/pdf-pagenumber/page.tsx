"use client";
import { trackToolUse } from "@/lib/track";

import { useState, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

type Position = "bottom-center" | "bottom-left" | "bottom-right" | "top-center" | "top-left" | "top-right";

const positionKeyMap: Record<Position, string> = {
  "bottom-center": "pdfPageNum.bottomCenter",
  "bottom-left": "pdfPageNum.bottomLeft",
  "bottom-right": "pdfPageNum.bottomRight",
  "top-center": "pdfPageNum.topCenter",
  "top-left": "pdfPageNum.topLeft",
  "top-right": "pdfPageNum.topRight",
};

export default function PdfPageNumberPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [position, setPosition] = useState<Position>("bottom-center");
  const [startNumber, setStartNumber] = useState(1);
  const [fontSize, setFontSize] = useState(12);
  const [format, setFormat] = useState<"number" | "pageOfTotal" | "dash">("number");
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
      setPageCount(pdf.getPageCount());
    } catch { setError(t("error.cantRead")); setFile(null); }
  };

  const getPageText = (pageIndex: number, total: number) => {
    const num = pageIndex + startNumber;
    switch (format) {
      case "number": return `${num}`;
      case "pageOfTotal": return `Page ${num} of ${total + startNumber - 1}`;
      case "dash": return `- ${num} -`;
    }
  };

  const getPosition = (pos: Position, pw: number, ph: number, tw: number) => {
    const m = 40;
    const map: Record<Position, { x: number; y: number }> = {
      "bottom-center": { x: (pw - tw) / 2, y: m }, "bottom-left": { x: m, y: m }, "bottom-right": { x: pw - tw - m, y: m },
      "top-center": { x: (pw - tw) / 2, y: ph - m }, "top-left": { x: m, y: ph - m }, "top-right": { x: pw - tw - m, y: ph - m },
    };
    return map[pos];
  };

  const addPageNumbers = async () => {
    if (!file) return;
    setProcessing(true); setError(""); setProgress(10);
    try {
      const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib"); setProgress(20);
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
      const font = await pdf.embedFont(StandardFonts.Helvetica);
      const total = pdf.getPageCount(); setProgress(40);
      for (let i = 0; i < total; i++) {
        const page = pdf.getPage(i); const { width, height } = page.getSize();
        const text = getPageText(i, total);
        const textWidth = font.widthOfTextAtSize(text, fontSize);
        const pos = getPosition(position, width, height, textWidth);
        page.drawText(text, { x: pos.x, y: pos.y, size: fontSize, font, color: rgb(0.3, 0.3, 0.3) });
        setProgress(40 + Math.round((i / total) * 50));
      }
      setProgress(95);
      const pdfBytes = await pdf.save();
      const blob = new Blob([pdfBytes as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = `numbered_${file.name}`; a.click();
      URL.revokeObjectURL(url); setProgress(100);
      void trackToolUse("pdf-pagenumber");
    } catch { setError(t("error.failedPagenum")); } finally { setProcessing(false); }
  };

  const reset = () => { setFile(null); setPageCount(0); setProgress(0); setError(""); };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6"><Link href="/tools/pdf" className="text-primary-600 hover:text-primary-700 text-sm">&larr; {t("pdf.backToPdf")}</Link></div>
      <div className="flex items-start justify-between mb-2">
        <h1 className="text-3xl font-bold text-gray-900">{t("pdfPageNum.title")}</h1>
        <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full border border-green-200">{t("pdf.noFileLimit")}</span>
      </div>
      <p className="text-gray-600 mb-8">{t("pdfPageNum.subtitle")} {t("pdf.allBrowser")}</p>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">{error}</div>}
      {!file ? (
        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-primary-400 transition-colors cursor-pointer"
          onClick={() => inputRef.current?.click()} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) loadFile(f); }}>
          <div className="text-5xl mb-4">&#128290;</div>
          <p className="text-gray-700 font-semibold text-lg">{t("pdf.clickOrDrag")}</p>
          <p className="text-gray-400 text-sm mt-2">{t("pdf.noLimitWorks")}</p>
          <input ref={inputRef} type="file" accept=".pdf" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) loadFile(f); }} />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4 mb-6">
            <div><p className="font-medium text-gray-900">{file.name}</p><p className="text-sm text-gray-500">{pageCount} {t("pdf.pages")}</p></div>
            <button onClick={reset} className="text-red-400 hover:text-red-600 text-sm">{t("pdf.remove")}</button>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t("pdfPageNum.position")}</label>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(positionKeyMap) as Position[]).map(pos => (
                  <button key={pos} onClick={() => setPosition(pos)}
                    className={`text-xs py-2 px-3 rounded-lg border-2 font-medium transition-colors ${position === pos ? "border-primary-500 bg-primary-50 text-primary-700" : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"}`}>
                    {t(positionKeyMap[pos] as any)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t("pdfPageNum.format")}</label>
              <div className="grid grid-cols-3 gap-2">
                {[{ k: "number" as const, l: "1, 2, 3..." }, { k: "pageOfTotal" as const, l: "Page 1 of 10" }, { k: "dash" as const, l: "- 1 -" }].map(f => (
                  <button key={f.k} onClick={() => setFormat(f.k)}
                    className={`text-xs py-2 px-3 rounded-lg border-2 font-medium transition-colors ${format === f.k ? "border-primary-500 bg-primary-50 text-primary-700" : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"}`}>
                    {f.l}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("pdfPageNum.startNumber")}</label>
                <input type="number" min="1" value={startNumber} onChange={(e) => setStartNumber(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("pdfPageNum.fontSize")}: {fontSize}px</label>
                <input type="range" min="8" max="24" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="w-full mt-3" />
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-2">{t("pdfPageNum.preview")}</p>
              <div className="relative bg-white border border-gray-200 rounded-lg aspect-[3/4] max-w-[120px] mx-auto">
                <div className={`absolute text-gray-500 ${position.startsWith("top") ? "top-2" : "bottom-2"} ${position.endsWith("center") ? "left-1/2 -translate-x-1/2" : position.endsWith("left") ? "left-2" : "right-2"}`} style={{ fontSize: "8px" }}>
                  {getPageText(0, pageCount)}
                </div>
              </div>
            </div>
          </div>
          {processing && (
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2"><span>{t("pdfPageNum.adding")}</span><span>{progress}%</span></div>
              <div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-primary-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} /></div>
            </div>
          )}
          <button onClick={addPageNumbers} disabled={processing} className="btn-primary text-sm disabled:opacity-50">
            {processing ? t("pdf.processing") : t("pdfPageNum.add")}
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
            { q: locale === "tr" ? "Sayfa numaralarının nerede görüneceğini seçebilir miyim?" : "Can I choose where the page numbers appear?", a: locale === "tr" ? "Evet. Sayfa numaralarını altı konuma yerleştirebilirsiniz: sol üst, orta üst, sağ üst, sol alt, orta alt veya sağ alt." : "Yes. You can place page numbers in six positions: top-left, top-center, top-right, bottom-left, bottom-center, or bottom-right." },
            { q: locale === "tr" ? "Hangi sayfa numarası formatları mevcut?" : "What page number formats are available?", a: locale === "tr" ? "Üç format mevcuttur: sayısal (1, 2, 3), toplam sayfalı format (Sayfa 1/10) ve romen rakamları (i, ii, iii)." : "Three formats are available: numeric (1, 2, 3), page-of-total (Page 1 of 10), and roman numerals (i, ii, iii)." },
            { q: locale === "tr" ? "Numaralandırmayı 1'den farklı bir sayıdan başlatabilir miyim?" : "Can I start numbering from a number other than 1?", a: locale === "tr" ? "Evet. 'Başlangıç numarası' alanını kullanarak istediğiniz herhangi bir sayıdan numaralandırmaya başlayabilirsiniz." : "Yes. Use the 'Starting number' field to begin numbering from any number you choose." },
            { q: locale === "tr" ? "PDF'm sunucuya yükleniyor mu?" : "Is my PDF uploaded to a server?", a: locale === "tr" ? "Hayır. Sayfa numaralandırma tamamen tarayıcınızda pdf-lib kullanılarak gerçekleşir. Dosyanız cihazınızdan ayrılmaz." : "No. Page numbering happens entirely in your browser using pdf-lib. Your file never leaves your device." },
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
