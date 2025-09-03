import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { BiX, BiGlobe } from "react-icons/bi";
import { useI18n } from "@presentation/utils/use-i18n";
import LogoIcon from "@design/atoms/icons/logo-icon";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  items: { url: string; title: string }[];
};

function Sidebar({ isOpen, onClose, items }: SidebarProps) {
  const { language, setLanguage, t } = useI18n();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const languages = [
    { code: 'es' as const, name: 'Español', flag: '🇪🇸' },
    { code: 'en' as const, name: 'English', flag: '🇺🇸' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageChange = (newLanguage: 'es' | 'en') => {
    setLanguage(newLanguage);
    setIsLanguageOpen(false);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/70 backdrop-blur-md border-l border-gray-600/60 shadow-xl">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-6 border-b border-gray-700">
                      <div className="flex items-center space-x-3">
                        <LogoIcon size={40} />
                        <div className="text-white">
                          <h2 className="text-lg font-semibold">{t.menu}</h2>
                          <p className="text-sm text-gray-400">{t.navegacion}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        onClick={onClose}
                      >
                        <span className="sr-only">{t.cerrarMenu}</span>
                        <BiX className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Navigation */}
                    <div className="flex-1 px-6 py-6">
                      <nav className="space-y-2">
                        {items.map((item) => (
                          <NavLink
                            key={item.url}
                            to={item.url}
                            onClick={onClose}
                            className={({ isActive }) =>
                              `group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                                isActive
                                  ? "bg-[#2b59c3] text-white shadow-lg"
                                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
                              }`
                            }
                          >
                            <span className="truncate">{item.title}</span>
                          </NavLink>
                        ))}
                      </nav>

                      {/* Language Selector */}
                      <div className="mt-8 pt-6 border-t border-gray-700">
                        <div className="mb-3">
                          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            {t.idiomaLanguage}
                          </h3>
                        </div>
                        
                        <div className="relative">
                          <button
                            type="button"
                            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-300 bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2b59c3] transition-all duration-200"
                            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                          >
                            <div className="flex items-center space-x-3">
                              <BiGlobe className="h-5 w-5 text-[#2b59c3]" />
                              <span className="text-xl">{currentLanguage?.flag}</span>
                              <span>{currentLanguage?.name}</span>
                            </div>
                            <svg
                              className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                                isLanguageOpen ? "rotate-180" : "rotate-0"
                              }`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>

                          {/* Language Dropdown */}
                          <Transition
                            show={isLanguageOpen}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                          >
                            <div className="absolute z-10 mt-2 w-full bg-gray-800 border border-gray-600 rounded-lg shadow-lg">
                              {languages.map((lang) => (
                                <button
                                  key={lang.code}
                                  type="button"
                                  className={`w-full flex items-center px-4 py-3 text-sm hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors duration-200 ${
                                    language === lang.code
                                      ? "bg-[#2b59c3] text-white"
                                      : "text-gray-300"
                                  }`}
                                  onClick={() => handleLanguageChange(lang.code)}
                                >
                                  <span className="text-xl mr-3">{lang.flag}</span>
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
                          </Transition>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-gray-700">
                      <div className="text-center">
                        <p className="text-xs text-gray-500">
                          © {new Date().getFullYear()} Edinson Nuñez More
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          Desarrollador Full Stack
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Sidebar;

