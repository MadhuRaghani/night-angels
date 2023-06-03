import axios from "axios";
import { toast } from "react-toastify";

export const addToCartHanler = async (
  product,
  token,
  setCart,
  setDisableAddToCartBtn
) => {
  setDisableAddToCartBtn(true);
  try {
    const response = await axios.post(
      "/api/user/cart",
      { product },
      { headers: { authorization: token } }
    );
    if (response.status === 201) {
      setCart(response.data.cart);
      toast.success("Added To Cart");
    }
  } catch (err) {
    console.error("Error in Cart", err);
  } finally {
    setDisableAddToCartBtn(false);
  }
};
