import LogoIcon from "@design/atoms/icons/logo-icon";
import { NavLink } from "react-router-dom";
import "./navbar.css";
function NavBar() {
  return (
    <nav className="navbar fixed w-full flex flex-col md:flex-row z-40 py-4 px-10">
      <div className="flex flex-grow md:flex-shrink items-center justify-center md:items-start md:justify-start text-black">
        <LogoIcon size={160} />
      </div>
      <div className="flex-shrink md:flex-grow"></div>
      <div className="hidden md:block md:flex-shrink flex-grow lg:justify-end">
        <ul className="flex flex-row gap-8 justify-end text-black">
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
