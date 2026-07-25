import ServicesHero from "@/components/sections/ServicesHero";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ServicesProcess from "@/components/sections/ServicesProcess";
import PortfolioSection from "@/components/sections/PortfolioSection";
import CTASection from "@/components/sections/CTASection";

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesGrid />
      <ServicesProcess />
      <PortfolioSection />
      <CTASection />
    </>
  );
}
