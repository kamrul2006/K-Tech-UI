import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import UseAdmin from '../../Hooks/UseAdmin';
import KTechLoader from '../../Components/FixdToAll/KLoader';

const AdminPrivet = ({ children }) => {
    const { user, loading } = useContext(AuthContext)

    const [isAdmin, isPending] = UseAdmin()

    const location = useLocation()
    // console.info(location)


    if (loading || isPending) {
        return <div>
            <KTechLoader />
        </div>
    }

    if (user && isAdmin) {
        return children
    }

    return (
        <Navigate state={location.pathname} to={'/login'}></Navigate>
    );
};

export default AdminPrivet;