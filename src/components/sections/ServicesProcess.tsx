"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Map, Zap, BarChart2 } from "lucide-react";
import { useT } from "@/translations/useT";

const EASE = [0.22, 1, 0.36, 1] as const;
const ACCENT = "#8D9AB0";
const ACCENT_L = "#B0BDD0";

const ICON_MAP: Record<string, React.ElementType> = {
  search: Search,
  map: Map,
  zap: Zap,
  "bar-chart-2": BarChart2,
};

export default function ServicesProcess() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, {
    once: true,
    margin: "-40px",
    amount: 0.05,
  });
  const [animated, setAnimated] = useState(false);
  const { t, isAr } = useT();

  const PROCESS = t.data.process as Array<{
    num: string;
    icon: string;
    title: string;
    desc: string;
  }>;

  useEffect(() => {
    if (inView && !animated) {
      const tmr = setTimeout(() => setAnimated(true), 100);
      return () => clearTimeout(tmr);
    }
  }, [inView, animated]);

  return (
    <section
      ref={sectionRef}
      className="relative px-4 sm:px-6 py-16 sm:py-24 overflow-hidden"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      dir={isAr ? "rtl" : "ltr"}
    >
      <div
        className="bottom-0 left-1/2 absolute -translate-x-1/2 pointer-events-none"
        style={{
          width: 600,
          height: 300,
          background:
            "radial-gradient(ellipse, rgba(141,154,176,0.07) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      <div className="z-[1] relative mx-auto max-w-[1280px]">
        <div className="mb-12 sm:mb-20 text-center">
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.25em" }}
            animate={animated ? { opacity: 1, letterSpacing: "0.5em" } : {}}
            transition={{ duration: 0.8, ease: EASE }}
            className="block mb-4 sm:mb-5 font-mono font-bold uppercase"
            style={{ fontSize: 12, color: ACCENT }}
          >
            {t.process.badge}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={animated ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            translate="no"
            style={{
              fontFamily: "var(--font-display,'Bebas Neue',Impact,sans-serif)",
              fontSize: "clamp(2rem,6vw,5.5rem)",
              lineHeight: 1,
              margin: "0 0 14px",
              background: `linear-gradient(135deg,#fff 0%,${ACCENT} 60%,${ACCENT_L} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t.process.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={animated ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.38)",
              maxWidth: 460,
              margin: "0 auto",
              lineHeight: 1.75,
            }}
          >
            {t.process.sub}
          </motion.p>
        </div>

        <div className="relative">
          <div
            className="hidden lg:block top-[34px] right-0 left-0 absolute h-px"
            style={{ background: "rgba(255,255,255,0.07)" }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={animated ? { scaleX: 1 } : {}}
              transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
              className="absolute inset-0 origin-left"
              style={{
                background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT_L})`,
              }}
            />
          </div>

          <div
            className="lg:hidden top-0 bottom-0 left-[33px] absolute w-px"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <motion.div
              initial={{ scaleY: 0 }}
              animate={animated ? { scaleY: 1 } : {}}
              transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
              className="absolute inset-0 origin-top"
              style={{
                background: `linear-gradient(to bottom, ${ACCENT}, ${ACCENT_L})`,
              }}
            />
          </div>

          <div className="gap-10 sm:gap-8 lg:gap-6 grid grid-cols-1 lg:grid-cols-4">
            {PROCESS.map((step, i) => {
              const Icon = ICON_MAP[step.icon] ?? Zap;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 40 }}
                  animate={animated ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + i * 0.15,
                    ease: EASE,
                  }}
                  className="relative flex lg:flex-col lg:items-center gap-5 lg:gap-0 lg:text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={animated ? { scale: 1 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.25 + i * 0.15,
                      ease: "backOut",
                    }}
                    className="z-[1] relative flex justify-center items-center lg:mb-6 rounded-2xl w-[68px] h-[68px] shrink-0"
                    style={{
                      background: "rgba(141,154,176,0.08)",
                      border: "1px solid rgba(141,154,176,0.3)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <Icon size={26} color={ACCENT_L} />
                    <motion.div
                      animate={{ scale: [1, 1.35], opacity: [0.5, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: i * 0.3,
                      }}
                      className="absolute inset-0 rounded-2xl"
                      style={{ border: `1px solid ${ACCENT}` }}
                    />
                  </motion.div>

                  <div className="flex-1 lg:flex-none">
                    <span
                      className="block mb-2 font-mono"
                      style={{
                        fontSize: 11,
                        letterSpacing: "0.25em",
                        color: ACCENT,
                      }}
                    >
                      {t.process.step} {step.num}
                    </span>
                    <h3
                      style={{
                        fontFamily:
                          "var(--font-display,'Bebas Neue',Impact,sans-serif)",
                        fontSize: "1.3rem",
                        color: "white",
                        margin: "0 0 8px",
                        lineHeight: 1.2,
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 13,
                        color: "rgba(255,255,255,0.42)",
                        lineHeight: 1.75,
                        maxWidth: 240,
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
