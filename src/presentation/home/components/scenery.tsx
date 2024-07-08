import { Gltf } from "@react-three/drei";

function Scenery() {
  return <Gltf src="./models/scene.glb" receiveShadow />;
}
export default Scenery;
