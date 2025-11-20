import { AboutChatPanel } from "./AboutChatPanel";
import { useI18n } from "@/presentation/utils/use-i18n";

export function AboutSection() {
  const { t } = useI18n();
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
                {t.aboutTitle}
              </h2>
            </div>

            <div className="text-center md:text-left">
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
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
                      result.push(<strong key={`bold-${i}`}>{value}</strong>);
                    }
                  });

                  return result;
                })()}
              </p>
              <p className="text-xl text-slate-900 font-medium italic mb-8">
                {t.aboutDescription2}
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
