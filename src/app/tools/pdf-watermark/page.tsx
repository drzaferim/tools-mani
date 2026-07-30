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
    { q: "Can I add a watermark to every page?", a: "Yes. The watermark is applied to all pages in the PDF automatically." },
    { q: "Can I customize the watermark color and opacity?", a: "Yes. You can choose any color using the color picker and adjust transparency from fully transparent to fully opaque using the opacity slider." },
    { q: "Is my PDF uploaded to a server when adding a watermark?", a: "No. All processing happens locally in your browser. Your file never leaves your device." },
    { q: "Can I remove a watermark that was added with this tool?", a: "Watermarks added by this tool are embedded as text on each page. Removing them requires a separate PDF editing tool." },
  ],
  tr: [
    { q: "Her sayfaya filigran ekleyebilir miyim?", a: "Evet. Filigran otomatik olarak PDF'deki tüm sayfalara eklenir." },
    { q: "Filigran rengini ve opaklığını özelleştirebilir miyim?", a: "Evet. Renk seçiciyi kullanarak istediğiniz rengi seçebilir ve opaklık kaydırıcısıyla şeffaflığı tam şeffaftan tam opak'a kadar ayarlayabilirsiniz." },
    { q: "Filigran eklerken PDF'm sunucuya yükleniyor mu?", a: "Hayır. Tüm işlemler tarayıcınızda yerel olarak gerçekleşir. Dosyanız cihazınızdan ayrılmaz." },
    { q: "Bu araçla eklenen bir filigranı kaldırabilir miyim?", a: "Bu araçla eklenen filigranlar her sayfaya metin olarak gömülür. Bunları kaldırmak ayrı bir PDF düzenleme aracı gerektirir." },
  ],
  es: [
    { q: "¿Puedo añadir una marca de agua a todas las páginas?", a: "Sí. La marca de agua se aplica automáticamente a todas las páginas del PDF." },
    { q: "¿Puedo personalizar el color y la opacidad de la marca de agua?", a: "Sí. Puedes elegir cualquier color con el selector y ajustar la transparencia, de totalmente transparente a totalmente opaca, con el control de opacidad." },
    { q: "¿Se sube mi PDF a un servidor al añadir la marca de agua?", a: "No. Todo el procesamiento ocurre localmente en tu navegador. Tu archivo nunca sale de tu dispositivo." },
    { q: "¿Puedo quitar una marca de agua añadida con esta herramienta?", a: "Las marcas de agua añadidas aquí quedan incrustadas como texto en cada página. Quitarlas requiere una herramienta de edición de PDF aparte." },
  ],
  de: [
    { q: "Kann ich ein Wasserzeichen auf jede Seite setzen?", a: "Ja. Das Wasserzeichen wird automatisch auf alle Seiten des PDFs angewendet." },
    { q: "Kann ich Farbe und Deckkraft des Wasserzeichens anpassen?", a: "Ja. Wählen Sie mit der Farbauswahl eine beliebige Farbe und stellen Sie die Transparenz per Schieberegler von völlig transparent bis vollständig deckend ein." },
    { q: "Wird mein PDF beim Hinzufügen eines Wasserzeichens hochgeladen?", a: "Nein. Die gesamte Verarbeitung erfolgt lokal in Ihrem Browser. Ihre Datei verlässt Ihr Gerät nie." },
    { q: "Kann ich ein mit diesem Tool hinzugefügtes Wasserzeichen entfernen?", a: "Mit diesem Tool hinzugefügte Wasserzeichen werden als Text in jede Seite eingebettet. Zum Entfernen ist ein separates PDF-Bearbeitungsprogramm nötig." },
  ],
  pt: [
    { q: "Posso adicionar marca d'água em todas as páginas?", a: "Sim. A marca d'água é aplicada automaticamente a todas as páginas do PDF." },
    { q: "Posso personalizar a cor e a opacidade da marca d'água?", a: "Sim. Você pode escolher qualquer cor no seletor e ajustar a transparência, de totalmente transparente a totalmente opaca, com o controle de opacidade." },
    { q: "Meu PDF é enviado para um servidor ao adicionar marca d'água?", a: "Não. Todo o processamento acontece localmente no seu navegador. Seu arquivo nunca sai do seu dispositivo." },
    { q: "Posso remover uma marca d'água adicionada por esta ferramenta?", a: "As marcas d'água adicionadas aqui ficam incorporadas como texto em cada página. Removê-las exige uma ferramenta de edição de PDF separada." },
  ],
  fr: [
    { q: "Puis-je ajouter un filigrane sur toutes les pages ?", a: "Oui. Le filigrane est appliqué automatiquement à toutes les pages du PDF." },
    { q: "Puis-je personnaliser la couleur et l'opacité du filigrane ?", a: "Oui. Choisissez n'importe quelle couleur avec le sélecteur et réglez la transparence, de totalement transparent à totalement opaque, avec le curseur d'opacité." },
    { q: "Mon PDF est-il envoyé à un serveur lors de l'ajout du filigrane ?", a: "Non. Tout le traitement se fait localement dans votre navigateur. Votre fichier ne quitte jamais votre appareil." },
    { q: "Puis-je retirer un filigrane ajouté avec cet outil ?", a: "Les filigranes ajoutés ici sont intégrés sous forme de texte sur chaque page. Les retirer nécessite un logiciel d'édition PDF distinct." },
  ],
};

