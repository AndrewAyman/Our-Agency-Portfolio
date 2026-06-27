"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaHardHat,
  FaHospital,
  FaUtensils,
  FaMicrophone,
  FaShoppingBag,
  FaMobileAlt,
  FaChartLine,
} from "react-icons/fa";
import { CLIENTS } from "@/constants";

const EASE = [0.22, 1, 0.36, 1] as const;
const ACCENT = "#8D9AB0";

const getIcon = (name: string) => {
  const n = name.toLowerCase();
  if (
    n.includes("construct") ||
    n.includes("engineer") ||
    n.includes("contract")
  )
    return FaHardHat;
  if (
    n.includes("medical") ||
    n.includes("doctor") ||
    n.includes("health") ||
    n.includes("clinic")
  )
    return FaHospital;
  if (
    n.includes("restaurant") ||
    n.includes("café") ||
    n.includes("food") ||
    n.includes("beverage")
  )
    return FaUtensils;
  if (n.includes("podcast") || n.includes("media") || n.includes("show"))
    return FaMicrophone;
  if (n.includes("e-commerce") || n.includes("store") || n.includes("shop"))
    return FaShoppingBag;
  if (n.includes("tech") || n.includes("digital")) return FaMobileAlt;
  return FaChartLine;
};

function MarqueeRow({
  items,
  speed = 35,
  reverse = false,
}: {
  items: string[];
  speed?: number;
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden">
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
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 cursor-default shrink-0"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background =
                  "rgba(141,154,176,0.08)";
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "rgba(141,154,176,0.25)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background =
                  "rgba(255,255,255,0.03)";
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "rgba(255,255,255,0.07)";
              }}
            >
              <Icon size={13} style={{ color: ACCENT, flexShrink: 0 }} />
              <span
                className="font-mono font-medium text-xs tracking-[0.05em]"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                {client}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

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
        className="left-0 z-[2] absolute inset-y-0 w-[120px] pointer-events-none"
        style={{
          background: "linear-gradient(to right, #0D1117, transparent)",
        }}
      />
      <div
        aria-hidden
        className="right-0 z-[2] absolute inset-y-0 w-[120px] pointer-events-none"
        style={{ background: "linear-gradient(to left, #0D1117, transparent)" }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE }}
        className="mb-7 px-6 text-center"
      >
        <div
          className="inline-flex items-center gap-2.5 px-4 py-[5px] rounded-full"
          style={{
            background: "rgba(141,154,176,0.07)",
            border: "1px solid rgba(141,154,176,0.18)",
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="rounded-full w-[5px] h-[5px]"
            style={{ background: ACCENT }}
          />
          <span className="font-mono text-[10px] text-white/35 uppercase tracking-[0.3em]">
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
        @keyframes marqueeFwd { from { transform: translateX(0); }    to { transform: translateX(-50%); } }
        @keyframes marqueeRev { from { transform: translateX(-50%); } to { transform: translateX(0); }    }
        @media (prefers-reduced-motion: reduce) {
          [style*="marqueeFwd"], [style*="marqueeRev"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
