"use client";

import { TextAnimate } from "@/components/ui/text-animate";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useContext, useEffect } from "react";
import LayoutContext from "@presentation/layout/layout.context";
import { useI18n } from "@presentation/utils/use-i18n";
import { ExternalLink } from "lucide-react";
import FlickeringGrid from "@/components/ui/flickering-grid";

export default function MyProjects() {
  const { isDark } = useContext(LayoutContext);
  const { t } = useI18n();

  const publicaciones = [
    {
      title:
        "Creando experiencias interactivas 3D con ThreeJS y React Three Fiber — Parte 1",
      url: "https://medium.com/@nmedinson/creando-experiencias-interactivas-con-threejs-y-react-three-fiber-parte-1-d134c88fdff7",
      aspect: "vertical" as const,
      embedType: "embedly" as const,
    },
    {
      title: "IA para desarrolladores — desde mi perspectiva",
      url: "https://medium.com/@nmedinson/ia-para-desarrolladores-desde-mi-perspectiva-4b3a1424c26d",
      aspect: "vertical" as const,
      embedType: "embedly" as const,
    },
    {
      title:
        "Cursor AI vs. Windsurf AI — ¿Cuál es el editor de código con IA ideal para ti?",
      url: "https://medium.com/@nmedinson/cursor-ai-vs-windsurf-ai-cuál-es-el-editor-de-código-con-ia-ideal-para-ti-16910e4b33de",
      aspect: "vertical" as const,
      embedType: "embedly" as const,
    },
    {
      title: "La edad oscura del código",
      url: "https://g.co/gemini/share/ab6ad3650c61",
      aspect: "vertical" as const,
      embedType: "embedly" as const,
    },
  ];

  const demosProyectos = [
    {
      title: "Universo de partículas (Three.js)",
      description: "Demo interactiva construida con React y react-three-fiber.",
      url: "images/particulas.png",
      repo: "https://github.com/juan-pablo-garcia/edi-solar-system-r3f",
    },
    {
      title: "Generador de objetos 3D",
      description: "Ejemplo de generación de mallas 3D desde prompts.",
      url: "images/generador-objetos-3d.png",
      repo: "https://github.com/juan-pablo-garcia/generador-objetos-3d",
    },
    {
      title: "Asistente virtual 3D",
      description: "Interfaz 3D con IA para interacción natural.",
      url: "images/asistente.png",
      repo: "https://github.com/juan-pablo-garcia/gpt-r3f",
    },
  ];

  const podcast = [
    {
      title: "IA al Día - Mi Podcast",
      description:
        "Ideas, entrevistas y reflexiones sobre el presente y futuro del desarrollo web, la IA y herramientas modernas.",
      url: "https://open.spotify.com/show/76jEyFY243zb9VX5HjvP9A",
      aspect: "horizontal" as const,
      embedType: "spotify" as const,
    },
    {
      title: "MCP - La proxima evolución en la conectividad de la IA",
      description:
        "Explora el Model Context Protocol (MCP), el nuevo estándar abierto que está revolucionando la forma en que la inteligencia artificial accede a los datos. A diferencia de sistemas como Retrieval-Augmented Generation (RAG), MCP permite a los modelos de IA conectarse directamente a archivos, APIs y fuentes de datos en tiempo real, sin necesidad de procesos intermedios como embeddings o bases de datos vectoriales",
      url: "https://open.spotify.com/episode/7pSwCnUaxby4lfc7OH8XUe?si=ficmpIanTJm1T5-ryxtcgw",
      aspect: "horizontal" as const,
      embedType: "spotify" as const,
    },
  ];

  const tiktoks = [
    {
      title: "Tip de UI 3D",
      url: "https://www.tiktok.com/@edinsonnm/video/7358156532002983174?is_from_webapp=1&sender_device=pc&web_id=7513635927194355205",
      aspect: "vertical" as const,
      embedType: "tiktok" as const,
    },
    {
      title: "Animaciones con R3F",
      url: "https://www.tiktok.com/@edinsonnm/video/7358147318631222533?is_from_webapp=1&sender_device=pc&web_id=7513635927194355205",
      aspect: "vertical" as const,
      embedType: "tiktok" as const,
    },
    {
      title: "Asistente virtual con R3F",
      url: "https://www.tiktok.com/@edinsonnm/video/7371918547167104261?is_from_webapp=1&sender_device=pc&web_id=7513635927194355205",
      aspect: "vertical" as const,
      embedType: "tiktok" as const,
    },
  ];

  type ResourceItem = {
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

  const CardPoster = ({ item }: { item: ResourceItem }) => {
    const vertical = item.aspect === "vertical";

    // Use fluid aspect ratios to avoid internal scrollbars and preserve media proportions
    const baseCardStyles =
      "shrink-0 snap-start overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg";

    const size = vertical
      ? "w-[360px] aspect-[9/16]"
      : "w-[520px] aspect-[16/9]";

    // Shared polished surface that matches the brand in light/dark
    const surfaceStyles = isDark
      ? "bg-white/5 border-white/10 backdrop-blur-sm"
      : "bg-white border-slate-200";

    if (item.embedType === "tiktok") {
      const id = extractTikTokId(item.url);
      return (
        <Card
          className={`${size} ${baseCardStyles} ${surfaceStyles} rounded-2xl`}
        >
          {/* Padding interno para mejorar el respiro visual del embed */}
          <CardContent className="p-4 md:p-5 h-full">
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
      // Publicaciones (Embedly) sin relación de aspecto fija para evitar cortes
      const sizeEmbed =
        item.aspect === "horizontal" ? "w-[560px]" : "w-[360px]";
      return (
        <Card
          className={`${sizeEmbed} ${baseCardStyles} ${surfaceStyles} rounded-2xl`}
        >
          {/* Altura automática para que el embed determine su tamaño */}
          <CardContent className="p-4 md:p-5 relative">
            <a
              className="embedly-card block w-full overflow-hidden rounded-xl"
              href={item.url}
              rel="noopener noreferrer"
              style={{ display: "block", width: "100%" }}
            >
              {item.title}
            </a>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
          className={`w-[520px] aspect-[16/9] ${baseCardStyles} ${surfaceStyles} rounded-2xl`}
        >
          {/* Padding para dar respiro al iframe */}
          <CardContent className="p-4 md:p-5 h-full relative">
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
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
        className={`${size} ${baseCardStyles} ${surfaceStyles} rounded-2xl`}
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
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-white font-semibold text-sm md:text-base line-clamp-2 mb-2">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-white/80 text-xs md:text-sm line-clamp-1">
                  {item.description}
                </p>
              )}
            </div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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

  const RowSection = ({
    title,
    items,
  }: {
    title: string;
    items: ResourceItem[];
  }) => {
    return (
      <section className="relative mb-12">
        <div className="flex items-center gap-3 mb-6">
          <h2
            className={`text-2xl font-bold tracking-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            {title}
          </h2>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            {items.length} {items.length === 1 ? "elemento" : "elementos"}
          </Badge>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: false,
            skipSnaps: false,
            dragFree: true,
          }}
          className="w-full"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1" />
            <div className="flex gap-2">
              <CarouselPrevious
                className={`static translate-y-0 h-10 w-10 ${
                  isDark
                    ? "border-gray-700 bg-gray-800/50 text-white hover:bg-gray-700"
                    : "border-gray-300 bg-white text-slate-700 hover:bg-gray-50"
                }`}
              />
              <CarouselNext
                className={`static translate-y-0 h-10 w-10 ${
                  isDark
                    ? "border-gray-700 bg-gray-800/50 text-white hover:bg-gray-700"
                    : "border-gray-300 bg-white text-slate-700 hover:bg-gray-50"
                }`}
              />
            </div>
          </div>
          <CarouselContent className="-ml-3 md:-ml-6">
            {items.map((item, idx) => (
              <CarouselItem
                key={`${item.title}-${idx}`}
                className={`pl-3 md:pl-6 ${
                  item.aspect === "vertical" ? "basis-auto" : "basis-auto"
                }`}
              >
                <CardPoster item={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
    );
  };

  // Ensure embed scripts are loaded once
  useEffect(() => {
    const load = (src: string, onload?: () => void) => {
      const existing = document.querySelector(
        `script[src="${src}"]`
      ) as HTMLScriptElement | null;
      if (existing) {
        onload?.();
        return;
      }
      const s = document.createElement("script");
      s.async = true;
      s.src = src;
      if (onload) s.onload = onload;
      document.body.appendChild(s);
    };

    // Ensure TikTok transforms run once the script is loaded
    load("https://www.tiktok.com/embed.js", () => {
      // @ts-ignore
      (window as any)?.tiktokEmbedLoad?.();
    });

    // Embedly
    load("https://cdn.embedly.com/widgets/platform.js");
  }, []);

  return (
    <div
      className={`w-full h-full overflow-y-auto ${
        isDark ? "bg-gradient-to-b from-black to-cyan-800" : "bg-white"
      }`}
    >
      <div className="fixed w-full h-full left-0 top-0">
        <FlickeringGrid
          className="relative inset-0 z-0 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
          squareSize={4}
          gridGap={6}
          color="#60A5FA"
          maxOpacity={0.5}
          flickerChance={0.1}
          height={2048}
          width={2048}
        />
      </div>
      <div className="w-full h-full relative container mx-auto py-10">
        {/* Enhanced Hero section */}
        <div className="px-6 md:px-0 pt-28 md:pt-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-8 items-center mb-16">
            <div className="col-span-12 md:col-span-6 order-2 md:order-1">
              <TextAnimate
                animation="slideLeft"
                by="character"
                as={"h1"}
                className={`mx-auto mb-6 pointer-events-none font-bold text-4xl md:text-6xl text-center md:text-start text-[#2b59c3] leading-tight`}
              >
                {t.recursosTitulo}
              </TextAnimate>
              <p
                className={`mb-8 text-lg leading-relaxed ${
                  isDark ? "text-white/90" : "text-slate-600"
                }`}
              >
                {t.recursosIntro}
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  📝 {publicaciones.length} Artículos
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  🛠️ {demosProyectos.length} Demos
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  🎥 {tiktoks.length} Videos
                </Badge>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 flex justify-center order-1 md:order-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#2b59c3]/20 to-cyan-500/20 rounded-3xl blur-xl opacity-50"></div>
                <img
                  src="/resources.png"
                  alt="Developer resources"
                  className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px] object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Netflix-style rows */}
        <div className="px-6 md:px-8 max-w-7xl mx-auto space-y-8 md:space-y-12">
          <RowSection
            title={t.publicaciones}
            items={publicaciones as unknown as ResourceItem[]}
          />
          <RowSection
            title={t.demosYProyectos}
            items={demosProyectos.map((d) => ({
              title: d.title,
              description: d.description,
              url: d.url,
              image: d.url,
              aspect: "horizontal",
            }))}
          />
          <RowSection
            title={t.podcast}
            items={podcast as unknown as ResourceItem[]}
          />
          <RowSection title={t.tiktok} items={tiktoks} />
        </div>
      </div>
    </div>
  );
}
