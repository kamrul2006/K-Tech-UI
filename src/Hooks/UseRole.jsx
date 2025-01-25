import { useContext } from "react";
import axiosSecure from "./axiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Auth/Providers/AuthProvider";



const UseRole = () => {
    const { user } = useContext(AuthContext)
    const axiosSecurity = axiosSecure()

    const { data: userRole, isPending } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
            const res = await axiosSecurity.get(`/users/admin/${user?.email}`)
            return res.data.userRole
        }
    })

    return [userRole, isPending]
};

export default UseRole;