import { Routes, Route, HashRouter } from "react-router-dom";
import React, { Suspense } from "react";
import Loading from "@presentation/components/loading/loading";

const LandingPage = React.lazy(() => import("@presentation/pages/index/index"));
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
      </Routes>
    </HashRouter>
  );
}

export default AppRouter;
