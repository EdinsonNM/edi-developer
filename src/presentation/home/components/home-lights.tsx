function HomeLights() {
  return (
    <>
      <pointLight
        position={[-6, 8, 7]}
        intensity={100}
        castShadow
        color={"#fff"}
      />
    </>
  );
}
export default HomeLights;
