"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { trackToolUse } from "@/lib/track";

const labels = {
  en: {
    back: "← Back to Tools",
    title: "Video to MP3 Converter",
    subtitle:
      "Extract audio from MP4, MOV, WebM and other videos as MP3 or WAV. Conversion runs entirely in your browser — your video is never uploaded.",
    firstLoad:
      "First use downloads the conversion engine (~31 MB) from this site once; afterwards it's cached. Keep files under ~500 MB for smooth processing.",
    drop: "Drop a video (or audio) file here or click to select",
    formats: "MP4, MOV, WebM, MKV, AVI, M4A and more",
    format: "Output format",
    bitrate: "MP3 quality",
    loading: "Loading engine...",
    converting: "Converting...",
    run: "Convert",
    download: "Download",
    clear: "Clear",
    invalid: "Please choose a video or audio file.",
    error: "Conversion failed. The file may be corrupted or use an unsupported codec.",
    done: "done",
    noAudio: "Note: if the video has no audio track, the output will be silent.",
  },
  tr: {
    back: "← Araçlara Dön",
    title: "Video → MP3 Dönüştürücü",
    subtitle:
      "MP4, MOV, WebM ve diğer videolardan sesi MP3 veya WAV olarak çıkarın. Dönüştürme tamamen tarayıcınızda yapılır — videonuz hiçbir yere yüklenmez.",
    firstLoad:
      "İlk kullanımda dönüştürme motoru (~31 MB) bu siteden bir kez indirilir; sonrasında önbelleğe alınır. Akıcı işlem için dosyayı ~500 MB altında tutun.",
    drop: "Video (veya ses) dosyasını buraya bırakın ya da tıklayıp seçin",
    formats: "MP4, MOV, WebM, MKV, AVI, M4A ve daha fazlası",
    format: "Çıktı formatı",
    bitrate: "MP3 kalitesi",
    loading: "Motor yükleniyor...",
    converting: "Dönüştürülüyor...",
    run: "Dönüştür",
    download: "İndir",
    clear: "Temizle",
    invalid: "Lütfen bir video veya ses dosyası seçin.",
    error: "Dönüştürme başarısız. Dosya bozuk olabilir veya desteklenmeyen bir codec kullanıyor olabilir.",
    done: "tamamlandı",
    noAudio: "Not: videoda ses izi yoksa çıktı sessiz olur.",
  },
};

