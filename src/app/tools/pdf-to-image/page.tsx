"use client";
import { trackToolUse } from "@/lib/track";

import { useState, useRef } from "react";
import Link from "next/link";
import { useLanguage, pick } from "@/lib/language-context";
import type { Locale } from "@/lib/translations";

type OutputFormat = "jpg" | "png";

interface PagePreview {
  pageNum: number;
  dataUrl: string;
  width: number;
  height: number;
}

const translations = {
  title: {
    en: "PDF to Image", tr: "PDF'den Görsel", es: "PDF a imagen",
    de: "PDF zu Bild", pt: "PDF para imagem", fr: "PDF en image",
  },
  subtitle: {
    en: "Convert each PDF page to a high-quality JPG or PNG image. All processing happens in your browser.",
    tr: "Her PDF sayfasını yüksek kaliteli JPG veya PNG görselinize dönüştürün. Tüm işlemler tarayıcınızda gerçekleşir.",
    es: "Convierte cada página del PDF en una imagen JPG o PNG de alta calidad. Todo el procesamiento ocurre en tu navegador.",
    de: "Wandeln Sie jede PDF-Seite in ein hochwertiges JPG- oder PNG-Bild um. Die gesamte Verarbeitung erfolgt in Ihrem Browser.",
    pt: "Converta cada página do PDF em uma imagem JPG ou PNG de alta qualidade. Todo o processamento acontece no seu navegador.",
    fr: "Convertissez chaque page du PDF en image JPG ou PNG de haute qualité. Tout le traitement se fait dans votre navigateur.",
  },
  clickOrDrag: {
    en: "Click or drag a PDF file here", tr: "PDF dosyasını buraya tıklayın veya sürükleyin",
    es: "Haz clic o arrastra un archivo PDF aquí", de: "PDF-Datei hierher klicken oder ziehen",
    pt: "Clique ou arraste um arquivo PDF aqui", fr: "Cliquez ou glissez un fichier PDF ici",
  },
  noLimit: {
    en: "No file size limit", tr: "Dosya boyutu sınırı yok", es: "Sin límite de tamaño",
    de: "Keine Größenbeschränkung", pt: "Sem limite de tamanho", fr: "Aucune limite de taille",
  },
  format: {
    en: "Output Format", tr: "Çıktı Formatı", es: "Formato de salida",
    de: "Ausgabeformat", pt: "Formato de saída", fr: "Format de sortie",
  },
  scale: {
    en: "Quality / Resolution", tr: "Kalite / Çözünürlük", es: "Calidad / Resolución",
    de: "Qualität / Auflösung", pt: "Qualidade / Resolução", fr: "Qualité / Résolution",
  },
  scaleLow: {
    en: "Low (faster)", tr: "Düşük (hızlı)", es: "Baja (más rápida)",
    de: "Niedrig (schneller)", pt: "Baixa (mais rápida)", fr: "Basse (plus rapide)",
  },
  scaleMed: {
    en: "Medium", tr: "Orta", es: "Media", de: "Mittel", pt: "Média", fr: "Moyenne",
  },
  scaleHigh: {
    en: "High (best quality)", tr: "Yüksek (en iyi kalite)", es: "Alta (mejor calidad)",
    de: "Hoch (beste Qualität)", pt: "Alta (melhor qualidade)", fr: "Élevée (meilleure qualité)",
  },
  convert: {
    en: "Convert to Images", tr: "Görsele Dönüştür", es: "Convertir a imágenes",
    de: "In Bilder umwandeln", pt: "Converter em imagens", fr: "Convertir en images",
  },
  converting: {
    en: "Converting...", tr: "Dönüştürülüyor...", es: "Convirtiendo...",
    de: "Konvertierung läuft...", pt: "Convertendo...", fr: "Conversion...",
  },
  downloadAll: {
    en: "Download All as ZIP", tr: "Tümünü ZIP İndir", es: "Descargar todo en ZIP",
    de: "Alle als ZIP herunterladen", pt: "Baixar tudo em ZIP", fr: "Tout télécharger en ZIP",
  },
  downloadPage: {
    en: "Download", tr: "İndir", es: "Descargar", de: "Herunterladen", pt: "Baixar", fr: "Télécharger",
  },
  page: {
    en: "Page", tr: "Sayfa", es: "Página", de: "Seite", pt: "Página", fr: "Page",
  },
  pages: {
    en: "pages", tr: "sayfa", es: "páginas", de: "Seiten", pt: "páginas", fr: "pages",
  },
  errorPdfOnly: {
    en: "Please select a PDF file.", tr: "Lütfen bir PDF dosyası seçin.",
    es: "Selecciona un archivo PDF.", de: "Bitte wählen Sie eine PDF-Datei.",
    pt: "Selecione um arquivo PDF.", fr: "Veuillez sélectionner un fichier PDF.",
  },
  errorLoad: {
    en: "Could not load PDF. File may be corrupted.", tr: "PDF yüklenemedi. Dosya bozuk olabilir.",
    es: "No se pudo cargar el PDF. El archivo puede estar dañado.",
    de: "PDF konnte nicht geladen werden. Die Datei ist möglicherweise beschädigt.",
    pt: "Não foi possível carregar o PDF. O arquivo pode estar corrompido.",
    fr: "Impossible de charger le PDF. Le fichier est peut-être corrompu.",
  },
  processing: {
    en: "Processing page", tr: "Sayfa işleniyor", es: "Procesando página",
    de: "Seite wird verarbeitet", pt: "Processando página", fr: "Traitement de la page",
  },
  of: {
    en: "of", tr: "/", es: "de", de: "von", pt: "de", fr: "sur",
  },
  backToPdf: {
    en: "← PDF Tools", tr: "← PDF Araçları", es: "← Herramientas PDF",
    de: "← PDF-Tools", pt: "← Ferramentas PDF", fr: "← Outils PDF",
  },
  preview: {
    en: "Preview", tr: "Önizleme", es: "Vista previa",
    de: "Vorschau", pt: "Pré-visualização", fr: "Aperçu",
  },
  ready: {
    en: "Ready to download", tr: "İndirmeye hazır", es: "Listo para descargar",
    de: "Bereit zum Herunterladen", pt: "Pronto para baixar", fr: "Prêt à télécharger",
  },
};

