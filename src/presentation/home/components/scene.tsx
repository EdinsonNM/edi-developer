import { CameraControls } from "@react-three/drei";
import HomeLights from "./home-lights";
import HomeContext from "../home.context";
import { Suspense, useContext, useEffect } from "react";
import { HomeAnimationStates } from "../utils/contants";
//import useCameraControlHelper from "../hooks/use-cameracontrol-helper";
import CubeLoader from "@design/atoms/loaders/cube-loader";
import Scenery from "./scenery";
import { Developer } from "./developer";
import Stars from "./stars";
//import useCameraControlHelper from "../hooks/use-cameracontrol-helper";

function Scene() {
  const { cameraControls, changePage } = useContext(HomeContext);

  //useCameraControlHelper();
  useEffect(() => {
    changePage!(HomeAnimationStates.PAGE1, true, false);
  }, []);
  return (
    <>
      <CameraControls
        ref={cameraControls} // disable all mouse buttons
        mouseButtons={{
          left: 0,
          middle: 0,
          right: 0,
          wheel: 0,
        }}
        // disable all touch gestures
        touches={{
          one: 0,
          two: 0,
          three: 0,
        }}
      />
      <HomeLights />
      <Stars />
      <Suspense fallback={<CubeLoader />}>
        <Developer />
        <Scenery />
      </Suspense>
    </>
  );
}
export default Scene;
