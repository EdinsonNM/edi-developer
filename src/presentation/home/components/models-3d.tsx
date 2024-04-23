import { Developer } from "./developer";
import gsap from "gsap";
import Technologies from "./technologies";
import useScrollAnimation from "../hooks/use-scroll-animation";
import { useThree } from "@react-three/fiber";

function Models3D() {
  const { groupRef, timeline } = useScrollAnimation();
  const { camera } = useThree();

  const showInfo = () => {
    gsap.to(camera.position, {
      x: -20, // Nueva posición en el eje z
      z: 2,
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
    /*
    if (!timeline.current.isActive()) {
      gsap.killTweensOf(groupRef.current!.rotation);
      gsap.killTweensOf(groupRef.current!.position);
      gsap.to(groupRef.current!.position, {
        duration: 1,
        x: -5.5, // Animando la subpropiedad x de position
        ease: "power2.out",
      });
      gsap.to(groupRef.current!.rotation, {
        duration: 2,
        y: 1.2, // Asumiendo que la rotación en y es lo que quieres animar
        ease: "power2.out",
      });
    }*/
  };
  return (
    <group
      ref={groupRef}
      dispose={null}
      position={[0, -9, 8]}
      rotation={[-0.75, 0, 0]}
    >
      <Developer />
      <Technologies onSelect={showInfo} />
    </group>
  );
}

export default Models3D;
