import { Navigate, createHashRouter } from "react-router-dom";
import { NotFound } from "../design/templates/notfound/notfound";
import Layout from "@presentation/layout/layout";

export const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        path: "/page1",
        async lazy() {
          let Index = await import("@presentation/home/home");
          return { Component: Index.default };
        },
      },
      {
        path: "page2",
        async lazy() {
          let Index = await import("@presentation/technology/technology");
          return { Component: Index.default };
        },
      },
      {
        path: "page3",
        async lazy() {
          let Index = await import("@presentation/experience/experience");
          return { Component: Index.default };
        },
      },
      {
        path: "page4",
        async lazy() {
          let Index = await import("@presentation/store/store");
          return { Component: Index.default };
        },
      },
      {
        path: "/",
        element: <Navigate to="/page1" replace />,
      },
    ],
  },
]);
