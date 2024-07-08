import Container from "@design/atoms/page/container";
import Description from "@design/atoms/page/description";
import Subtitle from "@design/atoms/page/subtitle";
import Title from "@design/atoms/page/title";

function OverlayExperience() {
  return (
    <section
      className="overlay-home relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden bg-[#23232300] bg-black bg-opacity-55"
      style={{ pointerEvents: "auto" }}
    >
      <Container>
        <Title>
          El viaje de un <span className="text-violet-500">Coder...</span>
        </Title>
        <Subtitle>“14 Años en la Trinchera del Frontend”</Subtitle>
        <div className="text-sm mt-5 text-[#B5C8CC]">
          <Description>
            Con más de 14 años de experiencia en desarrollo frontend, he
            trabajado en numerosas interfaces web y aplicaciones móviles,
            perfeccionando mis habilidades en tecnologías como JavaScript,
            TypeScript, React, Angular y Flutter. Mi carrera se ha destacado por
            una constante colaboración con equipos de todos los tamaños, desde
            startups hasta grandes corporaciones, enfocándome en soluciones que
            combinan elegancia y eficiencia para satisfacer requisitos complejos
            y mejorar la experiencia del usuario. Apasionado por el aprendizaje
            continuo y los nuevos desafíos, busco oportunidades que me permitan
            impulsar la innovación y el éxito en cada proyecto, elevando el
            nivel de los equipos con los que colaboro.
          </Description>
        </div>
      </Container>
    </section>
  );
}
export default OverlayExperience;
