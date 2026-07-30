"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useLanguage, pick } from "@/lib/language-context";
import { trackToolUse } from "@/lib/track";

type OutputFormat = "image/png" | "image/jpeg" | "image/webp" | "image/bmp";

interface ConvertedFile {
  name: string;
  originalSize: number;
  convertedSize: number;
  url: string;
  format: string;
}

const formatLabels: Record<OutputFormat, string> = {
  "image/png": "PNG",
  "image/jpeg": "JPEG",
  "image/webp": "WebP",
  "image/bmp": "BMP",
};

const formatExtensions: Record<OutputFormat, string> = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/webp": ".webp",
  "image/bmp": ".bmp",
};

const labels = {
  en: {
    title: "Image Converter",
    subtitle: "Convert images between PNG, JPEG, WebP, and BMP formats.",
    allBrowser: "100% free — all processing happens in your browser.",
    noLimit: "No file size limit",
    clickOrDrag: "Click or drag images here",
    dragHint: "PNG, JPEG, WebP, BMP, GIF — no file size limit",
    outputFormat: "Output Format",
    quality: "Quality",
    converting: "Converting",
    convert: "Convert",
    files: "files",
    original: "Original",
    converted: "Converted",
    download: "Download",
    downloadAll: "Download All",
    convertMore: "Convert More",
    clearAll: "Clear All",
    remove: "Remove",
    back: "Back to All Tools",
    errorImage: "Please select image files only.",
    errorFailed: "Conversion failed.",
  },
  tr: {
    title: "Resim Dönüştürücü",
    subtitle: "Resimlerinizi PNG, JPEG, WebP ve BMP formatları arasında dönüştürün.",
    allBrowser: "100% ücretsiz — tüm işlemler tarayıcınızda gerçekleşir.",
    noLimit: "Dosya boyutu limiti yok",
    clickOrDrag: "Resimleri tıklayın veya sürükleyin",
    dragHint: "PNG, JPEG, WebP, BMP, GIF — dosya boyutu limiti yok",
    outputFormat: "Çıkış Formatı",
    quality: "Kalite",
    converting: "Dönüştürülüyor",
    convert: "Dönüştür",
    files: "dosya",
    original: "Orijinal",
    converted: "Dönüştürülmüş",
    download: "İndir",
    downloadAll: "Tümünü İndir",
    convertMore: "Daha Fazla Dönüştür",
    clearAll: "Tümünü Temizle",
    remove: "Kaldır",
    back: "Tüm Araçlara Dön",
    errorImage: "Lütfen resim dosyası seçin.",
    errorFailed: "Dönüştürme başarısız oldu.",
  },
  es: {
    title: "Conversor de imágenes",
    subtitle: "Convierte imágenes entre los formatos PNG, JPEG, WebP y BMP.",
    allBrowser: "100% gratis: todo el procesamiento ocurre en tu navegador.",
    noLimit: "Sin límite de tamaño",
    clickOrDrag: "Haz clic o arrastra imágenes aquí",
    dragHint: "PNG, JPEG, WebP, BMP, GIF — sin límite de tamaño",
    outputFormat: "Formato de salida",
    quality: "Calidad",
    converting: "Convirtiendo",
    convert: "Convertir",
    files: "archivos",
    original: "Original",
    converted: "Convertido",
    download: "Descargar",
    downloadAll: "Descargar todo",
    convertMore: "Convertir más",
    clearAll: "Limpiar todo",
    remove: "Quitar",
    back: "Volver a todas las herramientas",
    errorImage: "Selecciona solo archivos de imagen.",
    errorFailed: "La conversión falló.",
  },
  de: {
    title: "Bildkonverter",
    subtitle: "Konvertieren Sie Bilder zwischen den Formaten PNG, JPEG, WebP und BMP.",
    allBrowser: "100% kostenlos – die gesamte Verarbeitung erfolgt in Ihrem Browser.",
    noLimit: "Keine Größenbeschränkung",
    clickOrDrag: "Bilder hierher klicken oder ziehen",
    dragHint: "PNG, JPEG, WebP, BMP, GIF — keine Größenbeschränkung",
    outputFormat: "Ausgabeformat",
    quality: "Qualität",
    converting: "Konvertierung läuft",
    convert: "Konvertieren",
    files: "Dateien",
    original: "Original",
    converted: "Konvertiert",
    download: "Herunterladen",
    downloadAll: "Alle herunterladen",
    convertMore: "Weitere konvertieren",
    clearAll: "Alle entfernen",
    remove: "Entfernen",
    back: "Zurück zu allen Tools",
    errorImage: "Bitte nur Bilddateien auswählen.",
    errorFailed: "Konvertierung fehlgeschlagen.",
  },
  pt: {
    title: "Conversor de imagens",
    subtitle: "Converta imagens entre os formatos PNG, JPEG, WebP e BMP.",
    allBrowser: "100% grátis — todo o processamento acontece no seu navegador.",
    noLimit: "Sem limite de tamanho",
    clickOrDrag: "Clique ou arraste imagens aqui",
    dragHint: "PNG, JPEG, WebP, BMP, GIF — sem limite de tamanho",
    outputFormat: "Formato de saída",
    quality: "Qualidade",
    converting: "Convertendo",
    convert: "Converter",
    files: "arquivos",
    original: "Original",
    converted: "Convertido",
    download: "Baixar",
    downloadAll: "Baixar tudo",
    convertMore: "Converter mais",
    clearAll: "Limpar tudo",
    remove: "Remover",
    back: "Voltar a todas as ferramentas",
    errorImage: "Selecione apenas arquivos de imagem.",
    errorFailed: "A conversão falhou.",
  },
  fr: {
    title: "Convertisseur d'images",
    subtitle: "Convertissez vos images entre les formats PNG, JPEG, WebP et BMP.",
    allBrowser: "100% gratuit — tout le traitement se fait dans votre navigateur.",
    noLimit: "Aucune limite de taille",
    clickOrDrag: "Cliquez ou glissez vos images ici",
    dragHint: "PNG, JPEG, WebP, BMP, GIF — aucune limite de taille",
    outputFormat: "Format de sortie",
    quality: "Qualité",
    converting: "Conversion",
    convert: "Convertir",
    files: "fichiers",
    original: "Original",
    converted: "Converti",
    download: "Télécharger",
    downloadAll: "Tout télécharger",
    convertMore: "Convertir d'autres",
    clearAll: "Tout effacer",
    remove: "Retirer",
    back: "Retour à tous les outils",
    errorImage: "Veuillez sélectionner uniquement des fichiers image.",
    errorFailed: "Échec de la conversion.",
  },
};

