import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Inicializa Lenis (smooth scroll) y lo sincroniza con GSAP ScrollTrigger.
 * Respeta prefers-reduced-motion: en ese caso no se monta Lenis.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.12,
      anchors: { offset: -80 },
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Las secciones lazy cambian la altura del documento al montarse:
    // recalcular las posiciones de los ScrollTriggers cuando eso ocurre
    let refreshTimeout: number | undefined;
    const resizeObserver = new ResizeObserver(() => {
      window.clearTimeout(refreshTimeout);
      refreshTimeout = window.setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    });
    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
      window.clearTimeout(refreshTimeout);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
}
