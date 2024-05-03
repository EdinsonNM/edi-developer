import { Canvas } from "@react-three/fiber";
import Overlay from "./components/overlay";
import HomeContent from "./components/home-content";
import { HomeContextProvider } from "./home.context";
import CubeLoader from "@design/atoms/loaders/cube-loader";
import { Suspense } from "react";
import "./home.css";

function Home() {
  return (
    <HomeContextProvider>
      <div className="absolute w-full h-full left-0 top-0">
        <Canvas
          gl={{ alpha: true }}
          style={{ background: "transparent" }}
          shadows
        >
          <fog attach="fog" args={["#fff", 30, 60]} />
          <Suspense fallback={<CubeLoader />}>
            <HomeContent />
          </Suspense>{" "}
        </Canvas>
      </div>
      <Overlay />
    </HomeContextProvider>
  );
}
export default Home;
