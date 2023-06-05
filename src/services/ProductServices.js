import axios from "axios";

export const getProductHandler = async (productId, setProduct) => {
  try {
    const response = await axios.get("/api/products/" + productId);
    if (response.status === 200) {
      setProduct(response.data.product);
    }
  } catch (err) {
    console.error("Error in Product", err);
  }
};
