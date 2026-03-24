import { createBrowserRouter } from "react-router";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Search from "./pages/Search";
import MentorProfile from "./pages/MentorProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/buscar",
    Component: Search,
  },
  {
    path: "/mentor/:id",
    Component: MentorProfile,
  },
]);
