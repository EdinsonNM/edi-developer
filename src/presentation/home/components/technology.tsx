import { Vector3 } from "@react-three/fiber";
import { useRef, useState } from "react";

type Props = {
  position?: Vector3;
  onClick?: (event: any) => void;
  selected?: boolean;
};

const Technology = ({ position, onClick, selected = false }: Props) => {
  const ref = useRef(null);
  const [hovered, setHover] = useState(false);

  return (
    <mesh
      ref={ref}
      position={position}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onClick={onClick}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color={selected ? "#765432" : hovered ? "#bf9221" : "#707070"}
        metalness={selected ? 1 : 0}
        roughness={0}
      />
    </mesh>
  );
};

export default Technology;
