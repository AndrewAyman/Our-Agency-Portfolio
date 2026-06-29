import ContactSection from "@/components/sections/ContactSection";
import { Reveal } from "@/components/ui/Reveal";

export default function ContactPage() {
  return (
    <>
      <section className="relative pt-36 pb-8 text-center px-6 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(141,154,176,0.5) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div className="relative z-10">
          <Reveal>
            <span className="text-xs font-mono text-[#8D9AB0] tracking-[0.3em] uppercase mb-4 block">
              Work With Us
            </span>
            <h1 className="font-display text-[clamp(3rem,8vw,7rem)] leading-none gradient-text mb-4">
              CONTACT US
            </h1>
            <p className="text-white/40 max-w-lg mx-auto text-base">
              Have a project in mind? We respond within 24 hours. Let&apos;s talk about how we can grow your brand.
            </p>
          </Reveal>
        </div>
      </section>
      <ContactSection />
    </>
  );
}