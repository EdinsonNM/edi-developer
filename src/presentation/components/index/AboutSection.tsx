import { AboutChatPanel } from "./AboutChatPanel";

export function AboutSection() {
  return (
    <section
      id="sobre-mi"
      className="relative z-10 py-24 px-4 md:px-6 bg-white border-t border-slate-100"
    >
      <div className="max-w-6xl mx-auto">
        {/* Título, descripción y chat */}
        <div className="grid md:grid-cols-[2fr_3fr] gap-8 mb-12">
          {/* Columna izquierda: Título y descripción */}
          <div className="flex flex-col justify-center">
            <div className="text-center md:text-left mb-6">
              <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
                Sobre mí
              </h2>
            </div>

            <div className="text-center md:text-left">
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                Soy <strong>Edinson Nuñez More</strong>, ingeniero de software
                con más de <strong>14 años</strong> construyendo soluciones que
                combinan IA, arquitectura moderna, experiencias 3D y educación.
              </p>
              <p className="text-xl text-slate-900 font-medium italic mb-8">
                Mi enfoque es simple: crear tecnología que transforme
                realidades.
              </p>
            </div>
          </div>

          {/* Columna derecha: Panel de chat */}
          <div className="h-[500px]">
            <AboutChatPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
