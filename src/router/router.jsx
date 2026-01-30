import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/Home/Home";
import AboutDetails from "../pages/AboutDetails/AboutDetails";
import HighlightShowcase from "../pages/HighlightShowcase/HighlightShowcase";
import Error from "../pages/shared/Error/Error";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login/Login";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            { index: true, Component: Home },
            { path: "about", Component: AboutDetails },
            { path: "highlight", Component: HighlightShowcase },
        ]
    },
    {
        path: "auth",
        Component: AuthLayout,
        children: [
            { path: "login", Component: Login }
        ]
    },
    {
        path: "*",
        Component: Error
    }
]);
