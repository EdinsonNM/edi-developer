"use client";

import { useContext } from "react";
import LayoutContext from "@presentation/layout/layout.context";
import FlickeringGrid from "@/components/ui/flickering-grid";
import { HeroSection } from "./components/HeroSection";
import { MyExperienceSection } from "./components/MyExperienceSection";
import { WhatIDoSection } from "./components/WhatIDoSection";
import { CurrentProjectsSection } from "./components/CurrentProjectsSection";
import { HowIWorkSection } from "./components/HowIWorkSection";
import { TechStackSection } from "./components/TechStackSection";
import { AchievementsSection } from "./components/AchievementsSection";
import { WhatMovesMeSection } from "./components/WhatMovesMeSection";
import { CTASection } from "./components/CTASection";

export default function AboutMe() {
  const { isDark } = useContext(LayoutContext);

  return (
    <div
      className={`w-full min-h-[calc(100dvh-64px)] md:min-h-[calc(100dvh-80px)] overflow-y-auto overflow-x-hidden ${
        isDark ? "bg-gradient-to-b from-black to-cyan-800" : "bg-white"
      }`}
    >
      <div className="fixed w-full h-full left-0 top-0">
        <FlickeringGrid
          className="relative inset-0 z-0 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
          squareSize={4}
          gridGap={6}
          color="#60A5FA"
          maxOpacity={0.5}
          flickerChance={0.1}
          height={2048}
          width={2048}
        />
      </div>
      <div className="w-full relative container mx-auto py-3 xs:py-4 sm:py-6 md:py-8 lg:py-10 pb-8 overflow-x-hidden">
        {/* Hero section con el cubo 3D */}
        <HeroSection />

        {/* Sección Mi experiencia */}
        <MyExperienceSection />

        {/* Sección Qué hago hoy */}
        <WhatIDoSection />

        {/* Sección Proyectos actuales */}
        <CurrentProjectsSection />

        {/* Sección Cómo trabajo */}
        <HowIWorkSection />

        {/* Sección Stack favorito */}
        <TechStackSection />

        {/* Sección Logros y enfoque */}
        <AchievementsSection />

        {/* Sección Lo que me mueve */}
        <WhatMovesMeSection />

        {/* CTA final */}
        <CTASection />
      </div>
    </div>
  );
}
