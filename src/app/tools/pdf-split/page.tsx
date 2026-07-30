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
    { q: "Is there a limit on how many pages I can split?", a: "No. You can split PDFs with any number of pages. Processing happens entirely in your browser with no server upload." },
    { q: "How do I split a PDF into specific page ranges?", a: "Select 'Custom ranges' mode and type ranges like '1-3, 4-6, 8' separated by commas. Each range becomes a separate PDF file." },
    { q: "Can I extract just one page from a PDF?", a: "Yes. Use 'Extract all pages' mode to get each page as its own file, or use 'Custom ranges' and type a single page number like '5'." },
    { q: "What does 'Split every N pages' do?", a: "It divides the PDF into equal chunks. For example, splitting a 12-page PDF every 4 pages gives you three 4-page PDFs." },
  ],
  tr: [
    { q: "Bölebileceğim sayfa sayısında bir sınır var mı?", a: "Hayır. İstediğiniz sayfa sayısındaki PDF'leri bölebilirsiniz. İşlem tamamen tarayıcınızda gerçekleşir, sunucuya yükleme yapılmaz." },
    { q: "PDF'yi belirli sayfa aralıklarına nasıl bölebilirim?", a: "'Özel aralıklar' modunu seçin ve '1-3, 4-6, 8' gibi virgülle ayrılmış aralıklar yazın. Her aralık ayrı bir PDF dosyası olur." },
    { q: "PDF'den yalnızca bir sayfayı çıkarabilir miyim?", a: "Evet. 'Tüm sayfaları çıkar' modunu kullanarak her sayfayı ayrı dosya olarak alabilir ya da 'Özel aralıklar' ile '5' gibi tek sayfa numarası yazabilirsiniz." },
    { q: "'Her N sayfada böl' ne yapar?", a: "PDF'yi eşit parçalara böler. Örneğin 12 sayfalık bir PDF'yi her 4 sayfada bölmek üç adet 4 sayfalık PDF oluşturur." },
  ],
  es: [
    { q: "¿Hay un límite de páginas que puedo dividir?", a: "No. Puedes dividir PDF con cualquier número de páginas. El procesamiento ocurre por completo en tu navegador, sin subida a ningún servidor." },
    { q: "¿Cómo divido un PDF en rangos de páginas concretos?", a: "Elige el modo «Rangos personalizados» y escribe rangos como «1-3, 4-6, 8» separados por comas. Cada rango se convierte en un archivo PDF independiente." },
    { q: "¿Puedo extraer solo una página de un PDF?", a: "Sí. Usa el modo «Extraer todas las páginas» para obtener cada página como archivo propio, o usa «Rangos personalizados» y escribe un solo número de página, como «5»." },
    { q: "¿Qué hace «Dividir cada N páginas»?", a: "Divide el PDF en bloques iguales. Por ejemplo, dividir un PDF de 12 páginas cada 4 páginas produce tres PDF de 4 páginas." },
  ],
  de: [
    { q: "Gibt es eine Grenze für die Anzahl der Seiten beim Teilen?", a: "Nein. Sie können PDFs mit beliebig vielen Seiten teilen. Die Verarbeitung erfolgt vollständig in Ihrem Browser, ohne Upload auf einen Server." },
    { q: "Wie teile ich ein PDF nach bestimmten Seitenbereichen?", a: "Wählen Sie den Modus „Eigene Bereiche“ und geben Sie Bereiche wie „1-3, 4-6, 8“ durch Kommas getrennt ein. Jeder Bereich wird zu einer eigenen PDF-Datei." },
    { q: "Kann ich nur eine einzelne Seite aus einem PDF extrahieren?", a: "Ja. Nutzen Sie den Modus „Alle Seiten extrahieren“, um jede Seite als eigene Datei zu erhalten, oder geben Sie unter „Eigene Bereiche“ eine einzelne Seitenzahl wie „5“ ein." },
    { q: "Was bewirkt „Alle N Seiten teilen“?", a: "Es teilt das PDF in gleich große Blöcke. Ein 12-seitiges PDF alle 4 Seiten geteilt ergibt zum Beispiel drei PDFs mit je 4 Seiten." },
  ],
  pt: [
    { q: "Existe limite de quantas páginas posso dividir?", a: "Não. Você pode dividir PDFs com qualquer número de páginas. O processamento acontece inteiramente no seu navegador, sem envio para servidor." },
    { q: "Como divido um PDF em intervalos de páginas específicos?", a: "Selecione o modo «Intervalos personalizados» e digite intervalos como «1-3, 4-6, 8» separados por vírgulas. Cada intervalo vira um arquivo PDF separado." },
    { q: "Posso extrair apenas uma página de um PDF?", a: "Sim. Use o modo «Extrair todas as páginas» para obter cada página como arquivo próprio, ou use «Intervalos personalizados» e digite um único número de página, como «5»." },
    { q: "O que faz «Dividir a cada N páginas»?", a: "Divide o PDF em blocos iguais. Por exemplo, dividir um PDF de 12 páginas a cada 4 páginas gera três PDFs de 4 páginas." },
  ],
  fr: [
    { q: "Y a-t-il une limite au nombre de pages que je peux diviser ?", a: "Non. Vous pouvez diviser des PDF comportant n'importe quel nombre de pages. Le traitement se fait entièrement dans votre navigateur, sans envoi vers un serveur." },
    { q: "Comment diviser un PDF selon des plages de pages précises ?", a: "Choisissez le mode « Plages personnalisées » et saisissez des plages comme « 1-3, 4-6, 8 » séparées par des virgules. Chaque plage devient un fichier PDF distinct." },
    { q: "Puis-je extraire une seule page d'un PDF ?", a: "Oui. Utilisez le mode « Extraire toutes les pages » pour obtenir chaque page dans un fichier séparé, ou saisissez un seul numéro de page comme « 5 » dans « Plages personnalisées »." },
    { q: "Que fait « Diviser toutes les N pages » ?", a: "Cela découpe le PDF en blocs égaux. Par exemple, diviser un PDF de 12 pages toutes les 4 pages donne trois PDF de 4 pages." },
  ],
};

