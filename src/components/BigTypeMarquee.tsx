import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface BigTypeMarqueeProps {
  words: string[];
  /** 1 desplaza a la izquierda, -1 a la derecha */
  direction?: 1 | -1;
}

/**
 * Línea tipográfica gigante en outline que se desplaza ligada al scroll.
 * Recurso editorial entre secciones; puramente decorativo.
 */
export function BigTypeMarquee({ words, direction = 1 }: BigTypeMarqueeProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        track,
        { xPercent: direction === 1 ? 0 : -30 },
        {
          xPercent: direction === 1 ? -30 : 0,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        }
      );
    }, wrap);

    return () => ctx.revert();
  }, [direction]);

  const line = words.join(" — ") + " — ";

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="relative overflow-hidden py-10 select-none pointer-events-none"
    >
      <div
        ref={trackRef}
        className="whitespace-nowrap font-display font-bold uppercase tracking-tight leading-none text-[clamp(4rem,12vw,10rem)]"
        style={{
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.14)",
          willChange: "transform",
        }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i}>
            {line}
            <span style={{ WebkitTextStroke: "0", color: "#c8f31d" }}>
              {"✦ "}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
