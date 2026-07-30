"use client";
import { trackToolUse } from "@/lib/track";

import { useState, useRef } from "react";
import Link from "next/link";
import { useLanguage, pick } from "@/lib/language-context";

const faqTitle = {
  en: "Frequently Asked Questions", tr: "Sık Sorulan Sorular", es: "Preguntas frecuentes", de: "Häufig gestellte Fragen", pt: "Perguntas frequentes", fr: "Questions fréquentes",
};

const faq = {
  en: [
    { q: "Can I extract multiple non-consecutive pages?", a: "Yes. Click on any combination of pages to select them, then click 'Extract'. The resulting PDF will contain only the selected pages in their original order." },
    { q: "What is the difference between Extract and Delete?", a: "Extract creates a new PDF with only the selected pages. Delete creates a new PDF with the selected pages removed. The original file is never modified." },
    { q: "Is there a limit on the number of pages I can extract?", a: "No. You can extract any number of pages from PDFs of any size. Everything runs in your browser." },
    { q: "Does page extraction affect PDF quality?", a: "No. Pages are copied with their original content intact — images, text, and formatting are all preserved." },
  ],
  tr: [
    { q: "Birbirini takip etmeyen birden fazla sayfayı çıkarabilir miyim?", a: "Evet. Herhangi bir sayfa kombinasyonuna tıklayarak seçin, ardından 'Çıkar'a tıklayın. Sonuçta oluşan PDF yalnızca seçilen sayfaları orijinal sırasıyla içerir." },
    { q: "Çıkar ve Sil arasındaki fark nedir?", a: "Çıkar, yalnızca seçili sayfaları içeren yeni bir PDF oluşturur. Sil, seçili sayfalar kaldırılmış yeni bir PDF oluşturur. Orijinal dosya hiçbir zaman değiştirilmez." },
    { q: "Çıkarabileceğim sayfa sayısında bir sınır var mı?", a: "Hayır. Herhangi bir boyuttaki PDF'den istediğiniz sayıda sayfayı çıkarabilirsiniz. Her şey tarayıcınızda çalışır." },
    { q: "Sayfa çıkarma PDF kalitesini etkiler mi?", a: "Hayır. Sayfalar orijinal içerikleri bozulmadan kopyalanır — görseller, metin ve biçimlendirme korunur." },
  ],
  es: [
    { q: "¿Puedo extraer varias páginas no consecutivas?", a: "Sí. Haz clic en cualquier combinación de páginas para seleccionarlas y luego pulsa «Extraer». El PDF resultante contendrá solo las páginas seleccionadas, en su orden original." },
    { q: "¿Cuál es la diferencia entre Extraer y Eliminar?", a: "Extraer crea un PDF nuevo solo con las páginas seleccionadas. Eliminar crea un PDF nuevo sin esas páginas. El archivo original nunca se modifica." },
    { q: "¿Hay un límite de páginas que puedo extraer?", a: "No. Puedes extraer cualquier número de páginas de PDF de cualquier tamaño. Todo se ejecuta en tu navegador." },
    { q: "¿La extracción de páginas afecta a la calidad del PDF?", a: "No. Las páginas se copian con su contenido original intacto: imágenes, texto y formato se conservan." },
  ],
  de: [
    { q: "Kann ich mehrere nicht aufeinanderfolgende Seiten extrahieren?", a: "Ja. Klicken Sie auf eine beliebige Kombination von Seiten, um sie auszuwählen, und dann auf „Extrahieren“. Das Ergebnis-PDF enthält nur die gewählten Seiten in ihrer ursprünglichen Reihenfolge." },
    { q: "Was ist der Unterschied zwischen Extrahieren und Löschen?", a: "Extrahieren erzeugt ein neues PDF nur mit den ausgewählten Seiten. Löschen erzeugt ein neues PDF ohne diese Seiten. Die Originaldatei wird nie verändert." },
    { q: "Gibt es eine Grenze für die Anzahl extrahierbarer Seiten?", a: "Nein. Sie können beliebig viele Seiten aus PDFs jeder Größe extrahieren. Alles läuft in Ihrem Browser." },
    { q: "Beeinträchtigt das Extrahieren die PDF-Qualität?", a: "Nein. Die Seiten werden mit ihrem Originalinhalt kopiert – Bilder, Text und Formatierung bleiben erhalten." },
  ],
  pt: [
    { q: "Posso extrair várias páginas não consecutivas?", a: "Sim. Clique em qualquer combinação de páginas para selecioná-las e depois em «Extrair». O PDF resultante conterá apenas as páginas selecionadas, na ordem original." },
    { q: "Qual é a diferença entre Extrair e Excluir?", a: "Extrair cria um novo PDF apenas com as páginas selecionadas. Excluir cria um novo PDF sem essas páginas. O arquivo original nunca é modificado." },
    { q: "Existe limite de páginas que posso extrair?", a: "Não. Você pode extrair qualquer número de páginas de PDFs de qualquer tamanho. Tudo roda no seu navegador." },
    { q: "A extração de páginas afeta a qualidade do PDF?", a: "Não. As páginas são copiadas com o conteúdo original intacto — imagens, texto e formatação são preservados." },
  ],
  fr: [
    { q: "Puis-je extraire plusieurs pages non consécutives ?", a: "Oui. Cliquez sur n'importe quelle combinaison de pages pour les sélectionner, puis sur « Extraire ». Le PDF obtenu ne contiendra que les pages choisies, dans leur ordre d'origine." },
    { q: "Quelle est la différence entre Extraire et Supprimer ?", a: "Extraire crée un nouveau PDF contenant uniquement les pages sélectionnées. Supprimer crée un nouveau PDF sans ces pages. Le fichier d'origine n'est jamais modifié." },
    { q: "Y a-t-il une limite au nombre de pages extractibles ?", a: "Non. Vous pouvez extraire autant de pages que vous voulez, depuis des PDF de n'importe quelle taille. Tout s'exécute dans votre navigateur." },
    { q: "L'extraction de pages altère-t-elle la qualité du PDF ?", a: "Non. Les pages sont copiées avec leur contenu d'origine intact : images, texte et mise en forme sont préservés." },
  ],
};

