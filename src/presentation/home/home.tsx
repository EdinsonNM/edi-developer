import { Canvas } from "@react-three/fiber";
import { Grid, ScrollControls } from "@react-three/drei";
import Models3D from "./components/models-3d";
import "./home.css";
import Overlay from "./components/overlay";

function Home() {
  return (
    <>
      <div className="relative w-full h-full left-0 top-0">
        <Canvas
          gl={{ alpha: true }}
          style={{ background: "transparent" }}
          camera={{
            fov: 55,
            rotation: [Math.PI * 0.3, 0, 0],
            position: [0, 1, 11],
          }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[0, 0, 10]} intensity={1} />
          <directionalLight
            position={[10, 0, 0]}
            intensity={1}
            color={"#fff"}
            castShadow
          />

          <ScrollControls pages={0} damping={0.25}>
            <Models3D />
            <Overlay />
          </ScrollControls>
        </Canvas>
      </div>
    </>
  );
}
export default Home;
