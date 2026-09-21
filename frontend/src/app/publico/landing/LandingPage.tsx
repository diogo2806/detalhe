import { BenefitsSection } from "./components/BenefitsSection";
import { BookingDemoSection } from "./components/BookingDemoSection";
import { FaqSection } from "./components/FaqSection";
import { GallerySection } from "./components/GallerySection";
import { HeroSection } from "./components/HeroSection";
import { LocationSection } from "./components/LocationSection";
import { PlanSection } from "./components/PlanSection";
import { ServicesSection } from "./components/ServicesSection";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

export function LandingPage() {
  return (
    <>
      <a className="skip-link" href="#conteudo-principal">
        Pular para o conteúdo principal
      </a>
      <SiteHeader />
      <main id="conteudo-principal">
        <HeroSection />
        <BookingDemoSection />
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
