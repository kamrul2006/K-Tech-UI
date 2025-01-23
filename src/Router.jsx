import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "./Layouts/HomeLayout";
import RootLayout from "./Layouts/RootLayout";



const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <div>error</div>,
        children: [
            {
                path: '/',
                element: <HomeLayout />,
            },
        ]
    },
]);

export default router;


