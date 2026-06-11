import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Sparkles } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

const ACID = "#c8f31d";
const DARK = "#141417";
const DARKER = "#0e0e10";
const METAL = "#1d1d22";

/** Líneas de "código" emisivas sobre la pantalla del monitor */
function CodeScreen() {
  const cursorRef = useRef<THREE.Mesh>(null);

  // Anchos pseudoaleatorios pero estables entre renders
  const lines = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => ({
        y: 0.62 - i * 0.155,
        width: 0.35 + ((i * 37) % 53) / 53 * 1.0,
        indent: i % 3 === 0 ? 0 : 0.18,
        acid: i % 4 === 1,
      })),
    []
  );

  useFrame(({ clock }) => {
    if (cursorRef.current) {
      const material = cursorRef.current
        .material as THREE.MeshStandardMaterial;
      material.opacity = Math.sin(clock.elapsedTime * 6) > 0 ? 1 : 0.1;
    }
  });

  return (
    <group>
      {lines.map((line, i) => (
        <mesh
          key={i}
          position={[-0.85 + line.indent + line.width / 2, line.y, 0.01]}
        >
          <planeGeometry args={[line.width, 0.07]} />
          <meshStandardMaterial
            color={line.acid ? ACID : "#3a3a42"}
            emissive={line.acid ? ACID : "#2a2a30"}
            emissiveIntensity={line.acid ? 1.6 : 0.4}
          />
        </mesh>
      ))}
      {/* Cursor parpadeante */}
      <mesh ref={cursorRef} position={[-0.62, -0.78, 0.01]}>
        <planeGeometry args={[0.09, 0.1]} />
        <meshStandardMaterial
          color={ACID}
          emissive={ACID}
          emissiveIntensity={2}
          transparent
        />
      </mesh>
    </group>
  );
}

function Monitor() {
  return (
    <group position={[0, 1.05, -0.55]}>
      {/* Marco */}
      <RoundedBox args={[2.3, 1.5, 0.08]} radius={0.04}>
        <meshStandardMaterial color={METAL} roughness={0.4} />
      </RoundedBox>
      {/* Pantalla */}
      <mesh position={[0, 0.02, 0.045]}>
        <planeGeometry args={[2.1, 1.3]} />
        <meshStandardMaterial color={DARKER} roughness={0.2} />
      </mesh>
      <group position={[0, 0.02, 0.05]} scale={0.78}>
        <CodeScreen />
      </group>
      {/* Soporte */}
      <mesh position={[0, -0.85, 0]}>
        <cylinderGeometry args={[0.05, 0.07, 0.45, 8]} />
        <meshStandardMaterial color={METAL} />
      </mesh>
      <mesh position={[0, -1.06, 0.05]}>
        <boxGeometry args={[0.6, 0.05, 0.35]} />
        <meshStandardMaterial color={METAL} />
      </mesh>
    </group>
  );
}

function Keyboard() {
  const keys = useMemo(() => {
    const result: { x: number; z: number; acid: boolean }[] = [];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 10; col++) {
        result.push({
          x: -0.5 + col * 0.11,
          z: -0.14 + row * 0.1,
          acid: (row * 10 + col) % 17 === 3,
        });
      }
    }
    return result;
  }, []);

  return (
    <group position={[0, 0.06, 0.45]} rotation={[0, 0, 0]}>
      <RoundedBox args={[1.25, 0.06, 0.5]} radius={0.02}>
        <meshStandardMaterial color={METAL} />
      </RoundedBox>
      {keys.map((key, i) => (
        <mesh key={i} position={[key.x, 0.04, key.z]}>
          <boxGeometry args={[0.08, 0.03, 0.07]} />
          <meshStandardMaterial
            color={key.acid ? ACID : "#2c2c33"}
            emissive={key.acid ? ACID : "#000000"}
            emissiveIntensity={key.acid ? 1.2 : 0}
          />
        </mesh>
      ))}
    </group>
  );
}

function CoffeeMug() {
  return (
    <group position={[1.15, 0.14, 0.5]}>
      <mesh>
        <cylinderGeometry args={[0.11, 0.09, 0.22, 16]} />
        <meshStandardMaterial color="#26262c" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.02, 16]} />
        <meshStandardMaterial
          color={ACID}
          emissive={ACID}
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh position={[0.14, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.07, 0.018, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#26262c" />
      </mesh>
    </group>
  );
}

