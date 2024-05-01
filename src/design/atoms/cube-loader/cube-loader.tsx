import { Html, useProgress } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function CubeLoader() {
  const { progress } = useProgress();
  const ref = useRef<any>(null);
  useFrame(() => {
    (ref.current as any).rotation.y += (0.3 * progress) / 100;
  });
  const messages = [
    "Engrasando los engranajes digitales...",
    "Pulverizando polígonos...",
    "Amasando los vértices...",
    "Espera, ¿dónde puse el modelo?",
    "¡Alerta de spoiler! Esto se va a ver genial...",
  ];
  let currentMessage = messages[0];
  switch (true) {
    case progress > 20 && progress <= 40:
      currentMessage = messages[1];
      break;
    case progress > 40 && progress <= 60:
      currentMessage = messages[2];
      break;
    case progress > 60 && progress <= 80:
      currentMessage = messages[3];
      break;
    case progress > 80 && progress <= 100:
      currentMessage = messages[4];
      break;
  }
  return (
    <group position={[0, 0, 0]}>
      <mesh ref={ref}>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
      <Html className="w-[300px] mt-10 text-gray-500" position={[-1, -0.5, 0]}>
        <div className="text-sm">{currentMessage}</div>
        <div className="w-full bg-gray-200 rounded-full h-4.5 dark:bg-gray-700">
          <div
            className="bg-gray-300 h-4.5 rounded-full text-xs"
            style={{ width: `${Math.round(progress)}%` }}
          >
            {Math.round(progress)}%
          </div>
        </div>
      </Html>
    </group>
  );
}
export default CubeLoader;
