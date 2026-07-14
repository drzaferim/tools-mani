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

/** "/tr" öneki kaldırılmış eşdeğer yolu döner. */
export function stripTrPrefix(pathname: string): string {
  if (pathname === "/tr" || pathname === "/tr/") return "/";
  if (pathname.startsWith("/tr/")) return pathname.slice(3);
  return pathname;
}

/** Yolun /tr eşdeğerini döner. */
export function toTrPath(pathname: string): string {
  const base = stripTrPrefix(pathname);
  return base === "/" ? "/tr/" : `/tr${base}`;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/";
  const router = useRouter();

  // Dil, URL'den belirlenir: /tr altındaki sayfalar Türkçe, diğerleri İngilizce.
  // Böylece sunucuda üretilen HTML ile istemci aynı dili gösterir (SEO + hydration uyumu).
  const locale: Locale =
    pathname === "/tr" || pathname.startsWith("/tr/") ? "tr" : "en";

  // <html lang> kök layout'ta statik "en"; TR sayfalarında istemcide düzelt.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback(
    (newLocale: Locale) => {
      if (newLocale === locale) return;
      localStorage.setItem("toolsmani-lang", newLocale);
      router.push(newLocale === "tr" ? toTrPath(pathname) : stripTrPrefix(pathname));
    },
    [locale, pathname, router]
  );

  const tFunc = useCallback(
    (key: TranslationKey) => translate(key, locale),
    [locale]
  );

  const localePath = useCallback(
    (href: string) => {
      if (locale !== "tr") return href;
      if (!href.startsWith("/") || href === "/tr" || href.startsWith("/tr/")) return href;
      // Blog ve admin'in /tr karşılığı yok; onları öneksiz bırak.
      if (href.startsWith("/blog") || href.startsWith("/admin")) return href;
      return href === "/" ? "/tr/" : `/tr${href}`;
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
