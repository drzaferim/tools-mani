"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLanguage, pick } from "@/lib/language-context";
import {
  getDurationBucket,
  getFileSizeBucket,
  getReductionBucket,
  trackToolEvent,
  trackToolUse,
  useTrackToolView,
} from "@/lib/track";
import { ToolContent } from "@/components/ToolContent";
import { pdfCompressContent } from "@/content/tools/pdf-compress";

type CompressionMode = "lossless" | "balanced" | "small";

type CompressionResult = {
  originalSize: number;
  compressedSize: number;
  url: string;
  mode: CompressionMode;
  pageCount: number;
  durationMs: number;
};

const MODE_DESCRIPTION_KEYS: Record<CompressionMode, "losslessDesc" | "balancedDesc" | "smallDesc"> = {
  lossless: "losslessDesc",
  balanced: "balancedDesc",
  small: "smallDesc",
};

const MODE_SETTINGS: Record<Exclude<CompressionMode, "lossless">, { scale: number; quality: number }> = {
  balanced: { scale: 1.5, quality: 0.78 },
  small: { scale: 1.1, quality: 0.6 },
};

const labels = {
  en: {
    back: "← Back to PDF Tools",
    title: "Compress PDF",
    subtitle: "Choose quality or maximum savings. Processing stays entirely in your browser.",
    badge: "No upload",
    drop: "Drop a PDF here or click to select",
    local: "Your document never leaves this device",
    remove: "Remove",
    modeTitle: "Compression mode",
    lossless: "Lossless",
    losslessDesc: "Optimizes PDF structure. Keeps selectable text, vectors and original image quality.",
    balanced: "Balanced",
    balancedDesc: "Rebuilds pages at good screen and print quality. Best choice for scans and photos.",
    small: "Smallest file",
    smallDesc: "Stronger image compression for email, forms and mobile sharing.",
    rasterWarning: "Balanced and smallest modes rebuild each page as an image. Visual layout is preserved, but selectable text, links and form fields are flattened.",
    compress: "Compress PDF",
    compressing: "Compressing...",
    pageProgress: (current: number, total: number) => `Processing page ${current} of ${total}`,
    resultTitle: "Compression complete",
    smaller: "smaller",
    larger: "The result is larger than the original. Try another mode or keep the original file.",
    original: "Original",
    output: "Compressed",
    saved: "Space saved",
    pages: "Pages",
    time: "Time",
    quality: "Mode",
    download: "Download compressed PDF",
    anotherMode: "Try another mode",
    anotherFile: "Choose another PDF",
    selectPdf: "Please select a valid PDF file.",
    failed: "This PDF could not be compressed. It may be encrypted or damaged.",
  },
  tr: {
    back: "← PDF Araçlarına Dön",
    title: "PDF Sıkıştır",
    subtitle: "Kaliteyi veya en küçük dosyayı seçin. İşlemin tamamı tarayıcınızda gerçekleşir.",
    badge: "Yükleme yok",
    drop: "PDF'i buraya bırakın veya seçmek için tıklayın",
    local: "Belgeniz bu cihazdan hiç ayrılmaz",
    remove: "Kaldır",
    modeTitle: "Sıkıştırma modu",
    lossless: "Kayıpsız",
    losslessDesc: "PDF yapısını optimize eder. Seçilebilir metni, vektörleri ve görsel kalitesini korur.",
    balanced: "Dengeli",
    balancedDesc: "Sayfaları ekran ve baskı için iyi kalitede yeniden oluşturur. Tarama ve fotoğraflar için en iyi seçimdir.",
    small: "En küçük dosya",
    smallDesc: "E-posta, formlar ve mobil paylaşım için daha güçlü görsel sıkıştırma uygular.",
    rasterWarning: "Dengeli ve en küçük dosya modları her sayfayı görsel olarak yeniden oluşturur. Görünüm korunur; seçilebilir metin, bağlantılar ve form alanları düzleştirilir.",
    compress: "PDF'i Sıkıştır",
    compressing: "Sıkıştırılıyor...",
    pageProgress: (current: number, total: number) => `${total} sayfanın ${current}. sayfası işleniyor`,
    resultTitle: "Sıkıştırma tamamlandı",
    smaller: "daha küçük",
    larger: "Sonuç orijinalden daha büyük. Başka bir mod deneyin veya orijinal dosyayı kullanın.",
    original: "Orijinal",
    output: "Sıkıştırılmış",
    saved: "Kazanılan alan",
    pages: "Sayfa",
    time: "Süre",
    quality: "Mod",
    download: "Sıkıştırılmış PDF'i indir",
    anotherMode: "Başka mod dene",
    anotherFile: "Başka PDF seç",
    selectPdf: "Lütfen geçerli bir PDF dosyası seçin.",
    failed: "Bu PDF sıkıştırılamadı. Dosya şifreli veya hasarlı olabilir.",
  },
  es: {
    back: "← Volver a herramientas PDF", title: "Comprimir PDF", subtitle: "Elige calidad o el archivo más pequeño. Todo se procesa en tu navegador.", badge: "Sin subida", drop: "Suelta un PDF o haz clic para elegir", local: "El documento nunca sale de este dispositivo", remove: "Quitar", modeTitle: "Modo de compresión", lossless: "Sin pérdida", losslessDesc: "Optimiza la estructura y conserva texto, vectores e imágenes originales.", balanced: "Equilibrado", balancedDesc: "Buena calidad para pantalla e impresión; ideal para escaneos y fotos.", small: "Archivo mínimo", smallDesc: "Compresión más fuerte para correo, formularios y móvil.", rasterWarning: "Los modos equilibrado y mínimo reconstruyen cada página como imagen. Conservan el diseño, pero aplanan texto, enlaces y formularios.", compress: "Comprimir PDF", compressing: "Comprimiendo...", pageProgress: (current: number, total: number) => `Página ${current} de ${total}`, resultTitle: "Compresión completa", smaller: "más pequeño", larger: "El resultado es mayor que el original. Prueba otro modo.", original: "Original", output: "Comprimido", saved: "Espacio ahorrado", pages: "Páginas", time: "Tiempo", quality: "Modo", download: "Descargar PDF", anotherMode: "Probar otro modo", anotherFile: "Elegir otro PDF", selectPdf: "Selecciona un PDF válido.", failed: "No se pudo comprimir este PDF. Puede estar cifrado o dañado.",
  },
  de: {
    back: "← Zurück zu PDF-Tools", title: "PDF komprimieren", subtitle: "Qualität oder kleinste Datei wählen. Alles läuft im Browser.", badge: "Kein Upload", drop: "PDF ablegen oder zum Auswählen klicken", local: "Das Dokument verlässt dieses Gerät nie", remove: "Entfernen", modeTitle: "Komprimierungsmodus", lossless: "Verlustfrei", losslessDesc: "Optimiert die Struktur und erhält Text, Vektoren und Bildqualität.", balanced: "Ausgewogen", balancedDesc: "Gute Bildschirm- und Druckqualität; ideal für Scans und Fotos.", small: "Kleinste Datei", smallDesc: "Stärkere Komprimierung für E-Mail, Formulare und Mobilgeräte.", rasterWarning: "Ausgewogen und kleinste Datei bauen Seiten als Bilder neu auf. Das Layout bleibt, Text, Links und Formulare werden abgeflacht.", compress: "PDF komprimieren", compressing: "Komprimierung...", pageProgress: (current: number, total: number) => `Seite ${current} von ${total}`, resultTitle: "Komprimierung abgeschlossen", smaller: "kleiner", larger: "Das Ergebnis ist größer als das Original. Versuchen Sie einen anderen Modus.", original: "Original", output: "Komprimiert", saved: "Ersparnis", pages: "Seiten", time: "Zeit", quality: "Modus", download: "PDF herunterladen", anotherMode: "Anderen Modus testen", anotherFile: "Andere PDF wählen", selectPdf: "Bitte eine gültige PDF wählen.", failed: "Diese PDF konnte nicht komprimiert werden. Sie ist möglicherweise verschlüsselt oder beschädigt.",
  },
  pt: {
    back: "← Voltar às ferramentas PDF", title: "Comprimir PDF", subtitle: "Escolha qualidade ou o menor arquivo. Tudo é processado no navegador.", badge: "Sem upload", drop: "Solte um PDF ou clique para escolher", local: "O documento nunca sai deste dispositivo", remove: "Remover", modeTitle: "Modo de compressão", lossless: "Sem perdas", losslessDesc: "Otimiza a estrutura e preserva texto, vetores e imagens originais.", balanced: "Equilibrado", balancedDesc: "Boa qualidade para tela e impressão; ideal para digitalizações e fotos.", small: "Menor arquivo", smallDesc: "Compressão mais forte para e-mail, formulários e celular.", rasterWarning: "Os modos equilibrado e menor arquivo recriam cada página como imagem. O layout é preservado, mas texto, links e formulários são achatados.", compress: "Comprimir PDF", compressing: "Comprimindo...", pageProgress: (current: number, total: number) => `Página ${current} de ${total}`, resultTitle: "Compressão concluída", smaller: "menor", larger: "O resultado ficou maior que o original. Tente outro modo.", original: "Original", output: "Comprimido", saved: "Espaço economizado", pages: "Páginas", time: "Tempo", quality: "Modo", download: "Baixar PDF", anotherMode: "Tentar outro modo", anotherFile: "Escolher outro PDF", selectPdf: "Selecione um PDF válido.", failed: "Este PDF não pôde ser comprimido. Ele pode estar criptografado ou danificado.",
  },
  fr: {
    back: "← Retour aux outils PDF", title: "Compresser PDF", subtitle: "Choisissez la qualité ou le fichier le plus petit. Tout reste dans le navigateur.", badge: "Aucun envoi", drop: "Déposez un PDF ou cliquez pour choisir", local: "Le document ne quitte jamais cet appareil", remove: "Retirer", modeTitle: "Mode de compression", lossless: "Sans perte", losslessDesc: "Optimise la structure et conserve texte, vecteurs et images d'origine.", balanced: "Équilibré", balancedDesc: "Bonne qualité écran et impression, idéale pour scans et photos.", small: "Fichier minimal", smallDesc: "Compression renforcée pour e-mail, formulaires et mobile.", rasterWarning: "Les modes équilibré et minimal reconstruisent chaque page en image. La mise en page reste, mais texte, liens et formulaires sont aplatis.", compress: "Compresser PDF", compressing: "Compression...", pageProgress: (current: number, total: number) => `Page ${current} sur ${total}`, resultTitle: "Compression terminée", smaller: "plus petit", larger: "Le résultat est plus grand que l'original. Essayez un autre mode.", original: "Original", output: "Compressé", saved: "Espace gagné", pages: "Pages", time: "Durée", quality: "Mode", download: "Télécharger le PDF", anotherMode: "Essayer un autre mode", anotherFile: "Choisir un autre PDF", selectPdf: "Sélectionnez un PDF valide.", failed: "Ce PDF n'a pas pu être compressé. Il est peut-être chiffré ou endommagé.",
  },
};

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function canvasToJpeg(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("canvas_encode_failed"))), "image/jpeg", quality);
  });
}

