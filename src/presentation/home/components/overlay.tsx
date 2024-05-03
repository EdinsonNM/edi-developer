import { useContext } from "react";
import HomeContext from "../home.context";
import OverlayHome from "./overlay-home";
import OverlayTechnology from "./overlay-technology";
import { HomeAnimationStates } from "../utils/contants";

function Overlay() {
  const { page } = useContext(HomeContext);
  return (
    <>
      {page == HomeAnimationStates.INTRO && <OverlayHome />}
      {page == HomeAnimationStates.SELECTEDTECH && <OverlayTechnology />}
    </>
  );
}
export default Overlay;
