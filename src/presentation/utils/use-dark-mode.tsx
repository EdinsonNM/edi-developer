import { useEffect } from "react";
import { useState } from "react";

export default function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Obtener preferencia del almacenamiento local
    const storedPreference = localStorage.getItem("darkMode") === "true";
    setIsDark(storedPreference);

    // Aplicar la clase `dark` en el elemento raíz
    if (storedPreference) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    localStorage.setItem("darkMode", newMode.toString());

    // Agregar o quitar la clase `dark`
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return { isDark, toggleDarkMode };
}
