import axiosInstance from "../config/axiosClient";

const getProducts = async () => {
  const res = await axiosInstance.get("https://dummyjson.com/products");
  return res.data;
};

const updateProduct = async (id: number, data: any) => {
  const res = await axiosInstance.put(
    "https://dummyjson.com/products/" + id,
    data
  );
  return res;
};

const deleteProducts = async (id: number) => {
  const response = await axiosInstance.delete(
    "https://dummyjson.com/products/" + id
  );
  return response.data;
};

const addProduct = async (data: any)=>{
  const res = await axiosInstance.post('https://dummyjson.com/products/add', data)
  return res
}

export default { getProducts, deleteProducts, updateProduct, addProduct };
