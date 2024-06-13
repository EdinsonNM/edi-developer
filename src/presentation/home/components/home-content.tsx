import {
  CameraControls,
  Environment,
  Grid,
  Scroll,
  ScrollControls,
  useScroll,
} from "@react-three/drei";
import HomeLights from "./home-lights";
import HomeContext from "../home.context";
import { Suspense, useContext, useEffect } from "react";
import { HomeAnimationStates } from "../utils/contants";
//import useCameraControlHelper from "../hooks/use-cameracontrol-helper";
import Overlay from "./overlay";
import { Developer } from "./developer";
import CubeLoader from "@design/atoms/loaders/cube-loader";
import Tools from "./tools";
import Like from "./like";

function HomeContent() {
  const { cameraControls, changePage } = useContext(HomeContext);

  //useCameraControlHelper();
  useEffect(() => {
    changePage!(HomeAnimationStates.INTRO, true, false);
  }, []);
  return (
    <>
      <HomeLights />

      <Grid
        cellSize={10}
        cellColor={"#454545"}
        infiniteGrid
        sectionColor={"#454545"}
        receiveShadow
        visible={true}
      />
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
      <ScrollControls pages={4} damping={0.5}>
        <Suspense fallback={<CubeLoader />}>
          <Developer />
        </Suspense>
        <Overlay />
        <Tools />
        <Like />
      </ScrollControls>
      {true && <Environment files="golden_bay_4k.hdr" />}
    </>
  );
}
export default HomeContent;
