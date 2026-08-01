"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage, pick } from "@/lib/language-context";
import { inspectImageMetadata, type ImageMetadata } from "@/lib/image-metadata";
import {
  getBatchSizeBucket,
  getDurationBucket,
  getFileSizeBucket,
  trackToolEvent,
  trackToolUse,
  useTrackToolView,
} from "@/lib/track";

const labels = {
  en: {
    back: "← Back to Tools",
    title: "EXIF Remover — Photo Metadata Cleaner",
    subtitle:
      "Photos carry hidden metadata: GPS location, camera model, capture date, even serial numbers. This tool strips all of it — right in your browser, so the photo itself never leaves your device.",
    drop: "Drop photos here or click to select",
    formats: "JPG, PNG, WebP — multiple files supported",
    whatTitle: "What gets removed?",
    whatItems: [
      "GPS coordinates (where the photo was taken)",
      "Camera / phone make, model and serial number",
      "Capture date and time",
      "Software and editing history tags",
      "Thumbnail previews embedded in the file",
    ],
    clean: "Remove Metadata",
    processing: "Cleaning...",
    done: "cleaned",
    download: "Download",
    downloadAll: "Download All",
    clear: "Clear",
    invalid: "Only image files are supported.",
    note: "Note: cleaning re-encodes the image pixels at high quality. Dimensions stay identical.",
  },
  tr: {
    back: "← Araçlara Dön",
    title: "EXIF Temizleyici — Fotoğraf Meta Verisi Silme",
    subtitle:
      "Fotoğraflar gizli meta veri taşır: GPS konumu, kamera modeli, çekim tarihi, hatta seri numarası. Bu araç hepsini siler — tarayıcınızın içinde; fotoğraf cihazınızdan hiç çıkmaz.",
    drop: "Fotoğrafları buraya bırakın veya tıklayıp seçin",
    formats: "JPG, PNG, WebP — çoklu dosya desteklenir",
    whatTitle: "Neler silinir?",
    whatItems: [
      "GPS koordinatları (fotoğrafın çekildiği yer)",
      "Kamera / telefon markası, modeli ve seri numarası",
      "Çekim tarihi ve saati",
      "Yazılım ve düzenleme geçmişi etiketleri",
      "Dosyaya gömülü küçük önizleme resimleri",
    ],
    clean: "Meta Veriyi Sil",
    processing: "Temizleniyor...",
    done: "temizlendi",
    download: "İndir",
    downloadAll: "Tümünü İndir",
    clear: "Temizle",
    invalid: "Yalnızca resim dosyaları desteklenir.",
    note: "Not: temizlik, görüntü piksellerini yüksek kalitede yeniden kodlar. Boyutlar birebir aynı kalır.",
  },
  es: {
    back: "← Volver a las herramientas",
    title: "Eliminar EXIF — limpiador de metadatos de fotos",
    subtitle:
      "Las fotos llevan metadatos ocultos: ubicación GPS, modelo de cámara, fecha de captura e incluso números de serie. Esta herramienta lo elimina todo, en tu propio navegador, así que la foto nunca sale de tu dispositivo.",
    drop: "Suelta las fotos aquí o haz clic para seleccionarlas",
    formats: "JPG, PNG, WebP — admite varios archivos",
    whatTitle: "¿Qué se elimina?",
    whatItems: [
      "Coordenadas GPS (dónde se tomó la foto)",
      "Marca, modelo y número de serie de la cámara o el teléfono",
      "Fecha y hora de la captura",
      "Etiquetas de software e historial de edición",
      "Miniaturas incrustadas en el archivo",
    ],
    clean: "Eliminar metadatos",
    processing: "Limpiando...",
    done: "limpiada",
    download: "Descargar",
    downloadAll: "Descargar todo",
    clear: "Limpiar",
    invalid: "Solo se admiten archivos de imagen.",
    note: "Nota: la limpieza vuelve a codificar los píxeles con alta calidad. Las dimensiones no cambian.",
  },
  de: {
    back: "← Zurück zu den Tools",
    title: "EXIF entfernen — Metadaten aus Fotos löschen",
    subtitle:
      "Fotos enthalten versteckte Metadaten: GPS-Standort, Kameramodell, Aufnahmedatum, sogar Seriennummern. Dieses Tool entfernt alles – direkt in Ihrem Browser, sodass das Foto Ihr Gerät nie verlässt.",
    drop: "Fotos hierher ziehen oder zum Auswählen klicken",
    formats: "JPG, PNG, WebP — mehrere Dateien möglich",
    whatTitle: "Was wird entfernt?",
    whatItems: [
      "GPS-Koordinaten (wo das Foto aufgenommen wurde)",
      "Marke, Modell und Seriennummer der Kamera bzw. des Telefons",
      "Aufnahmedatum und -uhrzeit",
      "Software- und Bearbeitungsverlauf-Tags",
      "In der Datei eingebettete Vorschaubilder",
    ],
    clean: "Metadaten entfernen",
    processing: "Wird bereinigt...",
    done: "bereinigt",
    download: "Herunterladen",
    downloadAll: "Alle herunterladen",
    clear: "Leeren",
    invalid: "Es werden nur Bilddateien unterstützt.",
    note: "Hinweis: Beim Bereinigen werden die Bildpixel in hoher Qualität neu kodiert. Die Abmessungen bleiben identisch.",
  },
  pt: {
    back: "← Voltar às ferramentas",
    title: "Remover EXIF — limpeza de metadados de fotos",
    subtitle:
      "Fotos carregam metadados ocultos: localização GPS, modelo da câmera, data da captura e até números de série. Esta ferramenta remove tudo — dentro do seu navegador, então a foto nunca sai do seu dispositivo.",
    drop: "Solte as fotos aqui ou clique para selecionar",
    formats: "JPG, PNG, WebP — vários arquivos suportados",
    whatTitle: "O que é removido?",
    whatItems: [
      "Coordenadas GPS (onde a foto foi tirada)",
      "Marca, modelo e número de série da câmera ou do celular",
      "Data e hora da captura",
      "Tags de software e histórico de edição",
      "Miniaturas incorporadas no arquivo",
    ],
    clean: "Remover metadados",
    processing: "Limpando...",
    done: "limpa",
    download: "Baixar",
    downloadAll: "Baixar tudo",
    clear: "Limpar",
    invalid: "Apenas arquivos de imagem são suportados.",
    note: "Observação: a limpeza recodifica os pixels da imagem em alta qualidade. As dimensões permanecem idênticas.",
  },
  fr: {
    back: "← Retour aux outils",
    title: "Supprimer les EXIF — nettoyage des métadonnées photo",
    subtitle:
      "Les photos contiennent des métadonnées cachées : position GPS, modèle d'appareil, date de prise de vue, voire numéros de série. Cet outil supprime tout — directement dans votre navigateur, la photo ne quitte donc jamais votre appareil.",
    drop: "Déposez vos photos ici ou cliquez pour les sélectionner",
    formats: "JPG, PNG, WebP — plusieurs fichiers pris en charge",
    whatTitle: "Qu'est-ce qui est supprimé ?",
    whatItems: [
      "Coordonnées GPS (lieu de la prise de vue)",
      "Marque, modèle et numéro de série de l'appareil ou du téléphone",
      "Date et heure de la prise de vue",
      "Balises de logiciel et historique de retouche",
      "Vignettes intégrées au fichier",
    ],
    clean: "Supprimer les métadonnées",
    processing: "Nettoyage...",
    done: "nettoyée",
    download: "Télécharger",
    downloadAll: "Tout télécharger",
    clear: "Effacer",
    invalid: "Seuls les fichiers image sont pris en charge.",
    note: "Remarque : le nettoyage réencode les pixels en haute qualité. Les dimensions restent identiques.",
  },
};

