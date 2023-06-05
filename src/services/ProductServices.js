import axios from "axios";

export const getProductHandler = async (productId, setProduct, setLoader) => {
  setLoader(true);
  try {
    const response = await axios.get("/api/products/" + productId);
    if (response.status === 200) {
      setProduct(response.data.product);
    }
  } catch (err) {
    console.error("Error in Product", err);
  } finally {
    setLoader(false);
  }
};

export const getProductsAndCategories = async (
  setProducts,
  setCategories,
  setLoader
) => {
  setLoader(true);
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
  } finally {
    setLoader(false);
  }
};
