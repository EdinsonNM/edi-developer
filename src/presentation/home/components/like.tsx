import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group, Object3DEventMap } from "three";

function Like() {
  const { scene } = useGLTF(`./like.gltf`);
  const ref = useRef<Group<Object3DEventMap>>(null);
  useFrame(() => {
    ref.current!.rotation!.y += 0.01;
  });
  return (
    <group ref={ref} position={[0, 30, 0]} rotation={[0, 0, 0]}>
      <primitive object={scene} castShadow />
    </group>
  );
}
export default Like;
