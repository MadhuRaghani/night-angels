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

export const removeFromCartHandler = async (
  productId,
  token,
  setCart,
  setDisableAddToCartBtn
) => {
  setDisableAddToCartBtn(true);
  try {
    const response = await axios.delete("/api/user/cart/" + productId, {
      headers: { authorization: token },
    });
    if (response.status === 200) {
      setCart(response.data.cart);
      toast.warning("Removed From Cart");
    }
  } catch (err) {
    console.error("Error in Cart", err);
  } finally {
    setDisableAddToCartBtn(false);
  }
};

export const incrementDecrementHandler = async (
  productId,
  actionType,
  token,
  setCart,
  setDisableAddToCartBtn
) => {
  setDisableAddToCartBtn(true);
  try {
    const response = await axios.post(
      "/api/user/cart/" + productId,
      { action: { type: actionType } },
      { headers: { authorization: token } }
    );
    if (response.status === 200) {
      setCart(response.data.cart);
      actionType === "increment"
        ? toast.success("Added 1 More")
        : toast.warning("Removed 1");
    }
  } catch (err) {
    console.error("Error in Cart", err);
  } finally {
    setDisableAddToCartBtn(false);
  }
};