type OutFormat = "mp3" | "wav";

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function VideoToMp3Page() {
  const { locale, localePath } = useLanguage();
  const l = labels[locale];
  const inputRef = useRef<HTMLInputElement>(null);
  // FFmpeg örneğini oturum boyunca sakla — motor bir kez yüklensin
  const ffmpegRef = useRef<import("@ffmpeg/ffmpeg").FFmpeg | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [outFormat, setOutFormat] = useState<OutFormat>("mp3");
  const [bitrate, setBitrate] = useState("192");
  const [phase, setPhase] = useState<"idle" | "loading" | "converting">("idle");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ url: string; name: string; size: number } | null>(null);
  const [error, setError] = useState("");

  const pick = (f: File | undefined | null) => {
    if (!f) return;
    if (!f.type.startsWith("video/") && !f.type.startsWith("audio/")) {
      alert(l.invalid);
      return;
    }
    if (result) URL.revokeObjectURL(result.url);
    setFile(f);
    setResult(null);
    setError("");
  };

  const convert = async () => {
    if (!file) return;
    setError("");
    setResult(null);
    setProgress(0);
    try {
      const { FFmpeg } = await import("@ffmpeg/ffmpeg");
      const { fetchFile, toBlobURL } = await import("@ffmpeg/util");

      if (!ffmpegRef.current) {
        setPhase("loading");
        const ffmpeg = new FFmpeg();
        // Çekirdek dosyalar kendi sitemizden sunulur; blob URL'e çevirmek worker kısıtlarını aşar.
        await ffmpeg.load({
          coreURL: await toBlobURL("/ffmpeg/ffmpeg-core.js", "text/javascript"),
          wasmURL: await toBlobURL("/ffmpeg/ffmpeg-core.wasm", "application/wasm"),
        });
        ffmpegRef.current = ffmpeg;
      }
      const ffmpeg = ffmpegRef.current;

      setPhase("converting");
      const onProgress = ({ progress: p }: { progress: number }) => {
        setProgress(Math.min(100, Math.round(p * 100)));
      };
      ffmpeg.on("progress", onProgress);

      const inExt = file.name.split(".").pop() || "mp4";
      const inName = `input.${inExt}`;
      const outName = `output.${outFormat}`;
      await ffmpeg.writeFile(inName, await fetchFile(file));

      const args =
        outFormat === "mp3"
          ? ["-i", inName, "-vn", "-b:a", `${bitrate}k`, outName]
          : ["-i", inName, "-vn", outName];
      const code = await ffmpeg.exec(args);
      ffmpeg.off("progress", onProgress);
      if (code !== 0) throw new Error("ffmpeg exit " + code);

      const data = (await ffmpeg.readFile(outName)) as Uint8Array;
      await ffmpeg.deleteFile(inName).catch(() => {});
      await ffmpeg.deleteFile(outName).catch(() => {});
      if (data.length === 0) throw new Error("empty output");

      const blob = new Blob([data.buffer as ArrayBuffer], {
        type: outFormat === "mp3" ? "audio/mpeg" : "audio/wav",
      });
      setResult({
        url: URL.createObjectURL(blob),
        name: file.name.replace(/\.[^.]+$/, "") + "." + outFormat,
        size: blob.size,
      });
      void trackToolUse("video-to-mp3");
    } catch {
      setError(l.error);
    } finally {
      setPhase("idle");
    }
  };

  const clearAll = () => {
    if (result) URL.revokeObjectURL(result.url);
    setFile(null);
    setResult(null);
    setError("");
  };

  const busy = phase !== "idle";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
        <p className="text-gray-700 font-medium mb-1">
          {file ? `🎬 ${file.name} (${formatBytes(file.size)})` : l.drop}
        </p>
        <p className="text-gray-400 text-sm">{l.formats}</p>
        <input
          ref={inputRef}
          type="file"
          accept="video/*,audio/*"
          className="hidden"
          onChange={(e) => pick(e.target.files?.[0])}
        />
      </div>

      {file && (
        <>
          <div className="flex flex-wrap items-end gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{l.format}</label>
              <select
                value={outFormat}
                onChange={(e) => setOutFormat(e.target.value as OutFormat)}
                className="p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="mp3">MP3</option>
                <option value="wav">WAV</option>
              </select>
            </div>
            {outFormat === "mp3" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{l.bitrate}</label>
                <select
                  value={bitrate}
                  onChange={(e) => setBitrate(e.target.value)}
                  className="p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="128">128 kbps</option>
                  <option value="192">192 kbps</option>
                  <option value="320">320 kbps</option>
                </select>
              </div>
            )}
            <button onClick={convert} disabled={busy} className="btn-primary text-sm mb-1 disabled:opacity-60">
              {phase === "loading" ? l.loading : phase === "converting" ? `${l.converting} %${progress}` : l.run}
            </button>
            <button onClick={clearAll} disabled={busy} className="btn-secondary text-sm mb-1 disabled:opacity-60">
              {l.clear}
            </button>
          </div>
          <p className="text-xs text-gray-400 mb-6">{l.noAudio}</p>
        </>
      )}

      {busy && (
        <div className="w-full bg-gray-100 rounded-full h-2 mb-6 overflow-hidden">
          <div
            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
            style={{ width: phase === "converting" ? `${Math.max(progress, 3)}%` : "10%" }}
          />
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">{error}</div>
      )}

      {result && (
        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="min-w-0">
              <p className="font-medium text-gray-900 text-sm truncate">🎵 {result.name}</p>
              <p className="text-xs text-gray-500">
                {formatBytes(result.size)} · <span className="text-green-600 font-medium">✓ {l.done}</span>
              </p>
            </div>
            <a href={result.url} download={result.name} className="btn-primary text-sm !py-2">
              {l.download}
            </a>
          </div>
          <audio controls src={result.url} className="w-full" />
        </div>
      )}
    </div>
  );
}
