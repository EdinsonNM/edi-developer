"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/ui/animated-list";

interface Item {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
  link?: string;
  repository?: string;
}

let notifications = [
  {
    name: "Universo de particulas",
    description:
      "Descubre un universo de particulas creado con react y three.js",
    time: "15m ago",

    icon: "💸",
    color: "#00C9A7",
    link: "https://edi-solar-system-r3f.netlify.app/",
    repository: "https://github.com/juan-pablo-garcia/edi-solar-system-r3f",
  },
  {
    name: "Generador de objetos 3D",
    description: "Generador de objetos 3D creado con react y three.js",
    time: "10m ago",
    icon: "👤",
    color: "#FFB800",
    link: "https://gpt-r3f.netlify.app/",
    repository: "https://github.com/juan-pablo-garcia/generador-objetos-3d",
  },
  {
    name: "Asistente virtual",
    description:
      "Asistente virtual creado con react, react-three-fiber y openai",
    time: "5m ago",
    icon: "💬",
    color: "#FF3D71",
    link: "https://gpt-r3f.netlify.app/",
    repository: "https://github.com/juan-pablo-garcia/gpt-r3f",
  },
  {
    name: "Experiencias interactivas en 3D",
    description:
      "Esta es una presentación interactiva creada con react, react-three-fiber y three.js",
    time: "2m ago",
    icon: "🗞️",
    color: "#1E86FF",
    link: "https://creandoexperiencias3d.netlify.app/",
    repository: "https://github.com/juan-pablo-garcia/edi-solar-system-r3f",
  },
];

notifications = Array.from({ length: 10 }, () => notifications).flat();

const Notification = ({ name, description, icon, color, link }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full md:max-w-[600px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-cyan-900 bg-opacity-60 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
      )}
      onClick={() => {
        window.open(link, "_blank");
      }}
      role="button"
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60 text-start">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function Projects({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex w-full max-w-full md:h-[500px] flex-col p-6 overflow-hidden rounded-lg",
        className
      )}
    >
      <AnimatedList delay={3000}>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
}
