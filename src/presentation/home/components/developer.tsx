import { Html, useGLTF } from "@react-three/drei";
import { useContext } from "react";
import HomeContext from "../home.context";
import { HomeAnimationStates } from "../utils/contants";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
export function Developer() {
  const { page } = useContext(HomeContext);
  const { scene, animations } = useGLTF(`./optimize developer.gltf`);

  const onSelectDeveloper = () => {
    if (page === HomeAnimationStates.INTRO) {
      //changePage!(HomeAnimationStates.DEVELOPER);
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
      <primitive object={scene} castShadow onClick={onSelectDeveloper} />

      {page !== HomeAnimationStates.SELECTEDTECH && (
        <Html center position={[0, -6, 0]} className="w-[250px] md:w-[500px]">
          <h1 className="text-3xl font-bold">
            Bienvenido{" "}
            <span className="hidden md:inline-block">a Mi Mundo Digital</span>
          </h1>
          <h2>Descubre Mi Pasión por la Tecnología y Más Allá</h2>

          <a
            href="#/contacto"
            className="mt-4 inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Conéctate conmigo
          </a>
        </Html>
      )}
    </group>
  );
}
