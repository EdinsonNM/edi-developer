import LogoIcon from "@design/atoms/icons/logo-icon";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="fixed w-full flex flex-col md:flex-row items-center justify-center z-40 py-4 px-10">
      <div className="flex-grow md:flex-shrink lg:flex lg:items-center lg:justify-center">
        <LogoIcon size={160} />
      </div>
      <div className="flex-shrink md:flex-grow"></div>
      <div className="hidden md:block flex-grow">
        <ul className="flex flex-row gap-8">
          <li>
            <NavLink to={"home"}> Inicio</NavLink>
          </li>
          <li>
            <NavLink to={"only-for-devs"}>Only for Devs</NavLink>
          </li>
          <li>
            <NavLink to={"home"}>About me</NavLink>
          </li>
          <li>
            {" "}
            <NavLink to={"home"}>Contact</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default NavBar;
