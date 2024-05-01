import { createContext, useMemo, useRef, useState } from "react";
import { Group, Object3DEventMap } from "three";
import { CameraControls } from "@react-three/drei";

const HomeContext = createContext<{
  background?: string;
  setBackground?: (color: string) => void;
  modelRef?: React.MutableRefObject<Group<Object3DEventMap> | null>;
  cameraControls?: React.MutableRefObject<CameraControls | null>;
}>({});
type ContextProvider = {
  children: React.ReactNode;
};
export const HomeContextProvider = ({ children }: ContextProvider) => {
  const cameraControls = useRef<CameraControls>(null);
  const modelRef = useRef<Group<Object3DEventMap>>(null);
  const [background, setBackground] = useState("transparent");

  const contextValue = useMemo(
    () => ({
      background,
      setBackground,
      cameraControls,
      modelRef,
    }),
    [background, setBackground, modelRef, cameraControls]
  );
  return (
    <HomeContext.Provider value={contextValue}>{children}</HomeContext.Provider>
  );
};

export default HomeContext;
