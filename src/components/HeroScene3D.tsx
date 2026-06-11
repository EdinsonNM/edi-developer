import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, Sparkles } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const ACID = "#c8f31d";
const DARK = "#141417";
const DARKER = "#0e0e10";
const METAL = "#1d1d22";
const WOOD = "#23232a";

const SKIN_TONES = ["#e0b69a", "#9c6644", "#f2cdb6", "#7f5539"];
const SHIRT_COLORS = [ACID, "#fafafa", "#5c5cff", "#ff6b6b", "#3dd6c3"];

/* ---------------------------------- Personajes ---------------------------------- */

interface CharacterLook {
  shirt: string;
  skin: string;
  pants?: string;
}

/** Cuerpo low-poly articulado; las extremidades exponen refs para animar */
function CharacterBody({
  look,
  legLRef,
  legRRef,
  armLRef,
  armRRef,
  bodyRef,
}: {
  look: CharacterLook;
  legLRef?: React.Ref<THREE.Group>;
  legRRef?: React.Ref<THREE.Group>;
  armLRef?: React.Ref<THREE.Group>;
  armRRef?: React.Ref<THREE.Group>;
  bodyRef?: React.Ref<THREE.Group>;
}) {
  const pants = look.pants ?? "#26262e";
  return (
    <group>
      {/* Piernas: pivote en la cadera (y=0.34) */}
      <group ref={legLRef} position={[-0.06, 0.34, 0]}>
        <mesh position={[0, -0.17, 0]}>
          <boxGeometry args={[0.09, 0.34, 0.1]} />
          <meshStandardMaterial color={pants} />
        </mesh>
      </group>
      <group ref={legRRef} position={[0.06, 0.34, 0]}>
        <mesh position={[0, -0.17, 0]}>
          <boxGeometry args={[0.09, 0.34, 0.1]} />
          <meshStandardMaterial color={pants} />
        </mesh>
      </group>
      {/* Torso + cabeza con leve rebote */}
      <group ref={bodyRef}>
        <mesh position={[0, 0.52, 0]}>
          <boxGeometry args={[0.26, 0.36, 0.16]} />
          <meshStandardMaterial color={look.shirt} />
        </mesh>
        {/* Brazos: pivote en el hombro (y=0.66) */}
        <group ref={armLRef} position={[-0.17, 0.66, 0]}>
          <mesh position={[0, -0.15, 0]}>
            <boxGeometry args={[0.07, 0.3, 0.08]} />
            <meshStandardMaterial color={look.shirt} />
          </mesh>
        </group>
        <group ref={armRRef} position={[0.17, 0.66, 0]}>
          <mesh position={[0, -0.15, 0]}>
            <boxGeometry args={[0.07, 0.3, 0.08]} />
            <meshStandardMaterial color={look.shirt} />
          </mesh>
        </group>
        <mesh position={[0, 0.82, 0]}>
          <boxGeometry args={[0.18, 0.18, 0.16]} />
          <meshStandardMaterial color={look.skin} />
        </mesh>
        {/* Pelo */}
        <mesh position={[0, 0.915, -0.01]}>
          <boxGeometry args={[0.19, 0.06, 0.17]} />
          <meshStandardMaterial color="#111114" />
        </mesh>
      </group>
    </group>
  );
}

