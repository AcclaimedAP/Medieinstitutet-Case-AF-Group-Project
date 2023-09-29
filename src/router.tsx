import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./views/Home";
import NotFound from "./views/NotFound";
import Search from "./views/Search";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        index: true,
      },
      {
        path: "/search",
        element: <Search></Search>,
        index: true,
      },
    ],
  },
]);
