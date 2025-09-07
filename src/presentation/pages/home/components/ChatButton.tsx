import { memo } from "react";
import { BiChat } from "react-icons/bi";

interface ChatButtonProps {
  t: {
    chatWithEdinson: string;
  };
  onChatOpen: () => void;
}

const ChatButton = memo(({ t, onChatOpen }: ChatButtonProps) => (
  <div className="flex flex-col items-center md:items-start justify-center gap-2 w-full max-w-md px-2 md:px-0">
    <button
      onClick={onChatOpen}
      className="pointer-events-auto inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 xs:px-5 md:px-5 py-2.5 xs:py-3 md:py-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 text-sm xs:text-base"
      title={t.chatWithEdinson}
    >
      <BiChat className="h-4 w-4 xs:h-5 xs:w-5 md:h-5 md:w-5" />
      <span>{t.chatWithEdinson}</span>
    </button>
  </div>
));

ChatButton.displayName = "ChatButton";

export default ChatButton;