/** Personaje que camina en bucle por una ruta de waypoints sobre el piso */
function Walker({
  path,
  speed = 0.55,
  offset = 0,
  look,
}: {
  path: [number, number][];
  speed?: number;
  offset?: number;
  look: CharacterLook;
}) {
  const rootRef = useRef<THREE.Group>(null);
  const legLRef = useRef<THREE.Group>(null);
  const legRRef = useRef<THREE.Group>(null);
  const armLRef = useRef<THREE.Group>(null);
  const armRRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);

  const { segments, total } = useMemo(() => {
    const pts = path.map(([x, z]) => new THREE.Vector2(x, z));
    const segs: { from: THREE.Vector2; to: THREE.Vector2; len: number }[] = [];
    let totalLen = 0;
    for (let i = 0; i < pts.length; i++) {
      const from = pts[i];
      const to = pts[(i + 1) % pts.length];
      const len = from.distanceTo(to);
      segs.push({ from, to, len });
      totalLen += len;
    }
    return { segments: segs, total: totalLen };
  }, [path]);

  useFrame(({ clock }) => {
    const root = rootRef.current;
    if (!root) return;
    const time = clock.elapsedTime;

    // Posición sobre la polilínea
    let dist = (time * speed + offset) % total;
    let seg = segments[0];
    for (const s of segments) {
      if (dist <= s.len) {
        seg = s;
        break;
      }
      dist -= s.len;
    }
    const tSeg = seg.len === 0 ? 0 : dist / seg.len;
    const x = THREE.MathUtils.lerp(seg.from.x, seg.to.x, tSeg);
    const z = THREE.MathUtils.lerp(seg.from.y, seg.to.y, tSeg);
    root.position.set(x, 0, z);

    // Orientación hacia la dirección de marcha (suavizada)
    const angle = Math.atan2(seg.to.x - seg.from.x, seg.to.y - seg.from.y);
    let delta = angle - root.rotation.y;
    delta = Math.atan2(Math.sin(delta), Math.cos(delta));
    root.rotation.y += delta * 0.15;

    // Ciclo de caminado
    const swing = Math.sin(time * 7 + offset * 10);
    if (legLRef.current) legLRef.current.rotation.x = swing * 0.55;
    if (legRRef.current) legRRef.current.rotation.x = -swing * 0.55;
    if (armLRef.current) armLRef.current.rotation.x = -swing * 0.45;
    if (armRRef.current) armRRef.current.rotation.x = swing * 0.45;
    if (bodyRef.current)
      bodyRef.current.position.y = Math.abs(Math.cos(time * 7 + offset * 10)) * 0.025;
  });

  return (
    <group ref={rootRef} scale={0.62}>
      <CharacterBody
        look={look}
        legLRef={legLRef}
        legRRef={legRRef}
        armLRef={armLRef}
        armRRef={armRRef}
        bodyRef={bodyRef}
      />
    </group>
  );
}

/** Personaje sentado tecleando frente a un escritorio */
function SittingDev({
  position,
  rotationY = 0,
  look,
  typeOffset = 0,
}: {
  position: [number, number, number];
  rotationY?: number;
  look: CharacterLook;
  typeOffset?: number;
}) {
  const armLRef = useRef<THREE.Group>(null);
  const armRRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 11 + typeOffset;
    // Tecleo alternado de brazos
    if (armLRef.current)
      armLRef.current.rotation.x = -1.1 + Math.sin(t) * 0.12;
    if (armRRef.current)
      armRRef.current.rotation.x = -1.1 + Math.sin(t + Math.PI) * 0.12;
    if (bodyRef.current)
      bodyRef.current.position.y = Math.sin(clock.elapsedTime * 1.5 + typeOffset) * 0.008;
  });

  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={0.62}>
      {/* Sentado: piernas dobladas fijas */}
      <group position={[0, 0.13, 0]}>
        <mesh position={[-0.06, 0, 0.12]}>
          <boxGeometry args={[0.09, 0.1, 0.3]} />
          <meshStandardMaterial color="#26262e" />
        </mesh>
        <mesh position={[0.06, 0, 0.12]}>
          <boxGeometry args={[0.09, 0.1, 0.3]} />
          <meshStandardMaterial color="#26262e" />
        </mesh>
      </group>
      <group position={[0, -0.16, 0]}>
        <CharacterBody
          look={look}
          armLRef={armLRef}
          armRRef={armRRef}
          bodyRef={bodyRef}
        />
      </group>
      {/* Silla */}
      <mesh position={[0, 0.1, -0.16]}>
        <boxGeometry args={[0.34, 0.06, 0.34]} />
        <meshStandardMaterial color={METAL} />
      </mesh>
      <mesh position={[0, 0.35, -0.32]}>
        <boxGeometry args={[0.34, 0.5, 0.06]} />
        <meshStandardMaterial color={METAL} />
      </mesh>
      <mesh position={[0, -0.05, -0.16]}>
        <cylinderGeometry args={[0.03, 0.03, 0.25, 6]} />
        <meshStandardMaterial color="#0c0c0e" />
      </mesh>
    </group>
  );
}

/* ---------------------------------- Mobiliario ---------------------------------- */

