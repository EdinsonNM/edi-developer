import { useContext } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ExternalLink } from "lucide-react";
import LayoutContext from "@presentation/layout/layout.context";

export interface Presentation {
  id: string;
  title: string;
  description?: string;
  pdfUrl: string;
  coverImage?: string;
  date?: string;
  event?: string;
}

interface PresentationCardProps {
  presentation: Presentation;
}

export function PresentationCard({ presentation }: PresentationCardProps) {
  const context = useContext(LayoutContext);
  const isDark = context?.isDark ?? false;

  const handleClick = () => {
    window.open(presentation.pdfUrl, "_blank", "noopener,noreferrer");
  };

  const surfaceStyles = isDark
    ? "bg-white/5 border-white/10 backdrop-blur-sm"
    : "bg-white border-slate-200";

  // Generar rutas WebP y PNG para el fallback
  const webpSrc = presentation.coverImage
    ? presentation.coverImage.endsWith(".webp")
      ? presentation.coverImage
      : presentation.coverImage.replace(/\.(png|jpg|jpeg)$/i, ".webp")
    : undefined;
  const fallbackSrc = presentation.coverImage
    ? presentation.coverImage.endsWith(".webp")
      ? presentation.coverImage.replace(/\.webp$/i, ".png")
      : presentation.coverImage
    : undefined;

  return (
    <Card
      className={`${surfaceStyles} rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer group`}
      onClick={handleClick}
    >
      <CardContent className="p-0">
        <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
          {presentation.coverImage ? (
            <picture>
              <source srcSet={webpSrc} type="image/webp" />
              <img
                src={fallbackSrc}
                alt={presentation.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </picture>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FileText className="h-16 w-16 text-slate-400 dark:text-slate-600" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 dark:bg-slate-800/90 rounded-full p-2">
              <ExternalLink className="h-4 w-4 text-slate-700 dark:text-slate-200" />
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-base md:text-lg text-slate-900 dark:text-white mb-2 line-clamp-2">
            {presentation.title}
          </h3>
          {presentation.description && (
            <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-2">
              {presentation.description}
            </p>
          )}
          <div className="flex flex-col gap-1 text-xs text-slate-500 dark:text-slate-400">
            {presentation.event && (
              <span className="line-clamp-1">{presentation.event}</span>
            )}
            {presentation.date && (
              <span>
                {new Date(presentation.date).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                })}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
