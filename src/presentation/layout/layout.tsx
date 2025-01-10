import { Outlet } from "react-router-dom";
import NavBar from "./components/navbar";
import { LayoutContextProvider } from "./layout.context";

function Layout() {
  return (
    <LayoutContextProvider>
      <div className="h-full w-full flex flex-col text-white">
        <NavBar />
        <Outlet />
      </div>
    </LayoutContextProvider>
  );
}
export default Layout;
