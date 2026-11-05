"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
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

let fallbackLang: Lang = "en";
let languageStorageUnavailable = false;
const LANGUAGE_EVENT = "iv-languagechange";

function getLanguage(): Lang {
  if (languageStorageUnavailable) return fallbackLang;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "pt" ? "pt" : "en";
  } catch {
    return fallbackLang;
  }
}

function subscribeLanguage(listener: () => void) {
  window.addEventListener(LANGUAGE_EVENT, listener);
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener(LANGUAGE_EVENT, listener);
    window.removeEventListener("storage", listener);
  };
}

const getServerLanguage = (): Lang => "en";

export function LangProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribeLanguage, getLanguage, getServerLanguage);

  useEffect(() => {
    document.documentElement.setAttribute("data-lang", lang);
    document.documentElement.setAttribute("lang", lang === "pt" ? "pt-BR" : "en");
    // Previously hidden translations can enter a fixed-size horizontal panel
    // without triggering its ResizeObserver or a scroll event.
    window.__ivSweep?.();
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    fallbackLang = l;
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // The language still works for this visit when storage is unavailable.
      languageStorageUnavailable = true;
    }
    window.dispatchEvent(new Event(LANGUAGE_EVENT));
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
