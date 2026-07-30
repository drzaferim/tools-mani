"use client";

import { useState, useRef, useEffect } from "react";
import QRCode from "qrcode";
import { useLanguage, pick } from "@/lib/language-context";
import Link from "next/link";
import { useTrackToolUseOnce } from "@/lib/track";

const labels = {
  en: {
    back: "← Back to Tools",
    title: "QR Code Generator",
    subtitle: "Generate QR codes for URLs, text, and more. Free and instant.",
    inputLabel: "Enter text or URL",
    placeholder: "https://example.com or any text...",
    size: "Size",
    download: "Download PNG",
    clear: "Clear",
    emptyHint: "Enter text to generate QR",
    alt: "Generated QR Code",
    faqTitle: "Frequently Asked Questions",
    faq: [
      {
        q: "What types of QR codes can I generate?",
        a: "The generator encodes any text you enter. That covers URLs, plain text, and — if you type them in the standard format — email addresses (mailto:), phone numbers (tel:), SMS and Wi-Fi credentials.",
      },
      {
        q: "What file format can I download?",
        a: "The QR code is downloaded as a PNG image. You can pick the resolution with the size slider before downloading.",
      },
      {
        q: "Is there a limit on how many QR codes I can generate?",
        a: "No. You can generate as many QR codes as you need, completely free.",
      },
      {
        q: "Are my QR codes stored anywhere?",
        a: "No. QR codes are generated locally in your browser. Nothing is sent to any server.",
      },
    ],
  },
  tr: {
    back: "← Araçlara Dön",
    title: "QR Kod Üretici",
    subtitle: "URL'ler, metinler ve daha fazlası için QR kodu üretin. Ücretsiz ve anında.",
    inputLabel: "Metin veya URL girin",
    placeholder: "https://ornek.com veya herhangi bir metin...",
    size: "Boyut",
    download: "PNG İndir",
    clear: "Temizle",
    emptyHint: "QR üretmek için metin girin",
    alt: "Üretilen QR Kodu",
    faqTitle: "Sık Sorulan Sorular",
    faq: [
      {
        q: "Hangi tür QR kodları oluşturabilirim?",
        a: "Üretici, girdiğiniz her metni kodlar. Bu; URL'leri, düz metni ve standart biçimde yazmanız hâlinde e-posta adreslerini (mailto:), telefon numaralarını (tel:), SMS ve Wi-Fi bilgilerini kapsar.",
      },
      {
        q: "Hangi dosya formatında indirebilirim?",
        a: "QR kodu PNG resim olarak indirilir. İndirmeden önce boyut kaydırıcısıyla çözünürlüğü seçebilirsiniz.",
      },
      {
        q: "Oluşturabileceğim QR kodu sayısında sınır var mı?",
        a: "Hayır. İstediğiniz kadar QR kodu tamamen ücretsiz olarak oluşturabilirsiniz.",
      },
      {
        q: "QR kodlarım herhangi bir yerde saklanıyor mu?",
        a: "Hayır. QR kodları tarayıcınızda yerel olarak oluşturulur. Hiçbir şey sunucuya gönderilmez.",
      },
    ],
  },
  es: {
    back: "← Volver a las herramientas",
    title: "Generador de códigos QR",
    subtitle: "Genera códigos QR para URL, texto y más. Gratis e instantáneo.",
    inputLabel: "Introduce texto o URL",
    placeholder: "https://ejemplo.com o cualquier texto...",
    size: "Tamaño",
    download: "Descargar PNG",
    clear: "Limpiar",
    emptyHint: "Introduce texto para generar el QR",
    alt: "Código QR generado",
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿Qué tipos de códigos QR puedo generar?",
        a: "El generador codifica cualquier texto que introduzcas. Eso incluye URL, texto plano y, si los escribes en el formato estándar, direcciones de correo (mailto:), teléfonos (tel:), SMS y credenciales Wi-Fi.",
      },
      {
        q: "¿En qué formato puedo descargarlo?",
        a: "El código QR se descarga como imagen PNG. Puedes elegir la resolución con el control de tamaño antes de descargar.",
      },
      {
        q: "¿Hay un límite de códigos QR que puedo generar?",
        a: "No. Puedes generar todos los códigos QR que necesites, totalmente gratis.",
      },
      {
        q: "¿Se guardan mis códigos QR en algún sitio?",
        a: "No. Los códigos QR se generan localmente en tu navegador. No se envía nada a ningún servidor.",
      },
    ],
  },
  de: {
    back: "← Zurück zu den Tools",
    title: "QR-Code-Generator",
    subtitle: "QR-Codes für URLs, Text und mehr erzeugen. Kostenlos und sofort.",
    inputLabel: "Text oder URL eingeben",
    placeholder: "https://beispiel.de oder beliebiger Text...",
    size: "Größe",
    download: "PNG herunterladen",
    clear: "Leeren",
    emptyHint: "Text eingeben, um den QR-Code zu erzeugen",
    alt: "Erzeugter QR-Code",
    faqTitle: "Häufig gestellte Fragen",
    faq: [
      {
        q: "Welche Arten von QR-Codes kann ich erzeugen?",
        a: "Der Generator kodiert jeden eingegebenen Text. Das umfasst URLs, Klartext und – bei Eingabe im Standardformat – E-Mail-Adressen (mailto:), Telefonnummern (tel:), SMS und WLAN-Zugangsdaten.",
      },
      {
        q: "In welchem Dateiformat kann ich herunterladen?",
        a: "Der QR-Code wird als PNG-Bild heruntergeladen. Die Auflösung wählen Sie vorher über den Größenregler.",
      },
      {
        q: "Gibt es ein Limit für die Anzahl der QR-Codes?",
        a: "Nein. Sie können beliebig viele QR-Codes erzeugen, vollständig kostenlos.",
      },
      {
        q: "Werden meine QR-Codes irgendwo gespeichert?",
        a: "Nein. QR-Codes werden lokal in Ihrem Browser erzeugt. Es wird nichts an einen Server gesendet.",
      },
    ],
  },
  pt: {
    back: "← Voltar às ferramentas",
    title: "Gerador de QR Code",
    subtitle: "Gere QR codes para URLs, textos e mais. Grátis e instantâneo.",
    inputLabel: "Digite o texto ou URL",
    placeholder: "https://exemplo.com ou qualquer texto...",
    size: "Tamanho",
    download: "Baixar PNG",
    clear: "Limpar",
    emptyHint: "Digite um texto para gerar o QR",
    alt: "QR Code gerado",
    faqTitle: "Perguntas frequentes",
    faq: [
      {
        q: "Que tipos de QR code posso gerar?",
        a: "O gerador codifica qualquer texto digitado. Isso inclui URLs, texto simples e, se digitados no formato padrão, e-mails (mailto:), telefones (tel:), SMS e credenciais de Wi-Fi.",
      },
      {
        q: "Em qual formato posso baixar?",
        a: "O QR code é baixado como imagem PNG. Você escolhe a resolução no controle de tamanho antes de baixar.",
      },
      {
        q: "Existe limite de quantos QR codes posso gerar?",
        a: "Não. Você pode gerar quantos QR codes precisar, totalmente grátis.",
      },
      {
        q: "Meus QR codes ficam armazenados em algum lugar?",
        a: "Não. Os QR codes são gerados localmente no seu navegador. Nada é enviado para nenhum servidor.",
      },
    ],
  },
  fr: {
    back: "← Retour aux outils",
    title: "Générateur de QR code",
    subtitle: "Générez des QR codes pour vos URL, textes et plus. Gratuit et instantané.",
    inputLabel: "Saisissez un texte ou une URL",
    placeholder: "https://exemple.com ou n'importe quel texte...",
    size: "Taille",
    download: "Télécharger le PNG",
    clear: "Effacer",
    emptyHint: "Saisissez un texte pour générer le QR",
    alt: "QR code généré",
    faqTitle: "Questions fréquentes",
    faq: [
      {
        q: "Quels types de QR codes puis-je générer ?",
        a: "Le générateur encode tout texte saisi : URL, texte brut et, si vous les saisissez au format standard, adresses e-mail (mailto:), numéros de téléphone (tel:), SMS et identifiants Wi-Fi.",
      },
      {
        q: "Dans quel format puis-je télécharger ?",
        a: "Le QR code est téléchargé au format image PNG. Choisissez la résolution avec le curseur de taille avant de télécharger.",
      },
      {
        q: "Y a-t-il une limite au nombre de QR codes ?",
        a: "Non. Vous pouvez générer autant de QR codes que nécessaire, entièrement gratuitement.",
      },
      {
        q: "Mes QR codes sont-ils stockés quelque part ?",
        a: "Non. Les QR codes sont générés localement dans votre navigateur. Rien n'est envoyé à un serveur.",
      },
    ],
  },
};

