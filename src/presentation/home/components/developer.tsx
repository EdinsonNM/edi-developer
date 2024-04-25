import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function Developer() {
  const gltf = useLoader(GLTFLoader, `./developer.gltf`);
  return <primitive object={gltf.scene} castShadow />;
}
