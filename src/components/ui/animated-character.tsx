import { Layout, Alignment, Fit, useRive } from "@rive-app/react-canvas";
import { useEffect, useRef } from "react";

interface AnimatedCharacterProps {
  className?: string;
  mouseInputX?: number; // Valor entre -50 y 50
  mouseInputY?: number; // Valor entre -50 y 50
}

export default function AnimatedCharacter({
  className = "",
  mouseInputX = 0,
  mouseInputY = 0,
}: AnimatedCharacterProps) {
  const riveRef = useRef<HTMLCanvasElement>(null);
  const { rive, RiveComponent } = useRive({
    src: "edidev.riv",
    stateMachines: "default",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });
  // Actualizar los inputs con los valores del mouse cuando cambien
  useEffect(() => {
    if (rive) {
      const inputs = rive.stateMachineInputs("default");
      const xInput = inputs.find((i) => i.name === "x");
      const yInput = inputs.find((i) => i.name === "y");

      if (xInput) {
        xInput.value = mouseInputX;
      }
      if (yInput) {
        yInput.value = -mouseInputY;
      }
    }
  }, [rive, mouseInputX, mouseInputY]);
  return (
    <div className={`${className} relative`}>
      <RiveComponent ref={riveRef} />
    </div>
  );
}
