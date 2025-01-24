import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "./Layouts/HomeLayout";
import RootLayout from "./Layouts/RootLayout";
import ErrorPage from "./Components/FixdToAll/ErrorPage";
import LoginPage from "./Auth/Users/Loginpage";
import SignupPage from "./Auth/Users/SignupPage";



const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <HomeLayout />,
            },
        ]
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/register",
        element: <SignupPage />
    },
]);

export default router;


