"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { STRINGS, type Lang } from "@/content/portfolio";

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  /** Chrome string lookup for the current language. */
  t: (key: string) => string;
}

const LangContext = createContext<LangContextValue | undefined>(undefined);

const STORAGE_KEY = "iv-lang";

export function LangProvider({ children }: { children: ReactNode }) {
  // SSR renders 'en' (matches the inline pre-hydration script default); the
  // effect below reconciles with the persisted choice on mount.
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = (localStorage.getItem(STORAGE_KEY) as Lang | null) ?? null;
    if (stored === "pt" || stored === "en") setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-lang", lang);
    document.documentElement.setAttribute("lang", lang === "pt" ? "pt-BR" : "en");
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
    setLangState(l);
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === "en" ? "pt" : "en");
  }, [lang, setLang]);

  const t = useCallback((key: string) => STRINGS[lang][key] ?? key, [lang]);

  const value = useMemo(
    () => ({ lang, setLang, toggle, t }),
    [lang, setLang, toggle, t]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within a LangProvider");
  return ctx;
}
