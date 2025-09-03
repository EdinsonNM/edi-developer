import { FaAngular, FaReact, FaAws, FaDocker, FaLinux } from "react-icons/fa";
import {
  SiTypescript,
  SiNodedotjs,
  SiCplusplus,
  SiPhp,
  SiKotlin,
  SiJavascript,
  SiFlutter,
  SiNestjs,
  SiHtml5,
  SiCss3,
  SiGatsby,
  SiTailwindcss,
} from "react-icons/si";
import { RiNextjsFill, RiOpenaiFill } from "react-icons/ri";
import { TbBrandThreejs } from "react-icons/tb";

type Props = {
  showShapes?: boolean; // optional decorative shapes
};

const FloatingTech = ({ showShapes = false }: Props) => {
  const tech = [
    { Icon: FaReact, className: "top-[10%] left-[15%] text-blue-500" },
    { Icon: SiTypescript, className: "top-[20%] right-[20%] text-blue-500" },
    { Icon: SiNodedotjs, className: "bottom-[25%] left-[25%] text-green-600" },
    { Icon: RiNextjsFill, className: "top-[35%] right-[10%] text-black" },
    { Icon: SiTailwindcss, className: "top-[5%] left-[45%] text-blue-500" },
    { Icon: FaAngular, className: "bottom-[15%] right-[30%] text-red-500" },
    { Icon: SiFlutter, className: "top-[60%] left-[8%] text-cyan-500" },
    {
      Icon: SiCplusplus,
      className: "bottom-[40%] right-[15%] text-yellow-500",
    },
    { Icon: SiJavascript, className: "top-[8%] right-[8%] text-yellow-500" },
    { Icon: SiHtml5, className: "bottom-[8%] left-[8%] text-orange-500" },
    { Icon: SiCss3, className: "top-[45%] left-[35%] text-blue-500" },
    { Icon: FaAws, className: "bottom-[50%] right-[8%] text-orange-500" },
    { Icon: FaDocker, className: "top-[75%] right-[25%] text-blue-500" },
    { Icon: FaLinux, className: "bottom-[35%] left-[12%] text-yellow-500" },
    { Icon: RiOpenaiFill, className: "top-[85%] right-[40%] text-black" },
    {
      Icon: TbBrandThreejs,
      className: "bottom-[70%] left-[40%] text-purple-500",
    },
    { Icon: SiNestjs, className: "top-[30%] left-[60%] text-red-500" },
    { Icon: SiPhp, className: "bottom-[60%] right-[45%] text-purple-500" },
    { Icon: SiKotlin, className: "top-[50%] right-[50%] text-orange-500" },
    { Icon: SiGatsby, className: "bottom-[80%] left-[60%] text-purple-500" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-5 w-full">
      {tech.map(({ Icon, className }, i) => (
        <div
          key={i}
          className={`absolute floating-tech ${className}`}
          style={{ animationDelay: `${i * -1.5}s` }}
        >
          <Icon className="w-10 h-10 md:w-14 md:h-14 opacity-20 hover:opacity-40 transition-opacity duration-300" />
        </div>
      ))}

      {showShapes && (
        <>
          {/* Decorative floating shapes (disabled by default) */}
          <div
            className="absolute top-1/2 right-1/3 floating-tech"
            style={{ animationDelay: "-1s" }}
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 glow-primary animate-pulse" />
          </div>
          <div
            className="absolute bottom-1/4 right-1/4 floating-tech"
            style={{ animationDelay: "-2s" }}
          >
            <div className="w-8 h-8 rounded-full bg-accent/20 glow-accent animate-pulse" />
          </div>
          <div
            className="absolute top-3/4 left-1/4 floating-tech"
            style={{ animationDelay: "-3s" }}
          >
            <div className="w-10 h-10 rounded-lg bg-secondary/30 glow-secondary animate-pulse" />
          </div>
        </>
      )}
    </div>
  );
};

export default FloatingTech;
