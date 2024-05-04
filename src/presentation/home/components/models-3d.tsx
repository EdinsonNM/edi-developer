import TechLoader from "@design/atoms/loaders/tech-loader";
import HomeContext from "../home.context";
import { HomeAnimationStates } from "../utils/contants";
import { Developer } from "./developer";
import Technologies from "./technologies";
import { Suspense, useContext, useEffect } from "react";
import Insect from "./insect";

function Models3D() {
  const { changePage, page } = useContext(HomeContext);
  const showTechnology = () => {
    //cameraControls!.current!.setLookAt(...cameraPositions.technologies, true);
    changePage!(HomeAnimationStates.SELECTEDTECH);
  };
  useEffect(() => {
    setTimeout(() => {}, 3000);
  }, []);
  return (
    <group dispose={null} castShadow>
      <Developer />
      <Insect />
      {page !== HomeAnimationStates.INTRO && (
        <Suspense fallback={<TechLoader />}>
          <Technologies onSelect={showTechnology!} />
        </Suspense>
      )}
    </group>
  );
}

export default Models3D;
