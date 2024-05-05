import { CameraPositionType, TechnologyProps } from "./types";

export const cameraPositions: Record<string, CameraPositionType> = {
  intro: [
    0.8133914681622187, 13.053940359807834, 52.95768429114342,
    -0.08397356126678833, 0.6364447722187185, -4.053039656924131,
  ],

  developer: [
    0.252336625927797, 5.290214563322906, 17.31316764365831,
    -0.08397356126678833, 0.6364447722187185, -4.053039656924131,
  ],

  technologies: [
    0, 2.4098937949259884, 9.200557870727359, 0, 16.99683584385875,
    -0.005013850705081101,
  ],
};
export const cameraPositionsResponsive: Record<string, CameraPositionType> = {
  intro: [
    0.8901488787197959, 14.116088733831234, 57.834178695043875,
    -0.08397356126678833, 0.6364447722187185, -4.053039656924131,
  ],
  developer: [
    -0.3421222150656285, 3.7217162428370205, 20.45188358964041,
    -0.08397356126678833, 0.6364447722187185, -4.053039656924131,
  ],
  technologies: [
    0, -1.3888580904037795, 12.5065139318218, 0, 19.53492597783932,
    4.025931745379569,
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
  DEVELOPER: "developer",
  TECHNOLOGIES: "technologies",
  SELECTEDTECH: "technologies",
};

export const SMALL_SCREEN_THRESHOLD = 768;
