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
import DashBoardLayout from "./Layouts/DashBoardLayout";
import PrivetRout from "./Auth/Privet/Privetrought";
import UserProfilePage from "./Components/DashBoard/UserTools/UserHome";
import AddProductPage from "./Components/DashBoard/UserTools/AddProductPage";
import MyProductsPage from "./Components/DashBoard/UserTools/MyProductPage";
import UpdateProductPage from "./Components/DashBoard/UserTools/UpdateProduct";



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
                loader: ({ params }) => fetch(`http://localhost:5000/products/${params.id}`)
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
    {
        path: "/dashboard",
        element: <PrivetRout><DashBoardLayout /></PrivetRout>,
        children: [
            // ---------------------user tools-----------
            {
                path: "/dashboard/userHome",
                element: <UserProfilePage />
            },
            {
                path: "/dashboard/add-product",
                element: <AddProductPage />
            },
            {
                path: "/dashboard/my-product",
                element: <MyProductsPage />
            },
            {
                path: `/dashboard/update-product/:id`,
                element: <UpdateProductPage />,
                loader: ({ params }) => fetch(`http://localhost:5000/products/${params.id}`)
            },
        ]
    },
]);

export default router;


