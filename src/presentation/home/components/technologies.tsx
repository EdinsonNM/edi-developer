import { useState } from "react";
import Technology from "./technology";
import { technologies } from "../utils/contants";
import { TechnologyProps } from "../utils/types";

type Props = {
  onSelect: () => void;
};

function Technologies({ onSelect = () => {} }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

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
            position={[x, 0, z]}
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
