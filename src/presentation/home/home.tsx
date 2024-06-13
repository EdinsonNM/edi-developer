import { Canvas } from "@react-three/fiber";
import HomeContent from "./components/home-content";
import { HomeContextProvider } from "./home.context";
import "./home.css";

function Home() {
  return (
    <HomeContextProvider>
      <div className="absolute w-full h-full left-0 top-0">
        <Canvas
          gl={{ alpha: true }}
          style={{ background: "transparent" }}
          camera={{ fov: 45, position: [0, 0, 30] }}
        >
          <HomeContent />
        </Canvas>
      </div>
    </HomeContextProvider>
  );
}
export default Home;
