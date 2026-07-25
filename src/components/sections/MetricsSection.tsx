"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Zap, Globe, TrendingUp } from "lucide-react";
import { METRICS } from "@/constants";
import { Reveal } from "@/components/ui/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;
const ACCENT = "#8D9AB0";
const ACCENT_L = "#B0BDD0";

const METRIC_ICONS = [Users, Zap, Globe, TrendingUp];

/* ── Animated counter ── */
function useCounter(to: number, active: boolean, duration = 1500) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * to));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(to);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, to, duration]);
  return count;
}

function parseMetric(raw: string | number) {
  const str = String(raw);
  const num = parseInt(str.replace(/\D/g, ""), 10);
  const suffix = str.replace(/[\d]/g, "");
  return { num: isNaN(num) ? 0 : num, suffix };
}

function MetricCard({
  metric,
  index,
  active,
}: {
  metric: (typeof METRICS)[0];
  index: number;
  active: boolean;
}) {
  const { num, suffix } = parseMetric(metric.value);
  const count = useCounter(num, active, 1400 + index * 100);
  const Icon = METRIC_ICONS[index % METRIC_ICONS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.95 }}
      animate={active ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: EASE }}
      whileHover={{ y: -6, borderColor: "rgba(141,154,176,0.4)" }}
      className="relative backdrop-blur-md px-7 py-8 rounded-[20px] overflow-hidden text-center transition-[border-color] duration-300"
      style={{
        background: "rgba(255,255,255,0.035)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Top glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(141,154,176,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Accent top line */}
      <motion.div
        animate={{ scaleX: active ? 1 : 0, opacity: [0.4, 0.9, 0.4] }}
        transition={{
          scaleX: { duration: 0.8, delay: index * 0.12 + 0.4 },
          opacity: { duration: 3, repeat: Infinity },
        }}
        className="top-0 right-0 left-0 absolute h-px origin-left"
        style={{
          background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`,
        }}
      />

      <div className="z-[1] relative">
        {/* Icon */}
        <motion.div
          animate={
            active
              ? { rotate: [0, -12, 12, 0], color: ACCENT }
              : { color: "rgba(255,255,255,0.25)" }
          }
          transition={{ duration: 0.6, delay: index * 0.12 + 0.3 }}
          className="flex justify-center mb-4"
        >
          <Icon size={22} />
        </motion.div>

        {/* Counter */}
        <div
          className="mb-2.5 font-['Bebas_Neue',Impact,sans-serif] leading-none"
          style={{
            fontSize: "clamp(2.2rem,5vw,3rem)",
            background: `linear-gradient(135deg, ${ACCENT_L}, ${ACCENT})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {count}
          {suffix}
        </div>

        <div className="mb-1 font-semibold text-[13px] text-white/75">
          {metric.label}
        </div>
        <div className="font-mono text-[11px] text-white/28 tracking-[0.1em]">
          {metric.sub}
        </div>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════ */
export default function MetricsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-label="Results and metrics"
      className="relative px-6 py-28 overflow-hidden"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Center ambient — silver */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 9, repeat: Infinity }}
        className="top-1/2 left-1/2 absolute w-[700px] h-[350px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(141,154,176,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="z-[1] relative mx-auto max-w-[1280px]">
        <Reveal style={{ textAlign: "center", marginBottom: "4.5rem" }}>
          <span
            className="block mb-3.5 font-mono text-[11px] uppercase tracking-[0.35em]"
            style={{ color: ACCENT }}
          >
            Real Impact
          </span>
          <h2
            className="m-0 mb-3.5 font-['Bebas_Neue',Impact,sans-serif] leading-none"
            style={{
              fontSize: "clamp(2.2rem,6vw,5rem)",
              background: `linear-gradient(135deg, #fff 0%, ${ACCENT} 55%, ${ACCENT_L} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            NUMBERS THAT MATTER
          </h2>
          <p className="mx-auto max-w-[400px] text-white/35 text-sm leading-[1.75]">
            We don&apos;t chase vanity metrics — these numbers reflect real
            business growth.
          </p>
        </Reveal>

        {/* Cards */}
        <div
          className="gap-[1.1rem] grid mb-6"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          }}
        >
          {METRICS.map((m, i) => (
            <MetricCard key={i} metric={m} index={i} active={inView} />
          ))}
        </div>

        {/* 1M+ strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          whileHover={{ borderColor: "rgba(141,154,176,0.35)" }}
          className="flex flex-wrap justify-between items-center gap-4 px-8 py-6 rounded-[18px] transition-[border-color] duration-300"
          style={{
            background: "rgba(141,154,176,0.05)",
            border: "1px solid rgba(141,154,176,0.18)",
          }}
        >
          <div>
            <p
              className="m-0 mb-1 font-['Bebas_Neue',Impact,sans-serif] text-white tracking-[0.04em]"
              style={{ fontSize: "clamp(1.2rem,3vw,1.8rem)" }}
            >
              1000000+ IMPRESSIONS DELIVERED
            </p>
            <p className="m-0 font-mono text-white/32 text-xs">
              Ad campaigns across KSA — and counting every month.
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.04 }}
            className="px-6 py-3 rounded-xl text-center transition-all duration-300"
            style={{
              background: "rgba(141,154,176,0.1)",
              border: "1px solid rgba(141,154,176,0.28)",
            }}
          >
            <p
              className="m-0 mb-1 font-mono text-[9px] uppercase tracking-[0.25em]"
              style={{ color: ACCENT }}
            >
              Strategy
            </p>
            <p className="m-0 font-['Bebas_Neue',Impact,sans-serif] text-white text-xl tracking-[0.05em]">
              REAL GROWTH
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
