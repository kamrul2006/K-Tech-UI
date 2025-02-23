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
import PaymentLayOut from "./Components/DashBoard/UserTools/PaymentLayOut";
import ProductReviewQueue from "./Components/DashBoard/ModeratorTools/ProductToReview";
import ReportedContentsPage from "./Components/DashBoard/ModeratorTools/ReportedPage";
import AllUsers from "./Components/DashBoard/AdminTools/AllUsers";
import AdminStatisticsPage from "./Components/DashBoard/AdminTools/AdminStatisticsPage";
import ManageCouponPage from "./Components/DashBoard/AdminTools/ManageCouponPage";
import AdminPrivet from "./Auth/Privet/AdminPrivet";
import ModeratorPrivet from "./Auth/Privet/ModeratorPrivet";



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
                loader: ({ params }) => fetch(`https://k-tech-server.vercel.app/products/${params.id}`)
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
                element: <PrivetRout><UserProfilePage /></PrivetRout>
            },
            {
                path: "/dashboard/pay/:id",
                element: <PrivetRout><PaymentLayOut /></PrivetRout>
            },
            {
                path: "/dashboard/add-product",
                element: <PrivetRout><AddProductPage /></PrivetRout>
            },
            {
                path: "/dashboard/my-product",
                element: <PrivetRout><MyProductsPage /></PrivetRout>
            },
            {
                path: `/dashboard/update-product/:id`,
                element: <PrivetRout><UpdateProductPage /></PrivetRout>,
                loader: ({ params }) => fetch(`https://k-tech-server.vercel.app/products/${params.id}`)
            },

            // ------------------moderator tools-----
            {
                path: "/dashboard/review",
                element: <ModeratorPrivet> <ProductReviewQueue /></ModeratorPrivet>
            },
            {
                path: "/dashboard/reported",
                element: <ModeratorPrivet><ReportedContentsPage /></ModeratorPrivet>
            },

            // ---------------------admin tools---------
            {
                path: "/dashboard/AllUsers",
                element: <AdminPrivet><AllUsers /></AdminPrivet>
            },
            {
                path: "/dashboard/admin",
                element: <AdminPrivet><AdminStatisticsPage /></AdminPrivet>
            },
            {
                path: "/dashboard/coupons",
                element: <AdminPrivet><ManageCouponPage /></AdminPrivet>
            },
        ]
    },
]);

export default router;


