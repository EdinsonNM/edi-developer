import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Code, Box, GraduationCap, Lightbulb } from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "Soluciones con IA",
    description:
      "Aplicaciones inteligentes, asistentes conversacionales, agentes, análisis de datos y automatización.",
  },
  {
    icon: Code,
    title: "Arquitectura & Desarrollo Web",
    description:
      "Sistemas escalables con React, Angular, NestJS, Node, Supabase y arquitecturas limpias.",
  },
  {
    icon: Box,
    title: "Experiencias 3D & Visuales",
    description:
      "React Three Fiber, WebGL, animaciones, mundos interactivos y visualizaciones técnicas.",
  },
  {
    icon: GraduationCap,
    title: "Educación & Workshops",
    description:
      "Charlas, mentoría y formación en IA, programación moderna y tecnología para estudiantes y equipos.",
  },
  {
    icon: Lightbulb,
    title: "Producto & Innovación",
    description:
      "Diseño de experiencias, prototipos funcionales, estrategia tecnológica y visión técnica.",
  },
];

export function WhatIDoSection() {
  return (
    <section id="que-hago" className="relative z-10 py-24 px-4 md:px-6 bg-slate-50/50 border-t border-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
            Qué hago
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Servicios especializados para clientes y empresas que buscan
            innovación tecnológica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

