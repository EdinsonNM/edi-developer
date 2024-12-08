import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NotFound } from "../design/templates/notfound/notfound";
import Layout from "@presentation/layout/layout";
import React, { Suspense } from "react";
import Home from "@presentation/pages/home/home";

const Page1 = React.lazy(() => import("@presentation/home/home"));
const Page2 = React.lazy(() => import("@presentation/technology/technology"));
const Page3 = React.lazy(() => import("@presentation/experience/experience"));
const Page4 = React.lazy(() => import("@presentation/store/store"));

function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
         {/* <Route path="/" element={<Layout />}>
            <Route index element={<Page1 />} />
            <Route path="page2" element={<Page2 />} />
            <Route path="page3" element={<Page3 />} />
            <Route path="page4" element={<Page4 />} />
            <Route path="*" element={<Navigate to="/page1" replace />} />
          </Route>
          <Route path="*" element={<NotFound />} />*/}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRouter;
