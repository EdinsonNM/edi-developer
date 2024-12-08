import Scene from "@presentation/layout/components/scene";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";

export default function Scenary() {
  return (
    <div className="absolute w-full h-full left-0 top-0">
      <Canvas
        gl={{ alpha: true }}
        style={{ background: "transparent" }}
        camera={{ fov: 45 }}
        className="w-full h-full"
      >
        <Physics>
          <Scene />
        </Physics>
      </Canvas>
    </div>
  );
}
