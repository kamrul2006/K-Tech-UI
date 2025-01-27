import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://k-tech-server.vercel.app'
})


const UseAxiosPublic = () => {
    return axiosPublic;

};

export default UseAxiosPublic;