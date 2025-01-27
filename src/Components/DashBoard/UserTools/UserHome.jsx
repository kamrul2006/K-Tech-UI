import { useContext, useEffect, useState } from "react";
import { FaCheckCircle, FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../../../Auth/Providers/AuthProvider";
import { Link } from "react-router-dom";
import axiosSecure from "../../../Hooks/axiosSecure";

const UserProfilePage = () => {
    const { user } = useContext(AuthContext)
    const axiosSecurity = axiosSecure()

    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const res = await axiosSecurity.get(`/users-role/${user?.email}`);
                setUserRole(res.data.userRole);
                // setIsLoading(false);
            } catch (error) {
                console.error("Error fetching user role:", error);
                // setIsLoading(false);
            }
        };

        fetchUserRole();
    }, [user?.email]);


    // console.log(userRole)


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 rounded-2xl shadow-xl bg-white">

                <div className="flex flex-col items-center">

                    {user?.photoURL ? <img src={user?.photoURL} alt={user?.displayName} className="w-20 rounded-full border-2 border-blue-600" /> :
                        <FaUserCircle size={80} className="text-gray-400 mb-4" />}

                    <h1 className="text-2xl font-bold">{user?.displayName}</h1>
                </div>


                <div className="mt-4 space-y-4 text-center">
                    <p className="text-gray-600">Email: {user?.email}</p>

                    {!userRole?.isSubscribed ? (
                        <Link to={`/dashboard/pay/${userRole?._id}`}>
                            <button
                                className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                            >
                                $9.99 - Subscribe Now
                            </button>
                        </Link>
                    ) : (
                        <div className="flex items-center justify-center gap-2 text-green-500 font-semibold">
                            <FaCheckCircle />
                            <span>Status: Verified</span>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default UserProfilePage;
