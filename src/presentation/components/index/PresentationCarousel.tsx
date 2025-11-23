import { useState, useEffect, memo } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Presentation } from "@/presentation/pages/presentations/components/PresentationCard";

interface PresentationCarouselProps {
  presentations: Presentation[];
}

function PresentationCarouselComponent({
  presentations,
}: PresentationCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-rotación del carrusel cada 5 segundos
  useEffect(() => {
    if (presentations.length <= 1) return;

    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentIndex((prev) => (prev + 1) % presentations.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [presentations.length, isHovered]);

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + presentations.length) % presentations.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % presentations.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentPresentation = presentations[currentIndex];

  if (!currentPresentation) return null;

  const handleClick = () => {
    window.open(currentPresentation.pdfUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Presentación actual - plano */}
      <div
        className="relative w-full h-full transition-all duration-300 ease-out cursor-pointer group rounded-lg overflow-hidden shadow-xl"
        style={{
          transform: isHovered ? "scale(1.02)" : "scale(1)",
        }}
        onClick={handleClick}
      >
        {/* Imagen de la presentación */}
        <img
          src={
            currentPresentation.coverImage || "/placeholder-presentation.png"
          }
          alt={currentPresentation.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        {/* Overlay con icono al hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 rounded-full p-3">
              <ExternalLink className="h-6 w-6 text-slate-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Controles de navegación */}
      {presentations.length > 1 && (
        <>
          {/* Botón anterior */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Presentación anterior"
          >
            <ChevronLeft className="h-5 w-5 text-slate-700" />
          </button>

          {/* Botón siguiente */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Siguiente presentación"
          >
            <ChevronRight className="h-5 w-5 text-slate-700" />
          </button>

          {/* Indicadores de puntos */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {presentations.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-emerald-600"
                    : "w-2 bg-white/60 hover:bg-white/80"
                }`}
                aria-label={`Ir a presentación ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Memoizar el componente para evitar re-renders cuando las props no cambian
export const PresentationCarousel = memo(PresentationCarouselComponent);
