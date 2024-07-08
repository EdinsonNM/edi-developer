import { useRef } from "react";
import { useSpring, animated } from "@react-spring/three";
import { PointLightProps, useFrame } from "@react-three/fiber";
import { PointLight } from "three";

const PulsatingLight = (props: PointLightProps) => {
  const lightRef = useRef<PointLight>(null);

  // Animación de la intensidad utilizando react-spring
  const { intensity } = useSpring({
    from: { intensity: 0.5 },
    to: async (next) => {
      while (1) {
        await next({ intensity: 10.5 });
        await next({ intensity: 0.5 });
      }
    },
    config: { duration: 2000 },
  });

  useFrame(() => {
    if (lightRef.current) {
      // Aplicar la intensidad animada a la luz
      lightRef.current.intensity = intensity.get();
    }
  });

  return <animated.pointLight ref={lightRef} {...props} />;
};
export default PulsatingLight;
