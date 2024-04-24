import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, ScrollControls } from "@react-three/drei";
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
          <ScrollControls pages={0} damping={0.25}>
            <Models3D />
            <Overlay />
          </ScrollControls>

          <Environment
            background={false}
            files="environment_4k.hdr"
            path={import.meta.env.VITE_ASSETS}
            backgroundIntensity={0.2}
            environmentIntensity={0.4}
          />
        </Canvas>
      </div>
    </>
  );
}
export default Home;
