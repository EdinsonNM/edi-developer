import { Html, RoundedBox, Text, Text3D, useCursor } from "@react-three/drei";
import { useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

type ButtonProps = {
  position: [number, number, number];
  title: string;
};

export default function Button({ position, title }: ButtonProps) {
  const initialZoffset=Math.random() > 0.5 ? 0.5 : -0.5
  const [hovered, setHovered] = useState(false);
  const [zOffset, setZOffset] = useState(initialZoffset);
  const [direction, setDirection] = useState(1);

  useCursor(hovered);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection((prevDirection) => (Math.random() > 0.5 ? 0.5 : -0.5));
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
      <RoundedBox
       
        args={[3, 2, 1]}
        radius={0.5}
        smoothness={4}
       
      >
        <meshStandardMaterial color={hovered ? "cyan" : "white"} emissive="cyan" emissiveIntensity={hovered ? 0.5 : 0} emissiveAttenuation={0.5}/>
      </RoundedBox>
      <Text color={hovered ? "white" : "black"} anchorX="center" anchorY="middle" fontSize={0.3} position={[0,0,0.6]}>
        {title}
        </Text>
    </group>
  );
}
