import Marquee from "@/components/ui/marquee";
import { ArrowRight } from "lucide-react";
import { ICONS } from "../../pages/home/components/icons-config";
import { useI18n } from "@/presentation/utils/use-i18n";
import { lazy, Suspense, useState, useEffect } from "react";

const Hyperspeed = lazy(() => import("@/components/Hyperspeed"));

const HyperspeedPlaceholder = () => (
  <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-gradient-to-b from-ink via-ink-soft to-ink" />
);

export function HeroSection() {
  const { t, language } = useI18n();
  const [shouldLoadHyperspeed, setShouldLoadHyperspeed] = useState(false);

  // Cargar Hyperspeed después de que el contenido crítico se haya renderizado
  useEffect(() => {
    // Usar requestIdleCallback si está disponible, sino setTimeout
    const loadHyperspeed = () => {
      if ("requestIdleCallback" in window) {
        requestIdleCallback(() => {
          setShouldLoadHyperspeed(true);
        });
      } else {
        setTimeout(() => {
          setShouldLoadHyperspeed(true);
        }, 1000);
      }
    };

    // Esperar a que el contenido crítico se renderice
    if (document.readyState === "complete") {
      loadHyperspeed();
    } else {
      window.addEventListener("load", loadHyperspeed);
      return () => window.removeEventListener("load", loadHyperspeed);
    }
  }, []);

  return (
    <main
      id="inicio"
      className="relative flex flex-col items-center justify-center h-screen px-4 text-center z-10 pt-20"
    >
      {/* Background Effects - Hyperspeed lazy loaded */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        {shouldLoadHyperspeed ? (
          <Suspense fallback={<HyperspeedPlaceholder />}>
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
                  roadColor: 0x080808,
                  islandColor: 0x0a0a0b,
                  background: 0x0a0a0b,
                  shoulderLines: 0x1f1f23,
                  brokenLines: 0x1f1f23,
                  leftCars: [0xc8f31d, 0x8aa814, 0xe3ff5c],
                  rightCars: [0xfafafa, 0x9a9aa0, 0xdcdce0],
                  sticks: 0xc8f31d,
                },
              }}
            />
          </Suspense>
        ) : (
          <HyperspeedPlaceholder />
        )}
      </div>

      {/* Contenido del Hero */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Main Headline */}
        <p className="font-mono text-sm tracking-[0.3em] uppercase text-acid mb-6 animate-fade-in-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
          Frontend Engineer · AI · 3D
        </p>
        <h1 className="max-w-5xl font-display text-5xl font-bold tracking-tight text-white sm:text-7xl md:text-8xl mb-6 animate-fade-in-up opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards] text-center">
          {t.heroTitle} <br />
          <span className="text-white/40">{t.heroSubtitle}</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-lg text-white/60 mb-10 animate-fade-in-up opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards] text-center">
          {t.heroDescription}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 animate-fade-in-up opacity-0 [animation-delay:800ms] [animation-fill-mode:forwards]">
          <a
            href="#edi-academy"
            onClick={(e) => {
              e.preventDefault();
              const element = document.querySelector("#edi-academy");
              if (element) {
                const offsetTop =
                  element.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({
                  top: offsetTop,
                  behavior: "smooth",
                });
                // Mover foco al elemento de edi academy para accesibilidad
                (element as HTMLElement).focus();
              }
            }}
            className="flex items-center gap-2 rounded-full bg-acid px-8 py-3.5 text-base font-medium text-ink hover:bg-acid-dim transition-all hover:scale-105 active:scale-95 shadow-lg shadow-acid/20 focus:outline-none focus:ring-2 focus:ring-acid focus:ring-offset-2 focus:ring-offset-ink"
            aria-label={t.goToEdiAcademy}
          >
            <span>{t.goToEdiAcademy}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
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
                // Mover foco al elemento de contacto para accesibilidad
                (element as HTMLElement).focus();
              }
            }}
            className="flex items-center gap-2 rounded-full bg-transparent px-8 py-3.5 text-base font-medium text-white border border-white/20 hover:border-acid hover:text-acid transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-acid focus:ring-offset-2 focus:ring-offset-ink"
          >
            {t.contactMe}
          </a>
        </div>

        {/* Floating Icons Marquee */}
        <div
          className="w-full max-w-7xl mx-auto animate-fade-in-up opacity-0 [animation-delay:1000ms] [animation-fill-mode:forwards]"
          aria-label={
            language === "es"
              ? "Tecnologías y herramientas"
              : "Technologies and tools"
          }
        >
          <Marquee className="[--duration:40s] py-8" pauseOnHover>
            {ICONS.map((iconConfig, i) => {
              const { Icon, color } = iconConfig;
              return (
                <div
                  key={i}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-white/[0.04] ring-1 ring-white/10 mx-4 hover:scale-110 hover:ring-acid/50 transition-all"
                  role="img"
                  aria-hidden="true"
                >
                  <Icon className={`h-6 w-6 ${color}`} aria-hidden="true" />
                </div>
              );
            })}
          </Marquee>
        </div>
      </div>
    </main>
  );
}
