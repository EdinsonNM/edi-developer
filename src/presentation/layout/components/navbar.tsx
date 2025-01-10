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
    { url: "mis-proyectos", title: "Mis Proyectos" },
    /*{ url: "sobre-mi", title: "Sobre Mi" },
    { url: "contacto", title: "Contacto" },*/
  ];

  return (
    <nav className="navbar fixed left-0 top-0 w-full flex flex-col md:flex-row z-10 py-4 px-10 pointer-events-auto">
      <div
        className={`flex items-center justify-center md:justify-start ${
          isDark ? "text-white" : "text-cyan-700"
        }`}
      >
        <LogoIcon size={160} />
      </div>
      <div className="flex-grow"></div>
      <div className="md:hidden flex flex-row fixed right-2">
        <button
          onClick={toggleDarkMode}
          className="mx-4 py-2 rounded-md hover:text-cyan-700 hover:bg-opacity-80 text-gray-800 dark:text-white font-bold flex flex-row items-center gap-2"
        >
          <SunIcon className="hidden dark:block text-4xl size-6" />
          <MoonIcon className="block dark:hidden text-4xl size-6" />
        </button>
        <Popover>
          <PopoverButton className="block text-sm/6 font-semibold text-white/50 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
            <BiMenu className="text-4xl" />
          </PopoverButton>
          <MenuResponsive items={navigation} />
        </Popover>
      </div>
      <div className="hidden md:flex flex-grow md:justify-end">
        <ul className="flex flex-row gap-0 md:gap-4">
          {navigation.map((item) => (
            <li key={item.url} className="">
              <NavLink
                to={item.url}
                className={({ isActive }) =>
                  isActive
                    ? "p-3 rounded-md hover:text-orange-800  hover:bg-opacity-50 text-red-500 dark:text-orange-500   font-bold"
                    : "p-3 rounded-md hover:text-cyan-700 hover:bg-opacity-80 text-gray-800 dark:text-white light:text-black "
                }
              >
                {item.title}
              </NavLink>
            </li>
          ))}
          <li>
            <button
              onClick={toggleDarkMode}
              className="py-2 rounded-md hover:text-cyan-700 hover:bg-opacity-80 text-gray-800 dark:text-white font-bold"
            >
              <SunIcon className="hidden dark:block text-4xl size-4" />
              <MoonIcon className="block dark:hidden text-4xl size-4" />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