export default function QrGeneratorPage() {
  const { locale, localePath } = useLanguage();
  const l = pick(labels, locale);
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
          href={localePath("/")}
          className="text-primary-600 hover:text-primary-700 text-sm"
        >
          {l.back}
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">{l.title}</h1>
      <p className="text-gray-600 mb-8">{l.subtitle}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {l.inputLabel}
          </label>
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (e.target.value.trim()) {
                markToolUsed();
              }
            }}
            placeholder={l.placeholder}
            className="w-full h-32 p-4 bg-white border border-gray-200 rounded-xl resize-y focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {l.size}: {size}x{size}
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
              {l.download}
            </button>
            <button
              onClick={() => setText("")}
              className="btn-secondary text-sm"
            >
              {l.clear}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            {qrUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={qrUrl}
                alt={l.alt}
                width={size}
                height={size}
                className="max-w-full"
              />
            ) : (
              <div
                className="flex items-center justify-center text-gray-300 border-2 border-dashed border-gray-200 rounded-xl"
                style={{ width: size, height: size, maxWidth: "100%" }}
              >
                <span className="text-sm">{l.emptyHint}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {/* FAQ */}
      <div className="mt-16 border-t border-gray-100 pt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{l.faqTitle}</h2>
        <div className="space-y-5">
          {l.faq.map(({ q, a }, i) => (
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
