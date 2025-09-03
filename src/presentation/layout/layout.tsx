import { Outlet } from "react-router-dom";
import NavBar from "./components/navbar";
import { LayoutContextProvider } from "./layout.context";

function Layout() {
  return (
    <LayoutContextProvider>
      <div className="h-full w-full flex flex-col bg-background text-foreground">
        <NavBar />
        <main className="h-full w-full">
          <Outlet />
        </main>
      </div>
    </LayoutContextProvider>
  );
}
export default Layout;
