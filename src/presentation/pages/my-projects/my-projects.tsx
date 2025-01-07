"use client";

import Particles from "@/components/ui/particles";
import { TextAnimate } from "@/components/ui/text-animate";
import useDarkMode from "@presentation/utils/use-dark-mode";
import { Projects } from "./components/projects";

export default function MyProjects() {
  const isDark = useDarkMode();

  return (
    <div className="w-full h-full bg-gradient-to-b from-black to-cyan-800">
      <div className="absolute w-full h-full left-0 top-0">
        <Particles />
      </div>
      <div className="w-full h-full relative flex flex-row justify-center items-center container mx-auto py-10">
        <div>
          <TextAnimate
            animation="slideLeft"
            by="character"
            as={"h1"}
            className={`mb-10 pointer-events-none font-bold text-2xl md:text-6xl text-left ${isDark ? "text-cyan-500" : "text-green-500"}`}
          >
            Construyendo el Futuro, Un Proyecto a la Vez
          </TextAnimate>

          <TextAnimate
            animation="slideRight"
            by="word"
            as={"h2"}
            duration={1500}
            delay={500}
            className={`pointer-events-none text-sm md:text-xl text-start max-w-3xl ${isDark ? "text-white" : "text-black"}`}
          >
            "Aquí encontrarás una selección de proyectos en los que he
            trabajado. Cada línea de código representa una idea convertida en
            realidad. Descubre cómo resuelvo problemas y creo experiencias
            innovadoras."
          </TextAnimate>
        </div>
        <Projects />
      </div>
    </div>
  );
}
