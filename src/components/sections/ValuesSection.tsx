"use client";

import { motion } from "framer-motion";
import { TrendingUp, Eye, Zap, Shield, ArrowRight } from "lucide-react";
import { StaggerContainer, StaggerItem, Reveal } from "@/components/ui/Reveal";
import { useT } from "@/translations/useT";

const ACCENT = "#8D9AB0";
const ACCENT_L = "#B0BDD0";

const ICON_MAP: Record<string, React.ElementType> = {
  "trending-up": TrendingUp,
  eye: Eye,
  zap: Zap,
  shield: Shield,
};

const card = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 16,
  padding: "1.75rem",
  position: "relative" as const,
  overflow: "hidden",
  transition: "all 0.35s ease",
  height: "100%",
};

export default function ValuesSection() {
  const { t, isAr } = useT();

  const VALUES = t.data.values as Array<{
    icon: string;
    title: string;
    desc: string;
  }>;
  const WHY_US = t.data.whyUs as Array<{
    num: string;
    title: string;
    desc: string;
  }>;

  return (
    <section
      style={{
        position: "relative",
        padding: "5rem 1.5rem",
        overflow: "hidden",
      }}
      dir={isAr ? "rtl" : "ltr"}
    >
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: -160,
          width: 500,
          height: 500,
          pointerEvents: "none",
          background: `radial-gradient(circle,rgba(141,154,176,0.08) 0%,transparent 70%)`,
          filter: "blur(80px)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        <Reveal style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span
            style={{
              fontSize: 11,
              fontFamily: "var(--font-mono,'JetBrains Mono',monospace)",
              color: ACCENT,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: 12,
            }}
          >
            {t.values.badge}
          </span>
          <h2
            translate="no"
            style={{
              fontFamily: "var(--font-display,'Bebas Neue',Impact,sans-serif)",
              fontSize: "clamp(2.5rem,6vw,5rem)",
              lineHeight: 1,
              margin: 0,
              background: `linear-gradient(135deg,#fff 0%,${ACCENT} 55%,${ACCENT_L} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t.values.title}
          </h2>
        </Reveal>

        <StaggerContainer
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "1.25rem",
            marginBottom: "5rem",
          }}
        >
          {VALUES.map((val, i) => {
            const Icon = ICON_MAP[val.icon] ?? Zap;
            return (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="group"
                  style={card}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(141,154,176,0.1)",
                      opacity: 0,
                      transition: "opacity 0.4s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 14,
                      right: isAr ? undefined : 20,
                      left: isAr ? 20 : undefined,
                      fontFamily:
                        "var(--font-display,'Bebas Neue',Impact,sans-serif)",
                      fontSize: "4rem",
                      color: "rgba(255,255,255,0.03)",
                      lineHeight: 1,
                      userSelect: "none",
                    }}
                  >
                    {(i + 1).toString().padStart(2, "0")}
                  </div>

                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: "rgba(141,154,176,0.1)",
                        border: "1px solid rgba(141,154,176,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 18,
                      }}
                    >
                      <Icon size={20} color={ACCENT} />
                    </div>
                    <h3
                      style={{
                        fontFamily:
                          "var(--font-display,'Bebas Neue',Impact,sans-serif)",
                        fontSize: "1.6rem",
                        color: "white",
                        marginBottom: 10,
                      }}
                    >
                      {val.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 13,
                        color: "rgba(255,255,255,0.48)",
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {val.desc}
                    </p>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: "3rem",
          }}
        >
          <div
            style={{
              flex: 1,
              height: 1,
              background:
                "linear-gradient(to right,transparent,rgba(255,255,255,0.1),transparent)",
            }}
          />
          <span
            style={{
              fontSize: 11,
              fontFamily: "var(--font-mono,'JetBrains Mono',monospace)",
              color: ACCENT,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            {t.values.whyUs}
          </span>
          <div
            style={{
              flex: 1,
              height: 1,
              background:
                "linear-gradient(to right,transparent,rgba(255,255,255,0.1),transparent)",
            }}
          />
        </div>

        <StaggerContainer
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "1.25rem",
          }}
        >
          {WHY_US.map((item, i) => (
            <StaggerItem key={i}>
              <motion.div
                whileHover={{
                  x: isAr ? -4 : 4,
                  borderColor: "rgba(141,154,176,0.3)",
                }}
                style={{ ...card, transition: "all 0.3s ease" }}
              >
                <div style={{ display: "flex", gap: 20 }}>
                  <div
                    style={{
                      fontFamily:
                        "var(--font-display,'Bebas Neue',Impact,sans-serif)",
                      fontSize: "2.5rem",
                      color: "rgba(141,154,176,0.3)",
                      lineHeight: 1,
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    {item.num}
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: 15,
                        fontWeight: 500,
                        color: "white",
                        marginBottom: 8,
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 13,
                        color: "rgba(255,255,255,0.43)",
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0, x: isAr ? 6 : -6 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  style={{
                    position: "absolute",
                    bottom: 20,
                    right: isAr ? undefined : 20,
                    left: isAr ? 20 : undefined,
                  }}
                >
                  <ArrowRight
                    size={14}
                    color={ACCENT}
                    style={{ transform: isAr ? "scaleX(-1)" : "none" }}
                  />
                </motion.div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
