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

export const getCartPriceDetails = (cart) => {
  const totalPrices = cart.reduce(
    (accPrices, { original_price, price, qty }) => {
      return {
        totalOriginalPrice:
          accPrices.totalOriginalPrice + parseInt(original_price) * qty,
        totalPrice: accPrices.totalPrice + parseInt(price) * qty,
        // totalDiscount: accPrices.totalDiscount + (original_price - price),
      };
    },
    { totalOriginalPrice: 0, totalPrice: 0 }
  );
  return { totalItems: cart.length, ...totalPrices };
};

export const placeAnOrder = async (
  cart,
  setCart,
  token,
  setDisableAddToCartBtn
) => {
  setDisableAddToCartBtn(true);
  for (let i = 0; i < cart.length; i++) {
    const productId = cart[i]._id;
    const response = await axios.delete("/api/user/cart/" + productId, {
      headers: { authorization: token },
    });
    if (response.status === 200 && i === cart.length - 1) {
      setCart(response.data.cart);
      toast.success("Yayyyy!! Order Placed.");
    }
  }
  setDisableAddToCartBtn(false);
};
