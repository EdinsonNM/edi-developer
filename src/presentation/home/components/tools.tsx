import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group, Object3DEventMap } from "three";

function Tools() {
  const { scene } = useGLTF(`./tools.gltf`);
  const ref = useRef<Group<Object3DEventMap>>(null);
  useFrame(() => {
    ref.current!.rotation!.y += 0.01;
  });
  return (
    <group
      ref={ref}
      position={[3, 0, 19]}
      rotation={[0, -Math.PI * 2 * 0.25, 0]}
    >
      <primitive object={scene} castShadow />
    </group>
  );
}
export default Tools;