export default function PdfSplitPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [splitMode, setSplitMode] = useState<"range" | "extract" | "every">("extract");
  const [rangeInput, setRangeInput] = useState("");
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

  const parseRanges = (input: string): number[][] => {
    return input.split(",").map(part => {
      const trimmed = part.trim();
      if (trimmed.includes("-")) {
        const [start, end] = trimmed.split("-").map(Number);
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
      }
      return [Number(trimmed)];
    });
  };

  const splitPdf = async () => {
    if (!file) return;
    setProcessing(true); setError(""); setProgress(10);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = await file.arrayBuffer();
      const sourcePdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
      const total = sourcePdf.getPageCount();
      setProgress(30);
      let hasOutput = false;
      let groups: number[][] = [];
      if (splitMode === "extract") { groups = Array.from({ length: total }, (_, i) => [i]); }
      else if (splitMode === "range") { groups = parseRanges(rangeInput).map(pages => pages.map(p => p - 1)); }
      else { const n = Math.max(1, parseInt(rangeInput) || 1); for (let i = 0; i < total; i += n) { groups.push(Array.from({ length: Math.min(n, total - i) }, (_, j) => i + j)); } }
      for (let gi = 0; gi < groups.length; gi++) {
        const newPdf = await PDFDocument.create();
        const validPages = groups[gi].filter(p => p >= 0 && p < total);
        if (validPages.length === 0) continue;
        const pages = await newPdf.copyPages(sourcePdf, validPages);
        pages.forEach(page => newPdf.addPage(page));
        const pdfBytes = await newPdf.save();
        const blob = new Blob([pdfBytes as BlobPart], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a"); a.href = url; a.download = `split_${gi + 1}.pdf`; a.click();
        URL.revokeObjectURL(url);
        hasOutput = true;
        setProgress(30 + Math.round(((gi + 1) / groups.length) * 65));
      }
      setProgress(100);
      if (hasOutput) {
        void trackToolUse("pdf-split");
      }
    } catch { setError(t("error.failedSplit")); } finally { setProcessing(false); }
  };

  const reset = () => { setFile(null); setPageCount(0); setProgress(0); setError(""); };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6"><Link href="/tools/pdf" className="text-primary-600 hover:text-primary-700 text-sm">&larr; {t("pdf.backToPdf")}</Link></div>
      <div className="flex items-start justify-between mb-2">
        <h1 className="text-3xl font-bold text-gray-900">{t("pdfSplit.title")}</h1>
        <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full border border-green-200">{t("pdf.noFileLimit")}</span>
      </div>
      <p className="text-gray-600 mb-8">{t("pdfSplit.subtitle")} {t("pdf.allBrowser")}</p>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">{error}</div>}
      {!file ? (
        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-primary-400 transition-colors cursor-pointer"
          onClick={() => inputRef.current?.click()} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) loadFile(f); }}>
          <div className="text-5xl mb-4">&#9986;</div>
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
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">{t("pdfSplit.splitMode")}</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" checked={splitMode === "extract"} onChange={() => setSplitMode("extract")} className="text-primary-600" />
                <div><p className="font-medium text-gray-900">{t("pdfSplit.extractAll")}</p><p className="text-sm text-gray-500">{t("pdfSplit.extractAllDesc")}</p></div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" checked={splitMode === "range"} onChange={() => setSplitMode("range")} className="text-primary-600" />
                <div><p className="font-medium text-gray-900">{t("pdfSplit.customRanges")}</p><p className="text-sm text-gray-500">e.g. 1-3, 4-6, 7-10</p></div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" checked={splitMode === "every"} onChange={() => setSplitMode("every")} className="text-primary-600" />
                <div><p className="font-medium text-gray-900">{t("pdfSplit.everyN")}</p><p className="text-sm text-gray-500">{t("pdfSplit.everyNDesc")}</p></div>
              </label>
            </div>
            {(splitMode === "range" || splitMode === "every") && (
              <input type="text" value={rangeInput} onChange={(e) => setRangeInput(e.target.value)}
                placeholder={splitMode === "range" ? "e.g. 1-3, 4-6, 7" : "e.g. 5"}
                className="mt-4 w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
            )}
          </div>
          {processing && (
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2"><span>{t("pdfSplit.splitting")}</span><span>{progress}%</span></div>
              <div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-primary-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} /></div>
            </div>
          )}
          <button onClick={splitPdf} disabled={processing} className="btn-primary text-sm disabled:opacity-50">
            {processing ? t("pdf.processing") : t("pdfSplit.split")}
          </button>
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
