"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FiInstagram, FiTarget, FiEdit3, FiLayers, FiVideo } from "react-icons/fi";
import { SERVICES } from "@/constants";

const EASE = [0.22, 1, 0.36, 1] as const;
const LETTER_EASE = [0.19, 1, 0.22, 1] as const;

const SERVICE_ICONS: Record<number, React.ElementType> = {
  1: FiInstagram,
  2: FiTarget,
  3: FiEdit3,
  4: FiLayers,
  5: FiVideo,
};

/* ── Service number ── */
function ServiceNumber({ num, isHovered }: { num: string; isHovered: boolean }) {
  return (
    <motion.div
      animate={{ color: isHovered ? "#007AFF" : "rgba(255,255,255,0.12)" }}
      className="absolute top-7 right-7 font-mono text-[11px] tracking-[0.15em]"
    >
      {num}
    </motion.div>
  );
}

/* ── Service card with sequential animation ── */
function ServiceCard({ 
  service, 
  index, 
  shouldAnimate, 
  delay 
}: { 
  service: (typeof SERVICES)[0]; 
  index: number; 
  shouldAnimate: boolean;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = SERVICE_ICONS[service.id] ?? FiInstagram;

  return (
    <motion.div
      initial={{ opacity: 0, y: 70, scale: 0.92, rotateX: 8 }}
      animate={shouldAnimate ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : { opacity: 0, y: 70, scale: 0.92, rotateX: 8 }}
      transition={{
        duration: 0.6,
        delay: shouldAnimate ? delay : 0,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8, scale: 1.01 }}
      className="relative rounded-[20px] p-8 cursor-pointer overflow-hidden h-full transition-[background,border-color,box-shadow] duration-300 backdrop-blur-xl bg-white/[0.02] border border-white/5"
      style={{
        background: hovered ? "rgba(255,255,255,0.055)" : "rgba(255,255,255,0.03)",
        border: hovered ? "1px solid rgba(0,122,255,0.35)" : "1px solid rgba(255,255,255,0.07)",
        boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(0,122,255,0.1)" : "none",
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 25% 25%, rgba(0,122,255,0.1) 0%, transparent 60%)" }}
          />
        )}
      </AnimatePresence>

      {/* Top shimmer on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute top-0 left-0 right-0 h-px origin-left"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(0,122,255,0.8), transparent)",
              borderRadius: "20px 20px 0 0",
            }}
          />
        )}
      </AnimatePresence>

      <ServiceNumber num={`0${index + 1}`} isHovered={hovered} />

      <div className="relative z-[1]">
        <motion.div
          animate={
            hovered
              ? { scale: 1.12, background: "rgba(0,122,255,0.15)", borderColor: "rgba(0,122,255,0.4)" }
              : { scale: 1, background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }
          }
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center mb-6"
          style={{ border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <motion.div
            animate={hovered ? { rotate: [0, -8, 8, 0], color: "#007AFF" } : { rotate: 0, color: "rgba(255,255,255,0.5)" }}
            transition={{ duration: 0.5 }}
          >
            <Icon size={22} />
          </motion.div>
        </motion.div>

        <div className="flex items-start justify-between mb-3">
          <motion.h3
            animate={{ color: hovered ? "white" : "rgba(255,255,255,0.88)" }}
            className="font-['Bebas_Neue',Impact,sans-serif] text-[1.45rem] leading-[1.1] m-0 pr-2.5 tracking-[0.03em]"
          >
            {service.title}
          </motion.h3>
          <motion.div
            animate={{ x: hovered ? 0 : -8, opacity: hovered ? 1 : 0, color: "#007AFF" }}
            transition={{ duration: 0.25 }}
            className="mt-1 shrink-0"
          >
            <ArrowRight size={15} />
          </motion.div>
        </div>

        <p className="text-[13px] text-white/40 leading-[1.75] mb-5">
          {service.desc}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {service.tags?.map((tag: string) => (
            <motion.span
              key={tag}
              animate={hovered ? { borderColor: "rgba(0,122,255,0.3)", color: "rgba(0,122,255,0.8)" } : {}}
              className="text-[10px] font-mono px-2.5 py-[3px] rounded-2xl text-white/35 transition-all duration-300"
              style={{ border: "1px solid rgba(255,255,255,0.09)" }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════ */
export default function ServicesSection() {
  const headRef = useRef(null);
  const sectionRef = useRef(null);
  
  const headInView = useInView(headRef, { once: false, margin: "-100px" });
  // Use sectionRef to detect when the entire section is in view
  const sectionInView = useInView(sectionRef, { once: false, margin: "-50px", amount: 0.2 });

  const [hasAnimated, setHasAnimated] = useState(false);

  // Reset animation when section goes out of view and comes back
  useEffect(() => {
    if (sectionInView) {
      // Small delay to ensure smooth animation
      const timer = setTimeout(() => {
        setHasAnimated(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setHasAnimated(false);
    }
  }, [sectionInView]);

  const headingText = "OUR SERVICES";
  const letters = Array.from(headingText);

  // تقسيم الخدمات: أول 3 كروت في الصف الأول، وآخر 2 في الصف الثاني
  const firstRowServices = SERVICES.slice(0, 3);
  const secondRowServices = SERVICES.slice(3, 5);

  // Delays for sequential animation
  // First row: card 1 (0s), card 2 (0.12s), card 3 (0.24s)
  const firstRowDelays = [0, 0.12, 0.24];
  // Second row: card 4 (0.45s after first row starts), card 5 (0.57s)
  const secondRowDelays = [0.45, 0.57];

  return (
    <section
      ref={sectionRef}
      aria-label="Services"
      className="relative py-28 px-6 overflow-hidden bg-[#080C14]"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* BG accent */}
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-0 right-0 w-[600px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,122,255,0.1) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-[1] max-w-[1280px] mx-auto">
        {/* Header */}
        <div ref={headRef} className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "0.25em" }}
            animate={headInView ? { opacity: 1, letterSpacing: "0.5em" } : { opacity: 0, letterSpacing: "0.25em" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="block text-[15px] font-mono text-[#007AFF] uppercase mb-5 font-bold"
          >
            What We Do
          </motion.span>
          
          <h2
            className="font-['Bebas_Neue',Impact,sans-serif] leading-none m-0 mb-5 flex justify-center flex-wrap select-none"
            style={{ fontSize: "clamp(2.8rem, 7.5vw, 6rem)" }}
          >
            {letters.map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: -70, filter: "blur(12px)" }}
                animate={headInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: -50, filter: "blur(8px)" }}
                transition={{
                  duration: headInView ? 1.3 : 0.6,
                  ease: LETTER_EASE,
                  delay: headInView ? index * 0.08 : 0,
                }}
                className="inline-block"
                style={{ 
                  whiteSpace: char === " " ? "pre" : "normal",
                  background: "linear-gradient(135deg, #ffffff 0%, #007AFF 60%, #3395FF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  display: "inline-block"
                }}
              >
                {char}
              </motion.span>
            ))}
          </h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={headInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.7, delay: headInView ? 1.2 : 0, ease: EASE }}
            className="text-white/35 text-[15px] max-w-[460px] mx-auto leading-[1.7]"
          >
            End-to-end creative solutions — from strategy to execution, built for real results.
          </motion.p>
        </div>

        {/* Cards grid - First Row: 3 cards */}
        <div className="grid gap-6 mb-6" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
          {firstRowServices.map((s, i) => (
            <ServiceCard 
              key={s.id} 
              service={s} 
              index={i} 
              shouldAnimate={hasAnimated}
              delay={firstRowDelays[i]}
            />
          ))}
        </div>

        {/* Cards grid - Second Row: 2 cards centered in the middle */}
        <div className="flex justify-center gap-6">
          {secondRowServices.map((s, i) => (
            <div key={s.id} className="flex-1 max-w-[calc(33.333%-0.75rem)]">
              <ServiceCard 
                service={s} 
                index={i + 3} 
                shouldAnimate={hasAnimated}
                delay={secondRowDelays[i]}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link href="/contact">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(0,122,255,0.4)" }}
              whileTap={{ scale: 0.96 }}
              className="relative inline-flex items-center gap-2.5 px-10 py-4 rounded-[14px] bg-[#007AFF] text-white font-semibold text-sm tracking-[0.04em] overflow-hidden cursor-pointer border-0"
            >
              <motion.span
                animate={{ x: ["-120%", "120%"] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }}
              />
              Let&apos;s Discuss Your Project
              <ArrowRight size={14} />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}