/** Eksik dil İngilizceye düşer — önceden locale "en"|"tr" cast ediliyordu ve
 *  es/de/pt/fr'de undefined dönüp sayfayı boş bırakıyordu. */
function t(key: keyof typeof translations, locale: Locale): string {
  return translations[key][locale] ?? translations[key].en;
}

const ui = {
  en: { remove: "Remove", newPdf: "New PDF" },
  tr: { remove: "Kaldır", newPdf: "Yeni PDF" },
  es: { remove: "Quitar", newPdf: "Nuevo PDF" },
  de: { remove: "Entfernen", newPdf: "Neues PDF" },
  pt: { remove: "Remover", newPdf: "Novo PDF" },
  fr: { remove: "Retirer", newPdf: "Nouveau PDF" },
};

const faqTitle = {
  en: "Frequently Asked Questions", tr: "Sık Sorulan Sorular", es: "Preguntas frecuentes", de: "Häufig gestellte Fragen", pt: "Perguntas frequentes", fr: "Questions fréquentes",
};

const faq = {
  en: [
    { q: "Is my PDF uploaded to a server when converting?", a: "No. The entire conversion happens locally in your browser using PDF.js. Your file never leaves your device." },
    { q: "Should I choose JPG or PNG?", a: "JPG produces smaller files and is ideal for photos. PNG is lossless and better for text-heavy pages or when you need transparency." },
    { q: "Can I convert multi-page PDFs?", a: "Yes. Each page is converted to a separate image. Use the 'Download All as ZIP' button to get all pages at once." },
    { q: "What does the quality setting do?", a: "Higher quality renders at 3x scale for sharper images but uses more memory and takes longer. Medium is recommended for most PDFs." },
  ],
  tr: [
    { q: "PDF sayfalarını görsele dönüştürürken dosyam yükleniyor mu?", a: "Hayır. Tüm dönüştürme işlemi tamamen tarayıcınızda gerçekleşir. Dosyanız hiçbir sunucuya gönderilmez." },
    { q: "JPG mi PNG mi seçmeliyim?", a: "Fotoğraflar ve genel kullanım için JPG daha küçük dosya boyutu sunar. Şeffaflık gerektiren veya metin ağırlıklı sayfalar için PNG daha kalitelidir." },
    { q: "Çok sayfalı PDF'leri dönüştürebilir miyim?", a: "Evet, her sayfa ayrı bir görsel olarak dönüştürülür. İndirme düğmesi tüm sayfaları ZIP dosyası olarak indirir." },
    { q: "Kalite ayarı ne işe yarar?", a: "Yüksek kalite seçeneği daha yüksek çözünürlükte render eder (3x ölçek) ancak daha fazla bellek kullanır ve daha uzun sürer. Büyük PDF'ler için Orta seçeneği önerilir." },
  ],
  es: [
    { q: "¿Se sube mi PDF a un servidor al convertirlo?", a: "No. Toda la conversión ocurre localmente en tu navegador mediante PDF.js. Tu archivo nunca sale de tu dispositivo." },
    { q: "¿Debo elegir JPG o PNG?", a: "JPG genera archivos más pequeños y es ideal para fotos. PNG es sin pérdidas y va mejor con páginas con mucho texto o cuando necesitas transparencia." },
    { q: "¿Puedo convertir PDF de varias páginas?", a: "Sí. Cada página se convierte en una imagen independiente. Usa el botón «Descargar todo en ZIP» para obtener todas las páginas de una vez." },
    { q: "¿Qué hace el ajuste de calidad?", a: "La calidad alta renderiza a escala 3x para imágenes más nítidas, pero usa más memoria y tarda más. Para la mayoría de los PDF se recomienda Media." },
  ],
  de: [
    { q: "Wird mein PDF beim Konvertieren hochgeladen?", a: "Nein. Die gesamte Konvertierung erfolgt lokal in Ihrem Browser mit PDF.js. Ihre Datei verlässt Ihr Gerät nie." },
    { q: "Soll ich JPG oder PNG wählen?", a: "JPG erzeugt kleinere Dateien und eignet sich ideal für Fotos. PNG ist verlustfrei und besser für textlastige Seiten oder wenn Sie Transparenz brauchen." },
    { q: "Kann ich mehrseitige PDFs konvertieren?", a: "Ja. Jede Seite wird in ein eigenes Bild umgewandelt. Mit „Alle als ZIP herunterladen“ erhalten Sie alle Seiten auf einmal." },
    { q: "Was bewirkt die Qualitätseinstellung?", a: "Hohe Qualität rendert mit 3-facher Skalierung für schärfere Bilder, benötigt aber mehr Speicher und dauert länger. Für die meisten PDFs wird Mittel empfohlen." },
  ],
  pt: [
    { q: "Meu PDF é enviado para um servidor ao converter?", a: "Não. Toda a conversão acontece localmente no seu navegador usando PDF.js. Seu arquivo nunca sai do seu dispositivo." },
    { q: "Devo escolher JPG ou PNG?", a: "JPG gera arquivos menores e é ideal para fotos. PNG é sem perdas e melhor para páginas com muito texto ou quando você precisa de transparência." },
    { q: "Posso converter PDFs de várias páginas?", a: "Sim. Cada página é convertida em uma imagem separada. Use o botão «Baixar tudo em ZIP» para obter todas as páginas de uma vez." },
    { q: "O que faz a configuração de qualidade?", a: "A qualidade alta renderiza em escala 3x para imagens mais nítidas, mas usa mais memória e demora mais. Para a maioria dos PDFs, recomenda-se Média." },
  ],
  fr: [
    { q: "Mon PDF est-il envoyé à un serveur lors de la conversion ?", a: "Non. Toute la conversion se fait localement dans votre navigateur via PDF.js. Votre fichier ne quitte jamais votre appareil." },
    { q: "Dois-je choisir JPG ou PNG ?", a: "Le JPG produit des fichiers plus légers, idéal pour les photos. Le PNG est sans perte et convient mieux aux pages riches en texte ou quand vous avez besoin de transparence." },
    { q: "Puis-je convertir des PDF de plusieurs pages ?", a: "Oui. Chaque page est convertie en une image distincte. Utilisez le bouton « Tout télécharger en ZIP » pour récupérer toutes les pages d'un coup." },
    { q: "À quoi sert le réglage de qualité ?", a: "La qualité élevée effectue le rendu à l'échelle 3x pour des images plus nettes, mais consomme plus de mémoire et prend plus de temps. Moyenne est recommandé pour la plupart des PDF." },
  ],
};

