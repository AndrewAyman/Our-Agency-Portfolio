"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FiInstagram, FiMail, FiPhone, FiArrowUp } from "react-icons/fi";
import { SiTiktok } from "react-icons/si";
import { FaWhatsapp } from "react-icons/fa";
import { NAV_LINKS } from "@/constants";

const EASE = [0.22, 1, 0.36, 1] as const;

const SOCIALS = [
  { Icon: FiInstagram, href: "https://www.instagram.com/our_agency5?igsh=MTBzaTMxNDU5MHMxOA%3D%3D&utm_source=qr", label: "Instagram", color: "#E1306C" },
  { Icon: SiTiktok, href: "https://www.tiktok.com/@our_agency2?_r=1&_t=ZS-976Xmp8ZXjY", label: "TikTok", color: "#ffffff" },
  { Icon: FaWhatsapp, href: "https://wa.me/201026081399", label: "WhatsApp", color: "#25D366" },
  { Icon: FiMail, href: "mailto:ouragency259@gmail.com", label: "Email", color: "#007AFF" },
];

const CONTACTS = [
  { flag: "🇪🇬", number: "+966 59 919 4160", href: "tel:+966599194160" },
  { flag: "🇪🇬", number: "+20 102 608 1399", href: "tel:+201026081399" },
];

/* ── Animated item that appears one by one ── */
function AnimatedItem({ children, delay, isInView }: { children: React.ReactNode; delay: number; isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 30, filter: "blur(4px)" }}
      transition={{
        duration: 0.6,
        delay: isInView ? delay : 0,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ── Social icon with original color always visible ── */
function SocialIcon({ Icon, href, label, color, isInView, delay }: { Icon: any; href: string; label: string; color: string; isInView: boolean; delay: number }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0, rotate: -180 }}
      transition={{
        duration: 0.5,
        delay: isInView ? delay : 0,
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      whileHover={{ scale: 1.15, y: -3, borderColor: color + "80" }}
      whileTap={{ scale: 0.92 }}
      className="w-[38px] h-[38px] rounded-[11px] flex items-center justify-center transition-all duration-300 no-underline"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.09)",
        color: color,
      }}
    >
      <Icon size={15} />
    </motion.a>
  );
}

