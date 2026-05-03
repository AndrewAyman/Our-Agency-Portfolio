"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SERVICES } from "@/constants";
import { StaggerContainer, StaggerItem, Reveal } from "@/components/ui/Reveal";

const card = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 16,
  padding: "1.75rem",
  position: "relative" as const,
  overflow: "hidden",
  transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
  cursor: "pointer",
  height: "100%",
};

export default function ServicesSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section style={{ position: "relative", padding: "5rem 1.5rem", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 500, height: 500, pointerEvents: "none", background: "radial-gradient(circle,rgba(0,122,255,0.12) 0%,transparent 70%)", filter: "blur(80px)" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span style={{ fontSize: 11, fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", color: "#007AFF", letterSpacing: "0.3em", textTransform: "uppercase", display: "block", marginBottom: 12 }}>What We Do</span>
          <h2 style={{ fontFamily: "var(--font-display,'Bebas Neue',Impact,sans-serif)", fontSize: "clamp(2.5rem,6vw,5rem)", lineHeight: 1, margin: "0 0 16px", background: "linear-gradient(135deg,#fff 0%,#007AFF 50%,#3395FF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            OUR SERVICES
          </h2>
          <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 15, maxWidth: 480, margin: "0 auto" }}>
            End-to-end creative solutions — from strategy to execution.
          </p>
        </Reveal>

        <StaggerContainer style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.25rem" }}>
          {SERVICES.map((s) => (
            <StaggerItem key={s.id}>
              <motion.div
                onHoverStart={() => setHovered(s.id)}
                onHoverEnd={() => setHovered(null)}
                whileHover={{ y: -5 }}
                style={{
                  ...card,
                  border: hovered === s.id ? "1px solid rgba(0,122,255,0.38)" : "1px solid rgba(255,255,255,0.08)",
                  background: hovered === s.id ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.04)",
                  boxShadow: hovered === s.id ? "0 16px 48px rgba(0,0,0,0.5),0 0 30px rgba(0,122,255,0.1)" : "none",
                }}
              >
                <AnimatePresence>
                  {hovered === s.id && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 30%,rgba(0,122,255,0.08) 0%,transparent 60%)", pointerEvents: "none" }}
                    />
                  )}
                </AnimatePresence>
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 20 }}>
                    {s.icon}
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
                    <h3 style={{ fontFamily: "var(--font-display,'Bebas Neue',Impact,sans-serif)", fontSize: "1.4rem", color: "white", lineHeight: 1.2, margin: 0, paddingRight: 8 }}>{s.title}</h3>
                    <motion.div animate={{ x: hovered === s.id ? 0 : -6, opacity: hovered === s.id ? 1 : 0 }} style={{ marginTop: 4, flexShrink: 0 }}>
                      <ArrowRight size={15} color="#007AFF" />
                    </motion.div>
                  </div>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: 16 }}>{s.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {s.tags.map((tag) => (
                      <span key={tag} style={{ fontSize: 11, fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", padding: "3px 10px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Reveal delay={0.3} style={{ textAlign: "center", marginTop: "3.5rem" }}>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(0,122,255,0.4)" }}
              whileTap={{ scale: 0.97 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 32px", borderRadius: 16, background: "#007AFF", color: "white", fontWeight: 500, fontSize: 14, border: "none", cursor: "pointer" }}
            >
              Let&apos;s Discuss Your Project <ArrowRight size={15} />
            </motion.button>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
