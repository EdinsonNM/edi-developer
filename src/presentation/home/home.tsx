import { FaWhatsapp, FaLinkedin, FaTiktok, FaGithub } from "react-icons/fa";
import Title from "@design/atoms/page/title";
import Subtitle from "@design/atoms/page/subtitle";
import Description from "@design/atoms/page/description";
import Page from "@design/atoms/page/page";
import Container from "@design/atoms/page/container";
import Stats from "./components/stats";
import Button from "@design/atoms/button/button";

function OverlayHome() {
  return (
    <Page>
      <Container>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-8">
            <Title>
              Construyendo el
              <br />
              <span className="text-orange-500">Futuro</span> de la Web
            </Title>
            <Subtitle>"Un Código a la Vez"</Subtitle>

            <Description>
              Explora cómo más de una década de innovación en desarrollo
              frontend me ha permitido liderar proyectos que transforman y
              enriquecen la experiencia digital.
            </Description>
          </div>
          <div className="col-span-12 md:col-span-4 justify-center items-center flex">
            <Stats />
          </div>
        </div>
        <div>
          <Button>Conéctate conmigo</Button>

          <div className="flex flex-row gap-5 text-2xl mt-3">
            <FaLinkedin className="text-blue-500 hover:text-2xl" />
            <FaWhatsapp className=" text-green-500" />
            <FaTiktok />
            <FaGithub />
          </div>
        </div>
      </Container>
    </Page>
  );
}
export default OverlayHome;
