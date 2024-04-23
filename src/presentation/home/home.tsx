import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  Scroll,
  ScrollControls,
} from "@react-three/drei";
import Models3D from "./components/models-3d";
import "./home.css";

function Home() {
  const showDeveloper = () => {};

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
          camera={{ position: [0, 0, 15], fov: 45 }}
        >
          <OrbitControls enableZoom={false} enableRotate={false} />
          <ambientLight intensity={0.1} />
          <directionalLight position={[0, 0, 10]} />

          <ScrollControls pages={2} damping={0.25}>
            <Models3D />
            <Scroll html>
              <div
                id="scroll-container"
                className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden pb-32"
                style={{ pointerEvents: "auto" }}
              >
                <h1 className="block text-5xl">Hello World</h1>
                <div className="block">
                  <a className="arrow scrolly" onClick={showDeveloper}></a>
                </div>
              </div>{" "}
              <div className="h-screen w-screen flex justify-end items-end">
                aaa
              </div>
              <div id="destino"></div>
            </Scroll>
          </ScrollControls>

          <Environment
            background={false}
            files="environment_4k.hdr"
            path="/edi-developer/"
            backgroundIntensity={0.2}
          />
        </Canvas>{" "}
      </div>
    </>
  );
}
export default Home;
