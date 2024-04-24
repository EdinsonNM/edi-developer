import { Scroll } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef } from "react";
function Overlay() {
  const { camera } = useThree();
  const refWelcome = useRef(null);
  const refArrow = useRef(null);
  const showProfile = () => {
    gsap.to(camera.position, {
      x: 0,
      z: 30,
      y: 2,
      duration: 2,
      ease: "power3.inOut",
      onComplete: () => console.log("position completada"),
    });

    gsap.to(refWelcome.current, {
      y: -100, // Mueve el div 100px hacia arriba
      opacity: 0, // Cambia la opacidad a 0 para "desvanecerlo"
      duration: 1, // Duración de la animación en segundos
      onComplete: () => {
        // Opcional: cualquier acción después de completar la animación
        console.log("Animación completada");
      },
    });
    camera.lookAt(0, 25, 0);
    camera.updateMatrixWorld();
  };
  useEffect(() => {
    if (refArrow.current === null) return;
    gsap.to(refArrow.current, {
      y: -20, // Sube el div 20px
      repeat: -1, // Repite la animación infinitamente
      yoyo: true, // Hace que la animación se invierta alternativamente
      duration: 0.5, // Duración de un ciclo de la animación en segundos
      ease: "sine.inOut", // Tipo de "ease" para suavizar la transición
    });
  }, [refArrow.current]);
  return (
    <Scroll html>
      <div
        ref={refWelcome}
        className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden pb-32"
        style={{ pointerEvents: "auto" }}
      >
        <div ref={refArrow}>
          <h1 className="block text-5xl pt-20 welcome">Hello World</h1>
          <div className="block">
            <a className="arrow scrolly" onClick={showProfile}></a>
          </div>
        </div>
      </div>{" "}
      <div className="h-screen w-screen flex justify-end items-end">aaa</div>
      <div id="destino"></div>
    </Scroll>
  );
}
export default Overlay;
