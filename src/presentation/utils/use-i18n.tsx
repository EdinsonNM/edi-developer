import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Definir los tipos de traducción
type Language = "es" | "en";

interface Translations {
  // Navbar
  inicio: string;
  recursosDesarrolladores: string;
  sobreMi: string;
  miPodcast: string;
  saas: string;
  charlasYTalleres: string;

  // Info Search Page
  saludoAsistente: string;
  descripcionAsistente: string;
  ejemplosPreguntas: string;
  ejemploTimeline: string;
  ejemploHabilidades: string;
  ejemploProyectos: string;
  ejemploExperiencia: string;
  escribeTuPregunta: string;
  escribiendo: string;

  // Timeline instructions
  scrollHorizontal: string;
  ctrlZoom: string;
  hoverDetalles: string;

  // Error messages
  errorCargarDatos: string;
  problemaGrafico: string;

  // Sidebar
  menu: string;
  navegacion: string;
  cerrarMenu: string;
  idiomaLanguage: string;
  abrirMenu: string;

  // Home page
  helloImEdinson: string;
  softwareEngineerTransforms: string;
  yearsBuildingSolutions: string;
  whatWantToKnow: string;
  scheduleOnCalCom: string;

  // Home placeholders
  placeholder1: string;
  placeholder2: string;
  placeholder3: string;
  placeholder4: string;

  // Chat button
  chatWithEdinson: string;
  askMeAnything: string;

  // Developer resources
  recursosTitulo: string;
  recursosIntro: string;
  publicaciones: string;
  ejemplos: string;
  presentaciones: string;
  demosYProyectos: string;
  podcast: string;
  tiktok: string;
  historias: string;
}

const translations: Record<Language, Translations> = {
  es: {
    // Navbar
    inicio: "Inicio",
    recursosDesarrolladores: "Recursos para desarrolladores",
    sobreMi: "Sobre mí",
    miPodcast: "Mi Podcast",
    saas: "SaaS",
    charlasYTalleres: "Charlas y talleres",

    // Info Search Page
    saludoAsistente: "👋 ¡Hola! Soy el Asistente de Información de Edinson",
    descripcionAsistente:
      "Haz preguntas y explora visualizaciones interactivas sobre Edinson. Descubre datos y respuestas de forma visual y sencilla.",
    ejemplosPreguntas: "💡 Ejemplos de preguntas que puedes hacer:",
    ejemploTimeline: '"Muéstrame su timeline profesional"',
    ejemploHabilidades: '"¿Cuáles son sus habilidades técnicas?"',
    ejemploProyectos: '"Información sobre sus proyectos"',
    ejemploExperiencia: '"Gráfico de su experiencia por años"',
    escribeTuPregunta: "Escribe tu pregunta aquí...",
    escribiendo: "Escribiendo",

    // Timeline instructions
    scrollHorizontal: "💡 Usa scroll horizontal para navegar",
    ctrlZoom: "🔍 Ctrl + rueda del mouse para zoom",
    hoverDetalles: "ℹ️ Hover sobre los puntos para más detalles",

    // Error messages
    errorCargarDatos: "Error al cargar datos",
    problemaGrafico: "Hubo un problema al obtener la información del gráfico.",

    // Sidebar
    menu: "Menú",
    navegacion: "Navegación",
    cerrarMenu: "Cerrar menú",
    idiomaLanguage: "Idioma / Language",
    abrirMenu: "Abrir menú",

    // Home page
    helloImEdinson: "Hola, soy Edinson",
    softwareEngineerTransforms:
      "Diseño productos digitales que cautivan a tus usuarios y generan resultados",
    yearsBuildingSolutions:
      "Especialista en Frontend, gráficos 3D e IA aplicada. Más de 14 años creando soluciones para marcas globales.",
    whatWantToKnow: "¿Qué quieres saber?",
    scheduleOnCalCom: "O agenda una reunión en cal.com",

    // Home placeholders
    placeholder1: "Proyectos, charlas, tecnologías.",
    placeholder2: "Explora mis trabajos.",
    placeholder3: "Experiencia y habilidades.",
    placeholder4: "Agenda una reunión.",

    // Chat button
    chatWithEdinson: "Pregúntale a la IA sobre mí",
    askMeAnything: "Pregúntame lo que quieras",

    // Developer resources
    recursosTitulo: "Recursos para Devs",
    recursosIntro:
      "Explora mis publicaciones, ejemplos de código y presentaciones. Todo categorizado para que encuentres rápido lo que necesitas.",
    publicaciones: "Publicaciones",
    ejemplos: "Ejemplos",
    presentaciones: "Presentaciones",
    demosYProyectos: "Demos y Proyectos",
    podcast: "Podcast",
    tiktok: "TikTok",
    historias: "Historias",
  },
  en: {
    // Navbar
    inicio: "Home",
    recursosDesarrolladores: "Developer Resources",
    sobreMi: "About Me",
    miPodcast: "My Podcast",
    saas: "SaaS",
    charlasYTalleres: "Talks & Workshops",

    // Info Search Page
    saludoAsistente: "👋 Hello! I'm Edinson's Information Assistant",
    descripcionAsistente:
      "Ask questions and explore interactive visualizations about Edinson. Discover data and answers in a visual and simple way.",
    ejemplosPreguntas: "💡 Examples of questions you can ask:",
    ejemploTimeline: '"Show me his professional timeline"',
    ejemploHabilidades: '"What are his technical skills?"',
    ejemploProyectos: '"Information about his projects"',
    ejemploExperiencia: '"Chart of his experience by years"',
    escribeTuPregunta: "Write your question here...",
    escribiendo: "Writing",

    // Timeline instructions
    scrollHorizontal: "💡 Use horizontal scroll to navigate",
    ctrlZoom: "🔍 Ctrl + mouse wheel to zoom",
    hoverDetalles: "ℹ️ Hover over points for more details",

    // Error messages
    errorCargarDatos: "Error loading data",
    problemaGrafico: "There was a problem getting the chart information.",

    // Sidebar
    menu: "Menu",
    navegacion: "Navigation",
    cerrarMenu: "Close menu",
    idiomaLanguage: "Language / Idioma",
    abrirMenu: "Open menu",

    // Home page
    helloImEdinson: "Hello, I'm Edinson",
    softwareEngineerTransforms:
      "I design digital products that captivate your users and deliver results",
    yearsBuildingSolutions:
      "Frontend specialist, 3D graphics and applied AI. Over 14 years creating solutions for global brands.",
    whatWantToKnow: "What do you want to know?",
    scheduleOnCalCom: "Or schedule a meeting on cal.com",

    // Home placeholders
    placeholder1: "Projects, talks, technologies.",
    placeholder2: "Explore my work.",
    placeholder3: "Experience and skills.",
    placeholder4: "Schedule a meeting.",

    // Chat button
    chatWithEdinson: "Ask the AI about me",
    askMeAnything: "Ask me anything",

    // Developer resources
    recursosTitulo: "Developer Resources",
    recursosIntro:
      "Explore my publications, code examples and talks. Everything categorized so you can quickly find what you need.",
    publicaciones: "Publications",
    ejemplos: "Examples",
    presentaciones: "Talks",
    demosYProyectos: "Demos & Projects",
    podcast: "Podcast",
    tiktok: "TikTok",
    historias: "Stories",
  },
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("es");

  useEffect(() => {
    // Obtener idioma del localStorage
    const storedLanguage = localStorage.getItem("language") as Language;
    if (
      storedLanguage &&
      (storedLanguage === "es" || storedLanguage === "en")
    ) {
      setLanguage(storedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = translations[language];

  return (
    <I18nContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};
