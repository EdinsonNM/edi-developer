import { useThree } from "@react-three/fiber";
import { useContext, useEffect, useMemo, useState } from "react";
import { Vector3 } from "three";
import Button from "./button";
import Cloud from "./cloud";
import LayoutContext from "@presentation/layout/layout.context";
import { TECHNOLOGIES } from "@presentation/utils/constants";

type ScenaryProps = {
  mousePosition: [number, number, number];
};
export default function Scenary({ mousePosition }: ScenaryProps) {
  const z = useMemo(() => Math.random() * 5 - 2.5, []);
  const { camera } = useThree();
  const [lightPosition, setLightPosition] = useState([5, 0, 0]);
  const { isDark } = useContext(LayoutContext);
  useEffect(() => {
    const [x, y] = mousePosition;
    if (!x && !y) {
      setLightPosition([0, 0, 10]);
    }
    const vector = new Vector3(x, y, 10); // Profundidad en Z arbitraria (0.01)
    vector.unproject(camera); // Convertir a coordenadas del espacio del mundo

    const dir = vector.sub(camera.position).normalize();
    const distance = (5 - camera.position.z) / dir.z; // Profundidad Z fija en 5
    const position = camera.position.clone().add(dir.multiplyScalar(distance));

    setLightPosition([position.x * 3, position.y * 2, position.z]); // Actualizar posición
  }, [mousePosition, camera]);
  const rows = 5;
  const columns = 14;
  const spacingX = 3.1;
  const spacingY = 2.1;
  const colorLight = isDark ? "cyan" : "orange";
  return (
    <>
      <ambientLight intensity={0.01} />
      <pointLight
        position={
          new Vector3(lightPosition[0], lightPosition[1], lightPosition[2])
        }
        intensity={15}
        color={colorLight}
        distance={15}
        decay={2}
      />
      {Array.from({ length: rows }).map((_, rowIndex) =>
        Array.from({ length: columns }).map((_, colIndex) => {
          const tech = TECHNOLOGIES[(rowIndex * columns + colIndex) % TECHNOLOGIES.length];
          return (
            <Button
              key={`${colIndex}-${rowIndex}`}
              position={[
                (colIndex - (columns - 1) / 2) * spacingX,
                (rowIndex - (rows - 1) / 2) * spacingY,
                z,
              ]}
              title={tech.title}
              sound={tech.sound}
            />
          );
        })
      )}
      <Cloud />
    </>
  );
}
