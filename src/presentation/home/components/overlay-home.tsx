import { FaWhatsapp, FaLinkedin, FaTiktok } from "react-icons/fa";
import Title from "@design/atoms/page/title";
import Subtitle from "@design/atoms/page/subtitle";
import Description from "@design/atoms/page/description";
import Page from "@design/atoms/page/page";
import Container from "@design/atoms/page/container";

function OverlayHome() {
  return (
    <Page>
      <Container>
        <div className="flex flex-col gap-4 md:gap-6">
          <Title>
            Construyendo el
            <br />
            <span className="text-violet-500">Futuro</span> de la Web
          </Title>
          <Subtitle>"Un Código a la Vez"</Subtitle>

          <Description>
            Explora cómo más de una década de innovación en desarrollo frontend
            me ha permitido liderar proyectos que transforman y enriquecen la
            experiencia digital. Sumérgete en un viaje a través de tecnologías
            punteras y descubre cómo cada línea de código contribuye a forjar un
            internet más interactivo y accesible.
          </Description>
          <div>
            <a className="mt-4 inline-block bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition-colors pointer-events-all cursor-pointer">
              Conéctate conmigo
            </a>
          </div>

          <div className="flex flex-row gap-5 text-2xl mt-3">
            <FaLinkedin className="text-blue-500" />
            <FaWhatsapp className=" text-green-500" />
            <FaTiktok />
          </div>
        </div>
        <div className="w-full md:w-[300px] justify-center items-center">
          <div className="flex flex-row gap-8 md:gap-10 mt-6 flex-wrap items-end justify-end">
            <div>
              <h3 className="text-sm text-yellow-500 w-28 text-center mb-3">
                Proyectos desarrollados
              </h3>
              <p className="text-3xl md:text-5xl text-center">+300</p>
            </div>
            <div>
              <h3 className="text-sm text-yellow-500 w-28 text-center mb-3">
                Desarrolladores capacitados
              </h3>
              <p className="text-3xl md:text-5xl text-center">+60</p>
            </div>
            <div>
              <h3 className="text-sm text-yellow-500 w-28 text-center mb-3">
                Años de experiencia
              </h3>
              <p className="text-3xl md:text-5xl text-center">+14</p>
            </div>
            <div>
              <h3 className="text-sm text-yellow-500 w-28 text-center mb-3">
                Talleres brindados
              </h3>
              <p className="text-3xl md:text-5xl text-center">+15</p>
            </div>
          </div>
        </div>
      </Container>
    </Page>
  );
}
export default OverlayHome;
