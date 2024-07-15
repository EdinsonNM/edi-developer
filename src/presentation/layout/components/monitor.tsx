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
      <pointLight position={[1, 2, 1]} color={"red"} intensity={10} />
    </>
  );
}

export default Monitor;
