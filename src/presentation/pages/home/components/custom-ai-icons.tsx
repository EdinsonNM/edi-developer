import React from "react";

export interface IconProps {
  className?: string;
}

/**
 * Icono personalizado de Langchain
 * Basado en el logo oficial de Langchain
 */
export const LangchainIcon: React.FC<IconProps> = ({ className = "h-6 w-6" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/**
 * Icono personalizado de LangGraph
 * Basado en el concepto de grafos y cadenas
 */
export const LangraphIcon: React.FC<IconProps> = ({ className = "h-6 w-6" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="6" cy="6" r="2" fill="currentColor"/>
    <circle cx="18" cy="6" r="2" fill="currentColor"/>
    <circle cx="6" cy="18" r="2" fill="currentColor"/>
    <circle cx="18" cy="18" r="2" fill="currentColor"/>
    <circle cx="12" cy="12" r="2" fill="currentColor"/>
    <path d="M6 6l6 6M12 6l6 6M6 12l6 6M12 12l6 6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </svg>
);

/**
 * Icono personalizado de Chroma DB
 * Basado en el concepto de base de datos vectorial
 */
export const ChromaDbIcon: React.FC<IconProps> = ({ className = "h-6 w-6" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="18" cy="18" r="1.5" fill="currentColor"/>
  </svg>
);

