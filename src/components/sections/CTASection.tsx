"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const WHY = [
  { icon: "⚡", text: "Fast execution, no delays" },
  { icon: "📊", text: "Measurable results only" },
  { icon: "🎯", text: "Custom plan per brand" },
  { icon: "🤝", text: "Real growth partner" },
];

export default function CTASection() {
  return (
    <section style={{ position: "relative", padding: "6rem 1.5rem", overflow: "hidden" }}>

      {/* Strong center glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 400, pointerEvents: "none", background: "radial-gradient(ellipse,rgba(0,122,255,0.14) 0%,transparent 68%)", filter: "blur(50px)" }} />

      {/* Top border accent */}
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "60%", maxWidth: 500, height: 1, background: "linear-gradient(to right,transparent,rgba(0,122,255,0.5),transparent)" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1000, margin: "0 auto" }}>

        {/* Main CTA card */}
        <Reveal>
          <motion.div
            whileHover={{ boxShadow: "0 24px 64px rgba(0,0,0,0.5), 0 0 40px rgba(0,122,255,0.12)" }}
            style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: "clamp(2rem,5vw,4rem)", textAlign: "center", position: "relative", overflow: "hidden", transition: "box-shadow 0.4s" }}
          >
            {/* Corner glows */}
            <div style={{ position: "absolute", top: -60, left: -60, width: 200, height: 200, background: "radial-gradient(circle,rgba(0,122,255,0.12) 0%,transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: -60, right: -60, width: 200, height: 200, background: "radial-gradient(circle,rgba(0,122,255,0.1) 0%,transparent 70%)", pointerEvents: "none" }} />

            {/* Label */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20, padding: "6px 16px", borderRadius: 100, background: "rgba(0,122,255,0.1)", border: "1px solid rgba(0,122,255,0.25)" }}>
              <span style={{ fontSize: 10, fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", color: "#007AFF", letterSpacing: "0.25em", textTransform: "uppercase" }}>
                Ready to grow?
              </span>
            </div>

            {/* Headline */}
            <h2 style={{ fontFamily: "var(--font-display,'Bebas Neue',Impact,sans-serif)", fontSize: "clamp(2.8rem,7vw,6rem)", lineHeight: 0.95, margin: "0 0 20px", color: "#fff" }}>
              LET&apos;S BUILD YOUR{" "}
              <span style={{ color: "#3395FF", textShadow: "0 0 40px rgba(0,122,255,0.5)" }}>BRAND</span>
            </h2>

            <p style={{ fontSize: "clamp(0.9rem,1.5vw,1.05rem)", color: "rgba(255,255,255,0.45)", maxWidth: 480, margin: "0 auto 36px", lineHeight: 1.75 }}>
              From identity to ads to content — we handle the full picture so you can focus on what you do best.
            </p>

            {/* Why us pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 36 }}>
              {WHY.map((w, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  style={{ display: "flex", alignItems: "center", gap: 7, padding: "7px 15px", borderRadius: 100, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
                >
                  <span style={{ fontSize: 14 }}>{w.icon}</span>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>{w.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0,122,255,0.6)" }}
                  whileTap={{ scale: 0.97 }}
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "15px 34px", borderRadius: 14, background: "#007AFF", color: "white", fontWeight: 600, fontSize: 14, border: "none", cursor: "pointer" }}
                >
                  Start a Project <ArrowRight size={15} />
                </motion.button>
              </Link>
              <a href="https://wa.me/201554529053" target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "15px 28px", borderRadius: 14, background: "rgba(37,211,102,0.08)", border: "1px solid rgba(37,211,102,0.25)", color: "rgba(37,211,102,0.9)", fontWeight: 500, fontSize: 14, cursor: "pointer" }}
                >
                  <MessageCircle size={15} />
                  WhatsApp Us
                </motion.button>
              </a>
            </div>

            {/* Response time note */}
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 20, fontFamily: "var(--font-mono,'JetBrains Mono',monospace)" }}>
              We respond within 24 hours · KSA &amp; Egypt
            </p>
          </motion.div>
        </Reveal>

        {/* Bottom social proof row */}
        <Reveal delay={0.15}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "center", marginTop: "3rem" }}>
            {[
              { label: "Instagram", handle: "@our_agency5", href: "https://instagram.com/our_agency5", color: "#E1306C" },
              { label: "TikTok",    handle: "@our_agency2", href: "https://tiktok.com/@our_agency2",   color: "#ffffff" },
              { label: "Email",     handle: "ouragency259@gmail.com", href: "mailto:ouragency259@gmail.com", color: "#007AFF" },
            ].map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                whileHover={{ y: -2 }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, textDecoration: "none" }}
              >
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", letterSpacing: "0.2em", textTransform: "uppercase" }}>{s.label}</span>
                <span style={{ fontSize: 13, color: s.color, fontWeight: 500 }}>{s.handle}</span>
              </motion.a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
