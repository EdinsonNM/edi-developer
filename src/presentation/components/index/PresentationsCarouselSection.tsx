import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { PresentationCarousel } from "./PresentationCarousel";
import { presentations } from "@/presentation/pages/presentations/data/presentations";
import { Link } from "react-router-dom";

export function PresentationsCarouselSection() {

  if (presentations.length === 0) return null;

  return (
    <section
      id="presentaciones-carousel"
      className="relative z-10 py-24 px-4 md:px-6 bg-white border-t border-slate-100"
    >
      <div className="max-w-7xl mx-auto">
        {/* Título centrado arriba */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
            Presentaciones y Materiales
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Comparto materiales de charlas y presentaciones sobre{" "}
            <strong>IA, desarrollo de software, arquitectura</strong> y
            otros temas técnicos que he dictado en diferentes eventos y
            conferencias.
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
            className="rounded-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-8 py-6 text-base"
          >
            <Link to="/presentaciones">
              Ver todas las presentaciones
              <FileText className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

