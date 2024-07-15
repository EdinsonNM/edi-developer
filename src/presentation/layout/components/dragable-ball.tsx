import { useRef, useState } from "react";
import { Gltf } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { BallCollider, RigidBody } from "@react-three/rapier";

const DraggableBall = () => {
  const ballRef = useRef<any>(null);

  const [isDragging, setIsDragging] = useState(false);
  const { raycaster, mouse, camera, scene } = useThree();

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    setIsDragging(true);
  };

  const handlePointerUp = (e: any) => {
    e.stopPropagation();
    setIsDragging(false);
  };

  const handlePointerMove = () => {
    if (isDragging) {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(scene, true);
      if (intersects.length > 0) {
        const intersect = intersects[0];
        if (ballRef.current) {
          const newPos = intersect.point;
          ballRef.current.setTranslation(
            { x: newPos.x, y: newPos.y, z: ballRef.current.position.z },
            true
          );
        }
      }
    }
  };

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (ballRef.current) {
      // Aplicar un impulso hacia arriba al hacer clic
      ballRef.current.applyImpulse({ x: 0, y: 5, z: 0 }, true);
    }
  };

  return (
    <group
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onClick={handleClick}
    >
      <RigidBody
        ref={ballRef}
        type="dynamic"
        colliders="trimesh"
        position={[2, 9, -2]}
        gravityScale={0.8}
        restitution={1.1}
        mass={1}
      >
        <Gltf src="./models/ball.gltf.glb" scale={[0.5, 0.5, 0.5]} />
        <BallCollider args={[0.5]} />
      </RigidBody>
    </group>
  );
};
export default DraggableBall;
