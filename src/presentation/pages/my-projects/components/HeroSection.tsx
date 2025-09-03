"use client";

import { TextAnimate } from "@/components/ui/text-animate";
import { Badge } from "@/components/ui/badge";
import { useContext } from "react";
import LayoutContext from "@presentation/layout/layout.context";
import { useI18n } from "@presentation/utils/use-i18n";
import AnimatedCharacter from "@/components/ui/animated-character";

interface HeroSectionProps {
  publicacionesCount: number;
  demosCount: number;
  tiktoksCount: number;
}

export const HeroSection = ({
  publicacionesCount,
  demosCount,
  tiktoksCount,
}: HeroSectionProps) => {
  const { isDark } = useContext(LayoutContext);
  const { t } = useI18n();

  return (
    <div className="px-2 xs:px-3 sm:px-4 md:px-6 lg:px-0 pt-12 xs:pt-16 sm:pt-20 md:pt-24 lg:pt-28 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 xs:gap-4 sm:gap-6 md:gap-8 items-center mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-16">
        {/* Text content - First on mobile */}
        <div className="col-span-1 lg:col-span-6 order-1 lg:order-1">
          <TextAnimate
            animation="slideLeft"
            by="character"
            as={"h1"}
            className={`mx-auto mb-2 xs:mb-3 sm:mb-4 md:mb-6 pointer-events-none font-bold text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center lg:text-start text-[#2b59c3] leading-tight`}
          >
            {t.recursosTitulo}
          </TextAnimate>
          <p
            className={`mb-3 xs:mb-4 sm:mb-6 md:mb-8 text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed ${
              isDark ? "text-white/90" : "text-slate-600"
            }`}
          >
            {t.recursosIntro}
          </p>
          <div className="flex flex-wrap gap-1 xs:gap-1.5 sm:gap-2 md:gap-3">
            <Badge
              variant="secondary"
              className="px-1.5 xs:px-2 sm:px-3 md:px-4 py-0.5 xs:py-1 sm:py-1.5 md:py-2 text-xs"
            >
              📝 {publicacionesCount} Artículos
            </Badge>
            <Badge
              variant="secondary"
              className="px-1.5 xs:px-2 sm:px-3 md:px-4 py-0.5 xs:py-1 sm:py-1.5 md:py-2 text-xs"
            >
              🛠️ {demosCount} Demos
            </Badge>
            <Badge
              variant="secondary"
              className="px-1.5 xs:px-2 sm:px-3 md:px-4 py-0.5 xs:py-1 sm:py-1.5 md:py-2 text-xs"
            >
              🎥 {tiktoksCount} Videos
            </Badge>
          </div>
        </div>
        {/* Character - Second on mobile */}
        <div className="col-span-1 lg:col-span-6 flex justify-center order-2 lg:order-2">
          <div className="relative">
            <div className="absolute -inset-0.5 xs:-inset-1 sm:-inset-2 md:-inset-3 lg:-inset-4 rounded-3xl blur-xl opacity-50"></div>
            <AnimatedCharacter
              className="w-[100px] h-[100px] xs:w-[120px] xs:h-[120px] sm:w-[160px] sm:h-[160px] md:w-[180px] md:h-[180px] lg:w-[200px] lg:h-[200px] xl:w-[220px] xl:h-[220px] object-contain"
              alt="Home Right"
              svgPath="/edidev.svg"
              leftEyePosition={{ x: 200, y: 150 }}
              rightEyePosition={{ x: 270, y: 148 }}
              eyeRadius={8}
              pupilRadius={4}
              debugMode={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
