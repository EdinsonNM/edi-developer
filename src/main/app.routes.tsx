import { Navigate, createHashRouter } from "react-router-dom";
import { NotFound } from "../design/templates/notfound/notfound";
import Layout from "@presentation/layout/layout";
import Home from "@presentation/home/home";
import Technology from "@presentation/technology/technology";
import Experience from "@presentation/experience/experience";
import Store from "@presentation/store/store";

export const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        path: "/page1",
        element: <Home />,
      },
      {
        path: "/page2",
        element: <Technology />,
      },
      {
        path: "/page3",
        element: <Experience />,
      },
      {
        path: "/page4",
        element: <Store />,
      },
      {
        path: "/",
        element: <Navigate to="/page1" replace />,
      },
    ],
  },
]);
