import { Canvas } from "@react-three/fiber";
import { PresentationControls } from "@react-three/drei";
import { Bloom } from "@react-three/postprocessing";
import { BlendFunction, KernelSize, Resolution } from "postprocessing";
import { degToRad } from "three/src/math/MathUtils.js";
import Scenary from "./scenary";
import { useState } from "react";


export const SceneCanvas = () => {
  const [mousePosition, setMousePosition] = useState<[number, number,0]>([0, 0,0]);


  const handleMouseMove = (event: React.MouseEvent) => {
    const { clientX, clientY } = event;
    const { width, height } = event.currentTarget.getBoundingClientRect();
    const x = (clientX / width) * 2 - 1;
    const y = -(clientY / height) * 2 + 1;
    setMousePosition([x, y, 0]);
  };


  return (
    <Canvas
      camera={{ position: [0, 1, 12], fov: 45 }}
      className="w-full h-full"
      onMouseMove={handleMouseMove}
    >
      <PresentationControls
        azimuth={[-Math.PI / 4, Math.PI / 4]}
        polar={[-Math.PI, Math.PI]}
      >
        <group rotation={[-degToRad(65), 0, 0]} position={[0, -7, -10]}>
          <Scenary mousePosition={mousePosition} />
        </group>
      </PresentationControls>
      <ambientLight intensity={0} />
      <Bloom
        intensity={0.7}
        levels={8}
        blendFunction={BlendFunction.ADD}
        mipmapBlur
        kernelSize={KernelSize.LARGE}
        resolutionX={Resolution.AUTO_SIZE}
        resolutionY={Resolution.AUTO_SIZE}
      />
    </Canvas>
  );
};
