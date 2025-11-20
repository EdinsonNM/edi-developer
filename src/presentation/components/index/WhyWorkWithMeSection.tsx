import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Eye, MessageSquare, CheckCircle, Heart } from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "14+ años de experiencia",
    description:
      "Construyendo software en compañías, startups y proyectos sociales.",
  },
  {
    icon: Eye,
    title: "Visión completa",
    description:
      "Desde arquitectura hasta producto, UI/UX e inteligencia artificial.",
  },
  {
    icon: MessageSquare,
    title: "Comunicación clara",
    description:
      "Explico conceptos complejos de forma simple. Trabajo bien con equipos técnicos y no técnicos.",
  },
  {
    icon: CheckCircle,
    title: "Entrega con calidad",
    description:
      "Código limpio, buenas prácticas, testing, documentación y enfoque escalable.",
  },
  {
    icon: Heart,
    title: "Enfoque humano",
    description:
      "Busco impacto. Creo tecnología que abra oportunidades reales.",
  },
];

export function WhyWorkWithMeSection() {
  return (
    <section id="por-que-trabajar-conmigo" className="relative z-10 py-24 px-4 md:px-6 bg-slate-50/50 border-t border-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
            Por qué trabajar conmigo
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Valores y capacidades que marcan la diferencia en cada proyecto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <Card
                key={index}
                className="border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-violet-100 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-violet-600" />
                  </div>
                  <CardTitle className="text-xl">{reason.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 leading-relaxed">
                    {reason.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

