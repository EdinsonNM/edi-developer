import LogoIcon from "@design/atoms/icons/logo-icon";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { Popover, PopoverButton } from "@headlessui/react";
import MenuResponsive from "./menu.responsive";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import LayoutContext from "../layout.context";

function NavBar() {
  const { isDark, toggleDarkMode } = useContext(LayoutContext);
  const navigation = [
    { url: "/", title: "Inicio" },
    { url: "mis-proyectos", title: "Recursos para desarrolladores" },
    { url: "podcast", title: "Mi Podcast" },
    { url: "sass", title: "SaaS" },
    { url: "charlas", title: "Charlas y talleres" },
    /*{ url: "sobre-mi", title: "Sobre Mi" },
    { url: "contacto", title: "Contacto" },*/
  ];

  return (
    <nav className="navbar fixed left-0 top-0 w-full flex flex-row items-center z-10 py-2 px-3 md:py-4 md:px-10 pointer-events-auto">
      {/* Logo a la izquierda, tamaño responsive */}
      <div className={`flex items-center ${isDark ? "text-white" : "text-cyan-700"}`}>
        {/* Logo responsive: grande en desktop, intermedio en mobile */}
        <span className="block">
          <span className="hidden md:block">
            <LogoIcon size={160} />
          </span>
          <span className="block md:hidden">
            <LogoIcon size={80} />
          </span>
        </span>
      </div>
      {/* Menú centrado en desktop, oculto en mobile */}
      <div className="flex-1 hidden md:flex justify-center">
        <ul className="flex flex-row gap-4">
          {navigation.map((item) => (
            <li key={item.url} className="">
              <NavLink
                to={item.url}
                className={({ isActive }) =>
                  isActive
                    ? "p-3 rounded-md hover:text-orange-800 hover:bg-opacity-50 text-red-500 dark:text-orange-500 font-bold"
                    : "p-3 rounded-md hover:text-cyan-700 hover:bg-opacity-80 text-gray-800 dark:text-white light:text-black "
                }
              >
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      {/* Idioma, dark mode y menú hamburguesa a la derecha en mobile */}
      <div className="flex items-center gap-2 ml-auto">
        <select className="border rounded px-2 py-1 text-sm bg-transparent dark:text-white text-gray-800">
          <option value="es">ES</option>
          <option value="en">EN</option>
        </select>
        <button
          onClick={toggleDarkMode}
          className="py-2 rounded-md hover:text-cyan-700 hover:bg-opacity-80 text-gray-800 dark:text-white font-bold"
        >
          <SunIcon className="hidden dark:block text-4xl size-4" />
          <MoonIcon className="block dark:hidden text-4xl size-4" />
        </button>
        {/* Menú responsive solo visible en mobile */}
        <div className="md:hidden flex flex-row ml-2">
          <Popover>
            <PopoverButton className="block text-sm/6 font-semibold text-white/50 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
              <BiMenu className="text-3xl" />
            </PopoverButton>
            <MenuResponsive items={navigation} />
          </Popover>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
