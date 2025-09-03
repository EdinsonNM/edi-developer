import LogoIcon from "@design/atoms/icons/logo-icon";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import Sidebar from "./sidebar";
import { useState, useEffect, useRef, useContext } from "react";
import { useI18n } from "@presentation/utils/use-i18n";
import LayoutContext from "@presentation/layout/layout.context";

function NavBar() {
  const { language, setLanguage, t } = useI18n();
  const { isDark } = useContext(LayoutContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isScrolled] = useState(false);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigation = [
    { url: "/", title: t.inicio },
    { url: "mis-proyectos", title: t.recursosDesarrolladores },

    //{ url: "sass", title: t.saas },
    //{ url: "charlas", title: t.charlasYTalleres },
  ];

  const languages = [
    { code: "es" as const, name: "Español", flag: "🇪🇸" },
    { code: "en" as const, name: "English", flag: "🇺🇸" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === language);

  const handleLanguageChange = (newLanguage: "es" | "en") => {
    setLanguage(newLanguage);
    setIsLanguageDropdownOpen(false);
  };

  return (
    <>
      <nav
        className={`bg-white navbar relative w-full flex flex-row items-center z-50 py-2 px-2 xs:px-3 md:py-4 md:px-10 pointer-events-auto transition-colors duration-300 border-b overflow-hidden h-16 md:h-20 ${
          isScrolled
            ? isDark
              ? "bg-gray-900/70 backdrop-blur-md border-white/10"
              : "bg-white/80 backdrop-blur-md border-gray-200"
            : "bg-transparent border-transparent"
        }`}
      >
        {/* Logo a la izquierda, tamaño responsive */}
        <div
          className={`flex items-center ${
            isDark ? "text-white" : "text-[#2b59c3]"
          }`}
        >
          {/* Logo responsive: grande en desktop, intermedio en mobile */}
          <span className="block">
            <span className="hidden md:block">
              <LogoIcon size={160} />
            </span>
            <span className="block md:hidden">
              <LogoIcon size={60} />
            </span>
          </span>
        </div>

        {/* Menú centrado en desktop, oculto en mobile */}
        <div className="flex-1 hidden md:flex justify-center">
          <ul className="flex flex-row gap-4">
            {navigation.map((item) => (
              <li key={item.url} className="">
                <NavLink
                  to={item.url}
                  className={({ isActive }) =>
                    isDark
                      ? isActive
                        ? "p-3 rounded-md hover:text-orange-300 text-orange-400 font-bold"
                        : "p-3 rounded-md hover:text-[#2b59c3] text-white"
                      : isActive
                      ? "p-3 rounded-md text-orange-600 font-bold"
                      : "p-3 rounded-md text-gray-800 hover:text-[#2b59c3]"
                  }
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Controles a la derecha */}
        <div className="flex items-center ml-auto">
          {/* Selector de idioma para desktop */}
          <div ref={dropdownRef} className="hidden md:block relative mr-4">
            <button
              type="button"
              className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2b59c3] transition-all duration-200 border ${
                isDark
                  ? "text-white bg-gray-800/60 hover:bg-gray-700/60 border-gray-600/40"
                  : "text-gray-800 bg-white hover:bg-gray-50 border-gray-200"
              }`}
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            >
              <span className="text-lg">{currentLanguage?.flag}</span>
              <span className="hidden lg:block">{currentLanguage?.name}</span>
              <svg
                className={`h-4 w-4 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                } transition-transform duration-200 ${
                  isLanguageDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown de idioma para desktop */}
            {isLanguageDropdownOpen && (
              <div
                className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50 border ${
                  isDark
                    ? "bg-gray-800 border-gray-600"
                    : "bg-white border-gray-200"
                }`}
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    className={`w-full flex items-center px-4 py-3 text-sm first:rounded-t-lg last:rounded-b-lg transition-colors duration-200 ${
                      language === lang.code
                        ? isDark
                          ? "bg-cyan-600 text-white"
                          : "bg-cyan-100 text-cyan-900"
                        : isDark
                        ? "text-gray-300 hover:bg-gray-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => handleLanguageChange(lang.code)}
                  >
                    <span className="text-lg mr-3">{lang.flag}</span>
                    <span className="font-medium">{lang.name}</span>
                    {language === lang.code && (
                      <svg
                        className={`ml-auto h-4 w-4 ${
                          isDark ? "text-white" : "text-cyan-900"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Botón del menú hamburguesa solo para mobile */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className={`md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2b59c3] transition-colors duration-200 ${
              isDark
                ? "text-white hover:text-[#2b59c3]"
                : "text-gray-800 hover:text-[#2b59c3]"
            }`}
          >
            <BiMenu className="text-3xl" />
          </button>
        </div>
      </nav>

      {/* Sidebar solo para mobile */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        items={navigation}
      />
    </>
  );
}

export default NavBar;
