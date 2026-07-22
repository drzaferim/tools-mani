"use client";

import Link from "next/link";
import { useLanguage, pick } from "@/lib/language-context";

const content = {
  en: {
    title: "About ToolsMani",
    intro:
      "ToolsMani is a collection of free online tools for everyday file and text tasks: merging and splitting PDFs, compressing images, generating QR codes, formatting JSON and more. No sign-up, no limits, no cost.",
    privacyTitle: "Privacy comes first",
    privacyText:
      "Every tool on ToolsMani runs entirely in your browser. When you merge a PDF or compress an image, the file is processed on your own device — it is never uploaded to a server. We simply cannot see your files, and that is by design.",
    freeTitle: "Free means free",
    freeText:
      "All tools are free with no usage limits and no locked features. We keep costs near zero by serving a static site and doing all computation client-side, so we don't need to charge you to cover infrastructure.",
    ethicsTitle: "Ethical by principle",
    ethicsText:
      "ToolsMani is run as an ethical project: no dark patterns, no selling of user data, no misleading buttons and no paywalls that appear after you've done the work. If we ever show ads, they will be clearly marked and never disguised as tool functions.",
    ctaTitle: "Try the tools",
    ctaText: "Browse all tools and start using them instantly — no account needed.",
    ctaButton: "Browse All Tools",
  },
  tr: {
    title: "ToolsMani Hakkında",
    intro:
      "ToolsMani; PDF birleştirme ve bölme, resim sıkıştırma, QR kod oluşturma, JSON biçimlendirme gibi günlük dosya ve metin işleri için ücretsiz online araçlar sunar. Kayıt yok, limit yok, ücret yok.",
    privacyTitle: "Önce gizlilik",
    privacyText:
      "ToolsMani'deki her araç tamamen tarayıcınızda çalışır. Bir PDF birleştirdiğinizde veya resim sıkıştırdığınızda dosya kendi cihazınızda işlenir — hiçbir sunucuya yüklenmez. Dosyalarınızı görmemiz teknik olarak mümkün değildir; sistem bilinçli olarak böyle tasarlandı.",
    freeTitle: "Ücretsiz gerçekten ücretsiz",
    freeText:
      "Tüm araçlar limitsiz ve kilitli özellik olmadan ücretsizdir. Statik bir site sunup tüm hesaplamayı istemci tarafında yaptığımız için maliyetimiz sıfıra yakındır; bu yüzden sizden ücret almamız gerekmez.",
    ethicsTitle: "İlkeli ve etik",
    ethicsText:
      "ToolsMani etik bir proje olarak yürütülür: karanlık desen yok, kullanıcı verisi satışı yok, yanıltıcı düğme yok, iş bittikten sonra karşınıza çıkan ödeme duvarı yok. Bir gün reklam gösterirsek açıkça işaretlenecek ve asla araç işlevi gibi gizlenmeyecektir.",
    ctaTitle: "Araçları deneyin",
    ctaText: "Tüm araçlara göz atın ve hesap açmadan hemen kullanmaya başlayın.",
    ctaButton: "Tüm Araçlar",
  },
};

export default function AboutPage() {
  const { locale } = useLanguage();
  const c = pick(content, locale);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">{c.title}</h1>
      <p className="text-lg text-gray-600 leading-relaxed mb-10">{c.intro}</p>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{c.privacyTitle}</h2>
          <p className="text-gray-600 leading-relaxed">{c.privacyText}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{c.freeTitle}</h2>
          <p className="text-gray-600 leading-relaxed">{c.freeText}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{c.ethicsTitle}</h2>
          <p className="text-gray-600 leading-relaxed">{c.ethicsText}</p>
        </section>
      </div>

      <div className="mt-12 bg-primary-50 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{c.ctaTitle}</h2>
        <p className="text-gray-600 mb-6">{c.ctaText}</p>
        <Link href="/#tools" className="btn-primary inline-block">
          {c.ctaButton}
        </Link>
      </div>
    </div>
  );
}
