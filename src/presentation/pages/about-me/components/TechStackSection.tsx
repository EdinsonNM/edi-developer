"use client";

import { useContext, memo } from "react";
import LayoutContext from "@presentation/layout/layout.context";
import { TextAnimate } from "@/components/ui/text-animate";
import { Badge } from "@/components/ui/badge";

const TechCategory = memo(
  ({
    title,
    technologies,
    isDark,
  }: {
    title: string;
    technologies: string[];
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
        <div className="text-center">
          <h3
            className={`font-light text-xl xs:text-2xl sm:text-3xl mb-4 xs:mb-6 ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            {title}
          </h3>
          <div className="flex flex-wrap justify-center gap-3 xs:gap-4">
            {technologies.map((tech, index) => (
              <Badge
                key={index}
                variant="secondary"
                className={`px-4 py-2 text-sm font-light ${
                  isDark
                    ? "bg-slate-700/50 text-white/80 border-slate-600/50"
                    : "bg-slate-100/80 text-slate-700 border-slate-200/50"
                }`}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
);

TechCategory.displayName = "TechCategory";

export const TechStackSection = memo(() => {
  const { isDark } = useContext(LayoutContext);

  const techCategories = [
    {
      title: "Frontend",
      technologies: [
        "TypeScript",
        "React",
        "Angular",
        "Vite",
        "TanStack Query",
        "RxJS",
        "shadcn/ui",
        "Tailwind",
      ],
    },
    {
      title: "Móvil",
      technologies: ["Flutter"],
    },
    {
      title: "3D",
      technologies: ["Three.js", "React Three Fiber", "Blender"],
    },
    {
      title: "IA",
      technologies: [
        "OpenAI API",
        "RAG",
        "Embeddings",
        "Orquestación de agentes",
      ],
    },
    {
      title: "Backend/DevOps",
      technologies: ["Node.js", "NestJS", "Supabase", "Docker", "CI/CD"],
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
          Stack favorito
        </TextAnimate>
        <div className="w-24 h-px mx-auto bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8 sm:gap-10 md:gap-12">
        {techCategories.map((category, index) => (
          <TechCategory
            key={index}
            title={category.title}
            technologies={category.technologies}
            isDark={isDark}
          />
        ))}
      </div>
    </section>
  );
});

TechStackSection.displayName = "TechStackSection";
