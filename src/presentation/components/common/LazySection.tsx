import { ReactNode, useEffect, useRef, useState, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  threshold?: number;
}

/**
 * Componente que carga contenido solo cuando entra en el viewport
 * Mejora el rendimiento inicial al diferir la carga de secciones no críticas
 */
function LazySectionComponent({
  children,
  fallback = null,
  rootMargin = "100px",
  threshold = 0.01,
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasLoaded) return;

    // Si IntersectionObserver no está disponible, cargar inmediatamente
    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      setHasLoaded(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setHasLoaded(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold, hasLoaded]);

  // Revelar con scroll los elementos marcados con [data-reveal] dentro de la sección
  useEffect(() => {
    const element = ref.current;
    if (!element || !isVisible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = element.querySelectorAll<HTMLElement>("[data-reveal]");
    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      targets.forEach((target, i) => {
        gsap.fromTo(
          target,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: (i % 4) * 0.08,
            scrollTrigger: {
              trigger: target,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, element);

    return () => ctx.revert();
  }, [isVisible]);

  return (
    <div ref={ref}>
      {isVisible ? children : fallback}
    </div>
  );
}

// Memoizar el componente para evitar re-renders innecesarios
export const LazySection = memo(LazySectionComponent);


