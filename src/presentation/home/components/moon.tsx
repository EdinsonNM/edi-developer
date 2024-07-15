import { PresentationControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useEffect, useRef, useState } from "react";
import { KernelSize, Resolution } from "postprocessing";
import { DirectionalLight, Group } from "three";

export function MoonScene() {
  const [hovered, hover] = useState(false);

  const { nodes } = useGLTF("./models/Moon.glb");
  const ref = useRef<Group>(null);
  console.log(nodes);
  useFrame(() => {
    ref.current!.rotation.y += 0.009;
  });

  const lightRef = useRef<DirectionalLight>(null);

  useEffect(() => {
    if (lightRef.current) {
      lightRef.current.target.position.set(-8, 10, 10);
      lightRef.current.target.updateMatrixWorld();
    }
  }, []);
  return (
    <>
      <directionalLight
        ref={lightRef}
        color={"#C0C0C0"}
        position={[0, 50, -30]}
        intensity={5}
      />
      <group ref={ref} position={[-8, 10, 10]}>
        <EffectComposer enableNormalPass={false}>
          {/* <primitive object={scene} />*/}
          <PresentationControls snap polar={[0, 0]}>
            <mesh
              onPointerOver={() => hover(true)}
              onPointerOut={() => hover(false)}
              castShadow
              scale={[0.07, 0.07, 0.07]}
              geometry={(nodes["Moon"] as any).geometry}
            >
              <meshStandardMaterial
                emissive="cyan"
                emissiveIntensity={hovered ? 0.4 : 0.1}
                color={"#fff"}
              />
            </mesh>
          </PresentationControls>
          <Bloom
            intensity={0.1}
            dithering
            levels={6}
            mipmapBlur
            kernelSize={KernelSize.LARGE}
            resolutionX={Resolution.AUTO_SIZE} // The horizontal resolution.
            resolutionY={Resolution.AUTO_SIZE} // The vertical resolution.
          ></Bloom>
        </EffectComposer>
      </group>
    </>
  );
}
function Moon() {
  return (
    <Canvas
      className="w-full h-full"
      camera={{ position: [0, 0, 6], fov: 45 }}
      shadows
    >
      <MoonScene />
    </Canvas>
  );
}
export default Moon;
