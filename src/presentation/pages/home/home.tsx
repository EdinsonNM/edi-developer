import { memo, useContext } from "react";
import { TextAnimate } from "@/components/ui/text-animate";
import Meteors from "@/components/ui/meteors";
import Stats from "./components/stats";
import LayoutContext from "@presentation/layout/layout.context";
import { cn } from "@/lib/utils";
import DotPattern from "@/components/ui/dot-pattern";
import ShimmerButton from "@/components/ui/shimmer-button";
import { SceneCanvas } from "./components/scene-canvas";
import { OrbitingIcons } from "./components/orbiting-icons";

const TextAnimate2 = memo(TextAnimate);

export default function Home() {
  const { isDark } = useContext(LayoutContext);

  const openContact = () => {
    window.open("https://cal.com/edinson-nunez-more", "blank");
  };

  return (
    <div
      className={cn(
        "overflow-hidden h-full w-full relative",
        isDark
          ? "bg-gradient-to-b from-gray-900 via-black to-black"
          : "bg-gradient-to-b from-blue-300 via-yellow-200 to-white"
      )}
    >
      <div className="absolute top-0 left-0 w-full h-full">
        {isDark ? (
          <Meteors number={30} />
        ) : (
          <DotPattern
            className={cn(
              "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
            )}
          />
        )}
      </div>

      {isDark ? (
        <SceneCanvas />
      ) : (
        <OrbitingIcons />
      )}

      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center pointer-events-none">
        <div className="flex flex-col items-center justify-center gap-4 p-4 text-center">
          <TextAnimate2
            animation="slideLeft"
            by="character"
            as={"h1"}
            className={`pointer-events-none font-bold text-3xl md:text-6xl text-left ${
              isDark ? "text-cyan-500" : "text-cyan-700"
            }`}
          >
            Hello World
          </TextAnimate2>

          <TextAnimate2
            animation="slideRight"
            by="word"
            as={"h2"}
            duration={1500}
            delay={500}
            className={`pointer-events-none text-sm md:text-xl text-center max-w-3xl dark:text-white text-black`}
          >
            Explora cómo más de una década de innovación en desarrollo frontend me
            ha permitido liderar proyectos que transforman y enriquecen la
            experiencia digital.
          </TextAnimate2>
          <ShimmerButton
          className="text-xl pointer-events-auto text-black dark:text-white"
          onClick={openContact}
          shimmerColor={isDark ? "white" : "cyan"}
          background={isDark ? "black" : "white"}
        >
          Contáctame
        </ShimmerButton>
        </div>
        {isDark && <Stats />}
      </div>
    </div>
  );
}
