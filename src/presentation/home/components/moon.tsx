import { PresentationControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useRef } from "react";
import { KernelSize } from "postprocessing";
import { Group } from "three";

export function MoonScene() {
  const { nodes } = useGLTF("./models/Moon.glb");
  const ref = useRef<Group>(null);
  console.log(nodes);
  useFrame(() => {
    ref.current!.rotation.y += 0.009;
  });
  return (
    <>
      <pointLight
        position={[-3, 0, 0]}
        intensity={100}
        distance={100}
        color={"#ffd700"}
      />
      <directionalLight intensity={15} position={[-3, 2, 1]} color={"grey"} />
      <directionalLight intensity={5} position={[-3, 2, 1]} color="cyan" />

      <group ref={ref} position={[2, 0, -2]}>
        <PresentationControls
          snap
          azimuth={[-Math.PI / 4, Math.PI / 4]}
          polar={[0, 0]}
        >
          <EffectComposer>
            <Bloom
              intensity={0.2}
              mipmapBlur={true}
              kernelSize={KernelSize.VERY_SMALL}
              luminanceThreshold={1} // luminance threshold. Raise this value to mask out darker elements in the scene.
              luminanceSmoothing={0.5}
            />
            {/* <primitive object={scene} />*/}
            <mesh
              geometry={(nodes.Moon as any).geometry}
              castShadow
              receiveShadow
              scale={[0.02, 0.02, 0.02]}
            >
              <meshStandardMaterial
                emissive="cyan"
                emissiveIntensity={0.05}
                toneMapped={false}
              />
            </mesh>
          </EffectComposer>
        </PresentationControls>
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
