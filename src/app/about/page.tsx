"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useAnimationFrame,
} from "framer-motion";

/* ─── Design tokens ─── */
const BLUE = "#007AFF";
const BLUE_DIM = "rgba(0,122,255,0.12)";
const BLUE_BORDER = "rgba(0,122,255,0.25)";
const WHITE = "#ffffff";
const WHITE55 = "rgba(255,255,255,0.55)";
const WHITE35 = "rgba(255,255,255,0.35)";
const WHITE08 = "rgba(255,255,255,0.08)";
const WHITE04 = "rgba(255,255,255,0.04)";
const MONO = "'JetBrains Mono', 'Fira Code', monospace";
const DISPLAY = "'Bebas Neue', Impact, sans-serif";

/* ─── Reusable glass card ─── */
const glassCard: React.CSSProperties = {
  background: WHITE04,
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: `1px solid ${WHITE08}`,
  borderRadius: 20,
  padding: "2rem",
  position: "relative",
  overflow: "hidden",
};

/* ─── Eyebrow label ─── */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: 11,
        fontFamily: MONO,
        color: BLUE,
        letterSpacing: "0.35em",
        textTransform: "uppercase",
        marginBottom: 16,
      }}
    >
      {children}
    </span>
  );
}

/* ─── Gradient headline ─── */
function GradientHeadline({
  children,
  size = "clamp(3rem,7vw,6rem)",
}: {
  children: React.ReactNode;
  size?: string;
}) {
  return (
    <h2
      style={{
        fontFamily: DISPLAY,
        fontSize: size,
        lineHeight: 1,
        background: `linear-gradient(135deg,${WHITE} 0%,${BLUE} 55%,#3395FF 100%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        margin: 0,
      }}
    >
      {children}
    </h2>
  );
}

/* ─── Stagger reveal wrapper ─── */
function FadeUp({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={style}
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
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 400,
        height: 400,
        borderRadius: "50%",
        background: "radial-gradient(circle,rgba(0,122,255,0.08) 0%,transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
        x: springX,
        y: springY,
        filter: "blur(60px)",
      }}
    />
  );
}

/* ─── Floating Particles Background ─── */
function FloatingParticles() {
  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 8,
    opacity: Math.random() * 0.4 + 0.1,
  }));

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          animate={{
            y: [0, -120, 0],
            x: [0, Math.random() * 60 - 30, 0],
            opacity: [0, p.opacity, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: BLUE,
            boxShadow: `0 0 ${p.size * 3}px ${BLUE}`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Orbiting rings background element ─── */
function OrbitRings({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{ position: "absolute", pointerEvents: "none", ...style }}>
      {[1, 0.65, 0.38].map((scale, i) => (
        <motion.div
          key={i}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 18 + i * 8, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            inset: `${i * 28}px`,
            border: `1px dashed rgba(0,122,255,${0.08 + i * 0.04})`,
            borderRadius: "50%",
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
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
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
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ─── Spinning Icon Badge ─── */
function SpinningIcon({
  icon,
  color,
  size = 56,
  spinDuration = 8,
  reverse = false,
}: {
  icon: string;
  color: string;
  size?: number;
  spinDuration?: number;
  reverse?: boolean;
}) {
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      {/* Outer spinning ring */}
      <motion.div
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{ duration: spinDuration, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          inset: -6,
          borderRadius: "50%",
          border: `1px dashed ${color}60`,
        }}
      />
      {/* Inner pulsing glow ring */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: `1px solid ${color}40`,
          boxShadow: `0 0 12px ${color}30`,
        }}
      />
      {/* Icon container */}
      <motion.div
        whileHover={{ scale: 1.15, rotate: 15 }}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}20 0%, ${color}08 100%)`,
          border: `1px solid ${color}40`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size * 0.42,
          position: "relative",
          zIndex: 1,
          cursor: "default",
        }}
      >
        {icon}
      </motion.div>
    </div>
  );
}

/* ─── Rotating Glyph ─── */
function RotatingGlyph({
  glyph,
  color,
  size = "2.5rem",
  duration = 6,
  delay = 0,
}: {
  glyph: string;
  color: string;
  size?: string;
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
      style={{ fontSize: size, color, display: "inline-block", marginBottom: 16 }}
    >
      {glyph}
    </motion.div>
  );
}

/* ─── Animated divider line ─── */
function AnimatedDivider() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} style={{ overflow: "hidden", height: 1, margin: "0 auto", maxWidth: 600 }}>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          height: 1,
          background: `linear-gradient(90deg, transparent, ${BLUE}, transparent)`,
          transformOrigin: "left",
        }}
      />
    </div>
  );
}

