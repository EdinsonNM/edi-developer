import { useContext } from "react";
import HomeContext from "../home.context";
import OverlayHome from "./overlay-home";
import OverlayTechnology from "./overlay-technology";

function Overlay() {
  const { page } = useContext(HomeContext);
  return (
    <>
      {page == 0 && <OverlayHome />}
      {page == 1 && <OverlayTechnology />}
    </>
  );
}
export default Overlay;
