"use client";

import Link from "next/link";
import { useLanguage, pick } from "@/lib/language-context";
import type { Locale } from "@/lib/translations";

export interface ToolContentBlock {
  /** Aracın altında yer alan uzun tanıtım paragrafları */
  intro: string[];
  howToTitle: string;
  howToSteps: string[];
  featuresTitle: string;
  features: { title: string; desc: string }[];
  faqTitle: string;
  faq: { q: string; a: string }[];
  relatedTitle: string;
  related: { href: string; label: string }[];
}

/** Dil → içerik eşlemesi; eksik diller İngilizceye düşer. */
export type ToolContentMap = { en: ToolContentBlock } & Partial<
  Record<Locale, ToolContentBlock>
>;

const sectionHeadings: Record<Locale, { onThisPage: string }> = {
  en: { onThisPage: "About this tool" },
  tr: { onThisPage: "Bu araç hakkında" },
  es: { onThisPage: "Sobre esta herramienta" },
  de: { onThisPage: "Über dieses Tool" },
  pt: { onThisPage: "Sobre esta ferramenta" },
  fr: { onThisPage: "À propos de cet outil" },
};

/**
 * Araç sayfalarının altına eklenen SEO içerik bölümü:
 * tanıtım, nasıl kullanılır, öne çıkanlar, SSS ve ilgili araçlar.
 * FAQPage yapılandırılmış verisi de burada üretilir — statik export
 * sayesinde her dilin HTML'ine o dilin SSS'i gömülü çıkar.
 */
export function ToolContent({ content }: { content: ToolContentMap }) {
  const { locale, localePath } = useLanguage();
  const c = pick(content, locale);
  const h = sectionHeadings[locale] ?? sectionHeadings.en;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div className="mt-16 border-t border-gray-100 pt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Tanıtım */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{h.onThisPage}</h2>
        <div className="space-y-4 max-w-3xl">
          {c.intro.map((p, i) => (
            <p key={i} className="text-gray-600 leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Nasıl kullanılır */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">{c.howToTitle}</h2>
        <ol className="space-y-3 max-w-3xl">
          {c.howToSteps.map((step, i) => (
            <li key={i} className="flex gap-3.5">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary-100 text-primary-700 font-semibold text-sm flex items-center justify-center">
                {i + 1}
              </span>
              <span className="text-gray-600 leading-relaxed pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Öne çıkanlar */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">{c.featuresTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {c.features.map((f) => (
            <div key={f.title} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-1.5">{f.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SSS */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">{c.faqTitle}</h2>
        <div className="space-y-4 max-w-3xl">
          {c.faq.map((item, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* İlgili araçlar */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-5">{c.relatedTitle}</h2>
        <div className="flex flex-wrap gap-2.5">
          {c.related.map((r) => (
            <Link
              key={r.href}
              href={localePath(r.href)}
              className="px-4 py-2 bg-primary-50 text-primary-700 rounded-xl text-sm font-medium hover:bg-primary-100 transition-colors"
            >
              {r.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
