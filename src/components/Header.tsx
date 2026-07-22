"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { LOCALES, localeNames, type Locale } from "@/lib/translations";

const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  tr: "🇹🇷",
  es: "🇪🇸",
  de: "🇩🇪",
  pt: "🇧🇷",
  fr: "🇫🇷",
};

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { locale, setLocale, t, localePath } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={localePath("/")} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-md shadow-primary-200/50 group-hover:shadow-lg group-hover:shadow-primary-300/50 transition-shadow">
              <span className="text-white font-bold text-sm">TM</span>
            </div>
            <span className="font-bold text-xl text-gray-900 tracking-tight">
              ToolsMani
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link
              href={localePath("/#tools")}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
            >
              {t("nav.allTools")}
            </Link>
            <Link
              href="/blog"
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
            >
              {t("nav.blog")}
            </Link>
            <Link
              href={localePath("/tools/pdf")}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
            >
              {t("nav.pdfTools")}
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {/* Dil menüsü */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
                aria-haspopup="listbox"
                aria-expanded={langOpen}
              >
                <span className="text-base">{localeFlags[locale]}</span>
                <span className="uppercase">{locale}</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {langOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} />
                  <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-xl shadow-lg py-1.5 z-20">
                    {LOCALES.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => { setLocale(loc); setLangOpen(false); }}
                        className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm text-left transition-colors ${
                          loc === locale
                            ? "text-primary-600 font-medium bg-primary-50"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <span className="text-base">{localeFlags[loc]}</span>
                        {localeNames[loc]}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <Link href={localePath("/tools/pdf")} className="btn-primary text-sm !py-2.5 !px-5">
              {t("nav.tryPdf")}
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 mt-2 pt-4 animate-fade-in-up">
            <nav className="flex flex-col gap-1">
              <Link
                href={localePath("/#tools")}
                className="px-4 py-2.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
                onClick={() => setMenuOpen(false)}
              >
                {t("nav.allTools")}
              </Link>
              <Link
                href="/blog"
                className="px-4 py-2.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
                onClick={() => setMenuOpen(false)}
              >
                {t("nav.blog")}
              </Link>
              <Link
                href={localePath("/tools/pdf")}
                className="px-4 py-2.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
                onClick={() => setMenuOpen(false)}
              >
                {t("nav.pdfTools")}
              </Link>
              <div className="border-t border-gray-100 mt-2 pt-2 grid grid-cols-2 gap-1">
                {LOCALES.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => { setLocale(loc); setMenuOpen(false); }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-left text-sm transition-all ${
                      loc === locale
                        ? "text-primary-600 font-medium bg-primary-50"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-base">{localeFlags[loc]}</span>
                    {localeNames[loc]}
                  </button>
                ))}
              </div>
              <Link
                href={localePath("/tools/pdf")}
                className="btn-primary text-sm text-center mt-2"
                onClick={() => setMenuOpen(false)}
              >
                {t("nav.tryPdf")}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