export default function ImageConvertPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("image/jpeg");
  const [quality, setQuality] = useState(0.9);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<ConvertedFile[]>([]);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { locale, localePath } = useLanguage();

  const l = pick(labels, locale);

  const addFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    const images = Array.from(newFiles).filter(f => f.type.startsWith("image/"));
    if (images.length === 0) { setError(l.errorImage); return; }
    setFiles(prev => [...prev, ...images]);
    setResults([]);
    setError("");
  };

  const removeFile = (index: number) => setFiles(prev => prev.filter((_, i) => i !== index));

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  const getBaseName = (name: string) => name.replace(/\.[^.]+$/, "");

  const convertImage = useCallback(async (file: File, format: OutputFormat, q: number): Promise<ConvertedFile> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) { reject(new Error("Canvas not supported")); return; }

        // White background for JPEG (no transparency)
        if (format === "image/jpeg") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (!blob) { reject(new Error("Conversion failed")); return; }
            const url = URL.createObjectURL(blob);
            resolve({
              name: getBaseName(file.name) + formatExtensions[format],
              originalSize: file.size,
              convertedSize: blob.size,
              url,
              format: formatLabels[format],
            });
          },
          format,
          format === "image/png" || format === "image/bmp" ? undefined : q,
        );
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = URL.createObjectURL(file);
    });
  }, []);

  const convertAll = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    setError("");
    setProgress(0);
    setResults([]);

    const converted: ConvertedFile[] = [];

    for (let i = 0; i < files.length; i++) {
      try {
        const result = await convertImage(files[i], outputFormat, quality);
        converted.push(result);
      } catch {
        setError(`${l.errorFailed} (${files[i].name})`);
      }
      setProgress(Math.round(((i + 1) / files.length) * 100));
    }

    setResults(converted);
    setProcessing(false);
    if (converted.length > 0) {
      void trackToolUse("image-convert");
    }
  };

  const downloadFile = (result: ConvertedFile) => {
    const a = document.createElement("a");
    a.href = result.url;
    a.download = result.name;
    a.click();
  };

  const downloadAll = () => results.forEach(r => downloadFile(r));

  const reset = () => {
    results.forEach(r => URL.revokeObjectURL(r.url));
    setFiles([]);
    setResults([]);
    setProgress(0);
    setError("");
  };

  const showQuality = outputFormat === "image/jpeg" || outputFormat === "image/webp";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href={localePath("/")} className="text-primary-600 hover:text-primary-700 text-sm">&larr; {l.back}</Link>
      </div>

      <div className="flex items-start justify-between mb-2">
        <h1 className="text-3xl font-bold text-gray-900">{l.title}</h1>
        <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full border border-green-200">{l.noLimit}</span>
      </div>
      <p className="text-gray-600 mb-8">{l.subtitle} {l.allBrowser}</p>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">{error}</div>}

      {results.length === 0 ? (
        <>
          <div
            className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-primary-400 transition-colors cursor-pointer mb-6"
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
          >
            <div className="text-5xl mb-4">&#127912;</div>
            <p className="text-gray-700 font-semibold text-lg">{l.clickOrDrag}</p>
            <p className="text-gray-400 text-sm mt-2">{l.dragHint}</p>
            <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => addFiles(e.target.files)} />
          </div>

          {files.length > 0 && (
            <>
              <div className="space-y-2 mb-6">
                {files.map((file, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                      <p className="text-xs text-gray-400">{formatSize(file.size)}</p>
                    </div>
                    <button onClick={() => removeFile(i)} className="text-red-400 hover:text-red-600 text-sm">{l.remove}</button>
                  </div>
                ))}
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{l.outputFormat}</label>
                  <div className="grid grid-cols-4 gap-2">
                    {(Object.keys(formatLabels) as OutputFormat[]).map(fmt => (
                      <button key={fmt} onClick={() => setOutputFormat(fmt)}
                        className={`text-sm py-2.5 rounded-lg border-2 font-semibold transition-colors ${outputFormat === fmt ? "border-primary-500 bg-primary-50 text-primary-700" : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"}`}>
                        {formatLabels[fmt]}
                      </button>
                    ))}
                  </div>
                </div>

                {showQuality && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {l.quality}: {Math.round(quality * 100)}%
                    </label>
                    <input type="range" min="0.1" max="1" step="0.05" value={quality}
                      onChange={(e) => setQuality(Number(e.target.value))} className="w-full" />
                  </div>
                )}
              </div>

              {processing && (
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>{l.converting}...</span><span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-primary-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={convertAll} disabled={processing} className="btn-primary text-sm disabled:opacity-50">
                  {processing ? `${l.converting}...` : `${l.convert} ${files.length} ${l.files}`}
                </button>
                <button onClick={reset} className="btn-secondary text-sm">{l.clearAll}</button>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="space-y-3 mb-6">
            {results.map((r, i) => (
              <div key={i} className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{r.name}</p>
                  <div className="flex gap-4 text-xs text-gray-500 mt-1">
                    <span>{l.original}: {formatSize(r.originalSize)}</span>
                    <span>&rarr;</span>
                    <span className="text-green-600 font-medium">{r.format}: {formatSize(r.convertedSize)}</span>
                  </div>
                </div>
                <button onClick={() => downloadFile(r)} className="btn-primary text-xs !py-2 !px-4">{l.download}</button>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            {results.length > 1 && (
              <button onClick={downloadAll} className="btn-primary text-sm">{l.downloadAll}</button>
            )}
            <button onClick={reset} className="btn-secondary text-sm">{l.convertMore}</button>
          </div>
        </>
      )}
    </div>
  );
}
