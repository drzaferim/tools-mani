"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useLanguage, pick as pickLocale } from "@/lib/language-context";
import { trackToolUse } from "@/lib/track";

const labels = {
  en: {
    back: "← Back to Tools",
    title: "Image to Text (OCR)",
    subtitle:
      "Extract text from photos, screenshots and scans. The OCR engine runs inside your browser — your images are never uploaded anywhere.",
    firstLoad:
      "First use downloads the OCR engine (~13 MB) from this site once; afterwards it's cached and even works offline.",
    drop: "Drop an image here or click to select",
    formats: "PNG, JPG, WebP or BMP — screenshots and scans work best",
    lang: "Text language",
    langEng: "English",
    langTur: "Turkish",
    langBoth: "Turkish + English",
    run: "Extract Text",
    loading: "Loading OCR engine...",
    recognizing: "Recognizing text...",
    result: "Extracted text",
    empty: "No text could be detected in this image.",
    copy: "Copy Text",
    copied: "Copied!",
    download: "Download .txt",
    clear: "Clear",
    invalid: "Only image files are supported.",
    error: "Text recognition failed. Try a sharper, higher-contrast image.",
    tips: "Tips for best results",
    tipItems: [
      "Use sharp, well-lit images — blurry photos reduce accuracy.",
      "Crop the image to just the text area if possible.",
      "Straighten rotated scans first (see the Image tools).",
      "Pick the right language — it significantly improves accuracy.",
    ],
  },
  tr: {
    back: "← Araçlara Dön",
    title: "Resimden Metin Çıkarma (OCR)",
    subtitle:
      "Fotoğraf, ekran görüntüsü ve taramalardaki metni çıkarın. OCR motoru tarayıcınızın içinde çalışır — görselleriniz hiçbir yere yüklenmez.",
    firstLoad:
      "İlk kullanımda OCR motoru (~13 MB) bu siteden bir kez indirilir; sonrasında önbelleğe alınır ve çevrimdışı bile çalışır.",
    drop: "Görseli buraya bırakın veya tıklayıp seçin",
    formats: "PNG, JPG, WebP veya BMP — ekran görüntüsü ve taramalar en iyi sonucu verir",
    lang: "Metin dili",
    langEng: "İngilizce",
    langTur: "Türkçe",
    langBoth: "Türkçe + İngilizce",
    run: "Metni Çıkar",
    loading: "OCR motoru yükleniyor...",
    recognizing: "Metin tanınıyor...",
    result: "Çıkarılan metin",
    empty: "Bu görselde metin algılanamadı.",
    copy: "Metni Kopyala",
    copied: "Kopyalandı!",
    download: ".txt İndir",
    clear: "Temizle",
    invalid: "Yalnızca resim dosyaları desteklenir.",
    error: "Metin tanıma başarısız oldu. Daha net, kontrastı yüksek bir görsel deneyin.",
    tips: "En iyi sonuç için ipuçları",
    tipItems: [
      "Net ve iyi aydınlatılmış görseller kullanın — bulanık fotoğraflar doğruluğu düşürür.",
      "Mümkünse görseli yalnızca metin alanını içerecek şekilde kırpın.",
      "Yamuk taramaları önce düzeltin (Resim araçlarına bakın).",
      "Doğru dili seçin — doğruluğu belirgin biçimde artırır.",
    ],
  },
  // Not: sitede yalnızca eng + tur dil paketi var (public/ocr/lang). Bu yüzden
  // tanıma dili seçenekleri her dilde İngilizce/Türkçe olarak kalıyor; metinler
  // bunu olduğu gibi söylüyor. Yeni dil paketi eklemek ayrı iş (bkz. AI_HANDOFF).
  es: {
    back: "← Volver a las herramientas",
    title: "Imagen a texto (OCR)",
    subtitle:
      "Extrae texto de fotos, capturas de pantalla y escaneos. El motor OCR se ejecuta dentro de tu navegador: tus imágenes no se suben a ningún sitio.",
    firstLoad:
      "El primer uso descarga el motor OCR (~13 MB) desde este sitio una sola vez; después queda en caché e incluso funciona sin conexión.",
    drop: "Suelta una imagen aquí o haz clic para seleccionarla",
    formats: "PNG, JPG, WebP o BMP — las capturas y los escaneos dan mejores resultados",
    lang: "Idioma del texto",
    langEng: "Inglés",
    langTur: "Turco",
    langBoth: "Turco + inglés",
    run: "Extraer texto",
    loading: "Cargando el motor OCR...",
    recognizing: "Reconociendo texto...",
    result: "Texto extraído",
    empty: "No se ha detectado texto en esta imagen.",
    copy: "Copiar texto",
    copied: "¡Copiado!",
    download: "Descargar .txt",
    clear: "Limpiar",
    invalid: "Solo se admiten archivos de imagen.",
    error: "El reconocimiento de texto falló. Prueba con una imagen más nítida y con más contraste.",
    tips: "Consejos para obtener el mejor resultado",
    tipItems: [
      "Usa imágenes nítidas y bien iluminadas: las fotos borrosas reducen la precisión.",
      "Recorta la imagen para dejar solo la zona de texto, si es posible.",
      "Endereza primero los escaneos torcidos (mira las herramientas de imagen).",
      "El motor solo reconoce inglés y turco; para otros idiomas la precisión será menor.",
    ],
  },
  de: {
    back: "← Zurück zu den Tools",
    title: "Bild zu Text (OCR)",
    subtitle:
      "Extrahieren Sie Text aus Fotos, Screenshots und Scans. Die OCR-Engine läuft in Ihrem Browser – Ihre Bilder werden nirgendwohin hochgeladen.",
    firstLoad:
      "Beim ersten Mal wird die OCR-Engine (~13 MB) einmalig von dieser Seite geladen; danach ist sie im Cache und funktioniert sogar offline.",
    drop: "Bild hierher ziehen oder zum Auswählen klicken",
    formats: "PNG, JPG, WebP oder BMP — Screenshots und Scans liefern die besten Ergebnisse",
    lang: "Sprache des Textes",
    langEng: "Englisch",
    langTur: "Türkisch",
    langBoth: "Türkisch + Englisch",
    run: "Text extrahieren",
    loading: "OCR-Engine wird geladen...",
    recognizing: "Text wird erkannt...",
    result: "Extrahierter Text",
    empty: "In diesem Bild konnte kein Text erkannt werden.",
    copy: "Text kopieren",
    copied: "Kopiert!",
    download: ".txt herunterladen",
    clear: "Leeren",
    invalid: "Es werden nur Bilddateien unterstützt.",
    error: "Die Texterkennung ist fehlgeschlagen. Versuchen Sie ein schärferes, kontrastreicheres Bild.",
    tips: "Tipps für beste Ergebnisse",
    tipItems: [
      "Verwenden Sie scharfe, gut beleuchtete Bilder – unscharfe Fotos senken die Genauigkeit.",
      "Schneiden Sie das Bild nach Möglichkeit auf den Textbereich zu.",
      "Richten Sie schiefe Scans zuerst gerade (siehe die Bild-Tools).",
      "Die Engine erkennt nur Englisch und Türkisch; bei anderen Sprachen ist die Genauigkeit geringer.",
    ],
  },
  pt: {
    back: "← Voltar às ferramentas",
    title: "Imagem para texto (OCR)",
    subtitle:
      "Extraia texto de fotos, capturas de tela e digitalizações. O motor de OCR roda dentro do seu navegador — suas imagens não são enviadas para lugar nenhum.",
    firstLoad:
      "No primeiro uso, o motor de OCR (~13 MB) é baixado deste site uma única vez; depois fica em cache e funciona até offline.",
    drop: "Solte uma imagem aqui ou clique para selecionar",
    formats: "PNG, JPG, WebP ou BMP — capturas de tela e digitalizações dão os melhores resultados",
    lang: "Idioma do texto",
    langEng: "Inglês",
    langTur: "Turco",
    langBoth: "Turco + inglês",
    run: "Extrair texto",
    loading: "Carregando o motor de OCR...",
    recognizing: "Reconhecendo texto...",
    result: "Texto extraído",
    empty: "Nenhum texto foi detectado nesta imagem.",
    copy: "Copiar texto",
    copied: "Copiado!",
    download: "Baixar .txt",
    clear: "Limpar",
    invalid: "Apenas arquivos de imagem são suportados.",
    error: "O reconhecimento de texto falhou. Tente uma imagem mais nítida e com mais contraste.",
    tips: "Dicas para o melhor resultado",
    tipItems: [
      "Use imagens nítidas e bem iluminadas — fotos desfocadas reduzem a precisão.",
      "Se possível, recorte a imagem deixando apenas a área do texto.",
      "Endireite digitalizações tortas antes (veja as ferramentas de imagem).",
      "O motor reconhece apenas inglês e turco; para outros idiomas a precisão será menor.",
    ],
  },
  fr: {
    back: "← Retour aux outils",
    title: "Image en texte (OCR)",
    subtitle:
      "Extrayez le texte de vos photos, captures d'écran et numérisations. Le moteur OCR s'exécute dans votre navigateur — vos images ne sont envoyées nulle part.",
    firstLoad:
      "À la première utilisation, le moteur OCR (~13 Mo) est téléchargé une seule fois depuis ce site ; ensuite il est mis en cache et fonctionne même hors ligne.",
    drop: "Déposez une image ici ou cliquez pour la sélectionner",
    formats: "PNG, JPG, WebP ou BMP — les captures d'écran et les scans donnent les meilleurs résultats",
    lang: "Langue du texte",
    langEng: "Anglais",
    langTur: "Turc",
    langBoth: "Turc + anglais",
    run: "Extraire le texte",
    loading: "Chargement du moteur OCR...",
    recognizing: "Reconnaissance du texte...",
    result: "Texte extrait",
    empty: "Aucun texte n'a pu être détecté dans cette image.",
    copy: "Copier le texte",
    copied: "Copié !",
    download: "Télécharger le .txt",
    clear: "Effacer",
    invalid: "Seuls les fichiers image sont pris en charge.",
    error: "La reconnaissance de texte a échoué. Essayez une image plus nette et plus contrastée.",
    tips: "Conseils pour un meilleur résultat",
    tipItems: [
      "Utilisez des images nettes et bien éclairées — les photos floues réduisent la précision.",
      "Recadrez l'image sur la seule zone de texte si possible.",
      "Redressez d'abord les scans de travers (voir les outils Image).",
      "Le moteur ne reconnaît que l'anglais et le turc ; pour d'autres langues la précision sera moindre.",
    ],
  },
};

