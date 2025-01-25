import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "./Layouts/HomeLayout";
import RootLayout from "./Layouts/RootLayout";
import ErrorPage from "./Components/FixdToAll/ErrorPage";
import LoginPage from "./Auth/Users/Loginpage";
import SignupPage from "./Auth/Users/SignupPage";
import AboutUs from "./Components/FixdToAll/AboutUs";
import ContactUs from "./Components/FixdToAll/ContactUs";
import AllProducts from "./Components/AllProducts/AllProducts";
import ProductDetailsPage from "./Components/AllProducts/ProductDetails";



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
            {
                path: '/products',
                element: <AllProducts />,
            },
            {
                path: `/products/:id`,
                element: <ProductDetailsPage />,
                loader: ({params})=>fetch(`http://localhost:5000/products/${params.id}`)
            },
            {
                path: '/about',
                element: <AboutUs />,
            },
            {
                path: '/contact',
                element: <ContactUs />,
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


