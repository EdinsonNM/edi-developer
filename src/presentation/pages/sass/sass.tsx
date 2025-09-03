"use client";

import Particles from "@/components/ui/particles";
import { TextAnimate } from "@/components/ui/text-animate";
import { useContext } from "react";
import LayoutContext from "@presentation/layout/layout.context";
import { Apps } from "./components/apps";

export default function SASS() {
  const { isDark } = useContext(LayoutContext);

  return (
    <div
      className={`w-full h-full overflow-y-auto ${
        isDark ? "bg-gradient-to-b from-black to-cyan-800" : "bg-white"
      }`}
    >
      <div className="absolute w-full h-full left-0 top-0">
        <Particles />
      </div>
      <div className="w-full h-full relative flex flex-col md:flex-row justify-center items-center container mx-auto py-10 gap-10">
        <Apps />

        <div className="px-10 md:px-0 pt-32 md:pt-0 ">
          <TextAnimate
            animation="slideLeft"
            by="character"
            as={"h1"}
            className={`mx-auto mb-10 pointer-events-none font-bold text-2xl md:text-6xl text-center md:text-start max-w-80 md:max-w-none text-[#2b59c3]`}
          >
            Soluciones creadas para transformar experiencias reales.
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
            Además de mi trabajo como desarrollador, diseño y construyo
            productos digitales enfocados en resolver necesidades específicas
            con tecnología robusta, escalable y fácil de usar. Aquí te presento
            algunos de los proyectos que he lanzado bajo el modelo SaaS:
          </TextAnimate>
        </div>
      </div>
    </div>
  );
}
