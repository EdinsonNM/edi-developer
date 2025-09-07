import { useState, useEffect, useCallback, useRef } from "react";

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number; // Valor entre -1 y 1
  normalizedY: number; // Valor entre -1 y 1
  inputX: number; // Valor entre -50 y 50
  inputY: number; // Valor entre -50 y 50
}

export function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
    inputX: 0,
    inputY: 0,
  });

  // Usar useRef para almacenar el último valor y evitar actualizaciones innecesarias
  const lastPositionRef = useRef<MousePosition>(mousePosition);
  const rafRef = useRef<number>();

  const updateMousePosition = useCallback(
    (clientX: number, clientY: number) => {
      const { innerWidth, innerHeight } = window;

      // Calcular posición normalizada (-1 a 1)
      const normalizedX = (clientX / innerWidth) * 2 - 1;
      const normalizedY = (clientY / innerHeight) * 2 - 1;

      // Convertir a valores de input (-50 a 50)
      const inputX = normalizedX * 50;
      const inputY = normalizedY * 50;

      const newPosition = {
        x: clientX,
        y: clientY,
        normalizedX,
        normalizedY,
        inputX,
        inputY,
      };

      // Solo actualizar si hay un cambio significativo (evitar micro-movimientos)
      const threshold = 2; // píxeles
      const hasSignificantChange =
        Math.abs(newPosition.x - lastPositionRef.current.x) > threshold ||
        Math.abs(newPosition.y - lastPositionRef.current.y) > threshold;

      if (hasSignificantChange) {
        lastPositionRef.current = newPosition;
        setMousePosition(newPosition);
      }
    },
    []
  );

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Cancelar el frame anterior si existe
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Usar requestAnimationFrame para optimizar las actualizaciones
      rafRef.current = requestAnimationFrame(() => {
        updateMousePosition(event.clientX, event.clientY);
      });
    };

    // Agregar listener al documento para capturar movimiento en toda la aplicación
    document.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateMousePosition]);

  return mousePosition;
}
