import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, BookOpen } from "lucide-react";

export interface Article {
  id: string;
  title: string;
  description?: string;
  url: string;
}

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const handleClick = () => {
    window.open(article.url, "_blank", "noopener,noreferrer");
  };

  return (
    <Card
      className="border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group bg-white"
      onClick={handleClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
            <BookOpen className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {article.title}
            </h3>
            {article.description && (
              <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                {article.description}
              </p>
            )}
            <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
              <span>Leer en Medium</span>
              <ExternalLink className="h-4 w-4" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