function DeskPod({
  position,
  rotationY = 0,
  screenSeed = 0,
}: {
  position: [number, number, number];
  rotationY?: number;
  screenSeed?: number;
}) {
  const screenRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    if (screenRef.current) {
      screenRef.current.emissiveIntensity =
        0.9 + Math.sin(clock.elapsedTime * 2 + screenSeed) * 0.25;
    }
  });

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Mesa */}
      <mesh position={[0, 0.42, 0]}>
        <boxGeometry args={[1.15, 0.05, 0.55]} />
        <meshStandardMaterial color={WOOD} roughness={0.6} />
      </mesh>
      {[-0.5, 0.5].map((x) => (
        <mesh key={x} position={[x, 0.2, 0]}>
          <boxGeometry args={[0.05, 0.4, 0.45]} />
          <meshStandardMaterial color={METAL} />
        </mesh>
      ))}
      {/* Monitor */}
      <group position={[0, 0.65, -0.12]}>
        <RoundedBox args={[0.62, 0.4, 0.04]} radius={0.015}>
          <meshStandardMaterial color={METAL} />
        </RoundedBox>
        <mesh position={[0, 0, 0.022]}>
          <planeGeometry args={[0.56, 0.34]} />
          <meshStandardMaterial
            ref={screenRef}
            color={DARKER}
            emissive={screenSeed % 2 === 0 ? ACID : "#5c5cff"}
            emissiveIntensity={1}
          />
        </mesh>
        <mesh position={[0, -0.24, 0]}>
          <boxGeometry args={[0.06, 0.1, 0.04]} />
          <meshStandardMaterial color={METAL} />
        </mesh>
      </group>
      {/* Teclado */}
      <mesh position={[0, 0.46, 0.12]}>
        <boxGeometry args={[0.4, 0.02, 0.14]} />
        <meshStandardMaterial color="#2c2c33" />
      </mesh>
    </group>
  );
}

function MeetingArea({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.05, 20]} />
        <meshStandardMaterial color={WOOD} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.06, 0.09, 0.4, 8]} />
        <meshStandardMaterial color={METAL} />
      </mesh>
      {/* Laptop sobre la mesa */}
      <group position={[0.1, 0.44, 0.1]} rotation={[0, -0.6, 0]}>
        <mesh>
          <boxGeometry args={[0.28, 0.015, 0.2]} />
          <meshStandardMaterial color={METAL} />
        </mesh>
        <mesh position={[0, 0.09, -0.1]} rotation={[-0.3, 0, 0]}>
          <boxGeometry args={[0.28, 0.18, 0.012]} />
          <meshStandardMaterial
            color={DARKER}
            emissive={ACID}
            emissiveIntensity={0.7}
          />
        </mesh>
      </group>
      {/* Pufs alrededor */}
      {[0, 1.6, 3.2, 4.8].map((a) => (
        <mesh
          key={a}
          position={[Math.cos(a) * 0.85, 0.14, Math.sin(a) * 0.85]}
        >
          <cylinderGeometry args={[0.18, 0.2, 0.22, 10]} />
          <meshStandardMaterial
            color={a === 0 ? ACID : "#2a2a32"}
            roughness={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

function Plant({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.12, 0.09, 0.24, 8]} />
        <meshStandardMaterial color="#2a2a32" />
      </mesh>
      <mesh position={[0, 0.4, 0]}>
        <coneGeometry args={[0.2, 0.45, 6]} />
        <meshStandardMaterial color="#3f6b1f" roughness={0.8} />
      </mesh>
      <mesh position={[0.08, 0.55, 0.05]}>
        <coneGeometry args={[0.13, 0.3, 6]} />
        <meshStandardMaterial color="#558b2c" roughness={0.8} />
      </mesh>
    </group>
  );
}

function Sofa({ position, rotationY = 0 }: { position: [number, number, number]; rotationY?: number }) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh position={[0, 0.18, 0]}>
        <boxGeometry args={[1.1, 0.25, 0.5]} />
        <meshStandardMaterial color="#26262e" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.42, -0.2]}>
        <boxGeometry args={[1.1, 0.35, 0.12]} />
        <meshStandardMaterial color="#26262e" roughness={0.9} />
      </mesh>
      {[-0.52, 0.52].map((x) => (
        <mesh key={x} position={[x, 0.32, 0]}>
          <boxGeometry args={[0.1, 0.3, 0.5]} />
          <meshStandardMaterial color="#1f1f26" roughness={0.9} />
        </mesh>
      ))}
      {/* Cojín acid */}
      <mesh position={[-0.3, 0.36, -0.08]} rotation={[0.3, 0.2, 0]}>
        <boxGeometry args={[0.24, 0.24, 0.08]} />
        <meshStandardMaterial color={ACID} roughness={0.9} />
      </mesh>
    </group>
  );
}

