import { Button } from "@headlessui/react";
import { ReactElement, useEffect, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
} from "framer-motion";

import {
  FaProjectDiagram,
  FaBuilding,
  FaBriefcase,
  FaBlog,
} from "react-icons/fa";
import Projects from "@presentation/projects/projects";
import Companies from "@presentation/companies/companies";

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
        <h3 className="text-sm text-gray-500 w-28 text-center mb-3">{title}</h3>
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
      id: "stats-1",
      title: "Proyectos desarrollados",
      value: 300,
      icon: <FaProjectDiagram />,
      Screen: Projects,
    },
    {
      id: "stats-2",
      title: "Confian en mi trabajo",
      value: 100,
      icon: <FaBuilding />,
      Screen: Companies,
    },
    {
      id: "stats-3",
      title: "Años de experiencia",
      value: 14,
      icon: <FaBriefcase />,
      Screen: Projects,
    },
    {
      id: "stats-4",
      title: "Talleres brindados",
      value: 15,
      icon: <FaBlog />,
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
            onClick={() => setSelected(Item)}
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
