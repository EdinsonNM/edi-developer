import { createContext, useCallback, useMemo, useRef, useState } from "react";
import { Group, Object3DEventMap } from "three";
import { CameraControls } from "@react-three/drei";
import {
  HomeAnimationStates,
  SMALL_SCREEN_THRESHOLD,
  cameraPositions,
  cameraPositionsResponsive,
} from "./utils/constants";
import useDarkMode from "@presentation/utils/use-dark-mode";

const LayoutContext = createContext<{
  background?: string;
  setBackground?: (color: string) => void;
  modelRef?: React.MutableRefObject<Group<Object3DEventMap> | null>;
  cameraControls?: React.MutableRefObject<CameraControls | null>;
  page: string;
  changePage?: (
    page: string,
    changeCamera?: boolean,
    includeAnimation?: boolean
  ) => void;
  isDark?: boolean;
  toggleDarkMode?: () => void;
}>({ page: HomeAnimationStates.PAGE1 });
type ContextProvider = {
  children: React.ReactNode;
};

export const LayoutContextProvider = ({ children }: ContextProvider) => {
  const { isDark, toggleDarkMode } = useDarkMode();
  const cameraControls = useRef<CameraControls>(null);
  const modelRef = useRef<Group<Object3DEventMap>>(null);
  const [background, setBackground] = useState("transparent");
  const [page, setPage] = useState(HomeAnimationStates.PAGE0);
  const changePage = useCallback(
    (page: string, changeCamera: boolean = false, includeAnimation = true) => {
      setPage(page);
      if (changeCamera) {
        if (window.innerWidth > SMALL_SCREEN_THRESHOLD) {
          cameraControls!.current!.setLookAt(
            ...cameraPositions[page],
            includeAnimation
          );
        } else {
          cameraControls!.current!.setLookAt(
            ...cameraPositionsResponsive[page],
            includeAnimation
          );
        }
      }
    },
    []
  );
  // Memoizar setBackground para evitar recrearlo
  const memoizedSetBackground = useCallback((color: string) => {
    setBackground(color);
  }, []);

  const contextValue = useMemo(
    () => ({
      background,
      setBackground: memoizedSetBackground,
      cameraControls,
      modelRef,
      page,
      changePage,
      isDark,
      toggleDarkMode,
    }),
    [
      background,
      memoizedSetBackground,
      page,
      changePage,
      isDark,
      toggleDarkMode,
      // cameraControls y modelRef son refs, no necesitan estar en dependencias
      // pero los incluimos para mantener la referencia estable
    ]
  );
  return (
    <LayoutContext.Provider value={contextValue}>
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutContext;
