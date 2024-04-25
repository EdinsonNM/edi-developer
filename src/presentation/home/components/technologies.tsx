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
    { key: "react", path: "react.gltf", name: "react" },
    { key: "js", path: "js.gltf", name: "javascript" },
    { key: "flutter", path: "flutter.gltf", name: "flutter" },
    { key: "node", path: "node.gltf", name: "node" },
    { key: "ts", path: "ts.gltf", name: "ts" },
    { key: "ang", path: "angular.gltf", name: "angular" },
    { key: "three", path: "threejs.gltf", name: "threejs" },
    { key: "gmaps", path: "gmaps.gltf", name: "gmaps" },
    { key: "blender", path: "blender.gltf", name: "blender" },
  ];
  //const angleStep = (2 * Math.PI) / technologies.length; // Ángulo en radianes
  //const radius = 5;
  const selectedTech = (index: number) => {
    setSelected(index);
    onSelect();
  };
  return (
    <>
      {technologies.map((item: TechnologyProps, index: number) => {
        //const x = radius * Math.cos(angleStep * index);
        //const z = radius * Math.sin(angleStep * index);
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
