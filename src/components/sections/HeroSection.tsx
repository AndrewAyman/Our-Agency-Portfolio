"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  useScroll,
  MotionValue,
} from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { useT } from "@/translations/useT";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── MAGNETIC CURSOR BLOB ── */
function MagneticBlob() {
  const [isClient, setIsClient] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });
  const x = useTransform(sx, (v) => v - 250);
  const y = useTransform(sy, (v) => v - 250);

  useEffect(() => {
    setIsClient(true);
    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my]);

  return (
    <motion.div
      className="top-0 left-0 z-0 fixed rounded-full w-[500px] h-[500px] pointer-events-none"
      style={{
        background:
          "radial-gradient(circle, rgba(141, 154, 176,0.07) 0%, transparent 70%)",
        filter: "blur(40px)",
        x: isClient ? x : 0,
        y: isClient ? y : 0,
      }}
    />
  );
}

/* ── PARTICLE FIELD ── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      pulse: number;
    }> = [];

    const initParticles = () => {
      const particleCount = 120;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 120) {
            ctx.beginPath();
            const opacity = 0.08 * (1 - distance / 120);
            ctx.strokeStyle = `rgba(141, 154, 176, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.03;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        const pulseOpacity = p.opacity + Math.sin(p.pulse) * 0.1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(141, 154, 176, ${Math.max(0.05, pulseOpacity)})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="z-0 absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

/* ── FLOATING ORBS ── */
function FloatingOrbs() {
  const [isClient, setIsClient] = useState(false);
  const orbsRef = useRef<
    Array<{
      id: number;
      size: number;
      left: number;
      top: number;
      duration: number;
      delay: number;
      opacity: number;
    }>
  >([]);

  useEffect(() => {
    orbsRef.current = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      size: 200 + Math.random() * 400,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 10 + Math.random() * 15,
      delay: Math.random() * 5,
      opacity: 0.05 + Math.random() * 0.08,
    }));
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <>
      {orbsRef.current.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.left}%`,
            top: `${orb.top}%`,
            background: `radial-gradient(circle, rgba(141, 154, 176, ${orb.opacity}) 0%, transparent 70%)`,
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, Math.sin(orb.id) * 50, 0],
            y: [0, Math.cos(orb.id) * 50, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            delay: orb.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

/* ── WORD CYCLER — now uses translated words ── */
function WordCycler({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % words.length),
      2200,
    );
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <motion.span
      layout
      className="inline-flex relative px-1 h-[1.3em] overflow-hidden align-middle transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={words[index]}
          initial={{ y: "80%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-80%", opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="inline-block font-bold text-[#8D9AB0] whitespace-nowrap"
          style={{
            textShadow: "0 0 40px rgba(141, 154, 176,0.6)",
            lineHeight: "1.2",
          }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}

/* ── SCROLL INDICATOR ── */
function ScrollIndicator({ label }: { label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
      className="bottom-4 left-1/2 z-20 absolute flex flex-col items-center gap-1.5 -translate-x-1/2 pointer-events-none"
    >
      <span className="font-mono text-[9px] text-white/20 uppercase tracking-[0.35em] select-none">
        {label}
      </span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="bg-gradient-to-b from-[#8D9AB0]/40 to-transparent w-[1px] h-10"
      />
    </motion.div>
  );
}

/* ── SIDE RIBBONS — now uses translated words ── */
function SideRibbon({
  side,
  words,
}: {
  side: "left" | "right";
  words: string[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="hidden top-1/2 z-10 absolute lg:flex gap-12 -translate-y-1/2 pointer-events-none select-none"
      style={{
        [side]: 20,
        transform: `translateY(-50%) rotate(${side === "left" ? -90 : 90}deg)`,
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={word}
          animate={{ opacity: [0.03, 0.12, 0.03] }}
          transition={{ duration: 6, delay: i * 0.9, repeat: Infinity }}
          className="font-mono font-light text-[9.5px] text-white/60 tracking-[0.42em] whitespace-nowrap"
          style={{ filter: "blur(0.5px)" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

/* ── ANIMATED STAT PILL ── */
interface StatPillProps {
  targetNumber: number;
  suffix?: string;
  label: string;
  delay: number;
}

function StatPill({ targetNumber, suffix = "", label, delay }: StatPillProps) {
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    const startTimer = setTimeout(
      () => {
        const DURATION = 2000,
          STEPS = 80,
          STEP_MS = DURATION / STEPS;
        let step = 0;
        const fmt = (n: number) =>
          n >= 1000000
            ? (n / 1000000).toFixed(0) + "M"
            : n.toLocaleString("en-US");
        intervalId = setInterval(() => {
          step++;
          const eased = 1 - Math.pow(1 - step / STEPS, 3);
          const current = Math.floor(eased * targetNumber);
          if (step >= STEPS) {
            clearInterval(intervalId!);
            setDisplayValue(fmt(targetNumber));
          } else setDisplayValue(fmt(current));
        }, STEP_MS);
      },
      delay * 1000 + 500,
    );
    return () => {
      clearTimeout(startTimer);
      if (intervalId) clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: EASE }}
      whileHover={{ scale: 1.08, y: -3 }}
      className="bg-white/5 backdrop-blur-md px-5 py-2.5 border border-white/10 rounded-full min-w-[115px] text-center cursor-default"
    >
      <div
        className="mb-0.5 font-['Bebas_Neue',Impact,sans-serif] text-white text-2xl leading-none notranslate"
        translate="no"
      >
        {displayValue}
        {suffix}
      </div>
      <div className="font-mono text-[10px] text-white/30 uppercase tracking-[0.2em]">
        {label}
      </div>
    </motion.div>
  );
}

/* ── SECTION 1: MAIN HERO CONTENT ── */
function HeroContent() {
  const { t, isAr } = useT();

  const cyclingWords = isAr
    ? ["البراندينج", "الإعلانات", "المحتوى", "النمو", "الفيديو"]
    : ["BRANDING", "ADS", "CONTENT", "GROWTH", "VIDEO"];

  const sideLeftWords = isAr
    ? ["إبداع", "ابتكار", "تصميم", "استراتيجية"]
    : ["CREATIVE", "INNOVATION", "DESIGN", "STRATEGY"];
  const sideRightWords = isAr
    ? ["نمو", "نتائج", "تأثير", "قيادة"]
    : ["GROWTH", "RESULTS", "IMPACT", "LEADERSHIP"];
  const scrollLabel = isAr ? "تصفح" : "SCROLL";

  const subBefore = isAr
    ? "وكالة شابة مهووسة بالنتائج، تحول البراندات لقادة سوق من خلال "
    : "A young, results-obsessed agency turning brands into market leaders through ";
  const subAfter = isAr
    ? " — في السعودية ومصر."
    : " — across Saudi Arabia & Egypt.";

  return (
    <div
      className="relative flex flex-col justify-center items-center bg-[#080C14] px-6 pt-20 pb-24 w-full min-h-screen overflow-hidden text-center"
      dir={isAr ? "rtl" : "ltr"}
    >
      <MagneticBlob />
      <ParticleField />
      <FloatingOrbs />

      <motion.div
        className="z-[1] absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          backgroundImage: `linear-gradient(rgba(141, 154, 176,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(141, 154, 176,0.05) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 0.6, 0.6, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut",
        }}
        className="top-0 right-0 left-0 z-[1] absolute h-[1px] origin-left pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, #8D9AB0, transparent)",
        }}
      />

      <SideRibbon side="left" words={sideLeftWords} />
      <SideRibbon side="right" words={sideRightWords} />

      <div className="z-10 relative flex flex-col justify-center items-center mx-auto w-full max-w-[950px] text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="inline-flex items-center gap-2.5 bg-[#8D9AB0]/10 backdrop-blur-sm mb-6 px-6 py-2.5 border border-[#8D9AB0]/30 rounded-full select-none"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Zap
              size={13}
              className="fill-[#8D9AB0] font-bold text-[#8D9AB0]"
            />
          </motion.div>
          <span className="font-mono font-semibold text-[11px] text-white/90 uppercase tracking-[0.28em]">
            {t.hero.badge}
          </span>
          <motion.div
            animate={{ scale: [1, 1.6, 1], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-emerald-400 rounded-full w-1.5 h-1.5"
          />
        </motion.div>

        {/* Headlines */}
        <div className="mb-6 overflow-hidden">
          {[
            { text: t.hero.headline1, isBlue: false },
            { text: t.hero.headline2, isBlue: true },
          ].map((line, i) => (
            <motion.div
              key={i}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.85,
                delay: 0.25 + i * 0.12,
                ease: EASE,
              }}
              className={`block tracking-[-0.01em] text-[clamp(4rem,12vw,10rem)] ${line.isBlue ? "text-[#8D9AB0]" : "text-[#EFF4FF]"}`}
              style={{
                fontFamily: isAr
                  ? "'Cairo', 'Tajawal', Tahoma, 'Segoe UI', Arial, sans-serif"
                  : "'Bebas Neue', Impact, sans-serif",
                lineHeight: isAr ? 1.15 : 0.92,
                ...(line.isBlue
                  ? {
                      textShadow:
                        "0 0 60px rgba(141, 154, 176,0.5), 0 0 120px rgba(141, 154, 176,0.2)",
                    }
                  : {}),
              }}
            >
              {line.text}
            </motion.div>
          ))}
        </div>

        {/* Sub copy */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mx-auto mb-10 max-w-[700px] font-mono text-[clamp(0.85rem,2vw,1rem)] text-white/40 leading-relaxed"
        >
          {subBefore}
          <WordCycler words={cyclingWords} />
          {subAfter}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="flex flex-wrap justify-center items-center gap-4"
        >
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="relative flex items-center gap-2.5 bg-[#8D9AB0] shadow-[#8D9AB0]/30 shadow-lg px-9 py-4 border-0 rounded-xl overflow-hidden font-bold text-white text-sm tracking-wide cursor-pointer"
            >
              <motion.span
                animate={{ x: ["-120%", "120%"] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
              />
              {t.hero.cta}
              <ArrowRight
                size={14}
                style={{ transform: isAr ? "scaleX(-1)" : "none" }}
              />
            </motion.button>
          </Link>

          <Link href="/services">
            <motion.button
              whileHover={{
                scale: 1.04,
                backgroundColor: "rgba(255,255,255,0.08)",
                borderColor: "rgba(141, 154, 176,0.4)",
              }}
              whileTap={{ scale: 0.96 }}
              className="bg-white/5 backdrop-blur-sm px-8 py-4 border border-white/15 rounded-xl font-medium text-white/70 text-sm transition-all cursor-pointer"
            >
              {t.hero.explore}
            </motion.button>
          </Link>
        </motion.div>

        {/* Stat pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-14 mb-4">
          <StatPill
            targetNumber={60}
            suffix="+"
            label={t.hero.stats.clients}
            delay={1.1}
          />
          <StatPill
            targetNumber={10000000}
            suffix="+"
            label={t.hero.stats.views}
            delay={1.2}
          />
          <StatPill targetNumber={2} label={t.hero.stats.markets} delay={1.3} />
          <StatPill
            targetNumber={7}
            suffix="★"
            label={t.hero.stats.services}
            delay={1.4}
          />
        </div>
      </div>

      <ScrollIndicator label={scrollLabel} />
    </div>
  );
}

/* ── SECTION 2: CAPABILITIES SHOWCASE ── */
function CapabilitiesSection() {
  const { t, isAr } = useT();

  const capabilities = isAr
    ? [
        {
          num: "01",
          title: "هوية البراند",
          tag: "براندينج",
          desc: "براندات مصممة لتُذكر. نصنع هويات بصرية تجعل براندك واضحاً ومتسقاً وسهل التعرف عليه فوراً.",
          tags: ["تصميم الشعار", "نظام بصري", "إرشادات البراند"],
        },
        {
          num: "02",
          title: "إعلانات الأداء",
          tag: "نمو",
          desc: "حملات مصممة لنمو حقيقي. نطلق إعلانات مبنية على الأداء تركز على العملاء المحتملين والمبيعات والنتائج القابلة للقياس.",
          tags: ["إعلانات ميتا", "إعلانات جوجل", "إعلانات تيك توك"],
        },
        {
          num: "03",
          title: "إنشاء المحتوى",
          tag: "فيديو وميديا",
          desc: "محتوى يحول الانتباه إلى فعل. ننشئ محتوى يوقف السكرول ويتواصل مع جمهورك ويحفز النية.",
          tags: ["ريلز", "كتابة محتوى", "محتوى سوشيال"],
        },
      ]
    : [
        {
          num: "01",
          title: "BRAND IDENTITY",
          tag: "BRANDING",
          desc: "Brands built to be remembered. We create visual identities that make your brand clear, consistent, and instantly recognizable.",
          tags: ["Logo Design", "Visual System", "Brand Guidelines"],
        },
        {
          num: "02",
          title: "PERFORMANCE ADS",
          tag: "GROWTH",
          desc: "Campaigns built for real growth. We launch performance-driven ads focused on leads, sales, and measurable results.",
          tags: ["Meta Ads", "Google Ads", "TikTok Ads"],
        },
        {
          num: "03",
          title: "CONTENT CREATION",
          tag: "VIDEO & MEDIA",
          desc: "Content that turns attention into action. We create scroll-stopping content that connects with your audience and drives intent.",
          tags: ["Reels", "Copywriting", "Social Content"],
        },
      ];

  const exploreLabel = isAr ? "استكشف" : "EXPLORE";

  return (
    <div
      className="relative flex flex-col justify-center bg-[#0C101A] px-6 py-16 lg:py-24 border-white/5 border-t w-full min-h-fit lg:min-h-screen overflow-hidden text-white"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(141,154,176,0.03),transparent_50%)] pointer-events-none" />

      <div className="z-10 relative mx-auto w-full max-w-7xl">
        <div className="flex md:flex-row flex-col justify-between md:items-end gap-8 mb-16 lg:mb-20">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#8D9AB0]/10 backdrop-blur-sm mb-4 px-4 py-1.5 border border-[#8D9AB0]/20 rounded-full">
              <span className="bg-[#8D9AB0] rounded-full w-1.5 h-1.5 animate-pulse" />
              <span className="font-mono font-semibold text-[#8D9AB0] text-[10px] uppercase tracking-[0.35em]">
                {t.hero.capBadge}
              </span>
            </div>

            <h2
              className="text-[clamp(2.5rem,7vw,5.5rem)] text-white tracking-wide"
              style={{
                fontFamily: isAr
                  ? "'Cairo', 'Tajawal', Tahoma, 'Segoe UI', Arial, sans-serif"
                  : "'Bebas Neue', Impact, sans-serif",
                lineHeight: isAr ? 1.2 : 0.95,
              }}
            >
              {t.hero.capTitle}{" "}
              <span
                className="bg-clip-text bg-gradient-to-r from-[#8D9AB0] to-[#A8B4C5] text-transparent"
                style={{ textShadow: "0 0 40px rgba(141, 154, 176,0.2)" }}
              >
                {t.hero.capTitleBlue}
              </span>
            </h2>
          </div>

          {/* ✅ FIX: text alignment respects RTL in Arabic */}
          <p
            className={`max-w-md font-mono text-white/40 text-xs md:text-sm ${isAr ? "text-right" : "text-left"} leading-relaxed`}
          >
            {t.hero.capCopy}
          </p>
        </div>

        <div className="gap-6 lg:gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 45, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{
                duration: 0.75,
                delay: idx * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -10,
                borderColor: "rgba(141, 154, 176,0.4)",
                boxShadow: "0 20px 40px rgba(141, 154, 176,0.05)",
              }}
              className="group relative flex flex-col justify-between bg-white/[0.01] backdrop-blur-md p-6 lg:p-8 border border-white/10 rounded-2xl min-h-[300px] lg:min-h-[340px] overflow-hidden transition-all duration-500 cursor-pointer"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(141,154,176,0.04),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="z-10 relative flex flex-col justify-between h-full">
                <div>
                  <div className="flex justify-between items-center mb-6 lg:mb-8">
                    <span className="font-mono text-white/20 group-hover:text-[#8D9AB0]/50 text-sm tracking-widest transition-colors duration-300">
                      {item.num}
                    </span>
                    <span className="bg-white/5 px-2.5 py-1 border border-white/10 group-hover:border-[#8D9AB0]/30 rounded-md font-mono text-[9px] text-white/60 group-hover:text-[#8D9AB0] tracking-wider transition-colors duration-300">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="mb-4 font-['Bebas_Neue',Impact,sans-serif] text-white group-hover:text-[#8D9AB0] text-2xl lg:text-3xl tracking-wide transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* ✅ FIX: card description alignment respects RTL in Arabic */}
                  <p
                    className={`font-sans font-light text-white/50 lg:text-[13px] text-xs ${isAr ? "text-right" : "text-left"} leading-relaxed tracking-wide`}
                  >
                    {item.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 border border-white/[0.08] group-hover:border-[#8D9AB0]/30 rounded-full font-mono text-[10px] text-white/35 group-hover:text-[#8D9AB0]/70 transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end items-center gap-2 opacity-40 group-hover:opacity-100 mt-5 pt-4 border-white/[0.04] border-t transition-opacity duration-300">
                  <span className="font-mono text-[10px] text-white/50 group-hover:text-white tracking-widest transition-colors">
                    {exploreLabel}
                  </span>
                  <ArrowRight
                    size={12}
                    className="text-[#8D9AB0] transition-transform group-hover:translate-x-1 transform"
                    style={{ transform: isAr ? "scaleX(-1)" : "none" }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── LAYERED PREMIUM CARD WRAPPER ── */
interface CardWrapperProps {
  children: React.ReactNode;
  index: number;
  totalCards: number;
  scrollYProgress: MotionValue<number>;
}

function LayeredCard({
  children,
  index,
  totalCards,
  scrollYProgress,
}: CardWrapperProps) {
  const isLast = index === totalCards - 1;
  const startRange = index / totalCards;
  const endRange = (index + 1) / totalCards;

  const scale = useTransform(
    scrollYProgress,
    [startRange, endRange],
    [1, 0.86],
  );
  const opacity = useTransform(
    scrollYProgress,
    [startRange, endRange - 0.05],
    [1, 0],
  );
  const blurValue = useTransform(
    scrollYProgress,
    [startRange, endRange],
    [0, 12],
  );
  const filter = useTransform(blurValue, (v) => `blur(${v}px)`);

  return (
    <div
      className="top-0 relative md:sticky w-full md:h-screen min-h-fit overflow-hidden md:overflow-hidden origin-center"
      style={{ zIndex: index }}
    >
      <motion.div
        className="w-full h-full will-change-transform"
        style={{
          scale: isLast ? 1 : scale,
          opacity: isLast ? 1 : opacity,
          filter: isLast ? "none" : filter,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ── MAIN EXPORT COMPONENT ── */
export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const sections = [
    <HeroContent key="hero" />,
    <CapabilitiesSection key="capabilities" />,
  ];

  return (
    <div
      ref={containerRef}
      style={{ height: "auto" }}
      className="block relative md:flex md:flex-col bg-[#080C14] w-full"
    >
      {sections.map((section, idx) => (
        <LayeredCard
          key={idx}
          index={idx}
          totalCards={sections.length}
          scrollYProgress={scrollYProgress}
        >
          {section}
        </LayeredCard>
      ))}
    </div>
  );
}
