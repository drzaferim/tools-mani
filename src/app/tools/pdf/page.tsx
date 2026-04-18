"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import type { TranslationKey } from "@/lib/translations";

const pdfTools: { nameKey: TranslationKey; descKey: TranslationKey; href: string; icon: string; color: string }[] = [
  { nameKey: "pdf.merge.name", descKey: "pdf.merge.desc", href: "/tools/pdf-merge", icon: "&#128196;", color: "bg-blue-50 border-blue-200 hover:border-blue-400" },
  { nameKey: "pdf.split.name", descKey: "pdf.split.desc", href: "/tools/pdf-split", icon: "&#9986;", color: "bg-orange-50 border-orange-200 hover:border-orange-400" },
  { nameKey: "pdf.compress.name", descKey: "pdf.compress.desc", href: "/tools/pdf-compress", icon: "&#128230;", color: "bg-green-50 border-green-200 hover:border-green-400" },
  { nameKey: "pdf.rotate.name", descKey: "pdf.rotate.desc", href: "/tools/pdf-rotate", icon: "&#128260;", color: "bg-purple-50 border-purple-200 hover:border-purple-400" },
  { nameKey: "pdf.pages.name", descKey: "pdf.pages.desc", href: "/tools/pdf-pages", icon: "&#128209;", color: "bg-indigo-50 border-indigo-200 hover:border-indigo-400" },
  { nameKey: "pdf.watermark.name", descKey: "pdf.watermark.desc", href: "/tools/pdf-watermark", icon: "&#128167;", color: "bg-cyan-50 border-cyan-200 hover:border-cyan-400" },
  { nameKey: "pdf.pagenumber.name", descKey: "pdf.pagenumber.desc", href: "/tools/pdf-pagenumber", icon: "&#128290;", color: "bg-amber-50 border-amber-200 hover:border-amber-400" },
  { nameKey: "tool.pdfToImage", descKey: "tool.pdfToImage.desc", href: "/tools/pdf-to-image", icon: "&#128247;", color: "bg-rose-50 border-rose-200 hover:border-rose-400" },
  { nameKey: "tool.imageToPdf", descKey: "tool.imageToPdf.desc", href: "/tools/image-to-pdf", icon: "&#128444;", color: "bg-teal-50 border-teal-200 hover:border-teal-400" },
];

export default function PdfHubPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href="/" className="text-primary-600 hover:text-primary-700 text-sm">
          &larr; {t("pdfHub.backToAll")}
        </Link>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("pdfHub.title")}</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">{t("pdfHub.subtitle")}</p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-sm font-medium px-4 py-2 rounded-full border border-green-200">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            {t("pdfHub.noLimit")}
          </span>
          <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-2 rounded-full border border-blue-200">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            {t("pdfHub.browserBased")}
          </span>
          <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 text-sm font-medium px-4 py-2 rounded-full border border-purple-200">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            {t("pdfHub.private")}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pdfTools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className={`block rounded-2xl border-2 p-6 transition-all duration-200 hover:shadow-md ${tool.color}`}
          >
            <div className="text-3xl mb-3" dangerouslySetInnerHTML={{ __html: tool.icon }} />
            <h2 className="text-lg font-bold text-gray-900 mb-2">{t(tool.nameKey)}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{t(tool.descKey)}</p>
          </Link>
        ))}
      </div>

      <div className="mt-16 bg-gray-50 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">{t("pdfHub.whyTitle")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">{t("pdfHub.why1Title")}</h3>
            <p className="text-sm text-gray-600">{t("pdfHub.why1Desc")}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">{t("pdfHub.why2Title")}</h3>
            <p className="text-sm text-gray-600">{t("pdfHub.why2Desc")}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">{t("pdfHub.why3Title")}</h3>
            <p className="text-sm text-gray-600">{t("pdfHub.why3Desc")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
