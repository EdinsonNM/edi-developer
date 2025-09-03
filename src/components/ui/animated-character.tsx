import React, { useEffect, useRef, useState } from "react";

interface AnimatedCharacterProps {
  className?: string;
  alt?: string;
  svgPath?: string;
  leftEyePosition?: { x: number; y: number };
  rightEyePosition?: { x: number; y: number };
  eyeRadius?: number;
  pupilRadius?: number;
  debugMode?: boolean;
}

export default function AnimatedCharacter({
  className = "",
  alt = "Home Right",
  svgPath = "/edidev.svg",
  leftEyePosition = { x: 220, y: 180 },
  rightEyePosition = { x: 280, y: 180 },
  eyeRadius = 15,
  pupilRadius = 8,
  debugMode = false,
}: AnimatedCharacterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [debugLeftEye, setDebugLeftEye] = useState(leftEyePosition);
  const [debugRightEye, setDebugRightEye] = useState(rightEyePosition);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Detectar mouse en toda la página
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Normalizar las coordenadas del mouse (0-1) basadas en toda la ventana
      const normalizedX = event.clientX / windowWidth;
      const normalizedY = event.clientY / windowHeight;

      setMousePosition({ x: normalizedX, y: normalizedY });

      // Activar la animación cuando el mouse está en la página
      setIsHovering(true);
    };

    const handleMouseEnter = () => {
      console.log("Mouse entró al área del personaje");
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      console.log("Mouse salió del área del personaje");
      // No desactivar la animación cuando sale del componente
      // setIsHovering(false);
    };

    const handleClick = (event: MouseEvent) => {
      if (debugMode && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Convertir coordenadas de pantalla a coordenadas del viewBox
        const viewBoxX = (x / rect.width) * 500;
        const viewBoxY = (y / rect.height) * 500;

        console.log(
          `Click en: x=${viewBoxX.toFixed(0)}, y=${viewBoxY.toFixed(0)}`
        );

        // Alternar entre ojo izquierdo y derecho
        if (event.shiftKey) {
          setDebugRightEye({ x: viewBoxX, y: viewBoxY });
          console.log(`Ojo derecho movido a: ${viewBoxX}, ${viewBoxY}`);
        } else {
          setDebugLeftEye({ x: viewBoxX, y: viewBoxY });
          console.log(`Ojo izquierdo movido a: ${viewBoxX}, ${viewBoxY}`);
        }
      }
    };

    // Escuchar el mouse en toda la página
    document.addEventListener("mousemove", handleMouseMove);

    // Agregar listeners al contenedor solo para debug
    if (containerRef.current) {
      containerRef.current.addEventListener("mouseenter", handleMouseEnter);
      containerRef.current.addEventListener("mouseleave", handleMouseLeave);
      if (debugMode) {
        containerRef.current.addEventListener("click", handleClick);
      }
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (containerRef.current) {
        containerRef.current.removeEventListener(
          "mouseenter",
          handleMouseEnter
        );
        containerRef.current.removeEventListener(
          "mouseleave",
          handleMouseLeave
        );
        if (debugMode) {
          containerRef.current.removeEventListener("click", handleClick);
        }
      }
    };
  }, [debugMode]);

  // Calcular la posición de los ojos con movimiento más natural
  const getEyePosition = (baseX: number, baseY: number) => {
    if (!isHovering) {
      return { x: baseX, y: baseY };
    }

    const maxOffset = 12;
    const offsetX = (mousePosition.x - 0.5) * maxOffset;
    const offsetY = (mousePosition.y - 0.5) * maxOffset;

    // Aplicar límites para que los ojos no se salgan demasiado
    const finalX = Math.max(baseX - 8, Math.min(baseX + 8, baseX + offsetX));
    const finalY = Math.max(baseY - 6, Math.min(baseY + 6, baseY + offsetY));

    return {
      x: finalX,
      y: finalY,
    };
  };

  const leftEye = getEyePosition(
    debugMode ? debugLeftEye.x : leftEyePosition.x,
    debugMode ? debugLeftEye.y : leftEyePosition.y
  );
  const rightEye = getEyePosition(
    debugMode ? debugRightEye.x : rightEyePosition.x,
    debugMode ? debugRightEye.y : rightEyePosition.y
  );

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: "500px",
        height: "500px",
        position: "relative",
        cursor: debugMode ? "crosshair" : "pointer",
      }}
    >
      {/* SVG de fondo */}
      <img
        src={svgPath}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          pointerEvents: "none",
        }}
      />

      {/* Overlay con ojos animados */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
        viewBox="0 0 500 500"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ojo izquierdo */}
        <g style={{ transition: "all 0.4s ease-out" }}>
          <circle
            cx={leftEye.x}
            cy={leftEye.y}
            r={eyeRadius}
            fill="white"
            stroke="#2c59c2"
            strokeWidth="1.5"
            opacity="0.95"
          />
          <circle
            cx={leftEye.x}
            cy={leftEye.y}
            r={pupilRadius}
            fill="#2c59c2"
            opacity="1"
          />
        </g>

        {/* Ojo derecho */}
        <g style={{ transition: "all 0.4s ease-out" }}>
          <circle
            cx={rightEye.x}
            cy={rightEye.y}
            r={eyeRadius}
            fill="white"
            stroke="#2c59c2"
            strokeWidth="1.5"
            opacity="0.95"
          />
          <circle
            cx={rightEye.x}
            cy={rightEye.y}
            r={pupilRadius}
            fill="#2c59c2"
            opacity="1"
          />
        </g>
      </svg>

      {/* Información de debug solo si está activado */}
      {debugMode && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            background: "rgba(0,0,0,0.8)",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            fontSize: "12px",
            fontFamily: "monospace",
          }}
        >
          <div>Modo Debug Activo</div>
          <div>Click: Mover ojo izquierdo</div>
          <div>Shift+Click: Mover ojo derecho</div>
          <div>
            Ojo Izq: {debugLeftEye.x.toFixed(0)}, {debugLeftEye.y.toFixed(0)}
          </div>
          <div>
            Ojo Der: {debugRightEye.x.toFixed(0)}, {debugRightEye.y.toFixed(0)}
          </div>
          <div>
            Mouse: {mousePosition.x.toFixed(2)}, {mousePosition.y.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}