function CoffeeStation({ position }: { position: [number, number, number] }) {
  const ledRef = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(({ clock }) => {
    if (ledRef.current)
      ledRef.current.emissiveIntensity = 1.2 + Math.sin(clock.elapsedTime * 4) * 0.8;
  });
  return (
    <group position={position}>
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[0.7, 0.6, 0.4]} />
        <meshStandardMaterial color={WOOD} />
      </mesh>
      <mesh position={[0, 0.72, 0]}>
        <boxGeometry args={[0.26, 0.3, 0.24]} />
        <meshStandardMaterial color={METAL} />
      </mesh>
      <mesh position={[0, 0.72, 0.13]}>
        <circleGeometry args={[0.03, 10]} />
        <meshStandardMaterial
          ref={ledRef}
          color={ACID}
          emissive={ACID}
          emissiveIntensity={1.5}
        />
      </mesh>
    </group>
  );
}

/* ---------------------------------- Piso y raíz ---------------------------------- */

function Floor() {
  return (
    <group>
      <RoundedBox args={[10, 0.35, 6.8]} radius={0.1} position={[0, -0.18, 0]}>
        <meshStandardMaterial color={DARK} roughness={0.75} />
      </RoundedBox>
      <RoundedBox args={[8, 0.3, 5.4]} radius={0.1} position={[0.3, -0.56, 0.2]}>
        <meshStandardMaterial color={DARKER} roughness={0.85} />
      </RoundedBox>
      {/* Alfombra central del pasillo */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.1, 6.4]} />
        <meshStandardMaterial color="#191920" roughness={0.95} />
      </mesh>
      {/* Pasillo transversal */}
      <mesh position={[0, 0.004, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[9.4, 0.9]} />
        <meshStandardMaterial color="#17171d" roughness={0.95} />
      </mesh>
      {/* Líneas guía acid del piso */}
      {[-0.55, 0.55].map((x) => (
        <mesh key={x} position={[x, 0.006, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.02, 6.4]} />
          <meshStandardMaterial
            color={ACID}
            emissive={ACID}
            emissiveIntensity={0.35}
          />
        </mesh>
      ))}
    </group>
  );
}

/** Pareja de personajes de pie conversando con gestos */
function StandingTalkers({
  position,
  rotationY = 0,
}: {
  position: [number, number, number];
  rotationY?: number;
}) {
  const armARef = useRef<THREE.Group>(null);
  const armBRef = useRef<THREE.Group>(null);
  const bodyARef = useRef<THREE.Group>(null);
  const bodyBRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    // Gestos al hablar, alternándose
    if (armARef.current)
      armARef.current.rotation.x = -0.5 + Math.max(0, Math.sin(t * 1.4)) * 0.5;
    if (armBRef.current)
      armBRef.current.rotation.x = -0.4 + Math.max(0, Math.sin(t * 1.4 + Math.PI)) * 0.5;
    if (bodyARef.current) bodyARef.current.position.y = Math.sin(t * 2) * 0.01;
    if (bodyBRef.current) bodyBRef.current.position.y = Math.sin(t * 2 + 1) * 0.01;
  });

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <group position={[-0.28, 0, 0]} rotation={[0, Math.PI / 2.3, 0]} scale={0.62}>
        <CharacterBody
          look={{ shirt: SHIRT_COLORS[0], skin: SKIN_TONES[2] }}
          armRRef={armARef}
          bodyRef={bodyARef}
        />
      </group>
      <group position={[0.28, 0, 0]} rotation={[0, -Math.PI / 2.3, 0]} scale={0.62}>
        <CharacterBody
          look={{ shirt: SHIRT_COLORS[1], skin: SKIN_TONES[3] }}
          armRRef={armBRef}
          bodyRef={bodyBRef}
        />
      </group>
    </group>
  );
}

