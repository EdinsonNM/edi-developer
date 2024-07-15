import { Gltf } from "@react-three/drei";
import Monitor from "./monitor";
import { RigidBody } from "@react-three/rapier";

function Scenery() {
  return (
    <group>
      <RigidBody type="fixed">
        <Gltf src="./models/scene.glb" receiveShadow />
        <Monitor />
      </RigidBody>
    </group>
  );
}
export default Scenery;
