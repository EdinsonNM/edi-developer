import { Outlet } from "react-router-dom";
import NavBar from "./components/navbar";

function Layout() {
  return (
    <div className="grid grid-rows-[auto_1fr] bg-white text-foreground w-full overflow-x-hidden min-h-screen">
      <NavBar />
      <main className="relative flex flex-col content-center overflow-x-hidden min-h-[calc(100dvh-80px)] md:min-h-[calc(100dvh-96px)]">
        <Outlet />
      </main>
    </div>
  );
}
export default Layout;
