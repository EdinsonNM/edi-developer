import { RoundedBox, Text, useCursor } from "@react-three/drei";
import { useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import useDarkMode from "@presentation/utils/use-dark-mode";

type ButtonProps = {
  position: [number, number, number];
  title: string;
};

export default function Button({ position, title }: ButtonProps) {
  const initialZoffset = Math.random() > 0.5 ? 0.5 : -0.5;
  const [hovered, setHovered] = useState(false);
  const [zOffset, setZOffset] = useState(initialZoffset);
  const [direction, setDirection] = useState(1);
  const isDark = useDarkMode();
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
  const defaultTextColor = isDark ? "black" : "white";
  return (
    <group
      key={`${position[0]}-${position[1]}`}
      scale={hovered ? 1.05 : 1}
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
          color={hovered ? "cyan" : "white"}
          emissive="cyan"
          emissiveIntensity={hovered ? 2 : 0}
        />
      </RoundedBox>
      <Text
        color={hovered ? "cyan" : defaultTextColor}
        anchorX="center"
        anchorY="middle"
        fontSize={0.3}
        position={[0, 0, 0.6]}
      >
        {title}
      </Text>
    </group>
  );
}
