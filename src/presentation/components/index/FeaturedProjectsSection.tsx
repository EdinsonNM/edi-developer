import CardSwap, { Card } from "@/components/CardSwap";

const projects = [
  {
    title: "NeoKids",
    subtitle:
      "Asistente inteligente para apoyar a niños y jóvenes en la educación",
    description:
      "IA educativa que guía a estudiantes con herramientas personalizadas para alcanzar sus metas de aprendizaje.",
    image: "/apps/neokids.png",
  },
  {
    title: "CostPro",
    subtitle: "Software de presupuestos",
    description:
      "Potente herramienta de costos y presupuestos para cualquier proyecto. Precisión y control en cada etapa.",
    image: "/apps/costpro.png",
  },
  {
    title: "Zypher",
    subtitle: "Agenda escolar inteligente",
    description:
      "La plataforma que une colegios, familias y estudiantes. Comunicación fluida y seguimiento en tiempo real.",
    image: "/apps/zypher.png",
  },
  {
    title: "Yaqu",
    subtitle: "Gestión moderna de agua",
    description:
      "Transforma la gestión del agua con mapas interactivos, pagos digitales e inteligencia artificial.",
    image: "/apps/yaqu.png",
  },
];

export function FeaturedProjectsSection() {
  return (
    <section
      id="proyectos"
      className="relative z-10 py-24 px-4 md:px-6 bg-white border-t border-slate-100"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[2fr_3fr] gap-8 mb-12">
          {/* Columna izquierda: Título y descripción */}
          <div className="flex flex-col justify-center">
            <div className="text-center md:text-left mb-6 bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-white/30">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
                Proyectos Destacados
              </h2>
              <p className="text-lg text-slate-600">
                Soluciones innovadoras que transforman realidades.
              </p>
            </div>
          </div>

          {/* Columna derecha: Cards con CardSwap */}
          <div className="relative min-h-[500px] flex items-center justify-center">
            <CardSwap
              cardDistance={60}
              verticalDistance={70}
              delay={5000}
              pauseOnHover={false}
              width={500}
              height={400}
            >
              {projects.map((project, index) => (
                <Card
                  key={index}
                  customClass="bg-white border-slate-200 shadow-lg overflow-hidden"
                >
                  <div className="h-full flex flex-col relative">
                    <div className="h-2 bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500"></div>
                    {/* Imagen del proyecto */}
                    <div className="relative flex-1 bg-slate-100 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Si la imagen no existe, ocultar el contenedor
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          target.parentElement!.style.backgroundColor =
                            "#1e293b";
                        }}
                      />
                      {/* Overlay para mejorar legibilidad */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20"></div>
                      {/* Contenido sobre la imagen */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col z-10">
                        <h3 className="text-2xl font-bold text-blue-400 mb-3">
                          {project.title}
                        </h3>
                        <p className="text-white/95 leading-relaxed text-base">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>
      </div>
    </section>
  );
}
