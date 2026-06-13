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
  animate,
  useInView,
} from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;
const CYCLING_WORDS = ["BRANDING", "ADS", "CONTENT", "GROWTH", "VIDEO"];

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
      className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-0"
      style={{
        background: "radial-gradient(circle, rgba(0,122,255,0.07) 0%, transparent 70%)",
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
            ctx.strokeStyle = `rgba(0, 122, 255, ${opacity})`;
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
        ctx.fillStyle = `rgba(0, 122, 255, ${Math.max(0.05, pulseOpacity)})`;
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}

/* ── FLOATING ORBS ── */
function FloatingOrbs() {
  const [isClient, setIsClient] = useState(false);
  const orbsRef = useRef<Array<{
    id: number;
    size: number;
    left: number;
    top: number;
    duration: number;
    delay: number;
    opacity: number;
  }>>([]);

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
            background: `radial-gradient(circle, rgba(0, 122, 255, ${orb.opacity}) 0%, transparent 70%)`,
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

/* ── WORD CYCLER ── */
function WordCycler() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % CYCLING_WORDS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.span 
      layout
      className="inline-flex relative overflow-hidden align-middle h-[1.3em] px-1 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={CYCLING_WORDS[index]}
          initial={{ y: "80%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-80%", opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="inline-block text-[#007AFF] font-bold whitespace-nowrap"
          style={{ textShadow: "0 0 40px rgba(0,122,255,0.6)", lineHeight: "1.2" }}
        >
          {CYCLING_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}

/* ── SCROLL INDICATOR ── */
function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
      className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-20 pointer-events-none"
    >
      <span className="text-[9px] tracking-[0.35em] text-white/20 uppercase font-mono select-none">
        SCROLL
      </span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="w-[1px] h-10 bg-gradient-to-b from-[#007AFF]/40 to-transparent"
      />
    </motion.div>
  );
}

/* ── SIDE RIBBONS ── */
function SideRibbon({ side }: { side: "left" | "right" }) {
  const words = side === "left" 
    ? ["CREATIVE", "INNOVATION", "DESIGN", "STRATEGY"]
    : ["GROWTH", "RESULTS", "IMPACT", "LEADERSHIP"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="absolute top-1/2 -translate-y-1/2 hidden lg:flex gap-12 pointer-events-none z-10 select-none"
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
          className="text-[9.5px] tracking-[0.42em] text-white/60 font-mono font-light whitespace-nowrap"
          style={{
            filter: "blur(0.5px)"
          }}
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
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, targetNumber, {
        duration: 2,
        delay: delay,
        ease: [0.16, 1, 0.3, 1],
      });
      return controls.stop;
    }
  }, [isInView, targetNumber, count, delay]);

  useEffect(() => {
    return rounded.on("change", (latest) => {
      if (latest >= 1000000) {
        setDisplayValue((latest / 1000000).toFixed(0) + "M");
      } else {
        setDisplayValue(latest.toLocaleString());
      }
    });
  }, [rounded]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: EASE }}
      whileHover={{ scale: 1.08, y: -3 }}
      className="px-5 py-2.5 rounded-full text-center cursor-default backdrop-blur-md bg-white/5 border border-white/10 min-w-[115px]"
    >
      <div className="font-['Bebas_Neue',Impact,sans-serif] text-2xl text-white leading-none mb-0.5">
        {displayValue}
        {suffix}
      </div>
      <div className="text-[10px] text-white/30 font-mono tracking-[0.2em] uppercase">
        {label}
      </div>
    </motion.div>
  );
}

