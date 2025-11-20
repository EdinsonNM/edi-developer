import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PresentationCard } from "./components/PresentationCard";
import { presentations } from "./data/presentations";
import { ArrowLeft, Menu, Download } from "lucide-react";
import logo from "@/assets/images/logo.png";

// Opciones del menú de navegación (mismo que index)
const navigationItems = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Sobre mí", href: "/#sobre-mi" },
  { label: "Qué hago", href: "/#que-hago" },
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Por qué trabajar conmigo", href: "/#por-que-trabajar-conmigo" },
  { label: "Charlas", href: "/#charlas" },
  { label: "Recursos", href: "/#recursos" },
  { label: "Contacto", href: "/#contacto" },
];

export default function Presentations() {
  const navigate = useNavigate();
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Manejar visibilidad del navbar al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }

      rafIdRef.current = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const lastScrollY = lastScrollYRef.current;

        if (currentScrollY < lastScrollY || currentScrollY < 100) {
          setIsNavbarVisible((prev) => (prev ? prev : true));
        } else {
          setIsNavbarVisible((prev) => (prev ? false : prev));
        }

        lastScrollYRef.current = currentScrollY;
        rafIdRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  // Función para navegación
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (href.startsWith("/#")) {
      navigate("/");
      setTimeout(() => {
        const hash = href.replace("/#", "#");
        const element = document.querySelector(hash);
        if (element) {
          const offsetTop =
            element.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      }, 100);
    } else {
      navigate(href);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-white text-slate-900 selection:bg-blue-100">
      {/* Navbar - mismo estilo que index */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-sm bg-white/50 border-b border-slate-100 transition-transform duration-300 ${
          isNavbarVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center gap-2">
          <a
            href="/#inicio"
            onClick={(e) => handleNavClick(e, "/#inicio")}
            className="cursor-pointer"
          >
            <img src={logo} alt="Edi Developer" className="h-8" />
          </a>
        </div>

        {/* Menú Desktop */}
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="hover:text-blue-600 transition-colors px-2 py-1 rounded-md hover:bg-slate-50"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors">
            <Download className="h-4 w-4" />
            <span>Download CV</span>
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-slate-600 hover:text-blue-600 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Menú Mobile */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-lg lg:hidden">
            <div className="flex flex-col px-6 py-4 gap-2">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-slate-600 hover:text-blue-600 transition-colors px-4 py-2 rounded-md hover:bg-slate-50"
                >
                  {item.label}
                </a>
              ))}
              <button className="flex items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors mt-2">
                <Download className="h-4 w-4" />
                <span>Download CV</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Contenido principal */}
      <div className="w-full relative container mx-auto py-24 md:py-28 lg:py-32 px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <Link
            to="/#recursos"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Volver a recursos</span>
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
            Guías y Artículos
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Presentaciones y materiales de charlas que he dictado sobre desarrollo, arquitectura y tecnología.
          </p>
        </div>

        {/* Grid de presentaciones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {presentations.map((presentation) => (
            <PresentationCard key={presentation.id} presentation={presentation} />
          ))}
        </div>

        {presentations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">
              Próximamente se agregarán más presentaciones.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

