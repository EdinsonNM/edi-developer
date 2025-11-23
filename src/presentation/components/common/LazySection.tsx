import { ReactNode, useEffect, useRef, useState, memo } from "react";

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

  return (
    <div ref={ref}>
      {isVisible ? children : fallback}
    </div>
  );
}

// Memoizar el componente para evitar re-renders innecesarios
export const LazySection = memo(LazySectionComponent);


