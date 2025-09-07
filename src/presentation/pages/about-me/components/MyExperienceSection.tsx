"use client";

import { useContext, memo } from "react";
import LayoutContext from "@presentation/layout/layout.context";
import { TextAnimate } from "@/components/ui/text-animate";
import { AnimatedList } from "@/components/ui/animated-list";

const ExperienceItem = memo(
  ({
    title,
    description,
    isDark,
  }: {
    title: string;
    description: string;
    isDark: boolean | undefined;
  }) => (
    <div className="text-center px-3 py-4">
      {/* Contenido */}
      <div>
        <h3
          className={`font-semibold text-lg mb-2 ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-sm leading-relaxed ${
            isDark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  )
);

ExperienceItem.displayName = "ExperienceItem";

export const MyExperienceSection = memo(() => {
  const { isDark } = useContext(LayoutContext);

  const experienceSteps = [
    {
      title: "Liderazgo Técnico",
      description:
        "Desarrollo de soluciones web y móviles con React, Angular y Flutter para empresas de diversos sectores.",
    },
    {
      title: "Innovación con IA y 3D",
      description:
        "Aplicación de Inteligencia Artificial y 3D para crear interfaces más inteligentes e interactivas.",
    },
    {
      title: "Arquitectura y Calidad",
      description:
        "Implementación de arquitectura limpia, testing, CI/CD y buenas prácticas de ingeniería.",
    },
    {
      title: "Educación y Mentoría",
      description:
        "Comparto conocimiento a través de charlas y talleres, promoviendo desarrollo responsable.",
    },
  ];

  return (
    <section className="px-2 xs:px-3 sm:px-4 md:px-6 lg:px-0 py-6 xs:py-8 sm:py-10 md:py-12 lg:py-16 max-w-6xl mx-auto">
      <div className="text-center mb-8 xs:mb-10 sm:mb-12">
        <TextAnimate
          animation="slideUp"
          by="word"
          as="h2"
          className={`font-light text-2xl xs:text-3xl sm:text-4xl md:text-5xl mb-3 xs:mb-4 ${
            isDark ? "text-white" : "text-slate-900"
          }`}
          once={true}
        >
          Mi experiencia
        </TextAnimate>
        <div className="w-24 h-px mx-auto bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
      </div>

      {/* Lista horizontal de experiencia */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {experienceSteps.map((step, index) => (
            <div key={index} className="relative">
              <ExperienceItem
                title={step.title}
                description={step.description}
                isDark={isDark}
              />
              {/* Línea vertical separadora (excepto para el último elemento) */}
              {index < experienceSteps.length - 1 && (
                <div
                  className={`hidden lg:block absolute top-0 right-0 w-px h-full ${
                    isDark ? "bg-slate-700" : "bg-slate-200"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

MyExperienceSection.displayName = "MyExperienceSection";
