import React, { useContext, useEffect, useState } from 'react';
import UseAxiosPublic from '../../Hooks/UseAxiosPublic';
import { AuthContext } from '../../Auth/Providers/AuthProvider';
import { Link } from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';

const DashBoardButton = () => {

    const { user, loading } = useContext(AuthContext)

    const axiosPublic = UseAxiosPublic()

    const [userRole, setUserRole] = useState(null);

    useEffect(() => {

        axiosPublic.get(`/users-role/${user?.email}`)
            .then(res => setUserRole(res.data.userRole.role))

        // setIsLoading(false);

    }, [user?.email]);


    if (loading || !userRole) {
        return <div>
            ..Dashboard..
        </div>
    }



    if (userRole == 'admin') {
        return (<Link to={"/dashboard/admin"}>
            <button
                className=" px-4 py-2 w-full hover:bg-gray-100 flex items-center gap-2"
                role="menuitem"
            >
                <BiMenu className="text-lg" /> Dashboard
            </button>
        </Link>)
    }

    if (userRole == 'moderator') {
        return (<Link to={"/dashboard/review"}>
            <button
                className=" px-4 py-2 w-full hover:bg-gray-100 flex items-center gap-2"
                role="menuitem"
            >
                <BiMenu className="text-lg" /> Dashboard
            </button>
        </Link>)
    }


    return (
        <Link to={"/dashboard/userHome"}>
            <button
                className=" px-4 py-2 w-full hover:bg-gray-100 flex items-center gap-2"
                role="menuitem"
            >
                <BiMenu className="text-lg" /> Dashboard
            </button>
        </Link>
    );
};

export default DashBoardButton;
