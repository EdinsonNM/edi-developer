import { useContext, useState } from "react";
import Meteors from "@/components/ui/meteors";
import LayoutContext from "@presentation/layout/layout.context";
import { cn } from "@/lib/utils";
import DotPattern from "@/components/ui/dot-pattern";
import { BiChat } from "react-icons/bi";
import { useI18n } from "@presentation/utils/use-i18n";
import ChatModal from "@presentation/components/chat-modal";
import LogoIcon from "@design/atoms/icons/logo-icon";
import FloatingTech from "@/components/ui/floating-tech";
import { TextAnimate } from "@/components/ui/text-animate";
import AnimatedCharacter from "@/components/ui/animated-character";
import FlickeringGrid from "@/components/ui/flickering-grid";
import { RetroGrid } from "@/components/magicui/retro-grid";

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
          : "bg-white"
      )}
    >
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
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
      <div className="pointer-events-none">
        <FloatingTech />
      </div>

      <div
        id="home-content"
        className="absolute top-0 left-0 w-full h-full pointer-events-auto z-30"
      >
        <div className="mx-auto h-full w-full max-w-7xl px-6 md:px-10">
          <div className="grid h-full grid-cols-12 items-center">
            {/* En móvil: personaje arriba, contenido abajo */}
            <div className="col-span-12 md:hidden flex flex-col items-center justify-start gap-0">
              {/* Personaje animado arriba */}
              <div className="flex justify-center items-center pt-4">
                <AnimatedCharacter
                  className="w-[220px] h-[220px] object-contain"
                  alt="Home Right"
                  svgPath="/edidev.svg"
                  leftEyePosition={{ x: 200, y: 150 }}
                  rightEyePosition={{ x: 270, y: 148 }}
                  eyeRadius={8}
                  pupilRadius={4}
                  debugMode={false}
                />
              </div>

              {/* Contenido centrado */}
              <div className="flex flex-col items-center justify-center gap-3 text-center">
                <h1 className="pointer-events-none font-bold leading-tight tracking-tight text-3xl sm:text-4xl text-[#2b59c3] max-w-[28ch]">
                  <TextAnimate
                    animation="slideLeft"
                    by="character"
                    as={"h1"}
                    className="pointer-events-none font-bold text-3xl sm:text-4xl text-center text-[#2b59c3]"
                  >
                    {t.helloImEdinson}
                  </TextAnimate>
                </h1>

                <p className="pointer-events-none text-base sm:text-lg leading-relaxed max-w-[36ch] text-gray-800">
                  <TextAnimate
                    animation="slideRight"
                    by="word"
                    as={"p"}
                    className="pointer-events-none text-base sm:text-lg leading-relaxed max-w-[36ch] text-gray-800"
                  >
                    {t.softwareEngineerTransforms}
                  </TextAnimate>
                </p>

                <div className="flex flex-col items-center justify-center gap-2 w-full max-w-md">
                  <button
                    onClick={() => setIsChatOpen(true)}
                    className="pointer-events-auto inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white px-5 py-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
                    title={t.chatWithEdinson}
                  >
                    <BiChat className="h-5 w-5" />
                    <span>{t.chatWithEdinson}</span>
                  </button>
                </div>

                <div className="w-full flex justify-center">
                  <a
                    href="https://cal.com/edinson-nunez-more"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-md max-w-xs pointer-events-auto text-black hover:underline"
                  >
                    {t.scheduleOnCalCom}
                  </a>
                </div>
              </div>
            </div>

            {/* En desktop: layout original */}
            <div className="hidden md:grid md:grid-cols-12 md:col-span-12 lg:col-span-12 items-center">
              {/* Columna izquierda: contenido */}
              <div className="col-span-7 lg:col-span-6 flex flex-col items-start justify-center gap-2 text-left">
                <h1
                  className={`pointer-events-none font-bold leading-tight tracking-tight text-4xl sm:text-5xl md:text-6xl text-[#2b59c3] max-w-[28ch]`}
                >
                  <TextAnimate
                    animation="slideLeft"
                    by="character"
                    as={"h1"}
                    className={`pointer-events-none font-bold text-2xl md:text-6xl text-start max-w-80 md:max-w-none text-[#2b59c3]`}
                  >
                    {t.helloImEdinson}
                  </TextAnimate>
                </h1>

                <p
                  className={`pointer-events-none text-base sm:text-xl md:text-2xl leading-relaxed max-w-[36ch] text-gray-800`}
                >
                  <TextAnimate
                    animation="slideRight"
                    by="word"
                    as={"p"}
                    className={`pointer-events-none text-base sm:text-xl md:text-2xl leading-relaxed max-w-[36ch] text-gray-800`}
                  >
                    {t.softwareEngineerTransforms}
                  </TextAnimate>
                </p>
                <p
                  className={`pointer-events-none text-sm md:text-lg leading-relaxed max-w-[60ch] dark:text-gray-400 text-black`}
                >
                  {t.yearsBuildingSolutions}
                </p>

                <div className="flex flex-col items-start justify-center gap-2 w-full max-w-md">
                  <h2 className="text-md md:text-md font-bold mb-4 text-foreground text-left">
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
                    className="text-md max-w-xs pointer-events-auto text-black  hover:underline"
                  >
                    {t.scheduleOnCalCom}
                  </a>
                </div>
              </div>

              {/* Columna derecha: personaje animado */}
              <div className="col-span-5 lg:col-span-6 p-8 pointer-events-auto">
                <AnimatedCharacter
                  className="w-[500px] h-[500px] object-contain"
                  alt="Home Right"
                  svgPath="/edidev.svg"
                  leftEyePosition={{ x: 200, y: 150 }}
                  rightEyePosition={{ x: 270, y: 148 }}
                  eyeRadius={8}
                  pupilRadius={4}
                  debugMode={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botón flotante de chat */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-green-600 to-cyan-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 pointer-events-auto z-60 group"
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
