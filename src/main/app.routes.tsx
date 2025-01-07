import { Routes, Route, HashRouter } from "react-router-dom";
import Layout from "@presentation/layout/layout";
import React, { Suspense } from "react";
import Home from "@presentation/pages/home/home";

const MyProjects = React.lazy(
  () => import("@presentation/pages/my-projects/my-projects")
);
const About = React.lazy(() => import("@presentation/pages/about/about"));
const Contact = React.lazy(() => import("@presentation/pages/contact/contact"));

function AppRouter() {
  return (
    <HashRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="mis-proyectos" element={<MyProjects />} />
            <Route path="sobre-mi" element={<About />} />
            <Route path="contacto" element={<Contact />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default AppRouter;