const extraLabels = {
  en: {
    preview: "Metadata preview",
    noExif: "No readable EXIF tags detected",
    gps: "GPS location embedded",
    camera: "Camera",
    captured: "Captured",
    software: "Software",
    dimensions: "Dimensions",
    remove: "Remove",
    zip: "Download cleaned ZIP",
    zipPreparing: "Preparing ZIP...",
    progress: (current: number, total: number) => `Cleaning ${current} of ${total}`,
    inspectFailed: "Preview unavailable",
    failed: "One or more images could not be cleaned.",
  },
  tr: {
    preview: "Meta veri önizlemesi",
    noExif: "Okunabilir EXIF etiketi bulunamadı",
    gps: "GPS konumu gömülü",
    camera: "Kamera",
    captured: "Çekim",
    software: "Yazılım",
    dimensions: "Boyutlar",
    remove: "Kaldır",
    zip: "Temizlenenleri ZIP indir",
    zipPreparing: "ZIP hazırlanıyor...",
    progress: (current: number, total: number) => `${total} dosyanın ${current}. dosyası temizleniyor`,
    inspectFailed: "Önizleme kullanılamıyor",
    failed: "Bir veya daha fazla resim temizlenemedi.",
  },
  es: {
    preview: "Vista previa de metadatos", noExif: "No se detectaron etiquetas EXIF legibles", gps: "Ubicación GPS incrustada", camera: "Cámara", captured: "Captura", software: "Software", dimensions: "Dimensiones", remove: "Quitar", zip: "Descargar ZIP limpio", zipPreparing: "Preparando ZIP...", progress: (current: number, total: number) => `Limpiando ${current} de ${total}`, inspectFailed: "Vista previa no disponible", failed: "No se pudieron limpiar una o más imágenes.",
  },
  de: {
    preview: "Metadatenvorschau", noExif: "Keine lesbaren EXIF-Tags erkannt", gps: "GPS-Standort eingebettet", camera: "Kamera", captured: "Aufnahme", software: "Software", dimensions: "Abmessungen", remove: "Entfernen", zip: "Bereinigtes ZIP laden", zipPreparing: "ZIP wird erstellt...", progress: (current: number, total: number) => `${current} von ${total} wird bereinigt`, inspectFailed: "Vorschau nicht verfügbar", failed: "Mindestens ein Bild konnte nicht bereinigt werden.",
  },
  pt: {
    preview: "Prévia dos metadados", noExif: "Nenhuma tag EXIF legível detectada", gps: "Localização GPS incorporada", camera: "Câmera", captured: "Captura", software: "Software", dimensions: "Dimensões", remove: "Remover", zip: "Baixar ZIP limpo", zipPreparing: "Preparando ZIP...", progress: (current: number, total: number) => `Limpando ${current} de ${total}`, inspectFailed: "Prévia indisponível", failed: "Não foi possível limpar uma ou mais imagens.",
  },
  fr: {
    preview: "Aperçu des métadonnées", noExif: "Aucune balise EXIF lisible détectée", gps: "Position GPS intégrée", camera: "Appareil", captured: "Prise de vue", software: "Logiciel", dimensions: "Dimensions", remove: "Retirer", zip: "Télécharger le ZIP nettoyé", zipPreparing: "Préparation du ZIP...", progress: (current: number, total: number) => `Nettoyage ${current} sur ${total}`, inspectFailed: "Aperçu indisponible", failed: "Une ou plusieurs images n'ont pas pu être nettoyées.",
  },
};

