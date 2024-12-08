import { Outlet } from "react-router-dom";
import NavBar from "./components/navbar";
import { LayoutContextProvider } from "@presentation/layout/layout.context";
import { Canvas } from "@react-three/fiber";
import Scene from "./components/scene";
import { Physics } from "@react-three/rapier";
import { Html, Scroll, ScrollControls } from "@react-three/drei";
import OverlayHome from "@presentation/home/home";
import Technology from "@presentation/technology/technology";
import Experience from "@presentation/experience/experience";
import Scenary from "@presentation/scenary/scenary";

function Layout() {
  return (
    <LayoutContextProvider>
      <div className="h-full w-full flex flex-col text-white">
        <Scenary /> 
        <NavBar />
        <Outlet />
      </div>
    </LayoutContextProvider>
  );
}
export default Layout;