/* ── Navigation link with slide animation ── */
function NavLinkItem({ href, label, index, isInView }: { href: string; label: string; index: number; isInView: boolean }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
      transition={{
        duration: 0.5,
        delay: isInView ? 0.25 + index * 0.07 : 0,
        ease: EASE,
      }}
      className="mb-3"
    >
      <Link
        href={href}
        className="text-sm text-white/45 no-underline inline-flex items-center gap-2 transition-colors duration-200 hover:text-white group"
      >
        <motion.span
          initial={{ opacity: 0, x: -8 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: isInView ? 0.3 + index * 0.07 : 0 }}
          className="text-[#007AFF] text-xs"
        >
          →
        </motion.span>
        {label}
      </Link>
    </motion.li>
  );
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Use once: false so animation repeats when scrolling up/down
  const isInView = useInView(footerRef, { once: false, margin: "-50px", amount: 0.15 });

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.08)",
        background: "#060A10",
      }}
    >
      {/* Ambient glow */}
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 9, repeat: Infinity }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(0,122,255,0.16) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Top shimmer line */}
      <motion.div
        animate={{ x: ["-120%", "120%"] }}
        transition={{ duration: 5, repeat: Infinity, repeatDelay: 4 }}
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,122,255,0.6), transparent)" }}
      />

      <div className="relative z-[1] max-w-[1280px] mx-auto px-6 sm:px-8 pt-16 sm:pt-20 pb-6 sm:pb-8">
        {/* Main grid - responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 mb-12 sm:mb-14">
          
          {/* Brand column */}
          <div>
            <AnimatedItem delay={0} isInView={isInView}>
              <Link href="/" className="inline-flex items-center gap-2.5 mb-5 no-underline">
                <span className="font-['Bebas_Neue',Impact,sans-serif] text-xl tracking-[0.1em] text-white">
                  OUR<span className="text-[#007AFF]">.</span>AGENCY
                </span>
              </Link>
            </AnimatedItem>

            <AnimatedItem delay={0.08} isInView={isInView}>
              <p className="text-[13px] text-white/30 leading-[1.75] max-w-[280px] mb-6">
                Your vision, our mission. A young, results-driven creative agency across KSA &amp; Egypt.
              </p>
            </AnimatedItem>

            <div className="flex gap-2.5 flex-wrap">
              {SOCIALS.map((social, idx) => (
                <SocialIcon
                  key={social.label}
                  Icon={social.Icon}
                  href={social.href}
                  label={social.label}
                  color={social.color}
                  isInView={isInView}
                  delay={0.15 + idx * 0.07}
                />
              ))}
            </div>
          </div>

          {/* Navigation column */}
          <div>
            <AnimatedItem delay={0.2} isInView={isInView}>
              <h3 className="text-[10px] font-mono text-white/25 tracking-[0.28em] uppercase mb-6">
                Navigation
              </h3>
            </AnimatedItem>
            <ul className="list-none p-0 m-0">
              {NAV_LINKS.map((link, i) => (
                <NavLinkItem
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  index={i}
                  isInView={isInView}
                />
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <AnimatedItem delay={0.35} isInView={isInView}>
              <h3 className="text-[10px] font-mono text-white/25 tracking-[0.28em] uppercase mb-6">
                Get In Touch
              </h3>
            </AnimatedItem>

            <div className="flex flex-col gap-3 mb-6">
              {CONTACTS.map((c, i) => (
                <AnimatedItem key={i} delay={0.4 + i * 0.08} isInView={isInView}>
                  <motion.a
                    href={c.href}
                    whileHover={{ color: "rgba(255,255,255,0.9)", x: 4 }}
                    className="text-[13px] text-white/45 no-underline flex items-center gap-2 transition-all duration-200"
                  >
                    <FiPhone size={12} className="text-[#007AFF] shrink-0" />
                    <span className="text-white/45">{c.flag}</span>
                    <span className="text-white/70">{c.number}</span>
                  </motion.a>
                </AnimatedItem>
              ))}

              <AnimatedItem delay={0.65} isInView={isInView}>
                <motion.a
                  href="mailto:ouragency259@gmail.com"
                  whileHover={{ x: 4 }}
                  className="text-[13px] text-[#007AFF] no-underline flex items-center gap-2 transition-all duration-200"
                >
                  <FiMail size={12} className="shrink-0" />
                  ouragency259@gmail.com
                </motion.a>
              </AnimatedItem>
            </div>

            <AnimatedItem delay={0.75} isInView={isInView}>
              <Link href="/contact">
                <motion.button
                  whileHover={{
                    scale: 1.04,
                    borderColor: "rgba(0,122,255,0.55)",
                    boxShadow: "0 0 24px rgba(0,122,255,0.2)",
                  }}
                  whileTap={{ scale: 0.96 }}
                  className="px-5 py-[11px] rounded-xl text-[13px] font-semibold text-white cursor-pointer tracking-[0.04em] transition-all duration-300 w-full sm:w-auto"
                  style={{
                    background: "rgba(0,122,255,0.1)",
                    border: "1px solid rgba(0,122,255,0.3)",
                  }}
                >
                  Start a Project →
                </motion.button>
              </Link>
            </AnimatedItem>
          </div>
        </div>

        {/* Bottom bar */}
        <AnimatedItem delay={0.85} isInView={isInView}>
          <motion.div
            className="pt-6 sm:pt-7 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p className="text-[10px] sm:text-[11px] text-white/20 font-mono m-0 tracking-[0.08em] text-center sm:text-left">
              © {new Date().getFullYear()} OUR Agency. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {["🇸🇦 KSA", "🇪🇬 EG"].map(market => (
                <span key={market} className="text-[10px] sm:text-[11px] text-white/[0.18] font-mono tracking-[0.1em]">
                  {market}
                </span>
              ))}
              <span className="text-[10px] sm:text-[11px] text-white/[0.15] font-mono tracking-[0.1em]">
                Your Vision, Our Mission.
              </span>
            </div>
          </motion.div>
        </AnimatedItem>
      </div>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-[#007AFF]/20 backdrop-blur-xl border border-[#007AFF]/40 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-[#007AFF]/40"
          >
            <FiArrowUp size={18} className="text-white" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}