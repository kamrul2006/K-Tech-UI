import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "./UseAxiosPublic";


const UseTrProduct = () => {

    const axiosPublic = UseAxiosPublic()

    const { refetch, data: allProduct = [] } = useQuery({
        queryKey: ['TrProducts'],
        queryFn: async () => {
            const res = await axiosPublic.get('/product')
            return res.data
        }
    })


    return [allProduct, refetch]
};

export default UseTrProduct;