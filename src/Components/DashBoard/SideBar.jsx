import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    FaHome,
    FaBars,
    FaUsers,
} from "react-icons/fa";
import { MdOutlineReportGmailerrorred, MdRateReview } from "react-icons/md";
import axiosSecure from "../../Hooks/axiosSecure";
import { AuthContext } from "../../Auth/Providers/AuthProvider";
import { IoBagAdd, IoStatsChartSharp } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import { RiCoupon3Line } from "react-icons/ri";

const Sidebar = () => {
    const { user } = useContext(AuthContext)
    const axiosSecurity = axiosSecure()

    // For responsive toggle
    const [isOpen, setIsOpen] = useState(false);

    // For active state
    const [activeItem, setActiveItem] = useState();
    const [menuItems, SetMenuItems] = useState([])
    const [roleDashboard, setRoleDashboard] = useState(null)

    const toggleSidebar = () => setIsOpen(!isOpen);


    const UserMenuItems = [
        { name: "User Home", icon: <FaHome />, path: "/dashboard/userHome" },
        { name: "Add Product", icon: <IoBagAdd />, path: "/dashboard/add-product" },
        { name: "My Products", icon: <AiOutlineProduct />, path: "/dashboard/my-product" },
    ];

    const AdminMenuItems = [
        { name: "Statistics", icon: <IoStatsChartSharp />, path: "/dashboard/admin" },
        { name: " Manage Users", icon: <FaUsers />, path: "/dashboard/AllUsers" },
        { name: "Manage Coupons", icon: <RiCoupon3Line />, path: "/dashboard/coupons" },
    ];

    const ModeratorMenuItems = [
        { name: "Product Review", icon: <MdRateReview />, path: "/dashboard/review" },
        { name: "Reported Product", icon: <MdOutlineReportGmailerrorred />, path: "/dashboard/reported" },
    ];



    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const res = await axiosSecurity.get(`/users-role/${user?.email}`);
                setUserRole(res.data.userRole);
            } catch (error) {
                console.error("Error fetching user role:", error);
            }
        };

        fetchUserRole();
    }, [user?.email]);

    // console.log(user.email)

    useEffect(() => {
        if (userRole?.role == 'admin') {
            setActiveItem('Admin Home');
            SetMenuItems(AdminMenuItems);
            setRoleDashboard('Admin Dashboard')
        } else if (userRole?.role == 'moderator') {
            setActiveItem('Moderator Home');
            SetMenuItems(ModeratorMenuItems);
            setRoleDashboard('Moderator Dashboard')
        } else {
            setActiveItem('User Home');
            SetMenuItems(UserMenuItems);
            setRoleDashboard('User Dashboard')
        }
    }, [userRole]);

    // console.log(userRole);





    return (
        <div className="fixed md:pt-16">


            {/* Sidebar */}
            <div
                className={`bg-blue-400 md:w-64 ${isOpen ? "w-8 rounded-r-full md:rounded-none" : "w-16 rounded-r-full  py-5 md:rounded-none"
                    } md:min-h-screen transition-all duration-300 fixed md:static uppercase font-semibold md:h-full shadow`}
            >
                <h2 className=" text-center text-blue-500 bg-white font-bold hidden md:block py-5">{roleDashboard}</h2>


                <div className="p-4 flex items-center justify-between md:justify-start">
                    <h1
                        className={`text-2xl font-bold uppercase hidden md:block`}
                    >

                    </h1>

                    <button className="md:hidden -ml-3 text-white" onClick={toggleSidebar}>
                        <FaBars />
                    </button>
                </div>

                <div className={`${isOpen ? "hidden" : "block"
                    } transition-all duration-300 md:block`}>


                    <div className="mt-5">

                        <ul className="space-y-2">
                            {menuItems.map((item) => (
                                <Link to={item.path} className="flex items-center gap-3 w-full">
                                    <li
                                        key={item.name}
                                        className={`flex items-center gap-2 px-3 py-2 cursor-pointer w-full ${activeItem === item.name ? "bg-blue-600 text-white" : "hover:bg-blue-600"
                                            }`}
                                        onClick={() => setActiveItem(item.name)}
                                    >

                                        {item.icon}
                                        <span className={`hidden md:block`}>
                                            {item.name}
                                        </span>

                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Sidebar;
