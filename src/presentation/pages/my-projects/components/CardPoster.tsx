"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { useContext } from "react";
import LayoutContext from "@presentation/layout/layout.context";

export type ResourceItem = {
  title: string;
  description?: string;
  url: string;
  repo?: string;
  image?: string;
  aspect?: "horizontal" | "vertical";
  embedType?: "tiktok" | "embedly" | "spotify";
};

const extractTikTokId = (url: string) => {
  const match = url.match(/\/video\/(\d+)/);
  return match ? match[1] : undefined;
};

interface CardPosterProps {
  item: ResourceItem;
}

export const CardPoster = ({ item }: CardPosterProps) => {
  const { isDark } = useContext(LayoutContext);
  const vertical = item.aspect === "vertical";

  // Use fluid aspect ratios to avoid internal scrollbars and preserve media proportions
  const baseCardStyles =
    "shrink-0 snap-start overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg";

  // Optimized responsive sizes for mobile-first approach
  const size = vertical
    ? "w-[200px] xs:w-[240px] sm:w-[280px] md:w-[320px] lg:w-[360px] aspect-[9/16]"
    : "w-[240px] xs:w-[280px] sm:w-[320px] md:w-[420px] lg:w-[520px] aspect-[16/9]";

  // Shared polished surface that matches the brand in light/dark
  const surfaceStyles = isDark
    ? "bg-white/5 border-white/10 backdrop-blur-sm"
    : "bg-white border-slate-200";

  if (item.embedType === "tiktok") {
    const id = extractTikTokId(item.url);
    return (
      <Card
        className={`${size} ${baseCardStyles} ${surfaceStyles} rounded-2xl flex-shrink-0`}
      >
        {/* Padding interno para mejorar el respiro visual del embed */}
        <CardContent className="p-2 xs:p-3 sm:p-4 md:p-5 h-full">
          <div className="h-full w-full overflow-hidden rounded-xl">
            <blockquote
              className="tiktok-embed h-full w-full"
              cite={item.url}
              data-video-id={id}
              style={{ maxWidth: "100%", minWidth: "100%" }}
            >
              <section />
            </blockquote>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (item.embedType === "embedly") {
    // Publicaciones (Embedly) con tamaños responsive optimizados
    const sizeEmbed = vertical
      ? "w-[200px] xs:w-[240px] sm:w-[280px] md:w-[320px] lg:w-[360px]"
      : "w-[240px] xs:w-[280px] sm:w-[320px] md:w-[420px] lg:w-[560px]";
    return (
      <Card
        className={`${sizeEmbed} ${baseCardStyles} ${surfaceStyles} rounded-2xl flex-shrink-0`}
      >
        {/* Altura automática para que el embed determine su tamaño */}
        <CardContent className="p-2 xs:p-3 sm:p-4 md:p-5 relative">
          <a
            className="embedly-card block w-full overflow-hidden rounded-xl"
            href={item.url}
            rel="noopener noreferrer"
            style={{ display: "block", width: "100%" }}
          >
            {item.title}
          </a>
          <div className="absolute top-2 right-2 xs:top-3 xs:right-3 sm:top-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Badge
              variant="secondary"
              className="flex items-center gap-1 text-xs"
            >
              <ExternalLink className="h-3 w-3" />
              Medium
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (item.embedType === "spotify") {
    // Spotify podcast embed (fixed aspect from provider)
    return (
      <Card
        className={`w-[240px] xs:w-[280px] sm:w-[320px] md:w-[420px] lg:w-[520px] aspect-[16/9] ${baseCardStyles} ${surfaceStyles} rounded-2xl flex-shrink-0`}
      >
        {/* Padding para dar respiro al iframe */}
        <CardContent className="p-2 xs:p-3 sm:p-4 md:p-5 h-full relative">
          <iframe
            className="w-full h-full rounded-xl"
            src="https://open.spotify.com/embed/show/76jEyFY243zb9VX5HjvP9A?utm_source=generator"
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title={item.title}
          />
          <div className="absolute top-2 right-2 xs:top-3 xs:right-3 sm:top-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Badge
              variant="secondary"
              className="flex items-center gap-1 text-xs"
            >
              <ExternalLink className="h-3 w-3" />
              Spotify
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default link card
  return (
    <Card
      className={`${size} ${baseCardStyles} ${surfaceStyles} rounded-2xl flex-shrink-0`}
    >
      {/* Para cards con imagen de fondo, mantenemos full-bleed y mejoramos overlays */}
      <CardContent className="p-0 h-full relative overflow-hidden">
        <a
          href={item.url}
          target="_blank"
          rel="noreferrer"
          className="block w-full h-full"
        >
          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className={`w-full h-full ${
                isDark
                  ? "bg-gradient-to-br from-gray-800 to-cyan-900"
                  : "bg-gradient-to-br from-slate-100 to-slate-300"
              }`}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-2 xs:p-3 sm:p-4 md:p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-white font-semibold text-sm md:text-base line-clamp-2 mb-2">
              {item.title}
            </h3>
            {item.description && (
              <p className="text-white/80 text-xs md:text-sm line-clamp-1">
                {item.description}
              </p>
            )}
          </div>
          <div className="absolute top-2 right-2 xs:top-3 xs:right-3 sm:top-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Badge
              variant="secondary"
              className="flex items-center gap-1 text-xs"
            >
              <ExternalLink className="h-3 w-3" />
              Ver más
            </Badge>
          </div>
        </a>
      </CardContent>
    </Card>
  );
};
