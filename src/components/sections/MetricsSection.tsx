"use client";

import { motion } from "framer-motion";
import { METRICS } from "@/constants";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { StaggerContainer, StaggerItem, Reveal } from "@/components/ui/Reveal";

export default function MetricsSection() {
  return (
    <section style={{ position: "relative", padding: "6rem 1.5rem", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 300, pointerEvents: "none", background: "radial-gradient(ellipse,rgba(0,122,255,0.09) 0%,transparent 70%)", filter: "blur(50px)" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span style={{ fontSize: 11, fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", color: "#007AFF", letterSpacing: "0.3em", textTransform: "uppercase", display: "block", marginBottom: 12 }}>Real Impact</span>
          <h2 style={{ fontFamily: "var(--font-display,'Bebas Neue',Impact,sans-serif)", fontSize: "clamp(2.2rem,5vw,4.5rem)", lineHeight: 1, margin: "0 0 14px", background: "linear-gradient(135deg,#fff 0%,#007AFF 50%,#3395FF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            NUMBERS THAT MATTER
          </h2>
          <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 14, maxWidth: 420, margin: "0 auto" }}>
            We don&apos;t chase vanity metrics — these numbers reflect real business growth.
          </p>
        </Reveal>

        {/* 4 metric cards */}
        <StaggerContainer style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
          {METRICS.map((m, i) => (
            <StaggerItem key={i}>
              <motion.div
                whileHover={{ y: -4, borderColor: "rgba(0,122,255,0.35)" }}
                style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "1.6rem", textAlign: "center", transition: "border-color 0.3s" }}
              >
                <div style={{ fontFamily: "var(--font-display,'Bebas Neue',Impact,sans-serif)", fontSize: "clamp(2.4rem,5vw,3.2rem)", lineHeight: 1, marginBottom: 8, background: "linear-gradient(135deg,#3395FF,#007AFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  <AnimatedCounter value={m.value} />
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.78)", marginBottom: 3 }}>{m.label}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-mono,'JetBrains Mono',monospace)" }}>{m.sub}</div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* 1M+ strip */}
        <Reveal delay={0.2}>
          <div style={{ background: "rgba(0,122,255,0.06)", border: "1px solid rgba(0,122,255,0.2)", borderRadius: 16, padding: "1.4rem 2rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
            <div>
              <p style={{ fontFamily: "var(--font-display,'Bebas Neue',Impact,sans-serif)", fontSize: "clamp(1.3rem,3vw,1.8rem)", color: "white", margin: "0 0 4px" }}>1,000,000+ IMPRESSIONS DELIVERED</p>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, margin: 0 }}>Ad campaigns across KSA — and counting every month.</p>
            </div>
            <div style={{ background: "rgba(0,122,255,0.12)", border: "1px solid rgba(0,122,255,0.3)", borderRadius: 12, padding: "10px 20px", textAlign: "center" }}>
              <p style={{ fontSize: 10, color: "#007AFF", fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 3px" }}>Strategy</p>
              <p style={{ fontFamily: "var(--font-display,'Bebas Neue',Impact,sans-serif)", fontSize: "1.2rem", color: "white", margin: 0 }}>REAL GROWTH</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
