import { Outlet } from "react-router-dom";
import NavBar from "./components/navbar";

function Layout() {
  return (
    <div className="h-full w-full flex flex-col text-white">
      <NavBar />
      <Outlet />
    </div>
  );
}
export default Layout;
