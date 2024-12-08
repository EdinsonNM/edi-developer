import { Canvas } from "@react-three/fiber";
import Scenary from "./components/scenary";
import { useState } from "react";
import { Html, PresentationControls } from "@react-three/drei";

export default function Home() {
    const [mousePosition, setMousePosition] = useState([0, 0]);

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const { width, height } = event.target.getBoundingClientRect();

    // Normalizar las coordenadas del mouse al rango de -1 a 1
    const x = (clientX / width) * 2 - 1;
    const y = -(clientY / height) * 2 + 1;

    setMousePosition([x, y]); // Actualiza las coordenadas normalizadas
   
  };
  return (
    <div className="h-full w-full relative" onMouseMove={handleMouseMove}>
      <Canvas camera={{ position: [0, Math.PI/2, 12], fov:45}} className="w-full h-full bg-black" >
        <PresentationControls azimuth={[-Math.PI/4, Math.PI/4]} polar={[-Math.PI/4, Math.PI/4]} >
        <group rotation={[0,0, 0]}>
          <Scenary mousePosition={mousePosition}/> 
        </group>
        </PresentationControls>
      </Canvas>
        <div className="absolute top-0 left-0 w-full h-full text-white text-6xl flex items-center justify-start p-20 pointer-events-none flex flex-col gap-4 items-start justify-center">
          <div className="text-white text-6xl text-left">
          Hello World
          </div>
          <div className="text-white text-lg text-center max-w-3xl">
              Explora cómo más de una década de innovación en desarrollo
              frontend me ha permitido liderar proyectos que transforman y
              enriquecen la experiencia digital.
            </div>
          
        </div>
    </div>
  );
}
