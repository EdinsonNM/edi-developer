import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

interface Cube3DProps {
  className?: string;
}

function RotatingCube() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#2b59c3" metalness={0.3} roughness={0.4} />
    </mesh>
  );
}

export default function Cube3D({ className = "" }: Cube3DProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />

        <RotatingCube />

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={1}
        />

        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
}
