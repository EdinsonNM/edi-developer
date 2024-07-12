import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";
import { TextGeometry } from "three/examples/jsm/Addons.js";

extend({ TextGeometry });

type Props = { text: string; weight: number };
function Tag({ weight }: Props) {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    // Animaciones individuales de tags (opcional)
  });

  return (
    <mesh ref={meshRef} scale={[weight / 5, weight / 5, weight / 5]}>
      <textGeometry args={["test", { size: 5, height: 1 }]} />
      <meshBasicMaterial color="white" />
    </mesh>
  );
}
export default Tag;
