import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "../design/templates/notfound/notfound";
import Home from "@presentation/home/home";
import Layout from "@presentation/layout/layout";
import OnlyForDevs from "@presentation/only-for-devs/only-for-devs";

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
      {
        path: "/only-for-devs",
        element: <OnlyForDevs />,
        index: true,
      },
    ],
  },
]);
