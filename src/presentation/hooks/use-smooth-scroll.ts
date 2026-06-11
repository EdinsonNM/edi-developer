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
    // Lenis solo recalcula su límite de scroll en el resize de la ventana,
    // así que hay que avisarle (y a ScrollTrigger) cuando el body crece
    let refreshTimeout: number | undefined;
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
      window.clearTimeout(refreshTimeout);
      refreshTimeout = window.setTimeout(() => {
        lenis.resize();
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
