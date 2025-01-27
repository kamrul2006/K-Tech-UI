import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosSecure from '../../Hooks/axiosSecure';
import { AuthContext } from '../../Auth/Providers/AuthProvider';

const SubscribeButton = ({ amount }) => {

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



    return (
        <div>
            {userRole?.isSubscribed ?
                <button
                    className="btn btn-sm btn-info"
                    disabled={userRole?.isSubscribed}
                >
                    ${amount} - Subscribe Now
                </button>
                : <Link to={`/dashboard/pay/${userRole?._id}`}>
                    <button
                        className="btn btn-sm btn-info"
                    >
                        ${amount} - Subscribe Now
                    </button>
                </Link>}
        </div>
    );
};

export default SubscribeButton;