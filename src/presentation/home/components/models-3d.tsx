import HomeContext from "../home.context";
import { cameraPositions } from "../utils/contants";
import { Developer } from "./developer";
import Technologies from "./technologies";
import { useContext } from "react";

function Models3D() {
  const { cameraControls, changePage } = useContext(HomeContext);
  const showTechnology = () => {
    cameraControls!.current!.setLookAt(...cameraPositions.technologies, true);
    changePage!(1);
  };
  return (
    <group dispose={null} castShadow>
      <Developer />
      <Technologies onSelect={showTechnology!} />
    </group>
  );
}

export default Models3D;
