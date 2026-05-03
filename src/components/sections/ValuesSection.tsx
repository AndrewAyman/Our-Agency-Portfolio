"use client";

import { motion } from "framer-motion";
import { VALUES, WHY_US } from "@/constants";
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
  transition: "all 0.35s ease",
  height: "100%",
};

const GRAD_COLORS: Record<string, string> = {
  Growth:       "rgba(0,122,255,0.12)",
  Transparency: "rgba(168,85,247,0.12)",
  Creativity:   "rgba(245,158,11,0.12)",
  Commitment:   "rgba(16,185,129,0.12)",
};

export default function ValuesSection() {
  return (
    <section style={{ position: "relative", padding: "5rem 1.5rem", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "30%", left: -160, width: 500, height: 500, pointerEvents: "none", background: "radial-gradient(circle,rgba(0,122,255,0.12) 0%,transparent 70%)", filter: "blur(80px)" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span style={{ fontSize: 11, fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", color: "#007AFF", letterSpacing: "0.3em", textTransform: "uppercase", display: "block", marginBottom: 12 }}>Our Values</span>
          <h2 style={{ fontFamily: "var(--font-display,'Bebas Neue',Impact,sans-serif)", fontSize: "clamp(2.5rem,6vw,5rem)", lineHeight: 1, margin: 0, background: "linear-gradient(135deg,#fff 0%,#007AFF 50%,#3395FF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            WHAT DRIVES US
          </h2>
        </Reveal>

        <StaggerContainer style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1.25rem", marginBottom: "6rem" }}>
          {VALUES.map((val, i) => (
            <StaggerItem key={i}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                className="group"
                style={card}
              >
                <div style={{ position: "absolute", inset: 0, background: GRAD_COLORS[val.title] || "transparent", opacity: 0, transition: "opacity 0.4s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
                />
                <div style={{ position: "absolute", top: 14, right: 20, fontFamily: "var(--font-display,'Bebas Neue',Impact,sans-serif)", fontSize: "4rem", color: "rgba(255,255,255,0.03)", lineHeight: 1, userSelect: "none" }}>
                  {(i + 1).toString().padStart(2, "0")}
                </div>
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ fontSize: "2.2rem", marginBottom: 18 }}>{val.icon}</div>
                  <h3 style={{ fontFamily: "var(--font-display,'Bebas Neue',Impact,sans-serif)", fontSize: "1.6rem", color: "white", marginBottom: 10 }}>{val.title}</h3>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.48)", lineHeight: 1.7, margin: 0 }}>{val.desc}</p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: "3rem" }}>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to right,transparent,rgba(255,255,255,0.1),transparent)" }} />
          <span style={{ fontSize: 11, fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", color: "#007AFF", letterSpacing: "0.3em", textTransform: "uppercase" }}>Why Us</span>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to right,transparent,rgba(255,255,255,0.1),transparent)" }} />
        </div>

        <StaggerContainer style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.25rem" }}>
          {WHY_US.map((item, i) => (
            <StaggerItem key={i}>
              <motion.div whileHover={{ x: 4 }} style={card}>
                <div style={{ display: "flex", gap: 20 }}>
                  <div style={{ fontFamily: "var(--font-display,'Bebas Neue',Impact,sans-serif)", fontSize: "2.5rem", color: "rgba(0,122,255,0.3)", lineHeight: 1, flexShrink: 0, marginTop: 2 }}>{item.num}</div>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 500, color: "white", marginBottom: 8 }}>{item.title}</h3>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.43)", lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
