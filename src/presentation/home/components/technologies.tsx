import { useState } from "react";
import Technology from "./technology";

type Props = {
  onSelect: () => void;
};

type TechnologyProps = {
  key: string;
  path: string;
  name: string;
};

function Technologies({ onSelect = () => {} }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const technologies: TechnologyProps[] = [
    { key: "ang", path: "angular.gltf", name: "angular" },
  ];
  const angleStep = (2 * Math.PI) / technologies.length; // Ángulo en radianes
  const radius = 5;
  const selectedTech = (index: number) => {
    setSelected(index);
    onSelect();
  };
  return (
    <>
      {technologies.map((item: TechnologyProps, index: number) => {
        const x = radius * Math.cos(angleStep * index);
        const z = radius * Math.sin(angleStep * index);
        return (
          <Technology
            position={[0, 0, 0]}
            onClick={selectedTech.bind(null, index)}
            selected={selected === index}
            {...item}
          />
        );
      })}
    </>
  );
}

export default Technologies;
