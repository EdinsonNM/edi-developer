import { useState, useEffect, useRef } from "react";

interface UseMenuControlsReturn {
  isMobileMenuOpen: boolean;
  isLanguageMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
  setIsLanguageMenuOpen: (value: boolean) => void;
  closeAllMenus: () => void;
  mobileMenuRef: React.RefObject<HTMLDivElement>;
  languageMenuRef: React.RefObject<HTMLDivElement>;
}

/**
 * Hook personalizado para manejar los estados de los menús móvil e idioma
 * Incluye lógica para cerrar al hacer click fuera o presionar Escape
 */
export function useMenuControls(): UseMenuControlsReturn {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const languageMenuRef = useRef<HTMLDivElement>(null);

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsLanguageMenuOpen(false);
  };

  // Cerrar menú de idioma al hacer click fuera o presionar Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".language-selector")) {
        setIsLanguageMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeAllMenus();
      }
    };

    if (isLanguageMenuOpen || isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isLanguageMenuOpen, isMobileMenuOpen]);

  // Manejar navegación por teclado en menú de idioma
  useEffect(() => {
    if (isLanguageMenuOpen && languageMenuRef.current) {
      const firstButton = languageMenuRef.current.querySelector("button");
      firstButton?.focus();
    }
  }, [isLanguageMenuOpen]);

  // Manejar navegación por teclado en menú móvil
  useEffect(() => {
    if (isMobileMenuOpen && mobileMenuRef.current) {
      const firstLink = mobileMenuRef.current.querySelector("a");
      firstLink?.focus();
    }
  }, [isMobileMenuOpen]);

  return {
    isMobileMenuOpen,
    isLanguageMenuOpen,
    setIsMobileMenuOpen,
    setIsLanguageMenuOpen,
    closeAllMenus,
    mobileMenuRef,
    languageMenuRef,
  };
}

