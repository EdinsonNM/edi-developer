import { CameraPositionType, TechnologyProps } from "./types";

export const cameraPositions: Record<string, CameraPositionType> = {
  intro: [0, 3, -25, 0, 9, 0],
  left: [12, 4, -5, 0, 3, 0],
  developer: [12, 4, -7, 3, 1, 0],

  technologies: [-5, 4, 6, 3, 0, 0],
  right: [-6, 3, -1, -5, 2.5, 0], //printer position
};
export const cameraPositionsResponsive: Record<string, CameraPositionType> = {
  intro: [
    2.1583460110983212, 11.53091277798614, 25.78159870887731,
    -1.519522624555155, 17.87554329337756, -13.431393050371469,
  ],
  left: [
    2.1583460110983212, 11.53091277798614, 25.78159870887731,
    -1.519522624555155, 17.87554329337756, -13.431393050371469,
  ],
  developer: [
    -0.3421222150656285, 3.7217162428370205, 20.45188358964041,
    -0.08397356126678833, 0.6364447722187185, -4.053039656924131,
  ],
  technologies: [
    2.1583460110983212, 11.53091277798614, 25.78159870887731,
    -1.519522624555155, 17.87554329337756, -13.431393050371469,
  ],
  right: [
    2.1583460110983212, 11.53091277798614, 25.78159870887731,
    -1.519522624555155, 17.87554329337756, -13.431393050371469,
  ],
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
  INTRO: "intro",
  LEFT: "left",
  RIGHT: "right",
  DEVELOPER: "developer",
  TECHNOLOGIES: "technologies",
  SELECTEDTECH: "technologies",
};

export const SMALL_SCREEN_THRESHOLD = 768;
