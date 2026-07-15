"use client";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/translations";

export function useT() {
  const { lang, isAr } = useLanguage();
  return {
    t: translations[lang],
    lang,
    isAr,
  };
}
