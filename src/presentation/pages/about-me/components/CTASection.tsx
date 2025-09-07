"use client";

import { useContext, memo } from "react";
import LayoutContext from "@presentation/layout/layout.context";
import { TextAnimate } from "@/components/ui/text-animate";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const CTASection = memo(() => {
  const { isDark } = useContext(LayoutContext);

  const handleContactClick = () => {
    // Aquí puedes agregar la lógica para abrir un modal de contacto o redirigir
    console.log("Contacto clickeado");
  };

  return (
    <section className="px-2 xs:px-3 sm:px-4 md:px-6 lg:px-0 py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 max-w-7xl mx-auto">
      <Card
        className={`p-6 xs:p-8 sm:p-10 md:p-12 lg:p-16 text-center relative overflow-hidden ${
          isDark
            ? "bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-700"
            : "bg-gradient-to-br from-blue-50/90 to-purple-50/90 border-blue-200"
        }`}
      >
        {/* Efecto de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
        </div>

        <div className="relative z-10">
          <div className="text-6xl xs:text-7xl sm:text-8xl mb-6 xs:mb-8 sm:mb-10">
            🚀
          </div>

          <TextAnimate
            animation="slideUp"
            by="word"
            as="h2"
            className={`font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl mb-4 xs:mb-6 ${
              isDark ? "text-white" : "text-slate-800"
            }`}
            once={true}
          >
            ¿Colaboramos?
          </TextAnimate>

          <p
            className={`text-lg xs:text-xl sm:text-2xl mb-6 xs:mb-8 sm:mb-10 leading-relaxed ${
              isDark ? "text-white/90" : "text-slate-600"
            }`}
          >
            ¿Colaboramos en tu próximo producto, charla o prototipo con IA/3D?
            Escríbeme y lo hacemos realidad.
          </p>

          <Button
            onClick={handleContactClick}
            className="px-8 xs:px-10 sm:px-12 py-3 xs:py-4 sm:py-5 text-lg xs:text-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            💬 Contactar
          </Button>
        </div>
      </Card>
    </section>
  );
});

CTASection.displayName = "CTASection";
