import React from "react";
import ReactDOM from "react-dom/client";
import App from "./main/app.tsx";
import "./assets/styles/index.css";

// Saludo elegante para desarrolladores curiosos
console.log(
  "%c👋 ¡Hola, desarrollador curioso!",
  "color: #3b82f6; font-size: 16px; font-weight: bold; padding: 4px 0;"
);
console.log(
  "%c✨ Gracias por revisar la consola. La atención a los detalles marca la diferencia.",
  "color: #8b5cf6; font-size: 12px; font-style: italic;"
);
console.log(
  "%c💡 Si encuentras algo interesante o tienes sugerencias, ¡sería genial escucharlas!",
  "color: #10b981; font-size: 11px;"
);
console.log(
  "%c🔗 Conectemos en LinkedIn:",
  "color: #0a66c2; font-size: 12px; font-weight: bold;"
);
console.log("https://www.linkedin.com/in/edinsonnm/");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
