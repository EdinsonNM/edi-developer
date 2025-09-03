import { useEffect } from "react";

export default function useDarkMode() {
  // Siempre en modo dark
  const isDark = false;

  useEffect(() => {
    // Forzar modo dark permanentemente
    document.documentElement.classList.add("light");
    localStorage.setItem("darkMode", "false");
  }, []);

  // Función vacía ya que no se puede cambiar el tema
  const toggleDarkMode = () => {
    // No hace nada - modo dark permanente
  };

  return { isDark, toggleDarkMode };
}
