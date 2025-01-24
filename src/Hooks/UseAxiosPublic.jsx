import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://bistor-boss-server-gamma.vercel.app'
})


const UseAxiosPublic = () => {
    return axiosPublic;

};

export default UseAxiosPublic;