import { Html, useAnimations, useCursor, useGLTF } from "@react-three/drei";
import { useContext, useState } from "react";
import HomeContext from "../home.context";
import { HomeAnimationStates } from "../utils/contants";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
export function Developer() {
  const [hovered, setHover] = useState(false);
  useCursor(hovered);

  const { page } = useContext(HomeContext);
  const { scene, animations } = useGLTF(`./optimize developer.gltf`);
  const { changePage } = useContext(HomeContext);
  const data = useAnimations(animations);
  console.log(data);
  const onSelectDeveloper = () => {
    if (page === HomeAnimationStates.INTRO) {
      changePage!(HomeAnimationStates.DEVELOPER, true);
    }
  };

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
    <group>
      <primitive
        object={scene}
        castShadow
        onClick={onSelectDeveloper}
        onTouchStart={onSelectDeveloper}
        onPointerOver={(e: MouseEvent) => {
          e.stopPropagation();
          setHover(true);
        }}
        onPointerOut={(e: MouseEvent) => {
          e.stopPropagation();
          setHover(false);
        }}
      />

      {page !== HomeAnimationStates.SELECTEDTECH && (
        <Html center position={[0, -10, 0]} className="w-[250px] md:w-[500px]">
          <h1 className="text-3xl font-bold text-yellow-400">
            Bienvenido{" "}
            <span className="hidden md:inline-block">a Mi Mundo Digital</span>
          </h1>
          <h2>Descubre Mi Pasión por la Tecnología y Más Allá</h2>

          {page === HomeAnimationStates.INTRO && (
            <a
              onClick={onSelectDeveloper}
              className="mt-4 inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
              Conéctate conmigo
            </a>
          )}
          {page === HomeAnimationStates.DEVELOPER && (
            <p className="text-sm text-gray-400">
              Selecciona un cubo para conocer más sobre mi experiencia
            </p>
          )}
        </Html>
      )}
    </group>
  );
}
