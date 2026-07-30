"use client";
import { trackToolUse } from "@/lib/track";

import { useState, useRef } from "react";
import Link from "next/link";
import { useLanguage, pick } from "@/lib/language-context";

const faqTitle = {
  en: "Frequently Asked Questions", tr: "Sık Sorulan Sorular", es: "Preguntas frecuentes", de: "Häufig gestellte Fragen", pt: "Perguntas frequentes", fr: "Questions fréquentes",
};

const faq = {
  en: [
    { q: "Is there a file size limit for merging PDFs?", a: "No. ToolsMani processes everything in your browser, so there is no server-side file size limit. You can merge PDFs of any size as long as your device has enough memory." },
    { q: "Are my PDF files uploaded to a server?", a: "Never. Your files stay 100% on your device. All merging happens locally using the pdf-lib library running in your browser. Nothing is sent over the internet." },
    { q: "How many PDF files can I merge at once?", a: "There is no hard limit. You can add as many PDFs as you need. Very large batches may take longer depending on your device." },
    { q: "Can I reorder the PDF files before merging?", a: "Yes. Use the arrow buttons next to each file to move it up or down. The final merged PDF will follow the order shown." },
    { q: "Does PDF merging work on mobile?", a: "Yes. The tool works on any modern browser including mobile browsers on iOS and Android. Large files may be slower on older devices." },
  ],
  tr: [
    { q: "PDF birleştirmede dosya boyutu sınırı var mı?", a: "Hayır. ToolsMani tüm işlemleri tarayıcınızda gerçekleştirir, herhangi bir sunucu taraflı boyut sınırı yoktur. Cihazınızın belleği yettiği sürece istediğiniz boyuttaki PDF'leri birleştirebilirsiniz." },
    { q: "PDF dosyalarım bir sunucuya yükleniyor mu?", a: "Kesinlikle hayır. Dosyalarınız %100 cihazınızda kalır. Tüm birleştirme işlemi tarayıcınızda çalışan pdf-lib kütüphanesi kullanılarak yerel olarak gerçekleşir." },
    { q: "Aynı anda kaç PDF dosyasını birleştirebilirim?", a: "Dosya sayısı konusunda sabit bir sınır yoktur. İhtiyacınız olan kadar PDF ekleyebilirsiniz. Çok büyük grupların işlenmesi cihazınıza bağlı olarak daha uzun sürebilir." },
    { q: "Birleştirmeden önce PDF dosyalarını yeniden sıralayabilir miyim?", a: "Evet. Her dosyanın yanındaki ok düğmelerini kullanarak yukarı veya aşağı taşıyabilirsiniz. Nihai PDF gösterilen sırayı takip eder." },
    { q: "PDF birleştirme mobil cihazlarda çalışır mı?", a: "Evet. Araç, iOS ve Android dahil tüm modern tarayıcılarda çalışır. Büyük dosyalar eski cihazlarda daha yavaş olabilir." },
  ],
  es: [
    { q: "¿Hay un límite de tamaño para unir PDF?", a: "No. ToolsMani procesa todo en tu navegador, así que no hay ningún límite de tamaño impuesto por un servidor. Puedes unir PDF de cualquier tamaño mientras tu dispositivo tenga memoria suficiente." },
    { q: "¿Se suben mis archivos PDF a un servidor?", a: "Nunca. Tus archivos permanecen al 100% en tu dispositivo. Toda la unión se realiza localmente con la biblioteca pdf-lib ejecutándose en tu navegador. No se envía nada por internet." },
    { q: "¿Cuántos archivos PDF puedo unir a la vez?", a: "No hay un límite fijo. Puedes añadir tantos PDF como necesites. Los lotes muy grandes pueden tardar más según tu dispositivo." },
    { q: "¿Puedo reordenar los archivos antes de unirlos?", a: "Sí. Usa los botones de flecha junto a cada archivo para subirlo o bajarlo. El PDF final seguirá el orden mostrado." },
    { q: "¿Funciona la unión de PDF en el móvil?", a: "Sí. La herramienta funciona en cualquier navegador moderno, incluidos los móviles con iOS y Android. Los archivos grandes pueden ir más lentos en dispositivos antiguos." },
  ],
  de: [
    { q: "Gibt es eine Größenbeschränkung beim Zusammenführen von PDFs?", a: "Nein. ToolsMani verarbeitet alles in Ihrem Browser, daher gibt es keine serverseitige Größenbeschränkung. Sie können PDFs beliebiger Größe zusammenführen, solange Ihr Gerät genügend Arbeitsspeicher hat." },
    { q: "Werden meine PDF-Dateien auf einen Server hochgeladen?", a: "Niemals. Ihre Dateien bleiben zu 100% auf Ihrem Gerät. Das Zusammenführen erfolgt lokal mit der Bibliothek pdf-lib in Ihrem Browser. Es wird nichts über das Internet gesendet." },
    { q: "Wie viele PDF-Dateien kann ich auf einmal zusammenführen?", a: "Es gibt keine feste Grenze. Sie können so viele PDFs hinzufügen, wie Sie benötigen. Sehr große Stapel können je nach Gerät länger dauern." },
    { q: "Kann ich die Reihenfolge der PDFs vor dem Zusammenführen ändern?", a: "Ja. Verschieben Sie die Dateien mit den Pfeiltasten daneben nach oben oder unten. Das fertige PDF folgt der angezeigten Reihenfolge." },
    { q: "Funktioniert das Zusammenführen auf Mobilgeräten?", a: "Ja. Das Tool läuft in jedem modernen Browser, auch auf Mobilgeräten mit iOS und Android. Große Dateien können auf älteren Geräten langsamer sein." },
  ],
  pt: [
    { q: "Existe limite de tamanho para juntar PDFs?", a: "Não. O ToolsMani processa tudo no seu navegador, então não há limite de tamanho imposto por servidor. Você pode juntar PDFs de qualquer tamanho, desde que seu dispositivo tenha memória suficiente." },
    { q: "Meus arquivos PDF são enviados para um servidor?", a: "Nunca. Seus arquivos ficam 100% no seu dispositivo. Toda a junção acontece localmente com a biblioteca pdf-lib rodando no seu navegador. Nada é enviado pela internet." },
    { q: "Quantos arquivos PDF posso juntar de uma vez?", a: "Não há limite fixo. Você pode adicionar quantos PDFs precisar. Lotes muito grandes podem demorar mais dependendo do seu dispositivo." },
    { q: "Posso reordenar os arquivos antes de juntar?", a: "Sim. Use os botões de seta ao lado de cada arquivo para movê-lo para cima ou para baixo. O PDF final seguirá a ordem exibida." },
    { q: "A junção de PDF funciona no celular?", a: "Sim. A ferramenta funciona em qualquer navegador moderno, incluindo os de celular no iOS e Android. Arquivos grandes podem ficar mais lentos em aparelhos antigos." },
  ],
  fr: [
    { q: "Y a-t-il une limite de taille pour fusionner des PDF ?", a: "Non. ToolsMani traite tout dans votre navigateur, il n'y a donc aucune limite de taille imposée par un serveur. Vous pouvez fusionner des PDF de n'importe quelle taille tant que votre appareil dispose de assez de mémoire." },
    { q: "Mes fichiers PDF sont-ils envoyés à un serveur ?", a: "Jamais. Vos fichiers restent à 100% sur votre appareil. Toute la fusion se fait localement avec la bibliothèque pdf-lib exécutée dans votre navigateur. Rien n'est envoyé sur Internet." },
    { q: "Combien de fichiers PDF puis-je fusionner à la fois ?", a: "Il n'y a pas de limite stricte. Vous pouvez ajouter autant de PDF que nécessaire. Les très gros lots peuvent prendre plus de temps selon votre appareil." },
    { q: "Puis-je réordonner les fichiers avant la fusion ?", a: "Oui. Utilisez les flèches à côté de chaque fichier pour le monter ou le descendre. Le PDF final suivra l'ordre affiché." },
    { q: "La fusion de PDF fonctionne-t-elle sur mobile ?", a: "Oui. L'outil fonctionne dans tout navigateur moderne, y compris sur mobile sous iOS et Android. Les gros fichiers peuvent être plus lents sur les appareils anciens." },
  ],
};

