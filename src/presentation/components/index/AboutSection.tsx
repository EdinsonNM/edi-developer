import { AboutChatPanel } from "./AboutChatPanel";
import { useI18n } from "@/presentation/utils/use-i18n";

export function AboutSection() {
  const { t } = useI18n();
  return (
    <section
      id="sobre-mi"
      className="relative z-10 py-24 px-4 md:px-6 bg-transparent border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Título, descripción y chat */}
        <div className="grid md:grid-cols-[2fr_3fr] gap-8 mb-12">
          {/* Columna izquierda: Título y descripción */}
          <div className="flex flex-col justify-center">
            <div className="text-center md:text-left mb-6" data-reveal>
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-acid mb-4">
                01 — About
              </p>
              <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
                {t.aboutTitle}
              </h2>
            </div>

            <div className="text-center md:text-left" data-reveal>
              <p className="text-lg text-white/60 leading-relaxed mb-6">
                {(() => {
                  const parts = t.aboutDescription1.split(/\{name\}|\{years\}/);
                  const matches =
                    t.aboutDescription1.match(/\{name\}|\{years\}/g) || [];
                  const result: (string | JSX.Element)[] = [];

                  parts.forEach((part, i) => {
                    result.push(part);
                    if (matches[i]) {
                      const value =
                        matches[i] === "{name}" ? t.aboutName : t.aboutYears;
                      result.push(
                        <strong key={`bold-${i}`} className="text-white">
                          {value}
                        </strong>
                      );
                    }
                  });

                  return result;
                })()}
              </p>
              <p className="text-xl text-white font-medium italic mb-8">
                {t.aboutDescription2}
              </p>
            </div>
          </div>

          {/* Columna derecha: Panel de chat */}
          <div className="h-[500px]" data-reveal>
            <AboutChatPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