export default function PdfToImagePage() {
  const { locale } = useLanguage();
  const l = locale;

  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<OutputFormat>("jpg");
  const [scale, setScale] = useState<number>(2);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");
  const [error, setError] = useState("");
  const [pages, setPages] = useState<PagePreview[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File | null) => {
    if (!f) return;
    if (f.type !== "application/pdf") { setError(t("errorPdfOnly", l)); return; }
    setFile(f);
    setPages([]);
    setError("");
    setProgress(0);
  };

  const convertPdf = async () => {
    if (!file) return;
    setConverting(true);
    setError("");
    setPages([]);
    setProgress(5);

    try {
      const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;

      const results: PagePreview[] = [];

      for (let i = 1; i <= numPages; i++) {
        setProgressText(`${t("processing", l)} ${i} ${t("of", l)} ${numPages}...`);
        setProgress(5 + Math.round(((i - 1) / numPages) * 90));

        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d")!;

        // White background for JPG
        if (format === "jpg") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        await page.render({ canvasContext: ctx as unknown as CanvasRenderingContext2D, canvas, viewport }).promise;

        const mimeType = format === "jpg" ? "image/jpeg" : "image/png";
        const quality = format === "jpg" ? 0.92 : undefined;
        const dataUrl = canvas.toDataURL(mimeType, quality);

        results.push({
          pageNum: i,
          dataUrl,
          width: Math.round(viewport.width),
          height: Math.round(viewport.height),
        });
      }

      setPages(results);
      setProgress(100);
      setProgressText("");
      void trackToolUse("pdf-to-image");
    } catch (err) {
      console.error(err);
      setError(t("errorLoad", l));
    } finally {
      setConverting(false);
    }
  };

  const downloadPage = (page: PagePreview) => {
    const a = document.createElement("a");
    a.href = page.dataUrl;
    a.download = `page-${page.pageNum}.${format}`;
    a.click();
  };

  const downloadAll = async () => {
    if (pages.length === 0) return;
    if (pages.length === 1) { downloadPage(pages[0]); return; }

    // Dynamic import JSZip
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();
      for (const page of pages) {
        const base64 = page.dataUrl.split(",")[1];
        zip.file(`page-${page.pageNum}.${format}`, base64, { base64: true });
      }
      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${file?.name.replace(".pdf", "") || "pages"}-images.zip`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // If JSZip not available, download individually
      for (const page of pages) {
        downloadPage(page);
        await new Promise(r => setTimeout(r, 300));
      }
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
      {!file && (
        <div
          className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-primary-400 transition-colors cursor-pointer mb-6"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
        >
          <div className="text-5xl mb-4">🖼️</div>
          <p className="text-gray-700 font-semibold text-lg">{t("clickOrDrag", l)}</p>
          <p className="text-gray-400 text-sm mt-2">{t("noLimit", l)}</p>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0] || null)}
          />
        </div>
      )}

      {/* File info + options */}
      {file && pages.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-500 font-bold text-sm">PDF</div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{file.name}</p>
              <p className="text-sm text-gray-400">{formatSize(file.size)}</p>
            </div>
            <button
              onClick={() => { setFile(null); setPages([]); setProgress(0); }}
              className="text-gray-400 hover:text-red-500 transition-colors text-sm"
            >
              ✕ {pick(ui, locale).remove}
            </button>
          </div>

          {/* Format */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">{t("format", l)}</label>
            <div className="flex gap-3">
              {(["jpg", "png"] as OutputFormat[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                    format === f
                      ? "bg-primary-600 text-white border-primary-600"
                      : "bg-white text-gray-600 border-gray-200 hover:border-primary-300"
                  }`}
                >
                  {f.toUpperCase()}
                  {f === "jpg" && <span className="ml-1 text-xs opacity-75">(smaller)</span>}
                  {f === "png" && <span className="ml-1 text-xs opacity-75">(lossless)</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Scale */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t("scale", l)}
            </label>
            <div className="flex gap-3">
              {([
                { val: 1, label: t("scaleLow", l) },
                { val: 2, label: t("scaleMed", l) },
                { val: 3, label: t("scaleHigh", l) },
              ]).map(({ val, label }) => (
                <button
                  key={val}
                  onClick={() => setScale(val)}
                  className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                    scale === val
                      ? "bg-primary-600 text-white border-primary-600"
                      : "bg-white text-gray-600 border-gray-200 hover:border-primary-300"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Progress */}
          {converting && (
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>{progressText}</span>
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
            onClick={convertPdf}
            disabled={converting}
            className="w-full btn-primary py-3 text-base disabled:opacity-60"
          >
            {converting ? t("converting", l) : t("convert", l)}
          </button>
        </div>
      )}

      {/* Results */}
      {pages.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {pages.length} {t("pages", l)} — {t("ready", l)}
              </h2>
              <p className="text-sm text-gray-500">{file?.name}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => { setFile(null); setPages([]); setProgress(0); }}
                className="btn-secondary py-2 px-4 text-sm"
              >
                {pick(ui, locale).newPdf}
              </button>
              <button
                onClick={downloadAll}
                className="btn-primary py-2 px-4 text-sm"
              >
                {pages.length > 1 ? t("downloadAll", l) : t("downloadPage", l)}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {pages.map((page) => (
              <div key={page.pageNum} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-gray-50 p-2 aspect-[3/4] flex items-center justify-center overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={page.dataUrl}
                    alt={`Page ${page.pageNum}`}
                    className="max-h-full max-w-full object-contain shadow-sm"
                  />
                </div>
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{t("page", l)} {page.pageNum}</p>
                    <p className="text-xs text-gray-400">{page.width}×{page.height}px</p>
                  </div>
                  <button
                    onClick={() => downloadPage(page)}
                    className="text-primary-600 hover:text-primary-700 text-xs font-semibold"
                  >
                    {t("downloadPage", l)}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQ */}
      <div className="mt-16 border-t border-gray-100 pt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {pick(faqTitle, locale)}
        </h2>
        <div className="space-y-6">
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
