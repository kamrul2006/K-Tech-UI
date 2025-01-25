import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import KTechLoader from "../../Components/FixdToAll/KLoader";

const PrivetRout = ({ children }) => {
    const { user, loading } = useContext(AuthContext)

    const location = useLocation()
    // console.info(location)


    if (loading) {
        return (<div>
            <KTechLoader />
        </div>)
    }

    if (user) {
        return children
    }

    return (
        <Navigate state={location.pathname} to={'/login'}></Navigate>
    );
};

export default PrivetRout;