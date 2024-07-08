import { Navigate, createHashRouter } from "react-router-dom";
import { NotFound } from "../design/templates/notfound/notfound";
import Layout from "@presentation/layout/layout";
import OnlyForDevs from "@presentation/only-for-devs/only-for-devs";
import Home from "@presentation/home/home";
import OverlayHome from "@presentation/home/components/overlay-home";
import OverlayExperience from "@presentation/home/components/overlay-experience";
import OverlayTechnology from "@presentation/home/components/overlay-technology";
import OverlayStore from "@presentation/home/components/overlay-store";

export const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            element: <Navigate to="/page1" replace />,
            index: true,
          },
          {
            path: "/page1",
            element: <OverlayHome />,
            index: true,
          },
          {
            path: "/page2",
            element: <OverlayTechnology />,
          },
          {
            path: "/page3",
            element: <OverlayExperience />,
          },
          {
            path: "/page4",
            element: <OverlayStore />,
          },
        ],
      },
      {
        path: "/only-for-devs",
        element: <OnlyForDevs />,
        index: true,
      },
      {
        path: "*",
        element: <Navigate to="/page1" replace />,
      },
    ],
  },
]);
