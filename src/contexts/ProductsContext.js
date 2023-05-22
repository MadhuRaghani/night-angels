import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductsContext = createContext();

export default function ProductsContextProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const categoriesResponse = await axios.get("/api/categories", {});
        if (categoriesResponse.status === 200) {
          setCategories(categoriesResponse.data.categories);
        }
        const productsResponse = await axios.get("/api/products", {});
        if (productsResponse.status === 200) {
          setProducts(productsResponse.data.products);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, categories }}>
      {children}
    </ProductsContext.Provider>
  );
}
