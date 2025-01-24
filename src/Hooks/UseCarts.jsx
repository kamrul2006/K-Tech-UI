import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import axiosSecure from './axiosSecure';
import { AuthContext } from '../Authentication/Providers/AuthProvider';

const UseCarts = () => {
    const axiosSecurity = axiosSecure()
    const { user } = useContext(AuthContext)

    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            const res = await axiosSecurity.get(`/carts?email=${user?.email}`)
            return res.data
        }
    })

    return [cart, refetch]
};

export default UseCarts;