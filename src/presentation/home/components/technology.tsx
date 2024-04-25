import { Vector3, useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import gsap from "gsap";
type Props = {
  position?: Vector3;
  onClick: (event: any) => void;
  selected?: boolean;
  path: string;
};

const Technology = ({ position, selected, onClick, path }: Props) => {
  const ref = useRef(null);
  const [hovered, setHover] = useState(false);

  const gltf = useLoader(GLTFLoader, `./${path}`);

  useEffect(() => {
    if (ref.current === null) return;
    if (selected || hovered) {
      gsap.to((ref.current as any).scale, {
        duration: 0.5,
        x: 1.2,
        y: 1.2,
        z: 1.2,
      });
    } else
      gsap.to((ref.current as any).scale, {
        duration: 0.5,
        x: 0.9,
        y: 0.9,
        z: 0.9,
      });
  }, [ref, selected, hovered]);

  useFrame(() => {
    // Asegúrate de que el objeto no sea nulo
    if (ref.current) {
      // Incrementa la rotación en el eje Y
      (ref.current as any).rotation.y += 0.01;
    }
  });
  return (
    <primitive
      ref={ref}
      position={position}
      object={gltf.scene}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onClick={onClick}
      castsShadow
    />
  );
};

export default Technology;
