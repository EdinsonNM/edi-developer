import { memo, useContext, useState, useEffect } from "react";
import { TextAnimate } from "@/components/ui/text-animate";
import Meteors from "@/components/ui/meteors";
import LayoutContext from "@presentation/layout/layout.context";
import { cn } from "@/lib/utils";
import DotPattern from "@/components/ui/dot-pattern";
import { SceneCanvas } from "./components/scene-canvas";
import { OrbitingIcons } from "./components/orbiting-icons";
import { BiSearch, BiChat } from "react-icons/bi";
import { useI18n } from "@presentation/utils/use-i18n";
import ChatModal from "@presentation/components/chat-modal";
import LogoIcon from "@design/atoms/icons/logo-icon";

const TextAnimate2 = memo(TextAnimate);

export default function Home() {
  const { isDark } = useContext(LayoutContext);
  const { t } = useI18n();

  // Estados para el chat modal
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatQuery, setChatQuery] = useState("");

  // Marquee placeholder texts as an array usando traducciones
  const marqueePlaceholders = [
    t.placeholder1,
    t.placeholder2,
    t.placeholder3,
    t.placeholder4,
  ];
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [marqueeIndex, setMarqueeIndex] = useState(0);

  // Cycle through the marquee texts every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMarqueeIndex((i) => (i + 1) % marqueePlaceholders.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [marqueePlaceholders]);

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

      <div
        id="home-content"
        className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center pointer-events-none"
      >
        <div className="flex flex-col items-center justify-center gap-4 p-4 text-center max-w-full w-full">
        <div className="flex items-center justify-center mb-8 md:hidden">
          <LogoIcon size={200} />
         </div>
          <div
            className={`pointer-events-none font-bold text-3xl md:text-6xl text-center ${
              isDark ? "text-cyan-500" : "text-cyan-700"
            } max-w-full w-full`}
          >
            {t.helloImEdinson}
          </div>

          <div
            className={`pointer-events-none text-sm md:text-3xl text-center max-w-2xl w-full dark:text-white text-black`}
          >
            {t.softwareEngineerTransforms}
          </div>
          <div
            className={`hidden md:block pointer-events-none text-sm md:text-lg text-center max-w-5xl w-full dark:text-gray-400 text-black`}
          >
            {t.yearsBuildingSolutions}
          </div>

          <div className="flex flex-col items-center justify-center mt-8 w-full max-w-xs sm:max-w-md">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-white text-center">
              {t.whatWantToKnow}
            </h2>
            <div className="relative w-full max-w-md pointer-events-auto">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && inputValue.trim()) {
                    setChatQuery(inputValue.trim());
                    setInputValue("");
                    setIsChatOpen(true);
                  }
                }}
                className="w-full py-3 pl-4 pr-10 rounded-lg bg-[#191C1F] border border-blue-400 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {/* Marquee placeholder overlay */}
              {!(inputValue || isFocused) && (
                <div className="pointer-events-none absolute inset-0 flex items-center pl-4 pr-12 overflow-hidden">
                  <span className="text-gray-400 whitespace-nowrap">
                    <TextAnimate2
                      animation="fadeIn"
                      by="character"
                      as={"p"}
                      delay={500}
                    >
                      {marqueePlaceholders[marqueeIndex]}
                    </TextAnimate2>
                  </span>
                </div>
              )}
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
                <BiSearch />
              </span>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <a
              href="https://cal.com/edinson-nunez-more"
              target="_blank"
              rel="noopener noreferrer"
              className="text-md max-w-xs pointer-events-auto text-black dark:text-white hover:underline w-full text-center"
            >
              {t.scheduleOnCalCom}
            </a>
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
