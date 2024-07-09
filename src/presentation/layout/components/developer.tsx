import { useAnimations, useCursor, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

export function Developer() {
  const group = useRef(null);
  const [hovered, setHover] = useState(false);
  useCursor(hovered);

  const { scene, animations } = useGLTF(`./models/steve2.glb`);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions["developing"]?.play();
  }, []);
  return (
    <group ref={group} position={[0, -0.2, 0.2]}>
      <primitive
        object={scene}
        castShadow
        onPointerOver={(e: MouseEvent) => {
          e.stopPropagation();
          setHover(true);
        }}
        onPointerOut={(e: MouseEvent) => {
          e.stopPropagation();
          setHover(false);
        }}
      />
    </group>
  );
}
