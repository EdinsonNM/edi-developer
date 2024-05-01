import { Vector3, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Html, useCursor, useGLTF } from "@react-three/drei";
import { Group, Object3DEventMap } from "three";
type Props = {
  position?: Vector3;
  onClick: (event: any) => void;
  selected?: boolean;
  path: string;
  name: string;
};

const Technology = ({ position, selected, onClick, name, path }: Props) => {
  const ref = useRef<Group<Object3DEventMap>>(null);
  const [hovered, setHover] = useState(false);
  const gltf = useGLTF(`./${path}`);
  useCursor(hovered);
  useEffect(() => {
    if (ref.current === null) return;

    if (hovered)
      gsap.to((ref.current as any).scale, {
        duration: 0.5,
        x: 0.8,
        y: 0.8,
        z: 0.8,
      });
    else
      gsap.to((ref.current as any).scale, {
        duration: 0.5,
        x: 0.7,
        y: 0.7,
        z: 0.7,
      });

    if (selected)
      gsap.to((ref.current as any).scale, {
        duration: 0.5,
        x: 1,
        y: 1,
        z: 1,
      });
  }, [ref, selected, hovered]);

  useFrame(() => {
    // Asegúrate de que el objeto no sea nulo
    if (ref.current) {
      // Incrementa la rotación en el eje Y
      (ref.current as any).rotation.y += 0.005;
    }
  });
  console.log("Technology", name, gltf);
  return (
    <group ref={ref} position={position}>
      <Html occlude>
        <div className="mt-2">{name}</div>
      </Html>
      <primitive
        object={gltf.scene}
        onPointerOver={(e: MouseEvent) => {
          e.stopPropagation();
          setHover(true);
        }}
        onPointerOut={(e: MouseEvent) => {
          e.stopPropagation();
          setHover(false);
        }}
        onClick={onClick}
        castsShadow
      />
    </group>
  );
};

export default Technology;
