import { CameraControls, Environment, Grid } from "@react-three/drei";
import HomeLights from "./home-lights";
import HomeContext from "../home.context";
import { useContext, useEffect } from "react";
import Models3D from "./models-3d";
import { HomeAnimationStates } from "../utils/contants";
//import useCameraControlHelper from "../hooks/use-cameracontrol-helper";

function HomeContent() {
  const { cameraControls, changePage } = useContext(HomeContext);

  //useCameraControlHelper();
  useEffect(() => {
    changePage!(HomeAnimationStates.INTRO, true);
    //cameraControls!.current!.setLookAt(...cameraPositions.intro, false);
  }, []);
  return (
    <>
      <HomeLights />
      <CameraControls ref={cameraControls} />
      <Grid
        cellSize={10}
        cellColor={"#fff"}
        infiniteGrid
        sectionColor={"#f2f2f2"}
        receiveShadow
        visible={true}
      />
      <Models3D />
      {true && <Environment preset="forest" />}
    </>
  );
}
export default HomeContent;
