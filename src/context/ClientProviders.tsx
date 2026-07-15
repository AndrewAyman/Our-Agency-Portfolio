"use client";

import { useEffect } from "react";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";

// Sets dir + lang on <html> reactively
function HtmlDirSetter({ children }: { children: React.ReactNode }) {
  const { lang } = useLanguage();

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    // Switch font family for Arabic
    document.body.style.fontFamily =
      lang === "ar"
        ? "'Cairo', 'DM Sans', sans-serif"
        : "'DM Sans', sans-serif";
  }, [lang]);

  return <>{children}</>;
}

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <HtmlDirSetter>{children}</HtmlDirSetter>
    </LanguageProvider>
  );
}
