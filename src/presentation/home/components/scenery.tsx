import { Gltf } from "@react-three/drei";
import Monitor from "./monitor";

function Scenery() {
  return (
    <group>
      <Gltf src="./models/scene.glb" receiveShadow />
      <Monitor />
    </group>
  );
}
export default Scenery;
