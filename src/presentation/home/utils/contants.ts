import { CameraPositionType, TechnologyProps } from "./types";

export const cameraPositions: Record<string, CameraPositionType> = {
  intro: [
    0, 2.4098937949259884, 9.200557870727359, 0, 16.99683584385875,
    -0.005013850705081101,
  ],
  developer: [
    0, 7.023166159939146, 16.931015159263005, 0, 2.8658267295271185,
    -4.539942459865414,
  ],

  technologies: [
    -14.523654996161131, 5.446598781359635, 13.472883454830743,
    8.961658575728134, 1.6577715783944247, 7.296601928950036,
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
