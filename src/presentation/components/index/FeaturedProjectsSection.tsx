import CardSwap, { Card } from "@/components/CardSwap";
import { useI18n } from "@/presentation/utils/use-i18n";
import { useWindowSize } from "@/hooks/use-window-size";

export function FeaturedProjectsSection() {
  const { t } = useI18n();
  const { width } = useWindowSize();

  const projects = [
    {
      title: t.neokidsTitle,
      subtitle: t.neokidsSubtitle,
      description: t.neokidsDesc,
      image: "/apps/neokids.png",
    },
    {
      title: t.costproTitle,
      subtitle: t.costproSubtitle,
      description: t.costproDesc,
      image: "/apps/costpro.png",
    },
    {
      title: t.zypherTitle,
      subtitle: t.zypherSubtitle,
      description: t.zypherDesc,
      image: "/apps/zypher.png",
    },
    {
      title: t.yaquTitle,
      subtitle: t.yaquSubtitle,
      description: t.yaquDesc,
      image: "/apps/yaqu.png",
    },
  ];
  return (
    <section
      id="proyectos"
      className="relative z-10 py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-white border-t border-slate-100"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[2fr_3fr] gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Columna izquierda: Título y descripción */}
          <div className="flex flex-col justify-center">
            <div className="text-center md:text-left mb-6 sm:mb-8 bg-white/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/30">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-3 sm:mb-4">
                {t.featuredProjectsTitle}
              </h2>
              <p className="text-base sm:text-lg text-slate-600">
                {t.featuredProjectsSubtitle}
              </p>
            </div>
          </div>

          {/* Columna derecha: Cards con CardSwap */}
          <div className="relative min-h-[300px] sm:min-h-[400px] md:min-h-[600px] flex items-center justify-center overflow-visible md:pr-8 md:pb-8">
            <CardSwap
              cardDistance={width < 640 ? 40 : 60}
              verticalDistance={width < 640 ? 50 : 70}
              delay={5000}
              pauseOnHover={false}
              width={width < 640 ? 280 : width < 768 ? 350 : 500}
              height={width < 640 ? 220 : width < 768 ? 280 : 400}
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
                        loading="lazy"
                        decoding="async"
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
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex flex-col z-10">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-400 mb-2 sm:mb-3">
                          {project.title}
                        </h3>
                        <p className="text-white/95 leading-relaxed text-sm sm:text-base">
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
