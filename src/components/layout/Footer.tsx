"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiInstagram, FiExternalLink } from "react-icons/fi";
import { SiTiktok } from "react-icons/si";
import { NAV_LINKS } from "@/constants";

const SOCIALS = [
  { icon: FiInstagram, href: "https://instagram.com/our_agency5", label: "Instagram" },
  { icon: SiTiktok,    href: "https://tiktok.com/@our_agency2",   label: "TikTok"    },
  
];

export default function Footer() {
  return (
    <footer style={{ position: "relative", borderTop: "1px solid rgba(255,255,255,0.08)", overflow: "hidden", background: "#0D1117" }}>
      <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 600, height: 280, pointerEvents: "none", background: "radial-gradient(ellipse,rgba(0,122,255,0.18) 0%,transparent 70%)", filter: "blur(40px)" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "4rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "3rem", marginBottom: "3rem" }}>

          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16, textDecoration: "none" }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "#007AFF", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 16px rgba(0,122,255,0.45)" }}>
                <span style={{ fontFamily: "var(--font-display,'Bebas Neue',Impact,sans-serif)", color: "white", fontSize: 15 }}>O</span>
              </div>
              <span style={{ fontFamily: "var(--font-display,'Bebas Neue',Impact,sans-serif)", fontSize: 20, letterSpacing: "0.1em", color: "white" }}>
                OUR<span style={{ color: "#007AFF" }}>.</span>AGENCY
              </span>
            </Link>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", lineHeight: 1.7, maxWidth: 240, marginBottom: 20 }}>
              Your vision, our mission. A young, results-driven creative agency across KSA &amp; Egypt.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <motion.a key={label} href={href} target="_blank" aria-label={label} whileHover={{ scale: 1.12, y: -2 }}
                  style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 style={{ fontSize: 11, fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", color: "rgba(255,255,255,0.28)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20 }}>Navigation</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} style={{ fontSize: 14, color: "rgba(255,255,255,0.48)", textDecoration: "none" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "white")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.48)")}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ fontSize: 11, fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", color: "rgba(255,255,255,0.28)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20 }}>Get In Touch</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0 }}>🇪🇬 <span style={{ color: "rgba(255,255,255,0.75)" }}>+20 155 452 9053</span></p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0 }}>🇪🇬 <span style={{ color: "rgba(255,255,255,0.75)" }}>+20 102 608 1399</span></p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0 }}>🇪🇬 <span style={{ color: "rgba(255,255,255,0.75)" }}>+20 103 514 0832</span></p>
              <a href="mailto:ouragency259@gmail.com" style={{ fontSize: 13, color: "#007AFF", textDecoration: "none" }}>ouragency259@gmail.com</a>
            </div>
            <Link href="/contact">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{ padding: "10px 20px", borderRadius: 12, fontSize: 13, fontWeight: 500, color: "white", cursor: "pointer", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,122,255,0.35)" }}>
                Start a Project →
              </motion.button>
            </Link>
          </div>
        </div>

        <div style={{ paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", margin: 0 }}>© {new Date().getFullYear()} OUR Agency. All rights reserved.</p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.18)", fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", margin: 0 }}>KSA · EG · Your Vision, Our Mission.</p>
        </div>
      </div>
    </footer>
  );
}
