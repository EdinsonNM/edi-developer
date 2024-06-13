import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaWhatsapp, FaLinkedin, FaTiktok } from "react-icons/fa";
import Title from "@design/atoms/page/title";
import Subtitle from "@design/atoms/page/subtitle";
import Description from "@design/atoms/page/description";
import Page from "@design/atoms/page/page";
import Container from "@design/atoms/page/container";

function OverlayHome() {
  const titleRef = useRef(null);
  const container = useRef(null);

  useGSAP(
    () => {
      // gsap code here...
      gsap.from(".title", { x: 2000, duration: 1 }); // <-- automatically reverted
      gsap.from(".subtitle", { x: -10, duration: 0.5 }); // <-- automatically reverted
      gsap.from(".desc", { duration: 0.5, opacity: 2 }); // <-- automatically reverted
    },
    { scope: container }
  ); // <-- scope is for selector text (optional)
  return (
    <Page>
      <Container>
        <Title>
          Construyendo el
          <br />
          <span className="text-violet-500">Futuro</span> de la Web
        </Title>
        <Subtitle>"Un Código a la Vez"</Subtitle>

        <Description>
          Explora cómo más de una década de innovación en desarrollo frontend me
          ha permitido liderar proyectos que transforman y enriquecen la
          experiencia digital. Sumérgete en un viaje a través de tecnologías
          punteras y descubre cómo cada línea de código contribuye a forjar un
          internet más interactivo y accesible.
        </Description>
        <a className="mt-4 inline-block bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition-colors pointer-events-all cursor-pointer">
          Conéctate conmigo
        </a>
        <div className="flex flex-row gap-10 mt-6">
          <div>
            <h3 className="text-sm text-yellow-500 w-28 text-center mb-3">
              Proyectos desarrollados
            </h3>
            <p className="text-5xl text-center">+300</p>
          </div>
          <div>
            <h3 className="text-sm text-yellow-500 w-28 text-center mb-3">
              Desarrolladores capacitados
            </h3>
            <p className="text-5xl text-center">+60</p>
          </div>
          <div>
            <h3 className="text-sm text-yellow-500 w-28 text-center mb-3">
              Años de experiencia
            </h3>
            <p className="text-5xl text-center">+14</p>
          </div>
          <div>
            <h3 className="text-sm text-yellow-500 w-28 text-center mb-3">
              Talleres brindados
            </h3>
            <p className="text-5xl text-center">+15</p>
          </div>
        </div>
        <div className="flex flex-row gap-5 text-2xl mt-3">
          <FaLinkedin className="text-blue-500" />
          <FaWhatsapp className=" text-green-500" />
          <FaTiktok />
        </div>
      </Container>
    </Page>
  );
}
export default OverlayHome;
