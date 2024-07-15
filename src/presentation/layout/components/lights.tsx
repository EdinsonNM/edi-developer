import PulsatingLight from "@design/molecules/pulsating-light";

function Lights() {
  return (
    <>
      <ambientLight />
      <PulsatingLight
        color={"cyan"}
        position={[1.4, 1.1, 1.5]}
        delay={500}
        frequency={10}
        maxIntensity={100}
        castShadow
        receiveShadow
      />
      <PulsatingLight
        color={"hotpink"}
        position={[-1.4, 1.1, 1.5]}
        delay={20}
        frequency={100}
        maxIntensity={100}
        castShadow
        receiveShadow
      />

      <PulsatingLight
        size={0.075}
        color={"yellow"}
        position={[-4.96, 2.45, 1.4]}
        delay={100}
        frequency={1}
        maxIntensity={100}
        castShadow
        receiveShadow
      />
      <spotLight
        intensity={100}
        distance={8}
        color={"white"}
        position={[0, 5, 2]}
        angle={Math.PI / 8}
        penumbra={0.05}
        rotation={[Math.PI / 4, Math.PI / 4, Math.PI / 4]}
      />
    </>
  );
}
export default Lights;
