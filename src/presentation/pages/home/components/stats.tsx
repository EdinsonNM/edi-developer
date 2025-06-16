import { Button } from "@headlessui/react";
import { ReactElement, useEffect } from "react";
import { animate, motion, useMotionValue } from "framer-motion";

import { FaAngular, FaPlus, FaReact } from "react-icons/fa";

import { RiFlutterFill } from "react-icons/ri";
import { TbBrandThreejs } from "react-icons/tb";
import {
  SiNodedotjs,
  SiSass,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io5";
import Marquee from "@/components/ui/marquee";

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
        <h3 className="text-sm text-black dark:text-white w-28 text-center mb-3">
          {title}
        </h3>
        <div className="flex text-3xl md:text-4xl text-center justify-center items-center">
          {icon}
        </div>
      </div>
    </Button>
  );
}
function Stats() {
  const items = [
    {
      id: "stats-0",
      title: "Javascript",
      value: 300,
      icon: <IoLogoJavascript className="text-yellow-500" />,
    },
    {
      id: "stats-01",
      title: "Typescript",
      value: 300,
      icon: <SiTypescript className="text-blue-500" />,
    },
    {
      id: "stats-1",
      title: "Angular",
      value: 300,
      icon: <FaAngular className="text-red-500" />,
    },
    {
      id: "stats-2",
      title: "React",
      value: 100,
      icon: <FaReact className="text-blue-500" />,
    },
    {
      id: "stats-3",
      title: "Flutter",
      value: 14,
      icon: <RiFlutterFill className="text-cyan-500" />,
    },
    {
      id: "stats-4",
      title: "Three.js",
      value: 15,
      icon: <TbBrandThreejs className="text-purple-500" />,
    },
    {
      id: "stats-41",
      title: "Sass",
      value: 15,
      icon: <SiSass className="text-pink-500" />,
    },
    {
      id: "stats-42",
      title: "Tailwind",
      value: 15,
      icon: <SiTailwindcss className="text-cyan-500" />,
    },
    {
      id: "stats-43",
      title: "Node.js",
      value: 15,
      icon: <SiNodedotjs className="text-green-500" />,
    },
    {
      id: "stats-5",
      title: "More..",
      value: 15,
      icon: <FaPlus className="text-cyan-500" />,
    },
  ];

  return (
    <Marquee pauseOnHover className="[--duration:20s] w-full">
      {items.map((Item, index) => (
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
      ))}
    </Marquee>
  );
}
export default Stats;
