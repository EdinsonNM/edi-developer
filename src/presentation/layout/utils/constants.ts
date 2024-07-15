import { CameraPositionType } from "./types";

export const cameraPositions: Record<string, CameraPositionType> = {
  page0: [0, 3, -5, 0, 9, 0],
  page1: [0, 3, -25, 0, 9, 0],
  page2: [4, 3, -8, 5, 2.8, -3],
  page3: [-5, 3, 6, 3, 4, 0],
  page4: [-7, 2, -8, -9, 2.8, 0], //printer position
};
export const cameraPositionsResponsive: Record<string, CameraPositionType> = {
  page0: [0, 3, -5, 0, 9, 0],
  page1: [0, 3, -30, 0, 9, 0],
  page2: [6, 3, -5, 1, 3.5, 0],
  page3: [-5, 4, 6, 1, 3, 0],
  page4: [-6, 3, -1, -5, 2.9, 0], //printer position
};

export const HomeAnimationStates = {
  PAGE0: "page0",
  PAGE1: "page1",
  PAGE2: "page2",
  PAGE3: "page3",
  PAGE4: "page4",
};

export const SMALL_SCREEN_THRESHOLD = 768;
