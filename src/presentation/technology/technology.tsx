import Button from "@design/atoms/button/button";
import Container from "@design/atoms/page/container";
import Description from "@design/atoms/page/description";
import Page from "@design/atoms/page/page";
import Subtitle from "@design/atoms/page/subtitle";
import Title from "@design/atoms/page/title";

function Technology() {
  return (
    <Page className="bg-black bg-opacity-75">
      <Container>
        <Title>
          El <span className="text-orange-500">arsenal</span> del
          <br />
          desarrollador...
        </Title>
        <Subtitle>“Herramientas que Manejo Mejor que mi Cafetera”</Subtitle>
        <Description>
          Bienvenido a mi caja de herramientas digital, donde las líneas de
          código fluyen más libremente que el café por la mañana. Con más de 14
          años de experiencia en el campo del desarrollo frontend, he
          perfeccionado mis habilidades en JavaScript, TypeScript, React,
          Angular y Flutter, equipándome con un arsenal de herramientas tan
          indispensable como mi cafetera diaria.
        </Description>
        <Button>Revisemos juntos...</Button>
      </Container>
    </Page>
  );
}
export default Technology;