export default function PdfCompressPage() {
  const { locale, localePath } = useLanguage();
  const l = pick(labels, locale);
  useTrackToolView("pdf-compress", locale);

  const inputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<CompressionResult | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<CompressionMode>("balanced");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<CompressionResult | null>(null);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");

  useEffect(() => {
    resultRef.current = result;
  }, [result]);

  useEffect(() => () => {
    if (resultRef.current) URL.revokeObjectURL(resultRef.current.url);
  }, []);

  const clearResult = () => {
    setResult((current) => {
      if (current) URL.revokeObjectURL(current.url);
      return null;
    });
    setProgress(0);
    setProgressText("");
  };

  const loadFile = (nextFile: File) => {
    if (nextFile.type !== "application/pdf" && !nextFile.name.toLowerCase().endsWith(".pdf")) {
      setError(l.selectPdf);
      trackToolEvent("processing_error", "pdf-compress", { locale, error_code: "invalid_file_type" });
      return;
    }
    clearResult();
    setFile(nextFile);
    setError("");
    trackToolEvent("input_selected", "pdf-compress", {
      locale,
      file_size_bucket: getFileSizeBucket(nextFile.size),
    });
  };

  const compressLossless = async (sourceFile: File) => {
    const { PDFDocument } = await import("pdf-lib");
    setProgress(25);
    const bytes = await sourceFile.arrayBuffer();
    const sourcePdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
    setProgress(55);
    const optimizedPdf = await PDFDocument.create();
    const copiedPages = await optimizedPdf.copyPages(sourcePdf, sourcePdf.getPageIndices());
    copiedPages.forEach((page) => optimizedPdf.addPage(page));
    const title = sourcePdf.getTitle();
    const author = sourcePdf.getAuthor();
    if (title) optimizedPdf.setTitle(title);
    if (author) optimizedPdf.setAuthor(author);
    setProgress(80);
    const output = await optimizedPdf.save({ useObjectStreams: true, addDefaultPage: false });
    return { bytes: output, pageCount: copiedPages.length };
  };

  const compressRasterized = async (sourceFile: File, selectedMode: Exclude<CompressionMode, "lossless">) => {
    const [{ PDFDocument }, pdfjsLib] = await Promise.all([
      import("pdf-lib"),
      import("pdfjs-dist/legacy/build/pdf.mjs"),
    ]);
    pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
    const data = new Uint8Array(await sourceFile.arrayBuffer());
    const sourcePdf = await pdfjsLib.getDocument({ data }).promise;
    const outputPdf = await PDFDocument.create();
    const settings = MODE_SETTINGS[selectedMode];
    const maxCanvasPixels = 12_000_000;

    const pageCount = sourcePdf.numPages;
    for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
      setProgressText(l.pageProgress(pageNumber, pageCount));
      setProgress(10 + Math.round(((pageNumber - 1) / pageCount) * 82));
      const page = await sourcePdf.getPage(pageNumber);
      const baseViewport = page.getViewport({ scale: 1 });
      const boundedScale = Math.min(
        settings.scale,
        Math.sqrt(maxCanvasPixels / (baseViewport.width * baseViewport.height))
      );
      const renderViewport = page.getViewport({ scale: boundedScale });
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.floor(renderViewport.width));
      canvas.height = Math.max(1, Math.floor(renderViewport.height));
      const context = canvas.getContext("2d", { alpha: false });
      if (!context) throw new Error("canvas_context_failed");
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvasContext: context, canvas, viewport: renderViewport }).promise;
      const imageBlob = await canvasToJpeg(canvas, settings.quality);
      const embeddedImage = await outputPdf.embedJpg(await imageBlob.arrayBuffer());
      const outputPage = outputPdf.addPage([baseViewport.width, baseViewport.height]);
      outputPage.drawImage(embeddedImage, {
        x: 0,
        y: 0,
        width: baseViewport.width,
        height: baseViewport.height,
      });
      canvas.width = 1;
      canvas.height = 1;
      page.cleanup();
    }
    await sourcePdf.destroy();
    setProgress(94);
    const bytes = await outputPdf.save({ useObjectStreams: true, addDefaultPage: false });
    return { bytes, pageCount };
  };

  const compressPdf = async () => {
    if (!file) return;
    const startedAt = performance.now();
    const fileSizeBucket = getFileSizeBucket(file.size);
    trackToolEvent("processing_started", "pdf-compress", {
      locale,
      file_size_bucket: fileSizeBucket,
      mode,
    });
    setProcessing(true);
    setError("");
    setProgress(5);
    clearResult();

    try {
      const compressed = mode === "lossless" ? await compressLossless(file) : await compressRasterized(file, mode);
      const blob = new Blob([compressed.bytes as BlobPart], { type: "application/pdf" });
      const completed: CompressionResult = {
        originalSize: file.size,
        compressedSize: blob.size,
        url: URL.createObjectURL(blob),
        mode,
        pageCount: compressed.pageCount,
        durationMs: performance.now() - startedAt,
      };
      setResult(completed);
      setProgress(100);
      setProgressText("");
      void trackToolUse("pdf-compress", {
        locale,
        file_size_bucket: fileSizeBucket,
        output_size_bucket: getFileSizeBucket(blob.size),
        duration_bucket: getDurationBucket(completed.durationMs),
        reduction_bucket: getReductionBucket(file.size, blob.size),
        mode,
      });
    } catch {
      setError(l.failed);
      trackToolEvent("processing_error", "pdf-compress", {
        locale,
        file_size_bucket: fileSizeBucket,
        duration_bucket: getDurationBucket(performance.now() - startedAt),
        error_code: "compression_failed",
        mode,
      });
    } finally {
      setProcessing(false);
    }
  };

  const download = () => {
    if (!result || !file) return;
    const anchor = document.createElement("a");
    anchor.href = result.url;
    anchor.download = `compressed-${result.mode}-${file.name}`;
    anchor.click();
    trackToolEvent("output_action", "pdf-compress", { locale, action: "download", mode: result.mode });
  };

  const reset = () => {
    clearResult();
    setFile(null);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const reduction = result ? Math.round((1 - result.compressedSize / result.originalSize) * 100) : 0;
  const savedBytes = result ? result.originalSize - result.compressedSize : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href={localePath("/tools/pdf")} className="text-primary-600 hover:text-primary-700 text-sm">{l.back}</Link>
      </div>
      <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
        <h1 className="text-3xl font-bold text-gray-900">{l.title}</h1>
        <span className="inline-flex bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full border border-green-200">{l.badge}</span>
      </div>
      <p className="text-gray-600 mb-8">{l.subtitle}</p>

      {error ? <div role="alert" className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-5">{error}</div> : null}

      {!file ? (
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") inputRef.current?.click(); }}
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => { event.preventDefault(); const dropped = event.dataTransfer.files[0]; if (dropped) loadFile(dropped); }}
          className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer bg-white"
        >
          <div className="text-5xl mb-4" aria-hidden="true">📦</div>
          <p className="text-gray-800 font-semibold text-lg">{l.drop}</p>
          <p className="text-gray-400 text-sm mt-2">{l.local}</p>
          <input ref={inputRef} type="file" accept="application/pdf,.pdf" className="hidden" onChange={(event) => { const selected = event.target.files?.[0]; if (selected) loadFile(selected); }} />
        </div>
      ) : (
        <>
          <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="font-medium text-gray-900 truncate">{file.name}</p>
              <p className="text-sm text-gray-500">{formatSize(file.size)}</p>
            </div>
            <button type="button" onClick={reset} disabled={processing} className="text-red-500 hover:text-red-700 text-sm disabled:opacity-50">{l.remove}</button>
          </div>

          {!result ? (
            <>
              <fieldset className="mb-5">
                <legend className="font-semibold text-gray-900 mb-3">{l.modeTitle}</legend>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {(["lossless", "balanced", "small"] as CompressionMode[]).map((option) => (
                    <label key={option} className={`block rounded-xl border p-4 cursor-pointer transition-colors ${mode === option ? "border-primary-500 bg-primary-50 ring-1 ring-primary-500" : "border-gray-200 bg-white hover:border-gray-300"}`}>
                      <input type="radio" name="compression-mode" value={option} checked={mode === option} onChange={() => setMode(option)} className="sr-only" />
                      <span className="font-semibold text-gray-900 block mb-1">{l[option]}</span>
                      <span className="text-xs text-gray-500 leading-5 block">{l[MODE_DESCRIPTION_KEYS[option]]}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              {mode !== "lossless" ? <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-3 mb-5">{l.rasterWarning}</p> : null}
              {processing ? (
                <div className="mb-5" aria-live="polite">
                  <div className="flex justify-between text-sm text-gray-600 mb-2"><span>{progressText || l.compressing}</span><span>{progress}%</span></div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden"><div className="bg-primary-600 h-full transition-all" style={{ width: `${progress}%` }} /></div>
                </div>
              ) : null}
              <button onClick={compressPdf} disabled={processing} className="btn-primary text-sm disabled:opacity-50">{processing ? l.compressing : l.compress}</button>
            </>
          ) : (
            <>
              <section className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-2" aria-hidden="true">{reduction > 0 ? "🎉" : "📄"}</div>
                  <h2 className="text-2xl font-bold text-gray-900">{l.resultTitle}</h2>
                  {reduction > 0 ? <p className="text-green-700 font-semibold mt-1">{reduction}% {l.smaller}</p> : <p className="text-amber-700 text-sm mt-2">{l.larger}</p>}
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                  <div className="bg-gray-50 rounded-xl p-3 text-center"><p className="text-xs text-gray-500">{l.original}</p><p className="font-bold text-gray-900 mt-1">{formatSize(result.originalSize)}</p></div>
                  <div className="bg-green-50 rounded-xl p-3 text-center"><p className="text-xs text-green-700">{l.output}</p><p className="font-bold text-green-800 mt-1">{formatSize(result.compressedSize)}</p></div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center"><p className="text-xs text-gray-500">{l.saved}</p><p className="font-bold text-gray-900 mt-1">{savedBytes > 0 ? formatSize(savedBytes) : "0 B"}</p></div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center"><p className="text-xs text-gray-500">{l.pages}</p><p className="font-bold text-gray-900 mt-1">{result.pageCount}</p></div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center"><p className="text-xs text-gray-500">{l.time}</p><p className="font-bold text-gray-900 mt-1">{(result.durationMs / 1000).toFixed(1)} s</p></div>
                </div>
                <p className="text-center text-xs text-gray-500 mt-4">{l.quality}: {l[result.mode]}</p>
              </section>
              <div className="flex flex-wrap gap-3">
                <button onClick={download} className="btn-primary text-sm">{l.download}</button>
                <button onClick={clearResult} className="btn-secondary text-sm">{l.anotherMode}</button>
                <button onClick={reset} className="btn-secondary text-sm">{l.anotherFile}</button>
              </div>
            </>
          )}
        </>
      )}

      <ToolContent content={pdfCompressContent} />
    </div>
  );
}
