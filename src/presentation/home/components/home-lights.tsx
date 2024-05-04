function HomeLights() {
  return (
    <>
      <ambientLight intensity={1} color={"#debe82"} />
      <pointLight
        position={[6, 8, 7]}
        intensity={300}
        castShadow
        color={"#FF5400"}
      />
      <pointLight
        position={[-6, 8, 7]}
        intensity={300}
        castShadow
        color={"#332CFF"}
      />
      <pointLight
        position={[0, 16, 7]}
        intensity={100}
        castShadow
        color={"#fff"}
      />
    </>
  );
}
export default HomeLights;
