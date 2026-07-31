"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useLanguage, pick } from "@/lib/language-context";
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

interface CleanResult {
  name: string;
  url: string;
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
  useTrackToolView("exif-cleaner", locale);
  const inputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<CleanResult[]>([]);
  const [processing, setProcessing] = useState(false);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const images = Array.from(list).filter((f) => f.type.startsWith("image/"));
    if (images.length === 0) {
      alert(l.invalid);
      return;
    }
    setFiles((prev) => [...prev, ...images]);
    setResults([]);
    trackToolEvent("input_selected", "exif-cleaner", {
      locale,
      batch_size_bucket: getBatchSizeBucket(images.length),
      file_size_bucket: getFileSizeBucket(images.reduce((sum, file) => sum + file.size, 0)),
    });
  };

  const cleanAll = async () => {
    const startedAt = performance.now();
    const batchSizeBucket = getBatchSizeBucket(files.length);
    const fileSizeBucket = getFileSizeBucket(files.reduce((sum, file) => sum + file.size, 0));
    trackToolEvent("processing_started", "exif-cleaner", {
      locale,
      batch_size_bucket: batchSizeBucket,
      file_size_bucket: fileSizeBucket,
      mode: "canvas_reencode",
    });
    setProcessing(true);
    const out: CleanResult[] = [];
    try {
      for (const file of files) {
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
          name: file.name.replace(/(\.[^.]+)$/, "-clean$1"),
          url: URL.createObjectURL(blob),
          originalSize: file.size,
          newSize: blob.size,
        });
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

  const downloadAll = () => {
    for (const r of results) {
      const a = document.createElement("a");
      a.href = r.url;
      a.download = r.name;
      a.click();
    }
    trackToolEvent("output_action", "exif-cleaner", { locale, action: "download" });
  };

  const clearAll = () => {
    results.forEach((r) => URL.revokeObjectURL(r.url));
    setFiles([]);
    setResults([]);
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
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <>
          <ul className="text-sm text-gray-600 mb-6 space-y-1">
            {files.map((f, i) => (
              <li key={i} className="truncate">
                📷 {f.name} <span className="text-gray-400">({formatBytes(f.size)})</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3 mb-4">
            <button onClick={cleanAll} disabled={processing} className="btn-primary text-sm disabled:opacity-60">
              {processing ? l.processing : l.clean}
            </button>
            <button onClick={clearAll} className="btn-secondary text-sm">
              {l.clear}
            </button>
          </div>
          <p className="text-xs text-gray-400 mb-6">{l.note}</p>
        </>
      )}

      {results.length > 0 && (
        <div className="space-y-3 mb-10">
          {results.map((r, i) => (
            <div
              key={i}
              className="flex flex-wrap items-center justify-between gap-3 bg-white border border-gray-100 rounded-xl p-4 shadow-sm"
            >
              <div className="min-w-0">
                <p className="font-medium text-gray-900 text-sm truncate">{r.name}</p>
                <p className="text-xs text-gray-500">
                  {formatBytes(r.originalSize)} → {formatBytes(r.newSize)} ·{" "}
                  <span className="text-green-600 font-medium">✓ {l.done}</span>
                </p>
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
          {results.length > 1 && (
            <button onClick={downloadAll} className="btn-primary text-sm">
              {l.downloadAll}
            </button>
          )}
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
