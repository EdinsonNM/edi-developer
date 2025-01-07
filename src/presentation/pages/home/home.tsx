import { Canvas } from "@react-three/fiber";
import Scenary from "./components/scenary";
import { memo, useState } from "react";
import { PresentationControls } from "@react-three/drei";
import useDarkMode from "@presentation/utils/use-dark-mode";
import { degToRad } from "three/src/math/MathUtils.js";
import { Bloom } from "@react-three/postprocessing";
import { BlendFunction, KernelSize, Resolution } from "postprocessing";
import ShimmerButton from "@/components/ui/shimmer-button";
import { TextAnimate } from "@/components/ui/text-animate";
import Meteors from "@/components/ui/meteors";
import Stats from "@presentation/pages/home/components/stats";

const TextAnimate2 = memo(TextAnimate);
export default function Home() {
  const [mousePosition, setMousePosition] = useState([0, 0]);
  const isDark = useDarkMode();
  const handleMouseMove = (event: any) => {
    const { clientX, clientY } = event;
    const { width, height } = event.target.getBoundingClientRect();

    // Normalizar las coordenadas del mouse al rango de -1 a 1
    const x = (clientX / width) * 2 - 1;
    const y = -(clientY / height) * 2 + 1;

    setMousePosition([x, y]); // Actualiza las coordenadas normalizadas
  };

  const openContact = () => {
    window.open("https://cal.com/edinson-nunez-more", "blank"); // Abre el cliente de correo pred
  };
  return (
    <div
      className={`overflow-hidden h-full w-full relative  ${isDark ? "bg-black" : "bg-white"}`}
    >
      <div className="absolute top-0 left-0 w-full h-full">
        <Meteors number={30} />
      </div>
      <Canvas
        camera={{ position: [0, 1, 12], fov: 45 }}
        className={`w-full h-full`}
        onMouseMove={handleMouseMove}
      >
        <PresentationControls
          azimuth={[-Math.PI / 4, Math.PI / 4]}
          polar={[-Math.PI, Math.PI]}
        >
          <group rotation={[-degToRad(65), 0, 0]} position={[0, -7, -10]}>
            <Scenary mousePosition={mousePosition as any} />
          </group>
        </PresentationControls>
        <ambientLight intensity={isDark ? 0 : 10} />
        <Bloom
          intensity={0.7}
          levels={8}
          blendFunction={BlendFunction.ADD}
          mipmapBlur
          kernelSize={KernelSize.LARGE}
          resolutionX={Resolution.AUTO_SIZE} // The horizontal resolution.
          resolutionY={Resolution.AUTO_SIZE} // The vertical resolution.
        />
      </Canvas>
      <div className="absolute top-0 left-0 w-full h-full text-white text-6xl flex p-5 md:p-20 pointer-events-none  flex-col gap-4 items-center justify-center">
        <TextAnimate2
          animation="slideLeft"
          by="character"
          as={"h1"}
          className={`pointer-events-none font-bold text-3xl md:text-6xl text-left ${isDark ? "text-cyan-500" : "text-green-500"}`}
        >
          Hello World
        </TextAnimate2>

        <TextAnimate2
          animation="slideRight"
          by="word"
          as={"h2"}
          duration={1500}
          delay={500}
          className={`pointer-events-none text-sm md:text-xl text-center max-w-3xl ${isDark ? "text-white" : "text-black"}`}
        >
          Explora cómo más de una década de innovación en desarrollo frontend me
          ha permitido liderar proyectos que transforman y enriquecen la
          experiencia digital.
        </TextAnimate2>
        <div className="relative flex w-[600px] mx-auto flex-col items-center justify-center overflow-hidden">
          <Stats />
        </div>
        <ShimmerButton
          className="text-sm pointer-events-auto"
          onClick={openContact}
        >
          Contáctame
        </ShimmerButton>
      </div>
    </div>
  );
}