interface SelectedImage {
  id: string;
  file: File;
  previewUrl: string;
  metadata: ImageMetadata | null;
}

interface CleanResult {
  id: string;
  name: string;
  url: string;
  blob: Blob;
  originalSize: number;
  newSize: number;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export default function ExifCleanerPage() {
  const { locale, localePath } = useLanguage();
  const l = pick(labels, locale);
  const x = pick(extraLabels, locale);
  useTrackToolView("exif-cleaner", locale);
  const inputRef = useRef<HTMLInputElement>(null);

  const [images, setImages] = useState<SelectedImage[]>([]);
  const [results, setResults] = useState<CleanResult[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [zipPreparing, setZipPreparing] = useState(false);
  const [error, setError] = useState("");
  const imagesRef = useRef<SelectedImage[]>([]);
  const resultsRef = useRef<CleanResult[]>([]);

  useEffect(() => {
    imagesRef.current = images;
    resultsRef.current = results;
  }, [images, results]);

  useEffect(() => {
    return () => {
      imagesRef.current.forEach((image) => URL.revokeObjectURL(image.previewUrl));
      resultsRef.current.forEach((result) => URL.revokeObjectURL(result.url));
    };
  }, []);

  const clearResults = () => {
    setResults((current) => {
      current.forEach((result) => URL.revokeObjectURL(result.url));
      return [];
    });
  };

  const addFiles = async (list: FileList | null) => {
    if (!list) return;
    const acceptedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
    const files = Array.from(list).filter((file) => acceptedTypes.has(file.type));
    if (files.length === 0) {
      setError(l.invalid);
      return;
    }
    setError("");
    clearResults();
    const inspected = await Promise.all(
      files.map(async (file) => {
        const previewUrl = URL.createObjectURL(file);
        let metadata: ImageMetadata | null = null;
        try {
          metadata = await inspectImageMetadata(file);
        } catch {
          metadata = null;
        }
        return {
          id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`,
          file,
          previewUrl,
          metadata,
        };
      })
    );
    setImages((previous) => [...previous, ...inspected]);
    trackToolEvent("input_selected", "exif-cleaner", {
      locale,
      batch_size_bucket: getBatchSizeBucket(files.length),
      file_size_bucket: getFileSizeBucket(files.reduce((sum, file) => sum + file.size, 0)),
    });
  };

  const removeImage = (id: string) => {
    setImages((current) => {
      const target = current.find((image) => image.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return current.filter((image) => image.id !== id);
    });
    clearResults();
  };

  const cleanAll = async () => {
    const startedAt = performance.now();
    const batchSizeBucket = getBatchSizeBucket(images.length);
    const fileSizeBucket = getFileSizeBucket(images.reduce((sum, image) => sum + image.file.size, 0));
    trackToolEvent("processing_started", "exif-cleaner", {
      locale,
      batch_size_bucket: batchSizeBucket,
      file_size_bucket: fileSizeBucket,
      mode: "canvas_reencode",
    });
    setProcessing(true);
    setProgress(0);
    setError("");
    clearResults();
    const out: CleanResult[] = [];
    try {
      for (let index = 0; index < images.length; index += 1) {
        const selected = images[index];
        const file = selected.file;
        // Canvas'a çizip yeniden kodlamak piksel verisini korur, EXIF/XMP/IPTC bloklarını atar.
        const bitmap = await createImageBitmap(file);
        const canvas = document.createElement("canvas");
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) continue;
        ctx.drawImage(bitmap, 0, 0);
        bitmap.close();

        const type =
          file.type === "image/png" ? "image/png" : file.type === "image/webp" ? "image/webp" : "image/jpeg";
        const blob: Blob | null = await new Promise((resolve) =>
          canvas.toBlob(resolve, type, 0.95)
        );
        if (!blob) continue;

        out.push({
          id: selected.id,
          name: file.name.replace(/(\.[^.]+)$/, "-clean$1"),
          url: URL.createObjectURL(blob),
          blob,
          originalSize: file.size,
          newSize: blob.size,
        });
        setProgress(index + 1);
      }
      setResults(out);
      if (out.length > 0) {
        void trackToolUse("exif-cleaner", {
          locale,
          batch_size_bucket: batchSizeBucket,
          file_size_bucket: fileSizeBucket,
          output_size_bucket: getFileSizeBucket(out.reduce((sum, result) => sum + result.newSize, 0)),
          duration_bucket: getDurationBucket(performance.now() - startedAt),
          mode: "canvas_reencode",
        });
      } else {
        trackToolEvent("processing_error", "exif-cleaner", {
          locale,
          batch_size_bucket: batchSizeBucket,
          duration_bucket: getDurationBucket(performance.now() - startedAt),
          error_code: "no_output",
        });
      }
    } catch {
      setError(x.failed);
      trackToolEvent("processing_error", "exif-cleaner", {
        locale,
        batch_size_bucket: batchSizeBucket,
        duration_bucket: getDurationBucket(performance.now() - startedAt),
        error_code: "cleaning_failed",
      });
    } finally {
      setProcessing(false);
    }
  };

  const downloadZip = async () => {
    if (results.length === 0) return;
    setZipPreparing(true);
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();
      results.forEach((result) => zip.file(result.name, result.blob));
      const zipBlob = await zip.generateAsync({ type: "blob", compression: "DEFLATE" });
      const url = URL.createObjectURL(zipBlob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "toolsmani-cleaned-photos.zip";
      anchor.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      trackToolEvent("output_action", "exif-cleaner", { locale, action: "download", mode: "zip" });
    } finally {
      setZipPreparing(false);
    }
  };

  const clearAll = () => {
    images.forEach((image) => URL.revokeObjectURL(image.previewUrl));
    results.forEach((result) => URL.revokeObjectURL(result.url));
    setImages([]);
    setResults([]);
    setProgress(0);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href={localePath("/")} className="text-primary-600 hover:text-primary-700 text-sm">
          {l.back}
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">{l.title}</h1>
      <p className="text-gray-600 mb-8 max-w-3xl">{l.subtitle}</p>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          addFiles(e.dataTransfer.files);
        }}
        className="border-2 border-dashed border-gray-300 hover:border-primary-400 rounded-2xl p-10 text-center cursor-pointer transition-colors mb-6 bg-white"
      >
        <p className="text-gray-700 font-medium mb-1">{l.drop}</p>
        <p className="text-gray-400 text-sm">{l.formats}</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {error ? (
        <div role="alert" className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
          {error}
        </div>
      ) : null}

      {images.length > 0 && (
        <>
          <h2 className="font-semibold text-gray-900 mb-3">{x.preview}</h2>
          <div className="space-y-3 mb-6">
            {images.map((image) => {
              const metadata = image.metadata;
              return (
                <article key={image.id} className="flex gap-4 bg-white border border-gray-200 rounded-xl p-4">
                  <Image
                    src={image.previewUrl}
                    alt=""
                    width={80}
                    height={80}
                    unoptimized
                    className="h-20 w-20 rounded-lg object-cover bg-gray-100 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 text-sm truncate">{image.file.name}</p>
                        <p className="text-xs text-gray-500">{formatBytes(image.file.size)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="text-xs text-red-500 hover:text-red-700"
                      >
                        {x.remove}
                      </button>
                    </div>
                    {metadata ? (
                      <div className="flex flex-wrap gap-1.5 mt-2 text-xs">
                        <span className="bg-gray-100 text-gray-600 rounded-full px-2 py-1">
                          {x.dimensions}: {metadata.width}×{metadata.height}
                        </span>
                        {metadata.make || metadata.model ? (
                          <span className="bg-gray-100 text-gray-600 rounded-full px-2 py-1">
                            {x.camera}: {[metadata.make, metadata.model].filter(Boolean).join(" ")}
                          </span>
                        ) : null}
                        {metadata.capturedAt ? (
                          <span className="bg-gray-100 text-gray-600 rounded-full px-2 py-1">
                            {x.captured}: {metadata.capturedAt}
                          </span>
                        ) : null}
                        {metadata.software ? (
                          <span className="bg-gray-100 text-gray-600 rounded-full px-2 py-1">
                            {x.software}: {metadata.software}
                          </span>
                        ) : null}
                        {metadata.hasGps ? (
                          <span className="bg-amber-50 text-amber-700 rounded-full px-2 py-1 font-medium">⚠ {x.gps}</span>
                        ) : null}
                        {!metadata.exifDetected ? (
                          <span className="bg-green-50 text-green-700 rounded-full px-2 py-1">{x.noExif}</span>
                        ) : null}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 mt-2">{x.inspectFailed}</p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-3 mb-4">
            <button onClick={cleanAll} disabled={processing} className="btn-primary text-sm disabled:opacity-60">
              {processing ? l.processing : l.clean}
            </button>
            <button onClick={clearAll} className="btn-secondary text-sm">
              {l.clear}
            </button>
          </div>
          {processing ? (
            <div className="mb-4" aria-live="polite">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>{x.progress(progress, images.length)}</span>
                <span>{Math.round((progress / images.length) * 100)}%</span>
              </div>
              <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full bg-primary-600 transition-all" style={{ width: `${(progress / images.length) * 100}%` }} />
              </div>
            </div>
          ) : null}
          <p className="text-xs text-gray-400 mb-6">{l.note}</p>
        </>
      )}

      {results.length > 0 && (
        <div className="space-y-3 mb-10">
          {results.map((r) => (
            <div
              key={r.id}
              className="flex flex-wrap items-center justify-between gap-3 bg-white border border-green-200 rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Image
                  src={r.url}
                  alt=""
                  width={56}
                  height={56}
                  unoptimized
                  className="h-14 w-14 rounded-lg object-cover bg-gray-100 shrink-0"
                />
                <div className="min-w-0">
                <p className="font-medium text-gray-900 text-sm truncate">{r.name}</p>
                <p className="text-xs text-gray-500">
                  {formatBytes(r.originalSize)} → {formatBytes(r.newSize)} ·{" "}
                  <span className="text-green-600 font-medium">✓ {l.done}</span>
                </p>
                </div>
              </div>
              <a
                href={r.url}
                download={r.name}
                onClick={() => trackToolEvent("output_action", "exif-cleaner", { locale, action: "download" })}
                className="btn-primary text-sm !py-2"
              >
                {l.download}
              </a>
            </div>
          ))}
          {results.length > 1 ? (
            <button onClick={downloadZip} disabled={zipPreparing} className="btn-primary text-sm disabled:opacity-60">
              {zipPreparing ? x.zipPreparing : x.zip}
            </button>
          ) : null}
        </div>
      )}

      <div className="bg-primary-50 rounded-2xl p-6">
        <h2 className="font-semibold text-gray-900 mb-3">{l.whatTitle}</h2>
        <ul className="space-y-1.5 text-sm text-gray-600">
          {l.whatItems.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
