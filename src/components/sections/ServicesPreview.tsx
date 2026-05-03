"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/constants";
import { StaggerContainer, StaggerItem, Reveal } from "@/components/ui/Reveal";

export default function ServicesPreview() {
  return (
    <section style={{ position: "relative", padding: "6rem 1.5rem", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 450, height: 450, pointerEvents: "none", background: "radial-gradient(circle,rgba(0,122,255,0.08) 0%,transparent 70%)", filter: "blur(70px)" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto" }}>
        <Reveal style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1.5rem", marginBottom: "3rem" }}>
          <div>
            <span style={{ fontSize: 11, fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", color: "#007AFF", letterSpacing: "0.3em", textTransform: "uppercase", display: "block", marginBottom: 10 }}>What We Do</span>
            <h2 style={{ fontFamily: "var(--font-display,'Bebas Neue',Impact,sans-serif)", fontSize: "clamp(2.2rem,5vw,4.5rem)", lineHeight: 1, margin: 0, background: "linear-gradient(135deg,#fff 0%,#007AFF 50%,#3395FF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              OUR SERVICES
            </h2>
          </div>
          <Link href="/services">
            <motion.button whileHover={{ x: 4 }} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#007AFF", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              View All Services <ArrowRight size={14} />
            </motion.button>
          </Link>
        </Reveal>

        <StaggerContainer style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1rem" }}>
          {SERVICES.map((s) => (
            <StaggerItem key={s.id}>
              <motion.div
                whileHover={{ y: -4, borderColor: "rgba(0,122,255,0.32)" }}
                style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "1.5rem", transition: "all 0.3s", cursor: "default" }}
              >
                <div style={{ fontSize: 28, marginBottom: 14 }}>{s.icon}</div>
                <h3 style={{ fontFamily: "var(--font-display,'Bebas Neue',Impact,sans-serif)", fontSize: "1.25rem", color: "white", margin: "0 0 8px", lineHeight: 1.2 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.42)", lineHeight: 1.65, margin: "0 0 14px" }}>{s.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {s.tags.map(t => (
                    <span key={t} style={{ fontSize: 10, fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", padding: "3px 10px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.35)" }}>{t}</span>
                  ))}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
