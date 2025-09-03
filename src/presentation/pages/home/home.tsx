import { useState } from "react";
import { BiChat } from "react-icons/bi";
import { useI18n } from "@presentation/utils/use-i18n";
import ChatModal from "@presentation/components/chat-modal";
import FloatingTech from "@/components/ui/floating-tech";
import { TextAnimate } from "@/components/ui/text-animate";
import AnimatedCharacter from "@/components/ui/animated-character";
import FlickeringGrid from "@/components/ui/flickering-grid";

export default function Home() {
  const { t } = useI18n();

  // Estados para el chat modal
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatQuery, setChatQuery] = useState("");

  return (
    <>
      <div className="hidden md:block absolute top-0 left-0 w-full h-[calc(100dvh-64px)] md:h-[calc(100dvh-80px)] pointer-events-none overflow-hidden">
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
      <div className="absolute top-0 left-0 w-full h-[calc(100dvh-64px)] md:h-[calc(100dvh-80px)] pointer-events-none">
        <FloatingTech />
      </div>

      <div
        id="home-content"
        className="pointer-events-auto z-30 flex flex-col content-center overflow-x-hidden min-h-[calc(100dvh-64px)] md:min-h-[calc(100dvh-80px)] justify-center"
      >
        <div className="mx-auto w-full max-w-7xl px-3 xs:px-4 sm:px-6 md:px-10 overflow-x-hidden">
          <div className="grid grid-cols-12 items-center">
            {/* En móvil: personaje arriba, contenido abajo */}
            <div className="col-span-12 md:hidden flex flex-col items-center justify-start gap-0">
              {/* Personaje animado arriba */}
              <div className="flex justify-center items-center pt-2 xs:pt-4">
                <AnimatedCharacter
                  className="w-[160px] h-[160px] xs:w-[180px] xs:h-[180px] sm:w-[220px] sm:h-[220px] object-contain overflow-hidden"
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
              <div className="flex flex-col items-center justify-center gap-2 xs:gap-3 text-center px-2 xs:px-4">
                <h1 className="pointer-events-none font-bold leading-tight tracking-tight text-2xl xs:text-3xl sm:text-4xl text-[#2b59c3] max-w-[28ch]">
                  <TextAnimate
                    animation="slideLeft"
                    by="character"
                    as={"h1"}
                    className="pointer-events-none font-bold text-2xl xs:text-3xl sm:text-4xl text-center text-[#2b59c3]"
                  >
                    {t.helloImEdinson}
                  </TextAnimate>
                </h1>

                <p className="pointer-events-none text-sm xs:text-base sm:text-lg leading-relaxed max-w-[36ch] text-gray-800">
                  <TextAnimate
                    animation="slideRight"
                    by="word"
                    as={"p"}
                    className="pointer-events-none text-sm xs:text-base sm:text-lg leading-relaxed max-w-[36ch] text-gray-800"
                  >
                    {t.softwareEngineerTransforms}
                  </TextAnimate>
                </p>

                <div className="flex flex-col items-center justify-center gap-2 w-full max-w-md px-2">
                  <button
                    onClick={() => setIsChatOpen(true)}
                    className="pointer-events-auto inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 xs:px-5 py-2.5 xs:py-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 text-sm xs:text-base"
                    title={t.chatWithEdinson}
                  >
                    <BiChat className="h-4 w-4 xs:h-5 xs:w-5" />
                    <span>{t.chatWithEdinson}</span>
                  </button>
                </div>

                <div className="w-full flex justify-center px-2">
                  <a
                    href="https://cal.com/edinson-nunez-more"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm xs:text-md max-w-xs pointer-events-auto text-black hover:underline"
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
