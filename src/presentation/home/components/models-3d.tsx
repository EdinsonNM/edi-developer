import { Developer } from "./developer";
import gsap from "gsap";
import Technologies from "./technologies";
import useScrollAnimation from "../hooks/use-scroll-animation";
import { useThree } from "@react-three/fiber";

function Models3D() {
  const { groupRef } = useScrollAnimation();
  const { camera } = useThree();

  const showInfo = () => {
    gsap.to(camera.position, {
      x: 6, // Nueva posición en el eje z
      z: 20,
      y: 4,
      duration: 2, // Duración de la animación en segundos
      ease: "power3.inOut", // Tipo de easing para suavizar la transición
      onComplete: () => console.log("position completada"), // Callback al completar la animación
    });
    gsap.to((groupRef.current as any).rotation, {
      y: Math.PI * 2 * 0.2,
      duration: 2, // Duración de la animación en segundos
      ease: "power3.inOut", // Tipo de easing para suavizar la transición
      onComplete: () => console.log("position completada"), // Callback al completar la animación
    });
  };
  return (
    <group ref={groupRef} dispose={null}>
      <Developer />
      <Technologies onSelect={showInfo} />
    </group>
  );
}

export default Models3D;
