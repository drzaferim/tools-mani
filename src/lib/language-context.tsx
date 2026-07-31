"use client";

import { createContext, useContext, useCallback, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { t as translate, type Locale, type TranslationKey } from "./translations";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
  /** Verilen iç linki aktif dile göre öne ekler: tr'de "/tools/x" → "/tr/tools/x" */
  localePath: (href: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  setLocale: () => {},
  t: (key) => key,
  localePath: (href) => href,
});

/** URL öneki taşıyan diller (İngilizce önek almaz). */
export const PREFIXED_LOCALES = ["tr", "es", "de", "pt", "fr"] as const;

/**
 * TR sitenin tamamını aynalar; es/de/pt/fr şimdilik yalnızca
 * ana sayfa + /tools/* rotalarını aynalar (kurumsal/blog sayfaları EN kalır).
 */
const FULL_MIRROR: ReadonlySet<string> = new Set(["tr"]);

/** Yol adından locale ve öneksiz taban yolu çıkarır. */
export function splitLocalePath(pathname: string): { locale: Locale; base: string } {
  for (const loc of PREFIXED_LOCALES) {
    if (pathname === `/${loc}` || pathname === `/${loc}/`) return { locale: loc, base: "/" };
    if (pathname.startsWith(`/${loc}/`)) return { locale: loc, base: pathname.slice(loc.length + 1) };
  }
  return { locale: "en", base: pathname };
}

/**
 * es/de/pt/fr'de aynası olan kurumsal sayfalar. Blog ve admin hâlâ aynalanmıyor,
 * bu yüzden bu diller FULL_MIRROR'a alınmadı — yalnızca bu yollar açıldı.
 */
const CORPORATE_PATHS = ["/about", "/contact", "/privacy", "/terms"];

/** en/tr dışı diller için hangi taban yolların aynası var? */
function isMirrored(locale: Locale, base: string): boolean {
  if (locale === "en" || FULL_MIRROR.has(locale)) return true;
  if (base === "/" || base.startsWith("/tools")) return true;
  return CORPORATE_PATHS.some((p) => base === p || base.startsWith(`${p}/`));
}

/**
 * Sadece en+tr içeren sözlüklerde diğer diller için İngilizceye düşen seçici.
 * Araç sayfalarındaki yerel `labels` nesneleri bu yardımcıyla okunur.
 */
export function pick<T>(dict: { en: T } & Partial<Record<Locale, T>>, locale: Locale): T {
  return dict[locale] ?? dict.en;
}

/**
 * Locale kodunu Intl'in beklediği BCP 47 etiketine çevirir.
 * `toLocaleString` çağrılarında kullanılır — aksi hâlde Almanca "1.234,56" yerine
 * İngilizce "1,234.56" biçimi çıkar. Portekizce için Brezilya seçildi: trafiğin
 * ezici çoğunluğu oradan geliyor.
 */
const LOCALE_TAGS: Record<Locale, string> = {
  en: "en-US",
  tr: "tr-TR",
  es: "es-ES",
  de: "de-DE",
  pt: "pt-BR",
  fr: "fr-FR",
};

export function localeTag(locale: Locale): string {
  return LOCALE_TAGS[locale] ?? "en-US";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/";
  const router = useRouter();

  // Dil, URL'den belirlenir — sunucuda üretilen HTML ile istemci aynı dili gösterir.
  const { locale, base } = splitLocalePath(pathname);

  // Kök layout dili ilk HTML ayrıştırılırken ayarlar; istemci geçişlerinde de güncel tut.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return;
      localStorage.setItem("toolsmani-lang", next);
      if (next === "en") {
        router.push(base);
        return;
      }
      // Admin hiçbir dilde aynalanmaz; blog yalnızca Türkçede aynalanır.
      const target =
        next === "tr"
          ? base.startsWith("/admin")
            ? base
            : base === "/"
            ? "/tr/"
            : `/tr${base}`
          : isMirrored(next, base)
          ? base === "/"
            ? `/${next}/`
            : `/${next}${base}`
          : `/${next}/`;
      router.push(target);
    },
    [locale, base, router]
  );

  const tFunc = useCallback(
    (key: TranslationKey) => translate(key, locale),
    [locale]
  );

  const localePath = useCallback(
    (href: string) => {
      if (locale === "en" || !href.startsWith("/")) return href;
      // Zaten önekliyse dokunma
      for (const loc of PREFIXED_LOCALES) {
        if (href === `/${loc}` || href.startsWith(`/${loc}/`)) return href;
      }
      if (locale === "tr") {
        if (href.startsWith("/admin")) return href;
        return href === "/" ? "/tr/" : `/tr${href}`;
      }
      // es/de/pt/fr: yalnızca aynalanan rotaları öne ekle
      if (!isMirrored(locale, href.split("#")[0])) return href;
      return href === "/" ? `/${locale}/` : `/${locale}${href}`;
    },
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: tFunc, localePath }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
