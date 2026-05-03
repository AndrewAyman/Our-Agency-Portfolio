"use client";

import { motion } from "framer-motion";
import ValuesSection from "@/components/sections/ValuesSection";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/Reveal";
import { ABOUT, PROCESS } from "@/constants";

const card = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 16,
  padding: "1.75rem",
  position: "relative" as const,
  overflow: "hidden",
};

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section style={{ position: "relative", minHeight: "75vh", display: "flex", alignItems: "center", padding: "9rem 1.5rem 5rem", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: 600, height: 600, pointerEvents: "none", background: "radial-gradient(circle,rgba(0,122,255,0.14) 0%,transparent 70%)", filter: "blur(80px)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "4rem", alignItems: "center" }}>

          {/* Left text */}
          <div>
            <Reveal>
              <span style={{ fontSize: 11, fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", color: "#007AFF", letterSpacing: "0.3em", textTransform: "uppercase", display: "block", marginBottom: 20 }}>
                About OUR Agency
              </span>
              <h1 style={{ fontFamily: "var(--font-display,'Bebas Neue',Impact,sans-serif)", fontSize: "clamp(3rem,7vw,6rem)", lineHeight: 1, background: "linear-gradient(135deg,#fff 0%,#007AFF 50%,#3395FF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 28 }}>
                YOUNG.<br />HUNGRY.<br />CREATIVE.
              </h1>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, maxWidth: 500, marginBottom: 16 }}>
                {ABOUT.description}
              </p>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#007AFF" }}>
                {ABOUT.tagline}
              </p>
            </Reveal>
          </div>

          {/* Right — identity card */}
          <Reveal direction="left">
            <div style={card}>
              <div style={{ position: "absolute", top: 16, right: 20, fontFamily: "var(--font-display,'Bebas Neue',Impact,sans-serif)", fontSize: "5rem", color: "rgba(255,255,255,0.03)", lineHeight: 1, userSelect: "none" }}>OUR</div>
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 30%,rgba(0,122,255,0.1) 0%,transparent 60%)", pointerEvents: "none" }} />
              <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
                {[
                  { label: "Type", value: "Digital Marketing Agency" },
                  { label: "Founded", value: "KSA & Egypt" },
                  { label: "Services", value: "Branding · Ads · Content · SMM · Video" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 5 }}>{label}</div>
                    <div style={{ fontSize: 14, color: "rgba(255,255,255,0.78)" }}>{value}</div>
                  </div>
                ))}
                <div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10 }}>Markets</div>
                  <div style={{ display: "flex", gap: 10 }}>
                    {["🇸🇦 Saudi Arabia", "🇪🇬 Egypt"].map(m => (
                      <span key={m} style={{ fontSize: 13, padding: "6px 14px", borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.65)" }}>{m}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10 }}>Sectors</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {["Construction", "Medical", "F&B", "Podcast", "E-Commerce"].map(s => (
                      <span key={s} style={{ fontSize: 12, padding: "4px 12px", borderRadius: 20, border: "1px solid rgba(0,122,255,0.3)", color: "rgba(0,122,255,0.85)" }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Vision & Mission ── */}
      <section style={{ padding: "5rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 400, pointerEvents: "none", background: "radial-gradient(ellipse,rgba(0,122,255,0.08) 0%,transparent 70%)", filter: "blur(80px)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={{ fontSize: 11, fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", color: "#007AFF", letterSpacing: "0.3em", textTransform: "uppercase", display: "block", marginBottom: 12 }}>Who We Are</span>
            <h2 style={{ fontFamily: "var(--font-display,'Bebas Neue',Impact,sans-serif)", fontSize: "clamp(2.5rem,6vw,5rem)", lineHeight: 1, background: "linear-gradient(135deg,#fff 0%,#007AFF 50%,#3395FF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              VISION & MISSION
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "1.5rem" }}>
            {[
              { num: "02", label: "Our Vision", text: ABOUT.vision, accent: "#007AFF" },
              { num: "03", label: "Our Mission", text: ABOUT.mission, accent: "#3395FF" },
            ].map((item) => (
              <Reveal key={item.num}>
                <motion.div whileHover={{ y: -4 }} style={{ ...card, borderColor: `${item.accent}20` }}>
                  <div style={{ position: "absolute", top: 16, right: 20, fontFamily: "var(--font-display,'Bebas Neue',Impact,sans-serif)", fontSize: "5rem", color: "rgba(255,255,255,0.03)", lineHeight: 1 }}>{item.num}</div>
                  <div style={{ fontSize: 11, color: item.accent, fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 14 }}>{item.label}</div>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.85 }}>{item.text}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Process ── */}
      <section style={{ padding: "5rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={{ fontSize: 11, fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", color: "#007AFF", letterSpacing: "0.3em", textTransform: "uppercase", display: "block", marginBottom: 12 }}>How We Work</span>
            <h2 style={{ fontFamily: "var(--font-display,'Bebas Neue',Impact,sans-serif)", fontSize: "clamp(2.5rem,6vw,5rem)", lineHeight: 1, background: "linear-gradient(135deg,#fff 0%,#007AFF 50%,#3395FF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              OUR PROCESS
            </h2>
          </Reveal>
          <StaggerContainer style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1.25rem" }}>
            {PROCESS.map((step, i) => (
              <StaggerItem key={i}>
                <motion.div whileHover={{ y: -5 }} style={{ ...card, textAlign: "center" as const }}>
                  {/* Connector line (not last) */}
                  <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>{step.icon}</div>
                  <div style={{ fontFamily: "var(--font-display,'Bebas Neue',Impact,sans-serif)", fontSize: "1rem", color: "#007AFF", letterSpacing: "0.2em", marginBottom: 8 }}>{step.num}</div>
                  <h3 style={{ fontFamily: "var(--font-display,'Bebas Neue',Impact,sans-serif)", fontSize: "1.4rem", color: "white", marginBottom: 10, lineHeight: 1.2 }}>{step.title}</h3>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>{step.desc}</p>
                  {/* Bottom accent */}
                  <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "60%", height: 1, background: "linear-gradient(90deg,transparent,rgba(0,122,255,0.4),transparent)" }} />
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <ValuesSection />
    </>
  );
}
