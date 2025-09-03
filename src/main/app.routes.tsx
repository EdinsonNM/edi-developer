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
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="mis-proyectos" element={<MyProjects />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default AppRouter;
