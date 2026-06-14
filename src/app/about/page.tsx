
"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  HardHat,
  Building2,
  Settings2,
  Layers,
  Monitor,
  Stethoscope,
  CreditCard,
  UtensilsCrossed,
  ShoppingBag,
  Telescope,
  Rocket,
  Target,
  Eye,
  Globe,
  Zap,
  Camera,
  Palette,
  BarChart2,
  CheckCircle2,
  Diamond,
  Sparkles,
  Scale,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ─── Eyebrow label ─── */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[13px] font-mono text-[#007AFF] tracking-[0.35em] uppercase mb-4 font-semibold">
      {children}
    </span>
  );
}

/* ─── Gradient headline ─── */
function GradientHeadline({
  children,
  className = "text-[clamp(3rem,7vw,6rem)]",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-display leading-none bg-gradient-to-br from-white via-[#007AFF] to-[#3395FF] bg-clip-text text-transparent m-0 ${className}`}
      style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
    >
      {children}
    </h2>
  );
}

/* ─── UNIQUE animated title variants ─── */

// Variant 1: Letters fall down one by one
function TitleDropLetters({ text, delay = 0, color = "#007AFF" }: { text: string; delay?: number; color?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  const letters = text.split("");
  return (
    <h2
      ref={ref}
      className="font-display leading-none m-0 flex flex-wrap"
      style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
    >
      {letters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: -80, opacity: 0, rotateX: -90 }}
          animate={inView ? { y: 0, opacity: 1, rotateX: 0 } : { y: -80, opacity: 0, rotateX: -90 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block text-[clamp(3rem,7vw,6rem)] bg-gradient-to-br from-white via-[#007AFF] to-[#3395FF] bg-clip-text text-transparent"
          style={{ transformOrigin: "top center" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h2>
  );
}

// Variant 2: Letters rise from bottom one by one (reverse)
function TitleRiseLetters({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  const letters = text.split("");
  return (
    <h2
      ref={ref}
      className="font-display leading-none m-0 flex flex-wrap"
      style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
    >
      {letters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: 80, opacity: 0, scale: 0.5 }}
          animate={inView ? { y: 0, opacity: 1, scale: 1 } : { y: 80, opacity: 0, scale: 0.5 }}
          transition={{
            duration: 0.55,
            delay: delay + (letters.length - i) * 0.045,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block text-[clamp(3rem,7vw,6rem)] bg-gradient-to-br from-white via-[#007AFF] to-[#3395FF] bg-clip-text text-transparent"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h2>
  );
}

// Variant 3: Blur then sharpen, word by word
function TitleBlurReveal({ children, delay = 0 }: { children: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  const words = children.split(" ");
  return (
    <h2
      ref={ref}
      className="font-display leading-none m-0 flex flex-wrap gap-x-4"
      style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: "blur(20px)", opacity: 0, x: -30 }}
          animate={inView ? { filter: "blur(0px)", opacity: 1, x: 0 } : { filter: "blur(20px)", opacity: 0, x: -30 }}
          transition={{ duration: 0.7, delay: delay + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block text-[clamp(3rem,7vw,6rem)] bg-gradient-to-br from-white via-[#007AFF] to-[#3395FF] bg-clip-text text-transparent"
        >
          {word}
        </motion.span>
      ))}
    </h2>
  );
}

// Variant 4: Glitch effect with skew
function TitleGlitch({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.h2
        initial={{ y: "110%", skewY: 8, opacity: 0 }}
        animate={inView ? { y: "0%", skewY: 0, opacity: 1 } : { y: "110%", skewY: 8, opacity: 0 }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        className="font-display leading-none m-0 text-[clamp(3rem,7vw,6rem)] bg-gradient-to-br from-white via-[#007AFF] to-[#3395FF] bg-clip-text text-transparent"
        style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
      >
        {text}
      </motion.h2>
    </div>
  );
}

// Variant 5: Scale + fade from center
function TitleScaleFade({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  return (
    <motion.h2
      ref={ref}
      initial={{ scale: 0.5, opacity: 0, letterSpacing: "0.5em" }}
      animate={inView ? { scale: 1, opacity: 1, letterSpacing: "0em" } : { scale: 0.5, opacity: 0, letterSpacing: "0.5em" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className="font-display leading-none m-0 text-[clamp(3rem,7vw,6rem)] bg-gradient-to-br from-white via-[#007AFF] to-[#3395FF] bg-clip-text text-transparent"
      style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
    >
      {children}
    </motion.h2>
  );
}

// Variant 6: Typewriter effect
function TitleTypewriter({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (inView && !started) {
      setStarted(true);
      setDisplayed("");
      const timeout = setTimeout(() => {
        let i = 0;
        const interval = setInterval(() => {
          setDisplayed(text.slice(0, i + 1));
          i++;
          if (i >= text.length) clearInterval(interval);
        }, 50);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
    if (!inView) {
      setStarted(false);
      setDisplayed("");
    }
  }, [inView, text, delay, started]);

  return (
    <h2
      ref={ref}
      className="font-display leading-none m-0 text-[clamp(3rem,7vw,6rem)] bg-gradient-to-br from-white via-[#007AFF] to-[#3395FF] bg-clip-text text-transparent"
      style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", minHeight: "1em" }}
    >
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-1 h-[0.8em] bg-[#007AFF] ml-1 align-middle"
      />
    </h2>
  );
}

/* ─── Stagger reveal wrapper ─── */
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Magnetic cursor blob ─── */
function CursorBlob() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 60, damping: 18 });
  const springY = useSpring(y, { stiffness: 60, damping: 18 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 200);
      y.set(e.clientY - 200);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-0"
      style={{
        background: "radial-gradient(circle,rgba(0,122,255,0.08) 0%,transparent 70%)",
        filter: "blur(60px)",
        x: springX,
        y: springY,
      }}
    />
  );
}

/* ─── Floating Particles Background — FIX: stable seeds via useMemo ─── */
function FloatingParticles() {
  // useMemo ensures particles are generated once and stay stable across hydration
  const particles = useMemo(() =>
    Array.from({ length: 28 }, (_, i) => {
      // Deterministic pseudo-random using index as seed
      const seed = (i * 2654435761) >>> 0;
      const r1 = ((seed ^ (seed >> 16)) * 0x45d9f3b) >>> 0;
      const r2 = ((r1 ^ (r1 >> 16)) * 0x45d9f3b) >>> 0;
      const r3 = ((r2 ^ (r2 >> 16)) * 0x45d9f3b) >>> 0;
      const r4 = ((r3 ^ (r3 >> 16)) * 0x45d9f3b) >>> 0;
      const r5 = ((r4 ^ (r4 >> 16)) * 0x45d9f3b) >>> 0;
      const r6 = ((r5 ^ (r5 >> 16)) * 0x45d9f3b) >>> 0;
      const r7 = ((r6 ^ (r6 >> 16)) * 0x45d9f3b) >>> 0;
      const norm = (n: number) => (n >>> 0) / 0xffffffff;
      return {
        id: i,
        size: norm(r1) * 3 + 1,
        x: norm(r2) * 100,
        y: norm(r3) * 100,
        duration: norm(r4) * 15 + 10,
        delay: norm(r5) * 8,
        opacity: norm(r6) * 0.4 + 0.1,
        drift: norm(r7) * 60 - 30,
      };
    }),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          animate={{
            y: [0, -120, 0],
            x: [0, p.drift, 0],
            opacity: [0, p.opacity, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: "#007AFF",
            boxShadow: `0 0 ${p.size * 3}px #007AFF`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Orbiting rings ─── */
function OrbitRings({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      {[1, 0.65, 0.38].map((scale, i) => (
        <motion.div
          key={i}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 18 + i * 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full"
          style={{
            inset: `${i * 28}px`,
            border: `1px dashed rgba(0,122,255,${0.08 + i * 0.04})`,
            transform: `scale(${scale})`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Grid lines background ─── */
function GridBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,122,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,122,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
      }}
    />
  );
}

/* ─── Animated counter ─── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = to / 50;
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else { setCount(Math.floor(start)); }
    }, 30);
    return () => clearInterval(timer);
  }, [inView, to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Spinning Icon Badge ─── */
function SpinningIcon({
  Icon,
  color,
  size = 56,
  spinDuration = 8,
  reverse = false,
}: {
  Icon: LucideIcon;
  color: string;
  size?: number;
  spinDuration?: number;
  reverse?: boolean;
}) {
  const iconSize = Math.round(size * 0.42);
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <motion.div
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{ duration: spinDuration, repeat: Infinity, ease: "linear" }}
        className="absolute rounded-full"
        style={{ inset: -6, border: `1px dashed ${color}60` }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full"
        style={{ border: `1px solid ${color}40`, boxShadow: `0 0 12px ${color}30` }}
      />
      <motion.div
        whileHover={{ scale: 1.15, rotate: 15 }}
        className="relative z-10 flex items-center justify-center rounded-full cursor-default"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color}20 0%, ${color}08 100%)`,
          border: `1px solid ${color}40`,
        }}
      >
        <Icon size={iconSize} color={color} strokeWidth={1.5} />
      </motion.div>
    </div>
  );
}

/* ─── Rotating Icon ─── */
function RotatingIcon({
  Icon,
  color,
  size = 36,
  duration = 6,
  delay = 0,
}: {
  Icon: LucideIcon;
  color: string;
  size?: number;
  duration?: number;
  delay?: number;
}) {
  return (
    <motion.div
      animate={{
        rotate: [0, 180, 360],
        scale: [1, 1.15, 1],
        filter: [
          `drop-shadow(0 0 4px ${color}80)`,
          `drop-shadow(0 0 12px ${color}cc)`,
          `drop-shadow(0 0 4px ${color}80)`,
        ],
      }}
      transition={{ duration, repeat: Infinity, ease: "linear", delay }}
      className="inline-flex mb-4"
      style={{ color }}
    >
      <Icon size={size} strokeWidth={1.5} />
    </motion.div>
  );
}

/* ─── Animated divider line ─── */
function AnimatedDivider() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="overflow-hidden h-px mx-auto max-w-[600px]">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="h-px origin-left"
        style={{ background: "linear-gradient(90deg, transparent, #007AFF, transparent)" }}
      />
    </div>
  );
}

/* ─── Clients data (Arabic removed) ─── */
const CLIENTS_KSA = [
  { name: "Sadeef", sector: "Engineering & Architecture", desc: "Leading consultancy in architectural design & engineering solutions — residential and commercial projects.", Icon: HardHat },
  { name: "Aamal", sector: "Construction", desc: "Jeddah-based contractor specializing in high-quality construction, known for timeline precision across diverse projects.", Icon: Building2 },
  { name: "Yamas Arabia", sector: "General Contracting", desc: "Prominent KSA contractor managing large-scale projects with cutting-edge construction technology from foundation to handover.", Icon: Settings2 },
  { name: "Silver Lines", sector: "Glass & Facades", desc: "Specialist in glass systems, facades, railings, and stainless steel installations across the Kingdom.", Icon: Layers },
  { name: "Fawtara", sector: "F&B Tech / ERP", desc: "Tech company building ERP solutions tailored for restaurants and cafes — streamlining daily operations with precision.", Icon: Monitor },
];

const CLIENTS_EGY = [
  { name: "D Smile Clinic", sector: "Medical / Dental", desc: "Dental aesthetics clinic offering comprehensive cosmetic and preventive care with the latest technology.", Icon: Stethoscope },
  { name: "Egyptinor", sector: "Digital Finance", desc: "Digital economy & e-wallet company delivering innovative fintech solutions for a cashless society.", Icon: CreditCard },
  { name: "Dream Restaurant", sector: "F&B", desc: "Full-service restaurant delivering a complete dining experience with a focus on quality and service excellence.", Icon: UtensilsCrossed },
  { name: "Twelve Store", sector: "Fashion / E-Commerce", desc: "Fashion-forward clothing store offering contemporary pieces blending simplicity and elegance for all tastes.", Icon: ShoppingBag },
];

/* ─── Values ─── */
const VALUES = [
  { word: "Commitment", Icon: CheckCircle2, color: "#007AFF" },
  { word: "Creativity",  Icon: Sparkles,     color: "#3395FF" },
  { word: "Transparency",Icon: Scale,         color: "#56AFFF" },
  { word: "Growth",      Icon: TrendingUp,    color: "#007AFF" },
];

/* ─── Process steps ─── */
const PROCESS = [
  { num: "01", title: "Research & Discovery", desc: "Deep-diving into your brand, audience, and competitive landscape to find the real opportunity." },
  { num: "02", title: "Planning & Strategy",  desc: "A clear, custom marketing roadmap — no copy-paste templates, every plan built for one brand only." },
  { num: "03", title: "Execution",            desc: "Content + design + ad management running in perfect sync toward one goal: measurable impact." },
  { num: "04", title: "Optimization",         desc: "Continuous result analysis and performance refinement — because every percentage point matters." },
];

/* ─── Glass card base classes ─── */
const glass = "bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 relative overflow-hidden";

/* ─── Campaign stats ─── */
const CAMPAIGN_STATS = [
  { value: "60+", label: "New Clients",  sub: "From one campaign",  Icon: Target },
  { value: "1M+", label: "Impressions",  sub: "Reached fast",        Icon: Eye },
  { value: "2",   label: "Markets",      sub: "KSA & Egypt",          Icon: Globe },
  { value: "5",   label: "Services",     sub: "Delivered together",   Icon: Zap },
];

/* ─── Campaign placeholders ─── */
const CAMPAIGN_PLACEHOLDERS = [
  { label: "Before Campaign",    Icon: Camera },
  { label: "After Campaign",     Icon: Camera },
  { label: "Campaign Creative",  Icon: Palette },
  { label: "Results Dashboard",  Icon: BarChart2 },
];

/* ────────────────────────────────────────────────── */
export default function AboutPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const [activeTab, setActiveTab] = useState<"ksa" | "egypt">("ksa");

  return (
    <>
      <CursorBlob />
      <GridBackground />
      <FloatingParticles />

      {/* ═══════════════ HERO ═══════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-start lg:items-center px-4 sm:px-6 pt-28 sm:pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.9, 0.5], x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] right-[-5%] w-[min(700px,90vw)] h-[min(700px,90vw)] rounded-full"
            style={{ background: "radial-gradient(circle,rgba(0,122,255,0.22) 0%,transparent 65%)", filter: "blur(80px)" }}
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.7, 0.3], x: [0, -20, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[10%] left-[-8%] w-[min(500px,70vw)] h-[min(500px,70vw)] rounded-full"
            style={{ background: "radial-gradient(circle,rgba(51,149,255,0.15) 0%,transparent 65%)", filter: "blur(100px)" }}
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            className="absolute top-[40%] left-[40%] w-[min(400px,60vw)] h-[min(300px,50vw)] rounded-full"
            style={{ background: "radial-gradient(circle,rgba(0,122,255,0.12) 0%,transparent 65%)", filter: "blur(120px)" }}
          />
        </div>

        <div className="absolute right-[5%] top-[10%] w-[min(500px,80vw)] h-[min(500px,80vw)] pointer-events-none z-0">
          <OrbitRings />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-[1280px] mx-auto w-full">
          {/* RESPONSIVE FIX: stack on mobile, side by side on lg+ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left */}
            <div className="min-w-0">
              <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
                <Eyebrow>About OUR Agency</Eyebrow>

                {/* RESPONSIVE FIX: clamp font size tighter on mobile */}
                <div className="overflow-hidden mb-7">
                  {["YOUNG.", "HUNGRY.", "CREATIVE."].map((word, i) => (
                    <motion.div
                      key={word}
                      initial={{ y: "110%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.75, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ x: 6 }}
                      className="block cursor-default leading-[0.95] bg-gradient-to-br from-white via-[#007AFF] to-[#3395FF] bg-clip-text text-transparent transition-all duration-300"
                      style={{
                        fontFamily: "'Bebas Neue', Impact, sans-serif",
                        fontSize: "clamp(2.8rem, 12vw, 7rem)",
                      }}
                    >
                      {word}
                    </motion.div>
                  ))}
                </div>
                <AnimatedDivider />
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-base text-white/55 leading-[1.85] max-w-[480px] mb-3 mt-6">
                  OUR is a digital marketing agency powered by a team of young creatives. We work with passion and real effort — believing every brand deserves a marketing plan built on deep understanding, powerful content, and authentic execution that drives results.
                </motion.p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }} className="text-sm font-semibold text-[#007AFF] tracking-[0.05em]">
                  We&apos;re not just service providers — we&apos;re growth partners.
                </motion.p>
              </motion.div>

              {/* Stats */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="flex flex-wrap gap-6 sm:gap-8 mt-10">
                {[{ value: 60, suffix: "+", label: "Campaigns" }, { value: 9, suffix: "", label: "Clients" }, { value: 2, suffix: "", label: "Markets" }].map((s) => (
                  <motion.div key={s.label} whileHover={{ scale: 1.08, y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
                    <div className="text-[2.5rem] leading-none text-white mb-1" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}>
                      <Counter to={s.value} suffix={s.suffix} />
                    </div>
                    <div className="text-xs text-white/35 font-mono tracking-[0.2em] uppercase">{s.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Mobile-only compact info strip — hidden on lg+ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="mt-8 lg:hidden"
              >
                <div
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden relative"
                  style={{ borderColor: "rgba(0,122,255,0.2)" }}
                >
                  {/* animated top line */}
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: "linear-gradient(90deg,transparent,#007AFF,transparent)" }}
                  />
                  {/* Services row */}
                  <div className="px-4 py-3 border-b border-white/[0.06]">
                    <div className="text-[9px] text-white/30 font-mono tracking-[0.3em] uppercase mb-1">Services</div>
                    <div className="text-xs text-white/70">Branding · Ads · Content · SMM · Video</div>
                  </div>
                  {/* Markets + Sectors row */}
                  <div className="px-4 py-3 flex gap-4 flex-wrap">
                    <div>
                      <div className="text-[9px] text-white/30 font-mono tracking-[0.3em] uppercase mb-1.5">Markets</div>
                      <div className="flex gap-1.5">
                        {["KSA", "Egypt"].map((m) => (
                          <span key={m} className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/55">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] text-white/30 font-mono tracking-[0.3em] uppercase mb-1.5">Sectors</div>
                      <div className="flex gap-1.5 flex-wrap">
                        {["Construction", "Medical", "F&B", "Tech"].map((s) => (
                          <span key={s} className="text-[11px] px-2.5 py-1 rounded-full border border-[rgba(0,122,255,0.25)] text-[rgba(0,122,255,0.85)]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right — identity card: HIDDEN on mobile, visible on lg+ */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="min-w-0 hidden lg:block"
            >
              <motion.div
                whileHover={{ y: -6, boxShadow: "0 30px 80px rgba(0,122,255,0.2)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={glass}
                style={{ borderColor: "rgba(0,122,255,0.25)" }}
              >
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
                  className="absolute top-0 left-0 right-0 h-px opacity-60"
                  style={{ background: "linear-gradient(90deg,transparent,#007AFF,transparent)" }}
                />
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, delay: 1.5 }}
                  className="absolute bottom-0 left-0 right-0 h-px opacity-40"
                  style={{ background: "linear-gradient(90deg,transparent,rgba(0,122,255,0.5),transparent)" }}
                />
                <div className="absolute top-3 right-4 leading-none select-none text-white/[0.025]" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "7rem" }}>OUR</div>
                <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 75% 25%,rgba(0,122,255,0.12) 0%,transparent 55%)" }} />
                <div className="relative z-10 flex flex-col gap-6">
                  {[
                    { label: "Type", value: "Digital Marketing Agency" },
                    { label: "Founded", value: "KSA & Egypt" },
                    { label: "Services", value: "Branding · Ads · Content · SMM · Video" },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <div className="text-[10px] text-white/35 font-mono tracking-[0.25em] uppercase mb-1.5">{label}</div>
                      <div className="text-sm text-white/80">{value}</div>
                    </div>
                  ))}
                  <div>
                    <div className="text-[10px] text-white/35 font-mono tracking-[0.25em] uppercase mb-2.5">Markets</div>
                    <div className="flex gap-2.5 flex-wrap">
                      {["Saudi Arabia", "Egypt"].map((m) => (
                        <motion.span
                          key={m}
                          whileHover={{ borderColor: "#007AFF", color: "white", scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 400 }}
                          className="text-sm px-4 py-1.5 rounded-[10px] bg-white/[0.04] border border-white/[0.08] text-white/55 cursor-default"
                        >
                          {m}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-white/35 font-mono tracking-[0.25em] uppercase mb-2.5">Sectors</div>
                    <div className="flex flex-wrap gap-2">
                      {["Construction", "Medical", "F&B", "Podcast", "E-Commerce", "Tech"].map((s, i) => (
                        <motion.span
                          key={s}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + i * 0.07 }}
                          whileHover={{ background: "rgba(0,122,255,0.12)", borderColor: "#007AFF", scale: 1.07 }}
                          className="text-xs px-3 py-1 rounded-full border border-[rgba(0,122,255,0.25)] text-[rgba(0,122,255,0.85)]"
                        >
                          {s}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════ VISION & MISSION ═══════════════ */}
      <section className="py-28 px-4 sm:px-6 border-t border-white/[0.06] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(800px,100vw)] h-[500px] pointer-events-none" style={{ background: "radial-gradient(ellipse,rgba(0,122,255,0.07) 0%,transparent 70%)", filter: "blur(100px)" }} />
        <div className="max-w-[1280px] mx-auto relative z-10">
          <FadeUp className="text-center mb-16">
            {/* Variant 1: letters drop from top */}
            <Eyebrow>Who We Are</Eyebrow>
            <TitleDropLetters text="VISION & MISSION" />
          </FadeUp>
          <AnimatedDivider />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {[
              { num: "02", label: "Our Vision", Icon: Telescope, accent: "#007AFF", text: "To become the transformation point for ambitious brands — delivering marketing strategies built on creativity, data, and true market understanding. We chart clear growth paths through competition, create real measurable value, and walk with every client step by step toward a stronger presence that competes with the best." },
              { num: "03", label: "Our Mission", Icon: Rocket, accent: "#3395FF", text: "We deliver practical marketing solutions that support brand building, attract customers, and achieve measurable results — through powerful content management, paid advertising, and building an impactful digital identity." },
            ].map((item, i) => (
              <FadeUp key={item.num} delay={i * 0.15}>
                <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300, damping: 22 }} className={`${glass} h-full`} style={{ borderColor: `${item.accent}20` }}>
                  <div className="absolute top-3 right-4 leading-none text-white/[0.025]" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "6rem" }}>{item.num}</div>
                  <motion.div animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl" style={{ background: `linear-gradient(90deg,${item.accent},transparent)` }} />
                  <div className="flex items-center gap-3 mb-4">
                    <SpinningIcon Icon={item.Icon} color={item.accent} size={48} spinDuration={10} reverse={i % 2 !== 0} />
                    <div className="text-[10px] font-mono tracking-[0.3em] uppercase" style={{ color: item.accent }}>{item.label}</div>
                  </div>
                  <p className="text-sm text-white/55 leading-[1.85] m-0">{item.text}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ VALUES ═══════════════ */}
      <section className="py-28 px-4 sm:px-6 border-t border-white/[0.06] overflow-hidden relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(900px,100vw)] h-[min(900px,100vw)] rounded-full border border-dashed border-[rgba(0,122,255,0.05)] pointer-events-none"
        />
        <div className="max-w-[1280px] mx-auto relative z-10">
          <FadeUp className="text-center mb-20">
            <Eyebrow>What Drives Us</Eyebrow>
            {/* Variant 2: letters rise from bottom in reverse */}
            <TitleRiseLetters text="OUR VALUES" />
          </FadeUp>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {VALUES.map((v, i) => (
              <FadeUp key={v.word} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -10, boxShadow: `0 20px 60px ${v.color}20` }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className={`${glass} text-center cursor-default`}
                  style={{ borderColor: `${v.color}20` }}
                >
                  <RotatingIcon Icon={v.Icon} color={v.color} size={36} duration={5 + i} delay={i * 0.5} />
                  <div className="text-white mb-1.5 tracking-[0.05em] text-[1.4rem] sm:text-[1.6rem]" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}>
                    {v.word}
                  </div>
                  <motion.div
                    animate={{ opacity: [0.3, 0.8, 0.3], scaleX: [0.5, 1, 0.5] }}
                    transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-px"
                    style={{ background: `linear-gradient(90deg,transparent,${v.color}60,transparent)` }}
                  />
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHAT MAKES US DIFFERENT ═══════════════ */}
      <section className="py-28 px-4 sm:px-6 border-t border-white/[0.06] relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <FadeUp>
                <Eyebrow>Why OUR</Eyebrow>
                {/* Variant 3: blur reveal */}
                <TitleBlurReveal>WHAT MAKES US DIFFERENT</TitleBlurReveal>
              </FadeUp>
              <div className="mt-9 flex flex-col gap-5">
                {[
                  "A young team that genuinely understands the market",
                  "We focus on results — not just impressions",
                  "Faster execution, authentic content, flexible strategies",
                  "Every brand gets a completely different plan",
                ].map((point, i) => (
                  <FadeUp key={i} delay={i * 0.1}>
                    <motion.div whileHover={{ x: 6 }} className="flex gap-4 items-start">
                      <motion.div
                        initial={{ scale: 0, rotate: -90 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 200 }}
                        whileHover={{ scale: 1.2, boxShadow: "0 0 16px rgba(0,122,255,0.6)" }}
                        className="w-7 h-7 rounded-full border border-[rgba(0,122,255,0.25)] bg-[rgba(0,122,255,0.12)] flex items-center justify-center shrink-0 mt-0.5"
                      >
                        <Diamond size={12} color="#007AFF" strokeWidth={1.5} />
                      </motion.div>
                      <p className="text-sm sm:text-base text-white/55 leading-[1.7] m-0">{point}</p>
                    </motion.div>
                  </FadeUp>
                ))}
              </div>
            </div>

            {/* Right */}
            <FadeUp>
              <div className="relative">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute -inset-8 border border-dashed border-[rgba(0,122,255,0.12)] rounded-full pointer-events-none" />
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }} className="absolute -inset-3 border border-dashed border-[rgba(0,122,255,0.2)] rounded-full pointer-events-none" />
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} className="absolute -inset-8 pointer-events-none">
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#007AFF]" style={{ boxShadow: "0 0 10px #007AFF" }} />
                </motion.div>
                <div className={`${glass} text-center p-8 sm:p-12`} style={{ borderColor: "rgba(0,122,255,0.25)" }}>
                  <motion.div
                    animate={{ filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="text-[clamp(5rem,15vw,10rem)] leading-none bg-gradient-to-br from-white to-[#007AFF] bg-clip-text text-transparent"
                    style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
                  >
                    <Counter to={60} suffix="+" />
                  </motion.div>
                  <div className="text-[1.4rem] text-white/55 tracking-[0.1em] mb-2" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}>CLIENTS ACQUIRED</div>
                  <div className="text-xs text-white/35">In a single campaign</div>
                  <div className="mt-6 pt-6 border-t border-white/[0.06] flex justify-center gap-8">
                    {[{ n: "1M+", label: "Impressions" }, { n: "2", label: "Markets" }].map((s) => (
                      <motion.div key={s.label} whileHover={{ scale: 1.1 }} className="text-center">
                        <div className="text-[1.8rem] text-white leading-none" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}>{s.n}</div>
                        <div className="text-[11px] text-white/35 font-mono mt-1 tracking-[0.15em] uppercase">{s.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══════════════ CLIENTS ═══════════════ */}
      <section className="py-28 px-4 sm:px-6 border-t border-white/[0.06]">
        <div className="max-w-[1280px] mx-auto">
          <FadeUp className="text-center mb-12">
            <Eyebrow>Our Work</Eyebrow>
            {/* Variant 4: glitch slide up */}
            <TitleGlitch text="CLIENTS WE'VE GROWN" />
          </FadeUp>

          {/* Tab switcher */}
          <FadeUp className="flex justify-center mb-14">
            <div className="inline-flex gap-1 p-1 bg-white/[0.04] border border-white/[0.08] rounded-[14px]">
              {(["ksa", "egypt"] as const).map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  animate={{
                    background: activeTab === tab ? "#007AFF" : "transparent",
                    color: activeTab === tab ? "#ffffff" : "rgba(255,255,255,0.55)",
                    boxShadow: activeTab === tab ? "0 4px 20px rgba(0,122,255,0.5)" : "none",
                  }}
                  whileHover={{ color: "white", scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                  className="px-5 sm:px-7 py-2.5 rounded-[10px] border-none cursor-pointer font-mono text-[11px] tracking-[0.2em] uppercase"
                >
                  {tab === "ksa" ? "Saudi Arabia" : "Egypt"}
                </motion.button>
              ))}
            </div>
          </FadeUp>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {(activeTab === "ksa" ? CLIENTS_KSA : CLIENTS_EGY).map((client, i) => (
                <motion.div
                  key={client.name}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6, boxShadow: "0 20px 60px rgba(0,122,255,0.12)" }}
                  className={glass}
                >
                  <div className="mb-3.5">
                    <SpinningIcon Icon={client.Icon} color="#007AFF" size={50} spinDuration={12 + i * 2} reverse={i % 2 !== 0} />
                  </div>
                  <div className="text-[10px] text-[#007AFF] font-mono tracking-[0.2em] uppercase mb-2">{client.sector}</div>
                  <h3 className="text-white text-[1.4rem] m-0 mb-3 tracking-[0.04em]" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}>{client.name}</h3>
                  <p className="text-[13px] text-white/35 leading-[1.75] m-0">{client.desc}</p>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    className="absolute bottom-0 left-0 right-0 h-0.5 origin-left rounded-b-2xl"
                    style={{ background: "linear-gradient(90deg, #007AFF, transparent)" }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══════════════ CAMPAIGN RESULTS ═══════════════ */}
      <section className="py-28 px-4 sm:px-6 border-t border-white/[0.06]">
        <div className="max-w-[1280px] mx-auto">
          <FadeUp className="text-center mb-16">
            <Eyebrow>Proof of Work</Eyebrow>
            {/* Variant 5: scale + expand */}
            <TitleScaleFade>CAMPAIGN RESULTS</TitleScaleFade>
            <p className="text-white/35 text-sm mt-4 max-w-[460px] mx-auto">Real before & after — one campaign that brought in 60+ clients.</p>
          </FadeUp>

          <FadeUp>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden mb-10">
              {CAMPAIGN_STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ background: "rgba(0,122,255,0.06)" }}
                  className="py-8 sm:py-10 px-4 sm:px-8 bg-white/[0.04] text-center"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8 }}
                    className="flex justify-center mb-3 text-[#007AFF]"
                  >
                    <stat.Icon size={28} strokeWidth={1.5} />
                  </motion.div>
                  <div className="text-white text-[2rem] sm:text-[2.8rem] leading-none mb-2" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}>{stat.value}</div>
                  <div className="text-[13px] text-white/70 mb-1 font-medium">{stat.label}</div>
                  <div className="text-[11px] text-white/35 font-mono">{stat.sub}</div>
                </motion.div>
              ))}
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {CAMPAIGN_PLACEHOLDERS.map(({ label, Icon: PlaceholderIcon }, i) => (
              <FadeUp key={label} delay={i * 0.1}>
                <motion.div
                  whileHover={{ borderColor: "rgba(0,122,255,0.25)", y: -4, boxShadow: "0 16px 50px rgba(0,122,255,0.1)" }}
                  className={`${glass} aspect-video flex flex-col items-center justify-center gap-3`}
                  style={{ borderStyle: "dashed" }}
                >
                  <motion.div
                    animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.08, 1] }}
                    transition={{ duration: 5 + i, repeat: Infinity }}
                    className="text-white/20"
                  >
                    <PlaceholderIcon size={40} strokeWidth={1} />
                  </motion.div>
                  <div className="text-xs text-white/35 font-mono tracking-[0.15em] uppercase">{label}</div>
                  <div className="text-[11px] text-white/20 text-center max-w-[200px]">Drop your campaign image here</div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PROCESS ═══════════════ */}
      <section className="py-28 px-4 sm:px-6 border-t border-white/[0.06]">
        <div className="max-w-[1280px] mx-auto">
          <FadeUp className="text-center mb-20">
            <Eyebrow>How We Work</Eyebrow>
            {/* Variant 6: typewriter */}
            <TitleTypewriter text="OUR PROCESS" />
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="absolute top-[60px] left-[10%] right-[10%] h-px origin-left pointer-events-none z-0 hidden lg:block"
              style={{ background: "linear-gradient(90deg, transparent, rgba(0,122,255,0.4), rgba(0,122,255,0.4), transparent)" }}
            />
            {PROCESS.map((step, i) => (
              <FadeUp key={step.num} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -8, boxShadow: "0 20px 60px rgba(0,122,255,0.12)" }}
                  transition={{ type: "spring", stiffness: 280, damping: 20 }}
                  className={`${glass} text-center h-full z-10 relative`}
                  style={{ borderColor: "rgba(0,122,255,0.1)" }}
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.15, boxShadow: "0 0 20px rgba(0,122,255,0.6)", background: "#007AFF", color: "white" }}
                    className="w-[52px] h-[52px] rounded-full border border-[rgba(0,122,255,0.25)] bg-[rgba(0,122,255,0.12)] flex items-center justify-center mx-auto mb-5 font-mono text-[13px] text-[#007AFF] relative z-10"
                  >
                    {step.num}
                  </motion.div>
                  <h3 className="text-white text-[1.3rem] m-0 mb-3 tracking-[0.04em]" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}>{step.title}</h3>
                  <p className="text-[13px] text-white/35 leading-[1.75] m-0">{step.desc}</p>
                  <motion.div
                    animate={{ opacity: [0.3, 0.8, 0.3], scaleX: [0.4, 1, 0.4] }}
                    transition={{ duration: 3 + i * 0.5, repeat: Infinity }}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[55%] h-px"
                    style={{ background: "linear-gradient(90deg,transparent,rgba(0,122,255,0.5),transparent)" }}
                  />
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="py-28 pb-36 px-4 sm:px-6 border-t border-white/[0.06] relative overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(800px,100vw)] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse,rgba(0,122,255,0.12) 0%,transparent 70%)", filter: "blur(80px)" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(700px,90vw)] h-[min(700px,90vw)] pointer-events-none">
          {[600, 500, 400].map((size, i) => (
            <motion.div
              key={size}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 20 + i * 8, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed"
              style={{ width: `min(${size}px, 90vw)`, height: `min(${size}px, 90vw)`, borderColor: `rgba(0,122,255,${0.06 + i * 0.02})` }}
            />
          ))}
        </div>

        <FadeUp className="text-center relative z-10">
          <Eyebrow>Ready to grow?</Eyebrow>
          {/* Variant: split two lines with different animations */}
          <div className="mb-6">
            <TitleGlitch text="YOUR VISION," delay={0} />
            <TitleDropLetters text="OUR MISSION" delay={0.3} />
          </div>
          <p className="text-base text-white/55 max-w-[480px] mx-auto mt-6 mb-10 leading-[1.8]">
            Let&apos;s build something that makes your competitors nervous. One brand, one plan, real results.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <motion.a
              href="mailto:ouragency259@gmail.com"
              whileHover={{ scale: 1.06, boxShadow: "0 20px 60px rgba(0,122,255,0.45)" }}
              whileTap={{ scale: 0.97 }}
              className="px-8 sm:px-10 py-4 bg-[#007AFF] text-white rounded-xl no-underline text-sm font-semibold tracking-[0.05em] inline-block relative overflow-hidden"
            >
              <motion.span
                animate={{ x: ["-120%", "120%"] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)" }}
              />
              Start a Project
            </motion.a>
            <motion.a
              href="https://www.instagram.com/our_agency5"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ borderColor: "#007AFF", color: "white", scale: 1.04 }}
              className="px-8 sm:px-10 py-4 bg-transparent text-white/55 border border-white/[0.08] rounded-xl no-underline text-sm tracking-[0.05em] inline-block"
            >
              @our_agency5
            </motion.a>
          </div>
        </FadeUp>
      </section>
    </>
  );
}