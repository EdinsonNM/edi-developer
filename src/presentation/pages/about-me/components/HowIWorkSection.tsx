"use client";

import { useContext, memo } from "react";
import LayoutContext from "@presentation/layout/layout.context";
import { TextAnimate } from "@/components/ui/text-animate";

const WorkPrinciple = memo(
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
        } rounded-2xl backdrop-blur-sm h-full`}
      >
        <div className="text-center">
          <div className="text-5xl xs:text-6xl sm:text-7xl mb-4 xs:mb-6 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
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
    </div>
  )
);

WorkPrinciple.displayName = "WorkPrinciple";

export const HowIWorkSection = memo(() => {
  const { isDark } = useContext(LayoutContext);

  const principles = [
    {
      icon: "🏗️",
      title: "Arquitectura limpia",
      description:
        "Separación por capas (core/domain/infrastructure/presentation).",
    },
    {
      icon: "✨",
      title: "Calidad",
      description:
        "SOLID, patrones, testing automatizado, CI/CD, documentación viva.",
    },
    {
      icon: "⚡",
      title: "Rendimiento y accesibilidad",
      description: "Web vitals, lazy/SSR, i18n, A11y desde el diseño.",
    },
    {
      icon: "🤝",
      title: "Colaboración",
      description:
        "Código legible, PRs claros, feature flags, métricas y feedback continuo.",
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
          Cómo trabajo
        </TextAnimate>
        <div className="w-24 h-px mx-auto bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xs:gap-8 sm:gap-10 md:gap-12">
        {principles.map((principle, index) => (
          <WorkPrinciple
            key={index}
            icon={principle.icon}
            title={principle.title}
            description={principle.description}
            isDark={isDark}
          />
        ))}
      </div>
    </section>
  );
});

HowIWorkSection.displayName = "HowIWorkSection";