type OcrLang = "tur" | "eng" | "tur+eng";

export default function OcrPage() {
  const { locale, localePath } = useLanguage();
  const l = pickLocale(labels, locale);
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [lang, setLang] = useState<OcrLang>(locale === "tr" ? "tur" : "eng");
  const [phase, setPhase] = useState<"idle" | "loading" | "recognizing">("idle");
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const pick = (f: File | undefined | null) => {
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      alert(l.invalid);
      return;
    }
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
    setText("");
    setDone(false);
    setError("");
  };

  const run = async () => {
    if (!file) return;
    setError("");
    setText("");
    setDone(false);
    setPhase("loading");
    setProgress(0);
    try {
      const { createWorker } = await import("tesseract.js");
      const langs = lang === "tur+eng" ? ["tur", "eng"] : [lang];
      const worker = await createWorker(langs, 1, {
        // Motor, çekirdek ve dil dosyaları kendi sitemizden sunulur — üçüncü taraf CDN'e istek atılmaz.
        workerPath: "/ocr/worker.min.js",
        corePath: "/ocr/core",
        langPath: "/ocr/lang",
        logger: (m: { status: string; progress: number }) => {
          if (m.status === "recognizing text") {
            setPhase("recognizing");
            setProgress(Math.round(m.progress * 100));
          }
        },
      });
      const result = await worker.recognize(file);
      await worker.terminate();
      setText(result.data.text.trim());
      setDone(true);
      void trackToolUse("ocr");
    } catch {
      setError(l.error);
    } finally {
      setPhase("idle");
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadTxt = () => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = (file?.name.replace(/\.[^.]+$/, "") || "ocr") + ".txt";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const clearAll = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl("");
    setText("");
    setDone(false);
    setError("");
  };

  const busy = phase !== "idle";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href={localePath("/")} className="text-primary-600 hover:text-primary-700 text-sm">
          {l.back}
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">{l.title}</h1>
      <p className="text-gray-600 mb-2">{l.subtitle}</p>
      <p className="text-xs text-gray-400 mb-8">{l.firstLoad}</p>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          pick(e.dataTransfer.files?.[0]);
        }}
        className="border-2 border-dashed border-gray-300 hover:border-primary-400 rounded-2xl p-10 text-center cursor-pointer transition-colors mb-6 bg-white"
      >
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewUrl} alt="preview" className="max-h-64 mx-auto rounded-lg" />
        ) : (
          <>
            <p className="text-gray-700 font-medium mb-1">{l.drop}</p>
            <p className="text-gray-400 text-sm">{l.formats}</p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => pick(e.target.files?.[0])}
        />
      </div>

      {file && (
        <div className="flex flex-wrap items-end gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{l.lang}</label>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as OcrLang)}
              className="p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="tur">{l.langTur}</option>
              <option value="eng">{l.langEng}</option>
              <option value="tur+eng">{l.langBoth}</option>
            </select>
          </div>
          <button onClick={run} disabled={busy} className="btn-primary text-sm mb-1 disabled:opacity-60">
            {phase === "loading" ? l.loading : phase === "recognizing" ? `${l.recognizing} %${progress}` : l.run}
          </button>
          <button onClick={clearAll} disabled={busy} className="btn-secondary text-sm mb-1 disabled:opacity-60">
            {l.clear}
          </button>
        </div>
      )}

      {busy && (
        <div className="w-full bg-gray-100 rounded-full h-2 mb-6 overflow-hidden">
          <div
            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
            style={{ width: phase === "recognizing" ? `${progress}%` : "15%" }}
          />
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">{error}</div>
      )}

      {done && (
        <div className="mb-10">
          <label className="block text-sm font-medium text-gray-700 mb-2">{l.result}</label>
          {text ? (
            <>
              <textarea
                value={text}
                readOnly
                className="w-full h-64 p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm resize-y focus:outline-none"
              />
              <div className="flex gap-3 mt-4">
                <button onClick={copy} className="btn-primary text-sm">
                  {copied ? l.copied : l.copy}
                </button>
                <button onClick={downloadTxt} className="btn-secondary text-sm">
                  {l.download}
                </button>
              </div>
            </>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-xl text-sm">
              {l.empty}
            </div>
          )}
        </div>
      )}

      <div className="bg-primary-50 rounded-2xl p-6">
        <h2 className="font-semibold text-gray-900 mb-3">{l.tips}</h2>
        <ul className="space-y-1.5 text-sm text-gray-600">
          {l.tipItems.map((t) => (
            <li key={t}>• {t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
