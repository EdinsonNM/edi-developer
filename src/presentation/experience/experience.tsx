import Button from "@design/atoms/button/button";
import Container from "@design/atoms/page/container";
import Description from "@design/atoms/page/description";
import Page from "@design/atoms/page/page";
import Subtitle from "@design/atoms/page/subtitle";
import Title from "@design/atoms/page/title";

function Experience() {
  return (
    <Page className="bg-black bg-opacity-75">
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
            TypeScript, React, Angular y Flutter. <br />
            <br />
            Conoce un poco mas sobre mis charlas brindadas y otros temas que
            podrian ser de tu interes.
          </Description>
        </div>
        <div>
          <Button>Visita mi blog</Button>
        </div>
      </Container>
    </Page>
  );
}
export default Experience;
