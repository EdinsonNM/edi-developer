import { useContext, useState } from "react";
import Meteors from "@/components/ui/meteors";
import LayoutContext from "@presentation/layout/layout.context";
import { cn } from "@/lib/utils";
import DotPattern from "@/components/ui/dot-pattern";
import { SceneCanvas } from "./components/scene-canvas";
import { OrbitingIcons } from "./components/orbiting-icons";
import { BiChat } from "react-icons/bi";
import { useI18n } from "@presentation/utils/use-i18n";
import ChatModal from "@presentation/components/chat-modal";
import LogoIcon from "@design/atoms/icons/logo-icon";
import FloatingTech from "@/components/ui/floating-tech";

export default function Home() {
  const { isDark } = useContext(LayoutContext);
  const { t } = useI18n();

  // Estados para el chat modal
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatQuery, setChatQuery] = useState("");


  return (
    <div
      className={cn(
        "overflow-x-hidden min-h-screen w-full relative",
        isDark
          ? "bg-gradient-to-b from-gray-900 via-black to-black"
          : "bg-gradient-to-b from-blue-300 via-yellow-200 to-white"
      )}
    >
      <div className="absolute top-0 left-0 w-full h-full">
        {isDark ? (
          <Meteors number={30} />
        ) : (
          <DotPattern
            className={cn(
              "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
            )}
          />
        )}
      </div>

      {isDark ? (
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <SceneCanvas />
        </div>
      ) : (
        <OrbitingIcons />
      )}

      {/* Floating technology background layer */}
      <FloatingTech />

      <div
        id="home-content"
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-20"
      >
        <div className="mx-auto h-full w-full max-w-7xl px-6 md:px-10">
          <div className="grid h-full grid-cols-12 items-center">
            {/* Columna izquierda: contenido */}
            <div className="col-span-12 md:col-span-7 lg:col-span-6 flex flex-col items-start justify-center gap-4 text-left">
              <div className="flex items-start justify-start mb-8 md:hidden">
                <LogoIcon size={200} />
              </div>
              <h1
                className={`pointer-events-none font-bold leading-tight tracking-tight text-4xl sm:text-5xl md:text-6xl ${
                  isDark ? "text-cyan-500" : "text-cyan-700"
                } max-w-[28ch]`}
              >
                {t.helloImEdinson}
              </h1>

              <p
                className={`pointer-events-none text-base sm:text-xl md:text-2xl leading-relaxed max-w-[36ch] dark:text-white text-black`}
              >
                {t.softwareEngineerTransforms}
              </p>
              <p
                className={`hidden md:block pointer-events-none text-sm md:text-lg leading-relaxed max-w-[60ch] dark:text-gray-400 text-black`}
              >
                {t.yearsBuildingSolutions}
              </p>

              <div className="flex flex-col items-start justify-center mt-8 w-full max-w-md">
                <h2 className="text-lg md:text-2xl font-bold mb-4 text-white text-left">
                  {t.whatWantToKnow}
                </h2>
                <button
                  onClick={() => setIsChatOpen(true)}
                  className="pointer-events-auto inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white px-5 py-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
                  title={t.chatWithEdinson}
                >
                  <BiChat className="h-5 w-5" />
                  <span>{t.chatWithEdinson}</span>
                </button>
              </div>

              <div className="w-full flex justify-start">
                <a
                  href="https://cal.com/edinson-nunez-more"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-md max-w-xs pointer-events-auto text-black dark:text-white hover:underline"
                >
                  {t.scheduleOnCalCom}
                </a>
              </div>
            </div>

            {/* Columna derecha: espacio en blanco para balance visual */}
            <div className="hidden md:block col-span-5 lg:col-span-6" />
          </div>
        </div>
      </div>
      
      {/* Botón flotante de chat */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-green-600 to-cyan-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 pointer-events-auto z-40 group"
        title={t.chatWithEdinson}
      >
        <BiChat className="h-6 w-6" />
        <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          {t.askMeAnything}
        </span>
      </button>
      
      {/* ChatModal */}
      <ChatModal 
        isOpen={isChatOpen}
        onClose={() => {
          setIsChatOpen(false);
          setChatQuery("");
        }}
        initialQuery={chatQuery}
      />
    </div>
  );
}
