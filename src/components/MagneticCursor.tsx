import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR = "a, button, [data-magnetic]";

/**
 * Cursor follower: punto + anillo con lerp. El anillo se expande sobre
 * elementos interactivos y los elementos [data-magnetic] se atraen al cursor.
 * No se monta en táctiles ni con prefers-reduced-motion; el cursor nativo
 * permanece visible para no perjudicar la usabilidad.
 */
export function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    dot.style.opacity = "1";
    ring.style.opacity = "1";

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let raf = 0;
    let magneticEl: HTMLElement | null = null;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = (e.target as HTMLElement | null)?.closest?.(
        INTERACTIVE_SELECTOR
      ) as HTMLElement | null;

      if (target !== magneticEl) {
        if (magneticEl) magneticEl.style.transform = "";
        magneticEl = target;
        ring.classList.toggle("cursor-ring--active", Boolean(target));
      }

      if (magneticEl && magneticEl.hasAttribute("data-magnetic")) {
        const rect = magneticEl.getBoundingClientRect();
        const dx = mouseX - (rect.left + rect.width / 2);
        const dy = mouseY - (rect.top + rect.height / 2);
        magneticEl.style.transform = `translate(${dx * 0.25}px, ${dy * 0.25}px)`;
      }
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      if (magneticEl) magneticEl.style.transform = "";
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[70] h-1.5 w-1.5 rounded-full bg-acid opacity-0"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="cursor-ring pointer-events-none fixed top-0 left-0 z-[70] h-8 w-8 rounded-full border border-acid/50 opacity-0"
        style={{ willChange: "transform" }}
      />
      <style>{`
        .cursor-ring {
          transition: width 0.25s ease, height 0.25s ease, border-color 0.25s ease;
        }
        [data-magnetic] {
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .cursor-ring--active {
          width: 3.5rem;
          height: 3.5rem;
          border-color: rgba(200, 243, 29, 0.9);
        }
      `}</style>
    </>
  );
}
