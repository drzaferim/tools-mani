"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLanguage, pick } from "@/lib/language-context";
import { trackToolUse } from "@/lib/track";

const labels = {
  en: {
    back: "← Back to Tools",
    title: "Sign PDF",
    subtitle:
      "Draw your signature, click where it should go, download the signed PDF. Your document and signature never leave your browser.",
    drop: "Drop a PDF here or click to select",
    step1: "1. Draw your signature",
    penColor: "Pen",
    black: "Black",
    blue: "Blue",
    clearSig: "Clear",
    step2: "2. Click on the page to place it",
    page: "Page",
    of: "of",
    sigSize: "Signature width",
    placeHint: "Click anywhere on the page preview to position the signature.",
    apply: "Sign & Download",
    processing: "Signing...",
    reset: "Start Over",
    needSig: "Draw a signature first.",
    needPlace: "Click on the page to place your signature.",
    loadError: "Could not read this PDF. Is it password-protected?",
  },
  tr: {
    back: "← Araçlara Dön",
    title: "PDF İmzalama",
    subtitle:
      "İmzanızı çizin, sayfada olacağı yere tıklayın, imzalı PDF'i indirin. Belgeniz ve imzanız tarayıcınızdan asla çıkmaz.",
    drop: "PDF'i buraya bırakın veya tıklayıp seçin",
    step1: "1. İmzanızı çizin",
    penColor: "Kalem",
    black: "Siyah",
    blue: "Mavi",
    clearSig: "Temizle",
    step2: "2. Sayfada olacağı yere tıklayın",
    page: "Sayfa",
    of: "/",
    sigSize: "İmza genişliği",
    placeHint: "İmzayı konumlandırmak için sayfa önizlemesinde bir yere tıklayın.",
    apply: "İmzala ve İndir",
    processing: "İmzalanıyor...",
    reset: "Baştan Başla",
    needSig: "Önce bir imza çizin.",
    needPlace: "İmzanın yerleşeceği yere tıklayın.",
    loadError: "Bu PDF okunamadı. Şifre korumalı olabilir mi?",
  },
  es: {
    back: "← Volver a las herramientas",
    title: "Firmar PDF",
    subtitle:
      "Dibuja tu firma, haz clic donde debe ir y descarga el PDF firmado. Tu documento y tu firma nunca salen de tu navegador.",
    drop: "Suelta un PDF aquí o haz clic para seleccionarlo",
    step1: "1. Dibuja tu firma",
    penColor: "Lápiz",
    black: "Negro",
    blue: "Azul",
    clearSig: "Borrar",
    step2: "2. Haz clic en la página para colocarla",
    page: "Página",
    of: "de",
    sigSize: "Ancho de la firma",
    placeHint: "Haz clic en cualquier punto de la vista previa para situar la firma.",
    apply: "Firmar y descargar",
    processing: "Firmando...",
    reset: "Empezar de nuevo",
    needSig: "Dibuja primero una firma.",
    needPlace: "Haz clic en la página para colocar tu firma.",
    loadError: "No se pudo leer este PDF. ¿Está protegido con contraseña?",
  },
  de: {
    back: "← Zurück zu den Tools",
    title: "PDF unterschreiben",
    subtitle:
      "Zeichnen Sie Ihre Unterschrift, klicken Sie an die gewünschte Stelle und laden Sie das signierte PDF herunter. Dokument und Unterschrift verlassen Ihren Browser nie.",
    drop: "PDF hierher ziehen oder zum Auswählen klicken",
    step1: "1. Unterschrift zeichnen",
    penColor: "Stift",
    black: "Schwarz",
    blue: "Blau",
    clearSig: "Löschen",
    step2: "2. Auf die Seite klicken, um sie zu platzieren",
    page: "Seite",
    of: "von",
    sigSize: "Breite der Unterschrift",
    placeHint: "Klicken Sie in der Seitenvorschau an eine beliebige Stelle, um die Unterschrift zu positionieren.",
    apply: "Unterschreiben & herunterladen",
    processing: "Wird unterschrieben...",
    reset: "Neu beginnen",
    needSig: "Zeichnen Sie zuerst eine Unterschrift.",
    needPlace: "Klicken Sie auf die Seite, um Ihre Unterschrift zu platzieren.",
    loadError: "Dieses PDF konnte nicht gelesen werden. Ist es passwortgeschützt?",
  },
  pt: {
    back: "← Voltar às ferramentas",
    title: "Assinar PDF",
    subtitle:
      "Desenhe sua assinatura, clique onde ela deve ficar e baixe o PDF assinado. Seu documento e sua assinatura nunca saem do navegador.",
    drop: "Solte um PDF aqui ou clique para selecionar",
    step1: "1. Desenhe sua assinatura",
    penColor: "Caneta",
    black: "Preto",
    blue: "Azul",
    clearSig: "Apagar",
    step2: "2. Clique na página para posicioná-la",
    page: "Página",
    of: "de",
    sigSize: "Largura da assinatura",
    placeHint: "Clique em qualquer ponto da pré-visualização para posicionar a assinatura.",
    apply: "Assinar e baixar",
    processing: "Assinando...",
    reset: "Começar de novo",
    needSig: "Desenhe uma assinatura primeiro.",
    needPlace: "Clique na página para posicionar sua assinatura.",
    loadError: "Não foi possível ler este PDF. Ele está protegido por senha?",
  },
  fr: {
    back: "← Retour aux outils",
    title: "Signer un PDF",
    subtitle:
      "Dessinez votre signature, cliquez à l'endroit voulu et téléchargez le PDF signé. Votre document et votre signature ne quittent jamais votre navigateur.",
    drop: "Déposez un PDF ici ou cliquez pour le sélectionner",
    step1: "1. Dessinez votre signature",
    penColor: "Stylo",
    black: "Noir",
    blue: "Bleu",
    clearSig: "Effacer",
    step2: "2. Cliquez sur la page pour la placer",
    page: "Page",
    of: "sur",
    sigSize: "Largeur de la signature",
    placeHint: "Cliquez n'importe où sur l'aperçu de la page pour positionner la signature.",
    apply: "Signer et télécharger",
    processing: "Signature en cours...",
    reset: "Recommencer",
    needSig: "Dessinez d'abord une signature.",
    needPlace: "Cliquez sur la page pour placer votre signature.",
    loadError: "Impossible de lire ce PDF. Est-il protégé par un mot de passe ?",
  },
};

