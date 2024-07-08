import { useAnimations, useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Group } from "three";

function Printer3D(props: GroupProps) {
  const ref = useRef<Group>(null);
  const { scene, animations } = useGLTF("./models/printer3D.glb");
  const { actions } = useAnimations(animations, ref);
  useEffect(() => {
    console.log(actions);
    actions["printing"]?.play();
    actions["NurbsPathAction"]?.play();
  }, []);
  return (
    <group ref={ref} {...props}>
      <primitive object={scene} castShadow />
    </group>
  );
}
export default Printer3D;
