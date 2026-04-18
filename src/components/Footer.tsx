"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-gray-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-md shadow-primary-200/50">
                <span className="text-white font-bold text-sm">TM</span>
              </div>
              <span className="font-bold text-xl text-gray-900 tracking-tight">
                ToolsMani
              </span>
            </div>
            <p className="text-gray-500 max-w-md leading-relaxed">
              {t("footer.description")}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">{t("footer.pdfTools")}</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/tools/pdf-merge" className="hover:text-primary-600 transition-colors">{t("pdf.merge.name")}</Link></li>
              <li><Link href="/tools/pdf-split" className="hover:text-primary-600 transition-colors">{t("pdf.split.name")}</Link></li>
              <li><Link href="/tools/pdf-compress" className="hover:text-primary-600 transition-colors">{t("pdf.compress.name")}</Link></li>
              <li><Link href="/tools/pdf-rotate" className="hover:text-primary-600 transition-colors">{t("pdf.rotate.name")}</Link></li>
              <li><Link href="/tools/pdf-pages" className="hover:text-primary-600 transition-colors">{t("pdf.pages.name")}</Link></li>
              <li><Link href="/tools/pdf-watermark" className="hover:text-primary-600 transition-colors">{t("pdf.watermark.name")}</Link></li>
              <li><Link href="/tools/pdf-pagenumber" className="hover:text-primary-600 transition-colors">{t("pdf.pagenumber.name")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">{t("footer.otherTools")}</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/tools/text-counter" className="hover:text-primary-600 transition-colors">{t("tool.textCounter")}</Link></li>
              <li><Link href="/tools/json-formatter" className="hover:text-primary-600 transition-colors">{t("tool.jsonFormatter")}</Link></li>
              <li><Link href="/tools/qr-generator" className="hover:text-primary-600 transition-colors">{t("tool.qrGenerator")}</Link></li>
              <li><Link href="/tools/password-generator" className="hover:text-primary-600 transition-colors">{t("tool.passwordGenerator")}</Link></li>
              <li><Link href="/tools/image-compress" className="hover:text-primary-600 transition-colors">{t("tool.imageCompress")}</Link></li>
              <li><Link href="/tools/base64" className="hover:text-primary-600 transition-colors">{t("tool.base64")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-10 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} ToolsMani. {t("footer.rights")}</p>
          <p className="mt-1">{t("footer.tagline")}</p>
        </div>
      </div>
    </footer>
  );
}
