"use client";

import { useContext, memo } from "react";
import LayoutContext from "@presentation/layout/layout.context";
import { TextAnimate } from "@/components/ui/text-animate";
import { Card } from "@/components/ui/card";

export const WhatMovesMeSection = memo(() => {
  const { isDark } = useContext(LayoutContext);

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
          Lo que me mueve
        </TextAnimate>
        <div
          className={`w-24 h-1 mx-auto rounded-full ${
            isDark
              ? "bg-gradient-to-r from-cyan-400 to-blue-400"
              : "bg-gradient-to-r from-cyan-500 to-blue-500"
          }`}
        ></div>
      </div>

      <Card
        className={`p-6 xs:p-8 sm:p-10 md:p-12 lg:p-16 text-center ${
          isDark
            ? "bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700"
            : "bg-gradient-to-br from-white/90 to-slate-50/90 border-slate-200"
        }`}
      >
        <div className="text-6xl xs:text-7xl sm:text-8xl mb-6 xs:mb-8 sm:mb-10">
          💡
        </div>
        <p
          className={`text-lg xs:text-xl sm:text-2xl md:text-3xl leading-relaxed font-medium ${
            isDark ? "text-white/90" : "text-slate-700"
          }`}
        >
          Tecnología con propósito, código claro y productos que la gente
          disfrute usar. Me entusiasma enseñar, aprender en público y construir
          soluciones que eleven la vara de calidad.
        </p>
      </Card>
    </section>
  );
});

WhatMovesMeSection.displayName = "WhatMovesMeSection";
