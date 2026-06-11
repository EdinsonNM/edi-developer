import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useI18n } from "@/presentation/utils/use-i18n";

export function FooterSection() {
  const { t } = useI18n();
  return (
    <footer className="relative z-10 py-12 px-4 md:px-6 bg-ink-soft text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <picture className="h-8">
              <source srcSet={"./logo-white.webp"} type="image/webp" />
              <img src={"logo-white.png"} alt="Edi Developer" className="h-8" />
            </picture>
          </div>
          <p className="text-white/40 text-center text-sm max-w-md">
            {t.footerTagline}
          </p>

          {/* Redes sociales */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/edinsonnm"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-white/60 border border-white/10 hover:border-acid hover:text-acid transition-all duration-200"
              title="GitHub"
              aria-label="Visitar mi GitHub"
            >
              <FaGithub className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm font-medium">GitHub</span>
            </a>

            <a
              href="https://linkedin.com/in/edinsonnm"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-white/60 border border-white/10 hover:border-acid hover:text-acid transition-all duration-200"
              title="LinkedIn"
              aria-label="Visitar mi LinkedIn"
            >
              <FaLinkedin className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm font-medium">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
