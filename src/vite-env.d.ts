/// <reference types="vite/client" />
import { extend, Object3DNode } from "@react-three/fiber";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
extend({ TextGeometry });

declare module "three/examples/jsm/loaders/GLTFLoader" {
  const GLTFLoader: any;
  export { GLTFLoader };
}

declare module "@react-three/fiber" {
  interface ThreeElements {
    textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>;
  }
}
