"use client";

import PortfolioSection from "@/components/sections/PortfolioSection";
import CTASection from "@/components/sections/CTASection";
import { Reveal } from "@/components/ui/Reveal";
import { motion } from "framer-motion";
import { 
  Users, 
  TrendingUp, 
  Target, 
  Zap,
  Image as ImageIcon,
  Video,
  BarChart3,
  Sparkles
} from "lucide-react";

// Campaign stats data
const CAMPAIGN_STATS = [
  { value: "60+", label: "New Clients", sub: "From single campaign", Icon: Users },
  { value: "340%", label: "ROI", sub: "Average return", Icon: TrendingUp },
  { value: "2.4M", label: "Reach", sub: "Across KSA & Egypt", Icon: Target },
  { value: "87%", label: "Conversion", sub: "Lead-to-client rate", Icon: Zap },
];

// Campaign placeholder data
const CAMPAIGN_PLACEHOLDERS = [
  { label: "Social Campaign", Icon: ImageIcon },
  { label: "Video Content", Icon: Video },
  { label: "Performance Data", Icon: BarChart3 },
  { label: "Creative Assets", Icon: Sparkles },
];

export default function OurWorkPage() {
  return (
    <>
      {/* ═══════════════ PAGE HERO ═══════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          padding: "130px 1.5rem 60px",
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, #0d1a28 0%, #0D1117 55%, #0A0A0A 100%)",
        }}
      >
        {/* Grid bg */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(141,154,176,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(141,154,176,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "linear-gradient(to bottom, black 0%, transparent 80%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, transparent 80%)",
          }}
        />

        {/* Ambient orb */}
        <div
          style={{
            position: "absolute",
            top: "-5%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 550,
            height: 550,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(141,154,176,0.1) 0%, transparent 65%)",
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />

        <div className="z-[1] relative mx-auto max-w-[1280px] text-center">
          <Reveal>
            <div
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full"
              style={{
                background: "rgba(141,154,176,0.08)",
                border: "1px solid rgba(141,154,176,0.22)",
              }}
            >
              <span
                className="font-mono uppercase"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.25em",
                  color: "rgba(141,154,176,0.7)",
                }}
              >
                Portfolio &amp; Case Studies
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1
              className="m-0 mb-5 leading-none"
              style={{
                fontFamily:
                  "var(--font-display,'Bebas Neue',Impact,sans-serif)",
                fontSize: "clamp(3.5rem,10vw,8rem)",
                background:
                  "linear-gradient(135deg, #ffffff 0%, #8D9AB0 55%, #B0BDD0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              OUR PORTFOLIO
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p
              style={{
                fontSize: "clamp(0.95rem,1.6vw,1.1rem)",
                color: "rgba(255,255,255,0.42)",
                maxWidth: 560,
                margin: "0 auto 48px",
                lineHeight: 1.8,
              }}
            >
              Real projects. Real results. From brand identities to performance
              campaigns — here&apos;s what we&apos;ve built across{" "}
              <span
                style={{ color: "rgba(255,255,255,0.78)", fontWeight: 500 }}
              >
                Saudi Arabia &amp; Egypt
              </span>
              .
            </p>
          </Reveal>

          {/* Quick stats */}
          <Reveal delay={0.3}>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { value: "1M+", label: "Impressions" },
                { value: "6+", label: "Sectors" },
                { value: "2", label: "Countries" },
                { value: "100%", label: "Commitment" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-5 py-3 rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <span
                    style={{
                      fontFamily:
                        "var(--font-display,'Bebas Neue',Impact,sans-serif)",
                      fontSize: "1.6rem",
                      background: "linear-gradient(135deg,#B0BDD0,#8D9AB0)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </span>
                  <span
                    className="font-mono uppercase"
                    style={{
                      fontSize: 10,
                      color: "rgba(255,255,255,0.32)",
                      letterSpacing: "0.15em",
                      lineHeight: 1.3,
                      maxWidth: 70,
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ PORTFOLIO SECTION ═══════════════ */}
      <PortfolioSection />

      {/* ═══════════════ CAMPAIGN RESULTS ═══════════════ */}
      <section className="py-28 px-4 sm:px-6 border-t border-white/[0.06]">
        <div className="max-w-[1280px] mx-auto">
          <Reveal className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full"
              style={{
                background: "rgba(141,154,176,0.08)",
                border: "1px solid rgba(141,154,176,0.22)",
              }}
            >
              <span
                className="font-mono uppercase"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.25em",
                  color: "rgba(141,154,176,0.7)",
                }}
              >
                Proof of Work
              </span>
            </div>
            <h2
              className="m-0 mb-4 leading-none"
              style={{
                fontFamily: "var(--font-display,'Bebas Neue',Impact,sans-serif)",
                fontSize: "clamp(2.8rem,6vw,4.5rem)",
                background:
                  "linear-gradient(135deg, #ffffff 0%, #8D9AB0 55%, #B0BDD0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              CAMPAIGN RESULTS
            </h2>
            <p className="text-white/35 text-sm mt-4 max-w-[460px] mx-auto">
              Real before &amp; after — one campaign that brought in 60+ clients.
            </p>
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden mb-10">
              {CAMPAIGN_STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ background: "rgba(141, 154, 176,0.06)" }}
                  className="py-8 sm:py-10 px-4 sm:px-8 bg-white/[0.04] text-center"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8 }}
                    className="flex justify-center mb-3 text-[#8D9AB0]"
                  >
                    <stat.Icon size={28} strokeWidth={1.5} />
                  </motion.div>
                  <div 
                    className="text-white text-[2rem] sm:text-[2.8rem] leading-none mb-2"
                    style={{ fontFamily: "'Bebas Neue',Impact,sans-serif" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[13px] text-white/70 mb-1 font-medium">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-white/35 font-mono">
                    {stat.sub}
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {CAMPAIGN_PLACEHOLDERS.map(({ label, Icon: PlaceholderIcon }, i) => (
              <Reveal key={label} delay={i * 0.1}>
                <motion.div
                  whileHover={{ 
                    borderColor: "rgba(141, 154, 176,0.25)", 
                    y: -4, 
                    boxShadow: "0 16px 50px rgba(141, 154, 176,0.1)" 
                  }}
                  className="aspect-video flex flex-col items-center justify-center gap-3"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px dashed rgba(255,255,255,0.08)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "16px",
                    padding: "2rem",
                  }}
                >
                  <motion.div
                    animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.08, 1] }}
                    transition={{ duration: 5 + i, repeat: Infinity }}
                    className="text-white/20"
                  >
                    <PlaceholderIcon size={40} strokeWidth={1} />
                  </motion.div>
                  <div className="text-xs text-white/35 font-mono tracking-[0.15em] uppercase">
                    {label}
                  </div>
                  <div className="text-[11px] text-white/20 text-center max-w-[200px]">
                    Drop your campaign image here
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA SECTION ═══════════════ */}
      <CTASection />
    </>
  );
}