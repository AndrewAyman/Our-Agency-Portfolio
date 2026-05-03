"use client";

import { motion } from "framer-motion";
import { CLIENTS } from "@/constants";

// ✅ Pure CSS marquee - zero JS animation overhead
const doubled = [...CLIENTS, ...CLIENTS];

export default function TrustBar() {
  return (
    <section style={{ position: "relative", padding: "3.5rem 0", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>

      {/* Fades */}
      <div style={{ position: "absolute", inset: "0 auto 0 0", width: 100, background: "linear-gradient(to right, #0A0A0A, transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: "0 0 0 auto", width: 100, background: "linear-gradient(to left, #0A0A0A, transparent)", zIndex: 2, pointerEvents: "none" }} />

      {/* Label */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{ textAlign: "center", fontSize: 10, fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", color: "rgba(255,255,255,0.2)", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 20 }}
      >
        Trusted by brands across KSA &amp; Egypt
      </motion.p>

      {/* Single row marquee — CSS only */}
      <div style={{ overflow: "hidden" }}>
        <div className="animate-marquee" style={{ display: "flex", gap: 14, width: "max-content" }}>
          {doubled.map((client, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 18px", borderRadius: 100, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", whiteSpace: "nowrap", flexShrink: 0 }}>
              <span style={{ fontSize: 15 }}>
                {["Construction Companies","Engineering Offices","Consulting Firms","Service Businesses"].includes(client) ? "🏗️" :
                 ["Medical Clinics","Doctors & Specialists"].includes(client) ? "🏥" :
                 ["Restaurants & Cafés","Food & Beverage Brands"].includes(client) ? "🍽️" :
                 ["Podcast Creators","Media Shows"].includes(client) ? "🎙️" :
                 ["E-Commerce Brands"].includes(client) ? "🛍️" : "⭐"}
              </span>
              <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.45)" }}>{client}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