export default function PdfPagesPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
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
      const count = pdf.getPageCount(); setPageCount(count);
      setSelectedPages(new Set(Array.from({ length: count }, (_, i) => i)));
    } catch { setError(t("error.cantRead")); setFile(null); }
  };

  const togglePage = (i: number) => setSelectedPages(prev => { const n = new Set(prev); if (n.has(i)) n.delete(i); else n.add(i); return n; });
  const selectAll = () => setSelectedPages(new Set(Array.from({ length: pageCount }, (_, i) => i)));
  const selectNone = () => setSelectedPages(new Set());
  const selectOdd = () => setSelectedPages(new Set(Array.from({ length: pageCount }, (_, i) => i).filter(i => i % 2 === 0)));
  const selectEven = () => setSelectedPages(new Set(Array.from({ length: pageCount }, (_, i) => i).filter(i => i % 2 === 1)));

  const processPdf = async (mode: "extract" | "delete") => {
    if (!file || selectedPages.size === 0) return;
    if (mode === "delete" && selectedPages.size === pageCount) { setError(t("error.cantDeleteAll")); return; }
    setProcessing(true); setError(""); setProgress(20);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = await file.arrayBuffer();
      const sourcePdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
      const newPdf = await PDFDocument.create(); setProgress(50);
      const indices = mode === "extract"
        ? Array.from(selectedPages).sort((a, b) => a - b)
        : Array.from({ length: pageCount }, (_, i) => i).filter(i => !selectedPages.has(i));
      const pages = await newPdf.copyPages(sourcePdf, indices);
      pages.forEach(page => newPdf.addPage(page)); setProgress(80);
      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = `${mode === "extract" ? "extracted" : "modified"}_${file.name}`; a.click();
      URL.revokeObjectURL(url); setProgress(100);
      void trackToolUse("pdf-pages");
    } catch { setError(mode === "extract" ? t("error.failedExtract") : t("error.failedProcess")); } finally { setProcessing(false); }
  };

  const reset = () => { setFile(null); setPageCount(0); setSelectedPages(new Set()); setProgress(0); setError(""); };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6"><Link href="/tools/pdf" className="text-primary-600 hover:text-primary-700 text-sm">&larr; {t("pdf.backToPdf")}</Link></div>
      <div className="flex items-start justify-between mb-2">
        <h1 className="text-3xl font-bold text-gray-900">{t("pdfPages.title")}</h1>
        <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full border border-green-200">{t("pdf.noFileLimit")}</span>
      </div>
      <p className="text-gray-600 mb-8">{t("pdfPages.subtitle")} {t("pdf.allBrowser")}</p>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">{error}</div>}
      {!file ? (
        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-primary-400 transition-colors cursor-pointer"
          onClick={() => inputRef.current?.click()} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) loadFile(f); }}>
          <div className="text-5xl mb-4">&#128209;</div>
          <p className="text-gray-700 font-semibold text-lg">{t("pdf.clickOrDrag")}</p>
          <p className="text-gray-400 text-sm mt-2">{t("pdf.noLimitWorks")}</p>
          <input ref={inputRef} type="file" accept=".pdf" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) loadFile(f); }} />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4 mb-4">
            <div><p className="font-medium text-gray-900">{file.name}</p><p className="text-sm text-gray-500">{pageCount} {t("pdf.pages")} — {selectedPages.size} {t("pdf.selected")}</p></div>
            <button onClick={reset} className="text-red-400 hover:text-red-600 text-sm">{t("pdf.remove")}</button>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <button onClick={selectAll} className="btn-secondary text-xs">{t("pdfPages.selectAll")}</button>
            <button onClick={selectNone} className="btn-secondary text-xs">{t("pdfPages.selectNone")}</button>
            <button onClick={selectOdd} className="btn-secondary text-xs">{t("pdfPages.oddPages")}</button>
            <button onClick={selectEven} className="btn-secondary text-xs">{t("pdfPages.evenPages")}</button>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 mb-6">
            {Array.from({ length: pageCount }, (_, i) => (
              <button key={i} onClick={() => togglePage(i)}
                className={`aspect-[3/4] rounded-lg border-2 flex items-center justify-center text-sm font-medium transition-colors ${selectedPages.has(i) ? "border-primary-500 bg-primary-50 text-primary-700" : "border-gray-200 bg-white text-gray-400 hover:border-gray-300"}`}>
                {i + 1}
              </button>
            ))}
          </div>
          {processing && (
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2"><span>{t("pdfPages.processingPages")}</span><span>{progress}%</span></div>
              <div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-primary-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} /></div>
            </div>
          )}
          <div className="flex gap-3">
            <button onClick={() => processPdf("extract")} disabled={processing || selectedPages.size === 0} className="btn-primary text-sm disabled:opacity-50">
              {processing ? t("pdf.processing") : `${t("pdfPages.extract")} ${selectedPages.size} ${t("pdfPages.extractPages")}`}
            </button>
            <button onClick={() => processPdf("delete")} disabled={processing || selectedPages.size === 0 || selectedPages.size === pageCount}
              className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50">
              {t("pdfPages.deleteSelected")}
            </button>
          </div>
        </>
      )}


      {/* FAQ */}
      <div className="mt-16 border-t border-gray-100 pt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {pick(faqTitle, locale)}
        </h2>
        <div className="space-y-5">
          {pick(faq, locale).map(({ q, a }, i) => (
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
