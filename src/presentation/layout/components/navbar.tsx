import LogoIcon from "@design/atoms/icons/logo-icon";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import Sidebar from "./sidebar";
import { useState, useEffect, useRef } from "react";
import { useI18n } from "@presentation/utils/use-i18n";

function NavBar() {
  const { language, setLanguage, t } = useI18n();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const navigation = [
    { url: "/", title: t.inicio },
    { url: "mis-proyectos", title: t.recursosDesarrolladores },
    { url: "podcast", title: t.miPodcast },
    //{ url: "sass", title: t.saas },
    //{ url: "charlas", title: t.charlasYTalleres },
  ];

  const languages = [
    { code: 'es' as const, name: 'Español', flag: '🇪🇸' },
    { code: 'en' as const, name: 'English', flag: '🇺🇸' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageChange = (newLanguage: 'es' | 'en') => {
    setLanguage(newLanguage);
    setIsLanguageDropdownOpen(false);
  };

  return (
    <>
      <nav className="navbar fixed left-0 top-0 w-full flex flex-row items-center z-10 py-2 px-3 md:py-4 md:px-10 pointer-events-auto">
        {/* Logo a la izquierda, tamaño responsive */}
        <div className="flex items-center text-white">
          {/* Logo responsive: grande en desktop, intermedio en mobile */}
          <span className="block">
            <span className="hidden md:block">
              <LogoIcon size={160} />
            </span>
            <span className="hidden md:hidden">
              <LogoIcon size={80} />
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
                    isActive
                      ? "p-3 rounded-md hover:text-orange-800 hover:bg-opacity-50 text-orange-500 font-bold"
                      : "p-3 rounded-md hover:text-cyan-400 hover:bg-opacity-80 text-white"
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
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-white bg-gray-800/60 rounded-lg hover:bg-gray-700/60 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200 border border-gray-600/40"
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            >
              <span className="text-lg">{currentLanguage?.flag}</span>
              <span className="hidden lg:block">{currentLanguage?.name}</span>
              <svg
                className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                  isLanguageDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown de idioma para desktop */}
            {isLanguageDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    className={`w-full flex items-center px-4 py-3 text-sm hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors duration-200 ${
                      language === lang.code
                        ? "bg-cyan-600 text-white"
                        : "text-gray-300"
                    }`}
                    onClick={() => handleLanguageChange(lang.code)}
                  >
                    <span className="text-lg mr-3">{lang.flag}</span>
                    <span className="font-medium">{lang.name}</span>
                    {language === lang.code && (
                      <svg
                        className="ml-auto h-4 w-4 text-white"
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
            className="md:hidden p-2 rounded-md text-white hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-200"
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
