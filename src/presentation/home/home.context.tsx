import { createContext, useCallback, useMemo, useRef, useState } from "react";
import { Group, Object3DEventMap } from "three";
import { CameraControls } from "@react-three/drei";

const HomeContext = createContext<{
  background?: string;
  setBackground?: (color: string) => void;
  modelRef?: React.MutableRefObject<Group<Object3DEventMap> | null>;
  cameraControls?: React.MutableRefObject<CameraControls | null>;
  page: number;
  changePage: (page: number) => void;
}>({});
type ContextProvider = {
  children: React.ReactNode;
};
export const HomeContextProvider = ({ children }: ContextProvider) => {
  const cameraControls = useRef<CameraControls>(null);
  const modelRef = useRef<Group<Object3DEventMap>>(null);
  const [background, setBackground] = useState("transparent");
  const [page, setPage] = useState(0);
  const changePage = useCallback((page: number) => setPage(page), []);
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
