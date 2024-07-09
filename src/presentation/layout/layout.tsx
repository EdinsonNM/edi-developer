import { Outlet } from "react-router-dom";
import NavBar from "./components/navbar";
import { LayoutContextProvider } from "@presentation/layout/layout.context";
import { Canvas } from "@react-three/fiber";
import Scene from "./components/scene";

function Layout() {
  return (
    <LayoutContextProvider>
      <div className="h-full w-full flex flex-col text-white">
        <div className="absolute w-full h-full left-0 top-0">
          <Canvas
            gl={{ alpha: true }}
            style={{ background: "#00000a" }}
            camera={{ fov: 45, position: [0, 0, 30] }}
          >
            <Scene />
          </Canvas>
        </div>
        <main className="relative flex flex-col overflow-hidden h-full w-full">
          <NavBar />
          <Outlet />
        </main>
      </div>
    </LayoutContextProvider>
  );
}
export default Layout;
