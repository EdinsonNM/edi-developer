import { Vector3, useFrame, useLoader } from "@react-three/fiber";
import { useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

type Props = {
  position?: Vector3;
  onClick: (event: any) => void;
  selected?: boolean;
  path: string;
};

const Technology = ({ position, onClick, path }: Props) => {
  const ref = useRef(null);
  const [, setHover] = useState(false);

  const gltf = useLoader(GLTFLoader, `./${path}`);

  /*useEffect(() => {
    if (ref.current === null) return;
    if (selected)
      gsap.to(ref.current.scale, { duration: 0.5, x: 1.5, y: 1.5, z: 1.5 });
    else gsap.to(ref.current.scale, { duration: 0.5, x: 1, y: 1, z: 1 });
  }, [ref, selected]);*/

  useFrame(() => {
    // Asegúrate de que el objeto no sea nulo
    if (ref.current) {
      // Incrementa la rotación en el eje Y
      (ref.current as any).rotation.y += 0.01;
    }
  });
  return (
    <primitive
      scale={[1, 1, 1]}
      ref={ref}
      position={position}
      object={gltf.scene}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onClick={onClick}
    />
  );
};

export default Technology;
