import { CameraPositionType, TechnologyProps } from "./types";

export const cameraPositions: Record<string, CameraPositionType> = {
  page0: [0, 3, -5, 0, 9, 0],
  page1: [0, 3, -25, 0, 9, 0],
  page2: [6, 3, -5, 3, 2, 0],
  page3: [-5, 4, 6, 3, 0, 0],
  page4: [-6, 3, -1, -4, 2.5, 0], //printer position
};
export const cameraPositionsResponsive: Record<string, CameraPositionType> = {
  page0: [0, 3, -5, 0, 9, 0],
  page1: [0, 3, -30, 0, 9, 0],
  page2: [6, 3, -10, 2, 2, 0],
  page3: [-5, 4, 6, 1, 0, 0],
  page4: [-6, 3, -1, -5, 2.5, 0], //printer position
};
export const technologies: TechnologyProps[] = [
  { key: "reactjs", path: "react.gltf", name: "React JS", color: "#61dafb43" },
  {
    key: "javascript",
    path: "js.gltf",
    name: "Javascript",
    color: "#f0db4f43",
  },
  {
    key: "flutter",
    path: "flutter.gltf",
    name: "flutter",
    color: "#02569b43",
  },
  { key: "node", path: "node.gltf", name: "node", color: "#8cc84b43" },
  { key: "ts", path: "ts.gltf", name: "ts", color: "#007acc43" },
  { key: "ang", path: "angular.gltf", name: "angular", color: "#dd003143" },
  { key: "three", path: "threejs.gltf", name: "threejs", color: "#85006d43" },
  { key: "gmaps", path: "gmaps.gltf", name: "gmaps", color: "#4285f443" },
  {
    key: "blender",
    path: "blender.gltf",
    name: "blender",
    color: "#f5792a22",
  },
];
export const HomeAnimationStates = {
  PAGE0: "page0",
  PAGE1: "page1",
  PAGE2: "page2",
  PAGE3: "page3",
  PAGE4: "page4",
};

export const SMALL_SCREEN_THRESHOLD = 768;
