import { CameraPositionType, TechnologyProps } from "./types";

export const cameraPositions: Record<string, CameraPositionType> = {
  intro: [
    -0.8674828091252058, 7.953172998609297, 27.47421202330153,
    -7.091858367972971, 3.7395137325111807, -6.403057703060331,
  ],
  left: [
    -10.654760009379736, 5.723834690616799, 33.09753610439359,
    6.347388397742024, 4.733476340199184, 5.953497828026646,
  ],
  developer: [
    0.252336625927797, 5.290214563322906, 17.31316764365831,
    -0.08397356126678833, 0.6364447722187185, -4.053039656924131,
  ],

  technologies: [
    0, -2.0494939280968687, 12.01480182811428, 0, 16.99683584385875,
    -0.005013850705081101,
  ],
  right: [
    17.524970207760415, 9.833432547414933, 23.413489007014533,
    -14.210747784613151, 2.7270525784921893, 0.11247692880672826,
  ],
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
