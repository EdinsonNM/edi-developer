"use client";

import Particles from "@/components/ui/particles";
import { TextAnimate } from "@/components/ui/text-animate";
import { useContext } from "react";
import LayoutContext from "@presentation/layout/layout.context";

export default function Podcast() {
  const { isDark } = useContext(LayoutContext);

  return (
    <div
      className={`w-full h-full overflow-y-auto ${
        isDark
          ? "bg-gradient-to-b from-black to-cyan-800"
          : "bg-gradient-to-b from-blue-300 via-yellow-200 to-white"
      }`}
    >
      <div className="absolute w-full h-full left-0 top-0">
        <Particles />
      </div>
      <div className="w-full h-full relative flex flex-col md:flex-row justify-center items-center container mx-auto py-10 gap-10">
        <div className="px-10 md:px-0 pt-32 md:pt-0 ">
          <TextAnimate
            animation="slideLeft"
            by="character"
            as={"h1"}
            className={`mx-auto mb-10 pointer-events-none font-bold text-2xl md:text-6xl text-center md:text-start max-w-80 md:max-w-none ${
              isDark ? "text-cyan-500" : "text-green-500"
            }`}
          >
            Escucha mi Podcast – IA al Día
          </TextAnimate>

          <TextAnimate
            animation="slideRight"
            by="word"
            as={"h2"}
            duration={1500}
            delay={500}
            className={`pointer-events-none text-sm md:text-xl text-start max-w-3xl ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            En IA al Día, comparto ideas, entrevistas y reflexiones sobre el
            presente y futuro del desarrollo web, la IA, herramientas modernas y
            cómo evolucionamos como profesionales en este mundo que cambia a
            ritmo acelerado. Cada episodio es una oportunidad para aprender,
            cuestionar y construir juntos una visión más clara del panorama
            tecnológico.
          </TextAnimate>
          <div className="mt-10 text-left">
            <div className="text-sm">
              👉 Disponible en Spotify. Dale play y acompáñame en este viaje.
            </div>
          </div>
        </div>
        <div>
          <iframe
            className="flex-1 rounded-3xl"
            src="https://open.spotify.com/embed/show/76jEyFY243zb9VX5HjvP9A?utm_source=generator"
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
