import { Routes, Route, HashRouter } from "react-router-dom";
import Layout from "@presentation/layout/layout";
import React, { Suspense } from "react";
import Home from "@presentation/pages/home/home";
import Loading from "@presentation/components/loading/loading";
import Podcast from "@presentation/pages/podcast/podcast";
import SASS from "@presentation/pages/sass/sass";

const MyProjects = React.lazy(
  () => import("@presentation/pages/my-projects/my-projects")
);
const About = React.lazy(() => import("@presentation/pages/about/about"));
const Contact = React.lazy(() => import("@presentation/pages/contact/contact"));

function AppRouter() {
  return (
    <HashRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="mis-proyectos" element={<MyProjects />} />
            <Route path="sobre-mi" element={<About />} />
            <Route path="contacto" element={<Contact />} />
            <Route path="podcast" element={<Podcast />} />
            <Route path="sass" element={<SASS />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default AppRouter;
