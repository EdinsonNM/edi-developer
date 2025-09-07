"use client";

import { TextAnimate } from "@/components/ui/text-animate";
import { Badge } from "@/components/ui/badge";
import { useContext, memo } from "react";
import LayoutContext from "@presentation/layout/layout.context";
import Cube3D from "@/components/ui/cube-3d";

// Componente memoizado para el contenido de texto
const HeroTextContent = memo(({ isDark }: { isDark: boolean | undefined }) => (
  <>
    <TextAnimate
      animation="slideLeft"
      by="character"
      as={"h1"}
      className={`mx-auto mb-2 xs:mb-3 sm:mb-4 md:mb-6 pointer-events-none font-bold text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center lg:text-start text-[#2b59c3] leading-tight`}
      once={true}
    >
      Sobre mí
    </TextAnimate>
    <p
      className={`text-start mb-3 xs:mb-4 sm:mb-6 md:mb-8 text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed ${
        isDark ? "text-white/90" : "text-slate-600"
      }`}
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
    <div className="px-2 xs:px-3 sm:px-4 md:px-6 lg:px-0 pt-12 xs:pt-16 sm:pt-20 md:pt-24 lg:pt-28 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 xs:gap-4 sm:gap-6 md:gap-8 items-center mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-16">
        {/* Text content - First on mobile */}
        <div className="col-span-1 lg:col-span-6 order-1 lg:order-1">
          <HeroTextContent isDark={isDark} />
          <HeroBadges />
        </div>
        {/* Cubo 3D - Second on mobile */}
        <div className="col-span-1 lg:col-span-6 flex justify-center order-2 lg:order-2">
          <div className="relative">
            <div className="absolute -inset-0.5 xs:-inset-1 sm:-inset-2 md:-inset-3 lg:-inset-4 rounded-3xl blur-xl opacity-50 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            <div className="relative w-[300px] h-[300px] xs:w-[260px] xs:h-[260px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]">
              <Cube3D />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

HeroSection.displayName = "HeroSection";
