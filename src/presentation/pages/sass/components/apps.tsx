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
    name: "Carta Viva",
    description:
      "Es una solución diseñada para modernizar la experiencia gastronómica.",
    time: "15m ago",

    icon: "/carta_viva.png",
    color: "#fff",
    link: "",
    repository: "https://github.com/juan-pablo-garcia/edi-solar-system-r3f",
  },
  {
    name: "Zypher",
    description:
      "La agenda electrónica que conecta familias, docentes y estudiantes.",
    time: "10m ago",
    icon: "/zypher.png",
    color: "#000",
    link: "https://gpt-r3f.netlify.app/",
    repository: "https://github.com/juan-pablo-garcia/generador-objetos-3d",
  },
  {
    name: "Auralynk",
    description:
      "Auralynk es tu asistente personal de productividad. Escucha tus reuniones o clases, toma notas automáticamente y te entrega un resumen.",
    time: "5m ago",
    icon: "/auralynk.png",
    color: "#2112a8",
    link: "https://gpt-r3f.netlify.app/",
    repository: "https://github.com/juan-pablo-garcia/gpt-r3f",
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
          className="flex items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <div className="w-32 h-32 p-4">
            <img src={icon} alt={name} className="w-30 mx-auto" />
          </div>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-2xl">{name}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60 text-start">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function Apps({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex w-full max-w-full md:h-[550px] flex-col p-6 overflow-hidden rounded-lg",
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
