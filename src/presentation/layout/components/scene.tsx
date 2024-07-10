import { CameraControls } from "@react-three/drei";
import Lights from "./lights";
import LayoutContext from "../layout.context";
import { Suspense, useContext, useEffect } from "react";
import CubeLoader from "@design/atoms/loaders/cube-loader";
import Scenery from "./scenery";
import { Developer } from "./developer";
import Stars from "./stars";
import Printer3D from "./printer3d";
import { useLocation } from "react-router-dom";
//import useCameraControlHelper from "../hooks/use-cameracontrol-helper";

function Scene() {
  const { cameraControls, changePage } = useContext(LayoutContext);

  //useCameraControlHelper();
  let location = useLocation();

  useEffect(() => {
    const page = location.pathname.substring(1);
    changePage!(page, true, true);
  }, [location]);
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
        azimuthAngle={Math.PI / 4}
      />
      <Lights />
      <Stars />
      <Suspense fallback={<CubeLoader />}>
        <Developer />
        <Scenery />
        <Printer3D
          position={[-4.2, 1.7, 1]}
          scale={[0.6, 0.6, 0.6]}
          rotation={[0, Math.PI, 0]}
        />
      </Suspense>
    </>
  );
}
export default Scene;