/* ── SECTION 1: MAIN HERO CONTENT ── */
function HeroContent() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-[#080C14] text-center px-6 pb-24 pt-20 relative overflow-hidden">
      <MagneticBlob />
      <ParticleField />
      <FloatingOrbs />

      <motion.div
        className="absolute inset-0 pointer-events-none z-[1]"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,122,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,122,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 0.6, 0.6, 0] }}
        transition={{ duration: 5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
        className="absolute top-0 left-0 right-0 h-[1px] origin-left pointer-events-none z-[1]"
        style={{ background: "linear-gradient(90deg, transparent, #007AFF, transparent)" }}
      />

      <SideRibbon side="left" />
      <SideRibbon side="right" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-[950px] mx-auto w-full">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="inline-flex items-center gap-2.5 mb-6 px-6 py-2.5 rounded-full backdrop-blur-sm bg-[#007AFF]/10 border border-[#007AFF]/30 select-none"
        >
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
            <Zap size={13} className="text-[#007AFF] fill-[#007AFF] font-bold" />
          </motion.div>
          <span className="text-[11px] font-mono text-white/90 tracking-[0.28em] uppercase font-semibold">
            KSA & EGYPT'S CREATIVE PARTNER
          </span>
          <motion.div
            animate={{ scale: [1, 1.6, 1], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-emerald-400"
          />
        </motion.div>

        <div className="mb-6 overflow-hidden">
          {[
            { text: "YOUR VISION,", isBlue: false },
            { text: "OUR MISSION", isBlue: true },
          ].map((line, i) => (
            <motion.div
              key={line.text}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.25 + i * 0.12, ease: EASE }}
              className={`block font-['Bebas_Neue',Impact,sans-serif] leading-[0.92] tracking-[-0.01em] text-[clamp(4rem,12vw,10rem)] ${
                line.isBlue ? "text-[#007AFF]" : "text-[#EFF4FF]"
              }`}
              style={line.isBlue ? { textShadow: "0 0 60px rgba(0,122,255,0.5), 0 0 120px rgba(0,122,255,0.2)" } : {}}
            >
              {line.text}
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-white/40 max-w-[700px] mx-auto mb-10 leading-relaxed font-mono text-[clamp(0.85rem,2vw,1rem)]"
        >
          A young, results-obsessed agency turning brands into market leaders through <WordCycler /> — across Saudi Arabia & Egypt.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="flex flex-wrap gap-4 items-center justify-center"
        >
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="relative flex items-center gap-2.5 px-9 py-4 rounded-xl bg-[#007AFF] text-white font-bold text-sm tracking-wide overflow-hidden cursor-pointer border-0 shadow-lg shadow-[#007AFF]/30"
            >
              <motion.span
                animate={{ x: ["-120%", "120%"] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />
              Start Your Project
              <ArrowRight size={14} />
            </motion.button>
          </Link>

          <Link href="/services">
            <motion.button
              whileHover={{ scale: 1.04, backgroundColor: "rgba(255,255,255,0.08)", borderColor: "rgba(0,122,255,0.4)" }}
              whileTap={{ scale: 0.96 }}
              className="px-8 py-4 rounded-xl text-white/70 text-sm font-medium cursor-pointer backdrop-blur-sm transition-all bg-white/5 border border-white/15"
            >
              Explore Services
            </motion.button>
          </Link>
        </motion.div>

        <div className="flex flex-wrap gap-3 justify-center mt-14 mb-4">
          <StatPill targetNumber={60} suffix="+" label="Clients" delay={1.1} />
          <StatPill targetNumber={10000000} suffix="+" label="Views Generated" delay={1.2} />
          <StatPill targetNumber={2} label="Markets" delay={1.3} />
          <StatPill targetNumber={5} suffix="★" label="Services" delay={1.4} />
        </div>
      </div>

      <ScrollIndicator />
    </div>
  );
}

/* ── SECTION 2: CAPABILITIES SHOWCASE ── */
function CapabilitiesSection() {
  const capabilities = [
    {
      num: "01",
      title: "CRAFTING IDENTITIES",
      tag: "BRANDING",
      desc: "We build visual identities that stick. Far beyond mere logos, we create holistic design systems that echo your story and establish authority within your market segment."
    },
    {
      num: "02",
      title: "PERFORMANCE ADS",
      tag: "GROWTH",
      desc: "Data-backed and psychology-driven performance campaigns. We don't chase vanity metrics or simple impressions; we relentlessly focus on ROI and breaking conversion limits."
    },
    {
      num: "03",
      title: "ATTENTION-GRABBING CONTENT",
      tag: "VIDEO & MEDIA",
      desc: "In an era of hyper-fast scrolling, we produce genuine scroll-stoppers. Seamlessly fusing premium artistry with business strategy to translate views directly into buying intent."
    }
  ];

  return (
    // تم استبدال min-h-screen بـ min-h-fit وإضافة py-16 للـ responsive الكامل لمنع قطع الكروت بالأسفل
    <div className="w-full min-h-fit lg:min-h-screen flex flex-col justify-center bg-[#0C101A] text-white px-6 relative overflow-hidden py-16 lg:py-24 border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,122,255,0.03),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-20 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full backdrop-blur-sm bg-[#007AFF]/10 border border-[#007AFF]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#007AFF] animate-pulse" />
              <span className="text-[10px] font-mono text-[#007AFF] tracking-[0.35em] uppercase font-semibold">
                OUR CAPABILITIES
              </span>
            </div>
            
            <h2 className="font-['Bebas_Neue',Impact,sans-serif] text-[clamp(2.5rem,7vw,5.5rem)] text-white leading-[0.95] tracking-wide">
              ENGINEERED FOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007AFF] to-[#3395FF]" style={{ textShadow: "0 0 40px rgba(0,122,255,0.2)" }}>IMPACT</span>
            </h2>
          </div>
          
          <p className="text-white/40 max-w-md font-mono text-xs md:text-sm leading-relaxed text-left">
            We don't do pre-packaged frameworks. We break down the absolute architecture of your current business models and reconstruct customized workflows that guarantee market dominance across KSA and Egypt.
          </p>
        </div>

        {/* تم تحديث الـ Grid ليكون متجاوباً تماماً (1 كارت في الموبايل، و3 في الشاشات الكبيرة) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {capabilities.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 45, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ 
                duration: 0.75, 
                delay: idx * 0.12, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              whileHover={{ 
                y: -10, 
                borderColor: "rgba(0,122,255,0.4)",
                boxShadow: "0 20px 40px rgba(0,122,255,0.05)"
              }}
              className="group relative p-6 lg:p-8 rounded-2xl bg-white/[0.01] border border-white/10 backdrop-blur-md transition-all duration-500 overflow-hidden cursor-pointer flex flex-col justify-between min-h-[300px] lg:min-h-[340px]"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top_right,rgba(0,122,255,0.04),transparent_60%)]" />

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6 lg:mb-8">
                    <span className="font-mono text-sm text-white/20 tracking-widest group-hover:text-[#007AFF]/50 transition-colors duration-300">{item.num}</span>
                    <span className="text-[9px] font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/60 tracking-wider group-hover:border-[#007AFF]/30 group-hover:text-[#007AFF] transition-colors duration-300">
                      {item.tag}
                    </span>
                  </div>
                  
                  <h3 className="font-['Bebas_Neue',Impact,sans-serif] text-2xl lg:text-3xl text-white tracking-wide mb-4 group-hover:text-[#007AFF] transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-white/50 text-xs lg:text-[13px] leading-relaxed font-sans font-light tracking-wide text-left">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 lg:mt-8 pt-4 border-t border-white/[0.04] flex items-center justify-end gap-2 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] font-mono tracking-widest text-white/50 group-hover:text-white transition-colors">EXPLORE</span>
                  <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform text-[#007AFF]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── LAYERED PREMIUM CARD WRAPPER (تمت ترقيته ليدعم التجاوب وعدم قطع السكشن الثاني) ── */
interface CardWrapperProps {
  children: React.ReactNode;
  index: number;
  totalCards: number;
  scrollYProgress: MotionValue<number>;
}

function LayeredCard({ children, index, totalCards, scrollYProgress }: CardWrapperProps) {
  const isLast = index === totalCards - 1;

  const startRange = index / totalCards;
  const endRange = (index + 1) / totalCards;

  const scale = useTransform(scrollYProgress, [startRange, endRange], [1, 0.86]);
  const opacity = useTransform(scrollYProgress, [startRange, endRange - 0.05], [1, 0]);
  const blurValue = useTransform(scrollYProgress, [startRange, endRange], [0, 12]);
  const filter = useTransform(blurValue, (v) => `blur(${v}px)`);

  return (
    <div 
      // السر هنا: الـ Wrapper يتحول من وضع ثابت ومقيد في الشاشات الصغيرة (md) إلى وضع مرن يسمح بظهور الكروت كاملة
      className="relative md:sticky top-0 w-full min-h-fit md:h-screen overflow-hidden md:overflow-hidden origin-center"
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
      className="relative bg-[#080C14] w-full"
      // في الشاشات الكبيرة يمنح مساحة كافية للـ sticky scroll وفي شاشات الجوال يتكيف مرناً
      style={{ height: "auto" }}
      className="relative bg-[#080C14] w-full block md:flex md:flex-col"
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