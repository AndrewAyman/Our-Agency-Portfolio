"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowRight,
  Check,
  Palette,
  PenTool,
  TrendingUp,
  Users,
  Video,
  Globe,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { useT } from "@/translations/useT";

const EASE = [0.22, 1, 0.36, 1] as const;
const LETTER_EASE = [0.19, 1, 0.22, 1] as const;

const ACCENT = "#8D9AB0";
const ACCENT_L = "#B0BDD0";

const ICON_MAP: Record<string, React.ElementType> = {
  video: Video,
  palette: Palette,
  "pen-tool": PenTool,
  "trending-up": TrendingUp,
  users: Users,
  globe: Globe,
  "file-text": FileText,
};

const ACCENT_CYCLE = [
  "#8D9AB0",
  "#A0AABC",
  "#9AA6B8",
  "#B8C4D0",
  "#8D9AB0",
  "#A0AABC",
];

type ServiceItem = {
  icon: string;
  title: string;
  desc: string;
  tags: string[];
  featured?: boolean;
};

/* ── Featured Card ── */
function FeaturedCard({
  service,
  shouldAnimate,
}: {
  service: ServiceItem;
  shouldAnimate: boolean;
}) {
  const { t } = useT();
  const Icon = ICON_MAP[service.icon] ?? Palette;
  const [hovered, setHovered] = useState(false);
  const swatches = [ACCENT, ACCENT_L, "#0A2540", "#F0F4FF"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.96 }}
      animate={shouldAnimate ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, ease: EASE }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative col-span-1 lg:col-span-12 rounded-[24px] overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: hovered
          ? `1px solid rgba(141,154,176,0.35)`
          : "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        transition: "border-color 0.4s, box-shadow 0.4s",
        boxShadow: hovered
          ? "0 24px 70px rgba(0,0,0,0.5), 0 0 50px rgba(141,154,176,0.1)"
          : "0 8px 32px rgba(0,0,0,0.3)",
      }}
    >
      <div
        className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: hovered ? 1 : 0.5,
          background:
            "radial-gradient(ellipse 50% 80% at 85% 50%, rgba(141,154,176,0.12) 0%, transparent 65%)",
        }}
      />

      <div className="z-[1] relative gap-8 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] p-6 sm:p-8 lg:p-14">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <motion.div
              animate={
                hovered
                  ? { scale: 1.1, rotate: [0, -6, 6, 0] }
                  : { scale: 1, rotate: 0 }
              }
              transition={{ duration: 0.5 }}
              className="flex justify-center items-center rounded-2xl w-12 sm:w-14 h-12 sm:h-14"
              style={{
                background: "rgba(141,154,176,0.1)",
                border: "1px solid rgba(141,154,176,0.3)",
              }}
            >
              <Icon size={22} color={ACCENT_L} />
            </motion.div>
            <span
              className="font-mono uppercase"
              style={{
                fontSize: 11,
                letterSpacing: "0.25em",
                color: "rgba(141,154,176,0.7)",
              }}
            >
              {t.servicesGrid.flagship}
            </span>
          </div>

          <h3
            style={{
              fontFamily: "var(--font-display,'Bebas Neue',Impact,sans-serif)",
              fontSize: "clamp(1.8rem,4.5vw,3.5rem)",
              lineHeight: 1.05,
              color: "white",
              margin: "0 0 14px",
            }}
          >
            {service.title}
          </h3>
          <p
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.85,
              marginBottom: 24,
            }}
          >
            {service.desc}
          </p>

          <div className="flex flex-col gap-2.5 mb-7">
            {service.tags.map((tag, i) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, x: -16 }}
                animate={shouldAnimate ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: EASE }}
                className="flex items-center gap-3"
              >
                <div
                  className="flex justify-center items-center rounded-full w-5 h-5 shrink-0"
                  style={{
                    background: "rgba(141,154,176,0.12)",
                    border: "1px solid rgba(141,154,176,0.3)",
                  }}
                >
                  <Check size={11} color={ACCENT_L} />
                </div>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>
                  {tag}
                </span>
              </motion.div>
            ))}
          </div>

          <Link href="/contact">
            <motion.button
              whileHover={{ x: 4 }}
              className="inline-flex items-center gap-2 font-medium"
              style={{
                fontSize: 13,
                color: ACCENT_L,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              {t.servicesGrid.startWith} <ArrowRight size={14} />
            </motion.button>
          </Link>
        </div>

        <div className="hidden sm:flex justify-center items-center min-h-[200px]">
          <motion.div
            animate={hovered ? { rotate: [0, 1, -1, 0] } : { rotate: 0 }}
            transition={{
              duration: 4,
              repeat: hovered ? Infinity : 0,
              ease: "easeInOut",
            }}
            className="relative p-5 rounded-2xl w-full max-w-[300px]"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="flex justify-center items-center rounded-xl w-9 h-9"
                style={{ background: ACCENT }}
              >
                <span
                  style={{
                    fontFamily:
                      "var(--font-display,'Bebas Neue',Impact,sans-serif)",
                    color: "#0D1117",
                    fontSize: 16,
                    fontWeight: 700,
                  }}
                >
                  O
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div
                  style={{
                    width: 80,
                    height: 7,
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.18)",
                  }}
                />
                <div
                  style={{
                    width: 55,
                    height: 5,
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.08)",
                  }}
                />
              </div>
            </div>
            <div className="flex gap-2 mb-5">
              {swatches.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={shouldAnimate ? { scale: 1 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 0.5 + i * 0.08,
                    ease: "backOut",
                  }}
                  whileHover={{ scale: 1.15, y: -4 }}
                  className="flex-1 rounded-xl"
                  style={{
                    height: 48,
                    background: c,
                    border:
                      c === "#F0F4FF"
                        ? "1px solid rgba(255,255,255,0.1)"
                        : "none",
                  }}
                />
              ))}
            </div>
            <div className="space-y-2">
              {[100, 75, 88].map((w, i) => (
                <div
                  key={i}
                  style={{
                    width: `${w}%`,
                    height: i === 0 ? 10 : 6,
                    borderRadius: 4,
                    background:
                      i === 0
                        ? "rgba(255,255,255,0.22)"
                        : "rgba(255,255,255,0.08)",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Compact Card ── */
function CompactCard({
  service,
  index,
  accent,
  shouldAnimate,
  delay,
}: {
  service: ServiceItem;
  index: number;
  accent: string;
  shouldAnimate: boolean;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = ICON_MAP[service.icon] ?? Globe;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6 }}
      className="relative p-5 sm:p-7 rounded-[20px] h-full overflow-hidden"
      style={{
        background: hovered
          ? "rgba(255,255,255,0.055)"
          : "rgba(255,255,255,0.03)",
        border: hovered
          ? `1px solid ${accent}55`
          : "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: hovered
          ? `0 20px 60px rgba(0,0,0,0.5), 0 0 36px ${accent}22`
          : "none",
        transition: "background 0.35s, border-color 0.35s, box-shadow 0.35s",
      }}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 25% 20%, ${accent}18 0%, transparent 60%)`,
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.4 }}
            className="top-0 right-0 left-0 absolute h-px origin-left"
            style={{
              background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
            }}
          />
        )}
      </AnimatePresence>

      <motion.div
        animate={{ color: hovered ? accent : "rgba(255,255,255,0.12)" }}
        className="top-5 right-5 absolute font-mono"
        style={{ fontSize: 11, letterSpacing: "0.15em" }}
      >
        0{index}
      </motion.div>

      <div className="z-[1] relative">
        <motion.div
          animate={
            hovered
              ? {
                  scale: 1.1,
                  background: `${accent}22`,
                  borderColor: `${accent}55`,
                }
              : {
                  scale: 1,
                  background: "rgba(255,255,255,0.05)",
                  borderColor: "rgba(255,255,255,0.1)",
                }
          }
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex justify-center items-center mb-4 sm:mb-5 rounded-[14px] w-11 sm:w-12 h-11 sm:h-12"
          style={{ border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <motion.div
            animate={hovered ? { rotate: [0, -8, 8, 0] } : { rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Icon
              size={18}
              color={hovered ? accent : "rgba(255,255,255,0.5)"}
            />
          </motion.div>
        </motion.div>

        <div className="flex justify-between items-start mb-2">
          <h3
            style={{
              fontFamily: "var(--font-display,'Bebas Neue',Impact,sans-serif)",
              fontSize: "1.2rem",
              lineHeight: 1.15,
              color: hovered ? "white" : "rgba(255,255,255,0.88)",
              margin: 0,
              paddingRight: 8,
              transition: "color 0.3s",
            }}
          >
            {service.title}
          </h3>
          <motion.div
            animate={{ x: hovered ? 0 : -8, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            className="mt-1 shrink-0"
          >
            <ArrowRight size={13} color={accent} />
          </motion.div>
        </div>

        <p
          style={{
            fontSize: 12.5,
            color: "rgba(255,255,255,0.4)",
            lineHeight: 1.75,
            marginBottom: 14,
          }}
        >
          {service.desc}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono"
              style={{
                fontSize: 10,
                padding: "3px 10px",
                borderRadius: 20,
                border: hovered
                  ? `1px solid ${accent}40`
                  : "1px solid rgba(255,255,255,0.09)",
                color: hovered ? accent : "rgba(255,255,255,0.35)",
                transition: "all 0.3s",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════ */
export default function ServicesGrid() {
  const { t, isAr } = useT();
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });
  const sectionInView = useInView(sectionRef, {
    once: true,
    margin: "-40px",
    amount: 0.05,
  });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (sectionInView && !hasAnimated) {
      const timer = setTimeout(() => setHasAnimated(true), 100);
      return () => clearTimeout(timer);
    }
  }, [sectionInView, hasAnimated]);

  const SERVICES = t.data.services as ServiceItem[];
  const featured = SERVICES.find((s) => s.featured) ?? SERVICES[0];
  const compact = SERVICES.filter((s) => !s.featured);

  const headingText = t.servicesGrid.title;
  const letters = Array.from(headingText);

  return (
    <section
      ref={sectionRef}
      aria-label="Services"
      className="relative px-4 sm:px-6 py-16 sm:py-24 overflow-hidden"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="top-0 left-1/2 absolute w-[500px] sm:w-[700px] h-[400px] -translate-x-1/2 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(141,154,176,0.06) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      <div
        className="z-[1] relative mx-auto max-w-[1280px]"
        dir={isAr ? "rtl" : "ltr"}
      >
        <div ref={headRef} className="mb-10 sm:mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.25em" }}
            animate={headInView ? { opacity: 1, letterSpacing: "0.5em" } : {}}
            transition={{ duration: 0.8, ease: EASE }}
            className="block mb-4 sm:mb-5 font-mono font-bold uppercase"
            style={{ fontSize: 12, color: ACCENT }}
          >
            {t.servicesGrid.badge}
          </motion.span>

          <h2
            className="flex flex-wrap justify-center m-0 mb-4 sm:mb-5 select-none"
            style={{
              fontFamily: isAr
                ? "'Cairo', 'Tajawal', Tahoma, 'Segoe UI', Arial, sans-serif"
                : "var(--font-display,'Bebas Neue',Impact,sans-serif)",
              fontSize: isAr
                ? "clamp(2rem,6vw,4.5rem)"
                : "clamp(2rem,6vw,5.5rem)",
              lineHeight: isAr ? 1.2 : 1,
              direction: isAr ? "rtl" : "ltr",
            }}
          >
            {isAr ? (
              <motion.span
                initial={{ opacity: 0, y: -60, filter: "blur(10px)" }}
                animate={
                  headInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
                }
                transition={{ duration: 1.2, ease: LETTER_EASE }}
                style={{
                  display: "inline-block",
                  background: `linear-gradient(135deg, #ffffff 0%, ${ACCENT} 60%, ${ACCENT_L} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {headingText}
              </motion.span>
            ) : (
              letters.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: -60, filter: "blur(10px)" }}
                  animate={
                    headInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
                  }
                  transition={{
                    duration: 1.2,
                    ease: LETTER_EASE,
                    delay: i * 0.045,
                  }}
                  style={{
                    display: "inline-block",
                    whiteSpace: char === " " ? "pre" : "normal",
                    background: `linear-gradient(135deg, #ffffff 0%, ${ACCENT} 60%, ${ACCENT_L} 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {char}
                </motion.span>
              ))
            )}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.9, ease: EASE }}
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.38)",
              maxWidth: 460,
              margin: "0 auto",
              lineHeight: 1.75,
            }}
          >
            {t.servicesGrid.sub}
          </motion.p>
        </div>

        <div className="gap-4 sm:gap-5 grid grid-cols-1 lg:grid-cols-12 mb-4 sm:mb-5">
          <FeaturedCard service={featured} shouldAnimate={hasAnimated} />
        </div>

        <div className="gap-4 sm:gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {compact.map((s, i) => (
            <CompactCard
              key={s.title}
              service={s}
              index={i + 1}
              accent={ACCENT_CYCLE[i % ACCENT_CYCLE.length]}
              shouldAnimate={hasAnimated}
              delay={0.15 + i * 0.1}
            />
          ))}
        </div>

        <div className="mt-10 sm:mt-14 text-center">
          <Link href="/contact">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
              whileHover={{
                scale: 1.05,
                boxShadow: `0 0 50px rgba(141,154,176,0.3)`,
              }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex relative justify-center items-center gap-2.5 px-7 sm:px-10 py-3.5 sm:py-4 border-0 rounded-[14px] w-full sm:w-auto overflow-hidden font-semibold text-[#0D1117] text-sm tracking-[0.04em] cursor-pointer"
              style={{ background: ACCENT }}
            >
              <motion.span
                animate={{ x: ["-120%", "120%"] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                }}
              />
              {t.servicesGrid.cta}
              <ArrowRight
                size={14}
                style={{ transform: isAr ? "scaleX(-1)" : "none" }}
              />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}
