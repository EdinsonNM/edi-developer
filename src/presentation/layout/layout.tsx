import { Outlet } from "react-router-dom";
import NavBar from "./components/navbar";

function Layout() {
  return (
    <div className="h-full w-full flex flex-col">
      <NavBar />
      <main className="relative flex flex-col overflow-auto h-full w-full">
        <Outlet />
      </main>
    </div>
  );
}
export default Layout;
