function OverlayExperience() {
  return (
    <section
      className="overlay-home relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden bg-[#23232300] backdrop-blur-sm backdrop-brightness-50"
      style={{ pointerEvents: "auto" }}
    >
      <div className="w-full max-w-[1024px] flex flex-col items-center text-center">
        <div className="gap-4 ">
          <h1 className="text-5xl font-bold text-white  leading-snug">
            El viaje de un <span className="text-violet-500">Coder...</span>
          </h1>
          <h2 className="text-3xl italic text-[#7FBE6B]">
            “14 Años en la Trinchera del Frontend”
          </h2>
          <div className="text-sm mt-5 text-[#B5C8CC]">
            <p>
              Con más de 14 años de experiencia en desarrollo frontend, he
              trabajado en numerosas interfaces web y aplicaciones móviles,
              perfeccionando mis habilidades en tecnologías como JavaScript,
              TypeScript, React, Angular y Flutter. Mi carrera se ha destacado
              por una constante colaboración con equipos de todos los tamaños,
              desde startups hasta grandes corporaciones, enfocándome en
              soluciones que combinan elegancia y eficiencia para satisfacer
              requisitos complejos y mejorar la experiencia del usuario.
              Apasionado por el aprendizaje continuo y los nuevos desafíos,
              busco oportunidades que me permitan impulsar la innovación y el
              éxito en cada proyecto, elevando el nivel de los equipos con los
              que colaboro.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
export default OverlayExperience;
