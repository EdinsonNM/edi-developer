import { RoundedBox, Text, useCursor } from "@react-three/drei";
import { useState, useEffect, useContext } from "react";
import { useFrame } from "@react-three/fiber";
import LayoutContext from "@presentation/layout/layout.context";
import { Howl } from "howler";

type ButtonProps = {
  position: [number, number, number];
  title: string;
  sound?: string;
};

export default function Button({ position, title,  sound }: ButtonProps) {
  const { isDark } = useContext(LayoutContext);
  const initialZoffset = Math.random() > 0.5 ? 0.5 : -0.5;
  const [hovered, setHovered] = useState(false);
  const [zOffset, setZOffset] = useState(initialZoffset);
  const [direction, setDirection] = useState(1);
  useCursor(hovered);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(() => (Math.random() > 0.5 ? 0.5 : -0.5));
    }, 1000); // Change direction every second
    return () => clearInterval(interval);
  }, []);

  useFrame(() => {
    setZOffset((prevZOffset) => {
      const newZOffset = prevZOffset + direction * 0.01;
      if (newZOffset > 1 || newZOffset < -1) {
        setDirection(-direction);
      }
      return newZOffset;
    });
  });

  const playSound = () => {
    if (sound) {
      const piano = new Howl({ src: [sound] });
      piano.play();
    }
  };

  let opacity = isDark ? 1 : 0.1;
  let transparent = isDark ? false : true;
  let roughness = isDark ? 0 : 0.1;
  let metalness = isDark ? 0 : 0.9;
  let materialColor = isDark ? "white" : "cyan";
  let emissive = isDark ? "cyan" : "orange";
  let textColor = isDark ? "black" : "cyan";
  if (hovered) {
    opacity = 1;
    transparent = false;
    roughness = 0;
    metalness = 0.9;
    materialColor = isDark ? "cyan" : "orange";
    emissive = isDark ? "cyan" : "orange";
    textColor = isDark ? "cyan" : "red";
  }
  useCursor(hovered, "pointer");
  return (
    <group
      key={`${position[0]}-${position[1]}`}
      scale={hovered ? 1.05 : 1}
      onClick={playSound}
      onPointerOver={() => {
        setHovered(true);
      }}
      onPointerOut={() => {
        setHovered(false);
      }}
      position={[position[0], position[1], position[2] + zOffset]}
    >
      <RoundedBox args={[3, 2, 1]} radius={0.5} smoothness={4}>
        <meshStandardMaterial
          color={materialColor}
          emissive={emissive}
          emissiveIntensity={hovered ? 2 : 0}
          opacity={opacity}
          transparent={transparent}
          roughness={roughness}
          metalness={metalness}
        />
      </RoundedBox>
      <Text
        color={textColor}
        anchorX="center"
        anchorY="middle"
        fontSize={0.3}
        position={[0, 0.2, 0.6]}
      >
        {title}
      </Text>
      
    </group>
  );
}
