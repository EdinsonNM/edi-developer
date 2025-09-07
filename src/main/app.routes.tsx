import { Routes, Route, HashRouter } from "react-router-dom";
import Layout from "@presentation/layout/layout";
import React, { Suspense } from "react";
import Loading from "@presentation/components/loading/loading";

const MyProjects = React.lazy(
  () => import("@presentation/pages/my-projects/my-projects")
);
const Home = React.lazy(() => import("@presentation/pages/home/home"));

function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="mis-proyectos"
            element={
              <Suspense fallback={<Loading />}>
                <MyProjects />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default AppRouter;
