import logo from "@/assets/images/logo.png";
import { Menu, Download, Globe } from "lucide-react";
import { AboutSection } from "@/presentation/components/index/AboutSection";
import { WhatIDoSection } from "@/presentation/components/index/WhatIDoSection";
import { FeaturedProjectsSection } from "@/presentation/components/index/FeaturedProjectsSection";
import { WhyWorkWithMeSection } from "@/presentation/components/index/WhyWorkWithMeSection";
import { TalksSection } from "@/presentation/components/index/TalksSection";
import { FabricaProgramadoresSection } from "@/presentation/components/index/FabricaProgramadoresSection";
import { PresentationsCarouselSection } from "@/presentation/components/index/PresentationsCarouselSection";
import { ContactSection } from "@/presentation/components/index/ContactSection";
import { FooterSection } from "@/presentation/components/index/FooterSection";
import { HeroSection } from "@/presentation/components/index/HeroSection";
import { LazySection } from "@/presentation/components/common/LazySection";
import { useState, useEffect, useRef, useMemo } from "react";
import { useI18n } from "@/presentation/utils/use-i18n";

export default function LandingPage() {
  const { t, language, setLanguage } = useI18n();
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  // Memoizar opciones del menú de navegación para evitar recrearlas en cada render
  const navigationItems = useMemo(
    () => [
      { label: t.inicio, href: "#inicio" },
      { label: t.sobreMi, href: "#sobre-mi" },
      { label: t.queHago, href: "#que-hago" },
      { label: t.proyectos, href: "#proyectos" },
      { label: t.porQueTrabajarConmigo, href: "#por-que-trabajar-conmigo" },
      { label: t.charlas, href: "#charlas" },
      { label: t.contacto, href: "#contacto" },
    ],
    [t]
  );

  // Manejar visibilidad del navbar al hacer scroll con optimización de rendimiento
  useEffect(() => {
    const handleScroll = () => {
      // Cancelar el frame anterior si existe
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }

      // Usar requestAnimationFrame para sincronizar con el ciclo de renderizado
      rafIdRef.current = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const lastScrollY = lastScrollYRef.current;

        // Solo actualizar estado si hay un cambio significativo
        if (currentScrollY < lastScrollY || currentScrollY < 100) {
          setIsNavbarVisible((prev) => (prev ? prev : true));
        } else {
          setIsNavbarVisible((prev) => (prev ? false : prev));
        }

        lastScrollYRef.current = currentScrollY;
        rafIdRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      // Limpiar el frame pendiente si existe
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []); // Sin dependencias - el listener se crea una sola vez

  // Función para scroll suave
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setIsLanguageMenuOpen(false);

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

  // Cerrar menú de idioma al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".language-selector")) {
        setIsLanguageMenuOpen(false);
      }
    };

    if (isLanguageMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLanguageMenuOpen]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-white text-slate-900 selection:bg-blue-100">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-sm bg-white/50 border-b border-slate-100 transition-transform duration-300 ${
          isNavbarVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center gap-2">
          <a
            href="#inicio"
            onClick={(e) => handleNavClick(e, "#inicio")}
            className="cursor-pointer"
          >
            <img
              src={logo}
              alt="Edi Developer"
              className="h-8"
              loading="eager"
              fetchPriority="high"
            />
          </a>
        </div>

        {/* Menú Desktop */}
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="hover:text-blue-600 transition-colors px-2 py-1 rounded-md hover:bg-slate-50"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="relative language-selector">
            <button
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors"
              aria-label="Select language"
            >
              <Globe className="h-4 w-4" />
              <span className="uppercase">{language}</span>
            </button>
            {isLanguageMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
                <button
                  onClick={() => {
                    setLanguage("es");
                    setIsLanguageMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${
                    language === "es" ? "bg-blue-50 text-blue-600" : ""
                  }`}
                >
                  Español
                </button>
                <button
                  onClick={() => {
                    setLanguage("en");
                    setIsLanguageMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${
                    language === "en" ? "bg-blue-50 text-blue-600" : ""
                  }`}
                >
                  English
                </button>
              </div>
            )}
          </div>
          <a
            href="/Resume English.pdf"
            download="Resume English.pdf"
            className="hidden md:flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>{t.downloadCV}</span>
          </a>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-slate-600 hover:text-blue-600 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Menú Mobile */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-lg lg:hidden">
            <div className="flex flex-col px-6 py-4 gap-2">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-slate-600 hover:text-blue-600 transition-colors px-4 py-2 rounded-md hover:bg-slate-50"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/Resume English.pdf"
                download="Resume English.pdf"
                className="flex items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors mt-2"
              >
                <Download className="h-4 w-4" />
                <span>{t.downloadCV}</span>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Crítico, carga inmediatamente */}
      <HeroSection />

      {/* Secciones con lazy loading - Carga cuando están cerca del viewport */}
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
      `}</style>
    </div>
  );
}
