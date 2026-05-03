"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#0D1117",
      }}
    >
      {/* ── Animated gradient bg (CSS keyframes, zero JS) ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        {/* Base gradient — dark navy, not pure black */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, #0d1f3c 0%, #0D1117 55%, #0A0A0A 100%)",
          }}
        />

        {/* Animated orb 1 — center blue */}
        <div
          style={{
            position: "absolute",
            borderRadius: "50%",
            pointerEvents: "none",
            width: 700,
            height: 700,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(0,122,255,0.22) 0%, transparent 65%)",
            animation: "orbPulse 6s ease-in-out infinite",
          }}
        />

        {/* Animated orb 2 — top right accent */}
        <div
          style={{
            position: "absolute",
            borderRadius: "50%",
            pointerEvents: "none",
            width: 400,
            height: 400,
            top: "-5%",
            right: "0%",
            background:
              "radial-gradient(circle, rgba(0,80,200,0.15) 0%, transparent 70%)",
            filter: "blur(40px)",
            animation: "orbDrift 10s ease-in-out infinite",
          }}
        />

        {/* Animated orb 3 — bottom left */}
        <div
          style={{
            position: "absolute",
            borderRadius: "50%",
            pointerEvents: "none",
            width: 350,
            height: 350,
            bottom: "5%",
            left: "5%",
            background:
              "radial-gradient(circle, rgba(0,60,180,0.12) 0%, transparent 70%)",
            filter: "blur(50px)",
            animation: "orbDrift 13s ease-in-out infinite reverse",
          }}
        />

        {/* Grid lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(0,122,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(0,122,255,0.045) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            animation: "gridFade 8s ease-in-out infinite",
          }}
        />

        {/* Shimmer line top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background:
              "linear-gradient(90deg, transparent 0%, rgba(0,122,255,0.6) 40%, rgba(0,122,255,0.9) 50%, rgba(0,122,255,0.6) 60%, transparent 100%)",
            animation: "shimmerLine 4s ease-in-out infinite",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: "80px 1.5rem 0",
          maxWidth: 860,
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 30,
            padding: "8px 18px",
            borderRadius: 100,
            background: "rgba(0,122,255,0.09)",
            border: "1px solid rgba(0,122,255,0.28)",
            backdropFilter: "blur(8px)",
          }}
        >
          <Zap size={12} color="#007AFF" />
          <span
            style={{
              fontSize: 11,
              fontFamily: "var(--font-mono,'JetBrains Mono',monospace)",
              color: "rgba(255,255,255,0.55)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            KSA &amp; Egypt&apos;s Creative Partner
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-display,'Bebas Neue',Impact,sans-serif)",
            fontSize: "clamp(3.8rem,11vw,9.5rem)",
            lineHeight: 0.93,
            letterSpacing: "-0.01em",
            margin: "0 0 22px",
          }}
        >
          <span style={{ display: "block", color: "#F0F4FF" }}>
            YOUR VISION,
          </span>
          <span
            style={{
              display: "block",
              color: "#3395FF",
              textShadow:
                "0 0 50px rgba(0,122,255,0.65), 0 0 100px rgba(0,122,255,0.25), 0 0 200px rgba(0,122,255,0.1)",
            }}
          >
            OUR MISSION
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{
            fontSize: "clamp(0.95rem,1.8vw,1.1rem)",
            color: "rgba(255,255,255,0.45)",
            maxWidth: 520,
            margin: "0 auto 38px",
            lineHeight: 1.8,
          }}
        >
          We are a young, results-obsessed creative agency building brand
          empires through{" "}
          <span style={{ color: "rgba(255,255,255,0.82)", fontWeight: 500 }}>
            Branding, Ads, Content &amp; Video
          </span>{" "}
          across Saudi Arabia &amp; Egypt.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.48 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link href="/contact">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 0 40px rgba(0,122,255,0.6), 0 8px 32px rgba(0,122,255,0.3)",
              }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 32px",
                borderRadius: 14,
                background: "#007AFF",
                color: "white",
                fontWeight: 600,
                fontSize: 14,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 0 20px rgba(0,122,255,0.35)",
              }}
            >
              Start Your Project <ArrowRight size={15} />
            </motion.button>
          </Link>
          <Link href="/services">
            <motion.button
              whileHover={{
                scale: 1.03,
                background: "rgba(255,255,255,0.08)",
                borderColor: "rgba(0,122,255,0.4)",
              }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "14px 28px",
                borderRadius: 14,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.14)",
                color: "rgba(255,255,255,0.75)",
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                backdropFilter: "blur(8px)",
                transition: "all 0.25s",
              }}
            >
              Explore Services
            </motion.button>
          </Link>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          style={{
            marginTop: 60,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              fontSize: 10,
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.18)",
              fontFamily: "var(--font-mono,'JetBrains Mono',monospace)",
            }}
          >
            SCROLL
          </span>
          <div
            style={{
              width: 1,
              height: 38,
              background:
                "linear-gradient(to bottom, rgba(0,122,255,0.5), transparent)",
              animation: "scrollBob 1.8s ease-in-out infinite",
            }}
          />
        </motion.div>
      </div>

      {/* ── Side text decoration ── */}
      <div
        style={{
          position: "absolute",
          left: 22,
          top: "50%",
          transform: "translateY(-50%) rotate(-90deg)",
          display: "flex",
          gap: 24,
          pointerEvents: "none",
        }}
      >
        {["BRANDING", "ADS", "SMM", "CONTENT", "VIDEO"].map((t, i) => (
          <span
            key={i}
            style={{
              fontSize: 9,
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.08)",
              fontFamily: "var(--font-mono,'JetBrains Mono',monospace)",
              whiteSpace: "nowrap",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* ── CSS Keyframes ── */}
      <style>{`
        @keyframes orbPulse {
          0%, 100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1); }
          50%       { opacity: 1;   transform: translate(-50%, -50%) scale(1.08); }
        }
        @keyframes orbDrift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(-30px, 20px) scale(1.05); }
          66%       { transform: translate(20px, -15px) scale(0.97); }
        }
        @keyframes gridFade {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 1; }
        }
        @keyframes shimmerLine {
          0%   { opacity: 0; transform: scaleX(0); transform-origin: left; }
          30%  { opacity: 1; transform: scaleX(1); }
          70%  { opacity: 1; transform: scaleX(1); }
          100% { opacity: 0; transform: scaleX(0); transform-origin: right; }
        }
        @keyframes scrollBob {
          0%, 100% { opacity: 0.6; transform: translateY(0); }
          50%       { opacity: 1;   transform: translateY(6px); }
        }
      `}</style>
    </section>
  );
}