function ServerTower() {
  const lightRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    if (lightRef.current) {
      lightRef.current.emissiveIntensity =
        1 + Math.sin(clock.elapsedTime * 3) * 0.8;
    }
  });

  return (
    <group position={[-1.5, 0.42, 0.1]}>
      <RoundedBox args={[0.5, 0.85, 0.5]} radius={0.03}>
        <meshStandardMaterial color={METAL} roughness={0.35} />
      </RoundedBox>
      {[0.25, 0.1, -0.05].map((y, i) => (
        <mesh key={i} position={[0, y, 0.26]}>
          <planeGeometry args={[0.36, 0.06]} />
          <meshStandardMaterial color={DARKER} />
        </mesh>
      ))}
      <mesh position={[0.13, -0.25, 0.26]}>
        <circleGeometry args={[0.025, 12]} />
        <meshStandardMaterial
          ref={lightRef}
          color={ACID}
          emissive={ACID}
          emissiveIntensity={1.5}
        />
      </mesh>
    </group>
  );
}

/** Plataforma flotante estilo diorama */
function Island() {
  return (
    <group>
      <RoundedBox args={[4.6, 0.35, 2.6]} radius={0.08} position={[0, -0.18, 0]}>
        <meshStandardMaterial color={DARK} roughness={0.7} />
      </RoundedBox>
      <RoundedBox args={[3.6, 0.3, 2]} radius={0.08} position={[0.2, -0.55, 0.1]}>
        <meshStandardMaterial color={DARKER} roughness={0.8} />
      </RoundedBox>
      <RoundedBox args={[1.6, 0.25, 1]} radius={0.08} position={[-0.4, -0.9, -0.1]}>
        <meshStandardMaterial color="#0b0b0d" roughness={0.9} />
      </RoundedBox>
      {/* Borde acid sutil de la plataforma superior */}
      <mesh position={[0, -0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.62, 2.62]} />
        <meshStandardMaterial
          color={DARK}
          emissive={ACID}
          emissiveIntensity={0.04}
          roughness={0.9}
        />
      </mesh>
    </group>
  );
}

/** Geometrías flotantes alrededor del diorama */
function FloatingBits() {
  return (
    <>
      <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5}>
        <mesh position={[2.3, 1.6, -0.4]}>
          <icosahedronGeometry args={[0.28, 0]} />
          <meshStandardMaterial color={ACID} wireframe />
        </mesh>
      </Float>
      <Float speed={1.6} rotationIntensity={1} floatIntensity={1.2}>
        <mesh position={[-2.2, 2, 0.3]}>
          <octahedronGeometry args={[0.2, 0]} />
          <meshStandardMaterial
            color={ACID}
            emissive={ACID}
            emissiveIntensity={0.8}
          />
        </mesh>
      </Float>
      <Float speed={2.4} rotationIntensity={1.5} floatIntensity={1}>
        <mesh position={[1.9, 2.6, 0.6]}>
          <boxGeometry args={[0.22, 0.22, 0.22]} />
          <meshStandardMaterial color="#fafafa" wireframe />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={0.8} floatIntensity={1.8}>
        <mesh position={[-1.9, 1.2, 0.9]}>
          <torusGeometry args={[0.18, 0.05, 8, 24]} />
          <meshStandardMaterial color="#9a9aa0" wireframe />
        </mesh>
      </Float>
    </>
  );
}

/** Grupo raíz: flotación suave + parallax al mouse */
function Diorama() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock, pointer }) => {
    const group = groupRef.current;
    if (!group) return;
    group.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.08 - 0.4;
    group.rotation.y = THREE.MathUtils.lerp(
      group.rotation.y,
      -Math.PI / 4 + pointer.x * 0.18,
      0.05
    );
    group.rotation.x = THREE.MathUtils.lerp(
      group.rotation.x,
      pointer.y * -0.06,
      0.05
    );
  });

  return (
    <group ref={groupRef} rotation={[0, -Math.PI / 4, 0]}>
      <Island />
      <Monitor />
      <Keyboard />
      <CoffeeMug />
      <ServerTower />
      <FloatingBits />
      <Sparkles
        count={40}
        scale={[6, 4, 4]}
        size={2}
        speed={0.3}
        color={ACID}
        opacity={0.5}
      />
    </group>
  );
}

interface HeroScene3DProps {
  paused?: boolean;
}

/** Mundo isométrico de developer para el hero */
export function HeroScene3D({ paused = false }: HeroScene3DProps) {
  return (
    <Canvas
      orthographic
      frameloop={paused ? "never" : "always"}
      dpr={[1, 1.5]}
      camera={{ zoom: 90, position: [10, 7, 10], near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
      onCreated={({ camera }) => camera.lookAt(0, 0.4, 0)}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 8, 5]} intensity={1.1} color="#ffffff" />
        <pointLight position={[0, 2, 2]} intensity={6} color={ACID} distance={8} />
        <pointLight position={[-3, 1, -2]} intensity={3} color="#4a5aff" distance={10} />
        <Diorama />
      </Suspense>
    </Canvas>
  );
}
