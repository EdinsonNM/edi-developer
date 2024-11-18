import { Button } from "@headlessui/react";
import { ReactElement, useEffect, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
} from "framer-motion";

import { FaAngular, FaPlus, FaReact } from "react-icons/fa";
import Projects from "@presentation/projects/projects";
import Companies from "@presentation/companies/companies";
import { RiFlutterFill } from "react-icons/ri";
import { TbBrandThreejs } from "react-icons/tb";
import { SiNextdotjs, SiNodedotjs, SiSass, SiTailwindcss, SiTypescript } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io5";

type StatProps = {
  id: string;
  title: string;
  value: number;
  icon: ReactElement;
};
function ItemStats({ title, value, icon }: StatProps) {
  const count = useMotionValue(0);

  useEffect(() => {
    const controls = animate(count, value);
    return () => controls.stop();
  }, [value]);

  return (
    <Button>
      <div className="pointer-events-auto  hover:text-orange-500">
        <h3 className="text-sm text-white w-28 text-center mb-3">{title}</h3>
        <div className="flex text-3xl md:text-4xl text-center justify-center items-center">
          {icon}
        </div>
      </div>
    </Button>
  );
}
function Stats() {
  const [selected, setSelected] = useState<StatProps | null>(null);

  const items = [
    {
      id: "stats-0",
      title: "Javascript",
      value: 300,
      icon: <IoLogoJavascript className="text-yellow-500" />,
      Screen: Projects,
    },
    {
      id: "stats-01",
      title: "Typescript",
      value: 300,
      icon: <SiTypescript className="text-blue-500" />,
      Screen: Projects,
    },
    {
      id: "stats-1",
      title: "Angular",
      value: 300,
      icon: <FaAngular className="text-red-500" />,
      Screen: Projects,
    },
    {
      id: "stats-2",
      title: "React",
      value: 100,
      icon: <FaReact className="text-blue-500" />,
      Screen: Companies,
    },
    {
      id: "stats-3",
      title: "Flutter",
      value: 14,
      icon: <RiFlutterFill className="text-cyan-500" />,
      Screen: Projects,
    },
    {
      id: "stats-4",
      title: "Three.js",
      value: 15,
      icon: <TbBrandThreejs className="text-purple-500" />,
      Screen: Projects,
    },
    {
      id: "stats-41",
      title: "Sass",
      value: 15,
      icon: <SiSass className="text-pink-500" />,
      Screen: Projects,
    },
    {
      id: "stats-42",
      title: "Tailwind",
      value: 15,
      icon: <SiTailwindcss className="text-cyan-500" />,
      Screen: Projects,
    },
    {
      id: "stats-43",
      title: "Node.js",
      value: 15,
      icon: <SiNodedotjs className="text-green-500" />,
      Screen: Projects,
    },
    {
      id: "stats-5",
      title: "More..",
      value: 15,
      icon: <FaPlus className="text-cyan-500" />,
      Screen: Projects,
    },
  ];

  return (
    <div className="flex flex-row gap-2 md:gap-6 mt-6 flex-wrap items-center justify-center md:justify-start">
      {items.map((Item, index) => (
        <>
          <motion.div
            key={index}
            layoutId={Item.id}
          
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.3 },
            }}
          >
            <ItemStats {...Item} />
          </motion.div>
          <AnimatePresence>
            {selected && selected.id == Item.id && (
              <Item.Screen layout={Item.id} onClose={() => setSelected(null)} />
            )}
          </AnimatePresence>
        </>
      ))}
    </div>
  );
}
export default Stats;
