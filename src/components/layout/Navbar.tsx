"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "all 0.4s ease",
          ...(scrolled
            ? {
                background: "rgba(10,10,10,0.85)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
              }
            : {
                background: "transparent",
              }),
        }}
      >
        <nav
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 1.5rem",
            height: 68,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* ── Logo ── */}
          <Link
            href="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <motion.div
              whileHover={{ scale: 1.04 }}
              style={{ display: "flex", alignItems: "center", gap: 10 }}
            >
              {/* Real logo image */}
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.12)",
                  flexShrink: 0,
                  boxShadow: "0 0 16px rgba(0,122,255,0.3)",
                }}
              >
                <Image
                  src="/logo.png"
                  alt="OUR Agency Logo"
                  width={40}
                  height={40}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  priority
                />
              </div>
              {/* Wordmark */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: 1,
                }}
              >
                <span
                  style={{
                    fontFamily:
                      "var(--font-display,'Bebas Neue',Impact,sans-serif)",
                    fontSize: 20,
                    letterSpacing: "0.12em",
                    color: "white",
                  }}
                >
                  OUR<span style={{ color: "#8D9AB0" }}>.</span>AGENCY
                </span>
                <span
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.18em",
                    color: "rgba(255,255,255,0.28)",
                    fontFamily: "var(--font-mono,'JetBrains Mono',monospace)",
                    textTransform: "uppercase",
                  }}
                >
                  Marketing Agency
                </span>
              </div>
            </motion.div>
          </Link>

          {/* ── Desktop Nav ── */}
          <div
            style={{ display: "none", alignItems: "center", gap: 4 }}
            className="md-nav"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    position: "relative",
                    padding: "8px 16px",
                    borderRadius: 100,
                    cursor: "pointer",
                  }}
                >
                  {pathname === link.href && (
                    <motion.div
                      layoutId="nav-pill"
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: 100,
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.45,
                      }}
                    />
                  )}
                  <span
                    style={{
                      position: "relative",
                      zIndex: 1,
                      fontSize: 13,
                      fontWeight: 500,
                      color:
                        pathname === link.href
                          ? "white"
                          : "rgba(255,255,255,0.42)",
                      transition: "color 0.2s",
                    }}
                  >
                    {link.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* ── CTA ── */}
          <div className="md-cta" style={{ display: "none" }}>
            <Link href="/contact">
              <motion.button
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 0 28px rgba(0,122,255,0.5)",
                }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "10px 22px",
                  borderRadius: 12,
                  background: "#8D9AB0",
                  color: "white",
                  fontSize: 13,
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Start a Project
              </motion.button>
            </Link>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.7)",
              cursor: "pointer",
            }}
            className="mobile-only"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </motion.header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            style={{
              position: "fixed",
              top: 72,
              left: 16,
              right: 16,
              zIndex: 40,
            }}
          >
            <div
              style={{
                background: "rgba(12,12,18,0.97)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 18,
                padding: 12,
              }}
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.055 }}
                >
                  <Link
                    href={link.href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "12px 16px",
                      borderRadius: 12,
                      fontSize: 14,
                      fontWeight: 500,
                      textDecoration: "none",
                      transition: "all 0.2s",
                      background:
                        pathname === link.href
                          ? "rgba(0,122,255,0.12)"
                          : "transparent",
                      color:
                        pathname === link.href
                          ? "white"
                          : "rgba(255,255,255,0.5)",
                      border:
                        pathname === link.href
                          ? "1px solid rgba(0,122,255,0.25)"
                          : "1px solid transparent",
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div
                style={{
                  marginTop: 8,
                  paddingTop: 8,
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <Link href="/contact">
                  <button
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: 12,
                      background: "#8D9AB0",
                      color: "white",
                      fontSize: 14,
                      fontWeight: 600,
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Start a Project
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Responsive styles ── */}
      <style>{`
        @media (min-width: 768px) {
          .md-nav  { display: flex !important; }
          .md-cta  { display: block !important; }
          .mobile-only { display: none !important; }
        }
      `}</style>
    </>
  );
}
