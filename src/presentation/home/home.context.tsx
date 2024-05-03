import { createContext, useCallback, useMemo, useRef, useState } from "react";
import { Group, Object3DEventMap } from "three";
import { CameraControls } from "@react-three/drei";
import {
  HomeAnimationStates,
  cameraPositions,
  cameraPositionsResponsive,
} from "./utils/contants";

const HomeContext = createContext<{
  background?: string;
  setBackground?: (color: string) => void;
  modelRef?: React.MutableRefObject<Group<Object3DEventMap> | null>;
  cameraControls?: React.MutableRefObject<CameraControls | null>;
  page: string;
  changePage?: (page: string, changeCamera?: boolean) => void;
}>({ page: HomeAnimationStates.INTRO });
type ContextProvider = {
  children: React.ReactNode;
};

const SMALL_SCREEN_THRESHOLD = 768;
export const HomeContextProvider = ({ children }: ContextProvider) => {
  const cameraControls = useRef<CameraControls>(null);
  const modelRef = useRef<Group<Object3DEventMap>>(null);
  const [background, setBackground] = useState("transparent");
  const [page, setPage] = useState(HomeAnimationStates.INTRO);
  const changePage = useCallback(
    (page: string, changeCamera: boolean = false) => {
      setPage(page);
      if (changeCamera) {
        if (window.innerWidth > SMALL_SCREEN_THRESHOLD) {
          cameraControls!.current!.setLookAt(...cameraPositions[page], true);
        } else {
          cameraControls!.current!.setLookAt(
            ...cameraPositionsResponsive[page],
            true
          );
        }
      }
    },
    []
  );
  const contextValue = useMemo(
    () => ({
      background,
      setBackground,
      cameraControls,
      modelRef,
      page,
      changePage,
    }),
    [background, setBackground, modelRef, cameraControls, page, changePage]
  );
  return (
    <HomeContext.Provider value={contextValue}>{children}</HomeContext.Provider>
  );
};

export default HomeContext;
