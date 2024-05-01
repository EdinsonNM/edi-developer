import { useContext, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import HomeContext from "../home.context";
import { cameraPositions } from "../utils/contants";
import { useProgress } from "@react-three/drei";
function OverlayHome() {
  const { cameraControls } = useContext(HomeContext);
  const { progress } = useProgress();
  const refWelcome = useRef(null);
  const [isVisibleWelcome, setIsVisibleWelcome] = useState(false);
  const onSelectWelcome = () => {
    cameraControls!.current!.setLookAt(...cameraPositions.developer, true);

    gsap.to(refWelcome.current, {
      y: -100, // Mueve el div 100px hacia arriba
      opacity: 0, // Cambia la opacidad a 0 para "desvanecerlo"
      duration: 1, // Duración de la animación en segundos
    });
    gsap.to(refWelcome.current, {
      opacity: 0, // Cambia la opacidad a 0 para "desvanecerlo"
      duration: 1, // Duración de la animación en segundos
    });
  };

  useEffect(() => {
    if (progress === 100) setIsVisibleWelcome(true);
  }, [progress]);

  return (
    <section
      className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden pb-32 z-50"
      style={{ pointerEvents: "none" }}
    >
      {isVisibleWelcome && (
        <div ref={refWelcome} style={{ pointerEvents: "auto" }}>
          <h1 className="block text-5xl pt-20 welcome">Hello World</h1>
          <div className="block">
            <a className="arrow scrolly" onClick={onSelectWelcome}></a>
          </div>
        </div>
      )}
    </section>
  );
}
export default OverlayHome;
