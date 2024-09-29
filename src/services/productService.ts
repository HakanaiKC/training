

import axiosInstance from "../config/axiosClient";

const getProducts = async () => {
    const res = await axiosInstance.get('https://dummyjson.com/products')
    console.log(res);
    
    return res.data
}

export default { getProducts }