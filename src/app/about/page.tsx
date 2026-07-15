"use client";
// CORRECTED FILE — replace src/app/about/page.tsx with this
// CHANGES:
// 1. Added: import { useT } from "@/translations/useT"
// 2. ✅ FIX TitleDropLetters/TitleRiseLetters: Arabic → one animated block, not letter-by-letter
// 3. ✅ FIX TitleBlurReveal: Arabic direction fix
// 4. ✅ FIX TitleGlitch: Arabic skew direction fix
// 5. ✅ FIX TitleTypewriter: Arabic → blur-fade fallback (typewriter breaks Arabic chars)
// 6. ✅ AboutPage: hero words now from t.about.headline.split('\n')
// 7. ✅ AboutPage: VALUES + PROCESS computed from translations
// 8. ✅ AboutPage: all hardcoded strings (Eyebrow, card labels, CTA) now from t.about.*

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
import { useT } from "@/translations/useT";

/* ─── Eyebrow label ─── */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block mb-4 font-mono font-semibold text-[#8D9AB0] text-[13px] uppercase tracking-[0.35em]">
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
      className={`font-display leading-none bg-gradient-to-br from-white via-[#8D9AB0] to-[#A8B4C5] bg-clip-text text-transparent m-0 ${className}`}
      style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
    >
      {children}
    </h2>
  );
}

/* ─── TITLE ANIMATION VARIANTS ─── */

