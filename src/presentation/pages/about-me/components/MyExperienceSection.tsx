"use client";

import { useContext, memo } from "react";
import LayoutContext from "@presentation/layout/layout.context";
import { TextAnimate } from "@/components/ui/text-animate";
import { Card } from "@/components/ui/card";

const ExperienceCard = memo(
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
    <Card
      className={`p-6 xs:p-8 sm:p-10 transition-all duration-300 hover:shadow-lg hover:scale-105 ${
        isDark
          ? "bg-slate-800/40 border-slate-700/60 backdrop-blur-sm"
          : "bg-white/60 border-slate-200/60 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
              isDark ? "bg-slate-700/50" : "bg-slate-100/80"
            }`}
          >
            {icon}
          </div>
        </div>
        <div className="flex-1">
          <h3
            className={`font-semibold text-lg xs:text-xl mb-2 ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            {title}
          </h3>
          <p
            className={`text-sm xs:text-base leading-relaxed ${
              isDark ? "text-white/80" : "text-slate-600"
            }`}
          >
            {description}
          </p>
        </div>
      </div>
    </Card>
  )
);

ExperienceCard.displayName = "ExperienceCard";

export const MyExperienceSection = memo(() => {
  const { isDark } = useContext(LayoutContext);

  const experienceAreas = [
    {
      icon: "🚀",
      title: "Liderazgo Técnico",
      description:
        "He liderado y construido soluciones web y móviles en React, Angular y Flutter para empresas de distintos sectores, priorizando rendimiento, accesibilidad y experiencia de usuario.",
    },
    {
      icon: "🤖",
      title: "Innovación con IA y 3D",
      description:
        "Me apasiona aplicar Inteligencia Artificial y 3D (React Three Fiber + Blender) para crear interfaces más inteligentes e interactivas.",
    },
    {
      icon: "🏗️",
      title: "Arquitectura y Calidad",
      description:
        "Trabajo con arquitectura limpia, principios SOLID y buenas prácticas de ingeniería (testing, CI/CD, observabilidad), buscando un código mantenible y equipos efectivos.",
    },
    {
      icon: "📚",
      title: "Educación y Mentoría",
      description:
        "Enseño y comparto conocimiento en charlas y talleres. Creo en la tecnología como palanca para mejorar educación y productividad, y en un desarrollo responsable, claro y bien pensado.",
    },
  ];

  return (
    <section className="px-2 xs:px-3 sm:px-4 md:px-6 lg:px-0 py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 max-w-6xl mx-auto">
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
          Mi experiencia
        </TextAnimate>
        <div className="w-24 h-px mx-auto bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xs:gap-8">
        {experienceAreas.map((area, index) => (
          <ExperienceCard
            key={index}
            icon={area.icon}
            title={area.title}
            description={area.description}
            isDark={isDark}
          />
        ))}
      </div>
    </section>
  );
});

MyExperienceSection.displayName = "MyExperienceSection";
