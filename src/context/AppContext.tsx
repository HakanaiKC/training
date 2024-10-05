import { createContext, useEffect, useState } from "react";
import productService from "../services/productService";

export const AppContext = createContext({})

export const AppProvider = ({ children }:any) => {
    const [dataProducts, setDataProducts] = useState<any>();

    useEffect(() => {
        const fetchProducts = async () => {
            const product = await productService.getProducts();
            setDataProducts(product.products);
        };
        fetchProducts();
    }, []);

    return <AppContext.Provider value={{dataProducts, setDataProducts}}>
        {children}
    </AppContext.Provider>
}