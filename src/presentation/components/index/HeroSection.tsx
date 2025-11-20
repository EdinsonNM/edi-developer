import Hyperspeed from "@/components/Hyperspeed";
import { EdiDevLogo } from "@/components/ui/edidev-logo";
import Marquee from "@/components/ui/marquee";
import { ArrowRight } from "lucide-react";
import {
  innerCircleIcons,
  middleCircleIcons,
  outerCircleIcons,
} from "../../pages/home/components/icons-config";

// Combinar todos los iconos de icons-config.ts
const icons = [...innerCircleIcons, ...middleCircleIcons, ...outerCircleIcons];

export function HeroSection() {
  return (
    <main
      id="inicio"
      className="relative flex flex-col items-center justify-center h-screen px-4 text-center z-10 pt-20"
    >
      {/* Background Effects - Hyperspeed solo en hero */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <Hyperspeed
          effectOptions={{
            onSpeedUp: () => {},
            onSlowDown: () => {},
            distortion: "turbulentDistortion",
            length: 400,
            roadWidth: 10,
            islandWidth: 2,
            lanesPerRoad: 4,
            fov: 90,
            fovSpeedUp: 150,
            speedUp: 2,
            carLightsFade: 0.4,
            totalSideLightSticks: 20,
            lightPairsPerRoadWay: 40,
            shoulderLinesWidthPercentage: 0.05,
            brokenLinesWidthPercentage: 0.1,
            brokenLinesLengthPercentage: 0.5,
            lightStickWidth: [0.12, 0.5],
            lightStickHeight: [1.3, 1.7],
            movingAwaySpeed: [60, 80],
            movingCloserSpeed: [-120, -160],
            carLightsLength: [400 * 0.03, 400 * 0.2],
            carLightsRadius: [0.05, 0.14],
            carWidthPercentage: [0.3, 0.5],
            carShiftX: [-0.8, 0.8],
            carFloorSeparation: [0, 5],
            colors: {
              roadColor: 0xf2f2f2,
              islandColor: 0xf2f2f2,
              background: 0xffffff,
              shoulderLines: 0x000000,
              brokenLines: 0xffffff,
              leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
              rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
              sticks: 0x03b3c3,
            },
          }}
        />
      </div>

      {/* Contenido del Hero */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Logo/Brand Pill */}
        <div className="mb-8 animate-fade-in-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 shadow-sm transition-colors hover:bg-slate-50">
            <EdiDevLogo className="h-5 w-5" />
            <span className="text-sm font-medium text-slate-600">
              Edi Developer
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="max-w-5xl text-5xl font-bold tracking-tight text-slate-900 sm:text-7xl md:text-8xl mb-6 animate-fade-in-up opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards] text-center">
          Edi Developer <br />
          <span className="text-slate-500">
            Innovación que abre oportunidades
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-lg text-slate-600 mb-10 animate-fade-in-up opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards] text-center">
          La tecnología es magia cuando abre oportunidades. Y yo construyo esa
          magia para quienes más la necesitan.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 animate-fade-in-up opacity-0 [animation-delay:800ms] [animation-fill-mode:forwards]">
          <a
            href="/Resume English.pdf"
            download="Resume English.pdf"
            className="flex items-center gap-2 rounded-full bg-slate-900 px-8 py-3.5 text-base font-medium text-white hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-slate-900/20"
          >
            <span>Download CV</span>
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#contacto"
            onClick={(e) => {
              e.preventDefault();
              const element = document.querySelector("#contacto");
              if (element) {
                const offsetTop =
                  element.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({
                  top: offsetTop,
                  behavior: "smooth",
                });
              }
            }}
            className="flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-medium text-slate-900 border border-slate-200 hover:bg-slate-50 transition-all hover:scale-105 active:scale-95"
          >
            Contáctame
          </a>
        </div>

        {/* Floating Icons Marquee */}
        <div className="w-full max-w-7xl mx-auto animate-fade-in-up opacity-0 [animation-delay:1000ms] [animation-fill-mode:forwards]">
          <Marquee className="[--duration:40s] py-8" pauseOnHover>
            {icons.map((iconConfig, i) => {
              const { Icon, color } = iconConfig;
              return (
                <div
                  key={i}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg shadow-slate-200/50 ring-1 ring-slate-100 mx-4 hover:scale-110 transition-transform cursor-pointer"
                >
                  <Icon className={`h-6 w-6 ${color}`} />
                </div>
              );
            })}
          </Marquee>
        </div>
      </div>
    </main>
  );
}
