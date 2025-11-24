import { useState, useEffect, useRef } from "react";

/**
 * Hook personalizado para manejar la visibilidad del navbar al hacer scroll
 * Optimizado con requestAnimationFrame para mejor rendimiento
 */
export function useNavbarVisibility() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Cancelar el frame anterior si existe
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }

      // Usar requestAnimationFrame para sincronizar con el ciclo de renderizado
      rafIdRef.current = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const lastScrollY = lastScrollYRef.current;

        // Solo actualizar estado si hay un cambio significativo
        if (currentScrollY < lastScrollY || currentScrollY < 100) {
          setIsNavbarVisible((prev) => (prev ? prev : true));
        } else {
          setIsNavbarVisible((prev) => (prev ? false : prev));
        }

        lastScrollYRef.current = currentScrollY;
        rafIdRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      // Limpiar el frame pendiente si existe
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return isNavbarVisible;
}

