import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import axiosSecure from './axiosSecure';
import { AuthContext } from '../Authentication/Providers/AuthProvider';

const UsePayment = () => {
    const axiosSecurity = axiosSecure()
    const { user } = useContext(AuthContext)

    const { refetch, data: pay = [] } = useQuery({
        queryKey: ['Payment', user?.email],
        queryFn: async () => {
            const res = await axiosSecurity.get(`/payments?email=${user?.email}`)
            return res.data
        }
    })

    return [pay, refetch]
};

export default UsePayment;