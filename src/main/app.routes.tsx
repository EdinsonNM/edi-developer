import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "../design/templates/notfound/notfound";
import Home from "@presentation/home/home";
import Layout from "@presentation/layout/layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/home",
        element: <Home />,
        index: true,
      },
    ],
  },
]);
