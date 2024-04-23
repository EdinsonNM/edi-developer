import { NavLink, Outlet } from "react-router-dom";
import LogoIcon from "@design/atoms/icons/logo-icon";

function Layout() {
  return (
    <div className="h-full w-full flex flex-col">
      <nav className="fixed w-full flex items-center justify-centerz z-40 py-4 px-10">
        <div>
          <LogoIcon size={160} />
        </div>
        <div className="flex-grow"></div>
        <div>
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
      <main className="relative flex flex-col overflow-auto bg-gray-100 h-full w-full">
        <Outlet />
      </main>
    </div>
  );
}
export default Layout;
