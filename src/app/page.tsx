import HeroSection      from "@/components/sections/HeroSection";
import TrustBar         from "@/components/sections/TrustBar";
import MetricsSection   from "@/components/sections/MetricsSection";
import ServicesPreview  from "@/components/sections/ServicesPreview";
import CTASection       from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <MetricsSection />
      <ServicesPreview />
      <CTASection />
    </>
  );
}
