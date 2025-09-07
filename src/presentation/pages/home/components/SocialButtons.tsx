import { memo } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

interface SocialButtonsProps {
  className?: string;
}

const SocialButtons = memo(({ className = "" }: SocialButtonsProps) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <a
      href="https://github.com/edinsonnm"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-gray-700 hover:text-gray-900 border border-gray-200/50 hover:border-gray-300/50 transition-all duration-200 hover:shadow-sm"
      title="GitHub"
      aria-label="Visitar mi GitHub"
    >
      <FaGithub className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-200" />
      <span className="text-xs font-medium">GitHub</span>
    </a>

    <a
      href="https://linkedin.com/in/edinsonnm"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-gray-700 hover:text-gray-900 border border-gray-200/50 hover:border-gray-300/50 transition-all duration-200 hover:shadow-sm"
      title="LinkedIn"
      aria-label="Visitar mi LinkedIn"
    >
      <FaLinkedin className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-200" />
      <span className="text-xs font-medium">LinkedIn</span>
    </a>
  </div>
));

SocialButtons.displayName = "SocialButtons";

export default SocialButtons;
