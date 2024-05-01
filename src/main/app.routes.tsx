import { Navigate, createHashRouter } from "react-router-dom";
import { NotFound } from "../design/templates/notfound/notfound";
import Layout from "@presentation/layout/layout";
import OnlyForDevs from "@presentation/only-for-devs/only-for-devs";
import Home from "@presentation/home/home";

export const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },
      {
        path: "/only-for-devs",
        element: <OnlyForDevs />,
        index: true,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
