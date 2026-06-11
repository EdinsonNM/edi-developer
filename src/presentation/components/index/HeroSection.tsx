import Marquee from "@/components/ui/marquee";
import { ArrowRight } from "lucide-react";
import { ICONS } from "../../pages/home/components/icons-config";
import { useI18n } from "@/presentation/utils/use-i18n";
import {
  lazy,
  Suspense,
  useState,
  useEffect,
  useRef,
  Component,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Divide un texto en palabras/letras para animarlas individualmente */
function SplitChars({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, wi) => (
        <span key={wi}>
          <span
            className="inline-block overflow-hidden align-bottom"
            aria-hidden="true"
          >
            {word.split("").map((char, ci) => (
              <span key={ci} className="hero-char inline-block">
                {char}
              </span>
            ))}
          </span>{" "}
        </span>
      ))}
    </>
  );
}

const HeroScene3D = lazy(() =>
  import("@/components/HeroScene3D").then((m) => ({ default: m.HeroScene3D }))
);

/** Si la escena 3D falla, el hero sigue funcionando sin ella */
class SceneErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

export function HeroSection() {
  const { t, language } = useI18n();
  const [shouldLoadScene, setShouldLoadScene] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const mainRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Pausar el render 3D cuando el hero sale del viewport
  useEffect(() => {
    const main = mainRef.current;
    if (!main || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsHeroVisible(entry.isIntersecting),
      { rootMargin: "100px" }
    );
    observer.observe(main);
    return () => observer.disconnect();
  }, []);

  // Entrada cinematográfica del título (letra a letra) y parallax de salida
  useEffect(() => {
    const content = contentRef.current;
    const title = titleRef.current;
    if (!content || !title) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(title.querySelectorAll(".hero-char"), {
        yPercent: 110,
        opacity: 0,
        duration: 0.8,
        ease: "power4.out",
        stagger: 0.025,
        delay: 0.3,
      });

      // El hero se desvanece y sube mientras la siguiente sección entra
      gsap.to(content, {
        yPercent: -15,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "bottom 20%",
          scrub: true,
        },
      });
    }, content);

    return () => ctx.revert();
  }, [language]);

  // Cargar la escena 3D después de que el contenido crítico se haya renderizado
  useEffect(() => {
    const loadScene = () => {
      if ("requestIdleCallback" in window) {
        requestIdleCallback(() => setShouldLoadScene(true));
      } else {
        setTimeout(() => setShouldLoadScene(true), 800);
      }
    };

    if (document.readyState === "complete") {
      loadScene();
    } else {
      window.addEventListener("load", loadScene);
      return () => window.removeEventListener("load", loadScene);
    }
  }, []);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    selector: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(selector);
    if (element) {
      const offsetTop =
        element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
      (element as HTMLElement).focus();
    }
  };

  return (
    <main
      ref={mainRef}
      id="inicio"
      className="relative flex min-h-screen flex-col justify-center px-4 md:px-8 pt-24 pb-8 z-10 overflow-hidden"
    >
      {/* Mundo 3D a pantalla completa, detrás del contenido */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {shouldLoadScene && (
          <SceneErrorBoundary>
            <Suspense fallback={null}>
              <HeroScene3D paused={!isHeroVisible} />
            </Suspense>
          </SceneErrorBoundary>
        )}
        {/* Gradiente para legibilidad del titular */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/50 to-transparent lg:via-ink/30" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div ref={contentRef} className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
          {/* Columna de texto */}
          <div className="text-center lg:text-left">
            <p className="font-mono text-sm tracking-[0.3em] uppercase text-acid mb-6 animate-fade-in-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
              Frontend Engineer · AI · 3D
            </p>
            <h1
              ref={titleRef}
              className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl xl:text-7xl mb-6"
            >
              <span className="sr-only">
                {t.heroTitle} {t.heroSubtitle}
              </span>
              <SplitChars text={t.heroTitle} /> <br />
              <span className="text-white/40">
                <SplitChars text={t.heroSubtitle} />
              </span>
            </h1>

            <p className="max-w-xl mx-auto lg:mx-0 text-lg text-white/60 mb-10 animate-fade-in-up opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards]">
              {t.heroDescription}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in-up opacity-0 [animation-delay:800ms] [animation-fill-mode:forwards]">
              <a
                href="#edi-academy"
                data-magnetic
                onClick={(e) => handleAnchorClick(e, "#edi-academy")}
                className="flex items-center gap-2 rounded-full bg-acid px-8 py-3.5 text-base font-medium text-ink hover:bg-acid-dim transition-all hover:scale-105 active:scale-95 shadow-lg shadow-acid/20 focus:outline-none focus:ring-2 focus:ring-acid focus:ring-offset-2 focus:ring-offset-ink"
                aria-label={t.goToEdiAcademy}
              >
                <span>{t.goToEdiAcademy}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#contacto"
                data-magnetic
                onClick={(e) => handleAnchorClick(e, "#contacto")}
                className="flex items-center gap-2 rounded-full bg-transparent px-8 py-3.5 text-base font-medium text-white border border-white/20 hover:border-acid hover:text-acid transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-acid focus:ring-offset-2 focus:ring-offset-ink"
              >
                {t.contactMe}
              </a>
            </div>
          </div>

          {/* Columna vacía: el mundo 3D full-bleed ocupa este espacio visualmente */}
          <div className="hidden lg:block" aria-hidden="true" />
        </div>

        {/* Floating Icons Marquee */}
        <div
          className="w-full max-w-7xl mx-auto mt-10 animate-fade-in-up opacity-0 [animation-delay:1000ms] [animation-fill-mode:forwards]"
          aria-label={
            language === "es"
              ? "Tecnologías y herramientas"
              : "Technologies and tools"
          }
        >
          <Marquee className="[--duration:40s] py-6" pauseOnHover>
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
