"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FiUsers, FiZap, FiGlobe, FiTrendingUp } from "react-icons/fi";
import { METRICS } from "@/constants";
import { Reveal } from "@/components/ui/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;
const METRIC_ICONS = [FiUsers, FiZap, FiGlobe, FiTrendingUp];

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

/* ── Metric card ── */
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
      whileHover={{ y: -6, borderColor: "rgba(0,122,255,0.4)" }}
      className="relative text-center rounded-[20px] px-7 py-8 overflow-hidden transition-[border-color] duration-300 backdrop-blur-md"
      style={{
        background: "rgba(255,255,255,0.035)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Top glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,122,255,0.06) 0%, transparent 60%)" }}
      />

      {/* Accent top line */}
      <motion.div
        animate={{ scaleX: active ? 1 : 0, opacity: [0.4, 0.9, 0.4] }}
        transition={{
          scaleX: { duration: 0.8, delay: index * 0.12 + 0.4 },
          opacity: { duration: 3, repeat: Infinity },
        }}
        className="absolute top-0 left-0 right-0 h-px origin-left"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,122,255,0.8), transparent)" }}
      />

      <div className="relative z-[1]">
        {/* Icon */}
        <motion.div
          animate={
            active
              ? { rotate: [0, -12, 12, 0], color: "#007AFF" }
              : { color: "rgba(255,255,255,0.25)" }
          }
          transition={{ duration: 0.6, delay: index * 0.12 + 0.3 }}
          className="flex justify-center mb-4"
        >
          <Icon size={22} />
        </motion.div>

        {/* Counter */}
        <div
          className="font-['Bebas_Neue',Impact,sans-serif] leading-none mb-2.5"
          style={{
            fontSize: "clamp(2.2rem,5vw,3rem)",
            background: "linear-gradient(135deg, #3395FF, #007AFF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {count}{suffix}
        </div>

        <div className="text-[13px] font-semibold text-white/75 mb-1">{metric.label}</div>
        <div className="text-[11px] text-white/28 font-mono tracking-[0.1em]">{metric.sub}</div>
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
      className="relative py-28 px-6 overflow-hidden"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Center ambient */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 9, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(0,122,255,0.09) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-[1] max-w-[1280px] mx-auto">
        {/* Heading */}
        <Reveal style={{ textAlign: "center", marginBottom: "4.5rem" }}>
          <span className="block text-[11px] font-mono text-[#007AFF] tracking-[0.35em] uppercase mb-3.5">
            Real Impact
          </span>
          <h2
            className="font-['Bebas_Neue',Impact,sans-serif] leading-none m-0 mb-3.5"
            style={{
              fontSize: "clamp(2.2rem,6vw,5rem)",
              background: "linear-gradient(135deg, #fff 0%, #007AFF 50%, #3395FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            NUMBERS THAT MATTER
          </h2>
          <p className="text-white/35 text-sm max-w-[400px] mx-auto leading-[1.75]">
            We don&apos;t chase vanity metrics — these numbers reflect real business growth.
          </p>
        </Reveal>

        {/* Metric cards */}
        <div
          className="grid gap-[1.1rem] mb-6"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}
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
          whileHover={{ borderColor: "rgba(0,122,255,0.35)" }}
          className="rounded-[18px] px-8 py-6 flex flex-wrap items-center justify-between gap-4 transition-[border-color] duration-300"
          style={{
            background: "rgba(0,122,255,0.05)",
            border: "1px solid rgba(0,122,255,0.18)",
          }}
        >
          <div>
            <motion.p
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.6 }}
              className="font-['Bebas_Neue',Impact,sans-serif] text-white m-0 mb-1 tracking-[0.04em]"
              style={{ fontSize: "clamp(1.2rem,3vw,1.8rem)" }}
            >
              1,000,000+ IMPRESSIONS DELIVERED
            </motion.p>
            <p className="text-white/32 text-xs m-0 font-mono">
              Ad campaigns across KSA — and counting every month.
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.04, background: "rgba(0,122,255,0.18)" }}
            className="rounded-xl px-6 py-3 text-center transition-all duration-300"
            style={{
              background: "rgba(0,122,255,0.1)",
              border: "1px solid rgba(0,122,255,0.28)",
            }}
          >
            <p className="text-[9px] text-[#007AFF] font-mono tracking-[0.25em] uppercase m-0 mb-1">Strategy</p>
            <p className="font-['Bebas_Neue',Impact,sans-serif] text-xl text-white m-0 tracking-[0.05em]">
              REAL GROWTH
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}