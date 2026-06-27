"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, CheckCircle, AlertCircle } from "lucide-react";
import { FiInstagram } from "react-icons/fi";
import { SiTiktok } from "react-icons/si";
import { CONTACTS } from "@/constants";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/Reveal";

const card = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 16,
  padding: "1.5rem",
};

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: 12,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "white",
  fontSize: 14,
  outline: "none",
  transition: "border-color 0.3s",
  boxSizing: "border-box" as const,
};

const labelStyle = {
  fontSize: 11,
  fontFamily: "var(--font-mono,'JetBrains Mono',monospace)",
  color: "rgba(255,255,255,0.35)",
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
  display: "block",
  marginBottom: 8,
};

// ─────────────────────────────────────────────────────────────────
// HOW TO GET YOUR WEB3FORMS KEY (free, 2 minutes):
//  1. Go to  https://web3forms.com
//  2. Enter  andrewaymanstore@gmail.com
//  3. Click "Create Access Key"
//  4. Check your Gmail inbox → copy the key
//  5. Paste it below replacing  YOUR_ACCESS_KEY_HERE
// ─────────────────────────────────────────────────────────────────
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    service: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New Message — ${form.service || "General"} — ${form.name}`,
          from_name: "OUR Agency Website",
          name: form.name,
          email: form.email,
          service: form.service || "Not specified",
          message: form.message,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(
          "Something went wrong. Please try again or contact us directly.",
        );
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const socialIcons: Record<string, React.ReactNode> = {
    instagram: <FiInstagram size={14} />,
    tiktok: <SiTiktok size={14} />,
  };

  return (
    <section
      style={{
        position: "relative",
        padding: "5rem 1.5rem",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 700,
          height: 500,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse,rgba(0,122,255,0.1) 0%,transparent 70%)",
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          {/* ── Left — contact details ── */}
          <StaggerContainer
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {/* Phones */}
            <StaggerItem>
              <div style={card}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 18,
                  }}
                >
                  <Phone size={15} color="#8D9AB0" />
                  <span style={labelStyle}>Phone</span>
                </div>
                {CONTACTS.phones.map((p) => (
                  <div key={p.number} style={{ marginBottom: 14 }}>
                    <div
                      style={{
                        fontSize: 11,
                        color: "rgba(255,255,255,0.3)",
                        fontFamily:
                          "var(--font-mono,'JetBrains Mono',monospace)",
                        marginBottom: 3,
                      }}
                    >
                      {p.flag} {p.label}
                    </div>
                    <a
                      href={`tel:${p.number.replace(/\s/g, "")}`}
                      style={{
                        fontSize: 14,
                        color: "rgba(255,255,255,0.78)",
                        textDecoration: "none",
                      }}
                    >
                      {p.number}
                    </a>
                  </div>
                ))}
              </div>
            </StaggerItem>

            {/* Email */}
            <StaggerItem>
              <div style={card}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 14,
                  }}
                >
                  <Mail size={15} color="#8D9AB0" />
                  <span style={labelStyle}>Email</span>
                </div>
                <a
                  href={`mailto:${CONTACTS.email}`}
                  style={{
                    fontSize: 14,
                    color: "#8D9AB0",
                    textDecoration: "none",
                  }}
                >
                  {CONTACTS.email}
                </a>
              </div>
            </StaggerItem>

            {/* Socials */}
            <StaggerItem>
              <div style={card}>
                <div style={{ ...labelStyle, marginBottom: 16 }}>Follow Us</div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  {CONTACTS.socials.map((s) => (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      whileHover={{ scale: 1.02, x: 2 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "10px 14px",
                        borderRadius: 10,
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        textDecoration: "none",
                      }}
                    >
                      <span
                        style={{
                          color: "rgba(255,255,255,0.4)",
                          display: "flex",
                        }}
                      >
                        {socialIcons[s.icon] ?? <FiInstagram size={14} />}
                      </span>
                      <div>
                        <div
                          style={{
                            fontSize: 10,
                            color: "rgba(255,255,255,0.3)",
                            fontFamily:
                              "var(--font-mono,'JetBrains Mono',monospace)",
                          }}
                        >
                          {s.label}
                        </div>
                        <div
                          style={{
                            fontSize: 13,
                            color: "rgba(255,255,255,0.65)",
                          }}
                        >
                          {s.handle}
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* ── Right — Form ── */}
          <Reveal direction="left">
            <div style={{ ...card, padding: "2rem" }}>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: "center", padding: "3rem 1rem" }}
                >
                  <CheckCircle
                    size={52}
                    color="#8D9AB0"
                    style={{ margin: "0 auto 20px" }}
                  />
                  <h3
                    style={{
                      fontFamily:
                        "var(--font-display,'Bebas Neue',Impact,sans-serif)",
                      fontSize: "2rem",
                      color: "white",
                      marginBottom: 10,
                    }}
                  >
                    MESSAGE SENT!
                  </h3>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.45)",
                      fontSize: 14,
                      maxWidth: 260,
                      margin: "0 auto 24px",
                    }}
                  >
                    We&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        email: "",
                        message: "",
                        service: "",
                      });
                    }}
                    style={{
                      fontSize: 12,
                      color: "#8D9AB0",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "var(--font-mono,'JetBrains Mono',monospace)",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.1rem",
                  }}
                >
                  {/* Name + Email */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1rem",
                    }}
                  >
                    <div>
                      <label style={labelStyle}>Name *</label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        placeholder="Your full name"
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Email *</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        placeholder="hello@gmail.com"
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  {/* Service — with Other added */}
                  <div>
                    <label style={labelStyle}>Service Needed</label>
                    <select
                      value={form.service}
                      onChange={(e) =>
                        setForm({ ...form, service: e.target.value })
                      }
                      style={{ ...inputStyle, appearance: "none" as const }}
                    >
                      <option value="" style={{ background: "#1a1a1a" }}>
                        Select a service...
                      </option>
                      <option
                        value="branding"
                        style={{ background: "#1a1a1a" }}
                      >
                        Branding &amp; Visual Identity
                      </option>
                      <option value="ads" style={{ background: "#1a1a1a" }}>
                        Paid Ads &amp; Performance Marketing
                      </option>
                      <option value="content" style={{ background: "#1a1a1a" }}>
                        Content Creation &amp; Copywriting
                      </option>
                      <option value="smm" style={{ background: "#1a1a1a" }}>
                        Social Media Management
                      </option>
                      <option value="design" style={{ background: "#1a1a1a" }}>
                        Graphic Design &amp; Video Editing
                      </option>
                      <option value="full" style={{ background: "#1a1a1a" }}>
                        Full Package
                      </option>
                      <option value="other" style={{ background: "#1a1a1a" }}>
                        Other
                      </option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label style={labelStyle}>Message *</label>
                    <textarea
                      required
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      placeholder="Tell us about your project, goals, and timeline..."
                      rows={5}
                      style={{ ...inputStyle, resize: "none" }}
                    />
                  </div>

                  {/* Error */}
                  {error && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "10px 14px",
                        borderRadius: 10,
                        background: "rgba(239,68,68,0.08)",
                        border: "1px solid rgba(239,68,68,0.25)",
                      }}
                    >
                      <AlertCircle size={14} color="#EF4444" />
                      <span
                        style={{ fontSize: 13, color: "rgba(239,68,68,0.9)" }}
                      >
                        {error}
                      </span>
                    </div>
                  )}

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 0 40px rgba(0,122,255,0.4)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      padding: "14px 32px",
                      borderRadius: 14,
                      background: "#8D9AB0",
                      color: "white",
                      fontWeight: 500,
                      fontSize: 14,
                      border: "none",
                      cursor: loading ? "wait" : "pointer",
                      opacity: loading ? 0.7 : 1,
                    }}
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          style={{
                            width: 16,
                            height: 16,
                            border: "2px solid rgba(255,255,255,0.3)",
                            borderTop: "2px solid white",
                            borderRadius: "50%",
                          }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        {" "}
                        Send Message <Send size={14} />{" "}
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
