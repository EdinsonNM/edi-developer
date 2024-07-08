import { CameraControls, ScrollControls, Stars } from "@react-three/drei";
import HomeLights from "./home-lights";
import HomeContext from "../home.context";
import { Suspense, useContext, useEffect } from "react";
import { HomeAnimationStates } from "../utils/contants";
//import useCameraControlHelper from "../hooks/use-cameracontrol-helper";
import Overlay from "./overlay";
import CubeLoader from "@design/atoms/loaders/cube-loader";
import Scenery from "./scenery";
import { Developer } from "./developer";

function HomeContent() {
  const { cameraControls, changePage } = useContext(HomeContext);

  //useCameraControlHelper();
  useEffect(() => {
    changePage!(HomeAnimationStates.INTRO, true, false);
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
      <ScrollControls pages={2}>
        <Suspense fallback={<CubeLoader />}>
          <Developer />
          <Scenery />
        </Suspense>
        <Overlay />
      </ScrollControls>
    </>
  );
}
export default HomeContent;
