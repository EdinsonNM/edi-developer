import Particles from "@/components/ui/particles";
import { TextAnimate } from "@/components/ui/text-animate";
import useDarkMode from "@presentation/utils/use-dark-mode";
import { DockAbout } from "./components/dock";

export default function About() {
  const isDark = useDarkMode();
  return (
    <div className="w-full h-full bg-gradient-to-b from-black to-blue-900">
      <div className="absolute w-full h-full left-0 top-0">
        <Particles />
      </div>
      <div className="w-full h-full relative flex flex-row justify-center items-center container mx-auto py-10">
        <div>
          <TextAnimate
            animation="slideLeft"
            by="character"
            as={"h1"}
            className={`mb-10 pointer-events-none font-bold text-2xl md:text-6xl text-center ${isDark ? "text-cyan-500" : "text-green-500"}`}
          >
            Mi viaje en la tecnología
          </TextAnimate>

          <TextAnimate
            animation="slideRight"
            by="word"
            as={"h2"}
            duration={1500}
            delay={500}
            className={`text-sm md:text-xl text-center max-w-5xl ${isDark ? "text-white" : "text-black"}`}
          >
            Hola, soy Edinson Nuñez More, desarrollador apasionado por crear
            soluciones que mejoren la vida de las personas. Desde mis primeros
            pasos en el mundo del código hasta los proyectos que desarrollo hoy,
            cada línea de código refleja mi compromiso con la innovación."
          </TextAnimate>
          <DockAbout />
        </div>
        <div />
      </div>
    </div>
  );
}