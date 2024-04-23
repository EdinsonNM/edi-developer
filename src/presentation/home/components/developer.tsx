import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function Developer() {
  const gltf = useLoader(
    GLTFLoader,
    `${import.meta.env.VITE_ASSETS}developer.gltf`
  );
  return <primitive object={gltf.scene} />;
}
