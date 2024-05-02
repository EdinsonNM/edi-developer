import { Html, useGLTF } from "@react-three/drei";

export function Developer() {
  const gltf = useGLTF(`./developer.gltf`);
  console.log(gltf);
  return (
    <group>
      <primitive object={gltf.scene} castShadow />;
      <Html center position={[0, -7, 0]} className="w-[250px] md:w-[500px]">
        <h1 className="text-3xl font-bold">
          Bienvenido{" "}
          <span className="hidden md:inline-block">a Mi Mundo Digital</span>
        </h1>
        <h2>Descubre Mi Pasión por la Tecnología y Más Allá</h2>

        <a
          href="#/contacto"
          className="mt-4 inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          Conéctate conmigo
        </a>
      </Html>
    </group>
  );
}
