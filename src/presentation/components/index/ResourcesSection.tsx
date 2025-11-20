import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Code2, FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PresentationCard } from "@/presentation/pages/presentations/components/PresentationCard";
import { presentations } from "@/presentation/pages/presentations/data/presentations";
import { ArticleCard } from "./ArticleCard";
import { articles } from "./data/articles";

const resources = [
  {
    icon: BookOpen,
    title: "Guías y artículos",
    description:
      "Presentaciones y materiales de charlas sobre IA, arquitectura, 3D y desarrollo moderno.",
    href: "/presentaciones",
  },
  {
    icon: Code2,
    title: "Demos y repositorios",
    description:
      "Proyectos open-source que puedes explorar y adaptar.",
  },
  {
    icon: FileText,
    title: "Plantillas",
    description:
      "Herramientas prácticas para acelerar proyectos reales.",
  },
];

export function ResourcesSection() {
  const displayedPresentations = presentations.slice(0, 4);

  return (
    <section id="recursos" className="relative z-10 py-24 px-4 md:px-6 bg-slate-50/50 border-t border-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
            Recursos
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Contenido técnico y herramientas para desarrolladores.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            const cardContent = (
              <Card
                className={`border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                  resource.href ? "cursor-pointer" : ""
                }`}
              >
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <CardTitle className="text-xl">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 leading-relaxed">
                    {resource.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );

            if (resource.href) {
              return (
                <Link key={index} to={resource.href} className="block">
                  {cardContent}
                </Link>
              );
            }

            return <div key={index}>{cardContent}</div>;
          })}
        </div>

        {/* Sección de Artículos de Medium */}
        {articles.length > 0 && (
          <div className="mt-16">
            <div className="mb-8">
              <h3 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl mb-2">
                Artículos en Medium
              </h3>
              <p className="text-slate-600">
                Tutoriales y reflexiones sobre desarrollo, IA y mejores prácticas
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

