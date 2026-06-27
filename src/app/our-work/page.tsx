import PortfolioSection from "@/components/sections/PortfolioSection";
import CTASection from "@/components/sections/CTASection";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = {
  title: "Our Work — OUR Agency",
  description:
    "Case studies and real results from our campaigns across KSA and Egypt.",
};

export default function OurWorkPage() {
  return (
    <>
      {/* Page Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          padding: "130px 1.5rem 60px",
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, #0d1a28 0%, #0D1117 55%, #0A0A0A 100%)",
        }}
      >
        {/* Grid bg */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(141,154,176,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(141,154,176,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "linear-gradient(to bottom, black 0%, transparent 80%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, transparent 80%)",
          }}
        />

        {/* Ambient orb */}
        <div
          style={{
            position: "absolute",
            top: "-5%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 550,
            height: 550,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(141,154,176,0.1) 0%, transparent 65%)",
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />

        <div className="z-[1] relative mx-auto max-w-[1280px] text-center">
          <Reveal>
            <div
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full"
              style={{
                background: "rgba(141,154,176,0.08)",
                border: "1px solid rgba(141,154,176,0.22)",
              }}
            >
              <span
                className="font-mono uppercase"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.25em",
                  color: "rgba(141,154,176,0.7)",
                }}
              >
                Portfolio &amp; Case Studies
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1
              className="m-0 mb-5 leading-none"
              style={{
                fontFamily:
                  "var(--font-display,'Bebas Neue',Impact,sans-serif)",
                fontSize: "clamp(3.5rem,10vw,8rem)",
                background:
                  "linear-gradient(135deg, #ffffff 0%, #8D9AB0 55%, #B0BDD0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              OUR WORK
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p
              style={{
                fontSize: "clamp(0.95rem,1.6vw,1.1rem)",
                color: "rgba(255,255,255,0.42)",
                maxWidth: 560,
                margin: "0 auto 48px",
                lineHeight: 1.8,
              }}
            >
              Real projects. Real results. From brand identities to performance
              campaigns — here&apos;s what we&apos;ve built across{" "}
              <span
                style={{ color: "rgba(255,255,255,0.78)", fontWeight: 500 }}
              >
                Saudi Arabia &amp; Egypt
              </span>
              .
            </p>
          </Reveal>

          {/* Quick stats */}
          <Reveal delay={0.3}>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { value: "1M+", label: "Impressions" },
                { value: "6+", label: "Sectors" },
                { value: "2", label: "Countries" },
                { value: "100%", label: "Commitment" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-5 py-3 rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <span
                    style={{
                      fontFamily:
                        "var(--font-display,'Bebas Neue',Impact,sans-serif)",
                      fontSize: "1.6rem",
                      background: "linear-gradient(135deg,#B0BDD0,#8D9AB0)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </span>
                  <span
                    className="font-mono uppercase"
                    style={{
                      fontSize: 10,
                      color: "rgba(255,255,255,0.32)",
                      letterSpacing: "0.15em",
                      lineHeight: 1.3,
                      maxWidth: 70,
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Portfolio with filter */}
      <PortfolioSection />

      {/* CTA */}
      <CTASection />
    </>
  );
}