/* ─── Clients data ─── */
const CLIENTS_KSA = [
  {
    name: "Sadeef",
    nameAr: "سديف",
    sector: "Engineering & Architecture",
    desc: "Leading consultancy in architectural design & engineering solutions — residential and commercial projects.",
    icon: "🏗️",
  },
  {
    name: "Aamal",
    nameAr: "أعمال",
    sector: "Construction",
    desc: "Jeddah-based contractor specializing in high-quality construction, known for timeline precision across diverse projects.",
    icon: "🏢",
  },
  {
    name: "Yamas Arabia",
    nameAr: "يماس العربية",
    sector: "General Contracting",
    desc: "Prominent KSA contractor managing large-scale projects with cutting-edge construction technology from foundation to handover.",
    icon: "⚙️",
  },
  {
    name: "Silver Lines",
    nameAr: "خطوط فضية",
    sector: "Glass & Facades",
    desc: "Specialist in glass systems, facades, railings, and stainless steel installations across the Kingdom.",
    icon: "🪟",
  },
  {
    name: "Fawtara",
    nameAr: "افوترة",
    sector: "F&B Tech / ERP",
    desc: "Tech company building ERP solutions tailored for restaurants and cafés — streamlining daily operations with precision.",
    icon: "💻",
  },
];

const CLIENTS_EGY = [
  {
    name: "D Smile Clinic",
    nameAr: "دي سمايل كلينك",
    sector: "Medical / Dental",
    desc: "Dental aesthetics clinic offering comprehensive cosmetic and preventive care with the latest technology.",
    icon: "🦷",
  },
  {
    name: "Egyptinor",
    nameAr: "إيجيبتينور",
    sector: "Digital Finance",
    desc: "Digital economy & e-wallet company delivering innovative fintech solutions for a cashless society.",
    icon: "💳",
  },
  {
    name: "Dream Restaurant",
    nameAr: "مطعم دريم",
    sector: "F&B",
    desc: "Full-service restaurant delivering a complete dining experience with a focus on quality and service excellence.",
    icon: "🍽️",
  },
  {
    name: "Twelve Store",
    nameAr: "توِيلف",
    sector: "Fashion / E-Commerce",
    desc: "Fashion-forward clothing store offering contemporary pieces blending simplicity and elegance for all tastes.",
    icon: "👗",
  },
];

/* ─── Services ─── */
const SERVICES = [
  { icon: "✦", title: "Social Media Management", desc: "Full account management from content to analytics — growing engagement and refining performance continuously." },
  { icon: "◈", title: "Paid Ads & Performance", desc: "Multi-platform ad campaigns laser-focused on attracting serious buyers and driving measurable sales growth." },
  { icon: "◉", title: "Content Creation & Copy", desc: "Professional content written in your brand's voice — educational, marketing, and sales-oriented copy that converts." },
  { icon: "◐", title: "Branding & Visual Identity", desc: "From logo to color palette to tone — building a complete visual identity that makes your brand unforgettable." },
  { icon: "◑", title: "Graphic Design & Video", desc: "Compelling designs and professional video edits that reflect brand personality and serve the marketing message." },
];

/* ─── Values ─── */
const VALUES = [
  { word: "Commitment", ar: "الالتزام", glyph: "◈", color: BLUE },
  { word: "Creativity", ar: "الإبداع", glyph: "✦", color: "#3395FF" },
  { word: "Transparency", ar: "الشفافية", glyph: "◉", color: "#56AFFF" },
  { word: "Growth", ar: "التطور", glyph: "◐", color: BLUE },
];

/* ─── Process steps ─── */
const PROCESS = [
  { num: "01", title: "Research & Discovery", desc: "Deep-diving into your brand, audience, and competitive landscape to find the real opportunity." },
  { num: "02", title: "Planning & Strategy", desc: "A clear, custom marketing roadmap — no copy-paste templates, every plan built for one brand only." },
  { num: "03", title: "Execution", desc: "Content + design + ad management running in perfect sync toward one goal: measurable impact." },
  { num: "04", title: "Optimization", desc: "Continuous result analysis and performance refinement — because every percentage point matters." },
];

