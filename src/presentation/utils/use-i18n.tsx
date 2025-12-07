import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
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
  ediAcademy: string;

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

  // Index page - Navigation
  queHago: string;
  proyectos: string;
  porQueTrabajarConmigo: string;
  charlas: string;
  contacto: string;
  downloadCV: string;

  // Index page - Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  contactMe: string;

  // Index page - About Section
  aboutTitle: string;
  aboutDescription1: string;
  aboutDescription2: string;
  aboutName: string;
  aboutYears: string;

  // Index page - What I Do Section
  whatIDoTitle: string;
  whatIDoSubtitle: string;
  aiSolutions: string;
  aiSolutionsDesc: string;
  webArchitecture: string;
  webArchitectureDesc: string;
  threeDExperiences: string;
  threeDExperiencesDesc: string;
  educationWorkshops: string;
  educationWorkshopsDesc: string;
  productInnovation: string;
  productInnovationDesc: string;

  // Index page - Featured Projects Section
  featuredProjectsTitle: string;
  featuredProjectsSubtitle: string;
  neokidsTitle: string;
  neokidsSubtitle: string;
  neokidsDesc: string;
  costproTitle: string;
  costproSubtitle: string;
  costproDesc: string;
  zypherTitle: string;
  zypherSubtitle: string;
  zypherDesc: string;
  yaquTitle: string;
  yaquSubtitle: string;
  yaquDesc: string;

  // Index page - Why Work With Me Section
  whyWorkWithMeTitle: string;
  whyWorkWithMeSubtitle: string;
  yearsExperience: string;
  yearsExperienceDesc: string;
  completeVision: string;
  completeVisionDesc: string;
  clearCommunication: string;
  clearCommunicationDesc: string;
  qualityDelivery: string;
  qualityDeliveryDesc: string;
  humanApproach: string;
  humanApproachDesc: string;

  // Index page - Talks Section
  talksTitle: string;
  talksSubtitle: string;
  topicsITeach: string;
  aiForDevelopers: string;
  technicalStorytelling: string;
  modernSoftwareEngineering: string;
  threeDWithReact: string;
  educationalInnovation: string;
  technologyWithPurpose: string;
  inviteMeToTalk: string;

  // Index page - Fabrica Programadores Section
  fabricaTitle: string;
  fabricaDescription1: string;
  fabricaDescription2: string;
  fabricaBookName: string;
  readStory: string;
  viewIllustrations: string;

  // Index page - Presentations Section
  presentationsTitle: string;
  presentationsSubtitle: string;
  presentationsSubtitleBold: string;
  viewAllPresentations: string;

  // Index page - Edi Academy Section
  ediAcademyTitle: string;
  ediAcademyTitleHighlight: string;
  ediAcademyDescription: string;
  ediAcademyProfile1Label: string;
  ediAcademyProfile1Title: string;
  ediAcademyProfile1Desc: string;
  ediAcademyProfile2Label: string;
  ediAcademyProfile2Title: string;
  ediAcademyProfile2Desc: string;
  ediAcademyProfile3Label: string;
  ediAcademyProfile3Title: string;
  ediAcademyProfile3Desc: string;
  ediAcademyMetric1Value: string;
  ediAcademyMetric1Label: string;
  ediAcademyMetric2Value: string;
  ediAcademyMetric2Label: string;
  ediAcademyMetric3Value: string;
  ediAcademyMetric3Label: string;
  ediAcademyButton: string;
  ediAcademyButtonLabel: string;
  goToEdiAcademy: string;

  // Index page - Contact Section
  letsWorkTogether: string;
  contactSubtitle: string;
  contactTitle: string;
  contactDescription: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  sendButton: string;
  sending: string;
  messageSentSuccess: string;
  messageError: string;

  // Index page - Footer Section
  footerTagline: string;
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
    ediAcademy: "Edi Academy",

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

    // Index page - Navigation
    queHago: "Qué hago",
    proyectos: "Proyectos",
    porQueTrabajarConmigo: "Por qué trabajar conmigo",
    charlas: "Charlas",
    contacto: "Contacto",
    downloadCV: "Descargar CV",

    // Index page - Hero Section
    heroTitle: "Edi Developer",
    heroSubtitle: "Innovación que abre oportunidades",
    heroDescription:
      "La tecnología es magia cuando abre oportunidades. Y yo construyo esa magia para quienes más la necesitan.",
    contactMe: "Contáctame",

    // Index page - About Section
    aboutTitle: "Sobre mí",
    aboutDescription1:
      "Soy {name}, ingeniero de software con más de {years} construyendo soluciones que combinan IA, arquitectura moderna, experiencias 3D y educación.",
    aboutDescription2:
      "Mi enfoque es simple: crear tecnología que transforme realidades.",
    aboutName: "Edinson Nuñez More",
    aboutYears: "14 años",

    // Index page - What I Do Section
    whatIDoTitle: "Qué hago",
    whatIDoSubtitle:
      "Servicios especializados para clientes y empresas que buscan innovación tecnológica.",
    aiSolutions: "Soluciones con IA",
    aiSolutionsDesc:
      "Aplicaciones inteligentes, asistentes conversacionales, agentes, análisis de datos y automatización.",
    webArchitecture: "Arquitectura & Desarrollo Web",
    webArchitectureDesc:
      "Sistemas escalables con React, Angular, NestJS, Node, Supabase y arquitecturas limpias.",
    threeDExperiences: "Experiencias 3D & Visuales",
    threeDExperiencesDesc:
      "React Three Fiber, WebGL, animaciones, mundos interactivos y visualizaciones técnicas.",
    educationWorkshops: "Educación & Workshops",
    educationWorkshopsDesc:
      "Charlas, mentoría y formación en IA, programación moderna y tecnología para estudiantes y equipos.",
    productInnovation: "Producto & Innovación",
    productInnovationDesc:
      "Diseño de experiencias, prototipos funcionales, estrategia tecnológica y visión técnica.",

    // Index page - Featured Projects Section
    featuredProjectsTitle: "Proyectos Destacados",
    featuredProjectsSubtitle:
      "Soluciones innovadoras que transforman realidades.",
    neokidsTitle: "NeoKids",
    neokidsSubtitle:
      "Asistente inteligente para apoyar a niños y jóvenes en la educación",
    neokidsDesc:
      "IA educativa que guía a estudiantes con herramientas personalizadas para alcanzar sus metas de aprendizaje.",
    costproTitle: "CostPro",
    costproSubtitle: "Software de presupuestos",
    costproDesc:
      "Potente herramienta de costos y presupuestos para cualquier proyecto. Precisión y control en cada etapa.",
    zypherTitle: "Zypher",
    zypherSubtitle: "Agenda escolar inteligente",
    zypherDesc:
      "La plataforma que une colegios, familias y estudiantes. Comunicación fluida y seguimiento en tiempo real.",
    yaquTitle: "Yaqu",
    yaquSubtitle: "Gestión moderna de agua",
    yaquDesc:
      "Transforma la gestión del agua con mapas interactivos, pagos digitales e inteligencia artificial.",

    // Index page - Why Work With Me Section
    whyWorkWithMeTitle: "Por qué trabajar conmigo",
    whyWorkWithMeSubtitle:
      "Valores y capacidades que marcan la diferencia en cada proyecto.",
    yearsExperience: "14+ años de experiencia",
    yearsExperienceDesc:
      "Construyendo software en compañías, startups y proyectos sociales.",
    completeVision: "Visión completa",
    completeVisionDesc:
      "Desde arquitectura hasta producto, UI/UX e inteligencia artificial.",
    clearCommunication: "Comunicación clara",
    clearCommunicationDesc:
      "Explico conceptos complejos de forma simple. Trabajo bien con equipos técnicos y no técnicos.",
    qualityDelivery: "Entrega con calidad",
    qualityDeliveryDesc:
      "Código limpio, buenas prácticas, testing, documentación y enfoque escalable.",
    humanApproach: "Enfoque humano",
    humanApproachDesc:
      "Busco impacto. Creo tecnología que abra oportunidades reales.",

    // Index page - Talks Section
    talksTitle: "Charlas y Workshops",
    talksSubtitle:
      "Comparto conocimiento y experiencias sobre tecnología e innovación.",
    topicsITeach: "Temas que imparto",
    aiForDevelopers: "IA para desarrolladores",
    technicalStorytelling: "Storytelling técnico",
    modernSoftwareEngineering: "Ingeniería de software moderna",
    threeDWithReact: "3D con React Three Fiber",
    educationalInnovation: "Innovación educativa",
    technologyWithPurpose: "Cómo crear tecnología con propósito",
    inviteMeToTalk: "Invítame a dar una charla",

    // Index page - Fabrica Programadores Section
    fabricaTitle:
      "Fábrica de Programadores — Un cuento para inspirar a los niños",
    fabricaDescription1:
      "Desde mi experiencia enseñando tecnología, creé {bookName}, un cuento ilustrado que introduce a los niños al mundo de la programación de manera divertida, tierna y cercana.",
    fabricaDescription2:
      "Mi objetivo es despertar curiosidad, creatividad y la idea de que cualquiera, sin importar su origen, puede construir tecnología.",
    fabricaBookName: "Fábrica de Programadores",
    readStory: "Leer el cuento",
    viewIllustrations: "Ver ilustraciones",

    // Index page - Presentations Section
    presentationsTitle: "Presentaciones y Materiales",
    presentationsSubtitle:
      "Comparto materiales de charlas y presentaciones sobre {bold} y otros temas técnicos que he dictado en diferentes eventos y conferencias.",
    presentationsSubtitleBold: "IA, desarrollo de software, arquitectura",
    viewAllPresentations: "Ver todas las presentaciones",

    // Index page - Edi Academy Section
    ediAcademyTitle: "Formación especializada en",
    ediAcademyTitleHighlight: "IA",
    ediAcademyDescription:
      "Cursos diseñados para diferentes perfiles que buscan dominar la inteligencia artificial",
    ediAcademyProfile1Label: "EDUCADORES",
    ediAcademyProfile1Title: "Docentes",
    ediAcademyProfile1Desc:
      "Actualiza tu metodología de enseñanza. Aprende a diseñar cursos, evaluar estudiantes y crear contenido con IA generativa.",
    ediAcademyProfile2Label: "PROGRAMADORES",
    ediAcademyProfile2Title: "Desarrolladores",
    ediAcademyProfile2Desc:
      "Domina Cursor, VS Code + Copilot y técnicas de prompting para código.",
    ediAcademyProfile3Label: "CORPORATIVO",
    ediAcademyProfile3Title: "Empresas",
    ediAcademyProfile3Desc:
      "Capacitación para equipos. Optimiza flujos de trabajo con IA.",
    ediAcademyMetric1Value: "+51h",
    ediAcademyMetric1Label: "CONTENIDO",
    ediAcademyMetric2Value: "100%",
    ediAcademyMetric2Label: "PRÁCTICO",
    ediAcademyMetric3Value: "IA",
    ediAcademyMetric3Label: "ASISTENTE",
    ediAcademyButton: "Explorar Edi Academy",
    ediAcademyButtonLabel: "Ir a Edi Academy",
    goToEdiAcademy: "Ir a Edi Academy",

    // Index page - Contact Section
    letsWorkTogether: "Trabajemos juntos",
    contactSubtitle:
      "Completa el formulario o escríbeme directamente para proyectos, colaboraciones o charlas.",
    contactTitle: "Contacto",
    contactDescription:
      "Estoy abierto a nuevas oportunidades y proyectos interesantes.",
    nameLabel: "Nombre",
    namePlaceholder: "Tu nombre",
    emailLabel: "Email",
    emailPlaceholder: "tu@email.com",
    messageLabel: "Mensaje",
    messagePlaceholder: "Cuéntame sobre tu proyecto o idea...",
    sendButton: "Enviar",
    sending: "Enviando...",
    messageSentSuccess: "¡Mensaje enviado con éxito! Te responderé pronto.",
    messageError:
      "Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.",

    // Index page - Footer Section
    footerTagline: "Construyendo futuro con tecnología y propósito.",
  },
  en: {
    // Navbar
    inicio: "Home",
    recursosDesarrolladores: "Developer Resources",
    sobreMi: "About Me",
    miPodcast: "My Podcast",
    saas: "SaaS",
    charlasYTalleres: "Talks & Workshops",
    ediAcademy: "Edi Academy",

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

    // Index page - Navigation
    queHago: "What I Do",
    proyectos: "Projects",
    porQueTrabajarConmigo: "Why Work With Me",
    charlas: "Talks",
    contacto: "Contact",
    downloadCV: "Download CV",

    // Index page - Hero Section
    heroTitle: "Edi Developer",
    heroSubtitle: "Innovation that opens opportunities",
    heroDescription:
      "Technology is magic when it opens opportunities. And I build that magic for those who need it most.",
    contactMe: "Contact Me",

    // Index page - About Section
    aboutTitle: "About Me",
    aboutDescription1:
      "I'm {name}, a software engineer with over {years} building solutions that combine AI, modern architecture, 3D experiences, and education.",
    aboutDescription2:
      "My approach is simple: create technology that transforms realities.",
    aboutName: "Edinson Nuñez More",
    aboutYears: "14 years",

    // Index page - What I Do Section
    whatIDoTitle: "What I Do",
    whatIDoSubtitle:
      "Specialized services for clients and companies seeking technological innovation.",
    aiSolutions: "AI Solutions",
    aiSolutionsDesc:
      "Intelligent applications, conversational assistants, agents, data analysis, and automation.",
    webArchitecture: "Web Architecture & Development",
    webArchitectureDesc:
      "Scalable systems with React, Angular, NestJS, Node, Supabase, and clean architectures.",
    threeDExperiences: "3D & Visual Experiences",
    threeDExperiencesDesc:
      "React Three Fiber, WebGL, animations, interactive worlds, and technical visualizations.",
    educationWorkshops: "Education & Workshops",
    educationWorkshopsDesc:
      "Talks, mentoring, and training in AI, modern programming, and technology for students and teams.",
    productInnovation: "Product & Innovation",
    productInnovationDesc:
      "Experience design, functional prototypes, technology strategy, and technical vision.",

    // Index page - Featured Projects Section
    featuredProjectsTitle: "Featured Projects",
    featuredProjectsSubtitle: "Innovative solutions that transform realities.",
    neokidsTitle: "NeoKids",
    neokidsSubtitle:
      "Intelligent assistant to support children and youth in education",
    neokidsDesc:
      "Educational AI that guides students with personalized tools to achieve their learning goals.",
    costproTitle: "CostPro",
    costproSubtitle: "Budgeting software",
    costproDesc:
      "Powerful cost and budgeting tool for any project. Precision and control at every stage.",
    zypherTitle: "Zypher",
    zypherSubtitle: "Smart school agenda",
    zypherDesc:
      "The platform that connects schools, families, and students. Smooth communication and real-time tracking.",
    yaquTitle: "Yaqu",
    yaquSubtitle: "Modern water management",
    yaquDesc:
      "Transforms water management with interactive maps, digital payments, and artificial intelligence.",

    // Index page - Why Work With Me Section
    whyWorkWithMeTitle: "Why Work With Me",
    whyWorkWithMeSubtitle:
      "Values and capabilities that make a difference in every project.",
    yearsExperience: "14+ years of experience",
    yearsExperienceDesc:
      "Building software in companies, startups, and social projects.",
    completeVision: "Complete vision",
    completeVisionDesc:
      "From architecture to product, UI/UX, and artificial intelligence.",
    clearCommunication: "Clear communication",
    clearCommunicationDesc:
      "I explain complex concepts simply. I work well with technical and non-technical teams.",
    qualityDelivery: "Quality delivery",
    qualityDeliveryDesc:
      "Clean code, best practices, testing, documentation, and scalable approach.",
    humanApproach: "Human approach",
    humanApproachDesc:
      "I seek impact. I create technology that opens real opportunities.",

    // Index page - Talks Section
    talksTitle: "Talks & Workshops",
    talksSubtitle:
      "I share knowledge and experiences about technology and innovation.",
    topicsITeach: "Topics I teach",
    aiForDevelopers: "AI for developers",
    technicalStorytelling: "Technical storytelling",
    modernSoftwareEngineering: "Modern software engineering",
    threeDWithReact: "3D with React Three Fiber",
    educationalInnovation: "Educational innovation",
    technologyWithPurpose: "How to create technology with purpose",
    inviteMeToTalk: "Invite me to give a talk",

    // Index page - Fabrica Programadores Section
    fabricaTitle: "Programmers Factory — A story to inspire children",
    fabricaDescription1:
      "From my experience teaching technology, I created {bookName}, an illustrated story that introduces children to the world of programming in a fun, tender, and approachable way.",
    fabricaDescription2:
      "My goal is to awaken curiosity, creativity, and the idea that anyone, regardless of their origin, can build technology.",
    fabricaBookName: "Programmers Factory",
    readStory: "Read the story",
    viewIllustrations: "View illustrations",

    // Index page - Presentations Section
    presentationsTitle: "Presentations & Materials",
    presentationsSubtitle:
      "I share materials from talks and presentations about {bold} and other technical topics I've delivered at various events and conferences.",
    presentationsSubtitleBold: "AI, software development, architecture",
    viewAllPresentations: "View all presentations",

    // Index page - Edi Academy Section
    ediAcademyTitle: "Specialized training in",
    ediAcademyTitleHighlight: "AI",
    ediAcademyDescription:
      "Courses designed for different profiles seeking to master artificial intelligence",
    ediAcademyProfile1Label: "EDUCATORS",
    ediAcademyProfile1Title: "Teachers",
    ediAcademyProfile1Desc:
      "Update your teaching methodology. Learn to design courses, evaluate students, and create content with generative AI.",
    ediAcademyProfile2Label: "PROGRAMMERS",
    ediAcademyProfile2Title: "Developers",
    ediAcademyProfile2Desc:
      "Master Cursor, VS Code + Copilot and code prompting techniques.",
    ediAcademyProfile3Label: "CORPORATE",
    ediAcademyProfile3Title: "Companies",
    ediAcademyProfile3Desc: "Training for teams. Optimize workflows with AI.",
    ediAcademyMetric1Value: "+51h",
    ediAcademyMetric1Label: "CONTENT",
    ediAcademyMetric2Value: "100%",
    ediAcademyMetric2Label: "PRACTICAL",
    ediAcademyMetric3Value: "AI",
    ediAcademyMetric3Label: "ASSISTANT",
    ediAcademyButton: "Explore Edi Academy",
    ediAcademyButtonLabel: "Go to Edi Academy",
    goToEdiAcademy: "Go to Edi Academy",

    // Index page - Contact Section
    letsWorkTogether: "Let's Work Together",
    contactSubtitle:
      "Complete the form or write to me directly for projects, collaborations, or talks.",
    contactTitle: "Contact",
    contactDescription:
      "I'm open to new opportunities and interesting projects.",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "your@email.com",
    messageLabel: "Message",
    messagePlaceholder: "Tell me about your project or idea...",
    sendButton: "Send",
    sending: "Sending...",
    messageSentSuccess: "Message sent successfully! I'll respond soon.",
    messageError: "There was an error sending the message. Please try again.",

    // Index page - Footer Section
    footerTagline: "Building the future with technology and purpose.",
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

  const handleSetLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  }, []);

  const t = translations[language];

  // Memoizar el valor del contexto para evitar re-renders innecesarios
  const contextValue = useMemo(
    () => ({ language, setLanguage: handleSetLanguage, t }),
    [language, handleSetLanguage, t]
  );

  return (
    <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};
