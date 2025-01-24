import { Outlet } from "react-router-dom";
import Navbar from "../Components/FixdToAll/NavBar";
import Footer from "../Components/FixdToAll/Footer";

const RootLayout = () => {
    return (
        <div className="bg-gray-100">
            <Navbar />

            <div className="max-w-7xl mx-auto mt-16">
                <Outlet />

            </div>

            <Footer />

        </div>
    );
};

export default RootLayout;