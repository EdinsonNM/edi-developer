import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import p1 from "../../assets/images/projects/p1.png";
import p2 from "../../assets/images/projects/p2.png";
import p3 from "../../assets/images/projects/p3.png";
import p4 from "../../assets/images/projects/p4.png";
import p5 from "../../assets/images/projects/p5.png";
type Props = {
  layout: string;
  onClose: () => void;
};
function Projects(props: Props) {
  const projects = [
    { title: "Mi zona de trabajo", url: p1 },
    { title: "Un momento de relax", url: p2 },
    { title: "Miniwolrd", url: p3 },
    { title: "Asistente", url: p4 },
    { title: "manipulando huesos", url: p5 },
  ];
  return (
    <motion.div
      layoutId={props.layout}
      className="fixed flex flex-col left-0 top-0 right-0 bottom-0 z-20 bg-opacity-80 bg-black text-white justify-center items-center  backdrop-blur-md pointer-events-auto"
    >
      <div className="max-w-5xl relative p-8">
        <div className="text-start mb-10">
          <motion.h2 className="text-2xl md:text-4xl text-orange-500">
            Ultimos proyectos destacados
          </motion.h2>
          <motion.h5>Conoce mis ultimos proyectos destacados</motion.h5>
        </div>

        <motion.button
          className="bg-[#f22929] rounded-full w-10 h-10 flex justify-center items-center text-white cursor-pointer absolute top-4 right-4"
          whileHover={{ scale: 1.2, rotate: 360 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          onClick={props.onClose}
        >
          <IoClose className="text-2xl" />
        </motion.button>
        <motion.div className="flex-wrap grid grid-cols-12 gap-8">
          {projects.map((item) => (
            <motion.button
              className="col-span-6 md:col-span-3"
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.3 },
              }}
            >
              <img src={item.url} />
              <motion.h3 className="text-center">{item.title}</motion.h3>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
export default Projects;
