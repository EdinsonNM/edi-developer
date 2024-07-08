import PulsatingLight from "@design/molecules/pulsating-light";
import { useEffect, useRef } from "react";
import { SpotLight } from "three";

function HomeLights() {
  const lampRef = useRef<SpotLight>(null);

  useEffect(() => {
    lampRef!.current!.target!.position.set(-4.5, 1, 0.5);
  }, []);
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight intensity={1} />
      <PulsatingLight
        color={"violet"}
        position={[2, 1, 2]}
        intensity={1}
        decay={2}
        castShadow
        receiveShadow
      />
      <PulsatingLight
        color={"red"}
        position={[-2, 1, 2]}
        intensity={1}
        decay={2}
        castShadow
        receiveShadow
      />

      <spotLight
        ref={lampRef}
        color={"yellow"}
        position={[-5, 2.6, 1.4]}
        intensity={500}
        decay={5}
        castShadow
        penumbra={0.5}
        distance={2}
        angle={Math.PI / 4}
      />
      <spotLight
        intensity={100}
        decay={0.5}
        isLight
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
      />
      <spotLight
        intensity={500}
        distance={8}
        color={"yellow"}
        position={[0, 5, 2]}
        angle={Math.PI / 8}
        penumbra={0.05}
        rotation={[Math.PI / 4, Math.PI / 4, Math.PI / 4]}
      />
    </>
  );
}
export default HomeLights;
