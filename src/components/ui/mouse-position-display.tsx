import { useMousePosition } from "@/hooks/use-mouse-position";

interface MousePositionDisplayProps {
  className?: string;
}

export default function MousePositionDisplay({
  className = "",
}: MousePositionDisplayProps) {
  const { x, y, normalizedX, normalizedY, inputX, inputY } = useMousePosition();

  return (
    <div
      className={`fixed top-4 right-4 bg-black/80 text-white p-4 rounded-lg font-mono text-sm z-50 ${className}`}
    >
      <div className="space-y-1">
        <div>
          Posición: ({x}, {y})
        </div>
        <div>
          Normalizado: ({normalizedX.toFixed(2)}, {normalizedY.toFixed(2)})
        </div>
        <div>
          Input: ({inputX.toFixed(1)}, {inputY.toFixed(1)})
        </div>
      </div>
    </div>
  );
}
