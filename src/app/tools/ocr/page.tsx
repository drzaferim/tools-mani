"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
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
};

type OcrLang = "tur" | "eng" | "tur+eng";

export default function OcrPage() {
  const { locale, localePath } = useLanguage();
  const l = labels[locale];
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
