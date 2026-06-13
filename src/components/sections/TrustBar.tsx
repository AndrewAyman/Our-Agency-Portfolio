"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaHardHat, FaHospital, FaUtensils, FaMicrophone,
  FaShoppingBag, FaMobileAlt, FaTooth, FaChartLine,
} from "react-icons/fa";
import { CLIENTS } from "@/constants";

const EASE = [0.22, 1, 0.36, 1] as const;

const getIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("construct") || n.includes("engineer") || n.includes("architect") || n.includes("contract")) return FaHardHat;
  if (n.includes("dental") || n.includes("tooth") || n.includes("clinic")) return FaTooth;
  if (n.includes("medical") || n.includes("doctor") || n.includes("hospital")) return FaHospital;
  if (n.includes("restaurant") || n.includes("café") || n.includes("food") || n.includes("beverage")) return FaUtensils;
  if (n.includes("podcast") || n.includes("media") || n.includes("show")) return FaMicrophone;
  if (n.includes("e-commerce") || n.includes("fashion") || n.includes("store") || n.includes("shop")) return FaShoppingBag;
  if (n.includes("tech") || n.includes("erp") || n.includes("fintech") || n.includes("digital")) return FaMobileAlt;
  return FaChartLine;
};

/* ── Marquee row ── */
function MarqueeRow({ items, speed = 35, reverse = false }: { items: string[]; speed?: number; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden relative">
      <div
        className="flex gap-3"
        style={{
          width: "max-content",
          animation: `marquee${reverse ? "Rev" : "Fwd"} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((client, i) => {
          const Icon = getIcon(client);
          return (
            <div
              key={i}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full whitespace-nowrap shrink-0 transition-all duration-300 cursor-default group"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.background = "rgba(0,122,255,0.08)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,122,255,0.25)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
              }}
            >
              <Icon size={13} className="text-[#007AFF] shrink-0" />
              <span className="text-xs font-medium text-white/40 font-mono tracking-[0.05em]">
                {client}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════ */
export default function TrustBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const half = Math.ceil(CLIENTS.length / 2);
  const row1 = CLIENTS.slice(0, half);
  const row2 = CLIENTS.slice(half);

  return (
    <section
      ref={ref}
      aria-label="Trusted clients"
      className="relative py-16 overflow-hidden"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Fade edges */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-[120px] z-[2] pointer-events-none"
        style={{ background: "linear-gradient(to right, #080C14, transparent)" }}
      />
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 w-[120px] z-[2] pointer-events-none"
        style={{ background: "linear-gradient(to left, #080C14, transparent)" }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE }}
        className="text-center mb-7 px-6"
      >
        <div
          className="inline-flex items-center gap-2.5 px-4 py-[5px] rounded-full"
          style={{
            background: "rgba(0,122,255,0.07)",
            border: "1px solid rgba(0,122,255,0.18)",
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="w-[5px] h-[5px] rounded-full bg-[#007AFF]"
          />
          <span className="text-[10px] font-mono text-white/35 tracking-[0.3em] uppercase">
            Trusted by brands across KSA &amp; Egypt
          </span>
        </div>
      </motion.div>

      {/* Row 1 */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
        className="mb-2.5"
      >
        <MarqueeRow items={row1.length >= 3 ? row1 : CLIENTS} speed={30} />
      </motion.div>

      {/* Row 2 */}
      {row2.length >= 2 && (
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
        >
          <MarqueeRow items={row2} speed={38} reverse />
        </motion.div>
      )}

      <style>{`
        @keyframes marqueeFwd {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marqueeRev {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="marqueeFwd"], [style*="marqueeRev"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}