import { useThree } from "@react-three/fiber";
import { useEffect, useMemo, useState } from "react";
import { Vector3 } from "three";
import { RoundedBox, Text, Text3D } from "@react-three/drei";
import Button from "./button";
import Cloud from "./cloud";

type ScenaryProps = {   
    mousePosition: [number, number, number];
}
export default function Scenary({mousePosition}: ScenaryProps) {
    const z = useMemo(() => Math.random() * 5-2.5, []);
    const { camera } = useThree();
    const [lightPosition, setLightPosition] = useState([5, 0, 0]); // Z fijo inicial
  
    useEffect(() => {
      const [x, y] = mousePosition;
  if(!x && !y){
    setLightPosition([0, 0, 10])
  }
      // Crear un vector con coordenadas normalizadas del mouse
      const vector = new Vector3(x, y, 10); // Profundidad en Z arbitraria (0.01)
      vector.unproject(camera); // Convertir a coordenadas del espacio del mundo
  
      // Calcular dirección y distancia
      const dir = vector.sub(camera.position).normalize();
      const distance = (5 - camera.position.z) / dir.z; // Profundidad Z fija en 5
      const position = camera.position.clone().add(dir.multiplyScalar(distance));
      
      setLightPosition([position.x*3, position.y*2,position.z]); // Actualizar posición
    }, [mousePosition, camera]);
  const rows = 5;
  const columns = 8;
  const spacingX = 3.1;
  const spacingY = 2.1;
  const titles = [
  
    "Next.js",
    "Nuxt.js",
    "Gatsby",
    "Flutter",
    "Node.js",
    "Dart",
    "Tailwind CSS",
    "Bootstrap",
    "Foundation",
    "Bulma",
    "Materialize",
    "Semantic UI",
    "Ant Design",
    "Chakra UI",
    "Tanstack Query",
    "Emotion",
    "React",
    "Angular",
    "Vue.js",
    "Svelte",
    "Redux",
    "MobX",
    "RxJS",
    "GraphQL",
    "Apollo",
    "Relay",
    "Webpack",
    "Parcel",
    "Rollup",
    "Babel",
    "ESLint",
    "Prettier",
    "Jest",
    "Mocha",
    "Cypress",
    "Storybook",
    "Three.js",
    "D3.js",
    "Chart.js",
    "Highcharts"
  ];
  return (
    <>
    
    <ambientLight intensity={0.001} />
      <pointLight
        position={lightPosition}
        intensity={5}
        color="white"
        distance={15}
        decay={2}
      />
      {Array.from({ length: rows }).map((_, rowIndex) =>
        Array.from({ length: columns }).map((_, colIndex) => (
        <Button key={`${colIndex}-${rowIndex}`} position={[
            (colIndex - (columns - 1) / 2) * spacingX,
            (rowIndex - (rows - 1) / 2) * spacingY,
            z
          ]} title={titles[(rowIndex * columns + colIndex) % titles.length]} />
        ))
      )}
      <Cloud />
    </>
  );
}
