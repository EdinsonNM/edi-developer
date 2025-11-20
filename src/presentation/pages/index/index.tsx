import logo from "@/assets/images/logo.png";
import { Menu, Download } from "lucide-react";
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
import { useState, useEffect, useRef } from "react";

// Opciones del menú de navegación
const navigationItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Qué hago", href: "#que-hago" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Por qué trabajar conmigo", href: "#por-que-trabajar-conmigo" },
  { label: "Charlas", href: "#charlas" },
  { label: "Contacto", href: "#contacto" },
];

export default function LandingPage() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            <img src={logo} alt="Edi Developer" className="h-8" />
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
          <a
            href="/Resume English.pdf"
            download="Resume English.pdf"
            className="hidden md:flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Download CV</span>
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
                <span>Download CV</span>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* New Sections */}
      <AboutSection />
      <WhatIDoSection />
      <FeaturedProjectsSection />
      <WhyWorkWithMeSection />
      <TalksSection />
      <FabricaProgramadoresSection />
      <PresentationsCarouselSection />
      <ContactSection />
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
