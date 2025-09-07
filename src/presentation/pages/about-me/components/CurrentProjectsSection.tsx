"use client";

import { useContext, memo } from "react";
import LayoutContext from "@presentation/layout/layout.context";
import { TextAnimate } from "@/components/ui/text-animate";
import { Badge } from "@/components/ui/badge";

const ProjectCard = memo(
  ({
    name,
    description,
    features,
    isDark,
  }: {
    name: string;
    description: string;
    features: string[];
    isDark: boolean | undefined;
  }) => (
    <div className="group relative">
      <div
        className={`p-6 xs:p-8 sm:p-10 md:p-12 transition-all duration-500 hover:scale-105 ${
          isDark
            ? "bg-slate-800/30 border border-slate-700/50"
            : "bg-white/50 border border-slate-200/50"
        } rounded-2xl backdrop-blur-sm h-full`}
      >
        <div className="mb-6 xs:mb-8 sm:mb-10">
          <h3
            className={`font-light text-2xl xs:text-3xl sm:text-4xl mb-3 xs:mb-4 ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            {name}
          </h3>
          <p
            className={`text-base xs:text-lg leading-relaxed font-light ${
              isDark ? "text-white/70" : "text-slate-600"
            }`}
          >
            {description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 xs:gap-3">
          {features.map((feature, index) => (
            <Badge
              key={index}
              variant="secondary"
              className={`px-4 py-2 text-sm font-light ${
                isDark
                  ? "bg-slate-700/50 text-white/80 border-slate-600/50"
                  : "bg-slate-100/80 text-slate-700 border-slate-200/50"
              }`}
            >
              {feature}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
);

ProjectCard.displayName = "ProjectCard";

export const CurrentProjectsSection = memo(() => {
  const { isDark } = useContext(LayoutContext);

  const projects = [
    {
      name: "Yaqu",
      description:
        "Plataforma moderna de gestión del agua con módulos de planificación, pagos y analítica asistida por IA.",
      features: ["Gestión del agua", "IA", "Analítica", "Pagos"],
    },
    {
      name: "NeoSense",
      description:
        "Agente LLM que entiende preguntas en lenguaje natural, consulta BD y genera UI dinámica/visualizaciones.",
      features: ["LLM", "UI Dinámica", "Visualizaciones", "BD"],
    },
    {
      name: "Zypher",
      description:
        "Agenda educativa con notificaciones y un chat inteligente para estudiantes y padres.",
      features: ["Educación", "Chat IA", "Notificaciones", "Padres"],
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
          Proyectos en los que estoy trabajando
        </TextAnimate>
        <div className="w-24 h-px mx-auto bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xs:gap-8 sm:gap-10 md:gap-12">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            name={project.name}
            description={project.description}
            features={project.features}
            isDark={isDark}
          />
        ))}
      </div>
    </section>
  );
});

CurrentProjectsSection.displayName = "CurrentProjectsSection";
