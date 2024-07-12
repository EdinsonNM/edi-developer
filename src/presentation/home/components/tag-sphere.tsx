import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import Tag from "./tag";

type Props = {
  tagsData: { text: string; weight: number }[];
};

function Scene({ tagsData }: Props) {
  const sphereRef = useRef<Mesh>(null);

  useFrame(() => {
    // Animación de rotación (opcional)
    sphereRef.current!.rotation.y += 0.005;
  });

  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <mesh ref={sphereRef}>
        <sphereGeometry args={[5, 32, 32]} />
        <meshBasicMaterial color="lightblue" />
        {tagsData.map((tagData) => (
          <Tag key={tagData.text} {...tagData} />
        ))}
      </mesh>
    </>
  );
}
function TagSphere({ tagsData = [] }: Props) {
  return (
    <Canvas>
      <Scene tagsData={tagsData} />
    </Canvas>
  );
}
export default TagSphere;
