import { Developer } from "./developer";
import gsap from "gsap";
import Technologies from "./technologies";
import useScrollAnimation from "../hooks/use-scroll-animation";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

function Models3D() {
  const { groupRef } = useScrollAnimation();
  const { camera } = useThree();

  const showInfo = () => {
    gsap.to(camera.position, {
      x: -40, // Nueva posición en el eje z
      z: 20,
      y: 5,
      duration: 2, // Duración de la animación en segundos
      ease: "power3.inOut", // Tipo de easing para suavizar la transición
      onComplete: () => console.log("position completada"), // Callback al completar la animación
    });
    gsap.to(camera.rotation, {
      y: 1.8, // Nueva posición en el eje z
      duration: 2, // Duración de la animación en segundos
      ease: "power3.inOut", // Tipo de easing para suavizar la transición
      onComplete: () => console.log("rotation completada"), // Callback al completar la animación
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
