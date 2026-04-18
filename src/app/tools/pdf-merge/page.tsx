"use client";
import { trackToolUse } from "@/lib/track";

import { useState, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export default function PdfMergePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [merging, setMerging] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t, locale } = useLanguage();

  const addFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    const pdfs = Array.from(newFiles).filter(f => f.type === "application/pdf");
    if (pdfs.length === 0) { setError(t("error.pdfOnly")); return; }
    setFiles(prev => [...prev, ...pdfs]);
    setError("");
  };

  const removeFile = (index: number) => setFiles(prev => prev.filter((_, i) => i !== index));

  const moveFile = (from: number, to: number) => {
    if (to < 0 || to >= files.length) return;
    const updated = [...files];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setFiles(updated);
  };

  const mergePdfs = async () => {
    if (files.length < 2) { setError(t("pdfMerge.errorMin")); return; }
    setMerging(true); setError(""); setProgress(10);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const mergedPdf = await PDFDocument.create();
      setProgress(20);
      for (let i = 0; i < files.length; i++) {
        const bytes = await files[i].arrayBuffer();
        const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach(page => mergedPdf.addPage(page));
        setProgress(20 + Math.round(((i + 1) / files.length) * 70));
      }
      const mergedBytes = await mergedPdf.save();
      setProgress(95);
      const blob = new Blob([mergedBytes as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = "merged.pdf"; a.click();
      URL.revokeObjectURL(url); setProgress(100);
      void trackToolUse("pdf-merge");
    } catch { setError(t("pdfMerge.error")); } finally { setMerging(false); }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  const totalSize = files.reduce((sum, f) => sum + f.size, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href="/tools/pdf" className="text-primary-600 hover:text-primary-700 text-sm">&larr; {t("pdf.backToPdf")}</Link>
      </div>
      <div className="flex items-start justify-between mb-2">
        <h1 className="text-3xl font-bold text-gray-900">{t("pdfMerge.title")}</h1>
        <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full border border-green-200">{t("pdf.noFileLimit")}</span>
      </div>
      <p className="text-gray-600 mb-8">{t("pdfMerge.subtitle")} {t("pdf.allBrowser")}</p>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">{error}</div>}

      <div
        className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-primary-400 transition-colors cursor-pointer mb-6"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
      >
        <div className="text-5xl mb-4">&#128196;</div>
        <p className="text-gray-700 font-semibold text-lg">{t("pdf.clickOrDragMultiple")}</p>
        <p className="text-gray-400 text-sm mt-2">{t("pdf.noLimitMultiple")}</p>
        <input ref={inputRef} type="file" accept=".pdf" multiple className="hidden" onChange={(e) => addFiles(e.target.files)} />
      </div>

      {files.length > 0 && (
        <>
          <p className="text-sm text-gray-500 mb-3">{files.length} {t("pdf.filesTotal")} — {formatSize(totalSize)} {t("pdf.total")}</p>
          <div className="space-y-2 mb-6">
            {files.map((file, i) => (
              <div key={i} className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-3">
                <span className="text-gray-400 text-sm w-6 text-center">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                  <p className="text-xs text-gray-400">{formatSize(file.size)}</p>
                </div>
                <button onClick={() => moveFile(i, i - 1)} disabled={i === 0} className="text-gray-400 hover:text-gray-600 disabled:opacity-30 text-sm">&#9650;</button>
                <button onClick={() => moveFile(i, i + 1)} disabled={i === files.length - 1} className="text-gray-400 hover:text-gray-600 disabled:opacity-30 text-sm">&#9660;</button>
                <button onClick={() => removeFile(i)} className="text-red-400 hover:text-red-600 text-sm">&#10005;</button>
              </div>
            ))}
          </div>

          {merging && (
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>{t("pdfMerge.merging")}...</span><span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-primary-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={mergePdfs} disabled={merging || files.length < 2} className="btn-primary text-sm disabled:opacity-50">
              {merging ? `${t("pdfMerge.merging")}...` : `${t("pdfMerge.merge")} ${files.length} ${t("pdfMerge.pdfs")}`}
            </button>
            <button onClick={() => setFiles([])} className="btn-secondary text-sm">{t("pdf.clearAll")}</button>
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
            { q: locale === "tr" ? "PDF birleştirmede dosya boyutu sınırı var mı?" : "Is there a file size limit for merging PDFs?", a: locale === "tr" ? "Hayır. ToolsMani tüm işlemleri tarayıcınızda gerçekleştirir, herhangi bir sunucu taraflı boyut sınırı yoktur. Cihazınızın belleği yettiği sürece istediğiniz boyuttaki PDF'leri birleştirebilirsiniz." : "No. ToolsMani processes everything in your browser, so there is no server-side file size limit. You can merge PDFs of any size as long as your device has enough memory." },
            { q: locale === "tr" ? "PDF dosyalarım bir sunucuya yükleniyor mu?" : "Are my PDF files uploaded to a server?", a: locale === "tr" ? "Kesinlikle hayır. Dosyalarınız %100 cihazınızda kalır. Tüm birleştirme işlemi tarayıcınızda çalışan pdf-lib kütüphanesi kullanılarak yerel olarak gerçekleşir." : "Never. Your files stay 100% on your device. All merging happens locally using the pdf-lib library running in your browser. Nothing is sent over the internet." },
            { q: locale === "tr" ? "Aynı anda kaç PDF dosyasını birleştirebilirim?" : "How many PDF files can I merge at once?", a: locale === "tr" ? "Dosya sayısı konusunda sabit bir sınır yoktur. İhtiyacınız olan kadar PDF ekleyebilirsiniz. Çok büyük grupların işlenmesi cihazınıza bağlı olarak daha uzun sürebilir." : "There is no hard limit. You can add as many PDFs as you need. Very large batches may take longer depending on your device." },
            { q: locale === "tr" ? "Birleştirmeden önce PDF dosyalarını yeniden sıralayabilir miyim?" : "Can I reorder the PDF files before merging?", a: locale === "tr" ? "Evet. Her dosyanın yanındaki ok düğmelerini kullanarak yukarı veya aşağı taşıyabilirsiniz. Nihai PDF gösterilen sırayı takip eder." : "Yes. Use the arrow buttons next to each file to move it up or down. The final merged PDF will follow the order shown." },
            { q: locale === "tr" ? "PDF birleştirme mobil cihazlarda çalışır mı?" : "Does PDF merging work on mobile?", a: locale === "tr" ? "Evet. Araç, iOS ve Android dahil tüm modern tarayıcılarda çalışır. Büyük dosyalar eski cihazlarda daha yavaş olabilir." : "Yes. The tool works on any modern browser including mobile browsers on iOS and Android. Large files may be slower on older devices." },
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
