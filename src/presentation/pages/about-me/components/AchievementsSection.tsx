"use client";

import { useContext, memo } from "react";
import LayoutContext from "@presentation/layout/layout.context";
import { TextAnimate } from "@/components/ui/text-animate";
import { Card } from "@/components/ui/card";

const AchievementItem = memo(
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
      className={`p-4 xs:p-5 sm:p-6 md:p-7 lg:p-8 h-full transition-all duration-300 hover:shadow-lg hover:scale-105 ${
        isDark
          ? "bg-slate-800/50 border-slate-700"
          : "bg-white/80 border-slate-200"
      }`}
    >
      <div className="text-center">
        <div className="text-3xl xs:text-4xl sm:text-5xl mb-3 xs:mb-4 sm:mb-5">
          {icon}
        </div>
        <h3
          className={`font-bold text-lg xs:text-xl sm:text-2xl mb-2 xs:mb-3 ${
            isDark ? "text-white" : "text-slate-800"
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
    </Card>
  )
);

AchievementItem.displayName = "AchievementItem";

export const AchievementsSection = memo(() => {
  const { isDark } = useContext(LayoutContext);

  const achievements = [
    {
      icon: "👑",
      title: "Liderazgo técnico",
      description: "En equipos frontend y definición de estándares de calidad.",
    },
    {
      icon: "🤖",
      title: "Integración de IA",
      description:
        "Práctica en flujos reales (asistentes, análisis, generación de UI/insights).",
    },
    {
      icon: "🎨",
      title: "Experiencias 3D",
      description:
        "Educativas e interactivas para explicar conceptos complejos.",
    },
    {
      icon: "📚",
      title: "Enseñanza técnica",
      description: "Divulgación con ejemplos aplicables a proyectos reales.",
    },
  ];

  return (
    <section className="px-2 xs:px-3 sm:px-4 md:px-6 lg:px-0 py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 max-w-7xl mx-auto">
      <div className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16">
        <TextAnimate
          animation="slideUp"
          by="word"
          as="h2"
          className={`font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl mb-4 xs:mb-6 ${
            isDark ? "text-white" : "text-slate-800"
          }`}
          once={true}
        >
          Logros y enfoque
        </TextAnimate>
        <div
          className={`w-24 h-1 mx-auto rounded-full ${
            isDark
              ? "bg-gradient-to-r from-yellow-400 to-orange-400"
              : "bg-gradient-to-r from-yellow-500 to-orange-500"
          }`}
        ></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 md:gap-8">
        {achievements.map((achievement, index) => (
          <AchievementItem
            key={index}
            icon={achievement.icon}
            title={achievement.title}
            description={achievement.description}
            isDark={isDark}
          />
        ))}
      </div>
    </section>
  );
});

AchievementsSection.displayName = "AchievementsSection";
