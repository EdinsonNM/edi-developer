import { Button } from "@/components/ui/button";
import { BookOpen, Image } from "lucide-react";
import { Book3D } from "./Book3D";
import { useI18n } from "@/presentation/utils/use-i18n";

export function FabricaProgramadoresSection() {
  const { t } = useI18n();
  return (
    <section
      id="fabrica-programadores"
      className="relative z-10 py-24 px-4 md:px-6 bg-slate-50/50 border-t border-slate-100"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[1fr_1fr] gap-12 items-center">
          {/* Columna izquierda: Título y contenido */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
              {t.fabricaTitle}
            </h2>

            <div className="mb-8">
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                {(() => {
                  const parts = t.fabricaDescription1.split(/\{bookName\}/);
                  const matches =
                    t.fabricaDescription1.match(/\{bookName\}/g) || [];
                  const result: (string | JSX.Element)[] = [];

                  parts.forEach((part, i) => {
                    result.push(part);
                    if (matches[i]) {
                      result.push(
                        <strong key={`bold-${i}`}>{t.fabricaBookName}</strong>
                      );
                    }
                  });

                  return result;
                })()}
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                {t.fabricaDescription2}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-base"
              >
                <a
                  href="/cuentos/Zorrito en la fábrica de programadores.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.readStory}
                  <BookOpen className="h-4 w-4 ml-2" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-purple-200 text-purple-700 hover:bg-purple-50 px-8 py-6 text-base"
              >
                <a
                  href="/cuentos/Zorrito en la fábrica de programadores.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.viewIllustrations}
                  <Image className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>

          {/* Columna derecha: Libro 3D */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md h-[500px]">
              <Book3D
                coverImage="/cuentos/Zorrito en la fábrica de programadores.jpg"
                coverImageWebp="/cuentos/Zorrito en la fábrica de programadores.webp"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