export default function PdfWatermarkPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [text, setText] = useState("CONFIDENTIAL");
  const [fontSize, setFontSize] = useState(48);
  const [opacity, setOpacity] = useState(0.3);
  const [color, setColor] = useState("#999999");
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

  const hexToRgb = (hex: string) => ({ r: parseInt(hex.slice(1, 3), 16) / 255, g: parseInt(hex.slice(3, 5), 16) / 255, b: parseInt(hex.slice(5, 7), 16) / 255 });

  const addWatermark = async () => {
    if (!file || !text.trim()) return;
    setProcessing(true); setError(""); setProgress(20);
    try {
      const { PDFDocument, rgb, StandardFonts, degrees } = await import("pdf-lib");
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
      const font = await pdf.embedFont(StandardFonts.Helvetica);
      const { r, g, b } = hexToRgb(color); setProgress(40);
      const total = pdf.getPageCount();
      for (let i = 0; i < total; i++) {
        const page = pdf.getPage(i); const { width, height } = page.getSize();
        const textWidth = font.widthOfTextAtSize(text, fontSize);
        page.drawText(text, { x: (width - textWidth) / 2, y: height / 2, size: fontSize, font, color: rgb(r, g, b), opacity, rotate: degrees(-45) });
        setProgress(40 + Math.round(((i + 1) / total) * 50));
      }
      const pdfBytes = await pdf.save();
      const blob = new Blob([pdfBytes as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = `watermarked_${file.name}`; a.click();
      URL.revokeObjectURL(url); setProgress(100);
      void trackToolUse("pdf-watermark");
    } catch { setError(t("error.failedWatermark")); } finally { setProcessing(false); }
  };

  const reset = () => { setFile(null); setPageCount(0); setProgress(0); setError(""); };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6"><Link href="/tools/pdf" className="text-primary-600 hover:text-primary-700 text-sm">&larr; {t("pdf.backToPdf")}</Link></div>
      <div className="flex items-start justify-between mb-2">
        <h1 className="text-3xl font-bold text-gray-900">{t("pdfWatermark.title")}</h1>
        <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full border border-green-200">{t("pdf.noFileLimit")}</span>
      </div>
      <p className="text-gray-600 mb-8">{t("pdfWatermark.subtitle")} {t("pdf.allBrowser")}</p>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">{error}</div>}
      {!file ? (
        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-primary-400 transition-colors cursor-pointer"
          onClick={() => inputRef.current?.click()} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) loadFile(f); }}>
          <div className="text-5xl mb-4">&#128167;</div>
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
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("pdfWatermark.text")}</label>
              <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("pdfWatermark.fontSize")}: {fontSize}px</label>
                <input type="range" min="12" max="120" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("pdfWatermark.opacity")}: {Math.round(opacity * 100)}%</label>
                <input type="range" min="0.05" max="1" step="0.05" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("pdfWatermark.color")}</label>
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-full h-10 rounded-lg cursor-pointer" />
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 flex items-center justify-center h-32">
              <span style={{ fontSize: `${Math.min(fontSize, 36)}px`, color, opacity, transform: "rotate(-45deg)" }} className="font-bold select-none">{text || "Preview"}</span>
            </div>
          </div>
          {processing && (
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2"><span>{t("pdfWatermark.adding")}</span><span>{progress}%</span></div>
              <div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-primary-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} /></div>
            </div>
          )}
          <button onClick={addWatermark} disabled={processing || !text.trim()} className="btn-primary text-sm disabled:opacity-50">
            {processing ? t("pdf.processing") : t("pdfWatermark.add")}
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
