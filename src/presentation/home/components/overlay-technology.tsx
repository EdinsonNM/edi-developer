import classNames from "classnames";
import { HomeAnimationStates } from "../utils/contants";
import { useContext } from "react";
import HomeContext from "../home.context";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import TechnologySelected from "./technology-selected";

function OverlayTechnology() {
  const { changePage } = useContext(HomeContext);
  const goBack = () => {
    changePage!(HomeAnimationStates.DEVELOPER, true);
  };
  return (
    <section
      className={classNames("relative w-screen h-screen", {
        "opacity-0": false,
        flex: true,
        "items-start": true,
        "justify-start": true,
      })}
      style={{ pointerEvents: "all" }}
    >
      <div className={`relative max-w-[1280px] m-auto mt-24 md:mt-36`}>
        <button
          className="absolute top-0 right-0 p-2 text-white hover:text-gray-900 text-2xl pointer-events-auto cursor-pointer mr-8"
          onClick={goBack}
        >
          &#10005;
        </button>{" "}
        <section className="mt-8 text-justify text-lg px-8 flex flex-col md:flex-row overflow-auto">
          <div className="hidden md:flex flex-grow w-80 h-80">
            <Canvas>
              <ambientLight intensity={0.5} />
              <OrbitControls
                enablePan={false}
                enableZoom={false}
                autoRotate={true}
              />
              <TechnologySelected
                position={[0, 0, 0]}
                scale={[1.2, 1.2, 1.2]}
                path="js.gltf"
                name="Javascript"
              />
            </Canvas>
          </div>
          <div>
            <h1 className="text-5xl font-bold text-left mb-4 text-yellow-400">
              Javascript
            </h1>
            <hr className="bg-yellow-400 h-0.5 border-none mb-5" />
            <p className="text-md text-gray-300">
              Soy un desarrollador frontend con más de 14 años de experiencia,
              especializado en JavaScript y apasionado por crear aplicaciones
              web modernas y eficientes. Dominio en Web Components y Web Workers
              para interfaces reutilizables y rendimiento mejorado. Experiencia
              en Progressive Web Apps (PWA) para accesibilidad y experiencia de
              usuario. Trabajo con React, Angular y TypeScript para aplicaciones
              robustas. Enfoque en código limpio y mantenible con actualización
              constante de habilidades para soluciones innovadoras.
            </p>
          </div>
        </section>
      </div>
    </section>
  );
}
export default OverlayTechnology;