const PAD_W = 600;
const PAD_H = 240;

export default function PdfSignPage() {
  const { locale, localePath } = useLanguage();
  const l = pick(labels, locale);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const padRef = useRef<HTMLCanvasElement>(null);
  const previewRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const hasStrokes = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [penColor, setPenColor] = useState<"black" | "#1d4ed8">("black");
  const [placement, setPlacement] = useState<{ xr: number; yr: number } | null>(null);
  const [sigWidthPct, setSigWidthPct] = useState(25);
  const [sigPreviewUrl, setSigPreviewUrl] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  // İmza pedi kurulumu
  useEffect(() => {
    const canvas = padRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, PAD_W, PAD_H);
  }, [file]);

  const padPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * PAD_W,
      y: ((e.clientY - rect.top) / rect.height) * PAD_H,
    };
  };

  const startDraw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    drawing.current = true;
    lastPoint.current = padPos(e);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const moveDraw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current || !lastPoint.current) return;
    const ctx = padRef.current?.getContext("2d");
    if (!ctx) return;
    const p = padPos(e);
    ctx.strokeStyle = penColor;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    lastPoint.current = p;
    hasStrokes.current = true;
  };

  const endDraw = () => {
    drawing.current = false;
    lastPoint.current = null;
    if (hasStrokes.current && padRef.current) {
      setSigPreviewUrl(extractSignaturePng(padRef.current));
    }
  };

  const clearPad = () => {
    const ctx = padRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, PAD_W, PAD_H);
    hasStrokes.current = false;
    setSigPreviewUrl("");
  };

  // Beyaz zemini şeffaflaştırıp kırpılmış imza PNG'si üretir
  function extractSignaturePng(pad: HTMLCanvasElement): string {
    const ctx = pad.getContext("2d");
    if (!ctx) return "";
    const img = ctx.getImageData(0, 0, PAD_W, PAD_H);
    const d = img.data;
    let minX = PAD_W, minY = PAD_H, maxX = 0, maxY = 0;
    for (let y = 0; y < PAD_H; y++) {
      for (let x = 0; x < PAD_W; x++) {
        const i = (y * PAD_W + x) * 4;
        const isWhite = d[i] > 245 && d[i + 1] > 245 && d[i + 2] > 245;
        if (isWhite) {
          d[i + 3] = 0;
        } else {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    if (maxX <= minX || maxY <= minY) return "";
    const pad2 = 8;
    minX = Math.max(0, minX - pad2);
    minY = Math.max(0, minY - pad2);
    maxX = Math.min(PAD_W, maxX + pad2);
    maxY = Math.min(PAD_H, maxY + pad2);

    const tmp = document.createElement("canvas");
    tmp.width = PAD_W;
    tmp.height = PAD_H;
    tmp.getContext("2d")!.putImageData(img, 0, 0);

    const cropped = document.createElement("canvas");
    cropped.width = maxX - minX;
    cropped.height = maxY - minY;
    cropped.getContext("2d")!.drawImage(tmp, minX, minY, maxX - minX, maxY - minY, 0, 0, maxX - minX, maxY - minY);
    return cropped.toDataURL("image/png");
  }

  // PDF sayfa önizlemesi
  useEffect(() => {
    if (!file) return;
    let cancelled = false;
    (async () => {
      try {
        setError("");
        const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
        pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        const data = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data }).promise;
        if (cancelled) return;
        setPageCount(pdf.numPages);
        const page = await pdf.getPage(Math.min(pageNum, pdf.numPages));
        const viewport = page.getViewport({ scale: 1.2 });
        const canvas = previewRef.current;
        if (!canvas) return;
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        await page.render({ canvasContext: ctx, viewport, canvas }).promise;
      } catch {
        if (!cancelled) setError(l.loadError);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, pageNum]);

  const onPreviewClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPlacement({
      xr: (e.clientX - rect.left) / rect.width,
      yr: (e.clientY - rect.top) / rect.height,
    });
  };

  const applySignature = async () => {
    if (!file) return;
    if (!sigPreviewUrl) {
      alert(l.needSig);
      return;
    }
    if (!placement) {
      alert(l.needPlace);
      return;
    }
    setProcessing(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const pdfDoc = await PDFDocument.load(await file.arrayBuffer());
      const page = pdfDoc.getPage(pageNum - 1);
      const { width: pw, height: ph } = page.getSize();

      const pngBytes = await fetch(sigPreviewUrl).then((r) => r.arrayBuffer());
      const png = await pdfDoc.embedPng(pngBytes);

      const sigW = (sigWidthPct / 100) * pw;
      const sigH = sigW * (png.height / png.width);
      // Tıklanan nokta imzanın merkezi; PDF koordinatları sol-alt köşeden başlar.
      const x = placement.xr * pw - sigW / 2;
      const y = ph - placement.yr * ph - sigH / 2;

      page.drawImage(png, { x, y, width: sigW, height: sigH });

      const bytes = await pdfDoc.save();
      const blob = new Blob([bytes as unknown as ArrayBuffer], { type: "application/pdf" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = file.name.replace(/\.pdf$/i, "-signed.pdf");
      a.click();
      URL.revokeObjectURL(a.href);
      void trackToolUse("pdf-sign");
    } catch {
      setError(l.loadError);
    } finally {
      setProcessing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPageCount(0);
    setPageNum(1);
    setPlacement(null);
    setSigPreviewUrl("");
    hasStrokes.current = false;
    setError("");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href={localePath("/")} className="text-primary-600 hover:text-primary-700 text-sm">
          {l.back}
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">{l.title}</h1>
      <p className="text-gray-600 mb-8 max-w-3xl">{l.subtitle}</p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">{error}</div>
      )}

      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const f = e.dataTransfer.files?.[0];
            if (f && f.type === "application/pdf") setFile(f);
          }}
          className="border-2 border-dashed border-gray-300 hover:border-primary-400 rounded-2xl p-16 text-center cursor-pointer transition-colors bg-white"
        >
          <p className="text-gray-700 font-medium">{l.drop}</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) setFile(f);
            }}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="font-semibold text-gray-900 mb-3">{l.step1}</h2>
            <canvas
              ref={padRef}
              width={PAD_W}
              height={PAD_H}
              onPointerDown={startDraw}
              onPointerMove={moveDraw}
              onPointerUp={endDraw}
              onPointerLeave={endDraw}
              className="w-full border border-gray-200 rounded-xl bg-white touch-none cursor-crosshair shadow-sm"
            />
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <span className="text-sm text-gray-600">{l.penColor}:</span>
              <button
                onClick={() => setPenColor("black")}
                className={`w-7 h-7 rounded-full bg-black ${penColor === "black" ? "ring-2 ring-offset-2 ring-primary-500" : ""}`}
                aria-label={l.black}
              />
              <button
                onClick={() => setPenColor("#1d4ed8")}
                className={`w-7 h-7 rounded-full bg-blue-700 ${penColor !== "black" ? "ring-2 ring-offset-2 ring-primary-500" : ""}`}
                aria-label={l.blue}
              />
              <button onClick={clearPad} className="btn-secondary text-sm !py-1.5">
                {l.clearSig}
              </button>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {l.sigSize}: {sigWidthPct}%
              </label>
              <input
                type="range"
                min={10}
                max={60}
                value={sigWidthPct}
                onChange={(e) => setSigWidthPct(Number(e.target.value))}
                className="w-full max-w-xs"
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={applySignature} disabled={processing} className="btn-primary text-sm disabled:opacity-60">
                {processing ? l.processing : l.apply}
              </button>
              <button onClick={reset} className="btn-secondary text-sm">
                {l.reset}
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-gray-900">{l.step2}</h2>
              {pageCount > 1 && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  {l.page}
                  <input
                    type="number"
                    min={1}
                    max={pageCount}
                    value={pageNum}
                    onChange={(e) => {
                      setPageNum(Math.min(Math.max(1, Number(e.target.value)), pageCount));
                      setPlacement(null);
                    }}
                    className="w-16 p-1.5 bg-white border border-gray-200 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  {l.of} {pageCount}
                </div>
              )}
            </div>
            <p className="text-xs text-gray-400 mb-3">{l.placeHint}</p>
            <div className="relative inline-block border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white max-w-full">
              <canvas
                ref={previewRef}
                onClick={onPreviewClick}
                className="max-w-full h-auto cursor-crosshair block"
              />
              {placement && sigPreviewUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={sigPreviewUrl}
                  alt="signature preview"
                  className="absolute pointer-events-none"
                  style={{
                    left: `${placement.xr * 100}%`,
                    top: `${placement.yr * 100}%`,
                    width: `${sigWidthPct}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