export default function PdfMergePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [merging, setMerging] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t, locale } = useLanguage();

  const addFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    const pdfs = Array.from(newFiles).filter(f => f.type === "application/pdf");
    if (pdfs.length === 0) { setError(t("error.pdfOnly")); return; }
    setFiles(prev => [...prev, ...pdfs]);
    setError("");
  };

  const removeFile = (index: number) => setFiles(prev => prev.filter((_, i) => i !== index));

  const moveFile = (from: number, to: number) => {
    if (to < 0 || to >= files.length) return;
    const updated = [...files];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setFiles(updated);
  };

  const mergePdfs = async () => {
    if (files.length < 2) { setError(t("pdfMerge.errorMin")); return; }
    setMerging(true); setError(""); setProgress(10);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const mergedPdf = await PDFDocument.create();
      setProgress(20);
      for (let i = 0; i < files.length; i++) {
        const bytes = await files[i].arrayBuffer();
        const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach(page => mergedPdf.addPage(page));
        setProgress(20 + Math.round(((i + 1) / files.length) * 70));
      }
      const mergedBytes = await mergedPdf.save();
      setProgress(95);
      const blob = new Blob([mergedBytes as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = "merged.pdf"; a.click();
      URL.revokeObjectURL(url); setProgress(100);
      void trackToolUse("pdf-merge");
    } catch { setError(t("pdfMerge.error")); } finally { setMerging(false); }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  const totalSize = files.reduce((sum, f) => sum + f.size, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href="/tools/pdf" className="text-primary-600 hover:text-primary-700 text-sm">&larr; {t("pdf.backToPdf")}</Link>
      </div>
      <div className="flex items-start justify-between mb-2">
        <h1 className="text-3xl font-bold text-gray-900">{t("pdfMerge.title")}</h1>
        <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full border border-green-200">{t("pdf.noFileLimit")}</span>
      </div>
      <p className="text-gray-600 mb-8">{t("pdfMerge.subtitle")} {t("pdf.allBrowser")}</p>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">{error}</div>}

      <div
        className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-primary-400 transition-colors cursor-pointer mb-6"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
      >
        <div className="text-5xl mb-4">&#128196;</div>
        <p className="text-gray-700 font-semibold text-lg">{t("pdf.clickOrDragMultiple")}</p>
        <p className="text-gray-400 text-sm mt-2">{t("pdf.noLimitMultiple")}</p>
        <input ref={inputRef} type="file" accept=".pdf" multiple className="hidden" onChange={(e) => addFiles(e.target.files)} />
      </div>

      {files.length > 0 && (
        <>
          <p className="text-sm text-gray-500 mb-3">{files.length} {t("pdf.filesTotal")} — {formatSize(totalSize)} {t("pdf.total")}</p>
          <div className="space-y-2 mb-6">
            {files.map((file, i) => (
              <div key={i} className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-3">
                <span className="text-gray-400 text-sm w-6 text-center">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                  <p className="text-xs text-gray-400">{formatSize(file.size)}</p>
                </div>
                <button onClick={() => moveFile(i, i - 1)} disabled={i === 0} className="text-gray-400 hover:text-gray-600 disabled:opacity-30 text-sm">&#9650;</button>
                <button onClick={() => moveFile(i, i + 1)} disabled={i === files.length - 1} className="text-gray-400 hover:text-gray-600 disabled:opacity-30 text-sm">&#9660;</button>
                <button onClick={() => removeFile(i)} className="text-red-400 hover:text-red-600 text-sm">&#10005;</button>
              </div>
            ))}
          </div>

          {merging && (
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>{t("pdfMerge.merging")}...</span><span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-primary-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={mergePdfs} disabled={merging || files.length < 2} className="btn-primary text-sm disabled:opacity-50">
              {merging ? `${t("pdfMerge.merging")}...` : `${t("pdfMerge.merge")} ${files.length} ${t("pdfMerge.pdfs")}`}
            </button>
            <button onClick={() => setFiles([])} className="btn-secondary text-sm">{t("pdf.clearAll")}</button>
          </div>
        </>
      )}


      {/* FAQ */}
      <div className="mt-16 border-t border-gray-100 pt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {pick(faqTitle, locale)}
        </h2>
        <div className="space-y-5">
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
