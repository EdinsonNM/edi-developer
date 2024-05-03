import { Html, useProgress } from "@react-three/drei";

function TechLoader() {
  const { progress } = useProgress();
  return (
    <group position={[0, 0, 0]}>
      <Html
        className="w-[200px] mt-10 text-gray-500"
        center
        position={[0, -1.5, 0]}
      >
        <div className="text-sm">npm install technologies...</div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-gray-300 h-2.5 rounded-full text-xs"
            style={{ width: `${Math.round(progress)}%` }}
          ></div>
        </div>
      </Html>
    </group>
  );
}
export default TechLoader;
