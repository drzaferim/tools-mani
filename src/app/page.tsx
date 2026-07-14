"use client";

import Link from "next/link";
import { tools, categories } from "@/lib/tools";
import { iconMap } from "@/lib/icon-map";
import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import type { TranslationKey } from "@/lib/translations";

const categoryKeys: Record<string, TranslationKey> = {
  all: "cat.all",
  pdf: "cat.pdf",
  text: "cat.text",
  developer: "cat.developer",
  generator: "cat.generator",
  file: "cat.file",
};

const toolNameKeys: Record<string, TranslationKey> = {
  "pdf-merge": "pdf.merge.name",
  "pdf-split": "pdf.split.name",
  "pdf-compress": "pdf.compress.name",
  "pdf-rotate": "pdf.rotate.name",
  "pdf-pages": "pdf.pages.name",
  "pdf-watermark": "pdf.watermark.name",
  "pdf-pagenumber": "pdf.pagenumber.name",
  "text-counter": "tool.textCounter",
  "json-formatter": "tool.jsonFormatter",
  "qr-generator": "tool.qrGenerator",
  "password-generator": "tool.passwordGenerator",
  "image-compress": "tool.imageCompress",
  base64: "tool.base64",
  "color-picker": "tool.colorPicker",
  "lorem-ipsum": "tool.loremIpsum",
  "markdown-preview": "tool.markdownPreview",
  "unit-converter": "tool.unitConverter",
  "image-convert": "tool.imageConvert",
  "pdf-to-image": "tool.pdfToImage",
  "image-to-pdf": "tool.imageToPdf",
  "heic-convert": "tool.heicConvert",
  "image-resize": "tool.imageResize",
  "uuid-generator": "tool.uuidGenerator",
};

