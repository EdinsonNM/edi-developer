"use client";

import { useContext } from "react";
import LayoutContext from "@presentation/layout/layout.context";
import { useI18n } from "@presentation/utils/use-i18n";
import FlickeringGrid from "@/components/ui/flickering-grid";
import { HeroSection } from "./components/HeroSection";

export default function AboutMe() {
  const { isDark } = useContext(LayoutContext);
  const { t } = useI18n();

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
      </div>
    </div>
  );
}
