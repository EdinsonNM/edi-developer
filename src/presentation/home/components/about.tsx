import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import developer from "../../../assets/images/developer.png";
import profile from "../../../assets/images/profile.jpeg";
type Props = {
  layoutId: string;
  isOpen: boolean;
  onClose: (event: any) => void;
};
function About({ layoutId, isOpen, onClose }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          layoutId={layoutId}
          className="fixed flex flex-col left-0 top-0 right-0 bottom-0 z-20 overflow-auto pointer-events-auto"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#ef4445",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.button
            className="bg-[#f22929] rounded-full w-10 h-10 flex justify-center items-center text-white cursor-pointer absolute top-4 right-4"
            whileHover={{ scale: 1.2, rotate: 360 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={onClose}
          >
            <IoClose className="text-2xl" />
          </motion.button>
          <motion.div className="grid grid-cols-12 max-w-5xl gap-4 h-full p-8">
            <motion.div className="col-span-12 md:col-span-5 h-full flex flex-col justify-start p-12 py-2">
              <img src={developer} className="w-full mx-auto" />
            </motion.div>
            <motion.div className="col-span-12 md:col-span-7 flex flex-col gap-4 items-start justify-center">
              <motion.div className="px-8 py-10 bg-[#f22929] rounded-2xl w-full text-start flex flex-row gap-4">
                <div>
                  <div className="w-16 h-16 rounded-full bg-white overflow-hidden">
                    <img src={profile} />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl md:text-3xl">
                    Edinson <span className="text-yellow-500">Nuñez More</span>.
                  </h1>
                  <h5 className="font-bold">Ingeniero informático</h5>
                  <h5 className="text-sm">Desarrollador Frontend</h5>
                </div>
              </motion.div>
              <motion.h2 className="text-xl font-bold">Acerca de mi</motion.h2>
              <motion.p className="px-8 py-10 bg-[#f22929] rounded-2xl text-justify">
                ¡Hola! Soy un apasionado Desarrollador Frontend y Chapter Lead
                con más de 14 años de experiencia en la creación de soluciones
                web y móviles de alto impacto y rendimiento. Me enorgullezco de
                mi habilidad para liderar equipos y proyectos con éxito, y de
                ser un experto en tecnologías clave del frontend, como React,
                Angular, y múltiples frameworks adicionales. Además, poseo
                conocimientos en Flutter y Node.js, lo que me permite diseñar y
                desarrollar aplicaciones versátiles y escalables.
              </motion.p>
              <motion.h2 className="text-xl font-bold">Habilidades:</motion.h2>

              <motion.div className="px-8 py-10 bg-[#f22929] rounded-2xl w-full mb-8">
                <div className="text-start font-bold">
                  Lenguajes de Programación:
                </div>
                <ul className="text-start list-disc">
                  <li>JavaScript</li>
                  <li>TypeScript</li>
                  <li>PHP</li>
                  <li>Node JS</li>
                </ul>
                <br />
                <div className="text-start font-bold">Frameworks:</div>
                <ul className="text-start list-disc">
                  <li>React</li>
                  <li>Angular</li>
                  <li>Svelte</li>
                  <li>Flutter</li>
                  <li>Stencil</li>
                </ul>{" "}
                <br />
                <div className="text-start font-bold">Desarrollo 3D:</div>
                <ul className="text-start list-disc">
                  <li>Blender</li>
                  <li>ZBrush</li>
                  <li>Three JS</li>
                  <li>React Three Fiber</li>
                </ul>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default About;
