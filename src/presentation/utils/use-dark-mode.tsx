import { useEffect } from "react";

export default function useDarkMode() {
  // Siempre en modo dark
  const isDark = true;

  useEffect(() => {
    // Forzar modo dark permanentemente
    document.documentElement.classList.add("dark");
    localStorage.setItem("darkMode", "true");
  }, []);

  // Función vacía ya que no se puede cambiar el tema
  const toggleDarkMode = () => {
    // No hace nada - modo dark permanente
  };

  return { isDark, toggleDarkMode };
}
