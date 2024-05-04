import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Insect = () => {
  const { scene } = useGLTF("./bug.gltf");
  const mesh = useRef();
  const velocity = useRef([0, 0, 0]);
  const maxSpeed = 0.1;

  // Función para generar una velocidad aleatoria
  const randomVelocity = () => {
    return [
      (Math.random() - 0.5) * maxSpeed,
      (Math.random() - 0.5) * maxSpeed,
      (Math.random() - 0.5) * maxSpeed,
    ];
  };

  // Movimiento orgánico del insecto utilizando caminata aleatoria
  useFrame(() => {
    const [vx, vy, vz] = velocity.current;
    (mesh.current as any).position.x += vx;
    (mesh.current as any).position.y += 0;
    (mesh.current as any).position.z += vz;

    (mesh.current as any).lookAt(
      (mesh.current as any).position.x + vx,
      0,
      (mesh.current as any).position.z + vz
    );
    // Cambiar de dirección aleatoriamente a intervalos regulares
    if (Math.random() < 0.01) {
      velocity.current = randomVelocity();
    }
  });

  return (
    <mesh ref={mesh} scale={[0.5, 0.5, 0.5]}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Insect;
