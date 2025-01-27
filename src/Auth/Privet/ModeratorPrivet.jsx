
import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import KTechLoader from '../../Components/FixdToAll/KLoader';
import { AuthContext } from '../Providers/AuthProvider';
import axiosSecure from '../../Hooks/axiosSecure';

const ModeratorPrivet = ({ children }) => {
    const { user, loading } = useContext(AuthContext)

    const location = useLocation()
    // console.info(location)

    const axiosSecurity = axiosSecure()

    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const res = await axiosSecurity.get(`/users-role/${user?.email}`);
                setUserRole(res.data.userRole.role);
                // setIsLoading(false);
            } catch (error) {
                console.error("Error fetching user role:", error);
                // setIsLoading(false);
            }
        };

        fetchUserRole();
    }, [user?.email]);


    if (loading || !userRole) {
        return <div>
            <KTechLoader />
        </div>
    }

    if (user && userRole == 'moderator') {
        return children
    }

    return (
        <Navigate state={location.pathname} to={'/login'}></Navigate>
    );
};

export default ModeratorPrivet;