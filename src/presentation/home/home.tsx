import { Canvas } from "@react-three/fiber";
import Overlay from "./components/overlay";
import HomeContent from "./components/home-content";
import { HomeContextProvider } from "./home.context";
import CubeLoader from "@design/atoms/loaders/cube-loader";
import { Suspense } from "react";
import "./home.css";
import { SMALL_SCREEN_THRESHOLD } from "./utils/contants";

function Home() {
  const initialFog = window.innerWidth > SMALL_SCREEN_THRESHOLD ? 0 : 5;
  return (
    <HomeContextProvider>
      <div className="absolute w-full h-full left-0 top-0">
        <Canvas gl={{ alpha: true }} style={{ background: "#404040" }} shadows>
          <fog attach="fog" args={["#fff", initialFog, 60]} />
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