/* ────────────────────────────────────────────────── */
export default function AboutPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const [activeTab, setActiveTab] = useState<"ksa" | "egypt">("ksa");
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  return (
    <>
      <CursorBlob />
      <GridBackground />
      <FloatingParticles />

      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "9rem 1.5rem 6rem",
          overflow: "hidden",
        }}
      >
        {/* ambient orbs */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.9, 0.5], x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: "-10%",
              right: "-5%",
              width: 700,
              height: 700,
              borderRadius: "50%",
              background: "radial-gradient(circle,rgba(0,122,255,0.22) 0%,transparent 65%)",
              filter: "blur(80px)",
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.7, 0.3], x: [0, -20, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            style={{
              position: "absolute",
              bottom: "10%",
              left: "-8%",
              width: 500,
              height: 500,
              borderRadius: "50%",
              background: "radial-gradient(circle,rgba(51,149,255,0.15) 0%,transparent 65%)",
              filter: "blur(100px)",
            }}
          />
          {/* Extra orb center */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            style={{
              position: "absolute",
              top: "40%",
              left: "40%",
              width: 400,
              height: 300,
              borderRadius: "50%",
              background: "radial-gradient(circle,rgba(0,122,255,0.12) 0%,transparent 65%)",
              filter: "blur(120px)",
            }}
          />
        </div>

        {/* Big orbit rings in hero background */}
        <div style={{ position: "absolute", right: "5%", top: "10%", width: 500, height: 500, pointerEvents: "none", zIndex: 0 }}>
          <OrbitRings />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-[1280px] mx-auto w-full"
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "5rem",
              alignItems: "center",
            }}
          >
            {/* Left */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <Eyebrow>About OUR Agency</Eyebrow>
                <div style={{ overflow: "hidden", marginBottom: 28 }}>
                  {["YOUNG.", "HUNGRY.", "CREATIVE."].map((word, i) => (
                    <motion.div
                      key={word}
                      initial={{ y: "110%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.75, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{
                        WebkitTextFillColor: "transparent",
                        filter: "brightness(1.3)",
                        x: 6,
                      }}
                      style={{
                        fontFamily: DISPLAY,
                        fontSize: "clamp(3.5rem,8vw,7rem)",
                        lineHeight: 0.95,
                        background: `linear-gradient(135deg,${WHITE} 0%,${BLUE} 55%,#3395FF 100%)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        display: "block",
                        cursor: "default",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {word}
                    </motion.div>
                  ))}
                </div>

                {/* Animated divider */}
                <AnimatedDivider />

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  style={{ fontSize: 16, color: WHITE55, lineHeight: 1.85, maxWidth: 480, marginBottom: 12, marginTop: 24 }}
                >
                  OUR is a digital marketing agency powered by a team of young creatives. We work with passion and real effort — believing every brand deserves a marketing plan built on deep understanding, powerful content, and authentic execution that drives results.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.85 }}
                  style={{ fontSize: 14, fontWeight: 600, color: BLUE, letterSpacing: "0.05em" }}
                >
                  We're not just service providers — we're growth partners.
                </motion.p>
              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                style={{ display: "flex", gap: 32, marginTop: 40 }}
              >
                {[
                  { value: 60, suffix: "+", label: "Campaigns" },
                  { value: 9, suffix: "", label: "Clients" },
                  { value: 2, suffix: "", label: "Markets" },
                ].map((s, idx) => (
                  <motion.div
                    key={s.label}
                    whileHover={{ scale: 1.08, y: -4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div
                      style={{
                        fontFamily: DISPLAY,
                        fontSize: "2.5rem",
                        lineHeight: 1,
                        color: WHITE,
                        marginBottom: 4,
                      }}
                    >
                      <Counter to={s.value} suffix={s.suffix} />
                    </div>
                    <div style={{ fontSize: 12, color: WHITE35, fontFamily: MONO, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                      {s.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right — identity card */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                whileHover={{ y: -6, boxShadow: "0 30px 80px rgba(0,122,255,0.2)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ ...glassCard, borderColor: BLUE_BORDER }}
              >
                {/* Multiple shimmer lines */}
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 1,
                    background: `linear-gradient(90deg,transparent,${BLUE},transparent)`,
                    opacity: 0.6,
                  }}
                />
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, delay: 1.5 }}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 1,
                    background: `linear-gradient(90deg,transparent,rgba(0,122,255,0.5),transparent)`,
                    opacity: 0.4,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 16,
                    fontFamily: DISPLAY,
                    fontSize: "7rem",
                    color: "rgba(255,255,255,0.025)",
                    lineHeight: 1,
                    userSelect: "none",
                  }}
                >
                  OUR
                </div>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(ellipse at 75% 25%,${BLUE_DIM} 0%,transparent 55%)`,
                    pointerEvents: "none",
                  }}
                />
                <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
                  {[
                    { label: "Type", value: "Digital Marketing Agency" },
                    { label: "Founded", value: "KSA & Egypt" },
                    { label: "Services", value: "Branding · Ads · Content · SMM · Video" },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <div
                        style={{
                          fontSize: 10,
                          color: WHITE35,
                          fontFamily: MONO,
                          letterSpacing: "0.25em",
                          textTransform: "uppercase",
                          marginBottom: 6,
                        }}
                      >
                        {label}
                      </div>
                      <div style={{ fontSize: 14, color: "rgba(255,255,255,0.8)" }}>{value}</div>
                    </div>
                  ))}
                  <div>
                    <div
                      style={{
                        fontSize: 10,
                        color: WHITE35,
                        fontFamily: MONO,
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        marginBottom: 10,
                      }}
                    >
                      Markets
                    </div>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {["🇸🇦 Saudi Arabia", "🇪🇬 Egypt"].map((m) => (
                        <motion.span
                          key={m}
                          whileHover={{ borderColor: BLUE, color: WHITE, scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 400 }}
                          style={{
                            fontSize: 13,
                            padding: "6px 16px",
                            borderRadius: 10,
                            background: WHITE04,
                            border: `1px solid ${WHITE08}`,
                            color: WHITE55,
                            cursor: "default",
                          }}
                        >
                          {m}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 10,
                        color: WHITE35,
                        fontFamily: MONO,
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        marginBottom: 10,
                      }}
                    >
                      Sectors
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {["Construction", "Medical", "F&B", "Podcast", "E-Commerce", "Tech"].map((s, i) => (
                        <motion.span
                          key={s}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + i * 0.07 }}
                          whileHover={{ background: BLUE_DIM, borderColor: BLUE, scale: 1.07 }}
                          style={{
                            fontSize: 12,
                            padding: "4px 12px",
                            borderRadius: 20,
                            border: `1px solid ${BLUE_BORDER}`,
                            color: "rgba(0,122,255,0.85)",
                          }}
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

      {/* ═══════════════════════════════════════════
          VISION & MISSION
      ═══════════════════════════════════════════ */}
      <section
        style={{
          padding: "7rem 1.5rem",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 800,
            height: 500,
            background: `radial-gradient(ellipse,rgba(0,122,255,0.07) 0%,transparent 70%)`,
            filter: "blur(100px)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <FadeUp style={{ textAlign: "center", marginBottom: "4rem" }}>
            <Eyebrow>Who We Are</Eyebrow>
            <GradientHeadline>VISION & MISSION</GradientHeadline>
          </FadeUp>
          <AnimatedDivider />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
              marginTop: "3rem",
            }}
          >
            {[
              {
                num: "02",
                label: "Our Vision",
                text: "To become the transformation point for ambitious brands — delivering marketing strategies built on creativity, data, and true market understanding. We chart clear growth paths through competition, create real measurable value, and walk with every client step by step toward a stronger presence that competes with the best.",
                accent: BLUE,
                icon: "🔭",
              },
              {
                num: "03",
                label: "Our Mission",
                text: "We deliver practical marketing solutions that support brand building, attract customers, and achieve measurable results — through powerful content management, paid advertising, and building an impactful digital identity.",
                accent: "#3395FF",
                icon: "🚀",
              },
            ].map((item, i) => (
              <FadeUp key={item.num} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -8, borderColor: item.accent + "40" }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  style={{ ...glassCard, borderColor: item.accent + "20", height: "100%" }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 16,
                      fontFamily: DISPLAY,
                      fontSize: "6rem",
                      color: "rgba(255,255,255,0.025)",
                      lineHeight: 1,
                    }}
                  >
                    {item.num}
                  </div>
                  {/* accent top bar */}
                  <motion.div
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: `linear-gradient(90deg,${item.accent},transparent)`,
                      borderRadius: "20px 20px 0 0",
                    }}
                  />
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <SpinningIcon icon={item.icon} color={item.accent} size={48} spinDuration={10} reverse={i % 2 !== 0} />
                    <div
                      style={{
                        fontSize: 10,
                        color: item.accent,
                        fontFamily: MONO,
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.label}
                    </div>
                  </div>
                  <p style={{ fontSize: 15, color: WHITE55, lineHeight: 1.85, margin: 0 }}>{item.text}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          VALUES
      ═══════════════════════════════════════════ */}
      <section
        style={{
          padding: "7rem 1.5rem",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Ambient bg for values */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 900,
            height: 900,
            borderRadius: "50%",
            border: "1px dashed rgba(0,122,255,0.05)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <FadeUp style={{ textAlign: "center", marginBottom: "5rem" }}>
            <Eyebrow>What Drives Us</Eyebrow>
            <GradientHeadline>OUR VALUES</GradientHeadline>
          </FadeUp>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {VALUES.map((v, i) => (
              <FadeUp key={v.word} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -10, borderColor: v.color + "50", boxShadow: `0 20px 60px ${v.color}20` }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  style={{ ...glassCard, textAlign: "center", cursor: "default" }}
                >
                  {/* Spinning glyph */}
                  <RotatingGlyph
                    glyph={v.glyph}
                    color={v.color}
                    size="2.8rem"
                    duration={5 + i}
                    delay={i * 0.5}
                  />

                  <div
                    style={{
                      fontFamily: DISPLAY,
                      fontSize: "1.6rem",
                      color: WHITE,
                      marginBottom: 6,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {v.word}
                  </div>
                  <div style={{ fontSize: 13, color: WHITE35, fontFamily: MONO }}>{v.ar}</div>

                  {/* Animated bottom glow line */}
                  <motion.div
                    animate={{ opacity: [0.3, 0.8, 0.3], scaleX: [0.5, 1, 0.5] }}
                    transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "60%",
                      height: 1,
                      background: `linear-gradient(90deg,transparent,${v.color}60,transparent)`,
                    }}
                  />
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WHAT MAKES US DIFFERENT
      ═══════════════════════════════════════════ */}
      <section
        style={{
          padding: "7rem 1.5rem",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "5rem",
              alignItems: "center",
            }}
          >
            {/* Left — text */}
            <div>
              <FadeUp>
                <Eyebrow>Why OUR</Eyebrow>
                <GradientHeadline size="clamp(2.5rem,6vw,5rem)">
                  WHAT MAKES<br />US DIFFERENT
                </GradientHeadline>
              </FadeUp>
              <div style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  "A young team that genuinely understands the market",
                  "We focus on results — not just impressions",
                  "Faster execution, authentic content, flexible strategies",
                  "Every brand gets a completely different plan",
                ].map((point, i) => (
                  <FadeUp key={i} delay={i * 0.1}>
                    <motion.div
                      whileHover={{ x: 6 }}
                      style={{ display: "flex", gap: 16, alignItems: "flex-start" }}
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -90 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 200 }}
                        whileHover={{ scale: 1.2, boxShadow: `0 0 16px ${BLUE}60` }}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          border: `1px solid ${BLUE_BORDER}`,
                          background: BLUE_DIM,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: 2,
                          color: BLUE,
                          fontSize: 13,
                          fontFamily: MONO,
                        }}
                      >
                        ✓
                      </motion.div>
                      <p style={{ fontSize: 15, color: WHITE55, lineHeight: 1.7, margin: 0 }}>{point}</p>
                    </motion.div>
                  </FadeUp>
                ))}
              </div>
            </div>

            {/* Right — big number accent with orbit rings */}
            <FadeUp>
              <div style={{ position: "relative" }}>
                {/* Multi-layered orbit rings */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  style={{
                    position: "absolute",
                    inset: -30,
                    border: "1px dashed rgba(0,122,255,0.12)",
                    borderRadius: "50%",
                    pointerEvents: "none",
                  }}
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                  style={{
                    position: "absolute",
                    inset: -12,
                    border: "1px dashed rgba(0,122,255,0.2)",
                    borderRadius: "50%",
                    pointerEvents: "none",
                  }}
                />

                {/* Orbiting dot on the ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  style={{
                    position: "absolute",
                    inset: -30,
                    pointerEvents: "none",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: -4,
                      left: "50%",
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: BLUE,
                      boxShadow: `0 0 10px ${BLUE}`,
                      transform: "translateX(-50%)",
                    }}
                  />
                </motion.div>

                <div
                  style={{
                    ...glassCard,
                    textAlign: "center",
                    padding: "3rem",
                    borderColor: BLUE_BORDER,
                  }}
                >
                  <motion.div
                    animate={{ filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    style={{
                      fontFamily: DISPLAY,
                      fontSize: "clamp(5rem,15vw,10rem)",
                      lineHeight: 1,
                      background: `linear-gradient(135deg,${WHITE} 0%,${BLUE} 100%)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    <Counter to={60} suffix="+" />
                  </motion.div>
                  <div
                    style={{
                      fontFamily: DISPLAY,
                      fontSize: "1.4rem",
                      color: WHITE55,
                      letterSpacing: "0.1em",
                      marginBottom: 8,
                    }}
                  >
                    CLIENTS ACQUIRED
                  </div>
                  <div style={{ fontSize: 13, color: WHITE35 }}>
                    In a single campaign
                  </div>
                  <div
                    style={{
                      marginTop: 24,
                      paddingTop: 24,
                      borderTop: "1px solid rgba(255,255,255,0.06)",
                      display: "flex",
                      justifyContent: "center",
                      gap: 32,
                    }}
                  >
                    {[{ n: "1M+", label: "Impressions" }, { n: "2", label: "Markets" }].map((s) => (
                      <motion.div
                        key={s.label}
                        whileHover={{ scale: 1.1 }}
                        style={{ textAlign: "center" }}
                      >
                        <div style={{ fontFamily: DISPLAY, fontSize: "1.8rem", color: WHITE, lineHeight: 1 }}>
                          {s.n}
                        </div>
                        <div style={{ fontSize: 11, color: WHITE35, fontFamily: MONO, marginTop: 4, letterSpacing: "0.15em", textTransform: "uppercase" }}>
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

      {/* ═══════════════════════════════════════════
          SERVICES
      ═══════════════════════════════════════════ */}
      <section
        style={{
          padding: "7rem 1.5rem",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <FadeUp style={{ textAlign: "center", marginBottom: "5rem" }}>
            <Eyebrow>What We Do</Eyebrow>
            <GradientHeadline>OUR SERVICES</GradientHeadline>
          </FadeUp>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, overflow: "hidden" }}>
            {SERVICES.map((svc, i) => (
              <FadeUp key={i} delay={i * 0.07}>
                <motion.div
                  onHoverStart={() => setHoveredService(i)}
                  onHoverEnd={() => setHoveredService(null)}
                  animate={{
                    background: hoveredService === i
                      ? "rgba(0,122,255,0.06)"
                      : "rgba(255,255,255,0.01)",
                  }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr auto",
                    alignItems: "center",
                    gap: "2rem",
                    padding: "1.75rem 2rem",
                    borderBottom: i < SERVICES.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                    cursor: "default",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Hover shimmer */}
                  {hoveredService === i && (
                    <motion.div
                      initial={{ x: "-100%", opacity: 0 }}
                      animate={{ x: "200%", opacity: 0.3 }}
                      transition={{ duration: 0.8 }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: `linear-gradient(90deg, transparent, ${BLUE}20, transparent)`,
                        pointerEvents: "none",
                      }}
                    />
                  )}

                  <motion.div
                    animate={{
                      color: hoveredService === i ? BLUE : WHITE35,
                      rotate: hoveredService === i ? [0, 15, -10, 0] : 0,
                      scale: hoveredService === i ? 1.2 : 1,
                      filter: hoveredService === i ? `drop-shadow(0 0 8px ${BLUE})` : "none",
                    }}
                    transition={{ duration: 0.4 }}
                    style={{
                      fontFamily: MONO,
                      fontSize: "1.8rem",
                      width: 40,
                      textAlign: "center",
                    }}
                  >
                    {svc.icon}
                  </motion.div>
                  <div>
                    <motion.h3
                      animate={{ color: hoveredService === i ? WHITE : "rgba(255,255,255,0.8)" }}
                      style={{
                        fontFamily: DISPLAY,
                        fontSize: "1.4rem",
                        letterSpacing: "0.05em",
                        margin: "0 0 6px",
                      }}
                    >
                      {svc.title}
                    </motion.h3>
                    <p style={{ fontSize: 14, color: WHITE35, margin: 0, maxWidth: 600, lineHeight: 1.7 }}>
                      {svc.desc}
                    </p>
                  </div>
                  <motion.div
                    animate={{
                      x: hoveredService === i ? 0 : -8,
                      opacity: hoveredService === i ? 1 : 0,
                      color: BLUE,
                      scale: hoveredService === i ? [1, 1.3, 1] : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ fontSize: "1.5rem" }}
                  >
                    →
                  </motion.div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          OUR WORK — CLIENTS
      ═══════════════════════════════════════════ */}
      <section
        style={{
          padding: "7rem 1.5rem",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <FadeUp style={{ textAlign: "center", marginBottom: "3rem" }}>
            <Eyebrow>Our Work</Eyebrow>
            <GradientHeadline>CLIENTS WE&apos;VE GROWN</GradientHeadline>
          </FadeUp>

          {/* Tab switcher */}
          <FadeUp style={{ display: "flex", justifyContent: "center", marginBottom: "3.5rem" }}>
            <div
              style={{
                display: "inline-flex",
                gap: 4,
                padding: 4,
                background: WHITE04,
                border: `1px solid ${WHITE08}`,
                borderRadius: 14,
              }}
            >
              {(["ksa", "egypt"] as const).map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  animate={{
                    background: activeTab === tab ? BLUE : "transparent",
                    color: activeTab === tab ? WHITE : WHITE55,
                    boxShadow: activeTab === tab ? `0 4px 20px ${BLUE}50` : "none",
                  }}
                  whileHover={{ color: WHITE, scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    padding: "10px 28px",
                    borderRadius: 10,
                    border: "none",
                    cursor: "pointer",
                    fontFamily: MONO,
                    fontSize: 12,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}
                >
                  {tab === "ksa" ? "🇸🇦 Saudi Arabia" : "🇪🇬 Egypt"}
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
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {(activeTab === "ksa" ? CLIENTS_KSA : CLIENTS_EGY).map((client, i) => (
                <motion.div
                  key={client.name}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6, borderColor: BLUE_BORDER, boxShadow: `0 20px 60px rgba(0,122,255,0.12)` }}
                  style={{ ...glassCard }}
                >
                  {/* Spinning icon in client card */}
                  <div style={{ marginBottom: 14 }}>
                    <SpinningIcon
                      icon={client.icon}
                      color={BLUE}
                      size={50}
                      spinDuration={12 + i * 2}
                      reverse={i % 2 !== 0}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: BLUE,
                      fontFamily: MONO,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    {client.sector}
                  </div>
                  <h3
                    style={{
                      fontFamily: DISPLAY,
                      fontSize: "1.4rem",
                      color: WHITE,
                      margin: "0 0 4px",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {client.name}
                  </h3>
                  <div style={{ fontSize: 12, color: WHITE35, fontFamily: MONO, marginBottom: 12 }}>
                    {client.nameAr}
                  </div>
                  <p style={{ fontSize: 13, color: WHITE35, lineHeight: 1.75, margin: 0 }}>{client.desc}</p>

                  {/* Hover accent bar */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: `linear-gradient(90deg, ${BLUE}, transparent)`,
                      transformOrigin: "left",
                      borderRadius: "0 0 20px 20px",
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CAMPAIGN RESULTS
      ═══════════════════════════════════════════ */}
      <section
        style={{
          padding: "7rem 1.5rem",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <FadeUp style={{ textAlign: "center", marginBottom: "4rem" }}>
            <Eyebrow>Proof of Work</Eyebrow>
            <GradientHeadline>CAMPAIGN RESULTS</GradientHeadline>
            <p style={{ color: WHITE35, fontSize: 14, marginTop: 16, maxWidth: 460, margin: "16px auto 0" }}>
              Real before & after — one campaign that brought in 60+ clients.
            </p>
          </FadeUp>

          {/* Results highlight bar */}
          <FadeUp>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "1px",
                background: "rgba(255,255,255,0.06)",
                borderRadius: 20,
                overflow: "hidden",
                marginBottom: "2.5rem",
              }}
            >
              {[
                { value: "60+", label: "New Clients", sub: "From one campaign", icon: "🎯" },
                { value: "1M+", label: "Impressions", sub: "Reached fast", icon: "👁️" },
                { value: "2", label: "Markets", sub: "KSA & Egypt", icon: "🌍" },
                { value: "5", label: "Services", sub: "Delivered together", icon: "⚡" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ background: "rgba(0,122,255,0.06)" }}
                  style={{
                    padding: "2.5rem 2rem",
                    background: WHITE04,
                    textAlign: "center",
                  }}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8 }}
                    style={{ fontSize: "1.8rem", marginBottom: 10 }}
                  >
                    {stat.icon}
                  </motion.div>
                  <div
                    style={{
                      fontFamily: DISPLAY,
                      fontSize: "2.8rem",
                      lineHeight: 1,
                      color: WHITE,
                      marginBottom: 8,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 4, fontWeight: 500 }}>
                    {stat.label}
                  </div>
                  <div style={{ fontSize: 11, color: WHITE35, fontFamily: MONO }}>{stat.sub}</div>
                </motion.div>
              ))}
            </div>
          </FadeUp>

          {/* Before / After image placeholders */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {["Before Campaign", "After Campaign", "Campaign Creative", "Results Dashboard"].map((label, i) => (
              <FadeUp key={label} delay={i * 0.1}>
                <motion.div
                  whileHover={{ borderColor: BLUE_BORDER, y: -4, boxShadow: `0 16px 50px rgba(0,122,255,0.1)` }}
                  style={{
                    ...glassCard,
                    aspectRatio: "16/10",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 12,
                    borderStyle: "dashed",
                  }}
                >
                  <motion.div
                    animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.08, 1] }}
                    transition={{ duration: 5 + i, repeat: Infinity }}
                    style={{ fontSize: "2.5rem", opacity: 0.3 }}
                  >
                    {i < 2 ? "📸" : i === 2 ? "🎨" : "📊"}
                  </motion.div>
                  <div style={{ fontSize: 12, color: WHITE35, fontFamily: MONO, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    {label}
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", textAlign: "center", maxWidth: 200 }}>
                    Drop your campaign image here
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PROCESS
      ═══════════════════════════════════════════ */}
      <section
        style={{
          padding: "7rem 1.5rem",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <FadeUp style={{ textAlign: "center", marginBottom: "5rem" }}>
            <Eyebrow>How We Work</Eyebrow>
            <GradientHeadline>OUR PROCESS</GradientHeadline>
          </FadeUp>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1.25rem",
              position: "relative",
            }}
          >
            {/* Connecting line between steps */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              style={{
                position: "absolute",
                top: "60px",
                left: "10%",
                right: "10%",
                height: 1,
                background: `linear-gradient(90deg, transparent, ${BLUE}40, ${BLUE}40, transparent)`,
                transformOrigin: "left",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />

            {PROCESS.map((step, i) => (
              <FadeUp key={step.num} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -8, borderColor: BLUE_BORDER, boxShadow: `0 20px 60px rgba(0,122,255,0.12)` }}
                  transition={{ type: "spring", stiffness: 280, damping: 20 }}
                  style={{ ...glassCard, textAlign: "center", height: "100%", zIndex: 1 }}
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 200 }}
                    whileHover={{
                      scale: 1.15,
                      boxShadow: `0 0 20px ${BLUE}60`,
                      background: BLUE,
                      color: WHITE,
                    }}
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      border: `1px solid ${BLUE_BORDER}`,
                      background: BLUE_DIM,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                      fontFamily: MONO,
                      fontSize: 13,
                      color: BLUE,
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    {step.num}
                  </motion.div>
                  <h3
                    style={{
                      fontFamily: DISPLAY,
                      fontSize: "1.3rem",
                      color: WHITE,
                      margin: "0 0 12px",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ fontSize: 13, color: WHITE35, lineHeight: 1.75, margin: 0 }}>{step.desc}</p>

                  {/* Animated accent line */}
                  <motion.div
                    animate={{ opacity: [0.3, 0.8, 0.3], scaleX: [0.4, 1, 0.4] }}
                    transition={{ duration: 3 + i * 0.5, repeat: Infinity }}
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "55%",
                      height: 1,
                      background: `linear-gradient(90deg,transparent,${BLUE}50,transparent)`,
                    }}
                  />
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA
      ═══════════════════════════════════════════ */}
      <section
        style={{
          padding: "7rem 1.5rem 9rem",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Big pulsing background */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 800,
            height: 500,
            background: `radial-gradient(ellipse,rgba(0,122,255,0.12) 0%,transparent 70%)`,
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />

        {/* Rotating outer rings */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, pointerEvents: "none" }}>
          {[600, 500, 400].map((size, i) => (
            <motion.div
              key={size}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 20 + i * 8, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: size,
                height: size,
                borderRadius: "50%",
                border: `1px dashed rgba(0,122,255,${0.06 + i * 0.02})`,
                transform: "translate(-50%,-50%)",
              }}
            />
          ))}
        </div>

        <FadeUp style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <Eyebrow>Ready to grow?</Eyebrow>
          <GradientHeadline size="clamp(3rem,8vw,7rem)">
            YOUR VISION,<br />OUR MISSION
          </GradientHeadline>
          <p
            style={{
              fontSize: 16,
              color: WHITE55,
              maxWidth: 480,
              margin: "24px auto 40px",
              lineHeight: 1.8,
            }}
          >
            Let's build something that makes your competitors nervous. One brand, one plan, real results.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <motion.a
              href="mailto:ouragency259@gmail.com"
              whileHover={{
                scale: 1.06,
                boxShadow: `0 20px 60px rgba(0,122,255,0.45)`,
              }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "16px 40px",
                background: BLUE,
                color: WHITE,
                borderRadius: 12,
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.05em",
                display: "inline-block",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <motion.span
                animate={{ x: ["-120%", "120%"] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                  pointerEvents: "none",
                }}
              />
              Start a Project →
            </motion.a>
            <motion.a
              href="https://www.instagram.com/our_agency5"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ borderColor: BLUE, color: WHITE, scale: 1.04 }}
              style={{
                padding: "16px 40px",
                background: "transparent",
                color: WHITE55,
                border: `1px solid ${WHITE08}`,
                borderRadius: 12,
                textDecoration: "none",
                fontSize: 14,
                letterSpacing: "0.05em",
                display: "inline-block",
              }}
            >
              @our_agency5
            </motion.a>
          </div>
        </FadeUp>
      </section>
    </>
  );
}