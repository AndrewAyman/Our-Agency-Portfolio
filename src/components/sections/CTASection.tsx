"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, BarChart2, Target, Users } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { FiInstagram, FiMail } from "react-icons/fi";
import { SiTiktok } from "react-icons/si";
import { Reveal } from "@/components/ui/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;
const ACCENT = "#8D9AB0";
const ACCENT_L = "#B0BDD0";

const WHY = [
  { icon: Zap, text: "Fast execution, no delays" },
  { icon: BarChart2, text: "Measurable results only" },
  { icon: Target, text: "Custom plan per brand" },
  { icon: Users, text: "Real growth partner" },
];

const SOCIALS = [
  {
    label: "Instagram",
    handle: "@our_agency5",
    href: "https://instagram.com/our_agency5",
    Icon: FiInstagram,
    color: ACCENT_L,
  },
  {
    label: "TikTok",
    handle: "@our_agency2",
    href: "https://tiktok.com/@our_agency2",
    Icon: SiTiktok,
    color: "#ffffff",
  },
  {
    label: "Email",
    handle: "ouragency259@gmail.com",
    href: "mailto:ouragency259@gmail.com",
    Icon: FiMail,
    color: ACCENT,
  },
];

/* ── Rotating rings — silver ── */
function RotatingRings() {
  return (
    <div
      aria-hidden
      className="top-1/2 left-1/2 absolute w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    >
      {[680, 540, 400, 280].map((size, i) => (
        <motion.div
          key={size}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{
            duration: 20 + i * 7,
            repeat: Infinity,
            ease: "linear",
          }}
          className="top-1/2 left-1/2 absolute rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            width: size,
            height: size,
            border: `1px dashed rgba(141,154,176,${0.06 + i * 0.02})`,
          }}
        />
      ))}

      {[0, 120, 240].map((startDeg, i) => (
        <motion.div
          key={startDeg}
          animate={{ rotate: 360 }}
          transition={{ duration: 9 + i * 3, repeat: Infinity, ease: "linear" }}
          className="top-1/2 left-1/2 absolute w-[540px] h-[540px]"
          style={{ transform: `translate(-50%,-50%) rotate(${startDeg}deg)` }}
        >
          <div
            className="-top-1 left-1/2 absolute rounded-full w-[7px] h-[7px] -translate-x-1/2"
            style={{
              background: ACCENT,
              boxShadow: `0 0 10px ${ACCENT}, 0 0 20px rgba(141,154,176,0.5)`,
            }}
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
      className="relative px-6 py-28 overflow-hidden"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Ambient */}
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="top-1/2 left-1/2 absolute w-[900px] h-[500px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(141,154,176,0.1) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      <RotatingRings />

      {/* Top shimmer line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: EASE }}
        className="top-0 left-1/2 absolute w-[55%] max-w-[500px] h-px origin-center -translate-x-1/2"
        style={{
          background: `linear-gradient(to right, transparent, ${ACCENT}, transparent)`,
        }}
      />

      <div className="z-10 relative mx-auto max-w-[960px]">
        <Reveal>
          <motion.div
            whileHover={{
              boxShadow:
                "0 32px 80px rgba(0,0,0,0.5), 0 0 50px rgba(141,154,176,0.08)",
            }}
            className="relative backdrop-blur-2xl rounded-[28px] overflow-hidden text-center transition-shadow duration-500"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.09)",
              padding: "clamp(2.5rem,5vw,4.5rem)",
            }}
          >
            {/* Corner glows */}
            <div
              className="-top-[70px] -left-[70px] absolute w-[220px] h-[220px] pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(141,154,176,0.08) 0%, transparent 70%)",
              }}
            />
            <div
              className="-right-[70px] -bottom-[70px] absolute w-[220px] h-[220px] pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(141,154,176,0.06) 0%, transparent 70%)",
              }}
            />

            {/* Shimmer sweep */}
            <motion.div
              animate={{ x: ["-120%", "120%"] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 5 }}
              className="top-0 right-0 left-0 absolute h-px pointer-events-none"
              style={{
                background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`,
              }}
            />

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-6 px-[18px] py-[7px] rounded-full"
              style={{
                background: "rgba(141,154,176,0.08)",
                border: "1px solid rgba(141,154,176,0.22)",
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="rounded-full w-1.5 h-1.5"
                style={{ background: ACCENT }}
              />
              <span
                className="font-mono text-[10px] uppercase tracking-[0.28em]"
                style={{ color: ACCENT }}
              >
                Ready to grow?
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
              className="m-0 mb-6 font-['Bebas_Neue',Impact,sans-serif] text-white leading-[0.93] tracking-[-0.01em]"
              style={{ fontSize: "clamp(2.8rem,8vw,6.5rem)" }}
            >
              LET&apos;S BUILD YOUR{" "}
              <motion.span
                animate={{
                  textShadow: [
                    `0 0 30px rgba(141,154,176,0.4)`,
                    `0 0 60px rgba(141,154,176,0.7)`,
                    `0 0 30px rgba(141,154,176,0.4)`,
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ color: ACCENT_L }}
              >
                BRAND
              </motion.span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="mx-auto mb-10 max-w-[480px] text-white/40 leading-[1.8]"
              style={{ fontSize: "clamp(0.9rem,1.6vw,1.05rem)" }}
            >
              From identity to ads to content — we handle the full picture so
              you can focus on what you do best.
            </motion.p>

            {/* Why-us pills — Lucide icons */}
            <div className="flex flex-wrap justify-center gap-2.5 mb-10">
              {WHY.map((w, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ delay: 0.35 + i * 0.08, duration: 0.5 }}
                  whileHover={{
                    scale: 1.06,
                    background: "rgba(141,154,176,0.1)",
                    borderColor: "rgba(141,154,176,0.3)",
                  }}
                  className="flex items-center gap-2.5 px-[18px] py-2 rounded-full transition-all duration-300 cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.09)",
                  }}
                >
                  <w.icon size={13} color={ACCENT} />
                  <span className="font-mono text-white/50 text-xs">
                    {w.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55 }}
              className="flex flex-wrap justify-center gap-3.5"
            >
              <Link href="/contact">
                <motion.button
                  whileHover={{
                    scale: 1.06,
                    boxShadow: `0 0 50px rgba(141,154,176,0.4)`,
                  }}
                  whileTap={{ scale: 0.96 }}
                  className="relative flex items-center gap-2.5 px-10 py-4 border-0 rounded-[14px] overflow-hidden font-bold text-white text-sm tracking-[0.04em] cursor-pointer"
                  style={{ background: ACCENT }}
                >
                  <motion.span
                    animate={{ x: ["-120%", "120%"] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                    }}
                  />
                  Start a Project
                  <ArrowRight size={14} />
                </motion.button>
              </Link>

              <a
                href="https://wa.me/201554529053"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{
                    scale: 1.04,
                    background: "rgba(37,211,102,0.14)",
                    borderColor: "rgba(37,211,102,0.4)",
                  }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-2.5 px-8 py-4 rounded-[14px] font-semibold text-sm tracking-[0.04em] transition-all duration-300 cursor-pointer"
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

            <p className="mt-6 font-mono text-[11px] text-white/[0.18] tracking-[0.1em]">
              We respond within 24 hours · KSA &amp; Egypt
            </p>
          </motion.div>
        </Reveal>

        {/* Social proof */}
        <Reveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-8 mt-14">
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
                <span className="font-mono text-[9px] text-white/22 uppercase tracking-[0.25em]">
                  {s.label}
                </span>
                <span
                  className="font-medium text-[13px]"
                  style={{ color: s.color }}
                >
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
