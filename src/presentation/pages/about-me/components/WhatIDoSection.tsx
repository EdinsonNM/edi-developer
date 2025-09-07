"use client";

import { useContext, memo } from "react";
import LayoutContext from "@presentation/layout/layout.context";
import { TextAnimate } from "@/components/ui/text-animate";

const WhatIDoItem = memo(
  ({
    icon,
    title,
    description,
    isDark,
  }: {
    icon: string;
    title: string;
    description: string;
    isDark: boolean | undefined;
  }) => (
    <div className="group relative">
      <div
        className={`p-6 xs:p-8 sm:p-10 md:p-12 transition-all duration-500 hover:scale-105 ${
          isDark
            ? "bg-slate-800/30 border border-slate-700/50"
            : "bg-white/50 border border-slate-200/50"
        } rounded-2xl backdrop-blur-sm`}
      >
        <div className="text-4xl xs:text-5xl sm:text-6xl mb-4 xs:mb-6 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
          {icon}
        </div>
        <h3
          className={`font-light text-xl xs:text-2xl sm:text-3xl mb-3 xs:mb-4 ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-base xs:text-lg leading-relaxed font-light ${
            isDark ? "text-white/70" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  )
);

WhatIDoItem.displayName = "WhatIDoItem";

export const WhatIDoSection = memo(() => {
  const { isDark } = useContext(LayoutContext);

  const activities = [
    {
      icon: "💻",
      title: "Desarrollo Frontend Senior",
      description: "JS/TS con enfoque en performance, DX y accesibilidad.",
    },
    {
      icon: "🤖",
      title: "Experimentos de IA",
      description:
        "LLMs, RAG, agentes aplicados a producto e interfaces 3D interactivas.",
    },
    {
      icon: "📚",
      title: "Docencia y Mentoría",
      description: "Charlas técnicas para comunidades y universidades.",
    },
  ];

  return (
    <section className="px-2 xs:px-3 sm:px-4 md:px-6 lg:px-0 py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 max-w-7xl mx-auto">
      <div className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16">
        <TextAnimate
          animation="slideUp"
          by="word"
          as="h2"
          className={`font-light text-2xl xs:text-3xl sm:text-4xl md:text-5xl mb-4 xs:mb-6 ${
            isDark ? "text-white" : "text-slate-900"
          }`}
          once={true}
        >
          Qué hago hoy
        </TextAnimate>
        <div className="w-24 h-px mx-auto bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xs:gap-8 sm:gap-10 md:gap-12">
        {activities.map((activity, index) => (
          <WhatIDoItem
            key={index}
            icon={activity.icon}
            title={activity.title}
            description={activity.description}
            isDark={isDark}
          />
        ))}
      </div>
    </section>
  );
});

WhatIDoSection.displayName = "WhatIDoSection";
