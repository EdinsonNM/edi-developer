import LogoIcon from "@design/atoms/icons/logo-icon";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { Popover, PopoverButton } from "@headlessui/react";
import MenuResponsive from "./menu.responsive";
function NavBar() {
  const navigation = [
    { url: "page1", title: "Inicio" },
    { url: "page2", title: "Tecnología" },
    { url: "page3", title: "Experiencia" },
    { url: "page4", title: "Store" },
  ];

  return (
    <nav className="navbar fixed left-0 top-0 w-full flex flex-col md:flex-row z-10 py-4 px-10 pointer-events-auto">
      <div
        className={`flex flex-grow md:flex-shrink items-center justify-center md:items-start md:justify-start`}
      >
        <LogoIcon size={160} />
      </div>
      <div className="flex-shrink md:flex-grow"></div>
      <div className="md:hidden block fixed right-2">
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
                    ? "p-3 rounded-md hover:text-orange-200  hover:bg-opacity-50 text-orange-500 font-bold"
                    : "p-3 rounded-md hover:text-orange-300 hover:bg-opacity-80 text-white font-bold"
                }
              >
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
export default NavBar;
