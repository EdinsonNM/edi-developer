import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { PresentationCarousel } from "./PresentationCarousel";
import { presentations } from "@/presentation/pages/presentations/data/presentations";
import { Link } from "react-router-dom";
import { useI18n } from "@/presentation/utils/use-i18n";

export function PresentationsCarouselSection() {
  const { t } = useI18n();

  if (presentations.length === 0) return null;

  return (
    <section
      id="presentaciones-carousel"
      className="relative z-10 py-24 px-4 md:px-6 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Título centrado arriba */}
        <div className="text-center mb-12" data-reveal>
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-acid mb-4">
            07 — Talks
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
            {t.presentationsTitle}
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            {(() => {
              const parts = t.presentationsSubtitle.split(/\{bold\}/);
              const matches = t.presentationsSubtitle.match(/\{bold\}/g) || [];
              const result: (string | JSX.Element)[] = [];
              
              parts.forEach((part, i) => {
                result.push(part);
                if (matches[i]) {
                  result.push(<strong key={`bold-${i}`}>{t.presentationsSubtitleBold}</strong>);
                }
              });
              
              return result;
            })()}
          </p>
        </div>

        {/* Carrusel centrado en formato 16:9 */}
        <div className="flex items-center justify-center mb-12">
          <div className="w-full max-w-2xl aspect-video">
            <PresentationCarousel presentations={presentations} />
          </div>
        </div>

        {/* Botón para ver todas */}
        <div className="text-center">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full bg-transparent border border-white/20 text-white hover:bg-transparent hover:border-acid hover:text-acid px-8 py-6 text-base focus:ring-acid focus:ring-offset-ink"
          >
            <Link to="/presentaciones">
              {t.viewAllPresentations}
              <FileText className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

