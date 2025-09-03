"use client";

import { useContext } from "react";
import LayoutContext from "@presentation/layout/layout.context";
import { useI18n } from "@presentation/utils/use-i18n";
import FlickeringGrid from "@/components/ui/flickering-grid";
import { HeroSection } from "./components/HeroSection";
import { RowSection } from "./components/RowSection";
import { ResourceItem } from "./components/CardPoster";
import { useEmbedScripts } from "./hooks/useEmbedScripts";
import {
  publicaciones,
  demosProyectos,
  podcast,
  tiktoks,
} from "./data/resources";

export default function MyProjects() {
  const { isDark } = useContext(LayoutContext);
  const { t } = useI18n();

  // Load embed scripts
  useEmbedScripts();

  return (
    <div
      className={`w-full min-h-[calc(100dvh-64px)] md:min-h-[calc(100dvh-80px)] overflow-y-auto overflow-x-hidden ${
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
      <div className="w-full relative container mx-auto py-3 xs:py-4 sm:py-6 md:py-8 lg:py-10 pb-8 overflow-x-hidden">
        {/* Enhanced Hero section - Mobile optimized */}
        <HeroSection
          publicacionesCount={publicaciones.length}
          demosCount={demosProyectos.length}
          tiktoksCount={tiktoks.length}
        />

        {/* Enhanced Netflix-style rows - Mobile optimized */}
        <div className="px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl mx-auto space-y-3 xs:space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-12 overflow-x-hidden">
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
