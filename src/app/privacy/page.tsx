"use client";

import { useLanguage } from "@/lib/language-context";

const content = {
  en: {
    title: "Privacy Policy",
    updated: "Last updated: July 14, 2026",
    sections: [
      {
        h: "The short version",
        p: [
          "Your files never leave your device. Every tool on ToolsMani (PDF merge, image compression, converters and the rest) runs entirely inside your browser using JavaScript. Nothing you open in a tool is uploaded to, stored on, or visible to our servers.",
          "We collect only minimal, mostly anonymous usage data to understand which tools are useful and to keep the site working well. We never sell data to anyone.",
        ],
      },
      {
        h: "What we do NOT collect",
        p: [
          "We do not collect or store your files or their contents. We do not require an account, so we hold no names, passwords or profiles. We do not collect payment information — the site is free.",
        ],
      },
      {
        h: "What we do collect",
        p: [
          "Analytics: we use Google Analytics 4 to measure page visits and tool usage (for example, that the PDF merge tool was used, never what was in the PDF). Google Analytics sets cookies and may process your IP address and device information according to Google's own privacy policy.",
          "Anonymous tool counters: when a tool is used we increase a daily counter (e.g. \"pdf-merge: +1\") in our database. This number contains no personal data whatsoever.",
          "Feedback: if you use the feedback or contact form, we store the message you write, the page it was sent from and your language preference. The form is anonymous unless you choose to include contact details in your message.",
        ],
      },
      {
        h: "Cookies",
        p: [
          "We use cookies only for Google Analytics measurement and a single localStorage key that remembers your language choice. You can block cookies in your browser settings; the tools will keep working normally.",
        ],
      },
      {
        h: "Third-party services",
        p: [
          "Google Analytics (usage measurement), Google Fonts (font delivery), and Firebase Hosting and Firestore by Google (site hosting and storage of anonymous counters and feedback). Each processes data under its own privacy policy. No tool sends your content to any third-party service — all processing, including QR code generation, happens locally in your browser.",
        ],
      },
      {
        h: "Data retention & your rights",
        p: [
          "Analytics data is retained according to Google Analytics defaults. Feedback messages are kept until they have been read and acted upon, then may be deleted. Since we hold no account data about you, there is usually nothing personal for us to delete — but if you believe we hold something related to you (for example a feedback message with your email), contact us via the contact page and we will remove it.",
        ],
      },
      {
        h: "Changes to this policy",
        p: [
          "If we change how the site handles data (for example, if we ever introduce advertising), we will update this page and the date at the top before the change takes effect.",
        ],
      },
    ],
  },
  tr: {
    title: "Gizlilik Politikası",
    updated: "Son güncelleme: 14 Temmuz 2026",
    sections: [
      {
        h: "Kısa özet",
        p: [
          "Dosyalarınız cihazınızdan asla çıkmaz. ToolsMani'deki her araç (PDF birleştirme, resim sıkıştırma, dönüştürücüler ve diğerleri) tamamen tarayıcınızın içinde JavaScript ile çalışır. Bir araçta açtığınız hiçbir şey sunucularımıza yüklenmez, saklanmaz ve bizim tarafımızdan görülemez.",
          "Yalnızca hangi araçların işe yaradığını anlamak ve siteyi düzgün çalıştırmak için asgari düzeyde, çoğunlukla anonim kullanım verisi toplarız. Verilerinizi hiç kimseye satmayız.",
        ],
      },
      {
        h: "Toplamadıklarımız",
        p: [
          "Dosyalarınızı veya içeriklerini toplamayız ve saklamayız. Hesap gerektirmediğimiz için isim, şifre veya profil tutmayız. Site ücretsiz olduğu için ödeme bilgisi toplamayız.",
        ],
      },
      {
        h: "Topladıklarımız",
        p: [
          "Analitik: sayfa ziyaretlerini ve araç kullanımını ölçmek için Google Analytics 4 kullanırız (örneğin PDF birleştirme aracının kullanıldığını görürüz; PDF'in içinde ne olduğunu asla göremeyiz). Google Analytics çerez kullanır ve IP adresinizi ve cihaz bilgilerinizi Google'ın kendi gizlilik politikasına göre işleyebilir.",
          "Anonim araç sayaçları: bir araç kullanıldığında veritabanımızdaki günlük bir sayacı artırırız (örn. \"pdf-merge: +1\"). Bu sayı hiçbir kişisel veri içermez.",
          "Geri bildirim: geri bildirim veya iletişim formunu kullanırsanız yazdığınız mesajı, gönderildiği sayfayı ve dil tercihinizi saklarız. Mesajınıza iletişim bilgisi eklemediğiniz sürece form anonimdir.",
        ],
      },
      {
        h: "Çerezler",
        p: [
          "Çerezleri yalnızca Google Analytics ölçümü için kullanırız; ayrıca dil seçiminizi hatırlayan tek bir localStorage kaydı vardır. Tarayıcı ayarlarınızdan çerezleri engelleyebilirsiniz; araçlar normal çalışmaya devam eder.",
        ],
      },
      {
        h: "Üçüncü taraf servisler",
        p: [
          "Google Analytics (kullanım ölçümü), Google Fonts (yazı tipi) ve Google Firebase Hosting ile Firestore (site barındırma, anonim sayaçların ve geri bildirimlerin saklanması). Her biri veriyi kendi gizlilik politikasına göre işler. Hiçbir araç içeriğinizi üçüncü taraf bir servise göndermez — QR kod üretimi dahil tüm işlemler tarayıcınızda yerel olarak yapılır.",
        ],
      },
      {
        h: "Veri saklama ve haklarınız",
        p: [
          "Analitik veriler Google Analytics varsayılanlarına göre saklanır. Geri bildirim mesajları okunup gereği yapılana kadar tutulur, sonrasında silinebilir. Hakkınızda hesap verisi tutmadığımız için genellikle silinecek kişisel bir şey yoktur — ancak sizinle ilişkili bir veri tuttuğumuzu düşünüyorsanız (örneğin e-postanızı içeren bir geri bildirim mesajı) iletişim sayfasından bize ulaşın, kaldıralım.",
        ],
      },
      {
        h: "Bu politikadaki değişiklikler",
        p: [
          "Sitenin veri işleme biçimi değişirse (örneğin ileride reklam eklersek), değişiklik yürürlüğe girmeden önce bu sayfayı ve üstteki tarihi güncelleriz.",
        ],
      },
    ],
  },
};

export default function PrivacyPage() {
  const { locale } = useLanguage();
  const c = content[locale];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{c.title}</h1>
      <p className="text-sm text-gray-400 mb-10">{c.updated}</p>

      <div className="space-y-8">
        {c.sections.map((s) => (
          <section key={s.h}>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{s.h}</h2>
            {s.p.map((para, i) => (
              <p key={i} className="text-gray-600 leading-relaxed mb-3">
                {para}
              </p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
