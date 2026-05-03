"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PORTFOLIO } from "@/constants";
import { Reveal } from "@/components/ui/Reveal";

type Filter = "All" | "KSA" | "Egypt";

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
};

export default function PortfolioSection() {
  const [filter, setFilter] = useState<Filter>("All");
  const filtered = PORTFOLIO.filter((p) => filter === "All" || p.region === filter);

  return (
    <section style={{ position: "relative", padding: "5rem 1.5rem", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 700, height: 350, pointerEvents: "none", background: "radial-gradient(ellipse,rgba(0,122,255,0.12) 0%,transparent 70%)", filter: "blur(80px)" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span style={{ fontSize: 11, fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", color: "#007AFF", letterSpacing: "0.3em", textTransform: "uppercase", display: "block", marginBottom: 12 }}>Case Studies</span>
          <h2 style={{ fontFamily: "var(--font-display,'Bebas Neue',Impact,sans-serif)", fontSize: "clamp(2.5rem,6vw,5rem)", lineHeight: 1, margin: "0 0 16px", background: "linear-gradient(135deg,#fff 0%,#007AFF 50%,#3395FF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            OUR WORK
          </h2>
          <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 15, maxWidth: 480, margin: "0 auto" }}>
            Real projects. Real results. Across two of the Middle East&apos;s most dynamic markets.
          </p>
        </Reveal>

        {/* Filter */}
        <Reveal delay={0.1} style={{ display: "flex", justifyContent: "center", marginBottom: "3rem" }}>
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 4, display: "flex", gap: 4 }}>
            {(["All", "KSA", "Egypt"] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  position: "relative", padding: "9px 22px", borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: "pointer", border: "none",
                  background: filter === f ? "#007AFF" : "transparent",
                  color: filter === f ? "white" : "rgba(255,255,255,0.45)",
                  transition: "all 0.2s",
                }}
              >
                {f === "All" ? "All Projects" : `${f} Projects`}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid */}
        <motion.div layout style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.25rem" }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.35 }}
                style={card}
              >
                {/* Top color bar */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${p.color},transparent)`, opacity: 0.7 }} />

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 11, fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", padding: "3px 10px", borderRadius: 20, color: p.color, border: `1px solid ${p.color}30`, background: `${p.color}10` }}>{p.region}</span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono,'JetBrains Mono',monospace)" }}>{p.sector}</span>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", padding: "3px 10px", borderRadius: 20, color: p.color, background: `${p.color}15` }}>{p.result}</span>
                </div>

                <h3 style={{ fontFamily: "var(--font-display,'Bebas Neue',Impact,sans-serif)", fontSize: "1.35rem", color: "white", marginBottom: 10 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.44)", lineHeight: 1.7, marginBottom: 16 }}>{p.desc}</p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {p.tags.map((tag) => (
                    <span key={tag} style={{ fontSize: 11, fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", padding: "3px 10px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.35)" }}>{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
