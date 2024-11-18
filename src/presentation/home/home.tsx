import { FaWhatsapp, FaLinkedin, FaTiktok, FaGithub } from "react-icons/fa";
import Title from "@design/atoms/page/title";
import Subtitle from "@design/atoms/page/subtitle";
import Description from "@design/atoms/page/description";
import Page from "@design/atoms/page/page";
import Container from "@design/atoms/page/container";
import Stats from "./components/stats";
import useModal from "@core/ui/hooks/use-modal";
import About from "./components/about";
import { motion } from "framer-motion";

function OverlayHome() {
  const { isOpen, toogle } = useModal();
  return (
    <Page className="bg-black bg-opacity-75 md:bg-opacity-50 overflow-auto">
      <Container>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-12">
            <Title>
              Construyendo el
              <br />
              <span className="text-orange-500">Futuro</span> de la Web
            </Title>
            <Subtitle>"Un Código a la Vez"</Subtitle>

         <div className="flex justify-center md:justify-start items-start mt-4 pointer-events-auto">
         <motion.a
            layoutId="about"
            href="https://cal.com/edinson-nunez-more"
            target="_blank"
            whileHover={{
              scale: 1.2,
            }}
            className="flex justify-center items-center gap-2 rounded-lg py-2 px-4 text-lg font-bold text-white bg-gradient-to-r from-orange-400 to-pink-500 shadow-lg hover:from-orange-500 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 "
          >
            Contáctame
          </motion.a>
         </div>
            <Description>
              Explora cómo más de una década de innovación en desarrollo
              frontend me ha permitido liderar proyectos que transforman y
              enriquecen la experiencia digital.
            </Description>
            <Stats />
          </div>
          <div className="col-span-12 md:col-span-4 justify-center items-center flex pointer-events-none"></div>
        </div>
        <div className="pointer-events-auto">
         
          <div className="fixed right-0 top-1/2 transform -translate-y-1/2 flex flex-col gap-5 text-2xl md:right-0 md:top-1/2 md:transform md:-translate-y-1/2 md:flex md:flex-col md:gap-5 md:text-2xl">
            <motion.a
              whileHover={{ scale: 1.2, rotate: 360 }}
              target="_blank"
              href="https://www.linkedin.com/in/edinsonnm/"
              className="inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
            >
              <FaLinkedin className="text-blue-500 text-2xl" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2, rotate: 360 }}
              target="_blank"
              href="https://wa.me/972705736"
              className="inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
            >
              <FaWhatsapp className="text-green-500 text-2xl" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2, rotate: 360 }}
              target="_blank"
              href="https://www.tiktok.com/@edinsonnm?is_from_webapp=1&sender_device=pc"
              className="inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
            >
              <FaTiktok className="text-2xl" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2, rotate: 360 }}
              target="_blank"
              href="https://github.com/EdinsonNM"
              className="inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
            >
              <FaGithub className="text-2xl" />
            </motion.a>
          </div>
        </div>
      </Container>
      <About isOpen={isOpen} layoutId="about" onClose={toogle} />
    </Page>
  );
}
export default OverlayHome;
