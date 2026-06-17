"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { PROCESS } from "@/constants";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ServicesProcess() {
  const sectionRef = useRef(null);

  // ✅ FIX: once:true + amount:0.05 — يشتغل على موبايل بدون reset
  const inView = useInView(sectionRef, {
    once: true,
    margin: "-40px",
    amount: 0.05,
  });
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (inView && !animated) {
      const t = setTimeout(() => setAnimated(true), 100);
      return () => clearTimeout(t);
    }
    // ✅ FIX: شيلنا setAnimated(false) — مش هيتمسح تاني
  }, [inView, animated]);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* BG glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 600,
          height: 300,
          background:
            "radial-gradient(ellipse, rgba(0,122,255,0.08) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      <div className="relative z-[1] max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.25em" }}
            animate={animated ? { opacity: 1, letterSpacing: "0.5em" } : {}}
            transition={{ duration: 0.8, ease: EASE }}
            className="block font-mono uppercase mb-4 sm:mb-5 font-bold"
            style={{ fontSize: 12, color: "#007AFF" }}
          >
            How We Work
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={animated ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            style={{
              fontFamily: "var(--font-display,'Bebas Neue',Impact,sans-serif)",
              fontSize: "clamp(2rem,6vw,5.5rem)",
              lineHeight: 1,
              margin: "0 0 14px",
              background:
                "linear-gradient(135deg,#fff 0%,#007AFF 60%,#3395FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            OUR PROCESS
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
            A clear, repeatable framework that takes your brand from insight to
            impact.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line — desktop only */}
          <div
            className="hidden lg:block absolute top-[34px] left-0 right-0 h-px"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={animated ? { scaleX: 1 } : {}}
              transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
              className="absolute inset-0 origin-left"
              style={{ background: "linear-gradient(90deg, #007AFF, #3395FF)" }}
            />
          </div>

          {/* Mobile vertical line */}
          <div
            className="lg:hidden absolute left-[33px] top-0 bottom-0 w-px"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <motion.div
              initial={{ scaleY: 0 }}
              animate={animated ? { scaleY: 1 } : {}}
              transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
              className="absolute inset-0 origin-top"
              style={{
                background: "linear-gradient(to bottom, #007AFF, #3395FF)",
              }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 sm:gap-8 lg:gap-6">
            {PROCESS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 40 }}
                animate={animated ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + i * 0.15,
                  ease: EASE,
                }}
                className="relative flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
              >
                {/* Node */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={animated ? { scale: 1 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.25 + i * 0.15,
                    ease: "backOut",
                  }}
                  className="relative w-[68px] h-[68px] shrink-0 rounded-2xl flex items-center justify-center lg:mb-6 z-[1]"
                  style={{
                    background: "rgba(0,122,255,0.08)",
                    border: "1px solid rgba(0,122,255,0.3)",
                    backdropFilter: "blur(10px)",
                    fontSize: 26,
                  }}
                >
                  {step.icon}
                  {/* Pulse ring */}
                  <motion.div
                    animate={{ scale: [1, 1.35], opacity: [0.5, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: i * 0.3,
                    }}
                    className="absolute inset-0 rounded-2xl"
                    style={{ border: "1px solid rgba(0,122,255,0.4)" }}
                  />
                </motion.div>

                {/* Text */}
                <div className="flex-1 lg:flex-none">
                  <span
                    className="font-mono block mb-2"
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.25em",
                      color: "#007AFF",
                    }}
                  >
                    STEP {step.num}
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
