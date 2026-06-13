"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { FiInstagram, FiMail } from "react-icons/fi";
import { SiTiktok } from "react-icons/si";
import { Reveal } from "@/components/ui/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;
const BLUE = "#007AFF";

const WHY = [
  { icon: "⚡", text: "Fast execution, no delays" },
  { icon: "📊", text: "Measurable results only" },
  { icon: "🎯", text: "Custom plan per brand" },
  { icon: "🤝", text: "Real growth partner" },
];

const SOCIALS = [
  { label: "Instagram", handle: "@our_agency5", href: "https://instagram.com/our_agency5", Icon: FiInstagram, color: "#E1306C" },
  { label: "TikTok", handle: "@our_agency2", href: "https://tiktok.com/@our_agency2", Icon: SiTiktok, color: "#ffffff" },
  { label: "Email", handle: "ouragency259@gmail.com", href: "mailto:ouragency259@gmail.com", Icon: FiMail, color: BLUE },
];

/* ── Rotating rings ── */
function RotatingRings() {
  return (
    <div
      aria-hidden
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
    >
      {[680, 540, 400, 280].map((size, i) => (
        <motion.div
          key={size}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 18 + i * 7, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: size,
            height: size,
            border: `1px dashed rgba(0,122,255,${0.06 + i * 0.02})`,
          }}
        />
      ))}

      {[0, 120, 240].map((startDeg, i) => (
        <motion.div
          key={startDeg}
          animate={{ rotate: 360 }}
          transition={{ duration: 8 + i * 3, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 w-[540px] h-[540px]"
          style={{ transform: `translate(-50%,-50%) rotate(${startDeg}deg)` }}
        >
          <div
            className="absolute -top-1 left-1/2 -translate-x-1/2 w-[7px] h-[7px] rounded-full bg-[#007AFF]"
            style={{ boxShadow: "0 0 10px #007AFF, 0 0 20px rgba(0,122,255,0.6)" }}
          />
        </motion.div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════ */
export default function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-label="Call to action"
      className="relative py-28 px-6 overflow-hidden"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Ambient bg */}
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(0,122,255,0.12) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      <RotatingRings />

      {/* Top accent border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: EASE }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[55%] max-w-[500px] h-px origin-center"
        style={{ background: "linear-gradient(to right, transparent, rgba(0,122,255,0.6), transparent)" }}
      />

      <div className="relative z-10 max-w-[960px] mx-auto">
        {/* Main CTA card */}
        <Reveal>
          <motion.div
            whileHover={{ boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 50px rgba(0,122,255,0.1)" }}
            className="relative rounded-[28px] text-center overflow-hidden transition-shadow duration-500 backdrop-blur-2xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.09)",
              padding: "clamp(2.5rem,5vw,4.5rem)",
            }}
          >
            {/* Corner glows */}
            <div
              className="absolute -top-[70px] -left-[70px] w-[220px] h-[220px] pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(0,122,255,0.1) 0%, transparent 70%)" }}
            />
            <div
              className="absolute -bottom-[70px] -right-[70px] w-[220px] h-[220px] pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(0,122,255,0.08) 0%, transparent 70%)" }}
            />

            {/* Shimmer sweep */}
            <motion.div
              animate={{ x: ["-120%", "120%"] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 5 }}
              className="absolute top-0 left-0 right-0 h-px pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent, rgba(0,122,255,0.9), transparent)" }}
            />

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-6 px-[18px] py-[7px] rounded-full"
              style={{
                background: "rgba(0,122,255,0.09)",
                border: "1px solid rgba(0,122,255,0.25)",
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-[#007AFF]"
              />
              <span className="text-[10px] font-mono text-[#007AFF] tracking-[0.28em] uppercase">
                Ready to grow?
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
              className="font-['Bebas_Neue',Impact,sans-serif] text-white leading-[0.93] m-0 mb-6 tracking-[-0.01em]"
              style={{ fontSize: "clamp(2.8rem,8vw,6.5rem)" }}
            >
              LET&apos;S BUILD YOUR{" "}
              <motion.span
                animate={{
                  textShadow: [
                    "0 0 30px rgba(0,122,255,0.4)",
                    "0 0 60px rgba(0,122,255,0.7)",
                    "0 0 30px rgba(0,122,255,0.4)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-[#3395FF]"
              >
                BRAND
              </motion.span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="text-white/40 max-w-[480px] mx-auto mb-10 leading-[1.8]"
              style={{ fontSize: "clamp(0.9rem,1.6vw,1.05rem)" }}
            >
              From identity to ads to content — we handle the full picture so you can focus on what you do best.
            </motion.p>

            {/* Why-us pills */}
            <div className="flex flex-wrap gap-2.5 justify-center mb-10">
              {WHY.map((w, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ delay: 0.35 + i * 0.08, duration: 0.5 }}
                  whileHover={{
                    scale: 1.06,
                    background: "rgba(0,122,255,0.1)",
                    borderColor: "rgba(0,122,255,0.3)",
                  }}
                  className="flex items-center gap-2 px-[18px] py-2 rounded-full transition-all duration-300 cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.09)",
                  }}
                >
                  <span className="text-sm">{w.icon}</span>
                  <span className="text-xs text-white/50 font-mono">{w.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55 }}
              className="flex flex-wrap gap-3.5 justify-center"
            >
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.06, boxShadow: "0 0 50px rgba(0,122,255,0.65)" }}
                  whileTap={{ scale: 0.96 }}
                  className="relative flex items-center gap-2.5 px-10 py-4 rounded-[14px] bg-[#007AFF] text-white font-bold text-sm tracking-[0.04em] overflow-hidden cursor-pointer border-0"
                >
                  <motion.span
                    animate={{ x: ["-120%", "120%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)" }}
                  />
                  Start a Project
                  <ArrowRight size={14} />
                </motion.button>
              </Link>

              <a href="https://wa.me/201554529053" target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{
                    scale: 1.04,
                    background: "rgba(37,211,102,0.14)",
                    borderColor: "rgba(37,211,102,0.4)",
                  }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-2.5 px-8 py-4 rounded-[14px] font-semibold text-sm tracking-[0.04em] cursor-pointer transition-all duration-300"
                  style={{
                    background: "rgba(37,211,102,0.07)",
                    border: "1px solid rgba(37,211,102,0.22)",
                    color: "rgba(37,211,102,0.9)",
                  }}
                >
                  <FaWhatsapp size={16} />
                  WhatsApp Us
                </motion.button>
              </a>
            </motion.div>

            <p className="text-[11px] text-white/[0.18] mt-6 font-mono tracking-[0.1em]">
              We respond within 24 hours · KSA &amp; Egypt
            </p>
          </motion.div>
        </Reveal>

        {/* Social proof row */}
        <Reveal delay={0.2}>
          <div className="flex flex-wrap gap-8 justify-center mt-14">
            {SOCIALS.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.04 }}
                className="flex flex-col items-center gap-1.5 no-underline"
              >
                <motion.div
                  whileHover={{ color: s.color }}
                  className="text-white/30 transition-colors duration-300"
                >
                  <s.Icon size={18} />
                </motion.div>
                <span className="text-[9px] text-white/22 font-mono tracking-[0.25em] uppercase">
                  {s.label}
                </span>
                <span className="text-[13px] font-medium" style={{ color: s.color }}>
                  {s.handle}
                </span>
              </motion.a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}