import { Canvas } from "@react-three/fiber";
import Scenary from "./components/scenary";
import { memo, useContext, useState } from "react";
import { PresentationControls } from "@react-three/drei";
import { degToRad } from "three/src/math/MathUtils.js";
import { Bloom } from "@react-three/postprocessing";
import { BlendFunction, KernelSize, Resolution } from "postprocessing";
import ShimmerButton from "@/components/ui/shimmer-button";
import { TextAnimate } from "@/components/ui/text-animate";
import Meteors from "@/components/ui/meteors";
import Stats from "@presentation/pages/home/components/stats";
import LayoutContext from "@presentation/layout/layout.context";
import { cn } from "@/lib/utils";
import DotPattern from "@/components/ui/dot-pattern";
import {
  FaAngular,
  FaApple,
  FaDocker,
  FaLinux,
  FaAws,
  FaGoogle,
  FaPython,
  FaReact,
  FaWindows,
} from "react-icons/fa";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import {
  SiBlender,
  SiCplusplus,
  SiCss3,
  SiFlutter,
  SiGatsby,
  SiHtml5,
  SiJavascript,
  SiKotlin,
  SiLighthouse,
  SiNestjs,
  SiNodedotjs,
  SiPhp,
  SiRemix,
  SiStencil,
  SiTypescript,
} from "react-icons/si";
import { RiFlutterFill, RiNextjsFill, RiOpenaiFill } from "react-icons/ri";
import { TbBrandThreejs } from "react-icons/tb";
import { SiSass, SiTailwindcss } from "react-icons/si";

const TextAnimate2 = memo(TextAnimate);
export default function Home() {
  const [mousePosition, setMousePosition] = useState([0, 0]);
  const { isDark } = useContext(LayoutContext);
  const handleMouseMove = (event: any) => {
    const { clientX, clientY } = event;
    const { width, height } = event.target.getBoundingClientRect();

    // Normalizar las coordenadas del mouse al rango de -1 a 1
    const x = (clientX / width) * 2 - 1;
    const y = -(clientY / height) * 2 + 1;

    setMousePosition([x, y]); // Actualiza las coordenadas normalizadas
  };

  const openContact = () => {
    window.open("https://cal.com/edinson-nunez-more", "blank");
  };
  console.log(isDark);
  return (
    <div
      className={`overflow-hidden h-full w-full relative ${
        isDark
          ? "bg-gradient-to-b from-gray-900 via-black to-black"
          : "bg-gradient-to-b from-blue-300 via-yellow-200 to-white"
      }`}
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

      {isDark && (
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
      )}
      {!isDark && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <OrbitingCircles iconSize={40} radius={220}>
            <RiOpenaiFill size={40} className="text-black" />
            <FaReact size={40} className="text-blue-500" />
            <FaAngular size={40} className="text-red-500" />
            <SiRemix size={40} className="text-blue-700" />
            <FaReact size={40} className="text-blue-500" />
            <RiNextjsFill size={40} className="text-black" />
            <SiStencil size={40} className="text-green-500" />
            <RiFlutterFill size={40} className="text-cyan-500" />
            <TbBrandThreejs size={40} className="text-purple-500" />
            <SiSass size={40} className="text-pink-500" />
            <SiTailwindcss size={40} className="text-blue-500" />
            <SiGatsby size={40} className="text-purple-500" />
          </OrbitingCircles>
          <OrbitingCircles
            iconSize={40}
            radius={290}
            reverse
            className="opacity-80"
          >
            <SiTypescript size={40} className="text-blue-500" />
            <SiNodedotjs size={40} className="text-green-600" />
            <SiCplusplus size={40} className="text-yellow-500" />
            <SiPhp size={40} className="text-purple-500" />
            <FaPython size={40} className="text-blue-500" />
            <SiKotlin size={40} className="text-orange-500" />
            <SiJavascript size={40} className="text-yellow-500" />
            <SiFlutter size={40} className="text-cyan-500" />
            <SiNestjs size={40} className="text-red-500" />
            <SiHtml5 size={40} className="text-orange-500" />
            <SiCss3 size={40} className="text-blue-500" />
            <SiLighthouse size={40} className="text-orange-500" />
            <SiBlender size={40} className="text-orange-500" />
            <FaGoogle size={40} className="text-blue-500" />
          </OrbitingCircles>
          <OrbitingCircles iconSize={40} radius={360} className="opacity-30">
            <FaAws size={40} className="text-orange-500" />
            <FaDocker size={40} className="text-blue-500" />
            <FaLinux size={40} className="text-orange-500" />
            <FaApple size={40} className="text-orange-500" />
            <FaWindows size={40} className="text-blue-500" />
            <FaLinux size={40} className="text-orange-500" />
            <FaApple size={40} className="text-orange-500" />
            <FaWindows size={40} className="text-blue-500" />
          </OrbitingCircles>
        </div>
      )}
      <div className="absolute top-0 left-0 w-full h-full text-white text-6xl flex p-5 md:p-20 pointer-events-none  flex-col gap-4 items-center justify-center">
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
        {isDark && (
          <div className="w-full max-w-2xl">
            <Stats />
          </div>
        )}
        <ShimmerButton
          className="text-sm pointer-events-auto text-black dark:text-white"
          onClick={openContact}
          shimmerColor={isDark ? "white" : "cyan"}
          background={isDark ? "black" : "white"}
        >
          Contáctame
        </ShimmerButton>
      </div>
    </div>
  );
}
