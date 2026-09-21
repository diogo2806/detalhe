import { BenefitsSection } from "./BenefitsSection";
import { FaqSection } from "./FaqSection";
import { GallerySection } from "./GallerySection";
import { HeroSection } from "./HeroSection";
import { LocationSection } from "./LocationSection";
import { PlanSection } from "./PlanSection";
import { ServicesSection } from "./ServicesSection";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function LandingPage() {
  return (
    <>
      <a className="skip-link" href="#conteudo-principal">
        Pular para o conteúdo principal
      </a>
      <SiteHeader />
      <main id="conteudo-principal">
        <HeroSection />
        <BenefitsSection />
        <ServicesSection />
        <PlanSection />
        <GallerySection />
        <LocationSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  );
}
