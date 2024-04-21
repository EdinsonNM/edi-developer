import { Outlet } from "react-router-dom";
import LogoIcon from "@design/atoms/icons/logo-icon";

function Layout() {
  return (
    <div className="h-full grid grid-rows-[160px_auto] w-full">
      <nav className="flex items-center justify-center">
        <LogoIcon size={160} />
      </nav>
      <main className="relative overflow-auto bg-gray-100 p-4">
        <Outlet />
      </main>
    </div>
  );
}
export default Layout;
