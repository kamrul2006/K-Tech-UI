import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "./Layouts/HomeLayout";
import RootLayout from "./Layouts/RootLayout";
import ErrorPage from "./Components/FixdToAll/ErrorPage";
import LoginPage from "./Auth/Users/Loginpage";



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
]);

export default router;