const toolDescKeys: Record<string, TranslationKey> = {
  "pdf-merge": "pdf.merge.desc",
  "pdf-split": "pdf.split.desc",
  "pdf-compress": "pdf.compress.desc",
  "pdf-rotate": "pdf.rotate.desc",
  "pdf-pages": "pdf.pages.desc",
  "pdf-watermark": "pdf.watermark.desc",
  "pdf-pagenumber": "pdf.pagenumber.desc",
  "text-counter": "tool.textCounter.desc",
  "json-formatter": "tool.jsonFormatter.desc",
  "qr-generator": "tool.qrGenerator.desc",
  "password-generator": "tool.passwordGenerator.desc",
  "image-compress": "tool.imageCompress.desc",
  base64: "tool.base64.desc",
  "color-picker": "tool.colorPicker.desc",
  "lorem-ipsum": "tool.loremIpsum.desc",
  "markdown-preview": "tool.markdownPreview.desc",
  "unit-converter": "tool.unitConverter.desc",
  "image-convert": "tool.imageConvert.desc",
  "pdf-to-image": "tool.pdfToImage.desc",
  "image-to-pdf": "tool.imageToPdf.desc",
  "heic-convert": "tool.heicConvert.desc",
  "image-resize": "tool.imageResize.desc",
  "uuid-generator": "tool.uuidGenerator.desc",
};

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { t, locale, localePath } = useLanguage();

  const filteredTools = tools.filter(tool => {
    const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
    if (!searchQuery.trim()) return matchesCategory;
    const q = searchQuery.toLowerCase();
    return matchesCategory && (
      tool.name.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.id.toLowerCase().includes(q)
    );
  });

  return (
    <>
      {/* Hero Section */}
      <section className="hero-gradient hero-pattern relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-primary-200/60 rounded-full px-4 py-1.5 mb-8 shadow-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-700">{t("hero.badge")}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
            {t("hero.title1")}
            <br />
            <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-indigo-500 bg-clip-text text-transparent">
              {t("hero.title2")}
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={localePath("/tools/pdf")} className="btn-primary text-lg !px-8 !py-4">
              {t("hero.explorePdf")}
              <span className="ml-2 opacity-70">&rarr;</span>
            </Link>
            <Link href="#tools" className="btn-secondary text-lg !px-8 !py-4">
              {t("hero.exploreAll")}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 -mt-8 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="stat-card">
              <div className="text-3xl font-extrabold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">17+</div>
              <div className="text-gray-500 text-sm mt-1">{t("stats.tools")}</div>
            </div>
            <div className="stat-card">
              <div className="text-3xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-400 bg-clip-text text-transparent">7</div>
              <div className="text-gray-500 text-sm mt-1">{t("stats.pdfTools")}</div>
            </div>
            <div className="stat-card">
              <div className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-violet-400 bg-clip-text text-transparent">0</div>
              <div className="text-gray-500 text-sm mt-1">{t("stats.dataUploaded")}</div>
            </div>
            <div className="stat-card">
              <div className="text-3xl font-extrabold bg-gradient-to-r from-amber-500 to-orange-400 bg-clip-text text-transparent">Free</div>
              <div className="text-gray-500 text-sm mt-1">{t("stats.allTools")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              {t("tools.title")}
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto mb-6">
              {t("tools.subtitle")}
            </p>
            {/* Search Box */}
            <div className="relative max-w-md mx-auto">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={locale === "tr" ? "Araç ara... (ör. PDF, şifre, QR)" : "Search tools... (e.g. PDF, password, QR)"}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white shadow-sm"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`category-pill ${activeCategory === cat.id ? "category-pill-active" : "category-pill-inactive"}`}
              >
                {t(categoryKeys[cat.id])}
                {cat.id !== "all" && (
                  <span className="ml-1.5 text-xs opacity-60">
                    {tools.filter(tool => tool.category === cat.id).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTools.length === 0 && (
              <div className="col-span-3 text-center py-16 text-gray-400">
                <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-lg font-medium">{locale === "tr" ? `"${searchQuery}" için sonuç bulunamadı` : `No results for "${searchQuery}"`}</p>
                <button onClick={() => setSearchQuery("")} className="mt-3 text-primary-600 text-sm hover:underline">
                  {locale === "tr" ? "Aramayı temizle" : "Clear search"}
                </button>
              </div>
            )}
            {filteredTools.map((tool) => {
              const Icon = iconMap[tool.icon];
              const isPdf = tool.category === "pdf";
              return (
                <Link key={tool.id} href={localePath(tool.href)} className="tool-card group">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-md ${
                      isPdf
                        ? "bg-gradient-to-br from-red-50 to-red-100 group-hover:shadow-red-200/50"
                        : "bg-gradient-to-br from-primary-50 to-primary-100 group-hover:shadow-primary-200/50"
                    }`}>
                      {Icon ? (
                        <Icon className={`w-6 h-6 ${isPdf ? "text-red-500" : "text-primary-600"}`} />
                      ) : (
                        <span className={`text-xl font-bold ${isPdf ? "text-red-500" : "text-primary-600"}`}>
                          {tool.icon.charAt(0)}
                        </span>
                      )}
                    </div>
                    {isPdf && (
                      <span className="text-[10px] font-semibold bg-green-50 text-green-600 px-2 py-0.5 rounded-full border border-green-200">
                        {t("tools.noLimit")}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1.5 group-hover:text-primary-600 transition-colors">
                    {toolNameKeys[tool.id] ? t(toolNameKeys[tool.id]) : tool.name}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {toolDescKeys[tool.id] ? t(toolDescKeys[tool.id]) : tool.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Privacy CTA */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-10 sm:p-14">
            <div className="absolute inset-0 hero-pattern opacity-10" />
            <div className="relative text-center">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
                {t("privacy.title1")}
                <br />
                <span className="text-primary-400">{t("privacy.title2")}</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                {t("privacy.subtitle")}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                {(["privacy.noUpload", "privacy.noData", "privacy.noAccount", "privacy.offline"] as const).map(key => (
                  <div key={key} className="flex items-center gap-2 text-green-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t(key)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
