import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, ScrollControls } from "@react-three/drei";
import Models3D from "./components/models-3d";
import "./home.css";
import Overlay from "./components/overlay";

function Home() {
  return (
    <>
      <div
        className="fixed w-full h-full overflow-hidden pt-40 z-40"
        style={{ pointerEvents: "none" }}
      >
        <h1 className="text-5xl"></h1>
      </div>
      <div className="relative w-full h-full left-0 top-0">
        <Canvas
          gl={{ alpha: true }}
          style={{ background: "transparent" }}
          camera={{
            fov: 45,
            rotation: [0, 0.25 * Math.PI, 0],
            position: [0, 0, 10],
          }}
        >
          <OrbitControls
            enableZoom={false}
            enableRotate={false}
            target={[0, 8, 5]}
          />

          <ScrollControls pages={0} damping={0.25}>
            <Models3D />
            <Overlay />
          </ScrollControls>

          <Environment
            background={false}
            files="environment_4k.hdr"
            path={import.meta.env.VITE_ASSETS}
            backgroundIntensity={0.6}
          />
        </Canvas>
      </div>
    </>
  );
}
export default Home;
