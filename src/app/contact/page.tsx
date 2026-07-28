"use client";

import ContactSection from "@/components/sections/ContactSection";
import { Reveal } from "@/components/ui/Reveal";
import { useT } from "@/translations/useT";

export default function ContactPage() {
  const { t, isAr } = useT();

  return (
    <>
      <section
        className="relative px-6 pt-36 pb-8 overflow-hidden text-center"
        dir={isAr ? "rtl" : "ltr"}
      >
        <div
          className="top-0 left-1/2 absolute opacity-15 w-[600px] h-[400px] -translate-x-1/2 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(141,154,176,0.5) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div className="z-10 relative">
          <Reveal>
            <span className="block mb-4 font-mono text-[#8D9AB0] text-xs uppercase tracking-[0.3em]">
              {t.contactPage.badge}
            </span>
            <h1
              translate="no"
              className="mb-4 font-display text-[clamp(3rem,8vw,7rem)] leading-none gradient-text"
            >
              {t.contactPage.title}
            </h1>
            <p className="mx-auto max-w-lg text-white/40 text-base">
              {t.contactPage.sub}
            </p>
          </Reveal>
        </div>
      </section>
      <ContactSection />
    </>
  );
}
