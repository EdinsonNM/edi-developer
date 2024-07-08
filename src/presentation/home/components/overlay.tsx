import OverlayTechnology from "./overlay-technology";
import OverlayHome from "./overlay-home";
import { Html, Scroll, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useContext } from "react";
import HomeContext from "../home.context";
import { HomeAnimationStates } from "../utils/contants";
import OverlayExperience from "./overlay-experience";
import OverlayStore from "./overlay-store";
import { roundTo } from "@core/utils/math";
import { Outlet } from "react-router-dom";

function Overlay() {
  return <Outlet />;
}
export default Overlay;
