"use client";

import { TextAnimate } from "@/components/ui/text-animate";
import { Badge } from "@/components/ui/badge";
import { useContext, memo } from "react";
import LayoutContext from "@presentation/layout/layout.context";

// Componente memoizado para el contenido de texto
const HeroTextContent = memo(() => (
  <>
    <TextAnimate
      animation="slideLeft"
      by="character"
      as={"h1"}
      className={`mx-auto mb-2 xs:mb-3 sm:mb-4 md:mb-6 pointer-events-none font-bold text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center text-white leading-tight drop-shadow-lg`}
      once={true}
    >
      Sobre mí
    </TextAnimate>
    <p
      className={`text-center mb-3 xs:mb-4 sm:mb-6 md:mb-8 text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed text-white/90 drop-shadow-md max-w-4xl mx-auto`}
    >
      Soy Edinson "Edi" Nuñez More, ingeniero informático y desarrollador
      frontend con más de 14 años de experiencia. Me apasiona crear interfaces
      inteligentes con IA y 3D, priorizando rendimiento, accesibilidad y
      experiencia de usuario.
    </p>
  </>
));

HeroTextContent.displayName = "HeroTextContent";

// Componente memoizado para los badges
const HeroBadges = memo(() => (
  <div className="flex flex-wrap gap-1 xs:gap-1.5 sm:gap-2 md:gap-3">
    <Badge
      variant="secondary"
      className="px-1.5 xs:px-2 sm:px-3 md:px-4 py-0.5 xs:py-1 sm:py-1.5 md:py-2 text-xs"
    >
      ⚛️ Frontend Expert
    </Badge>
    <Badge
      variant="secondary"
      className="px-1.5 xs:px-2 sm:px-3 md:px-4 py-0.5 xs:py-1 sm:py-1.5 md:py-2 text-xs"
    >
      🤖 IA & 3D
    </Badge>
    <Badge
      variant="secondary"
      className="px-1.5 xs:px-2 sm:px-3 md:px-4 py-0.5 xs:py-1 sm:py-1.5 md:py-2 text-xs"
    >
      🚀 14+ Años
    </Badge>
    <Badge
      variant="secondary"
      className="px-1.5 xs:px-2 sm:px-3 md:px-4 py-0.5 xs:py-1 sm:py-1.5 md:py-2 text-xs"
    >
      📚 Mentoría
    </Badge>
  </div>
));

HeroBadges.displayName = "HeroBadges";

export const HeroSection = memo(() => {
  const { isDark } = useContext(LayoutContext);

  return (
    <div className="px-2 xs:px-3 sm:px-4 md:px-6 lg:px-0 pt-4 xs:pt-6 sm:pt-8 md:pt-10 lg:pt-12 max-w-7xl mx-auto">
      {/* Hero con imágenes como fondo */}
      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-16">
        {/* Contenedor de imágenes */}
        <div className="flex flex-col md:flex-row h-[400px] md:h-[500px] lg:h-[600px]">
          {/* Primera imagen */}
          <div className="flex-1 relative overflow-hidden">
            <img
              src="/498677010_10236593310962824_8184856984527219057_n.jpg"
              alt="Edinson caminando en el parque - Vista panorámica"
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
          </div>

          {/* Segunda imagen */}
          <div className="flex-1 relative overflow-hidden">
            <img
              src="/499722212_10236608368059242_4576393573478119502_n.jpg"
              alt="Edinson bajo el puente - Perspectiva arquitectónica"
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>

        {/* Overlay con contenido de texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/40 flex items-center justify-center">
          <div className="text-center px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16">
            <HeroTextContent />
            <div className="mt-4 xs:mt-6 sm:mt-8">
              <HeroBadges />
            </div>
          </div>
        </div>

        {/* Elemento decorativo en la esquina */}
        <div className="absolute top-4 right-4 z-20">
          <div
            className={`w-3 h-3 rounded-full ${
              isDark ? "bg-blue-400" : "bg-blue-500"
            } animate-pulse`}
          ></div>
        </div>
      </div>
    </div>
  );
});

HeroSection.displayName = "HeroSection";
