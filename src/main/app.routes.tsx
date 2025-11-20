import { Routes, Route, HashRouter } from "react-router-dom";
import Layout from "@presentation/layout/layout";
import React, { Suspense } from "react";
import Loading from "@presentation/components/loading/loading";

const LandingPage = React.lazy(() => import("@presentation/pages/index/index"));
const MyProjects = React.lazy(
  () => import("@presentation/pages/my-projects/my-projects")
);
const AboutMe = React.lazy(
  () => import("@presentation/pages/about-me/about-me")
);
const Presentations = React.lazy(
  () => import("@presentation/pages/presentations/presentations")
);

function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <LandingPage />
            </Suspense>
          }
        />
        <Route
          path="presentaciones"
          element={
            <Suspense fallback={<Loading />}>
              <Presentations />
            </Suspense>
          }
        />
        <Route element={<Layout />}>
          <Route
            path="mis-proyectos"
            element={
              <Suspense fallback={<Loading />}>
                <MyProjects />
              </Suspense>
            }
          />
          <Route
            path="sobre-mi"
            element={
              <Suspense fallback={<Loading />}>
                <AboutMe />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default AppRouter;
