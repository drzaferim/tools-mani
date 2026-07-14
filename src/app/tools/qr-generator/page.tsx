"use client";

import { useState, useRef, useEffect } from "react";
import QRCode from "qrcode";
import { useLanguage } from "@/lib/language-context";
import Link from "next/link";
import { useTrackToolUseOnce } from "@/lib/track";

export default function QrGeneratorPage() {
  const { locale } = useLanguage();
  const [text, setText] = useState("");
  const [size, setSize] = useState(256);
  const [qrUrl, setQrUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const markToolUsed = useTrackToolUseOnce("qr-generator");

  useEffect(() => {
    let cancelled = false;
    if (text.trim()) {
      // QR tamamen tarayıcıda üretilir; metin hiçbir sunucuya gönderilmez.
      QRCode.toDataURL(text, { width: size, margin: 2 })
        .then((url) => {
          if (!cancelled) setQrUrl(url);
        })
        .catch(() => {
          if (!cancelled) setQrUrl("");
        });
    } else {
      setQrUrl("");
    }
    return () => {
      cancelled = true;
    };
  }, [text, size]);

  const downloadQr = () => {
    if (!qrUrl) return;
    markToolUsed();
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = `qr-code-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link
          href="/"
          className="text-primary-600 hover:text-primary-700 text-sm"
        >
          &larr; Back to Tools
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        QR Code Generator
      </h1>
      <p className="text-gray-600 mb-8">
        Generate QR codes for URLs, text, and more. Free and instant.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter text or URL
          </label>
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (e.target.value.trim()) {
                markToolUsed();
              }
            }}
            placeholder="https://example.com or any text..."
            className="w-full h-32 p-4 bg-white border border-gray-200 rounded-xl resize-y focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Size: {size}x{size}
            </label>
            <input
              type="range"
              min={128}
              max={512}
              step={64}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={downloadQr}
              disabled={!qrUrl}
              className="btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Download PNG
            </button>
            <button
              onClick={() => setText("")}
              className="btn-secondary text-sm"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            {qrUrl ? (
              <img
                src={qrUrl}
                alt="Generated QR Code"
                width={size}
                height={size}
                className="max-w-full"
              />
            ) : (
              <div
                className="flex items-center justify-center text-gray-300 border-2 border-dashed border-gray-200 rounded-xl"
                style={{ width: size, height: size, maxWidth: "100%" }}
              >
                <span className="text-sm">Enter text to generate QR</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {/* FAQ */}
      <div className="mt-16 border-t border-gray-100 pt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {locale === "tr" ? "Sık Sorulan Sorular" : "Frequently Asked Questions"}
        </h2>
        <div className="space-y-5">
          {[
            { q: locale === "tr" ? "Hangi tür QR kodları oluşturabilirim?" : "What types of QR codes can I generate?", a: locale === "tr" ? "URL, düz metin, e-posta adresi, telefon numarası, SMS ve Wi-Fi kimlik bilgileri için QR kodu oluşturabilirsiniz." : "You can generate QR codes for URLs, plain text, email addresses, phone numbers, SMS, and Wi-Fi credentials." },
            { q: locale === "tr" ? "Hangi dosya formatlarında indirebilirim?" : "What file formats can I download?", a: locale === "tr" ? "QR kodu PNG resim veya SVG vektör dosyası olarak indirebilirsiniz." : "You can download the QR code as a PNG image or SVG vector file." },
            { q: locale === "tr" ? "Oluşturabileceğim QR kodu sayısında sınır var mı?" : "Is there a limit on how many QR codes I can generate?", a: locale === "tr" ? "Hayır. İstediğiniz kadar QR kodu tamamen ücretsiz olarak oluşturabilirsiniz." : "No. You can generate as many QR codes as you need, completely free." },
            { q: locale === "tr" ? "QR kodlarım herhangi bir yerde saklanıyor mu?" : "Are my QR codes stored anywhere?", a: locale === "tr" ? "Hayır. QR kodları tarayıcınızda yerel olarak oluşturulur. Hiçbir şey sunucuya gönderilmez." : "No. QR codes are generated locally in your browser. Nothing is sent to any server." },
          ].map(({ q, a }, i) => (
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
