import OverlayTechnology from "./overlay-technology";
import OverlayHome from "./overlay-home";
import { Scroll, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useContext } from "react";
import HomeContext from "../home.context";
import { HomeAnimationStates } from "../utils/contants";
import OverlayExperience from "./overlay-experience";
import OverlayStore from "./overlay-store";
import { roundTo } from "@core/utils/math";

function Overlay() {
  const scroll = useScroll();

  const { changePage } = useContext(HomeContext);
  console.log(scroll.offset);

  const handleScroll = () => {
    const offset = roundTo(scroll.offset, 2);
    if (offset > 0.75) {
      changePage!(HomeAnimationStates.RIGHT, true, true);
      return;
    }
    if (offset > 0.5) {
      changePage!(HomeAnimationStates.TECHNOLOGIES, true, true);
      return;
    }

    if (offset > 0.25) {
      changePage!(HomeAnimationStates.LEFT, true, true);
      return;
    }

    changePage!(HomeAnimationStates.INTRO, true, true);
  };
  useFrame(() => {
    handleScroll();
  });

  return (
    <Scroll html>
      <OverlayHome />
      <OverlayTechnology />
      <OverlayExperience />
      <OverlayStore />
    </Scroll>
  );
}
export default Overlay;
