import { button, useControls } from "leva";
import HomeContext from "../home.context";
import { useContext } from "react";
import { Vector3 } from "three";

function useCameraControlHelper() {
  const { cameraControls } = useContext(HomeContext);
  useControls("Helper", {
    getLookAt: button(() => {
      const position = cameraControls!.current!.getPosition(new Vector3());
      const target = cameraControls!.current!.getTarget(new Vector3());
      console.log([...position, ...target]);
    }),
  });
}
export default useCameraControlHelper;
