import { AboutSection } from "@/presentation/components/index/AboutSection";
import { WhatIDoSection } from "@/presentation/components/index/WhatIDoSection";
import { FeaturedProjectsSection } from "@/presentation/components/index/FeaturedProjectsSection";
import { WhyWorkWithMeSection } from "@/presentation/components/index/WhyWorkWithMeSection";
import { TalksSection } from "@/presentation/components/index/TalksSection";
import { FabricaProgramadoresSection } from "@/presentation/components/index/FabricaProgramadoresSection";
import { PresentationsCarouselSection } from "@/presentation/components/index/PresentationsCarouselSection";
import { EdiAcademySection } from "@/presentation/components/index/EdiAcademySection";
import { ContactSection } from "@/presentation/components/index/ContactSection";
import { FooterSection } from "@/presentation/components/index/FooterSection";
import { HeroSection } from "@/presentation/components/index/HeroSection";
import { Navbar } from "@/presentation/components/index/Navbar";
import { LazySection } from "@/presentation/components/common/LazySection";
import { useEffect } from "react";
import { useI18n } from "@/presentation/utils/use-i18n";

export default function LandingPage() {
  const { language } = useI18n();

  // Función para scroll suave
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    const element = document.querySelector(href);
    if (element) {
      const offsetTop =
        element.getBoundingClientRect().top + window.pageYOffset - 80; // 80px para el navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  // Actualizar lang del HTML según el idioma del usuario
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-white text-slate-900 selection:bg-blue-100">
      {/* Skip to main content link */}
      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={(e) => {
          e.preventDefault();
          const element = document.getElementById("inicio");
          element?.focus();
          element?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        {language === "es"
          ? "Saltar al contenido principal"
          : "Skip to main content"}
      </a>

      {/* Navbar */}
      <Navbar onNavClick={handleNavClick} />

      <HeroSection />

      <LazySection rootMargin="200px">
        <AboutSection />
      </LazySection>

      <LazySection rootMargin="200px">
        <WhatIDoSection />
      </LazySection>

      <LazySection rootMargin="200px">
        <FeaturedProjectsSection />
      </LazySection>

      <LazySection rootMargin="200px">
        <WhyWorkWithMeSection />
      </LazySection>

      <LazySection rootMargin="200px">
        <TalksSection />
      </LazySection>

      <LazySection rootMargin="200px">
        <FabricaProgramadoresSection />
      </LazySection>

      <LazySection rootMargin="200px">
        <PresentationsCarouselSection />
      </LazySection>

      <LazySection rootMargin="200px">
        <EdiAcademySection />
      </LazySection>

      <LazySection rootMargin="200px">
        <ContactSection />
      </LazySection>

      <FooterSection />

      {/* Custom Animation Styles */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        /* Respetar preferencia de movimiento reducido */
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in-up {
            animation: none;
            opacity: 1;
          }
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        /* Estilos para skip link */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
        .sr-only:focus {
          position: fixed;
          width: auto;
          height: auto;
          padding: 0.5rem 1rem;
          margin: 0;
          overflow: visible;
          clip: auto;
          white-space: normal;
        }
      `}</style>
    </div>
  );
}