function Whiteboard({
  position,
  rotationY = 0,
}: {
  position: [number, number, number];
  rotationY?: number;
}) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {[-0.45, 0.45].map((x) => (
        <mesh key={x} position={[x, 0.5, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 1, 6]} />
          <meshStandardMaterial color={METAL} />
        </mesh>
      ))}
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[1.1, 0.65, 0.04]} />
        <meshStandardMaterial color="#e8e8ea" roughness={0.4} />
      </mesh>
      {/* Trazos */}
      {[
        { y: 0.95, w: 0.6, x: -0.15, acid: true },
        { y: 0.85, w: 0.75, x: -0.05, acid: false },
        { y: 0.75, w: 0.5, x: -0.2, acid: false },
        { y: 0.62, w: 0.65, x: 0.05, acid: true },
      ].map((line, i) => (
        <mesh key={i} position={[line.x, line.y, 0.025]}>
          <planeGeometry args={[line.w, 0.035]} />
          <meshStandardMaterial color={line.acid ? "#8aa814" : "#3a3a42"} />
        </mesh>
      ))}
    </group>
  );
}

function Shelf({ position, rotationY = 0 }: { position: [number, number, number]; rotationY?: number }) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[1, 1.1, 0.3]} />
        <meshStandardMaterial color={WOOD} />
      </mesh>
      {[0.85, 0.55, 0.25].map((y, row) => (
        <group key={y}>
          <mesh position={[0, y - 0.12, 0.13]}>
            <boxGeometry args={[0.9, 0.025, 0.05]} />
            <meshStandardMaterial color={METAL} />
          </mesh>
          {[-0.3, -0.1, 0.12, 0.3].map((x, i) => (
            <mesh key={x} position={[x, y, 0.1]}>
              <boxGeometry args={[0.07, 0.22, 0.12]} />
              <meshStandardMaterial
                color={(row * 4 + i) % 5 === 2 ? ACID : ["#2c2c36", "#3a3a46", "#23232c"][i % 3]}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function Office() {
  const groupRef = useRef<THREE.Group>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  // El canvas vive detrás del contenido del hero: leer el mouse desde window
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(({ clock }) => {
    const group = groupRef.current;
    if (!group) return;
    const pointer = pointerRef.current;
    // En pantallas anchas la oficina se corre a la derecha del titular
    const shiftX = size.width >= 1024 ? size.width / 1000 : 0;
    group.position.x = THREE.MathUtils.lerp(group.position.x, shiftX, 0.08);
    group.position.y = Math.sin(clock.elapsedTime * 0.6) * 0.06 - 0.2;
    group.rotation.y = THREE.MathUtils.lerp(
      group.rotation.y,
      -Math.PI / 4 + pointer.x * 0.16,
      0.05
    );
    group.rotation.x = THREE.MathUtils.lerp(
      group.rotation.x,
      pointer.y * -0.05,
      0.05
    );
  });

  return (
    <group ref={groupRef} rotation={[0, -Math.PI / 4, 0]}>
      <Floor />

      {/* Zona de escritorios: dos filas mirando al pasillo central */}
      <DeskPod position={[-1.6, 0, -2.2]} rotationY={Math.PI / 2} screenSeed={0} />
      <DeskPod position={[-1.6, 0, -0.9]} rotationY={Math.PI / 2} screenSeed={1} />
      <DeskPod position={[-1.6, 0, 1.5]} rotationY={Math.PI / 2} screenSeed={4} />
      <DeskPod position={[1.6, 0, -2.2]} rotationY={-Math.PI / 2} screenSeed={2} />
      <DeskPod position={[1.6, 0, -0.9]} rotationY={-Math.PI / 2} screenSeed={3} />
      <DeskPod position={[1.6, 0, 1.3]} rotationY={-Math.PI / 2} screenSeed={5} />

      {/* Devs sentados tecleando */}
      <SittingDev
        position={[-2.05, 0.16, -2.2]}
        rotationY={Math.PI / 2}
        look={{ shirt: SHIRT_COLORS[0], skin: SKIN_TONES[0] }}
        typeOffset={0}
      />
      <SittingDev
        position={[-2.05, 0.16, -0.9]}
        rotationY={Math.PI / 2}
        look={{ shirt: SHIRT_COLORS[2], skin: SKIN_TONES[1] }}
        typeOffset={2}
      />
      <SittingDev
        position={[-2.05, 0.16, 1.5]}
        rotationY={Math.PI / 2}
        look={{ shirt: SHIRT_COLORS[3], skin: SKIN_TONES[2] }}
        typeOffset={7}
      />
      <SittingDev
        position={[2.05, 0.16, -2.2]}
        rotationY={-Math.PI / 2}
        look={{ shirt: SHIRT_COLORS[1], skin: SKIN_TONES[2] }}
        typeOffset={4}
      />
      <SittingDev
        position={[2.05, 0.16, 1.3]}
        rotationY={-Math.PI / 2}
        look={{ shirt: SHIRT_COLORS[4], skin: SKIN_TONES[3] }}
        typeOffset={9}
      />

      {/* Personajes caminando */}
      <Walker
        path={[
          [-0.2, 2.8],
          [-0.2, -2.8],
          [0.3, -2.8],
          [0.3, 2.8],
        ]}
        speed={0.6}
        offset={0}
        look={{ shirt: SHIRT_COLORS[3], skin: SKIN_TONES[1] }}
      />
      <Walker
        path={[
          [-3.6, 2.2],
          [-0.7, 2.2],
          [-0.7, -2.6],
          [-3.6, -2.6],
        ]}
        speed={0.5}
        offset={3}
        look={{ shirt: SHIRT_COLORS[4], skin: SKIN_TONES[3] }}
      />
      <Walker
        path={[
          [3.7, 2.4],
          [0.8, 2.4],
          [0.8, -0.3],
          [3.7, -0.3],
        ]}
        speed={0.45}
        offset={6}
        look={{ shirt: SHIRT_COLORS[1], skin: SKIN_TONES[0] }}
      />
      <Walker
        path={[
          [3.9, -1],
          [0.9, -1],
          [0.9, -2.7],
          [3.9, -2.7],
        ]}
        speed={0.55}
        offset={9}
        look={{ shirt: SHIRT_COLORS[2], skin: SKIN_TONES[2] }}
      />
      <Walker
        path={[
          [-3.8, 0.6],
          [-0.8, 0.6],
          [-0.8, 2.6],
          [-3.8, 2.6],
        ]}
        speed={0.42}
        offset={12}
        look={{ shirt: SHIRT_COLORS[0], skin: SKIN_TONES[3] }}
      />

      {/* Pareja conversando junto al café */}
      <StandingTalkers position={[-3.4, 0, -0.4]} rotationY={0.4} />

      {/* Zonas comunes */}
      <MeetingArea position={[3.1, 0, 1.9]} />
      <Sofa position={[-3.3, 0, 1.6]} rotationY={0.6} />
      <CoffeeStation position={[-4.1, 0, -1.2]} />
      <Whiteboard position={[3.5, 0, -2.6]} rotationY={-0.8} />
      <Shelf position={[-1.6, 0, -2.95]} rotationY={0} />
      <Shelf position={[1.4, 0, 2.9]} rotationY={Math.PI} />
      <Plant position={[4.4, 0, -2.7]} />
      <Plant position={[-4.4, 0, 2.6]} />
      <Plant position={[4.3, 0, 0.6]} />
      <Plant position={[-4.4, 0, -2.6]} />
      <Plant position={[0.6, 0, -3]} />

      <Sparkles
        count={50}
        scale={[11, 4, 8]}
        size={1.8}
        speed={0.25}
        color={ACID}
        opacity={0.4}
        position={[0, 1.5, 0]}
      />
    </group>
  );
}

/** Ajusta el zoom de la cámara ortográfica al ancho disponible */
function ResponsiveZoom() {
  const { camera, size } = useThree();

  useEffect(() => {
    const zoom = THREE.MathUtils.clamp(size.width / 12.5, 55, 120);
    camera.zoom = zoom;
    camera.updateProjectionMatrix();
  }, [camera, size]);

  return null;
}

interface HeroScene3DProps {
  paused?: boolean;
}

/** Oficina startup isométrica con personajes animados para el hero */
export function HeroScene3D({ paused = false }: HeroScene3DProps) {
  return (
    <Canvas
      orthographic
      frameloop={paused ? "never" : "always"}
      dpr={[1, 1.5]}
      camera={{ zoom: 64, position: [10, 8, 10], near: 0.1, far: 100 }}
      resize={{ debounce: 100 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
      onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
    >
      <Suspense fallback={null}>
        <ResponsiveZoom />
        <ambientLight intensity={1.1} />
        <directionalLight position={[6, 10, 4]} intensity={2} color="#ffffff" />
        <pointLight position={[0, 3.5, 0]} intensity={14} color={ACID} distance={12} />
        <pointLight position={[-4, 2, 3]} intensity={7} color="#4a5aff" distance={14} />
        <Office />
      </Suspense>
    </Canvas>
  );
}
