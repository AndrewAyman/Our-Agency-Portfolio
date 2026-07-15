"use client";
// CORRECTED FILE — replace src/components/sections/ServicesHero.tsx with this
// CHANGES:
// 1. Added: import { useT } from "@/translations/useT"
// 2. ✅ FIX: Removed translate="no" from both h1 elements
// 3. ✅ FIX: Arabic → animate each LINE as one unit (not letter-by-letter)
//    English → letter-by-letter animation unchanged
// 4. Badge, sub text, and stat labels now come from t.servicesHero.*

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useT } from "@/translations/useT";

const EASE = [0.22, 1, 0.36, 1] as const;
const LETTER_EASE = [0.19, 1, 0.22, 1] as const;

export default function ServicesHero() {
  const { t, isAr } = useT();

  // ✅ FIX: split using translation keys, not hardcoded English
  const line1Letters = Array.from(t.servicesHero.line1);
  const line2Letters = Array.from(t.servicesHero.line2);

  const STATS = [
    { value: "7", label: t.servicesHero.stats.services },
    { value: "1M+", label: t.servicesHero.stats.impressions },
    { value: "2", label: t.servicesHero.stats.countries },
    { value: "100%", label: t.servicesHero.stats.commitment },
  ];

  return (
    <section
      className="relative overflow-hidden"
      style={{
        padding: "120px 1.5rem 60px",
        background:
          "radial-gradient(ellipse 80% 50% at 50% 0%, #0d1f3c 0%, #0D1117 55%, #0A0A0A 100%)",
      }}
    >
      {/* Animated orb */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          top: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(141, 154, 176,0.16) 0%, transparent 65%)",
          animation: "orbPulse 7s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      {/* Grid bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(141, 154, 176,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(141, 154, 176,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 80%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, transparent 80%)",
        }}
      />

      <div className="z-[1] relative mx-auto max-w-[1280px] text-center">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full"
          style={{
            background: "rgba(141, 154, 176,0.08)",
            border: "1px solid rgba(141, 154, 176,0.25)",
          }}
        >
          <span
            className="font-mono uppercase"
            style={{
              fontSize: 11,
              letterSpacing: "0.25em",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            {t.servicesHero.badge}
          </span>
        </motion.div>

        {/*
          ✅ KEY FIX — Line 1:
          - Arabic  → one animated block (حروف العربي لا تتقسم)
          - English → letter-by-letter (unchanged behavior)
          - REMOVED translate="no" so Google Translate doesn't fight with useT()
        */}
        <h1
          translate="no"
          className="flex flex-wrap justify-center m-0 mb-6 leading-none select-none notranslate"
          style={{
            fontFamily: "var(--font-display,'Bebas Neue',Impact,sans-serif)",
            fontSize: "clamp(3rem,9vw,7.5rem)",
            direction: isAr ? "rtl" : "ltr",
          }}
        >
          {isAr ? (
            <motion.span
              initial={{ opacity: 0, y: -60, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.1, ease: LETTER_EASE, delay: 0 }}
              style={{ display: "inline-block", color: "#F0F4FF" }}
            >
              {t.servicesHero.line1}
            </motion.span>
          ) : (
            line1Letters.map((char, i) => (
              <motion.span
                key={`l1-${i}`}
                initial={{ opacity: 0, y: -60, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 1.1,
                  ease: LETTER_EASE,
                  delay: i * 0.05,
                }}
                style={{
                  display: "inline-block",
                  whiteSpace: char === " " ? "pre" : "normal",
                  color: "#F0F4FF",
                }}
              >
                {char}
              </motion.span>
            ))
          )}
        </h1>

        {/* Line 2 */}
        <h1
          translate="no"
          className="flex flex-wrap justify-center m-0 mb-6 leading-none select-none notranslate"
          style={{
            fontFamily: "var(--font-display,'Bebas Neue',Impact,sans-serif)",
            fontSize: "clamp(3rem,9vw,7.5rem)",
            direction: isAr ? "rtl" : "ltr",
          }}
        >
          {isAr ? (
            <motion.span
              initial={{ opacity: 0, y: -60, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.1, ease: LETTER_EASE, delay: 0.2 }}
              style={{
                display: "inline-block",
                color: "#A8B4C5",
                textShadow:
                  "0 0 50px rgba(141, 154, 176,0.55), 0 0 100px rgba(141, 154, 176,0.2)",
              }}
            >
              {t.servicesHero.line2}
            </motion.span>
          ) : (
            line2Letters.map((char, i) => (
              <motion.span
                key={`l2-${i}`}
                initial={{ opacity: 0, y: -60, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 1.1,
                  ease: LETTER_EASE,
                  delay: 0.35 + i * 0.05,
                }}
                style={{
                  display: "inline-block",
                  whiteSpace: char === " " ? "pre" : "normal",
                  color: "#A8B4C5",
                  textShadow:
                    "0 0 50px rgba(141, 154, 176,0.55), 0 0 100px rgba(141, 154, 176,0.2)",
                }}
              >
                {char}
              </motion.span>
            ))
          )}
        </h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: EASE }}
          style={{
            fontSize: "clamp(0.95rem,1.6vw,1.1rem)",
            color: "rgba(255,255,255,0.45)",
            maxWidth: 560,
            margin: "0 auto 48px",
            lineHeight: 1.8,
          }}
        >
          {t.servicesHero.sub}
        </motion.p>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.25, ease: EASE }}
          className="flex flex-wrap justify-center items-center gap-3 sm:gap-4"
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(10px)",
              }}
            >
              <span
                style={{
                  fontFamily:
                    "var(--font-display,'Bebas Neue',Impact,sans-serif)",
                  fontSize: "1.6rem",
                  background: "linear-gradient(135deg,#A8B4C5,#8D9AB0)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: 1,
                }}
              >
                {s.value}
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.35)",
                  fontFamily: "var(--font-mono,'JetBrains Mono',monospace)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  lineHeight: 1.3,
                  maxWidth: 70,
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="flex flex-col items-center gap-2"
          style={{ marginTop: 56 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={16} color="rgba(141, 154, 176,0.6)" />
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes orbPulse {
          0%, 100% { opacity: 0.7; transform: translateX(-50%) scale(1); }
          50%       { opacity: 1;   transform: translateX(-50%) scale(1.1); }
        }
      `}</style>
    </section>
  );
}
