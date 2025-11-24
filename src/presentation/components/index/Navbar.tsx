import logo from "@/assets/images/logo.png";
import { Menu, Download, Globe, X } from "lucide-react";
import { useMemo } from "react";
import { useI18n } from "@/presentation/utils/use-i18n";
import { useNavbarVisibility } from "./hooks/useNavbarVisibility";
import { useMenuControls } from "./hooks/useMenuControls";

interface NavigationItem {
  label: string;
  href: string;
}

interface NavbarProps {
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export function Navbar({ onNavClick }: NavbarProps) {
  const { t, language, setLanguage } = useI18n();
  const isNavbarVisible = useNavbarVisibility();
  const {
    isMobileMenuOpen,
    isLanguageMenuOpen,
    setIsMobileMenuOpen,
    setIsLanguageMenuOpen,
    closeAllMenus,
    mobileMenuRef,
    languageMenuRef,
  } = useMenuControls();

  // Memoizar opciones del menú de navegación para evitar recrearlas en cada render
  const navigationItems = useMemo<NavigationItem[]>(
    () => [
      { label: t.inicio, href: "#inicio" },
      { label: t.sobreMi, href: "#sobre-mi" },
      { label: t.queHago, href: "#que-hago" },
      { label: t.proyectos, href: "#proyectos" },
      { label: t.porQueTrabajarConmigo, href: "#por-que-trabajar-conmigo" },
      { label: t.charlas, href: "#charlas" },
      { label: t.contacto, href: "#contacto" },
    ],
    [t]
  );

  const handleLanguageChange = (newLanguage: "es" | "en") => {
    setLanguage(newLanguage);
    setIsLanguageMenuOpen(false);
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    closeAllMenus();
    onNavClick(e, href);
  };

  return (
    <nav
      role="navigation"
      aria-label={
        language === "es" ? "Navegación principal" : "Main navigation"
      }
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-sm bg-white/50 border-b border-slate-100 transition-transform duration-300 ${
        isNavbarVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center gap-2">
        <a
          href="#inicio"
          onClick={(e) => handleNavClick(e, "#inicio")}
          className="cursor-pointer"
        >
          <img
            src={logo}
            alt="Edi Developer"
            className="h-8"
            loading="eager"
          />
        </a>
      </div>

      {/* Menú Desktop */}
      <ul className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 list-none">
        {navigationItems.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="hover:text-blue-600 transition-colors px-2 py-1 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        {/* Language Selector */}
        <div className="relative language-selector">
          <button
            onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
            className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label={
              language === "es" ? "Seleccionar idioma" : "Select language"
            }
            aria-expanded={isLanguageMenuOpen}
            aria-haspopup="true"
          >
            <Globe className="h-4 w-4" aria-hidden="true" />
            <span className="uppercase">{language}</span>
          </button>
          {isLanguageMenuOpen && (
            <div
              ref={languageMenuRef}
              role="menu"
              aria-label={
                language === "es" ? "Menú de idiomas" : "Language menu"
              }
              className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50"
            >
              <button
                role="menuitem"
                onClick={() => handleLanguageChange("es")}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors focus:outline-none focus:bg-slate-50 focus:ring-2 focus:ring-blue-500 ${
                  language === "es" ? "bg-blue-50 text-blue-600" : ""
                }`}
                aria-current={language === "es" ? "true" : undefined}
              >
                Español
              </button>
              <button
                role="menuitem"
                onClick={() => handleLanguageChange("en")}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors focus:outline-none focus:bg-slate-50 focus:ring-2 focus:ring-blue-500 ${
                  language === "en" ? "bg-blue-50 text-blue-600" : ""
                }`}
                aria-current={language === "en" ? "true" : undefined}
              >
                English
              </button>
            </div>
          )}
        </div>
        <a
          href="/Resume English.pdf"
          download="Resume English.pdf"
          className="hidden md:flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label={t.downloadCV}
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          <span>{t.downloadCV}</span>
        </a>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-slate-600 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md p-1"
          aria-label={
            isMobileMenuOpen
              ? language === "es"
                ? "Cerrar menú"
                : "Close menu"
              : language === "es"
              ? "Abrir menú"
              : "Open menu"
          }
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Menú Mobile */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          role="menu"
          aria-label={
            language === "es"
              ? "Menú de navegación móvil"
              : "Mobile navigation menu"
          }
          className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-lg lg:hidden"
        >
          <nav
            className="flex flex-col px-6 py-4 gap-2"
            aria-label={language === "es" ? "Navegación" : "Navigation"}
          >
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                role="menuitem"
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-slate-600 hover:text-blue-600 transition-colors px-4 py-2 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/Resume English.pdf"
              download="Resume English.pdf"
              role="menuitem"
              className="flex items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label={t.downloadCV}
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              <span>{t.downloadCV}</span>
            </a>
          </nav>
        </div>
      )}
    </nav>
  );
}

