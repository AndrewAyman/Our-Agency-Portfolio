"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, CheckCircle } from "lucide-react";
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

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "", service: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const socialIcons: Record<string, React.ReactNode> = {
    instagram: <FiInstagram size={14} />,
    tiktok: <SiTiktok size={14} />,
  };

  return (
    <section style={{ position: "relative", padding: "5rem 1.5rem", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 500, pointerEvents: "none", background: "radial-gradient(ellipse,rgba(0,122,255,0.1) 0%,transparent 70%)", filter: "blur(80px)" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span style={{ fontSize: 11, fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", color: "#007AFF", letterSpacing: "0.3em", textTransform: "uppercase", display: "block", marginBottom: 12 }}>Get In Touch</span>
          <h2 style={{ fontFamily: "var(--font-display,'Bebas Neue',Impact,sans-serif)", fontSize: "clamp(2.5rem,6vw,5rem)", lineHeight: 1, margin: "0 0 16px", background: "linear-gradient(135deg,#fff 0%,#007AFF 50%,#3395FF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            LET&apos;S BUILD SOMETHING
          </h2>
          <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 15, maxWidth: 440, margin: "0 auto" }}>
            Ready to grow? We respond within 24 hours.
          </p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "2rem", alignItems: "start" }}>

          {/* Left — contact details */}
          <StaggerContainer style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

            {/* Phones */}
            <StaggerItem>
              <div style={card}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
                  <Phone size={15} color="#007AFF" />
                  <span style={{ fontSize: 11, fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", color: "rgba(255,255,255,0.35)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Phone</span>
                </div>
                {CONTACTS.phones.map((p) => (
                  <div key={p.number} style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", marginBottom: 3 }}>{p.flag} {p.label}</div>
                    <a href={`tel:${p.number.replace(/\s/g,"")}`} style={{ fontSize: 14, color: "rgba(255,255,255,0.78)", textDecoration: "none" }}>{p.number}</a>
                  </div>
                ))}
              </div>
            </StaggerItem>

            {/* Email */}
            <StaggerItem>
              <div style={card}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <Mail size={15} color="#007AFF" />
                  <span style={{ fontSize: 11, fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", color: "rgba(255,255,255,0.35)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Email</span>
                </div>
                <a href={`mailto:${CONTACTS.email}`} style={{ fontSize: 14, color: "#007AFF", textDecoration: "none" }}>{CONTACTS.email}</a>
              </div>
            </StaggerItem>

            {/* Socials */}
            <StaggerItem>
              <div style={card}>
                <div style={{ fontSize: 11, fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", color: "rgba(255,255,255,0.35)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>Follow Us</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {CONTACTS.socials.map((s) => (
                    <motion.a key={s.label} href={s.href} target="_blank" whileHover={{ scale: 1.02, x: 2 }}
                      style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", textDecoration: "none" }}>
                      <span style={{ color: "rgba(255,255,255,0.4)", display: "flex" }}>
                        {socialIcons[s.icon] ?? <FiInstagram size={14} />}
                      </span>
                      <div>
                        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono,'JetBrains Mono',monospace)" }}>{s.label}</div>
                        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>{s.handle}</div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* Right — Form */}
          <Reveal direction="left">
            <div style={{ ...card, padding: "2rem" }}>
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "3rem 1rem" }}>
                  <CheckCircle size={52} color="#007AFF" style={{ margin: "0 auto 20px" }} />
                  <h3 style={{ fontFamily: "var(--font-display,'Bebas Neue',Impact,sans-serif)", fontSize: "2rem", color: "white", marginBottom: 10 }}>MESSAGE SENT!</h3>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, maxWidth: 260, margin: "0 auto 24px" }}>
                    We&apos;ll get back to you within 24 hours.
                  </p>
                  <button onClick={() => setSubmitted(false)} style={{ fontSize: 12, color: "#007AFF", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Send another message</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={{ fontSize: 11, fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", color: "rgba(255,255,255,0.35)", letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Name *</label>
                      <input required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Your full name" style={inputStyle} />
                    </div>
                    <div>
                      <label style={{ fontSize: 11, fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", color: "rgba(255,255,255,0.35)", letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Email *</label>
                      <input required type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder="hello@company.com" style={inputStyle} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", color: "rgba(255,255,255,0.35)", letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Company</label>
                    <input value={form.company} onChange={(e) => setForm({...form, company: e.target.value})} placeholder="Your company name" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", color: "rgba(255,255,255,0.35)", letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Service Needed</label>
                    <select value={form.service} onChange={(e) => setForm({...form, service: e.target.value})} style={{ ...inputStyle, appearance: "none" as const }}>
                      <option value="" style={{ background: "#1a1a1a" }}>Select a service...</option>
                      <option value="branding" style={{ background: "#1a1a1a" }}>Branding &amp; Visual Identity</option>
                      <option value="ads" style={{ background: "#1a1a1a" }}>Paid Ads &amp; Performance Marketing</option>
                      <option value="content" style={{ background: "#1a1a1a" }}>Content Creation &amp; Copywriting</option>
                      <option value="smm" style={{ background: "#1a1a1a" }}>Social Media Management</option>
                      <option value="design" style={{ background: "#1a1a1a" }}>Graphic Design &amp; Video Editing</option>
                      <option value="full" style={{ background: "#1a1a1a" }}>Full Package</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", color: "rgba(255,255,255,0.35)", letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Message *</label>
                    <textarea required value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} placeholder="Tell us about your project, goals, and timeline..." rows={5} style={{ ...inputStyle, resize: "none" }} />
                  </div>
                  <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(0,122,255,0.4)" }} whileTap={{ scale: 0.98 }}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "14px 32px", borderRadius: 14, background: "#007AFF", color: "white", fontWeight: 500, fontSize: 14, border: "none", cursor: loading ? "wait" : "pointer", opacity: loading ? 0.7 : 1 }}>
                    {loading
                      ? <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid white", borderRadius: "50%" }} /> Sending...</>
                      : <>Send Message <Send size={14} /></>}
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
