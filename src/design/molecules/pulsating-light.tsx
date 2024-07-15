import { useEffect, useRef } from "react";
import { GroupProps, useFrame } from "@react-three/fiber";
import { MeshStandardMaterial } from "three";

const PulsatingLight = ({
  color = "red",
  delay = 0,
  frequency = 1,
  maxIntensity = 10,
  size = 0.15,
  ...props
}: GroupProps & {
  color: string;
  delay?: number;
  frequency?: number;
  maxIntensity?: number;
  size?: number;
}) => {
  const lightRef = useRef<MeshStandardMaterial>(null);
  const startTime = useRef(Date.now());

  useEffect(() => {
    startTime.current = Date.now() + delay;
  }, [delay]);

  useFrame(() => {
    if (lightRef.current) {
      const elapsedTime = Date.now() - startTime.current;
      // Simular parpadeo orgánico usando una combinación de seno y ruido
      const randomFactor = Math.random() * 1; // Factor aleatorio para variabilidad
      const intensity =
        ((Math.sin(elapsedTime * 0.002 * frequency + randomFactor) + 1) / 2) *
        maxIntensity;
      lightRef.current.emissiveIntensity = intensity;
    }
  });

  return (
    <group {...props}>
      <mesh>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial ref={lightRef} color={color} emissive={color} />
      </mesh>
    </group>
  );
};
export default PulsatingLight;
