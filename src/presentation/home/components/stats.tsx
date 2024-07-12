import { Button } from "@headlessui/react";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";

import p1 from "../../../assets/images/projects/p1.png";
import p2 from "../../../assets/images/projects/p2.png";
import p3 from "../../../assets/images/projects/p3.png";
import p4 from "../../../assets/images/projects/p4.png";
import p5 from "../../../assets/images/projects/p5.png";
import { IoClose } from "react-icons/io5";

type StatProps = {
  id: string;
  title: string;
  value: number;
};
function ItemStats({ title, value }: StatProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, value);
    return () => controls.stop();
  }, [value]);

  return (
    <Button>
      <div>
        <h3 className="text-sm text-gray-500 w-28 text-center mb-3">{title}</h3>
        <div className="flex text-3xl md:text-5xl text-center justify-center items-center">
          +<motion.div>{rounded}</motion.div>
        </div>
      </div>
    </Button>
  );
}
function Stats() {
  const [selected, setSelected] = useState<StatProps | null>(null);

  const items = [
    { id: "stats-1", title: "Proyectos desarrollados", value: 300 },
    { id: "stats-2", title: "Confian en mi trabajo", value: 100 },
    { id: "stats-3", title: "Años de experiencia", value: 14 },
    { id: "stats-4", title: "Talleres brindados", value: 15 },
  ];

  const projects = [
    { title: "Mi zona de trabajo", url: p1 },
    { title: "Un momento de relax", url: p2 },
    { title: "Miniwolrd", url: p3 },
    { title: "Asistente", url: p4 },
    { title: "manipulando huesos", url: p5 },
  ];
  return (
    <div className="flex flex-row gap-2 md:gap-6 mt-6 flex-wrap items-center justify-center md:justify-start">
      {items.map((item, index) => (
        <motion.div
          key={index}
          layoutId={item.id}
          onClick={() => setSelected(item)}
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.3 },
          }}
        >
          <ItemStats {...item} />
        </motion.div>
      ))}
      <AnimatePresence>
        {selected && (
          <motion.div
            layoutId={selected.id as string}
            className="fixed flex flex-col left-0 top-0 right-0 bottom-0 z-20 bg-opacity-80 bg-black text-white justify-center items-center  backdrop-blur-md"
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
                onClick={() => setSelected(null)}
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
        )}
      </AnimatePresence>
    </div>
  );
}
export default Stats;