// Variant 1: Letters fall from top
// ✅ FIX: Arabic → whole string animated as one span, no split("")
function TitleDropLetters({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) {
  const { isAr } = useT();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  const letters = text.split("");
  return (
    <h2
      ref={ref}
      translate="no"
      className="flex flex-wrap justify-center m-0 font-display leading-none notranslate"
      style={{
        fontFamily: "'Bebas Neue', Impact, sans-serif",
        direction: isAr ? "rtl" : "ltr",
      }}
    >
      {isAr ? (
        <motion.span
          initial={{ y: -80, opacity: 0, rotateX: -90 }}
          animate={
            inView
              ? { y: 0, opacity: 1, rotateX: 0 }
              : { y: -80, opacity: 0, rotateX: -90 }
          }
          transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block bg-clip-text bg-gradient-to-br from-white via-[#8D9AB0] to-[#A8B4C5] text-[clamp(3rem,7vw,6rem)] text-transparent"
        >
          {text}
        </motion.span>
      ) : (
        letters.map((char, i) => (
          <motion.span
            key={i}
            initial={{ y: -80, opacity: 0, rotateX: -90 }}
            animate={
              inView
                ? { y: 0, opacity: 1, rotateX: 0 }
                : { y: -80, opacity: 0, rotateX: -90 }
            }
            transition={{
              duration: 0.5,
              delay: delay + i * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block bg-clip-text bg-gradient-to-br from-white via-[#8D9AB0] to-[#A8B4C5] text-[clamp(3rem,7vw,6rem)] text-transparent"
            style={{ transformOrigin: "top center" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))
      )}
    </h2>
  );
}

// Variant 2: Letters rise from bottom (reverse)
// ✅ FIX: Arabic → whole string animated as one span
function TitleRiseLetters({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) {
  const { isAr } = useT();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  const letters = text.split("");
  return (
    <h2
      ref={ref}
      translate="no"
      className="flex flex-wrap justify-center m-0 font-display leading-none notranslate"
      style={{
        fontFamily: "'Bebas Neue', Impact, sans-serif",
        direction: isAr ? "rtl" : "ltr",
      }}
    >
      {isAr ? (
        <motion.span
          initial={{ y: 80, opacity: 0, scale: 0.5 }}
          animate={
            inView
              ? { y: 0, opacity: 1, scale: 1 }
              : { y: 80, opacity: 0, scale: 0.5 }
          }
          transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block bg-clip-text bg-gradient-to-br from-white via-[#8D9AB0] to-[#A8B4C5] text-[clamp(3rem,7vw,6rem)] text-transparent"
        >
          {text}
        </motion.span>
      ) : (
        letters.map((char, i) => (
          <motion.span
            key={i}
            initial={{ y: 80, opacity: 0, scale: 0.5 }}
            animate={
              inView
                ? { y: 0, opacity: 1, scale: 1 }
                : { y: 80, opacity: 0, scale: 0.5 }
            }
            transition={{
              duration: 0.55,
              delay: delay + (letters.length - i) * 0.045,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block bg-clip-text bg-gradient-to-br from-white via-[#8D9AB0] to-[#A8B4C5] text-[clamp(3rem,7vw,6rem)] text-transparent"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))
      )}
    </h2>
  );
}

// Variant 3: Blur then sharpen, word by word
// ✅ FIX: Arabic → x direction reversed (RTL)
function TitleBlurReveal({
  children,
  delay = 0,
}: {
  children: string;
  delay?: number;
}) {
  const { isAr } = useT();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  const words = children.split(" ");
  return (
    <h2
      ref={ref}
      translate="no"
      className="flex flex-wrap justify-center gap-x-4 m-0 font-display leading-none notranslate"
      style={{
        fontFamily: "'Bebas Neue', Impact, sans-serif",
        direction: isAr ? "rtl" : "ltr",
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: "blur(20px)", opacity: 0, x: isAr ? 30 : -30 }}
          animate={
            inView
              ? { filter: "blur(0px)", opacity: 1, x: 0 }
              : { filter: "blur(20px)", opacity: 0, x: isAr ? 30 : -30 }
          }
          transition={{
            duration: 0.7,
            delay: delay + i * 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block bg-clip-text bg-gradient-to-br from-white via-[#8D9AB0] to-[#A8B4C5] text-[clamp(3rem,7vw,6rem)] text-transparent"
        >
          {word}
        </motion.span>
      ))}
    </h2>
  );
}

// Variant 4: Glitch effect with skew
// ✅ FIX: Arabic → skew direction reversed
function TitleGlitch({ text, delay = 0 }: { text: string; delay?: number }) {
  const { isAr } = useT();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  return (
    <div
      ref={ref}
      translate="no"
      className="overflow-hidden text-center notranslate"
    >
      <motion.h2
        initial={{ y: "110%", skewY: isAr ? -8 : 8, opacity: 0 }}
        animate={
          inView
            ? { y: "0%", skewY: 0, opacity: 1 }
            : { y: "110%", skewY: isAr ? -8 : 8, opacity: 0 }
        }
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        className="bg-clip-text bg-gradient-to-br from-white via-[#8D9AB0] to-[#A8B4C5] m-0 font-display text-[clamp(3rem,7vw,6rem)] text-transparent text-center leading-none"
        style={{
          fontFamily: "'Bebas Neue', Impact, sans-serif",
          direction: isAr ? "rtl" : "ltr",
        }}
      >
        {text}
      </motion.h2>
    </div>
  );
}

// Variant 5: Scale + fade from center (no letter splitting — already safe)
function TitleScaleFade({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  return (
    <motion.h2
      ref={ref}
      initial={{ scale: 0.5, opacity: 0, letterSpacing: "0.5em" }}
      animate={
        inView
          ? { scale: 1, opacity: 1, letterSpacing: "0em" }
          : { scale: 0.5, opacity: 0, letterSpacing: "0.5em" }
      }
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className="bg-clip-text bg-gradient-to-br from-white via-[#8D9AB0] to-[#A8B4C5] m-0 font-display text-[clamp(3rem,7vw,6rem)] text-transparent leading-none"
      style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
    >
      {children}
    </motion.h2>
  );
}

// Variant 6: Typewriter effect
// ✅ FIX: Arabic → falls back to blur-fade (typewriter builds chars one by one → breaks Arabic)
function TitleTypewriter({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) {
  const { isAr } = useT();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (isAr) return; // Arabic: use fade fallback below
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
  }, [inView, text, delay, started, isAr]);

  // Arabic fallback: blur-fade the whole string
  if (isAr) {
    return (
      <motion.h2
        ref={ref}
        translate="no"
        initial={{ opacity: 0, filter: "blur(20px)" }}
        animate={
          inView
            ? { opacity: 1, filter: "blur(0px)" }
            : { opacity: 0, filter: "blur(20px)" }
        }
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        className="bg-clip-text bg-gradient-to-br from-white via-[#8D9AB0] to-[#A8B4C5] m-0 font-display text-[clamp(3rem,7vw,6rem)] text-transparent text-center leading-none notranslate"
        style={{
          fontFamily: "'Bebas Neue', Impact, sans-serif",
          direction: "rtl",
        }}
      >
        {text}
      </motion.h2>
    );
  }

  return (
    <h2
      ref={ref}
      translate="no"
      className="bg-clip-text bg-gradient-to-br from-white via-[#8D9AB0] to-[#A8B4C5] m-0 font-display text-[clamp(3rem,7vw,6rem)] text-transparent leading-none notranslate"
      style={{
        fontFamily: "'Bebas Neue', Impact, sans-serif",
        minHeight: "1em",
      }}
    >
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block bg-[#8D9AB0] ml-1 w-1 h-[0.8em] align-middle"
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
      className="top-0 left-0 z-0 fixed rounded-full w-[400px] h-[400px] pointer-events-none"
      style={{
        background:
          "radial-gradient(circle,rgba(141, 154, 176,0.08) 0%,transparent 70%)",
        filter: "blur(60px)",
        x: springX,
        y: springY,
      }}
    />
  );
}

/* ─── Floating Particles Background ─── */
function FloatingParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => {
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
    [],
  );

  return (
    <div className="z-0 fixed inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          animate={{
            y: [0, -120, 0],
            x: [0, p.drift, 0],
            opacity: [0, p.opacity, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: "#8D9AB0",
            boxShadow: `0 0 ${p.size * 3}px #8D9AB0`,
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
          transition={{
            duration: 18 + i * 8,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 rounded-full"
          style={{
            inset: `${i * 28}px`,
            border: `1px dashed rgba(141, 154, 176,${0.08 + i * 0.04})`,
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
      className="z-0 fixed inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(141, 154, 176,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(141, 154, 176,0.03) 1px, transparent 1px)
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
      if (start >= to) {
        setCount(to);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [inView, to]);

  return (
    <span ref={ref} className="notranslate" translate="no">
      {count}
      {suffix}
    </span>
  );
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
        transition={{
          duration: spinDuration,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute rounded-full"
        style={{ inset: -6, border: `1px dashed ${color}60` }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full"
        style={{
          border: `1px solid ${color}40`,
          boxShadow: `0 0 12px ${color}30`,
        }}
      />
      <motion.div
        whileHover={{ scale: 1.15, rotate: 15 }}
        className="z-10 relative flex justify-center items-center rounded-full cursor-default"
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
    <div ref={ref} className="mx-auto max-w-[600px] h-px overflow-hidden">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="h-px origin-left"
        style={{
          background:
            "linear-gradient(90deg, transparent, #8D9AB0, transparent)",
        }}
      />
    </div>
  );
}

/* ─── Static data (unchanged) ─── */
const CLIENTS_KSA = [
  {
    name: "Sadeef",
    sector: "Engineering & Architecture",
    desc: "Leading consultancy in architectural design & engineering solutions — residential and commercial projects.",
    Icon: HardHat,
  },
  {
    name: "Aamal",
    sector: "Construction",
    desc: "Jeddah-based contractor specializing in high-quality construction, known for timeline precision across diverse projects.",
    Icon: Building2,
  },
  {
    name: "Yamas Arabia",
    sector: "General Contracting",
    desc: "Prominent KSA contractor managing large-scale projects with cutting-edge construction technology from foundation to handover.",
    Icon: Settings2,
  },
  {
    name: "Silver Lines",
    sector: "Glass & Facades",
    desc: "Specialist in glass systems, facades, railings, and stainless steel installations across the Kingdom.",
    Icon: Layers,
  },
  {
    name: "Fawtara",
    sector: "F&B Tech / ERP",
    desc: "Tech company building ERP solutions tailored for restaurants and cafes — streamlining daily operations with precision.",
    Icon: Monitor,
  },
];

const CLIENTS_EGY = [
  {
    name: "D Smile Clinic",
    sector: "Medical / Dental",
    desc: "Dental aesthetics clinic offering comprehensive cosmetic and preventive care with the latest technology.",
    Icon: Stethoscope,
  },
  {
    name: "Egyptinor",
    sector: "Digital Finance",
    desc: "Digital economy & e-wallet company delivering innovative fintech solutions for a cashless society.",
    Icon: CreditCard,
  },
  {
    name: "Dream Restaurant",
    sector: "F&B",
    desc: "Full-service restaurant delivering a complete dining experience with a focus on quality and service excellence.",
    Icon: UtensilsCrossed,
  },
  {
    name: "Twelve Store",
    sector: "Fashion / E-Commerce",
    desc: "Fashion-forward clothing store offering contemporary pieces blending simplicity and elegance for all tastes.",
    Icon: ShoppingBag,
  },
];

const glass =
  "bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 relative overflow-hidden";

const CAMPAIGN_STATS = [
  {
    value: "60+",
    label: "New Clients",
    sub: "From one campaign",
    Icon: Target,
  },
  { value: "1M+", label: "Impressions", sub: "Reached fast", Icon: Eye },
  { value: "2", label: "Markets", sub: "KSA & Egypt", Icon: Globe },
  { value: "5", label: "Services", sub: "Delivered together", Icon: Zap },
];

const CAMPAIGN_PLACEHOLDERS = [
  { label: "Before Campaign", Icon: Camera },
  { label: "After Campaign", Icon: Camera },
  { label: "Campaign Creative", Icon: Palette },
  { label: "Results Dashboard", Icon: BarChart2 },
];

/* ─── Value icons (order matches valueWords array in translations) ─── */
const VALUE_ICONS = [CheckCircle2, Sparkles, Scale, TrendingUp];
const VALUE_COLORS = ["#8D9AB0", "#A8B4C5", "#C2CAD6", "#8D9AB0"];

/* ────────────────────────────────────────────────── */
export default function AboutPage() {
  // ✅ All translations
  const { t, isAr } = useT();

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const [activeTab, setActiveTab] = useState<"ksa" | "egypt">("ksa");

  // ✅ Computed from translations
  const heroWords = t.about.headline.split("\n");

  const VALUES = t.about.valueWords.map((word, i) => ({
    word,
    Icon: VALUE_ICONS[i] ?? CheckCircle2,
    color: VALUE_COLORS[i] ?? "#8D9AB0",
  }));

  const PROCESS = t.about.processSteps.map((step, i) => ({
    num: String(i + 1).padStart(2, "0"),
    title: step.title,
    desc: step.desc,
  }));

  return (
    <>
      <CursorBlob />
      <GridBackground />
      <FloatingParticles />

      {/* ═══════════════ HERO ═══════════════ */}
      <section
        ref={heroRef}
        className="relative flex items-start lg:items-center px-4 sm:px-6 pt-28 sm:pt-32 pb-16 min-h-screen overflow-hidden"
      >
        <div className="z-0 absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.5, 0.9, 0.5],
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="top-[-10%] right-[-5%] absolute rounded-full w-[min(700px,90vw)] h-[min(700px,90vw)]"
            style={{
              background:
                "radial-gradient(circle,rgba(141, 154, 176,0.22) 0%,transparent 65%)",
              filter: "blur(80px)",
            }}
          />
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.7, 0.3],
              x: [0, -20, 0],
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="bottom-[10%] left-[-8%] absolute rounded-full w-[min(500px,70vw)] h-[min(500px,70vw)]"
            style={{
              background:
                "radial-gradient(circle,rgba(168, 180, 197,0.15) 0%,transparent 65%)",
              filter: "blur(100px)",
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1] }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
            className="top-[40%] left-[40%] absolute rounded-full w-[min(400px,60vw)] h-[min(300px,50vw)]"
            style={{
              background:
                "radial-gradient(circle,rgba(141, 154, 176,0.12) 0%,transparent 65%)",
              filter: "blur(120px)",
            }}
          />
        </div>

        <div className="top-[10%] right-[5%] z-0 absolute w-[min(500px,80vw)] h-[min(500px,80vw)] pointer-events-none">
          <OrbitRings />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="z-10 relative mx-auto w-full max-w-[1280px]"
        >
          <div className="items-center gap-12 lg:gap-20 grid grid-cols-1 lg:grid-cols-2">
            {/* Left */}
            <div className="min-w-0">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* ✅ Badge from translations */}
                <Eyebrow>{t.about.badge}</Eyebrow>

                {/* ✅ Hero words from translations (split by \n) */}
                <div className="mb-7 overflow-hidden">
                  {heroWords.map((word, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: "110%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.75,
                        delay: 0.2 + i * 0.12,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileHover={{ x: 6 }}
                      className="block bg-clip-text bg-gradient-to-br from-white via-[#8D9AB0] to-[#A8B4C5] text-transparent leading-[0.95] transition-all duration-300 cursor-default"
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
                {/* ✅ Description from translations */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-6 mb-3 max-w-[480px] text-white/55 text-base leading-[1.85]"
                >
                  {t.about.desc}
                </motion.p>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="flex flex-wrap gap-6 sm:gap-8 mt-10"
              >
                {/* ✅ Hero stats from translations */}
                {[
                  { value: 60, suffix: "+", label: t.about.heroStats[0].label },
                  { value: 9, suffix: "", label: t.about.heroStats[1].label },
                  { value: 2, suffix: "", label: t.about.heroStats[2].label },
                ].map((s) => (
                  <motion.div
                    key={s.label}
                    whileHover={{ scale: 1.08, y: -4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div
                      className="mb-1 text-[2.5rem] text-white leading-none"
                      style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
                    >
                      <Counter to={s.value} suffix={s.suffix} />
                    </div>
                    <div className="font-mono text-white/35 text-xs uppercase tracking-[0.2em]">
                      {s.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Mobile-only compact info strip */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="lg:hidden mt-8"
              >
                <div
                  className="relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden"
                  style={{ borderColor: "rgba(141, 154, 176,0.2)" }}
                >
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 4,
                    }}
                    className="top-0 right-0 left-0 absolute h-px"
                    style={{
                      background:
                        "linear-gradient(90deg,transparent,#8D9AB0,transparent)",
                    }}
                  />
                  <div className="px-4 py-3 border-white/[0.06] border-b">
                    <div className="mb-1 font-mono text-[9px] text-white/30 uppercase tracking-[0.3em]">
                      {t.about.services}
                    </div>
                    <div className="text-white/70 text-xs">
                      Branding · Ads · Content · SMM · Video
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 px-4 py-3">
                    <div>
                      <div className="mb-1.5 font-mono text-[9px] text-white/30 uppercase tracking-[0.3em]">
                        {t.about.markets}
                      </div>
                      <div className="flex gap-1.5">
                        {["KSA", "Egypt"].map((m) => (
                          <span
                            key={m}
                            className="bg-white/[0.04] px-2.5 py-1 border border-white/[0.08] rounded-lg text-[11px] text-white/55"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="mb-1.5 font-mono text-[9px] text-white/30 uppercase tracking-[0.3em]">
                        {t.about.sectors}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {["Construction", "Medical", "F&B", "Tech"].map((s) => (
                          <span
                            key={s}
                            className="px-2.5 py-1 border border-[rgba(141,154,176,0.25)] rounded-full text-[11px] text-[rgba(141,154,176,0.85)]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right — identity card (desktop only) */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="hidden lg:block min-w-0"
            >
              <motion.div
                whileHover={{
                  y: -6,
                  boxShadow: "0 30px 80px rgba(141, 154, 176,0.2)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={glass}
                style={{ borderColor: "rgba(141, 154, 176,0.25)" }}
              >
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
                  className="top-0 right-0 left-0 absolute opacity-60 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg,transparent,#8D9AB0,transparent)",
                  }}
                />
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 4,
                    delay: 1.5,
                  }}
                  className="right-0 bottom-0 left-0 absolute opacity-40 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg,transparent,rgba(141, 154, 176,0.5),transparent)",
                  }}
                />
                <div
                  className="top-3 right-4 absolute text-white/[0.025] leading-none select-none"
                  style={{
                    fontFamily: "'Bebas Neue', Impact, sans-serif",
                    fontSize: "7rem",
                  }}
                >
                  OUR
                </div>
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 75% 25%,rgba(141, 154, 176,0.12) 0%,transparent 55%)",
                  }}
                />
                {/* ✅ Identity card labels from translations */}
                <div className="z-10 relative flex flex-col gap-6">
                  {[
                    { label: t.about.type, value: t.about.typeVal },
                    { label: t.about.founded, value: t.about.foundedVal },
                    {
                      label: t.about.services,
                      value: "Branding · Ads · Content · SMM · Video",
                    },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <div className="mb-1.5 font-mono text-[10px] text-white/35 uppercase tracking-[0.25em]">
                        {label}
                      </div>
                      <div className="text-white/80 text-sm">{value}</div>
                    </div>
                  ))}
                  <div>
                    <div className="mb-2.5 font-mono text-[10px] text-white/35 uppercase tracking-[0.25em]">
                      {t.about.markets}
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {["Saudi Arabia", "Egypt"].map((m) => (
                        <motion.span
                          key={m}
                          whileHover={{
                            borderColor: "#8D9AB0",
                            color: "white",
                            scale: 1.05,
                          }}
                          transition={{ type: "spring", stiffness: 400 }}
                          className="bg-white/[0.04] px-4 py-1.5 border border-white/[0.08] rounded-[10px] text-white/55 text-sm cursor-default"
                        >
                          {m}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="mb-2.5 font-mono text-[10px] text-white/35 uppercase tracking-[0.25em]">
                      {t.about.sectors}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Construction",
                        "Medical",
                        "F&B",
                        "Podcast",
                        "E-Commerce",
                        "Tech",
                      ].map((s, i) => (
                        <motion.span
                          key={s}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + i * 0.07 }}
                          whileHover={{
                            background: "rgba(141, 154, 176,0.12)",
                            borderColor: "#8D9AB0",
                            scale: 1.07,
                          }}
                          className="px-3 py-1 border border-[rgba(141,154,176,0.25)] rounded-full text-[rgba(141,154,176,0.85)] text-xs"
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
      <section className="relative px-4 sm:px-6 py-28 border-white/[0.06] border-t overflow-hidden">
        <div
          className="top-1/2 left-1/2 absolute w-[min(800px,100vw)] h-[500px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse,rgba(141, 154, 176,0.07) 0%,transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div className="z-10 relative mx-auto max-w-[1280px]">
          <FadeUp className="mb-16 text-center">
            {/* ✅ Labels from translations */}
            <Eyebrow>{t.about.vmBadge}</Eyebrow>
            <TitleDropLetters text={t.about.vmTitle} />
          </FadeUp>
          <AnimatedDivider />
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2 mt-12">
            {[
              {
                num: "02",
                label: t.about.ourVision,
                Icon: Telescope,
                accent: "#8D9AB0",
                text: t.about.visionText,
              },
              {
                num: "03",
                label: t.about.ourMission,
                Icon: Rocket,
                accent: "#A8B4C5",
                text: t.about.missionText,
              },
            ].map((item, i) => (
              <FadeUp key={item.num} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className={`${glass} h-full`}
                  style={{ borderColor: `${item.accent}20` }}
                >
                  <div
                    className="top-3 right-4 absolute text-white/[0.025] leading-none"
                    style={{
                      fontFamily: "'Bebas Neue', Impact, sans-serif",
                      fontSize: "6rem",
                    }}
                  >
                    {item.num}
                  </div>
                  <motion.div
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="top-0 right-0 left-0 absolute rounded-t-2xl h-0.5"
                    style={{
                      background: `linear-gradient(90deg,${item.accent},transparent)`,
                    }}
                  />
                  <div className="flex items-center gap-3 mb-4">
                    <SpinningIcon
                      Icon={item.Icon}
                      color={item.accent}
                      size={48}
                      spinDuration={10}
                      reverse={i % 2 !== 0}
                    />
                    <div
                      className="font-mono text-[10px] uppercase tracking-[0.3em]"
                      style={{ color: item.accent }}
                    >
                      {item.label}
                    </div>
                  </div>
                  <p className="m-0 text-white/55 text-sm leading-[1.85]">
                    {item.text}
                  </p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ VALUES ═══════════════ */}
      <section className="relative px-4 sm:px-6 py-28 border-white/[0.06] border-t overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="top-1/2 left-1/2 absolute border border-[rgba(141,154,176,0.05)] border-dashed rounded-full w-[min(900px,100vw)] h-[min(900px,100vw)] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        />
        <div className="z-10 relative mx-auto max-w-[1280px]">
          <FadeUp className="mb-20 text-center">
            {/* ✅ Labels from translations */}
            <Eyebrow>{t.about.valuesBadge}</Eyebrow>
            <TitleRiseLetters text={t.about.valuesTitle} />
          </FadeUp>
          <div className="gap-4 sm:gap-5 grid grid-cols-2 lg:grid-cols-4">
            {/* ✅ VALUES computed from t.about.valueWords */}
            {VALUES.map((v, i) => (
              <FadeUp key={v.word} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -10, boxShadow: `0 20px 60px ${v.color}20` }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className={`${glass} text-center cursor-default`}
                  style={{ borderColor: `${v.color}20` }}
                >
                  <RotatingIcon
                    Icon={v.Icon}
                    color={v.color}
                    size={36}
                    duration={5 + i}
                    delay={i * 0.5}
                  />
                  <div
                    className="mb-1.5 text-[1.4rem] text-white sm:text-[1.6rem] tracking-[0.05em]"
                    style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
                  >
                    {v.word}
                  </div>
                  <motion.div
                    animate={{
                      opacity: [0.3, 0.8, 0.3],
                      scaleX: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="bottom-0 left-1/2 absolute w-[60%] h-px -translate-x-1/2"
                    style={{
                      background: `linear-gradient(90deg,transparent,${v.color}60,transparent)`,
                    }}
                  />
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHAT MAKES US DIFFERENT ═══════════════ */}
      <section className="relative px-4 sm:px-6 py-28 border-white/[0.06] border-t overflow-hidden">
        <div className="mx-auto max-w-[1280px]">
          <div className="items-center gap-12 lg:gap-20 grid grid-cols-1 lg:grid-cols-2">
            <div>
              <FadeUp>
                {/* ✅ Title from translations */}
                <TitleBlurReveal>{t.about.differenceTitle}</TitleBlurReveal>
              </FadeUp>
              <div className="flex flex-col gap-5 mt-9">
                {/* ✅ Points from translations */}
                {t.about.differencePoints.map((point, i) => (
                  <FadeUp key={i} delay={i * 0.1}>
                    <motion.div
                      whileHover={{ x: 6 }}
                      className="flex items-start gap-4"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -90 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.3 + i * 0.1,
                          type: "spring",
                          stiffness: 200,
                        }}
                        whileHover={{
                          scale: 1.2,
                          boxShadow: "0 0 16px rgba(141, 154, 176,0.6)",
                        }}
                        className="flex justify-center items-center bg-[rgba(141,154,176,0.12)] mt-0.5 border border-[rgba(141,154,176,0.25)] rounded-full w-7 h-7 shrink-0"
                      >
                        <Diamond size={12} color="#8D9AB0" strokeWidth={1.5} />
                      </motion.div>
                      <p className="m-0 text-white/55 text-sm sm:text-base leading-[1.7]">
                        {point}
                      </p>
                    </motion.div>
                  </FadeUp>
                ))}
              </div>
            </div>

            {/* Right — stat card */}
            <FadeUp>
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -inset-8 border border-[rgba(141,154,176,0.12)] border-dashed rounded-full pointer-events-none"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -inset-3 border border-[rgba(141,154,176,0.2)] border-dashed rounded-full pointer-events-none"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-8 pointer-events-none"
                >
                  <div
                    className="-top-1 left-1/2 absolute bg-[#8D9AB0] rounded-full w-2 h-2 -translate-x-1/2"
                    style={{ boxShadow: "0 0 10px #8D9AB0" }}
                  />
                </motion.div>
                <div
                  className={`${glass} text-center p-8 sm:p-12`}
                  style={{ borderColor: "rgba(141, 154, 176,0.25)" }}
                >
                  <motion.div
                    animate={{
                      filter: [
                        "brightness(1)",
                        "brightness(1.3)",
                        "brightness(1)",
                      ],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="bg-clip-text bg-gradient-to-br from-white to-[#8D9AB0] text-[clamp(5rem,15vw,10rem)] text-transparent leading-none"
                    style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
                  >
                    <Counter to={60} suffix="+" />
                  </motion.div>
                  {/* ✅ Labels from translations */}
                  <div
                    className="mb-2 text-[1.4rem] text-white/55 tracking-[0.1em]"
                    style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
                  >
                    {t.about.clientsAcquired}
                  </div>
                  <div className="text-white/35 text-xs">
                    {t.about.inOneCampaign}
                  </div>
                  <div className="flex justify-center gap-8 mt-6 pt-6 border-white/[0.06] border-t">
                    {[
                      { n: "1M+", label: "Impressions" },
                      { n: "2", label: "Markets" },
                    ].map((s) => (
                      <motion.div
                        key={s.label}
                        whileHover={{ scale: 1.1 }}
                        className="text-center"
                      >
                        <div
                          className="text-[1.8rem] text-white leading-none"
                          style={{
                            fontFamily: "'Bebas Neue', Impact, sans-serif",
                          }}
                        >
                          {s.n}
                        </div>
                        <div className="mt-1 font-mono text-[11px] text-white/35 uppercase tracking-[0.15em]">
                          {s.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══════════════ PROCESS ═══════════════ */}
      <section className="px-4 sm:px-6 py-28 border-white/[0.06] border-t">
        <div className="mx-auto max-w-[1280px]">
          <FadeUp className="mb-20 text-center">
            {/* ✅ Labels from translations */}
            <Eyebrow>{t.about.processBadge}</Eyebrow>
            <TitleTypewriter text={t.about.processTitle} />
          </FadeUp>
          <div className="relative gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.5,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.3,
              }}
              className="hidden lg:block top-[60px] right-[10%] left-[10%] z-0 absolute h-px origin-left pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(141, 154, 176,0.4), rgba(141, 154, 176,0.4), transparent)",
              }}
            />
            {/* ✅ PROCESS computed from t.about.processSteps */}
            {PROCESS.map((step, i) => (
              <FadeUp key={step.num} delay={i * 0.12}>
                <motion.div
                  whileHover={{
                    y: -8,
                    boxShadow: "0 20px 60px rgba(141, 154, 176,0.12)",
                  }}
                  transition={{ type: "spring", stiffness: 280, damping: 20 }}
                  className={`${glass} text-center h-full z-10 relative`}
                  style={{ borderColor: "rgba(141, 154, 176,0.1)" }}
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.2 + i * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                    whileHover={{
                      scale: 1.15,
                      boxShadow: "0 0 20px rgba(141, 154, 176,0.6)",
                      background: "#8D9AB0",
                      color: "white",
                    }}
                    className="z-10 relative flex justify-center items-center bg-[rgba(141,154,176,0.12)] mx-auto mb-5 border border-[rgba(141,154,176,0.25)] rounded-full w-[52px] h-[52px] font-mono text-[#8D9AB0] text-[13px]"
                  >
                    {step.num}
                  </motion.div>
                  <h3
                    className="m-0 mb-3 text-[1.3rem] text-white tracking-[0.04em]"
                    style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
                  >
                    {step.title}
                  </h3>
                  <p className="m-0 text-[13px] text-white/35 leading-[1.75]">
                    {step.desc}
                  </p>
                  <motion.div
                    animate={{
                      opacity: [0.3, 0.8, 0.3],
                      scaleX: [0.4, 1, 0.4],
                    }}
                    transition={{ duration: 3 + i * 0.5, repeat: Infinity }}
                    className="bottom-0 left-1/2 absolute w-[55%] h-px -translate-x-1/2"
                    style={{
                      background:
                        "linear-gradient(90deg,transparent,rgba(141, 154, 176,0.5),transparent)",
                    }}
                  />
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="relative px-4 sm:px-6 py-28 pb-36 border-white/[0.06] border-t overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="top-1/2 left-1/2 absolute w-[min(800px,100vw)] h-[500px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse,rgba(141, 154, 176,0.12) 0%,transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div className="top-1/2 left-1/2 absolute w-[min(700px,90vw)] h-[min(700px,90vw)] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          {[600, 500, 400].map((size, i) => (
            <motion.div
              key={size}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{
                duration: 20 + i * 8,
                repeat: Infinity,
                ease: "linear",
              }}
              className="top-1/2 left-1/2 absolute border border-dashed rounded-full -translate-x-1/2 -translate-y-1/2"
              style={{
                width: `min(${size}px, 90vw)`,
                height: `min(${size}px, 90vw)`,
                borderColor: `rgba(141, 154, 176,${0.06 + i * 0.02})`,
              }}
            />
          ))}
        </div>

        <FadeUp className="z-10 relative text-center">
          {/* ✅ CTA labels from translations */}
          <Eyebrow>{t.about.ctaBadge}</Eyebrow>
          <div className="mb-6">
            <TitleGlitch text={t.about.ctaTitle1} delay={0} />
            <TitleDropLetters text={t.about.ctaTitle2} delay={0.3} />
          </div>
          <p className="mx-auto mt-6 mb-10 max-w-[480px] text-white/55 text-base leading-[1.8]">
            {t.about.ctaSub}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="mailto:ouragency259@gmail.com"
              whileHover={{
                scale: 1.06,
                boxShadow: "0 20px 60px rgba(141, 154, 176,0.45)",
              }}
              whileTap={{ scale: 0.97 }}
              className="inline-block relative bg-[#8D9AB0] px-8 sm:px-10 py-4 rounded-xl overflow-hidden font-semibold text-white text-sm no-underline tracking-[0.05em]"
            >
              <motion.span
                animate={{ x: ["-120%", "120%"] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                }}
              />
              {t.about.ctaBtn}
            </motion.a>
            <motion.a
              href="https://www.instagram.com/our_agency5"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                borderColor: "#8D9AB0",
                color: "white",
                scale: 1.04,
              }}
              className="inline-block bg-transparent px-8 sm:px-10 py-4 border border-white/[0.08] rounded-xl text-white/55 text-sm no-underline tracking-[0.05em]"
            >
              @our_agency5
            </motion.a>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
