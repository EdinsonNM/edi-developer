import { Canvas } from "@react-three/fiber";
import { HomeContextProvider } from "./home.context";
import "./home.css";
import Scene from "./components/scene";

function Home() {
  return (
    <HomeContextProvider>
      <div className="absolute w-full h-full left-0 top-0">
        <Canvas
          gl={{ alpha: true }}
          style={{ background: "#00000a" }}
          camera={{ fov: 45, position: [0, 0, 30] }}
        >
          <Scene />
        </Canvas>
      </div>
    </HomeContextProvider>
  );
}
export default Home;
