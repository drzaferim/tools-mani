"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { t as translate, type Locale, type TranslationKey } from "./translations";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  setLocale: () => {},
  t: (key) => key,
});

function detectBrowserLocale(): Locale {
  if (typeof window === "undefined") return "en";

  // Check localStorage first
  const saved = localStorage.getItem("toolsmani-lang");
  if (saved === "tr" || saved === "en") return saved;

  // Detect from browser
  const lang = navigator.language || "";
  if (lang.startsWith("tr")) return "tr";

  return "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocaleState(detectBrowserLocale());
    setMounted(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("toolsmani-lang", newLocale);
  }, []);

  const tFunc = useCallback(
    (key: TranslationKey) => translate(key, locale),
    [locale]
  );

  // Prevent hydration mismatch by rendering English until mounted
  const contextValue = {
    locale: mounted ? locale : "en",
    setLocale,
    t: mounted ? tFunc : (key: TranslationKey) => translate(key, "en"),
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
