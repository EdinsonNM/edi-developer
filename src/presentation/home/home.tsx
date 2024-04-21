import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { Developer } from "./components/developer";

function Home() {
  const [hovered, setHover] = useState(false);

  return (
    <>
      <div className="relative w-full h-full overflow-hidden"></div>
      <div className="absolute w-full h-full left-0 top-0">
        <Canvas
          camera={{ fov: 45, near: 0.1, far: 200, position: [0, 5, 5] }}
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
        >
          <color attach="background" args={["transparent"]} />
          <OrbitControls />
          <ambientLight intensity={Math.PI / 2} />
          <directionalLight position={[0, 0, 10]} />
          <mesh position={[0, 0, 5]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
          </mesh>
          <Developer />
        </Canvas>
      </div>
    </>
  );
}
export default Home;
