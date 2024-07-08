import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

const Stars = () => {
  const starsRef = useRef();
  const starCount = 6000;

  // Generar posiciones aleatorias para las estrellas
  const positions = useMemo(() => {
    const temp = [];
    for (let i = 0; i < starCount; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, [starCount]);

  // Animar las estrellas
  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          itemSize={3}
          count={positions.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        color="white"
        size={1}
        sizeAttenuation
      />
    </points>
  );
};

export default Stars;
