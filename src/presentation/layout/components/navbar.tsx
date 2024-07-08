import LogoIcon from "@design/atoms/icons/logo-icon";
import "./navbar.css";
function NavBar() {
  return (
    <nav className="navbar fixed left-0 top-0 w-full flex flex-col md:flex-row z-40 py-4 px-10">
      <div
        className={`flex flex-grow md:flex-shrink items-center justify-center md:items-start md:justify-start`}
      >
        <LogoIcon size={160} />
      </div>
      <div className="flex-shrink md:flex-grow"></div>
      <div className="hidden md:block md:flex-shrink flex-grow lg:justify-end">
        {/*<ul className={`flex flex-row gap-8 justify-end `}>
          <li>
            <NavLink to={"/"}> Inicio</NavLink>
          </li>
          <li>
            <NavLink to={"only-for-devs"}>Only for Devs</NavLink>
          </li>
          <li>
            <NavLink to={"/"}>About me</NavLink>
          </li>
          <li>
            {" "}
            <NavLink to={"/"}>Contact</NavLink>
          </li>
  </ul>*/}
      </div>
    </nav>
  );
}
export default NavBar;
