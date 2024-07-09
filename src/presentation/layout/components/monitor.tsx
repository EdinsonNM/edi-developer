import { useVideoTexture } from "@react-three/drei";

function Monitor() {
  const videoTexture = useVideoTexture("./videos/code.mov");

  return (
    <>
      <mesh
        rotation={[0, Math.PI, 0]}
        position={[0.5, 1.5, 1.6]}
        scale={[0.08, 0.08, 0.4]}
      >
        <planeGeometry args={[16, 9, 1]} />
        <meshBasicMaterial map={videoTexture} />
      </mesh>
      <pointLight position={[-0.62, 0.92, 0.13]} color={"green"} />
    </>
  );
}

export default Monitor;
