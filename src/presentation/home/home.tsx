import { FaWhatsapp, FaLinkedin, FaTiktok, FaGithub } from "react-icons/fa";
import Title from "@design/atoms/page/title";
import Subtitle from "@design/atoms/page/subtitle";
import Description from "@design/atoms/page/description";
import Page from "@design/atoms/page/page";
import Container from "@design/atoms/page/container";
import Stats from "./components/stats";
import Button from "@design/atoms/button/button";
import { Button as ButtonUI } from "@headlessui/react";

function OverlayHome() {
  return (
    <Page className="bg-black bg-opacity-75 md:bg-opacity-0">
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
            <ButtonUI
              as="a"
              target="_blank"
              href="https://www.linkedin.com/in/edinsonnm/"
              className="inline-flex items-center gap-2 rounded-md  py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
            >
              <FaLinkedin className="text-blue-500 text-2xl" />
            </ButtonUI>
            <ButtonUI
              as="a"
              target="_blank"
              href="https://wa.me/972705736"
              className="inline-flex items-center gap-2 rounded-md  py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
            >
              <FaWhatsapp className=" text-green-500 text-2xl" />
            </ButtonUI>
            <ButtonUI
              as="a"
              target="_blank"
              href="https://www.tiktok.com/@edinsonnm?is_from_webapp=1&sender_device=pc"
              className="inline-flex items-center gap-2 rounded-md  py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
            >
              <FaTiktok className="text-2xl" />
            </ButtonUI>
            <ButtonUI
              as="a"
              target="_blank"
              href="https://github.com/EdinsonNM"
              className="inline-flex items-center gap-2 rounded-md  py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
            >
              <FaGithub className="text-2xl" />
            </ButtonUI>
          </div>
        </div>
      </Container>
    </Page>
  );
}
export default OverlayHome;
