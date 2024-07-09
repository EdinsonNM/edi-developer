import PulsatingLight from "@design/molecules/pulsating-light";
import { useEffect, useRef } from "react";
import { PointLight } from "three";

function Lights() {
  const lampRef = useRef<PointLight>(null);

  useEffect(() => {
    //lampRef!.current!.target!.position.set(-4.5, 1, 0.5);
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

      <pointLight
        ref={lampRef}
        color={"yellow"}
        position={[-4.2, 2.4, 1.4]}
        intensity={10}
        decay={1}
        castShadow
        distance={0}
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
export default Lights;
