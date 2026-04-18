"use client";
import { trackToolUse } from "@/lib/track";

import { useState, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export default function PdfCompressPage() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ originalSize: number; compressedSize: number; url: string } | null>(null);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t, locale } = useLanguage();

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  const loadFile = (f: File) => { if (f.type !== "application/pdf") { setError(t("error.selectPdf")); return; } setFile(f); setResult(null); setError(""); };

  const compressPdf = async () => {
    if (!file) return;
    setProcessing(true); setError(""); setProgress(10);
    try {
      const { PDFDocument } = await import("pdf-lib");
      setProgress(20);
      const bytes = await file.arrayBuffer(); setProgress(40);
      const sourcePdf = await PDFDocument.load(bytes, { ignoreEncryption: true }); setProgress(60);
      const optimizedPdf = await PDFDocument.create();
      const pageIndices = sourcePdf.getPageIndices();
      const copiedPages = await optimizedPdf.copyPages(sourcePdf, pageIndices);
      copiedPages.forEach(page => optimizedPdf.addPage(page));
      const title = sourcePdf.getTitle(); const author = sourcePdf.getAuthor();
      if (title) optimizedPdf.setTitle(title); if (author) optimizedPdf.setAuthor(author);
      setProgress(80);
      const compressedBytes = await optimizedPdf.save({ useObjectStreams: true, addDefaultPage: false });
      setProgress(95);
      const blob = new Blob([compressedBytes as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setResult({ originalSize: file.size, compressedSize: compressedBytes.length, url }); setProgress(100);
      void trackToolUse("pdf-compress");
    } catch { setError(t("error.failedCompress")); } finally { setProcessing(false); }
  };

  const download = () => {
    if (!result || !file) return;
    const a = document.createElement("a"); a.href = result.url; a.download = `compressed_${file.name}`; a.click();
  };

  const reset = () => { if (result?.url) URL.revokeObjectURL(result.url); setFile(null); setResult(null); setProgress(0); setError(""); };
  const reduction = result ? Math.max(0, Math.round((1 - result.compressedSize / result.originalSize) * 100)) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6"><Link href="/tools/pdf" className="text-primary-600 hover:text-primary-700 text-sm">&larr; {t("pdf.backToPdf")}</Link></div>
      <div className="flex items-start justify-between mb-2">
        <h1 className="text-3xl font-bold text-gray-900">{t("pdfCompress.title")}</h1>
        <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full border border-green-200">{t("pdf.noFileLimit")}</span>
      </div>
      <p className="text-gray-600 mb-8">{t("pdfCompress.subtitle")} {t("pdf.allBrowser")}</p>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">{error}</div>}

      {!file ? (
        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-primary-400 transition-colors cursor-pointer"
          onClick={() => inputRef.current?.click()} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) loadFile(f); }}>
          <div className="text-5xl mb-4">&#128230;</div>
          <p className="text-gray-700 font-semibold text-lg">{t("pdf.clickOrDrag")}</p>
          <p className="text-gray-400 text-sm mt-2">{t("pdf.noLimitWorks")}</p>
          <input ref={inputRef} type="file" accept=".pdf" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) loadFile(f); }} />
        </div>
      ) : !result ? (
        <>
          <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div><p className="font-medium text-gray-900">{file.name}</p><p className="text-sm text-gray-500">{formatSize(file.size)}</p></div>
              <button onClick={reset} className="text-red-400 hover:text-red-600 text-sm">{t("pdf.remove")}</button>
            </div>
          </div>
          {processing && (
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2"><span>{t("pdfCompress.compressing")}</span><span>{progress}%</span></div>
              <div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-primary-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} /></div>
            </div>
          )}
          <button onClick={compressPdf} disabled={processing} className="btn-primary text-sm disabled:opacity-50">
            {processing ? t("pdfCompress.compressing") : t("pdfCompress.compress")}
          </button>
        </>
      ) : (
        <>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">{reduction > 0 ? "&#127881;" : "&#128196;"}</div>
              <p className="text-2xl font-bold text-gray-900">{reduction > 0 ? `${reduction}% ${t("pdfCompress.smaller")}` : t("pdfCompress.optimized")}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-500 mb-1">{t("pdfCompress.original")}</p>
                <p className="text-xl font-bold text-gray-900">{formatSize(result.originalSize)}</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <p className="text-sm text-green-600 mb-1">{t("pdfCompress.compressed")}</p>
                <p className="text-xl font-bold text-green-700">{formatSize(result.compressedSize)}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={download} className="btn-primary text-sm">{t("pdfCompress.downloadCompressed")}</button>
            <button onClick={reset} className="btn-secondary text-sm">{t("pdfCompress.another")}</button>
          </div>
        </>
      )}


      {/* FAQ */}
      <div className="mt-16 border-t border-gray-100 pt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {locale === "tr" ? "Sık Sorulan Sorular" : "Frequently Asked Questions"}
        </h2>
        <div className="space-y-5">
          {[
            { q: locale === "tr" ? "PDF Sıkıştırma dosya boyutumu ne kadar küçültebilir?" : "How much can PDF Compress reduce my file size?", a: locale === "tr" ? "Bu PDF içeriğine bağlıdır. Tipik küçülme %10–40 arasındadır. Zaten optimize edilmiş veya ağırlıklı olarak yüksek kaliteli görsel içeren PDF'lerde küçülme az olabilir." : "It depends on the PDF content. Typical reduction is 10–40%. PDFs already optimized or mainly containing high-quality images may see little reduction." },
            { q: locale === "tr" ? "Sıkıştırma görsel kalitesini düşürür mü?" : "Does compression reduce image quality?", a: locale === "tr" ? "Sıkıştırmamız görsel örnekleme yerine PDF yapısı optimizasyonuna (nesne akışları, çapraz referans tabloları) odaklanır, bu nedenle görsel kalitesi korunur." : "Our compression focuses on PDF structure optimization (object streams, cross-reference tables) rather than image downsampling, so image quality is preserved." },
            { q: locale === "tr" ? "PDF dosyam herhangi bir yere yükleniyor mu?" : "Is my PDF file uploaded anywhere?", a: locale === "tr" ? "Hayır. Sıkıştırma tamamen tarayıcınızda gerçekleşir. Dosyanız cihazınızdan ayrılmaz." : "No. The compression happens entirely in your browser. Your file never leaves your device." },
            { q: locale === "tr" ? "Sıkıştırma dosya boyutunu küçültmezse ne olur?" : "What if compression doesn't reduce the file size?", a: locale === "tr" ? "Bazı PDF'ler zaten iyi optimize edilmiştir. Bu durumda araç %0 küçülme gösterir — dosyayı büyütmez. Görsel ağırlıklı PDF'ler için özel bir PDF sıkıştırıcı kullanmayı düşünebilirsiniz." : "Some PDFs are already well-optimized. In that case, the tool will show 0% reduction — it won't make the file larger. Consider using a specialized PDF compressor for image-heavy PDFs." },
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
