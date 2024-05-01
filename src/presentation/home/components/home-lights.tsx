function HomeLights() {
  return (
    <>
      <pointLight
        position={[6, 8, 7]}
        intensity={150}
        castShadow
        color={"#FF5400"}
      />
      <pointLight
        position={[-6, 8, 7]}
        intensity={150}
        castShadow
        color={"#332CFF"}
      />
      <pointLight
        position={[0, 16, 7]}
        intensity={150}
        castShadow
        color={"#CEF5FF"}
      />
    </>
  );
}
export default HomeLights;
