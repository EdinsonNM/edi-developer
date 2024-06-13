import { useAnimations, useCursor, useGLTF } from "@react-three/drei";
import { useRef, useState } from "react";

import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
export function Developer() {
  const ref = useRef(null);
  const [hovered, setHover] = useState(false);
  useCursor(hovered);

  const { scene, animations } = useGLTF(`./optimize developer.gltf`);

  let mixer: any;
  if (animations.length) {
    mixer = new THREE.AnimationMixer(scene);
    animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.play();
    });
  }

  useFrame((_, delta) => {
    mixer?.update(delta);
  });
  return (
    <group ref={ref}>
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
