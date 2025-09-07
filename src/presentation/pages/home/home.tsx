import { useState, useMemo } from "react";
import { useI18n } from "@presentation/utils/use-i18n";
import ChatModal from "@presentation/components/chat-modal";
import FloatingTech from "@/components/ui/floating-tech";
import AnimatedCharacter from "@/components/ui/animated-character";
import FlickeringGrid from "@/components/ui/flickering-grid";
import { useMousePosition } from "@/hooks/use-mouse-position";
import {
  TextContent,
  ChatButton,
  CalComLink,
  SocialButtons,
} from "./components";

export default function Home() {
  const { t } = useI18n();

  // Hook para obtener la posición del mouse globalmente
  const { inputX, inputY } = useMousePosition();

  // Estados para el chat modal
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatQuery, setChatQuery] = useState("");

  // Memoizar la función de callback para evitar re-renders
  const handleChatOpen = useMemo(() => () => setIsChatOpen(true), []);

  return (
    <>
      <div className="hidden md:block absolute top-0 left-0 w-full h-[calc(100dvh-80px)] md:h-[calc(100dvh-96px)] pointer-events-none overflow-hidden">
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

      {/* Floating technology background layer */}
      <div className="absolute top-0 left-0 w-full h-[calc(100dvh-80px)] md:h-[calc(100dvh-96px)] pointer-events-none">
        <FloatingTech />
      </div>

      <div
        id="home-content"
        className="pointer-events-auto z-30 flex flex-col content-center overflow-x-hidden min-h-[calc(100dvh-80px)] md:min-h-[calc(100dvh-96px)] justify-center"
      >
        <div className="mx-auto w-full max-w-7xl px-3 xs:px-4 sm:px-6 md:px-10 overflow-x-hidden">
          <div className="grid grid-cols-12 items-center gap-4 md:gap-8">
            {/* Layout unificado: móvil arriba-abajo, desktop lado a lado */}
            <div className="col-span-12 md:col-span-7 lg:col-span-6 flex flex-col items-center md:items-start justify-center gap-2 md:gap-3 text-center md:text-left order-2 md:order-1">
              <TextContent t={t} />
              <ChatButton t={t} onChatOpen={handleChatOpen} />
              <SocialButtons className="mt-2 md:mt-3" />
              <CalComLink t={t} />
            </div>

            {/* Personaje animado */}
            <div className="col-span-12 md:col-span-5 lg:col-span-6 flex justify-center md:justify-end items-center pt-2 xs:pt-4 md:pt-0 md:p-8 pointer-events-auto order-1 md:order-2">
              <AnimatedCharacter
                className="w-[260px] h-[260px] xs:w-[260px] xs:h-[260px] sm:w-[320px] sm:h-[320px] md:w-[480px] md:h-[480px] lg:w-[500px] lg:h-[500px] xl:w-[520px] xl:h-[520px] object-contain overflow-hidden"
                mouseInputX={inputX}
                mouseInputY={inputY}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ChatModal */}
      <ChatModal
        isOpen={isChatOpen}
        onClose={() => {
          setIsChatOpen(false);
          setChatQuery("");
        }}
        initialQuery={chatQuery}
      />
    </>
  );
}
