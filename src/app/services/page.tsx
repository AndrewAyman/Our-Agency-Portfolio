import ServicesSection from "@/components/sections/ServicesSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import { Reveal } from "@/components/ui/Reveal";

export default function ServicesPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-36 pb-16 text-center px-6 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(0,122,255,0.5) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div className="relative z-10">
          <Reveal>
            <span className="text-xs font-mono text-[#007AFF] tracking-[0.3em] uppercase mb-4 block">
              What We Offer
            </span>
            <h1 className="font-display text-[clamp(3rem,8vw,7rem)] leading-none gradient-text mb-6">
              SERVICES &<br />CASE STUDIES
            </h1>
            <p className="text-white/40 max-w-xl mx-auto text-base leading-relaxed">
              Five core service pillars, each executed with precision, strategy, and creative firepower. 
              Backed by proven results in KSA & Egypt.
            </p>
          </Reveal>
        </div>
      </section>

      <ServicesSection />
      <PortfolioSection />
    </>
  );
}
