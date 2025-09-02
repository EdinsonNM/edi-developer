import { SiReact, SiTypescript, SiNodedotjs, SiNextdotjs, SiTailwindcss, SiSupabase } from "react-icons/si";

type Props = {
  showShapes?: boolean; // optional decorative shapes
};

const FloatingTech = ({ showShapes = false }: Props) => {
  const tech = [
    { Icon: SiReact, className: "top-1/4 left-1/4 text-cyan-400" },
    { Icon: SiTypescript, className: "top-1/3 right-1/5 text-blue-500" },
    { Icon: SiNodedotjs, className: "bottom-1/3 left-1/3 text-green-500" },
    { Icon: SiNextdotjs, className: "top-1/2 right-1/4 text-zinc-400" },
    { Icon: SiTailwindcss, className: "top-1/5 left-1/2 text-sky-400" },
    { Icon: SiSupabase, className: "bottom-1/4 right-1/4 text-emerald-400" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {tech.map(({ Icon, className }, i) => (
        <div
          key={i}
          className={`absolute floating-tech ${className}`}
          style={{ animationDelay: `${i * -2}s` }}
        >
          <Icon className="w-12 h-12 md:w-16 md:h-16 opacity-20 hover:opacity-40 transition-opacity duration-300" />
        </div>
      ))}

      {showShapes && (
        <>
          {/* Decorative floating shapes (disabled by default) */}
          <div className="absolute top-1/2 right-1/3 floating-tech" style={{ animationDelay: "-1s" }}>
            <div className="w-12 h-12 rounded-lg bg-primary/10 glow-primary animate-pulse" />
          </div>
          <div className="absolute bottom-1/4 right-1/4 floating-tech" style={{ animationDelay: "-2s" }}>
            <div className="w-8 h-8 rounded-full bg-accent/20 glow-accent animate-pulse" />
          </div>
          <div className="absolute top-3/4 left-1/4 floating-tech" style={{ animationDelay: "-3s" }}>
            <div className="w-10 h-10 rounded-lg bg-secondary/30 glow-secondary animate-pulse" />
          </div>
        </>
      )}
    </div>
  );
};

export default FloatingTech;

