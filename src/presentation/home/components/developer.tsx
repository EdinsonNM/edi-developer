import { useGLTF } from "@react-three/drei";

export function Developer() {
  const gltf = useGLTF(`./developer.gltf`);
  console.log(gltf);
  return <primitive object={gltf.scene} castShadow />;
}
