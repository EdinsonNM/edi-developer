import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Group, Object3DEventMap } from "three";

function useScrollAnimation() {
  const { camera } = useThree();
  const scroll = useScroll();

  const timeline = useRef<any>(null);

  const groupRef = useRef<Group<Object3DEventMap>>();

  useFrame(() => {
    timeline.current.seek(scroll.offset * timeline.current.duration());
  });

  useLayoutEffect(() => {
    timeline.current = gsap.timeline();
    timeline.current.to(
      groupRef.current!.position,
      { duration: 1, y: -5, z: -4 },
      0.5
    );
    timeline.current.to(
      groupRef.current!.rotation,
      { duration: 1, z: 0, y: 0, x: -0.05 },
      0.5
    );
  }, []);
  useEffect(() => {
    return scroll.el.addEventListener("scroll", () => {
      if (scroll.offset < 1) {
        gsap.to(camera.rotation, {
          x: 0,
          y: 0,
          z: 0, // Calcular la nueva posición en Z basada en el scroll
          duration: 1.5,
          ease: "power3.inOut",
        });

        gsap.to(camera.position, {
          x: 0,
          y: 0,
          z: 15, // Calcular la nueva posición en Z basada en el scroll
          duration: 1.5,
          ease: "power3.inOut",
        });
      }
    });
  }, [scroll, camera]);
  return { timeline, groupRef };
}
export default useScrollAnimation;
